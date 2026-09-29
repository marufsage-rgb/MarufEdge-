import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  X,
  Shield,
  Palette,
  DollarSign,
  Share2,
  Cpu,
  Inbox,
  Save,
  RotateCcw,
  Check,
  ExternalLink,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Sliders,
  Layers,
  Globe,
  Plus,
  Trash2
} from 'lucide-react';
import { useTheme, AVAILABLE_THEMES, ThemeMode } from './ThemeContext';
import { useLocale, ALL_LANGUAGES, LanguageCode } from './LocaleContext';
import { useSound } from './AudioCursorProvider';

export interface AdminConfig {
  executiveName: string;
  designation: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  pricing: {
    id: string;
    name: string;
    rateOMR: number;
    originalRateOMR: number;
    turnaround: string;
    popular?: boolean;
    description: string;
  }[];
  socialLinks: {
    id: string;
    platform: string;
    url: string;
    enabled: boolean;
    handle: string;
  }[];
  agenticModel: 'claude-3-5-sonnet' | 'gemini-2-5-flash';
  autoReplyGreeting: string;
}

export const DEFAULT_ADMIN_CONFIG: AdminConfig = {
  executiveName: 'Habibur Rahman (Maruf)',
  designation: 'Digital Marketing, AI & IT Consultant Oman',
  phone: '+968 96522902',
  whatsapp: '+968 96522902',
  email: 'habiburmaruf@gmail.com',
  location: 'Al Maabilah, Muscat, Sultanate of Oman',
  pricing: [
    {
      id: 'ai-bot',
      name: 'WhatsApp & Instagram AI Bot',
      rateOMR: 15,
      originalRateOMR: 45,
      turnaround: '24 Hours',
      popular: true,
      description: 'Auto-reply in Arabic & English, capture client phone, instant quote dispatch.'
    },
    {
      id: 'maps-seo',
      name: 'Google Maps #1 Ranking & Local 3-Pack',
      rateOMR: 25,
      originalRateOMR: 60,
      turnaround: '48 Hours',
      popular: true,
      description: 'Muscat, Mabella & Seeb geo-grid optimization, citation building, review automation.'
    },
    {
      id: 'agentic-claude',
      name: 'Agentic AI & Claude 3.5 Automation Workflow',
      rateOMR: 45,
      originalRateOMR: 120,
      turnaround: '2-3 Days',
      popular: true,
      description: 'Autonomous agents for client lead qualification, auto-invoicing and task routing.'
    },
    {
      id: 'appsheet-erp',
      name: 'AppSheet Cloud ERP + Oman 5% VAT Invoicing',
      rateOMR: 75,
      originalRateOMR: 180,
      turnaround: '3-5 Days',
      popular: false,
      description: 'Zero monthly license software with mobile barcode scanner, PDF print, and Google Drive sync.'
    },
    {
      id: 'meta-ads',
      name: 'Meta Ads & WhatsApp Click-to-Chat Funnel',
      rateOMR: 30,
      originalRateOMR: 70,
      turnaround: '24 Hours',
      popular: false,
      description: 'Hyper-targeted Muscat campaigns, catalog feed setup, CAPI conversion tracking.'
    }
  ],
  socialLinks: [
    { id: 'whatsapp', platform: 'WhatsApp Official', url: 'https://wa.me/96896522902', enabled: true, handle: '+968 96522902' },
    { id: 'instagram', platform: 'Instagram Business', url: 'https://instagram.com/marufedge.om', enabled: true, handle: '@marufedge.om' },
    { id: 'facebook', platform: 'Facebook Page', url: 'https://facebook.com/marufedge', enabled: true, handle: 'MarufEdge ProMedia' },
    { id: 'linkedin', platform: 'LinkedIn Executive', url: 'https://linkedin.com/in/habibur-maruf', enabled: true, handle: 'habibur-maruf' },
    { id: 'tiktok', platform: 'TikTok Oman Tech', url: 'https://tiktok.com/@marufedge_oman', enabled: true, handle: '@marufedge_oman' },
    { id: 'youtube', platform: 'YouTube Channel', url: 'https://youtube.com/@marufedge_tech', enabled: true, handle: '@marufedge_tech' },
    { id: 'x', platform: 'X / Twitter', url: 'https://x.com/marufedge', enabled: true, handle: '@marufedge' },
    { id: 'telegram', platform: 'Telegram Channel', url: 'https://t.me/marufedge_om', enabled: true, handle: '@marufedge_om' },
    { id: 'gmaps', platform: 'Google Business Maps', url: 'https://maps.google.com/?q=Al+Maabilah+Muscat+Oman', enabled: true, handle: 'Verified GCC Location' }
  ],
  agenticModel: 'claude-3-5-sonnet',
  autoReplyGreeting: 'Hello! I am MarufEdge AI Agent. How can we help scale your business in Oman today?'
};

