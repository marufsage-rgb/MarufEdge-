import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cloud, 
  Folder, 
  File, 
  Search, 
  RefreshCw, 
  LogOut, 
  ExternalLink,
  Lock,
  ChevronRight,
  FileText,
  Image as ImageIcon,
  MoreVertical,
  Clock,
  HardDrive
} from 'lucide-react';
import { initAuth, googleSignIn, logout, getAccessToken } from '../lib/google-auth';
import type { User } from 'firebase/auth';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  size?: string;
  webViewLink?: string;
  iconLink?: string;
}

export const GoogleDriveIntegration = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (u, t) => {
        setUser(u);
        setToken(t);
        setNeedsAuth(false);
        fetchFiles(t);
      },
      () => {
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setNeedsAuth(false);
        fetchFiles(result.accessToken);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setFiles([]);
    setNeedsAuth(true);
  };

  const fetchFiles = async (accessToken: string) => {
    setIsRefreshing(true);
    try {
      const response = await fetch(
        'https://www.googleapis.com/drive/v3/files?pageSize=10&fields=files(id,name,mimeType,modifiedTime,size,webViewLink,iconLink)&orderBy=modifiedTime desc',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const data = await response.json();
      if (data.files) {
        setFiles(data.files);
      }
    } catch (err) {
      console.error('Fetch files failed:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFileIcon = (mimeType: string) => {
    if (mimeType === 'application/vnd.google-apps.folder') return <Folder className="w-5 h-5 text-blue-500" />;
    if (mimeType.includes('image/')) return <ImageIcon className="w-5 h-5 text-emerald-500" />;
    if (mimeType.includes('pdf') || mimeType.includes('document')) return <FileText className="w-5 h-5 text-orange-500" />;
    return <File className="w-5 h-5 text-slate-400" />;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-OM', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatSize = (bytes?: string) => {
    if (!bytes) return '--';
    const b = parseInt(bytes);
    if (b < 1024) return b + ' B';
    if (b < 1024 * 1024) return (b / 1024).toFixed(1) + ' KB';
    return (b / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <section id="drive-integration" className="py-24 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left Side: Info & Auth */}
          <div className="lg:w-1/3 text-left">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-blue-100">
              <Cloud className="w-4 h-4" />
              <span>Workspace Integration</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]">
              Connected <br />
              <span className="text-blue-600">Google Drive</span>
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium mb-10">
              Bridge your high-performance enterprise assets directly from Google Drive. Access brochures, price lists, and technical documentation with permission.
            </p>

            {!user ? (
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md text-blue-600">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">Secure Protocol</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">OAuth 2.0 Authenticated</p>
                  </div>
                </div>
                <button 
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-[1.5rem] font-black text-sm hover:border-blue-600 hover:text-blue-600 transition-all shadow-xl shadow-slate-200/50 group"
                >
                  {isLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
                      Sign in with Google
                    </>
                  )}
                </button>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest text-center mt-6">
                  Uses Least-Privilege Scopes for Data Safety
                </p>
              </div>
            ) : (
              <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-200 text-white mb-8">
                <div className="flex items-center gap-4 mb-8">
                  <img src={user.photoURL || ''} className="w-14 h-14 rounded-2xl border-2 border-white/20 shadow-lg" alt={user.displayName || ''} />
                  <div>
                    <p className="text-lg font-black">{user.displayName}</p>
                    <p className="text-xs font-bold text-blue-100 opacity-70">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => token && fetchFiles(token)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} /> Sync Drive
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500/20 hover:bg-red-500 border border-red-400/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                  >
                    <LogOut className="w-3 h-3" /> Disconnect
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Side: File Browser */}
          <div className="lg:w-2/3 w-full">
            <div className="bg-slate-50 rounded-[3rem] p-4 sm:p-8 border border-slate-100 shadow-inner">
              
              {/* Browser Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search your Drive..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent rounded-2xl text-xs font-bold focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                    <HardDrive className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Recent Documents</span>
                  </div>
                </div>
              </div>

              {/* File List */}
              <div className="space-y-3 min-h-[400px]">
                {!user ? (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center opacity-40">
                    <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mb-6">
                      <Lock className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Authentication Required</p>
                    <p className="text-xs font-bold text-slate-400 mt-2">Connect your Google account to view files</p>
                  </div>
                ) : isRefreshing ? (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mb-6" />
                    <p className="text-sm font-black text-slate-900 uppercase tracking-widest">Synchronizing Vault</p>
                  </div>
                ) : filteredFiles.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center opacity-40">
                    <Folder className="w-16 h-16 text-slate-300 mb-4" />
                    <p className="text-sm font-black text-slate-900 uppercase tracking-widest">No matching files found</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {filteredFiles.map((file, idx) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group bg-white p-4 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-lg transition-all flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                            {getFileIcon(file.mimeType)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-black text-slate-900 truncate group-hover:text-blue-600 transition-colors">{file.name}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                                <Clock className="w-3 h-3" /> {formatDate(file.modifiedTime)}
                              </span>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter px-2 py-0.5 bg-slate-50 rounded-md">
                                {formatSize(file.size)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {file.webViewLink && (
                            <a 
                              href={file.webViewLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                              title="Open in Drive"
                            >
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                          <button className="p-2 hover:bg-slate-50 text-slate-400 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-blue-300 transition-colors ml-4" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Browser Footer */}
              {user && (
                <div className="mt-8 flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-100 pt-6">
                  <p>Showing {filteredFiles.length} of {files.length} items</p>
                  <div className="flex items-center gap-2 text-blue-600">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    Real-time Sync Active
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
