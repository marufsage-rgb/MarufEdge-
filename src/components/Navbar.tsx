import React, { useState } from 'react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from './AuthContext';
import { useLocale } from './LocaleContext';
import { LogIn, LogOut, User, Layout, Menu, X, ChevronDown, Phone, Shield, Cpu, BarChart3, ShoppingBag, Globe, MessageSquare, Bot, Share2, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CategoryTab } from './SectionCategoryNavigator';
import { useSound } from './AudioCursorProvider';

export interface NavbarProps {
  onSelectCategory?: (category: CategoryTab) => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectCategory, onOpenAdmin }) => {
  const { user } = useAuthState();
  const { t, isBilingual, language, country } = useLocale();
  const { playClickSound } = useSound();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDirOpen, setIsDirOpen] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (
        error?.code === 'auth/popup-closed-by-user' ||
        error?.code === 'auth/cancelled-popup-request'
      ) {
        return;
      }
      if (error?.code === 'auth/popup-blocked') {
        console.warn('Sign-in popup was blocked by browser permissions.');
        return;
      }
      console.warn('Sign-in notice:', error?.message || error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.warn('Logout notice:', error?.message || error);
    }
  };

  const navLinks: Array<{
    label: string;
    sub: string;
    href: string;
    category: CategoryTab;
  }> = [
    { label: t.navCheapRates, sub: 'From 15 OMR', href: '#google-work-hub', category: 'work' },
    { label: t.navAgenticAI, sub: 'Claude 3.5 AI', href: '#agentic-claude-hub', category: 'agentic' },
    { label: 'Social Media', sub: '9 Channels', href: '#social-hub', category: 'social' },
    { label: t.navGoogleMaps, sub: '#1 Local SEO', href: '#google-maps', category: 'marketing' },
    { label: 'Cloud ERP', sub: 'Oman 5% VAT', href: '#marketplace', category: 'erp' },
    { label: t.navStrategyDeck, sub: 'Enterprise', href: '#presentation', category: 'tech' },
  ];

  const handleNavLinkClick = (category: CategoryTab) => {
    playClickSound();
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Branding */}
          <div className="flex items-center gap-3">
            <div className="relative group cursor-pointer" onClick={() => onSelectCategory && onSelectCategory('all')}>
              <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-2.5 rounded-2xl shadow-xl">
                <Cpu className="text-white w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black text-white tracking-tighter leading-none">MarufEdge</span>
                <span className="text-[9px] font-bold text-blue-400 uppercase tracking-[0.2em] bg-blue-900/30 px-1.5 py-0.5 rounded border border-blue-500/20">AI ProMedia</span>
              </div>
              <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 mt-0.5">
                <span>{country.flag}</span>
                <span>{country.name} • {country.dialCode}</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <div className="relative">
              <button 
                onMouseEnter={() => setIsDirOpen(true)}
                onMouseLeave={() => setIsDirOpen(false)}
                className="flex items-center gap-1 text-[11px] font-black text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest"
              >
                <span>Directory</span> <ChevronDown className={`w-3 h-3 transition-transform ${isDirOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isDirOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    onMouseEnter={() => setIsDirOpen(true)}
                    onMouseLeave={() => setIsDirOpen(false)}
                    className="absolute top-full left-0 w-64 pt-3 z-50"
                  >
                    <div className="bg-slate-900 rounded-2xl shadow-2xl border border-white/10 p-2 overflow-hidden backdrop-blur-xl">
                      <a href="#management-hub" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group">
                        <div className="bg-blue-950 p-2 rounded-lg text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-200 block">Phone Book</span>
                          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold tracking-tighter">Oman Verified</span>
                        </div>
                      </a>
                      <a href="#gateway" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group">
                        <div className="bg-indigo-950 p-2 rounded-lg text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-200 block">Gov Gateway</span>
                          <span className="text-[10px] text-slate-500 uppercase font-mono font-bold tracking-tighter">ROP & MOCIIP</span>
                        </div>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {navLinks.map(link => (
              <a 
                key={link.href} 
                href={link.href}
                onClick={() => handleNavLinkClick(link.category)}
                className="text-[11px] font-black text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest flex flex-col items-center"
              >
                <span>{link.label}</span>
                <span className="text-[9px] font-bold text-slate-500 lowercase tracking-tighter">{link.sub}</span>
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Admin Settings Button */}
            {onOpenAdmin && (
              <button
                onClick={() => {
                  playClickSound();
                  onOpenAdmin();
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-cyan-400 rounded-xl text-xs font-bold border border-cyan-500/30 transition-all shadow-md active:scale-95"
                title="Open Admin Settings Panel"
              >
                <Settings className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}

            {/* WhatsApp Contact */}
            <a
              href="https://wa.me/96896522902"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black transition-all shadow-lg active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.navContactMaruf}</span>
            </a>

            {/* Login / Profile */}
            {user ? (
              <div className="flex items-center gap-2 bg-white/5 p-1 pr-3 rounded-full border border-white/10">
                <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-7 h-7 rounded-full border border-white/10" />
                <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition-all" title="Sign Out">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="hidden md:flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-black transition-all border border-white/10"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Client Login</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button 
              className="lg:hidden p-2 text-slate-300 hover:bg-white/5 rounded-xl transition-all"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-slate-900 border-b border-white/10 p-6 space-y-6 shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavLinkClick(link.category)}
                  className="flex justify-between items-center py-2 text-sm font-black text-slate-200 hover:text-cyan-400 border-b border-white/5"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-slate-500 uppercase">{link.sub}</span>
                </a>
              ))}

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="flex justify-between items-center py-2 text-sm font-black text-cyan-400 hover:text-cyan-300 border-b border-white/5"
                >
                  <span className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>Admin Panel & Settings</span>
                  </span>
                  <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded">Configure</span>
                </button>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/96896522902"
                className="flex items-center justify-center gap-3 py-3.5 bg-emerald-600 text-white text-xs font-black rounded-2xl"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WHATSAPP SUPPORT (+968 96522902)</span>
              </a>
              {!user && (
                <button
                  onClick={handleLogin}
                  className="flex items-center justify-center gap-3 py-3.5 bg-white/5 text-white text-xs font-black rounded-2xl border border-white/10"
                >
                  <LogIn className="w-5 h-5" />
                  <span>CLIENT SECURE LOGIN</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
