import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, FileText, CheckCircle2, ChevronRight, Download, Eye, ExternalLink } from 'lucide-react';

const EVIDENCE_YEARS = [
  { year: '2026', count: 142, status: 'Active' },
  { year: '2025', count: 365, status: 'Archived' },
  { year: '2024', count: 366, status: 'Archived' },
  { year: '2023', count: 365, status: 'Archived' },
  { year: '2022', count: 365, status: 'Archived' },
  { year: '2021', count: 365, status: 'Archived' },
];

export const EvidenceVault = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const handleUnlock = () => {
    if (passcode === '2026') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPasscode('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <section id="vault" className="py-32 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 text-left">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-blue-100">
              <Shield className="w-4 h-4" />
              <span>Secure Professional Vault</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-10 tracking-tighter leading-[0.9]">
              Enterprise <span className="text-blue-600 italic">Evidence</span> <br />
              Archive 2015-2026
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed font-medium mb-12">
              A comprehensive digital ledger of enterprise sales records, verified deposit slips, and audited service delivery evidence from 2015-2026.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                <span className="text-4xl font-black text-blue-600 block mb-2">11+</span>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Years Records</span>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100">
                <span className="text-4xl font-black text-orange-600 block mb-2">4K+</span>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Verified Slips</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-[1.5rem] font-black text-sm hover:bg-gray-800 transition-all shadow-2xl">
                <FileText className="w-5 h-5" /> Salary Ledger
              </button>
              <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 rounded-[1.5rem] font-black text-sm hover:border-gray-200 transition-all">
                <Download className="w-5 h-5" /> Ooredoo Archive
              </button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-xl">
            <AnimatePresence mode="wait">
              {!isUnlocked ? (
                <motion.div
                  key="locked"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="bg-white rounded-[4rem] p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
                  <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-10 text-blue-600">
                    <Lock className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">Vault Access Control</h3>
                  <p className="text-gray-400 font-medium mb-10 uppercase tracking-widest text-[10px]">Enter 4-Digit Security Key</p>
                  
                  <div className="space-y-6">
                    <input 
                      type="password" 
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="••••"
                      maxLength={4}
                      className={`w-full bg-gray-50 border-2 ${error ? 'border-red-100 bg-red-50' : 'border-gray-50'} rounded-2xl py-6 text-center text-4xl font-black tracking-[0.5em] focus:bg-white focus:border-blue-600 transition-all outline-none`}
                    />
                    <button 
                      onClick={handleUnlock}
                      className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 active:scale-95"
                    >
                      Authenticate Access
                    </button>
                    {error && <p className="text-red-500 text-xs font-black uppercase tracking-widest animate-pulse">Invalid Credentials</p>}
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pt-4">
                      Default Key: <span className="text-blue-600 underline">2026</span>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="unlocked"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[4rem] p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-10">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">Evidence Library</h3>
                      <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> System Synchronized
                      </p>
                    </div>
                    <button onClick={() => setIsUnlocked(false)} className="text-xs font-black text-gray-400 hover:text-red-600 transition-colors uppercase tracking-widest">Logout</button>
                  </div>

                  <div className="space-y-4">
                    {EVIDENCE_YEARS.map((item, i) => (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group flex items-center justify-between p-6 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${item.status === 'Active' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {item.year.slice(2)}
                          </div>
                          <div>
                            <span className="text-lg font-black text-gray-900">Fiscal Year {item.year}</span>
                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.count} Files • {item.status}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 transition-colors" />
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 p-2 rounded-xl text-white">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-black text-blue-900">Live Dashboard</span>
                    </div>
                    <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">Open Mirror</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
