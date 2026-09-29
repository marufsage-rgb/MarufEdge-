import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Briefcase,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Phone,
  MessageSquare,
  Sparkles,
  Copy,
  ExternalLink,
  DollarSign,
  Clock,
  ShieldCheck,
  Send,
  Zap,
  Globe,
  Sliders,
  ChevronRight,
  Calculator,
  Tag,
  Check
} from 'lucide-react';
import { useSound } from './AudioCursorProvider';
import { useLocale } from './LocaleContext';

interface KeywordItem {
  keyword: string;
  category: 'ai' | 'maps' | 'meta' | 'erp' | 'telecom';
  intent: 'Immediate Hire' | 'High Commercial' | 'B2B Enterprise';
  avgMonthlySearches: string;
  cheapRateOMR: string;
  marketRateOMR: string;
  arabicKeyword: string;
  hotBadge?: string;
}

const GOOGLE_WORK_KEYWORDS: KeywordItem[] = [
  {
    keyword: 'Affordable WhatsApp AI chatbot Muscat Oman',
    category: 'ai',
    intent: 'Immediate Hire',
    avgMonthlySearches: '1,900+ GCC',
    cheapRateOMR: '15 OMR',
    marketRateOMR: '60 OMR',
    arabicKeyword: 'شات بوت ذكاء اصطناعي للواتساب رخيص مسقط',
    hotBadge: 'Best Seller 15 OMR'
  },
  {
    keyword: 'Google Maps SEO specialist cheap rate Muscat',
    category: 'maps',
    intent: 'Immediate Hire',
    avgMonthlySearches: '2,400+ GCC',
    cheapRateOMR: '25 OMR',
    marketRateOMR: '80 OMR',
    arabicKeyword: 'خبير سيو خرائط جوجل بسعر رخيص مسقط',
    hotBadge: '#1 Ranking'
  },
  {
    keyword: 'Claude AI business workflow automation Oman',
    category: 'ai',
    intent: 'High Commercial',
    avgMonthlySearches: '1,200+ GCC',
    cheapRateOMR: '45 OMR',
    marketRateOMR: '150 OMR',
    arabicKeyword: 'أتمتة الأعمال باستخدام كلود والذكاء الاصطناعي عمان',
    hotBadge: 'Agentic AI'
  },
  {
    keyword: 'AppSheet ERP Oman 5% VAT invoicing software',
    category: 'erp',
    intent: 'B2B Enterprise',
    avgMonthlySearches: '1,650+ Oman',
    cheapRateOMR: '75 OMR',
    marketRateOMR: '220 OMR',
    arabicKeyword: 'برنامج فواتير ضريبة القيمة المضافة 5% اب شيت عمان',
    hotBadge: 'No Monthly Fees'
  },
  {
    keyword: 'Meta & Instagram Ads low cost manager Mabella',
    category: 'meta',
    intent: 'Immediate Hire',
    avgMonthlySearches: '1,800+ GCC',
    cheapRateOMR: '30 OMR',
    marketRateOMR: '90 OMR',
    arabicKeyword: 'مدير إعلانات انستجرام وميتا بأسعار مخفضة المعبيلة',
    hotBadge: 'Instant Leads'
  },
  {
    keyword: 'Agentic AI customer support bot Seeb Oman',
    category: 'ai',
    intent: 'Immediate Hire',
    avgMonthlySearches: '880+ Oman',
    cheapRateOMR: '25 OMR',
    marketRateOMR: '70 OMR',
    arabicKeyword: 'وكيل ذكاء اصطناعي لخدمة العملاء السيب',
    hotBadge: '24/7 SLA'
  },
  {
    keyword: 'Local garage workshop digital marketing Oman',
    category: 'maps',
    intent: 'Immediate Hire',
    avgMonthlySearches: '1,100+ Oman',
    cheapRateOMR: '25 OMR',
    marketRateOMR: '75 OMR',
    arabicKeyword: 'تسويق رقمي لورش وصيانة السيارات في عمان'
  },
  {
    keyword: 'Fiber optic cabling & IT network setup Muscat',
    category: 'telecom',
    intent: 'B2B Enterprise',
    avgMonthlySearches: '950+ GCC',
    cheapRateOMR: '50 OMR',
    marketRateOMR: '180 OMR',
    arabicKeyword: 'تمديد ألياف بصرية وشبكات اتصال مسقط'
  },
  {
    keyword: 'Bilingual Arabic English AI copywriter Oman',
    category: 'ai',
    intent: 'Immediate Hire',
    avgMonthlySearches: '1,450+ GCC',
    cheapRateOMR: '20 OMR',
    marketRateOMR: '55 OMR',
    arabicKeyword: 'كاتب محتوى ذكاء اصطناعي عربي وإنجليزي عمان'
  }
];

