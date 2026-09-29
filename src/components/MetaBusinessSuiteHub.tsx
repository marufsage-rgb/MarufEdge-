import React, { useState } from 'react';
import { useLocale } from './LocaleContext';
import { useSound } from './AudioCursorProvider';
import { 
  ShoppingBag, 
  Layers, 
  TrendingUp, 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  Smartphone, 
  MessageSquare, 
  Share2, 
  Eye, 
  Plus, 
  ArrowRight, 
  DollarSign, 
  Target, 
  Zap, 
  Globe, 
  ShieldCheck,
  Cpu,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import { motion } from 'motion/react';

interface CatalogItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  priceOMR: number;
  stock: number;
  metaSyncStatus: 'synced' | 'pending' | 'updated';
  image: string;
  whatsappEnabled: boolean;
}

export const MetaBusinessSuiteHub = () => {
  const { country } = useLocale();
  const { playClickSound, playDataSound } = useSound();

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'catalog' | 'ads_suite' | 'roas_calc' | 'ad_preview'>('catalog');

  // ROAS Calculator States
  const [monthlySpend, setMonthlySpend] = useState<number>(350); // in OMR
  const [targetPlatform, setTargetPlatform] = useState<'meta_wa' | 'meta_catalog' | 'ig_reels' | 'omni_gcc'>('meta_wa');

  // Ad Creative Preview State
  const [previewFormat, setPreviewFormat] = useState<'feed' | 'reel' | 'whatsapp'>('whatsapp');

  // Catalog items
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([
    {
      id: 'item-1',
      sku: 'ME-MAPS-01',
      name: 'Google Maps Local 3-Pack Supremacy Pack',
      category: 'Local SEO & Maps',
      priceOMR: 180,
      stock: 99,
      metaSyncStatus: 'synced',
      image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&auto=format&fit=crop&q=80',
      whatsappEnabled: true,
    },
    {
      id: 'item-2',
      sku: 'ME-APPS-02',
      name: 'AppSheet Cloud ERP & Barcode Inventory',
      category: 'Enterprise AppSheet',
      priceOMR: 320,
      stock: 45,
      metaSyncStatus: 'synced',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80',
      whatsappEnabled: true,
    },
    {
      id: 'item-3',
      sku: 'ME-META-03',
      name: 'Meta Advantage+ Dynamic Catalog Ads Engine',
      category: 'Paid Ads Architecture',
      priceOMR: 250,
      stock: 80,
      metaSyncStatus: 'synced',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&auto=format&fit=crop&q=80',
      whatsappEnabled: true,
    },
    {
      id: 'item-4',
      sku: 'ME-WA-04',
      name: 'WhatsApp CRM & <60s Lead Auto-Funnel',
      category: 'Conversational AI',
      priceOMR: 140,
      stock: 120,
      metaSyncStatus: 'synced',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&auto=format&fit=crop&q=80',
      whatsappEnabled: true,
    },
  ]);

  // Calculations for ROAS
  const exchangeRate = country.code === 'OM' ? 1 : country.code === 'AE' ? 9.5 : country.code === 'SA' ? 9.7 : 2.6;
  const spendInLocal = (monthlySpend * exchangeRate).toFixed(0);
  const estimatedImpressions = (monthlySpend * 380).toLocaleString();
  const estimatedClicks = (monthlySpend * 14.5).toFixed(0);
  const estimatedWALeads = Math.round(monthlySpend * 0.42);
  const estimatedROAS = 4.8;
  const estimatedRevenue = (monthlySpend * estimatedROAS * exchangeRate).toLocaleString();

  const handleSyncMeta = () => {
    playDataSound();
    setCatalogItems(prev => prev.map(item => ({ ...item, metaSyncStatus: 'synced' })));
  };

  return (
    <section id="meta-suite" className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800 selection:bg-blue-600">
      
      {/* Background Cyber Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-3 border border-cyan-500/30">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Meta Business Suite &amp; Paid Ads Powerhouse</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Meta Business Suite <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">Catalogue &amp; Ads</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2">
              Deploy synchronized multi-channel Commerce Catalog feeds, Advantage+ Dynamic Product Ads (DPA), Click-to-WhatsApp funnels, and Server-Side CAPI tracking built for {country.name} and GCC scale.
            </p>
          </div>

          {/* Quick Action Navigation Tabs */}
          <div className="flex flex-wrap gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => { playClickSound(); setActiveTab('catalog'); }}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'catalog'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Product Catalogue</span>
            </button>
            <button
              onClick={() => { playClickSound(); setActiveTab('ads_suite'); }}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'ads_suite'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>All Meta Software Ads</span>
            </button>
            <button
              onClick={() => { playClickSound(); setActiveTab('roas_calc'); }}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'roas_calc'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>ROAS &amp; Budget Simulator</span>
            </button>
            <button
              onClick={() => { playClickSound(); setActiveTab('ad_preview'); }}
              className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'ad_preview'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>Live Ad Preview</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Meta Product Catalogue Manager */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-6">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <span>Meta Commerce Catalog Feed (Oman &amp; GCC)</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Live Sync Ready
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Auto-synchronized with WhatsApp Business Store, Instagram Shop, and Facebook Marketplace with {country.currency} pricing.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSyncMeta}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Sync to Meta Commerce</span>
                  </button>
                  <a
                    href="https://wa.me/96896522902?text=I%20want%20to%20setup%20my%20Meta%20Business%20Suite%20Catalog."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Request Catalog Setup</span>
                  </a>
                </div>
              </div>

              {/* Catalog Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {catalogItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950 border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between hover:border-cyan-500/40 transition-all hover:shadow-xl group"
                  >
                    <div>
                      <div className="relative h-36 rounded-xl overflow-hidden mb-3 bg-slate-900">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-950/80 backdrop-blur-md text-slate-300 rounded-md border border-slate-700">
                          {item.sku}
                        </span>
                        <span className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 bg-emerald-500/90 text-white rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                          Meta Sync
                        </span>
                      </div>

                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-cyan-300 transition-colors">
                        {item.name}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-2">
                      <div>
                        <span className="text-[10px] text-slate-400 block leading-none">Price ({country.currency})</span>
                        <span className="text-base font-black text-white font-mono">
                          {(item.priceOMR * exchangeRate).toFixed(0)} {country.currency}
                        </span>
                      </div>
                      <a
                        href={`https://wa.me/96896522902?text=I%20am%20interested%20in%20${encodeURIComponent(item.name)}%20(${item.sku})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white rounded-xl transition-all"
                        title="Order / Inquire via WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feed Export Callout */}
              <div className="mt-8 p-4 rounded-2xl bg-blue-950/30 border border-blue-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-600/30 text-blue-400">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-white block">Automated XML/CSV Feed Endpoint</span>
                    <span className="text-slate-400">Compatible with Shopify, WooCommerce, Salla, Zid, and Custom ERPs.</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    playDataSound();
                    alert("Catalog Feed generated in Meta XML & Google Merchant format (2026-OMR-Compliant).");
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all"
                >
                  Generate Feed URL
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: All Meta Software & Paid Ads Matrix */}
        {activeTab === 'ads_suite' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Advantage+ Dynamic Product Ads (DPA)",
                platform: "Meta Commerce & Ads Manager",
                desc: "Machine-learning retargeting showing exact products viewed by customers across Facebook feeds, Instagram Stories, and Marketplace with automated pricing in OMR.",
                features: ["Catalog XML auto-sync", "Automatic creative optimization", "Multi-language copy (AR/EN)", "Dynamic price tags"],
                tag: "High Conversion",
                badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
              },
              {
                title: "WhatsApp Click-to-Chat Direct Ads",
                platform: "Meta + WhatsApp Cloud API",
                desc: "Direct-to-chat ad funnels initiating conversations with pre-filled inquiries. Handled by MarufEdge AI & live agents with guaranteed <60s SLA.",
                features: ["Zero-friction mobile conversion", "Pre-qualified lead prompts", "Automated Arabic greetings", "Instant CRM lead routing"],
                tag: "<60s Response",
                badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
              },
              {
                title: "Meta Conversions API (CAPI) Server-Side",
                platform: "Server-Side Tracking",
                desc: "Bypass iOS 14+ tracking loss and ad blockers with robust cloud server-side event tracking directly to Meta's data centers for 100% accurate attribution.",
                features: ["100% Event Match Quality", "Deduplicated browser pixel", "Offline purchase telemetry", "Enhanced audience modeling"],
                tag: "Max Data Integrity",
                badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
              },
              {
                title: "Instagram Reels Video Ads & Creator Spark",
                platform: "Instagram Video Engine",
                desc: "High-energy vertical video ads targeting GCC demographics in Muscat, Seeb, Dubai, and Riyadh with Arabic subtitles, hooks, and direct CTA links.",
                features: ["9:16 Vertical format mastery", "Arabic kinetic typography", "Trending audio integration", "High-frequency A/B testing"],
                tag: "Viral Reach",
                badgeColor: "bg-pink-500/20 text-pink-400 border-pink-500/30",
              },
              {
                title: "Lead Generation Instant Forms",
                platform: "Meta In-App Native Forms",
                desc: "Fast, auto-filled lead forms capturing phone numbers, emails, and commercial project requirements without user leaving the Facebook/Instagram app.",
                features: ["Instant autofill tech", "Custom qualification questions", "Instant webhook to AppSheet", "Real-time SMS alerts"],
                tag: "B2B Lead Magnet",
                badgeColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
              },
              {
                title: "Omnichannel GCC Paid Ads Synergy",
                platform: "Meta + Google + TikTok Ads",
                desc: "Full-funnel cross-platform coordination capturing high intent on Google Search while dominating mindshare across Meta & TikTok.",
                features: ["Google Local Ads sync", "Cross-network retargeting", "Unified OMR ROAS dashboard", "Monthly executive reports"],
                tag: "Complete Ecosystem",
                badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
              }
            ].map((ad, i) => (
              <div
                key={i}
                className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-blue-950/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${ad.badgeColor}`}>
                      {ad.tag}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{ad.platform}</span>
                  </div>

                  <h4 className="text-lg font-black text-white mb-2 leading-snug">{ad.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{ad.desc}</p>

                  <ul className="space-y-1.5 mb-6">
                    {ad.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/96896522902?text=Hello%20Maruf,%20I%20want%20to%20launch%20${encodeURIComponent(ad.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-white text-xs font-black transition-all flex items-center justify-center gap-2 border border-slate-700 hover:border-blue-500 shadow-md"
                >
                  <span>Launch This Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: ROAS & Budget Calculator */}
        {activeTab === 'roas_calc' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-[10px] font-mono uppercase text-cyan-400 tracking-wider font-bold">Oman &amp; GCC Ad Spend Engine</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">Paid Ads ROI &amp; Lead Forecaster</h3>
                  <p className="text-xs text-slate-400 mt-2">
                    Simulate performance benchmarks backed by MarufEdge's historical client campaigns across Muscat, Sohar, Salalah, and GCC territories.
                  </p>
                </div>

                {/* Spend Slider */}
                <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-300">Monthly Ad Budget</span>
                    <span className="font-mono text-base font-black text-cyan-400">
                      {spendInLocal} {country.currency} / month
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="2500"
                    step="50"
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>100 OMR (Startup)</span>
                    <span>500 OMR (Growth)</span>
                    <span>2,500 OMR (Scale)</span>
                  </div>
                </div>

                {/* Platform Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300">Campaign Objective &amp; Funnel</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'meta_wa', label: 'WhatsApp Direct Chat (<60s SLA)' },
                      { id: 'meta_catalog', label: 'Meta Dynamic Catalog Sales' },
                      { id: 'ig_reels', label: 'Instagram Reels & Video Viral' },
                      { id: 'omni_gcc', label: 'Omnichannel GCC Multi-Platform' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setTargetPlatform(p.id as any)}
                        className={`p-2.5 rounded-xl text-left text-xs font-bold border transition-all ${
                          targetPlatform === p.id
                            ? 'bg-blue-600/30 text-cyan-300 border-cyan-500'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Output Projections Card */}
              <div className="lg:col-span-6 bg-gradient-to-br from-blue-950/60 via-slate-950 to-indigo-950/60 border-2 border-blue-600/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40">
                    Expected 4.8x ROAS Model
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-6">Estimated 30-Day Outcomes</h4>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-1">Target Impressions</span>
                    <span className="text-xl sm:text-2xl font-black text-white font-mono">{estimatedImpressions}</span>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-1">High-Intent Clicks</span>
                    <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">{estimatedClicks}</span>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-1">WhatsApp Conversations</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{estimatedWALeads}+</span>
                  </div>
                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-1">Projected Return Value</span>
                    <span className="text-xl sm:text-2xl font-black text-yellow-400 font-mono">{estimatedRevenue} {country.currency}</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/96896522902?text=Hello%20Maruf,%20I%20calculated%20my%20ad%20budget%20of%20${spendInLocal}%20${country.currency}%20and%20want%20to%20lock%20in%20this%20campaign.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-black text-sm text-center shadow-xl shadow-blue-900/40 hover:opacity-95 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Lock in Custom Campaign with Maruf</span>
                </a>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: Live Ad Preview Simulator */}
        {activeTab === 'ad_preview' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10">
            <div className="max-w-md mx-auto space-y-6">
              
              {/* Format Toggles */}
              <div className="flex justify-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setPreviewFormat('whatsapp')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    previewFormat === 'whatsapp' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                  }`}
                >
                  WhatsApp Click Ad
                </button>
                <button
                  onClick={() => setPreviewFormat('reel')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    previewFormat === 'reel' ? 'bg-pink-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Instagram Reel Ad
                </button>
                <button
                  onClick={() => setPreviewFormat('feed')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    previewFormat === 'feed' ? 'bg-blue-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Facebook Feed Ad
                </button>
              </div>

              {/* Mobile Mockup Card */}
              <div className="bg-slate-950 rounded-[2.5rem] p-4 border-4 border-slate-800 shadow-2xl overflow-hidden">
                {/* Header Profile */}
                <div className="flex items-center justify-between p-3 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-orange-500 flex items-center justify-center font-black text-xs text-white">
                      ME
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-white leading-none">MarufEdge ProMedia</h5>
                      <span className="text-[10px] text-slate-400 font-medium">Sponsored • {country.name}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded border border-blue-700/50">Verified</span>
                </div>

                {/* Ad Visual */}
                <div className="relative aspect-video rounded-2xl overflow-hidden my-3 bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
                    alt="Ad Visual Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="text-[10px] font-bold uppercase text-cyan-400 tracking-wider">Mabella, Oman Executive Hub</span>
                    <h6 className="text-base font-black text-white leading-tight">
                      Scale Your Business with AI Marketing &amp; Google Maps #1 Ranking
                    </h6>
                  </div>
                </div>

                {/* Ad Body Text */}
                <p className="text-xs text-slate-300 p-2 leading-relaxed">
                  Stop losing leads to outdated workflows. MarufEdge integrates Google Maps Local 3-Pack supremacy, AppSheet ERP, and &lt;60s instant WhatsApp lead capture.
                </p>

                {/* CTA Button */}
                <div className="p-2 pt-0">
                  <a
                    href="https://wa.me/96896522902?text=I%20saw%20your%20Meta%20Ad%20Preview%20and%20want%20to%20connect!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send WhatsApp Message (SLA &lt;60s)</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
