import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  Search, 
  ChevronRight, 
  Phone, 
  Mail, 
  Building2, 
  Briefcase, 
  Globe, 
  BarChart2, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Shield,
  MapPin
} from 'lucide-react';
import { OMAN_ENTERPRISE_CONTACTS, GOVT_HOTLINES } from '../data/oman_contacts';

export const ManagementNotebook = () => {
  const [activeView, setActiveView] = useState<'contacts' | 'gateway' | 'analyst'>('contacts');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = OMAN_ENTERPRISE_CONTACTS.filter(c => 
    `${c.firstName} ${c.lastName} ${c.company}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="management-hub" className="py-24 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notebook Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 border-b border-gray-200 pb-12">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest mb-4">
              <Book className="w-3 h-3" />
              <span>Professional NotebookLM Style</span>
            </div>
            <h2 className="text-5xl font-black text-gray-900 tracking-tight mb-4 leading-none">
              The <span className="text-blue-600 italic">Hybrid</span> Notebook
            </h2>
            <p className="text-gray-500 max-w-xl text-lg leading-relaxed font-medium">
              MarufEdge ProMedia's professional ledger for enterprise management, regional logistics, and Omani business intelligence.
            </p>
          </div>

          <div className="flex bg-gray-100 p-1.5 rounded-[2rem] shadow-inner">
            {[
              { id: 'contacts', label: 'Phone Book', icon: Phone },
              { id: 'gateway', label: 'Hotlines', icon: Shield },
              { id: 'analyst', label: 'Business AI', icon: Sparkles },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center gap-2 px-8 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all ${
                  activeView === tab.id 
                    ? 'bg-white text-blue-600 shadow-xl' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notebook Content Container */}
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden min-h-[600px] flex flex-col lg:flex-row">
          
          {/* Sidebar Info Panel */}
          <div className="lg:w-1/3 bg-gray-50 border-r border-gray-100 p-10">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-8">Professional Context</h3>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-500" /> Essential Hotlines
                </h4>
                <div className="space-y-3">
                  {GOVT_HOTLINES.slice(0, 4).map(h => (
                    <div key={h.service} className="flex justify-between items-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-blue-200 transition-colors cursor-pointer group">
                      <span className="text-sm font-bold text-gray-700">{h.service}</span>
                      <span className="text-sm font-black text-blue-600 group-hover:scale-110 transition-transform">{h.number}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
                <h4 className="text-lg font-bold mb-2 relative z-10">Business Analyst</h4>
                <p className="text-blue-100 text-sm mb-6 leading-relaxed relative z-10">
                  Leverage Google Gemini & NotebookLM logic to optimize your Omani enterprise workflows.
                </p>
                <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-all active:scale-95">
                  Start Analysis <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main List Area */}
          <div className="flex-1 p-10 flex flex-col">
            <div className="relative mb-10">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
              <input 
                type="text" 
                placeholder="Search Oman enterprises, drivers, managers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-[2rem] focus:outline-none transition-all shadow-sm placeholder-gray-300 text-gray-700 font-medium"
              />
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredContacts.map((contact, i) => (
                    <motion.div
                      layout
                      key={contact.phone + i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                      className="p-6 bg-white border border-gray-100 rounded-3xl hover:shadow-xl hover:border-blue-100 transition-all group cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          {contact.category === 'Management' ? <BarChart2 className="w-6 h-6" /> : <User className="w-6 h-6" />}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                          {contact.category}
                        </span>
                      </div>
                      
                      <h5 className="text-xl font-black text-gray-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
                        {contact.firstName} {contact.lastName}
                      </h5>
                      <p className="text-xs font-bold text-gray-400 mb-4 tracking-wider uppercase">{contact.jobTitle || contact.company}</p>
                      
                      {contact.skills && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {contact.skills.map(skill => (
                            <span key={skill} className="px-2 py-0.5 bg-gray-50 text-[9px] font-black text-gray-500 uppercase tracking-tighter rounded-md border border-gray-100">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium bg-gray-50 p-2 rounded-xl group-hover:bg-blue-50 transition-colors">
                          <Phone className="w-4 h-4 text-blue-400" />
                          <span className="font-black text-gray-700">{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium px-2">
                          <MapPin className="w-4 h-4 text-orange-400" />
                          <span>{contact.location}</span>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end">
                        <div className="p-2 bg-gray-50 rounded-full text-gray-300 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const User = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