interface BusinessPreset {
  id: string;
  name: string;
  icon: string;
  recommended: string[];
}

const BUSINESS_TYPES: BusinessPreset[] = [
  { id: 'garage', name: 'Auto Garage / Car Workshop', icon: '🚗', recommended: ['maps', 'ai-bot'] },
  { id: 'clinic', name: 'Dental / Medical Clinic', icon: '🏥', recommended: ['maps', 'ai-bot', 'meta'] },
  { id: 'restaurant', name: 'Restaurant / Cafe / Bakery', icon: '🍽️', recommended: ['maps', 'meta'] },
  { id: 'retail', name: 'Grocery / Supermarket / Shop', icon: '🛒', recommended: ['erp', 'maps'] },
  { id: 'salon', name: 'Salon / Spa / Beauty Center', icon: '✂️', recommended: ['meta', 'ai-bot'] },
  { id: 'contracting', name: 'Contracting / Real Estate', icon: '🏗️', recommended: ['erp', 'ai-claude'] },
];

export const GoogleKeywordWorkHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'ai' | 'maps' | 'meta' | 'erp' | 'telecom'>('all');
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  // Cheap Rate Interactive Calculator State
  const [selectedBizType, setSelectedBizType] = useState<string>('garage');
  const [activeServices, setActiveServices] = useState<string[]>(['ai-bot', 'maps']);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCity, setClientCity] = useState('Muscat / Mabella');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const { playClickSound, playDataSound } = useSound();
  const { t } = useLocale();

  const SERVICES_LIST = [
    { id: 'ai-bot', label: 'WhatsApp & Instagram AI Bot', rate: 15, original: 45, badge: 'Cheapest in Oman' },
    { id: 'maps', label: 'Google Maps #1 Ranking (Local 3-Pack)', rate: 25, original: 70, badge: 'Fast 48h' },
    { id: 'ai-claude', label: 'Claude 3.5 Agentic AI Workflow', rate: 45, original: 120, badge: 'Autonomous' },
    { id: 'erp', label: 'AppSheet ERP + 5% Oman VAT Billing', rate: 75, original: 180, badge: 'Zero Monthly Fee' },
    { id: 'meta', label: 'Meta & Instagram Paid Ads Funnel', rate: 30, original: 80, badge: 'Targeted Oman' },
  ];

  const handleToggleService = (id: string) => {
    playClickSound();
    setActiveServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const calculatedSubtotal = activeServices.reduce((sum, sId) => {
    const s = SERVICES_LIST.find(item => item.id === sId);
    return sum + (s ? s.rate : 0);
  }, 0);

  const calculatedOriginal = activeServices.reduce((sum, sId) => {
    const s = SERVICES_LIST.find(item => item.id === sId);
    return sum + (s ? s.original : 0);
  }, 0);

  // 15% extra bundle discount if 2 or more services
  const discountMultiplier = activeServices.length >= 2 ? 0.85 : 1;
  const finalDiscountedTotal = Math.round(calculatedSubtotal * discountMultiplier);
  const totalSavedOMR = calculatedOriginal - finalDiscountedTotal;

  const handleCopyKeyword = (kw: string) => {
    playClickSound();
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 2500);
  };

  const handleSaveLeadAndWhatsApp = () => {
    playClickSound();
    const serviceNames = activeServices
      .map(id => SERVICES_LIST.find(s => s.id === id)?.label)
      .filter(Boolean)
      .join(', ');

    const newLead = {
      name: clientName || 'Direct Client',
      company: `${BUSINESS_TYPES.find(b => b.id === selectedBizType)?.name} (${clientCity})`,
      phone: clientPhone || 'WhatsApp',
      service: serviceNames,
      budget: `${finalDiscountedTotal} OMR (Bundle Cheap Rate)`,
      details: `Selected ${activeServices.length} AI & digital services at cheap rate in Oman`,
      timestamp: new Date().toLocaleString()
    };

    // Store in localStorage for the Admin Panel
    try {
      const stored = localStorage.getItem('marufedge_client_leads');
      const leads = stored ? JSON.parse(stored) : [];
      leads.unshift(newLead);
      localStorage.setItem('marufedge_client_leads', JSON.stringify(leads.slice(0, 50)));
    } catch (e) {
      // ignore
    }

    setOrderSubmitted(true);

    const message = `Hello Habibur Rahman (Maruf),
I want to order your AI & Digital Work at your cheap rate in Oman:

*Client Name:* ${clientName || 'Valued Client'}
*Business Type:* ${BUSINESS_TYPES.find(b => b.id === selectedBizType)?.name}
*Location in Oman:* ${clientCity}
*Client Phone:* ${clientPhone || '+968'}
*Selected Services:* ${serviceNames}
*Total Cheap Rate Quote:* ${finalDiscountedTotal} OMR (Saved ${totalSavedOMR} OMR!)

Please confirm turnaround time and get started on this project!`;

    window.open(`https://wa.me/96896522902?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filteredKeywords = selectedCategory === 'all'
    ? GOOGLE_WORK_KEYWORDS
    : GOOGLE_WORK_KEYWORDS.filter(k => k.category === selectedCategory);

  return (
    <section id="google-work-hub" className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-b border-white/5">
      {/* Background Decorative Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b12_1px,transparent_1px),linear-gradient(to_bottom,#064e3b12_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-black uppercase tracking-[0.25em] mb-4 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Cheap Rated in Oman • Direct Freelance Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              AI Work & Keywords <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">At Cheap Rates in Oman</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-medium">
              Save up to 70% compared to typical Muscat agencies. Rank #1 on Google, deploy 24/7 AI WhatsApp bots from 15 OMR, and build VAT-compliant AppSheet ERPs.
            </p>
          </div>

          {/* Quick Stat Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-900 border border-emerald-500/30 px-4 py-2.5 rounded-2xl flex items-center gap-3">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Starting Price</p>
                <p className="text-xs font-black text-emerald-400">15 OMR / Project</p>
              </div>
            </div>

            <a
              href="https://wa.me/96896522902?text=Hello%20Maruf,%20I%20am%20looking%20for%20cheap%20rated%20AI%20and%20Google%20Maps%20work%20in%20Oman."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-950 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: +968 96522902</span>
            </a>
          </div>
        </div>

        {/* 2-Column Main Layout: Keywords on Left, Interactive Cheap Rate Calculator on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: High-Intent Google Search Keywords (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Keywords' },
                { id: 'ai', label: 'AI & Claude Bots' },
                { id: 'maps', label: 'Google Maps #1' },
                { id: 'meta', label: 'Meta & WhatsApp Ads' },
                { id: 'erp', label: 'AppSheet ERP & VAT' },
                { id: 'telecom', label: 'IT & Telecom' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedCategory(cat.id as any);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Keyword Cards */}
            <div className="space-y-3">
              {filteredKeywords.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/80 border border-white/5 hover:border-emerald-500/40 p-4 rounded-2xl transition-all duration-300 group hover:shadow-xl hover:shadow-emerald-950"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                        <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">
                          "{item.keyword}"
                        </h4>
                      </div>

                      <p className="text-xs text-slate-400 font-arabic font-medium dir-rtl text-right sm:text-left">
                        {item.arabicKeyword}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
                        <span className="text-emerald-400 font-bold">Our Cheap Rate: {item.cheapRateOMR}</span>
                        <span>•</span>
                        <span className="text-slate-500 line-through">Market: {item.marketRateOMR}</span>
                        <span>•</span>
                        <span className="text-cyan-400">{item.avgMonthlySearches}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                      {item.hotBadge && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {item.hotBadge}
                        </span>
                      )}

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopyKeyword(item.keyword)}
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="Copy Keyword"
                        >
                          {copiedKeyword === item.keyword ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <a
                          href={`https://wa.me/96896522902?text=Hello%20Maruf,%20I%20want%20to%20hire%20you%20for%20"${encodeURIComponent(item.keyword)}"%20at%20your%20cheap%20rate%20of%20${encodeURIComponent(item.cheapRateOMR)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                        >
                          Hire Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Cheap Rate Calculator & Work Order Desk (6 Cols) */}
          <div className="lg:col-span-6 bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">Instant Cheap Rate Calculator</h3>
                  <p className="text-xs text-slate-400">Select your business type & services for direct discount</p>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                Oman VAT 5% Ready
              </span>
            </div>

            {/* Business Type Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Your Oman Business Sector
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BUSINESS_TYPES.map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedBizType(b.id);
                    }}
                    className={`p-2.5 rounded-xl text-left transition-all border text-xs font-bold flex items-center gap-2 ${
                      selectedBizType === b.id
                        ? 'bg-emerald-950/70 border-emerald-500/60 text-white'
                        : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>{b.icon}</span>
                    <span className="truncate">{b.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Services Checklist */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                2. Select Services Needed (Low Direct Rate)
              </label>
              <div className="space-y-2">
                {SERVICES_LIST.map(s => {
                  const isChecked = activeServices.includes(s.id);
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleToggleService(s.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-white'
                          : 'bg-slate-950/40 border-white/5 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isChecked ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-600'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="text-xs font-bold block">{s.label}</span>
                          <span className="text-[10px] text-slate-400">{s.badge}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-black text-emerald-400 font-mono">{s.rate} OMR</span>
                        <span className="text-[10px] text-slate-500 line-through block font-mono">{s.original} OMR</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pricing Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 mb-6">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Standard Market Quote:</span>
                <span className="line-through font-mono">{calculatedOriginal} OMR</span>
              </div>
              {activeServices.length >= 2 && (
                <div className="flex items-center justify-between text-xs text-emerald-400 mb-1">
                  <span>15% Multi-Service Bundle Discount:</span>
                  <span className="font-mono">Applied</span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase font-mono font-bold text-slate-300">Your Cheap Total:</span>
                  <span className="text-[10px] text-emerald-400 block font-mono">You Save: {totalSavedOMR} OMR</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
                    {finalDiscountedTotal} OMR
                  </span>
                  <span className="text-[10px] text-slate-400 block">No Hidden Costs</span>
                </div>
              </div>
            </div>

            {/* Client Info Inputs */}
            <div className="space-y-3 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name / Business"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
                <input
                  type="text"
                  placeholder="WhatsApp Mobile (+968...)"
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  className="bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={clientCity}
                onChange={e => setClientCity(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              >
                <option value="Muscat / Mabella">Location: Al Maabilah / Seeb (Muscat)</option>
                <option value="Muscat Central / Ruwi / Bowsher">Location: Central Muscat / Ruwi / Bowsher</option>
                <option value="Salalah / Dhofar">Location: Salalah / Dhofar Governorate</option>
                <option value="Sohar / Al Batinah">Location: Sohar / Al Batinah</option>
                <option value="Nizwa / Ad Dakhiliyah">Location: Nizwa / Ad Dakhiliyah</option>
                <option value="GCC / Remote International">Location: GCC Remote / Outside Oman</option>
              </select>
            </div>

            {/* 1-Click Order Button */}
            <button
              onClick={handleSaveLeadAndWhatsApp}
              disabled={activeServices.length === 0}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:opacity-95 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-emerald-950 flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>Hire Habibur Rahman at this Rate (WhatsApp)</span>
            </button>

            <p className="text-[10px] text-slate-500 text-center font-mono mt-3">
              Guaranteed &lt;60s reply on WhatsApp • Turnaround in 24 - 48 Hours • Mabella Office
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
