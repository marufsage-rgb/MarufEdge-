import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  Sparkles,
  Phone,
  MapPin,
  Globe,
  Layers,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Shield,
  FileText,
  Workflow,
  Search,
  Share2,
  Users,
  Check,
  Building2,
  Car,
  Briefcase
} from 'lucide-react';
import { useSound } from './AudioCursorProvider';

interface SlideData {
  id: number;
  slideNumber: string;
  category: string;
  title: string;
  subtitle?: string;
  takeaway: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    slideNumber: '01 / 15',
    category: 'Executive Overview',
    title: 'Digital Strategy & Conversion Optimization',
    subtitle: 'Engineered for the Omani Market • Presented by Habibur Rahman (Maruf)',
    takeaway: 'High-impact commercial growth bridging field execution with modern digital systems in Oman.'
  },
  {
    id: 2,
    slideNumber: '02 / 15',
    category: 'Market Intelligence',
    title: "Oman's 2026 Digital Reality Demands More Than Basic Marketing",
    subtitle: 'Near-Universal Connectivity Requires Advanced Funnels & Operational Integration',
    takeaway: '95.3% Internet Penetration, 92% WhatsApp Dominance in Muscat, and 60% Google Maps Local Pack Click Share.'
  },
  {
    id: 3,
    slideNumber: '03 / 15',
    category: 'Cultural Architecture',
    title: 'The Bilingual Imperative: Capturing True Market Demand',
    subtitle: 'English-Only Flaw vs. Culturally Resonant Dual-Language Funnels',
    takeaway: 'Dual-language copy and landing pages respect Omani values, eliminating bounce rates.'
  },
  {
    id: 4,
    slideNumber: '04 / 15',
    category: 'Leadership Profile',
    title: 'Engineered by Experience: Habibur Rahman (Maruf)',
    subtitle: 'Sales & Marketing Manager | IT/Business Growth Specialist',
    takeaway: '12+ Years operational scaling in Oman, quadrilingual proficiency (English, Arabic, Bengali, Hindi).'
  },
  {
    id: 5,
    slideNumber: '05 / 15',
    category: 'Core Thesis',
    title: 'The Thesis: The Hybrid Advantage',
    subtitle: 'Field Sales & B2B Expansion + No-Code Apps & AppSheet ERP Systems',
    takeaway: 'Optimizing physical operations and scaling commercial revenue through tailored digital infrastructure.'
  },
  {
    id: 6,
    slideNumber: '06 / 15',
    category: 'Strategy Framework',
    title: 'The 4-Pillar Conversion Engine',
    subtitle: 'Integrated Ecosystem for Sustainable, Data-Driven ROI',
    takeaway: 'Local SEO, Bilingual Content, Precision Meta/Google Ads, and WhatsApp CRM integration.'
  },
  {
    id: 7,
    slideNumber: '07 / 15',
    category: 'Pillar 1: Local Discovery',
    title: "Pillar 1: Google Maps is Oman's New Storefront",
    subtitle: 'Over 86% of Omani Consumers Use Google Maps for Local Discovery',
    takeaway: 'Top 3 positions capture 60% of clicks via NAP consistency, active posting, and fast reviews.'
  },
  {
    id: 8,
    slideNumber: '08 / 15',
    category: 'Pillar 2: Paid Acquisition',
    title: 'Pillar 2: Precision Ads & Agile Budget Reallocation',
    subtitle: 'Maximizing Return on Ad Spend (ROAS) with Dynamic CPA Optimization',
    takeaway: 'Agile weekly budget shifting based on qualified leads, paired with strategic remarketing.'
  },
  {
    id: 9,
    slideNumber: '09 / 15',
    category: 'Channel Matrix',
    title: 'The Omani Platform Matrix: Surgical Targeting',
    subtitle: 'Meta, LinkedIn, TikTok, Snapchat & Google SEM Synchronized',
    takeaway: 'Each platform targeted by demographic and intent for maximum regional conversion.'
  },
  {
    id: 10,
    slideNumber: '10 / 15',
    category: 'Pillar 4: Lead SLA',
    title: 'Pillar 4: The WhatsApp Frictionless Funnel',
    subtitle: 'From Ad Click to Guaranteed 1-2 Hour Human Response SLA',
    takeaway: 'Zero-friction entry, automated dual-language greeting, AppSheet CRM tagging, and rapid closing.'
  },
  {
    id: 11,
    slideNumber: '11 / 15',
    category: 'Case Study',
    title: 'Digital Transformation in Action: Closing the Loop',
    subtitle: 'Al Yarmook Modern Trading LLC Complete Workflow Digitization',
    takeaway: 'Transformed paper/field bottleneck into centralized AppSheet ERP for rapid B2B scaling.'
  },
  {
    id: 12,
    slideNumber: '12 / 15',
    category: 'Infrastructure',
    title: 'The Technical Architecture Stack',
    subtitle: 'Three-Tier Architecture: Infrastructure, Web Applications, and AI Automation',
    takeaway: 'Layer 1 (Networks/Security), Layer 2 (WordPress/AppSheet), Layer 3 (AI & Local SEO).'
  },
  {
    id: 13,
    slideNumber: '13 / 15',
    category: 'Competitive Edge',
    title: 'The MarufEdge Engine vs. Traditional Agencies',
    subtitle: 'Why Legacy Digital Marketing Agencies Fall Short in Oman',
    takeaway: 'Agile budgets, native dual-language, WhatsApp 1-hr SLA, and full backend ERP integration.'
  },
  {
    id: 14,
    slideNumber: '14 / 15',
    category: 'Operational Readiness',
    title: 'Fully Deployed & Operationally Ready in Oman',
    subtitle: 'Local HQ in Mabella, Valid Visa to Sept 30 2027, and Oman Driving License',
    takeaway: 'Immediate on-site B2B field capability and frictionless multinational communication.'
  },
  {
    id: 15,
    slideNumber: '15 / 15',
    category: 'Action Plan',
    title: "Let's Scale Your Business Together!",
    subtitle: 'Stop Losing Qualified Leads to Outdated Legacy Systems',
    takeaway: 'Connect directly with Habibur Rahman (Maruf) in Mabella, Oman at +968 96522902.'
  }
];