export interface AdminSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSettingsModal: React.FC<AdminSettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, availableThemes } = useTheme();
  const { language, setLanguage, allLanguages } = useLocale();
  const { playClickSound } = useSound();

  const [activeTab, setActiveTab] = useState<'profile' | 'theme' | 'pricing' | 'social' | 'agentic' | 'leads'>('profile');
  const [config, setConfig] = useState<AdminConfig>(() => {
    try {
      const saved = localStorage.getItem('marufedge_admin_config');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return DEFAULT_ADMIN_CONFIG;
  });

  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [leadsList, setLeadsList] = useState<any[]>([]);

  useEffect(() => {
    try {
      const storedLeads = localStorage.getItem('marufedge_client_leads');
      if (storedLeads) {
        setLeadsList(JSON.parse(storedLeads));
      }
    } catch (e) {
      // ignore
    }
  }, [isOpen]);

  const handleSaveConfig = () => {
    playClickSound();
    try {
      localStorage.setItem('marufedge_admin_config', JSON.stringify(config));
      setSaveStatus('Settings Saved Successfully!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (e) {
      setSaveStatus('Error saving settings');
    }
  };

  const handleResetDefaults = () => {
    playClickSound();
    if (window.confirm('Reset all Admin Panel settings and cheap rates back to default values?')) {
      setConfig(DEFAULT_ADMIN_CONFIG);
      localStorage.setItem('marufedge_admin_config', JSON.stringify(DEFAULT_ADMIN_CONFIG));
      setSaveStatus('Defaults Restored');
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  const handlePriceChange = (id: string, newRate: number) => {
    setConfig(prev => ({
      ...prev,
      pricing: prev.pricing.map(p => p.id === id ? { ...p, rateOMR: newRate } : p)
    }));
  };

  const handleSocialUrlChange = (id: string, newUrl: string) => {
    setConfig(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(s => s.id === id ? { ...s, url: newUrl } : s)
    }));
  };

  const toggleSocialEnabled = (id: string) => {
    playClickSound();
    setConfig(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-5xl h-[90vh] bg-slate-900 border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white tracking-tight">Executive Admin Panel</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Live Control
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Configure cheap AI rates in Oman, themes, all social media & Claude agent settings
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveStatus && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                <Check className="w-3.5 h-3.5" /> {saveStatus}
              </span>
            )}
            <button
              onClick={handleSaveConfig}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-900/40 transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-white/10 bg-slate-950/40 overflow-x-auto">
          {[
            { id: 'profile', label: 'Profile & Contact', icon: Sliders },
            { id: 'theme', label: 'Theme & Aesthetics', icon: Palette },
            { id: 'pricing', label: 'Cheap AI Rates (OMR)', icon: DollarSign },
            { id: 'social', label: 'All Social Media', icon: Share2 },
            { id: 'agentic', label: 'Claude & Agentic AI', icon: Cpu },
            { id: 'leads', label: `Client Inquiries (${leadsList.length})`, icon: Inbox },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClickSound();
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-bold transition-all border-b-2 shrink-0 ${
                  isActive
                    ? 'text-cyan-400 border-cyan-400 bg-white/5'
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: PROFILE & CONTACT */}
          {activeTab === 'profile' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-300">Executive Identity & Office</h4>
                <p className="text-xs text-slate-400 mt-1">This contact information is displayed on quotations, WhatsApp links, and search keywords.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Executive Full Name</label>
                  <input
                    type="text"
                    value={config.executiveName}
                    onChange={e => setConfig({ ...config, executiveName: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={config.designation}
                    onChange={e => setConfig({ ...config, designation: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp Direct Number (Oman)</label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5">
                    <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <input
                      type="text"
                      value={config.whatsapp}
                      onChange={e => setConfig({ ...config, whatsapp: e.target.value })}
                      className="w-full bg-transparent text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Official Mobile Line</label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5">
                    <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                    <input
                      type="text"
                      value={config.phone}
                      onChange={e => setConfig({ ...config, phone: e.target.value })}
                      className="w-full bg-transparent text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Executive Email Address</label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <input
                      type="email"
                      value={config.email}
                      onChange={e => setConfig({ ...config, email: e.target.value })}
                      className="w-full bg-transparent text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Office Location in Oman</label>
                  <div className="flex items-center gap-2 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <input
                      type="text"
                      value={config.location}
                      onChange={e => setConfig({ ...config, location: e.target.value })}
                      className="w-full bg-transparent text-xs text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Default Interface Language</p>
                  <p className="text-[11px] text-slate-400">Current language: {allLanguages.find(l => l.code === language)?.native} ({allLanguages.find(l => l.code === language)?.label})</p>
                </div>
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value as LanguageCode)}
                  className="bg-slate-950 border border-white/20 text-white text-xs font-bold rounded-xl px-3 py-2 focus:outline-none"
                >
                  {allLanguages.map(l => (
                    <option key={l.code} value={l.code}>
                      {l.flag} {l.native} ({l.label})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* TAB 2: THEME & AESTHETICS */}
          {activeTab === 'theme' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-300">Theme Styling & Palette Switcher</h4>
                <p className="text-xs text-slate-400 mt-1">Select the active visual aesthetic for the entire application. Changes apply instantly and save locally.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableThemes.map(t => {
                  const isSelected = theme === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => {
                        playClickSound();
                        setTheme(t.id);
                      }}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer group ${
                        isSelected
                          ? `${t.previewBg} ring-2 ring-cyan-400 shadow-xl`
                          : 'bg-slate-950/70 border-white/10 hover:border-white/30 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full shadow-inner"
                            style={{ backgroundColor: t.primaryColor }}
                          />
                          <span className="text-sm font-black text-white">{t.name}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
                          {t.badge}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 mb-2">{t.nativeName}</p>
                      <p className="text-xs text-slate-400 leading-relaxed">{t.description}</p>

                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="font-mono text-[10px] text-slate-500">HEX: {t.primaryColor}</span>
                        {isSelected ? (
                          <span className="flex items-center gap-1 font-bold text-cyan-400 text-xs">
                            <Check className="w-3.5 h-3.5" /> Active Theme
                          </span>
                        ) : (
                          <span className="text-slate-500 group-hover:text-white transition-colors text-xs font-semibold">
                            Click to Activate
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: CHEAP AI RATES (OMR) */}
          {activeTab === 'pricing' && (
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-300">Affordable AI Rates in Oman (OMR)</h4>
                  <p className="text-xs text-slate-400 mt-1">Live price editor. Clients will see these cheap rates in the interactive calculator and WhatsApp orders.</p>
                </div>
                <div className="bg-emerald-950/80 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-300 text-xs font-bold inline-flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Up to 70% Cheaper than Muscat Agencies</span>
                </div>
              </div>

              <div className="space-y-3">
                {config.pricing.map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-md">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">{item.name}</span>
                        {item.popular && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                            High Demand
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{item.description}</p>
                      <p className="text-[10px] text-cyan-400 font-mono">Turnaround: {item.turnaround}</p>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 line-through block">Market: {item.originalRateOMR} OMR</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs font-bold text-slate-400">Our Rate:</span>
                          <input
                            type="number"
                            min="5"
                            max="500"
                            value={item.rateOMR}
                            onChange={e => handlePriceChange(item.id, Number(e.target.value))}
                            className="w-20 bg-slate-900 border border-cyan-500/50 rounded-lg px-2 py-1 text-sm font-black text-emerald-400 text-center focus:outline-none"
                          />
                          <span className="text-xs font-black text-emerald-400 font-mono">OMR</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ALL SOCIAL MEDIA LINKS */}
          {activeTab === 'social' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-300">All Social Media Ecosystem</h4>
                <p className="text-xs text-slate-400 mt-1">Manage links to all active social media channels. Enabled channels will appear in the floating dock and profile hub.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {config.socialLinks.map(soc => (
                  <div
                    key={soc.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      soc.enabled ? 'bg-slate-950 border-white/15' : 'bg-slate-950/40 border-white/5 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-white">{soc.platform}</span>
                      <button
                        onClick={() => toggleSocialEnabled(soc.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
                          soc.enabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {soc.enabled ? 'Active' : 'Disabled'}
                      </button>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={soc.url}
                        onChange={e => handleSocialUrlChange(soc.id, e.target.value)}
                        placeholder="Profile URL"
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span>Handle: {soc.handle}</span>
                        <a
                          href={soc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:underline flex items-center gap-1"
                        >
                          Visit <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CLAUDE & AGENTIC AI */}
          {activeTab === 'agentic' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h4 className="text-sm font-black uppercase tracking-wider text-slate-300">Claude AI & Agentic Engine Settings</h4>
                <p className="text-xs text-slate-400 mt-1">Configure autonomous agent behaviors for handling Oman business workflows and multi-language customer queries.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/10 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Primary Autonomous Reasoning Model</label>
                  <select
                    value={config.agenticModel}
                    onChange={e => setConfig({ ...config, agenticModel: e.target.value as any })}
                    className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="claude-3-5-sonnet">Claude 3.5 Sonnet (Optimized for Complex Business Logic & Multilingual Workflows)</option>
                    <option value="gemini-2-5-flash">Gemini 2.5 Flash (Ultra-Fast Response & Live Image Grounding)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Default Multi-Language Agent Welcome Directive</label>
                  <textarea
                    rows={3}
                    value={config.autoReplyGreeting}
                    onChange={e => setConfig({ ...config, autoReplyGreeting: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-300 leading-relaxed">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Active Agent Capabilities in Oman</span>
                  </div>
                  Autonomous agents can parse VAT 5%, match Arabic and English business requirements, auto-generate WhatsApp inquiry links, and execute structured quotation tables instantly.
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CLIENT INQUIRIES & LEADS */}
          {activeTab === 'leads' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-wider text-slate-300">Client Work Orders & Quotes Log</h4>
                  <p className="text-xs text-slate-400 mt-1">Leads captured from the interactive hire calculator and contact form.</p>
                </div>
                {leadsList.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Clear all stored leads?')) {
                        localStorage.removeItem('marufedge_client_leads');
                        setLeadsList([]);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/60 text-red-400 text-xs font-bold hover:bg-red-900/60"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Log</span>
                  </button>
                )}
              </div>

              {leadsList.length === 0 ? (
                <div className="p-12 text-center bg-slate-950/50 rounded-2xl border border-white/5">
                  <Inbox className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-400">No client quote requests yet</p>
                  <p className="text-xs text-slate-500 mt-1">When visitors submit the Work Desk form, their quotes and WhatsApp orders will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leadsList.map((lead, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-white">{lead.name || 'Anonymous Client'}</span>
                          <span className="text-xs text-slate-400">({lead.company || 'Oman Company'})</span>
                          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded">
                            {lead.timestamp || 'Recent'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">
                          <span className="font-bold text-slate-400">Service:</span> {lead.service} • <span className="font-bold text-emerald-400">{lead.budget}</span>
                        </p>
                        {lead.details && <p className="text-xs text-slate-500">{lead.details}</p>}
                      </div>

                      <div className="flex items-center gap-2">
                        {lead.phone && (
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name || '')},%20this%20is%20Habibur%20Rahman%20(Maruf)%20following%20up%20on%20your%20project%20inquiry.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp Client</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 text-slate-500 hover:text-red-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All to Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 font-mono">
              Oman Local Time: {new Date().toLocaleTimeString()}
            </span>
            <button
              onClick={() => {
                handleSaveConfig();
                onClose();
              }}
              className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl text-xs font-black shadow-lg transition-all active:scale-95"
            >
              Done & Apply
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
