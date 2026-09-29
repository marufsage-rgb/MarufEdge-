import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ResourceGrid } from './components/ResourceGrid';
import { SkillModules } from './components/SkillModules';
import { ImageGenerator } from './components/ImageGenerator';
import { ManagementNotebook } from './components/ManagementNotebook';
import { Marketplace } from './components/Marketplace';
import { MetaBusinessSuiteHub } from './components/MetaBusinessSuiteHub';
import { TelecomDarkShowcase } from './components/TelecomDarkShowcase';
import { AICustomerCareModal } from './components/AICustomerCareModal';
import { EvidenceVault } from './components/EvidenceVault';
import { GoogleMapsHub } from './components/GoogleMapsHub';
import { ExecutivePresentation } from './components/ExecutivePresentation';
import { AutoVisualPagesShowcase } from './components/AutoVisualPagesShowcase';
import { GoogleDriveIntegration } from './components/GoogleDriveIntegration';
import { GoogleKeywordWorkHub } from './components/GoogleKeywordWorkHub';
import { AgenticClaudeHub } from './components/AgenticClaudeHub';
import { SocialMediaHub } from './components/SocialMediaHub';
import { AdminSettingsModal } from './components/AdminSettingsModal';
import { SectionCategoryNavigator, CategoryTab } from './components/SectionCategoryNavigator';
import { BilingualTypographyTester } from './components/BilingualTypographyTester';
import { GlobalLocaleBar } from './components/GlobalLocaleBar';
import { LocaleProvider } from './components/LocaleContext';
import { ThemeProvider } from './components/ThemeContext';
import { AudioCursorProvider, useSound } from './components/AudioCursorProvider';
import { ContactForm } from './components/ContactForm';
import { AuthProvider } from './components/AuthContext';
import {
  Globe,
  Shield,
  Mail,
  Phone,
  MapPin,
  Cpu,
  MessageSquare,
  Bot,
  Settings,
  Share2,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => (
  <footer className="bg-gray-950 text-white py-24 border-t border-white/5 relative z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand HQ */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-3 rounded-2xl shadow-2xl shadow-blue-900/40">
              <Cpu className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter leading-none">MarufEdge</span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.35em]">AI & IT ProMedia</span>
            </div>
          </div>
          <p className="text-gray-400 max-w-sm text-sm sm:text-base leading-relaxed font-medium mb-6">
            Pioneering affordable AI agents, Claude 3.5 business workflows, verified Google Maps SEO, and Oman 5% VAT AppSheet ERP systems.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-bold transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin Panel & Settings</span>
            </button>
            <a
              href="https://wa.me/96896522902"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>
        
        {/* Contact HQ */}
        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">Oman HQ Office</h4>
          <ul className="space-y-4 text-gray-400 text-xs sm:text-sm font-medium">
            <li className="flex items-start gap-3 hover:text-blue-400 transition-colors">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>+968 96522902 (Direct Line)</span>
            </li>
            <li className="flex items-start gap-3 hover:text-blue-400 transition-colors">
              <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>habiburmaruf@gmail.com</span>
            </li>
            <li className="flex items-start gap-3 hover:text-blue-400 transition-colors">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>Al Maabilah, Seeb, Muscat, Sultanate of Oman</span>
            </li>
            <li className="flex items-start gap-3 text-cyan-400">
              <Bot className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Claude 3.5 & Multilingual AI Bot Ready</span>
            </li>
          </ul>
        </div>

        {/* Ecosystem Links */}
        <div>
          <h4 className="font-black text-xs uppercase tracking-[0.3em] text-gray-400 mb-6">Capabilities</h4>
          <ul className="space-y-3 text-gray-400 text-xs sm:text-sm font-medium">
            <li><a href="#agentic-claude-hub" className="hover:text-purple-400 transition-colors">Claude & Agentic AI Workflows</a></li>
            <li><a href="#google-work-hub" className="hover:text-emerald-400 transition-colors">Cheap Rates in Oman (From 15 OMR)</a></li>
            <li><a href="#social-hub" className="hover:text-blue-400 transition-colors">All 9 Social Media Channels</a></li>
            <li><a href="#google-maps" className="hover:text-cyan-400 transition-colors">Google Maps Local 3-Pack SEO</a></li>
            <li><a href="#marketplace" className="hover:text-amber-400 transition-colors">AppSheet Cloud ERP (5% VAT)</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-mono">
        <p>&copy; {new Date().getFullYear()} Habibur Rahman (Maruf) • MarufEdge ProMedia. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Oman VAT 5% Compliant</span>
          </span>
          <span className="text-slate-400">Sultanate of Oman • Vision 2040</span>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('work');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <LocaleProvider>
          <AudioCursorProvider>
            <div className="min-h-screen bg-slate-950 font-sans text-gray-100 selection:bg-blue-500 selection:text-white scroll-smooth flex flex-col">
              
              {/* Top Global Locale & Country Selector Bar with Theme Changer */}
              <GlobalLocaleBar />

              {/* Main Sticky Navbar */}
              <Navbar
                onSelectCategory={setActiveCategory}
                onOpenAdmin={() => setIsAdminOpen(true)}
              />

              <main className="flex-grow pt-8">
                {/* Hero Showcase with Bilingual Identity */}
                <Hero />

                {/* Clean Menu & Category Navigator: Work, Agentic, Social, Maps, ERP, Tech, All */}
                <SectionCategoryNavigator
                  activeTab={activeCategory}
                  onTabChange={setActiveCategory}
                  onOpenAdmin={() => setIsAdminOpen(true)}
                />

                <div id="hub-content-anchor" className="scroll-mt-36">
                  
                  {/* 1. WORK & CHEAP RATES CATEGORY */}
                  {(activeCategory === 'work' || activeCategory === 'all') && (
                    <div className="animate-fadeIn">
                      <GoogleKeywordWorkHub />
                      <ContactForm />
                    </div>
                  )}

                  {/* 2. AGENTIC AI & CLAUDE AI WORKFLOWS CATEGORY */}
                  {(activeCategory === 'agentic' || activeCategory === 'all') && (
                    <div className="animate-fadeIn">
                      <AgenticClaudeHub />
                      <ImageGenerator />
                      <BilingualTypographyTester />
                    </div>
                  )}

                  {/* 3. ALL SOCIAL MEDIA CHANNELS CATEGORY */}
                  {(activeCategory === 'social' || activeCategory === 'all') && (
                    <div className="animate-fadeIn">
                      <SocialMediaHub />
                    </div>
                  )}

                  {/* 4. GOOGLE MAPS & META ADS CATEGORY */}
                  {(activeCategory === 'marketing' || activeCategory === 'all') && (
                    <div className="animate-fadeIn">
                      <GoogleMapsHub />
                      <MetaBusinessSuiteHub />
                      <AutoVisualPagesShowcase />
                    </div>
                  )}

                  {/* 5. CLOUD ERP & GOOGLE DRIVE CATEGORY */}
                  {(activeCategory === 'erp' || activeCategory === 'all') && (
                    <div className="animate-fadeIn">
                      <Marketplace />
                      <EvidenceVault />
                      <GoogleDriveIntegration />
                    </div>
                  )}

                  {/* 6. IT, TELECOM & STRATEGY CATEGORY */}
                  {(activeCategory === 'tech' || activeCategory === 'all') && (
                    <div className="animate-fadeIn">
                      <ExecutivePresentation />
                      <TelecomDarkShowcase />
                      <SkillModules />
                      <ManagementNotebook />
                    </div>
                  )}
                </div>
                
                {/* High-Conversion Next-Phase Banner */}
                <section className="py-32 bg-slate-950 text-white overflow-hidden relative border-t border-white/5">
                  <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[180px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-600 rounded-full blur-[180px] translate-x-1/2 translate-y-1/2" />
                  </div>
                  
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-cyan-400 font-mono text-xs uppercase tracking-[0.35em] mb-4 block font-bold">
                        Sultanate of Oman Digital Vanguard
                      </span>
                      <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
                        Scale with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400">Agentic AI & Google SEO</span>
                      </h2>
                      <p className="text-base sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                        Affordable rates starting from 15 OMR. Direct engineering by Habibur Rahman (Maruf) in Mabella, Muscat.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <a 
                          href="https://wa.me/96896522902?text=Hello%20Maruf,%20I%20want%20to%20start%20a%20project%20in%20Oman%20at%20your%20cheap%20rate." 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-wider transition-all shadow-xl shadow-emerald-950 active:scale-95 inline-flex items-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4 fill-slate-950" />
                          <span>WhatsApp Executive Line (+968 96522902)</span>
                        </a>
                        <button
                          onClick={() => {
                            setActiveCategory('agentic');
                            const target = document.getElementById('hub-content-anchor');
                            if (target) target.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-8 py-4 bg-purple-950/80 hover:bg-purple-900/80 border border-purple-500/40 text-purple-200 rounded-2xl font-black text-sm uppercase tracking-wider transition-all active:scale-95 inline-flex items-center gap-2"
                        >
                          <Bot className="w-4 h-4" />
                          <span>Explore Claude 3.5 AI</span>
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </section>
              </main>

              {/* Comprehensive Footer */}
              <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

              {/* Floating Quick Connect Dock on Bottom Right */}
              <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
                {/* Scroll to Top */}
                <button
                  onClick={scrollToTop}
                  className="w-10 h-10 rounded-full bg-slate-900/90 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center shadow-lg transition-all active:scale-90"
                  title="Scroll to Top"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>

                {/* Quick Social Hub Button */}
                <button
                  onClick={() => {
                    setActiveCategory('social');
                    const target = document.getElementById('hub-content-anchor');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-11 h-11 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-xl shadow-blue-900/50 transition-all active:scale-90"
                  title="View All Social Media Channels"
                >
                  <Share2 className="w-5 h-5" />
                </button>

                {/* Direct WhatsApp Chat Float */}
                <a
                  href="https://wa.me/96896522902?text=Hello%20Habibur%20Rahman%20(Maruf),%20I%20am%20chatting%20from%20your%20website%20in%20Oman."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl shadow-emerald-950 transition-all hover:scale-105 active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                  <span className="hidden sm:inline">WhatsApp Fast SLA</span>
                </a>
              </div>

              {/* Admin Panel Settings Modal */}
              <AdminSettingsModal
                isOpen={isAdminOpen}
                onClose={() => setIsAdminOpen(false)}
              />

              {/* AI Concierge Chatbot Modal */}
              <AICustomerCareModal />

            </div>
          </AudioCursorProvider>
        </LocaleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