export const ExecutivePresentation = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [speed, setSpeed] = useState(6000); // 6s default
  const [progress, setProgress] = useState(0);
  const [isPausedHover, setIsPausedHover] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const { playClickSound, playDataSound } = useSound();
  const currentSlide = SLIDES[currentSlideIndex];

  const handleNext = () => {
    playClickSound();
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDES.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const handlePrev = () => {
    playClickSound();
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const handleSelectSlide = (idx: number) => {
    playDataSound();
    setCurrentSlideIndex(idx);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const toggleAutoPlay = () => {
    playClickSound();
    setIsAutoPlay(!isAutoPlay);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth progress & auto advancement
  useEffect(() => {
    if (!isAutoPlay || isPausedHover) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalStep = 50;
    startTimeRef.current = Date.now() - (progress / 100) * speed;

    timerRef.current = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      const currentProg = Math.min((elapsed / speed) * 100, 100);
      setProgress(currentProg);

      if (elapsed >= speed) {
        handleNext();
      }
    }, intervalStep);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlay, isPausedHover, speed, currentSlideIndex]);

  return (
    <section 
      id="presentation" 
      className={`relative bg-slate-900 text-white overflow-hidden border-t border-slate-800 transition-all ${
        isFullscreen ? 'fixed inset-0 z-[100] py-8 px-6 bg-slate-950/98 overflow-y-auto' : 'py-24'
      }`}
      onMouseEnter={() => setIsPausedHover(true)}
      onMouseLeave={() => setIsPausedHover(false)}
    >
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4 border border-blue-500/20">
              <Presentation className="w-4 h-4 text-cyan-400" />
              <span>MarufEdge 2026 Strategy Deck • Auto Slide Show</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Executive <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Strategy Deck</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-medium">
              The complete 15-chapter roadmap engineered by <strong>Habibur Rahman (Maruf)</strong> for enterprise digital transformation and high-conversion market dominance in Oman.
            </p>
          </div>

          {/* Quick controls Dock */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 shadow-xl">
            
            {/* Auto Play Toggle */}
            <button
              onClick={toggleAutoPlay}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all border ${
                isAutoPlay 
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-950' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
              <span>{isAutoPlay ? (isPausedHover ? 'Paused (Hover)' : 'Auto Slide (Active)') : 'Play Auto'}</span>
            </button>

            {/* Speed Choices */}
            <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-800">
              {[
                { label: '4s', val: 4000 },
                { label: '6s', val: 6000 },
                { label: '10s', val: 10000 }
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => {
                    playClickSound();
                    setSpeed(s.val);
                    setProgress(0);
                    startTimeRef.current = Date.now();
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    speed === s.val
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Slide Index Badge */}
            <div className="text-xs font-mono font-bold text-cyan-400 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
              {currentSlide.slideNumber}
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => {
                playClickSound();
                setIsFullscreen(!isFullscreen);
              }}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl border border-slate-800 transition-all"
              title="Fullscreen Slide Deck"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Live Auto Progress Line */}
        {isAutoPlay && (
          <div className="w-full bg-slate-950 rounded-full h-1 mb-6 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all ease-linear shadow-[0_0_8px_rgba(59,130,246,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Slide Stage Container */}
        <div className="relative bg-slate-950 border border-slate-800 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl overflow-hidden min-h-[560px] flex flex-col justify-between">
          
          {/* Top Stage Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-blue-400">
                {currentSlide.category}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Habibur Rahman (Maruf) • Muscat &amp; Mabella
              </span>
              <a
                href="https://wa.me/96896522902?text=Hello%20Maruf,%20I%20am%20reviewing%20Slide%20"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-xl hover:bg-emerald-900/60 transition-all font-bold"
              >
                <Phone className="w-3 h-3" />
                <span>+968 96522902</span>
              </a>
            </div>
          </div>

          {/* Active Slide Body with Transition */}
          <div className="flex-1 flex items-center py-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full space-y-8"
              >
                {/* Dynamic Content by Slide ID */}
                {currentSlide.id === 1 && (
                  <div className="text-center max-w-3xl mx-auto space-y-6">
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center shadow-xl shadow-blue-500/20 text-3xl font-black text-slate-950">
                      ME
                    </div>
                    <h3 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                      Digital Strategy &amp; Conversion Optimization
                    </h3>
                    <p className="text-emerald-400 text-lg sm:text-xl font-bold">
                      Engineered for the Omani Market
                    </p>
                    <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 inline-block text-left">
                      <p className="text-sm text-slate-300 font-medium">Presented by:</p>
                      <h4 className="text-lg font-black text-white">Habibur Rahman (Maruf)</h4>
                      <p className="text-xs text-slate-400">Business Growth Specialist &amp; IT Strategist</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        <span>Mabella &amp; Muscat, Sultanate of Oman</span>
                      </p>
                    </div>
                  </div>
                )}

                {currentSlide.id === 2 && (
                  <div className="space-y-8">
                    <h3 className="text-2xl sm:text-4xl font-black text-white text-center">
                      Oman's 2026 Digital Reality Demands More Than Basic Marketing
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-slate-900/90 p-6 rounded-3xl border border-blue-500/30 text-center space-y-2">
                        <span className="text-4xl sm:text-5xl font-black text-blue-400">95.3%</span>
                        <h4 className="font-extrabold text-white text-sm">Internet Penetration</h4>
                        <p className="text-xs text-slate-400">Near-universal connectivity across all age groups.</p>
                      </div>
                      <div className="bg-slate-900/90 p-6 rounded-3xl border border-emerald-500/30 text-center space-y-2">
                        <span className="text-4xl sm:text-5xl font-black text-emerald-400">92%</span>
                        <h4 className="font-extrabold text-white text-sm">WhatsApp Dominance</h4>
                        <p className="text-xs text-slate-400">Primary communication &amp; order channel in Muscat.</p>
                      </div>
                      <div className="bg-slate-900/90 p-6 rounded-3xl border border-amber-500/30 text-center space-y-2">
                        <span className="text-4xl sm:text-5xl font-black text-amber-400">60%</span>
                        <h4 className="font-extrabold text-white text-sm">Local Pack Click Share</h4>
                        <p className="text-xs text-slate-400">Google Maps 3-pack captures majority of purchase intent.</p>
                      </div>
                    </div>
                    <p className="text-center text-slate-300 text-sm bg-blue-950/40 p-4 rounded-2xl border border-blue-900/50">
                      In a market with near-universal connectivity, traditional outreach is insufficient. Growth requires advanced funnels, rapid SLAs, and operational integration.
                    </p>
                  </div>
                )}

                {currentSlide.id === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-4xl font-black text-white text-center">
                      The Bilingual Imperative: Capturing True Market Demand
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-red-950/30 border border-red-500/30 p-6 rounded-3xl space-y-3">
                        <h4 className="text-lg font-black text-red-400 flex items-center gap-2">
                          <span>❌ The Flaw: English-Only Campaigns</span>
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-300">
                          <li>• Misses a significant segment of native consumer demand.</li>
                          <li>• Treated as an afterthought or simple machine translation.</li>
                          <li>• Results in high bounce rates and low cultural resonance.</li>
                        </ul>
                      </div>
                      <div className="bg-emerald-950/30 border border-emerald-500/30 p-6 rounded-3xl space-y-3">
                        <h4 className="text-lg font-black text-emerald-400 flex items-center gap-2">
                          <span>✓ The Solution: Dual-Language Funnels</span>
                        </h4>
                        <ul className="space-y-2 text-xs text-slate-300">
                          <li>• Landing pages and ad copy crafted from the ground up in Arabic &amp; English.</li>
                          <li>• Messaging respects local values and Omani communication preferences.</li>
                          <li>• Culturally aligned campaigns reach all segments of society seamlessly.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.id === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-4xl font-black text-white text-center">
                      Engineered by Experience: Habibur Rahman (Maruf)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4">
                        <h4 className="text-lg font-black text-blue-400">Experience Profile</h4>
                        <ul className="space-y-2 text-xs text-slate-300">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span><strong>12+ Years</strong> of Operational Scaling Experience in Oman.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>Based in <strong>Muscat &amp; Mabella</strong>, Oman for immediate on-site deployment.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>Bridging high-level commercial execution with advanced technical IT systems.</span>
                          </li>
                        </ul>
                        <p className="text-xs italic text-slate-400 pt-2 border-t border-slate-800">
                          "Growth is driven by execution quality, not activity volume."
                        </p>
                      </div>

                      <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 space-y-4 text-center">
                        <h4 className="text-lg font-black text-emerald-400">Multilingual Proficiency</h4>
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 font-bold text-sm text-white">English</div>
                          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 font-bold text-sm text-emerald-300">العربية (Arabic)</div>
                          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 font-bold text-sm text-white">বাংলা (Bengali)</div>
                          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 font-bold text-sm text-white">हिन्दी (Hindi)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.id === 5 && (
                  <div className="space-y-6 text-center">
                    <h3 className="text-2xl sm:text-4xl font-black text-white">
                      The Thesis: The Hybrid Advantage
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      <div className="p-6 rounded-3xl bg-blue-950/40 border border-blue-500/40 space-y-2 text-left">
                        <h4 className="text-base font-black text-blue-400 flex items-center gap-2">
                          <Briefcase className="w-5 h-5" />
                          <span>Field Sales &amp; B2B Expansion</span>
                        </h4>
                        <p className="text-xs text-slate-300">• Strategic Business Development</p>
                        <p className="text-xs text-slate-300">• Corporate Relationship Management</p>
                        <p className="text-xs text-slate-300">• Direct Revenue Scaling Across Oman</p>
                      </div>
                      <div className="p-6 rounded-3xl bg-emerald-950/40 border border-emerald-500/40 space-y-2 text-left">
                        <h4 className="text-base font-black text-emerald-400 flex items-center gap-2">
                          <Workflow className="w-5 h-5" />
                          <span>No-Code Apps &amp; ERP Systems</span>
                        </h4>
                        <p className="text-xs text-slate-300">• Custom AppSheet App Development</p>
                        <p className="text-xs text-slate-300">• Multi-Branch ERP Administration</p>
                        <p className="text-xs text-slate-300">• Inventory, Sales &amp; CRM Digitization</p>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 max-w-2xl mx-auto text-xs text-slate-300 font-bold">
                      Optimizing operations and scaling commercial revenue through tailored digital infrastructure.
                    </div>
                  </div>
                )}

                {currentSlide.id === 6 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-4xl font-black text-white text-center">
                      The 4-Pillar Conversion Engine
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-5 bg-slate-900 rounded-3xl border border-blue-500/40 space-y-2">
                        <span className="text-xs font-black text-blue-400 uppercase">Pillar 1</span>
                        <h4 className="font-extrabold text-white text-sm">Local SEO &amp; Google Maps</h4>
                        <p className="text-xs text-slate-400">Capturing high-intent local search &amp; 3-Pack rank #1.</p>
                      </div>
                      <div className="p-5 bg-slate-900 rounded-3xl border border-indigo-500/40 space-y-2">
                        <span className="text-xs font-black text-indigo-400 uppercase">Pillar 2</span>
                        <h4 className="font-extrabold text-white text-sm">Bilingual Content Systems</h4>
                        <p className="text-xs text-slate-400">Crafting culturally aligned funnels that convert natively.</p>
                      </div>
                      <div className="p-5 bg-slate-900 rounded-3xl border border-teal-500/40 space-y-2">
                        <span className="text-xs font-black text-teal-400 uppercase">Pillar 3</span>
                        <h4 className="font-extrabold text-white text-sm">Precision Meta &amp; Google Ads</h4>
                        <p className="text-xs text-slate-400">Agile weekly budget reallocation and B2B growth.</p>
                      </div>
                      <div className="p-5 bg-slate-900 rounded-3xl border border-emerald-500/40 space-y-2">
                        <span className="text-xs font-black text-emerald-400 uppercase">Pillar 4</span>
                        <h4 className="font-extrabold text-white text-sm">WhatsApp CRM Integration</h4>
                        <p className="text-xs text-slate-400">Frictionless communication with rapid &lt;1-2 hour SLAs.</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.id === 7 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-4xl font-black text-white text-center">
                      Pillar 1: Google Maps is Oman's New Storefront
                    </h3>
                    <p className="text-center text-xs text-slate-400 max-w-2xl mx-auto">
                      Over 86% of Omani consumers use Google Maps to find local businesses. The top 3 results capture nearly 60% of all clicks.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <h4 className="font-bold text-blue-400 text-sm">NAP Consistency</h4>
                        <p className="text-xs text-slate-300">Uniform Name, Address, and Phone listings across directories build algorithmic trust.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <h4 className="font-bold text-emerald-400 text-sm">Active Profile Management</h4>
                        <p className="text-xs text-slate-300">Weekly Google posts, fresh storefront photography, and visual updates.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <h4 className="font-bold text-amber-400 text-sm">Rapid Review Response</h4>
                        <p className="text-xs text-slate-300">Managing verified customer reviews with professional, 24-hour replies in Arabic &amp; English.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                        <h4 className="font-bold text-indigo-400 text-sm">Geo-Targeted Content</h4>
                        <p className="text-xs text-slate-300">Dedicated landing pages incorporating Muscat, Mabella, Seeb, or Salalah context.</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.id === 8 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-4xl font-black text-white text-center">
                      Pillar 2: Precision Ads &amp; Agile Budget Reallocation
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      <div className="bg-slate-900 p-6 rounded-3xl border border-blue-500/30 space-y-3">
                        <h4 className="text-base font-black text-blue-400">Smarter Paid Media</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Maximizing Return on Ad Spend (ROAS) requires shifting away from outdated, static monthly budgets.
                        </p>
                        <p className="text-xs text-emerald-400 font-bold">
                          Agile Execution: Reallocating budgets weekly based strictly on qualified lead outcomes and Cost-Per-Acquisition (CPA).
                        </p>
                      </div>
                      <div className="bg-slate-900 p-6 rounded-3xl border border-emerald-500/30 space-y-3">
                        <h4 className="text-base font-black text-emerald-400">Strategic Dominance</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Strategic Remarketing: Nurturing buyer confidence across visual and search networks via multi-touchpoint retargeting.
                        </p>
                        <p className="text-xs text-blue-300 font-bold">
                          B2B Growth: Shifting from aggressive selling to high-value educational content aligning with Omani relationship hierarchies.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.id === 9 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-4xl font-black text-white text-center">
                      The Omani Platform Matrix: Surgical Targeting
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                      <div className="p-5 rounded-2xl bg-slate-900 border border-blue-500/40 space-y-1">
                        <h4 className="font-extrabold text-blue-400 text-sm">Meta (Facebook &amp; Instagram)</h4>
                        <p className="text-xs text-slate-300">The Visual Powerhouse. Dominates B2C, e-commerce, and lifestyle. Highest ad reach in Oman.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/40 space-y-1">
                        <h4 className="font-extrabold text-indigo-400 text-sm">LinkedIn</h4>
                        <p className="text-xs text-slate-300">The Professional Network. Essential for B2B expansion, corporate contract negotiations, and authority.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-900 border border-pink-500/40 space-y-1">
                        <h4 className="font-extrabold text-pink-400 text-sm">TikTok &amp; Snapchat</h4>
                        <p className="text-xs text-slate-300">The Youth &amp; Trend Engine. Fastest-growing platforms; critical for capturing Gen Z and millennial visual engagement.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-1">
                        <h4 className="font-extrabold text-emerald-400 text-sm">Google Search (SEM)</h4>
                        <p className="text-xs text-slate-300">The Intent Engine. Capturing direct, high-intent queries with 97% search dominance in Oman.</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.id === 10 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-4xl font-black text-white text-center">
                      Pillar 4: The WhatsApp Frictionless Funnel
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 max-w-5xl mx-auto">
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs inline-flex items-center justify-center">1</span>
                        <h5 className="font-bold text-xs text-white">Mobile Ad Click</h5>
                        <p className="text-[10px] text-slate-400">User taps localized Meta/Google ad.</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs inline-flex items-center justify-center">2</span>
                        <h5 className="font-bold text-xs text-white">Frictionless Entry</h5>
                        <p className="text-[10px] text-slate-400">Floating WhatsApp button on mobile page.</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs inline-flex items-center justify-center">3</span>
                        <h5 className="font-bold text-xs text-white">Automated Greeting</h5>
                        <p className="text-[10px] text-slate-400">Instant dual-language welcome response.</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-1">
                        <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs inline-flex items-center justify-center">4</span>
                        <h5 className="font-bold text-xs text-white">CRM Tagging</h5>
                        <p className="text-[10px] text-slate-400">Lead tagged by source &amp; intent in AppSheet.</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-1">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs inline-flex items-center justify-center">5</span>
                        <h5 className="font-bold text-xs text-emerald-300">1-2 Hour SLA</h5>
                        <p className="text-[10px] text-emerald-200">Guaranteed human response to close.</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.id === 11 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-4xl font-black text-white text-center">
                      Digital Transformation: Al Yarmook Modern Trading LLC
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                        <h4 className="text-sm font-black text-red-400 uppercase tracking-wider">The Bottleneck (Paper &amp; Field Data)</h4>
                        <p className="text-xs text-slate-300">
                          Field sales and daily billing required real-time tracking across branches without error-prone manual paper registers.
                        </p>
                        <h4 className="text-sm font-black text-blue-400 uppercase tracking-wider pt-2">The Digital Solution (Custom Build)</h4>
                        <p className="text-xs text-slate-300">
                          Habibur developed targeted AppSheet applications covering CRM, Inventory management, and Field Sales Tracking.
                        </p>
                      </div>
                      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
                        <h4 className="text-sm font-black text-indigo-400 uppercase tracking-wider">Centralization (Multi-Branch ERP)</h4>
                        <p className="text-xs text-slate-300">
                          Data feeds into a centralized ERP dashboard for precise stock and transaction control across all retail outlets.
                        </p>
                        <h4 className="text-sm font-black text-emerald-400 uppercase tracking-wider pt-2">Revenue Growth (Strategic Action)</h4>
                        <p className="text-xs text-slate-300">
                          Clean data and optimized workflows enabled scalable B2B partnerships and faster corporate contract negotiations.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.id === 12 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-4xl font-black text-white text-center">
                      The Technical Architecture Stack
                    </h3>
                    <div className="space-y-4 max-w-3xl mx-auto">
                      <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 space-y-1">
                        <span className="text-[10px] font-black text-cyan-400 uppercase">Layer 3</span>
                        <h4 className="font-black text-white text-sm">Productivity &amp; AI Layer</h4>
                        <p className="text-xs text-slate-300">Integrating cutting-edge AI: Google Business Profile automation, rapid review replies, Canva design systems.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 space-y-1">
                        <span className="text-[10px] font-black text-amber-400 uppercase">Layer 2</span>
                        <h4 className="font-black text-white text-sm">Web &amp; Applications Layer</h4>
                        <p className="text-xs text-slate-300">WordPress &amp; WooCommerce for mobile storefronts. Custom AppSheet ecosystems for digitizing daily field workflows.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/40 space-y-1">
                        <span className="text-[10px] font-black text-blue-400 uppercase">Layer 1</span>
                        <h4 className="font-black text-white text-sm">Infrastructure &amp; Security Layer</h4>
                        <p className="text-xs text-slate-300">Managing network engineering, hardware maintenance, and security systems to ensure backend reliability.</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.id === 13 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-4xl font-black text-white text-center">
                      The MarufEdge Engine vs. Traditional Agencies
                    </h3>
                    <div className="overflow-x-auto max-w-4xl mx-auto">
                      <table className="w-full text-xs text-left">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                            <th className="py-3 px-4">Dimension</th>
                            <th className="py-3 px-4">Traditional Digital Marketing</th>
                            <th className="py-3 px-4 text-emerald-400">The MarufEdge Hybrid Advantage</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-slate-300">
                          <tr>
                            <td className="py-3 px-4 font-bold text-white">Language Strategy</td>
                            <td className="py-3 px-4 text-slate-400">English-only or machine translation</td>
                            <td className="py-3 px-4 text-emerald-300 font-bold">Native dual-language funnels built ground-up</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-white">Budget Management</td>
                            <td className="py-3 px-4 text-slate-400">Static monthly budgets</td>
                            <td className="py-3 px-4 text-emerald-300 font-bold">Agile weekly reallocation by CPA &amp; lead quality</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-white">Lead Capture</td>
                            <td className="py-3 px-4 text-slate-400">Slow, high-friction email contact forms</td>
                            <td className="py-3 px-4 text-emerald-300 font-bold">Instant WhatsApp integration with 1-2 hour SLA</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 font-bold text-white">Operational Depth</td>
                            <td className="py-3 px-4 text-slate-400">Service stops at ad click</td>
                            <td className="py-3 px-4 text-emerald-300 font-bold">Direct integration with AppSheet CRMs &amp; ERPs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {currentSlide.id === 14 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl sm:text-4xl font-black text-white text-center">
                      Fully Deployed &amp; Operationally Ready
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
                      <div className="p-5 rounded-2xl bg-slate-900 border border-blue-500/30 space-y-2">
                        <div className="flex items-center gap-2 text-blue-400 font-black text-sm">
                          <Building2 className="w-5 h-5" />
                          <span>Local HQ</span>
                        </div>
                        <p className="text-xs text-slate-300">Based in Mabella &amp; Muscat, ensuring deep local market integration and face-to-face capability.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/30 space-y-2">
                        <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                          <Shield className="w-5 h-5" />
                          <span>Legal Readiness</span>
                        </div>
                        <p className="text-xs text-slate-300">Active Oman Company Visa valid through <strong>September 30, 2027</strong>.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2">
                        <div className="flex items-center gap-2 text-amber-400 font-black text-sm">
                          <Car className="w-5 h-5" />
                          <span>Mobility</span>
                        </div>
                        <p className="text-xs text-slate-300">Holds valid Oman Driving License for direct B2B field engagement and on-site consultations.</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-2">
                        <div className="flex items-center gap-2 text-indigo-400 font-black text-sm">
                          <Globe className="w-5 h-5" />
                          <span>Communication</span>
                        </div>
                        <p className="text-xs text-slate-300">Quadrilingual capability (English, Bengali, Arabic, Hindi) ensuring frictionless relations.</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.id === 15 && (
                  <div className="text-center max-w-3xl mx-auto space-y-6">
                    <h3 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                      Let's Scale Your Business Together!
                    </h3>
                    <p className="text-base sm:text-lg text-slate-300">
                      Stop losing leads to outdated systems. Connect with MarufEdge today.
                    </p>
                    <div className="p-8 bg-slate-900 rounded-3xl border border-emerald-500/40 inline-block text-left shadow-2xl">
                      <h4 className="text-xl font-black text-white">Habibur Rahman (Maruf)</h4>
                      <p className="text-xs text-slate-400">Sales &amp; Marketing Manager | IT/Business Growth Specialist</p>
                      <p className="text-xs text-slate-400 mt-1">Location: Mabella, Muscat, Oman</p>
                      
                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <a
                          href="https://wa.me/96896522902?text=Hello%20Maruf,%20I%20am%20ready%20to%20scale%20my%20business%20in%20Oman!"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
                        >
                          <Phone className="w-4 h-4" />
                          <span>WhatsApp: +968 96522902</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Stage Navigation Bar */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Quick slide thumbnail buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
              {SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`w-7 h-7 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    currentSlideIndex === idx
                      ? 'bg-blue-600 text-white scale-110 shadow-md shadow-blue-900/50'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                  title={slide.title}
                >
                  {slide.id}
                </button>
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-400">
                {currentSlideIndex + 1} / {SLIDES.length}
              </span>
              <button
                onClick={handleNext}
                className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-900/40"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
