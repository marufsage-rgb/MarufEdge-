import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Sparkles,
  ArrowRight,
  MapPin,
  ShoppingBag,
  Presentation,
  Smartphone,
  Server,
  Languages,
  Image as ImageIcon,
  ExternalLink,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  Layers,
  Zap,
  Eye,
  Sliders
} from 'lucide-react';
import { useSound } from './AudioCursorProvider';
import { useLocale } from './LocaleContext';

interface VisualPageSlide {
  id: string;
  tag: string;
  badge: string;
  title: string;
  headline: string;
  description: string;
  anchor: string;
  accentColor: string;
  gradient: string;
  metrics: { label: string; value: string; sub: string }[];
  visualHighlights: string[];
  icon: React.ElementType;
  previewImage: string;
  ctaText: string;
}

const VISUAL_PAGES: VisualPageSlide[] = [
  {
    id: 'google-maps',
    tag: 'LOCAL DISCOVERY ENGINE',
    badge: 'OMAN #1 RANKINGS',
    title: 'Google Maps Local 3-Pack Dominance',
    headline: 'Rank #1 in Muscat, Mabella & GCC Search Within 30–60 Days',
    description: 'Transform your physical business into the most visited destination in Oman with optimized Google Business Profiles, localized geo-grid citations, review velocity automation, and bilingual metadata.',
    anchor: '#google-maps',
    accentColor: 'text-amber-400',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    metrics: [
      { label: 'Map Click Share', value: '60%+', sub: 'Top 3 positions' },
      { label: 'Local Traffic Lift', value: '+340%', sub: 'Within 60 days' },
      { label: 'WhatsApp Inbound', value: '4.8x', sub: 'High-intent calls' }
    ],
    visualHighlights: [
      'NAP Consistency Across GCC Directories',
      'Local Geo-Grid Heatmap Verification',
      'Bilingual Arabic & English Review Loops',
      'Direct Click-to-Call & WhatsApp Funnel'
    ],
    icon: MapPin,
    previewImage: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Explore Maps SEO Hub'
  },
  {
    id: 'meta-suite',
    tag: 'PAID SOCIAL ACQUISITION',
    badge: 'META COMMERCE SYNC',
    title: 'Meta Business Suite & Catalog Ads Hub',
    headline: 'Dynamic Product Ads, Server-Side CAPI & Instant WhatsApp Commerce',
    description: 'Bypass iOS 14.5+ tracking loss with Conversions API (CAPI). Run Advantage+ multi-currency catalog campaigns across Instagram Reels, Facebook Feed, and Direct Click-to-WhatsApp in OMR, SAR & AED.',
    anchor: '#meta-suite',
    accentColor: 'text-blue-400',
    gradient: 'from-blue-600/20 via-cyan-500/10 to-transparent',
    metrics: [
      { label: 'Average ROAS', value: '4.8x', sub: 'GCC benchmark' },
      { label: 'Response SLA', value: '<60s', sub: 'WhatsApp routing' },
      { label: 'Catalog Sync', value: '100%', sub: 'Live SKU inventory' }
    ],
    visualHighlights: [
      'Server-Side CAPI Bypassing Ad Blockers',
      'Advantage+ Dynamic Product Ads (DPA)',
      'Instagram Reels 9:16 Video Creative Strategy',
      'Multi-Currency OMR / SAR / AED Feeds'
    ],
    icon: ShoppingBag,
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Open Meta Business Hub'
  },
  {
    id: 'strategy-deck',
    tag: 'EXECUTIVE MASTER PLAN',
    badge: '15-SLIDE BLUEPRINT',
    title: 'Executive Strategy & Conversion Presentation',
    headline: 'The Complete 15-Chapter Digital Transformation Playbook',
    description: 'Designed and led by Habibur Rahman (Maruf). A structured roadmap bridging high-touch on-site B2B sales in Oman with cutting-edge digital funnel automation and corporate ROI accountability.',
    anchor: '#presentation',
    accentColor: 'text-emerald-400',
    gradient: 'from-emerald-600/20 via-teal-500/10 to-transparent',
    metrics: [
      { label: 'Strategy Slides', value: '15', sub: 'Comprehensive deck' },
      { label: 'Field Experience', value: '12+ Yrs', sub: 'Oman B2B market' },
      { label: 'Languages', value: '4 Fluent', sub: 'EN / AR / BN / HI' }
    ],
    visualHighlights: [
      'Market Penetration Data & 2026 Projections',
      'The Hybrid Advantage Architecture',
      'Cost-Per-Lead vs. CAC Breakdown in OMR',
      'Oman Vision 2040 Private Sector Alignment'
    ],
    icon: Presentation,
    previewImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Launch 15-Slide Deck'
  },
  {
    id: 'appsheet-erp',
    tag: 'NO-CODE ENTERPRISE TECH',
    badge: 'VAT & BARCODE READY',
    title: 'AppSheet Cloud ERP & Custom CRM Apps',
    headline: 'Zero-License Cost Enterprise Operations & Real-Time Stock Control',
    description: 'Custom-built cloud mobile and tablet applications integrated directly with Google Workspace, barcode scanners, automatic 5% Oman VAT PDF invoice dispatch, and live field team GPS logging.',
    anchor: '#skills',
    accentColor: 'text-indigo-400',
    gradient: 'from-indigo-600/20 via-purple-500/10 to-transparent',
    metrics: [
      { label: 'ERP Deployment', value: '<7 Days', sub: 'Turnkey setup' },
      { label: 'Software Savings', value: '80%+', sub: 'Vs. Legacy SAP/Oracle' },
      { label: 'Offline Ready', value: '100%', sub: 'Field sync cache' }
    ],
    visualHighlights: [
      'Instant Barcode & QR Code Inventory Scanning',
      'Oman Tax Authority 5% VAT Invoicing Engine',
      'Multi-Warehouse Real-Time Synchronization',
      'Role-Based Executive Access Controls'
    ],
    icon: Smartphone,
    previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'View ERP Solutions'
  },
  {
    id: 'telecom-noc',
    tag: 'MISSION-CRITICAL INFRASTRUCTURE',
    badge: 'DARK IT CIRCUIT',
    title: 'Telecom Fiber & High-Speed Network Systems',
    headline: 'High-Uptime Network Routing, Structured Cabling & Cloud Gateways',
    description: 'High-performance computing and enterprise telecom architectures built for seamless commercial data transport, fiber-optic distribution, and low-latency digital operations in Oman.',
    anchor: '#telecom-showcase',
    accentColor: 'text-cyan-400',
    gradient: 'from-cyan-600/20 via-blue-900/20 to-transparent',
    metrics: [
      { label: 'Network Uptime', value: '99.98%', sub: 'Enterprise SLA' },
      { label: 'Latency Rate', value: '<8ms', sub: 'Muscat metro loop' },
      { label: 'NOC Monitoring', value: '24/7', sub: 'AI telemetry' }
    ],
    visualHighlights: [
      'High-Speed Fiber Optic Distribution',
      'Automated Network Failover Architecture',
      'Encrypted Cloud Data Pipelines',
      'Hardware & Server Rack Scalability'
    ],
    icon: Server,
    previewImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Inspect Telecom Circuit'
  },
  {
    id: 'bilingual-ui',
    tag: 'CULTURAL ARCHITECTURE',
    badge: 'ARABIC RTL INSPECTOR',
    title: 'Bilingual RTL & English Typography Engine',
    headline: 'Flawless Dual-Language Experiences That Resonate Locally',
    description: 'Eliminate bounce rates caused by awkward translation. Our proprietary bilingual typography system ensures geometric Arabic (Cairo/Tajawal) and modern Latin typography align harmoniously across all devices.',
    anchor: '#bilingual-checker',
    accentColor: 'text-rose-400',
    gradient: 'from-rose-600/20 via-pink-500/10 to-transparent',
    metrics: [
      { label: 'Arabic Readability', value: '100%', sub: 'Native RTL tuning' },
      { label: 'Conversion Lift', value: '+42%', sub: 'Bilingual trust' },
      { label: 'Font Scaling', value: 'Pixel-Perfect', sub: 'Adaptive grid' }
    ],
    visualHighlights: [
      'Native Arabic Layout Mirroring & Spacing',
      'Cultural Copywriting That Resonates in Oman',
      'Live Dual-Text Interactive Comparison Tools',
      'Dynamic Font-Family & Direction Switcher'
    ],
    icon: Languages,
    previewImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Test Bilingual Engine'
  },
  {
    id: 'ai-creative',
    tag: 'AI MARKETING STUDIO',
    badge: 'GEMINI AI CREATIVE',
    title: 'AI Commercial Asset & Image Generation',
    headline: 'High-Impact GCC Marketing Visuals Rendered in Real-Time',
    description: 'Produce photorealistic, culturally relevant marketing creatives, banners, product visuals, and video storyboards tailored for GCC consumer audiences using advanced Gemini visual modeling.',
    anchor: '#image-generator',
    accentColor: 'text-violet-400',
    gradient: 'from-violet-600/20 via-purple-500/10 to-transparent',
    metrics: [
      { label: 'Render Speed', value: '<5s', sub: 'Generative AI' },
      { label: 'Aspect Ratios', value: '7 Formats', sub: 'Story, Feed, Banner' },
      { label: 'Asset Cost', value: '-90%', sub: 'Vs. Traditional shoots' }
    ],
    visualHighlights: [
      'Culturally Authentic Omani Contextual Visuals',
      'Instant Ad Creative Variations for A/B Testing',
      'High-Resolution Commercial Asset Downloads',
      'Seamless Multi-Platform Export Readiness'
    ],
    icon: ImageIcon,
    previewImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Open Creative Studio'
  }
];

export const AutoVisualPagesShowcase: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(5000); // 5s default
  const [progress, setProgress] = useState(0);
  const [isPausedHover, setIsPausedHover] = useState(false);
  const [isKioskMode, setIsKioskMode] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const elapsedBeforePauseRef = useRef<number>(0);

  const { playClickSound, playDataSound } = useSound();
  const { country } = useLocale();

  const currentSlide = VISUAL_PAGES[currentIndex];

  const handleNext = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev + 1) % VISUAL_PAGES.length);
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
  };

  const handlePrev = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev - 1 + VISUAL_PAGES.length) % VISUAL_PAGES.length);
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
  };

  const handleSelectSlide = (index: number) => {
    playDataSound();
    setCurrentIndex(index);
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
  };

  const togglePlayPause = () => {
    playClickSound();
    setIsPlaying(!isPlaying);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === ' ' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Smooth animation timer & progress update
  useEffect(() => {
    if (!isPlaying || isPausedHover) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalStep = 50; // update progress every 50ms
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
  }, [isPlaying, isPausedHover, speed, currentIndex]);

  return (
    <section 
      id="visual-showcase" 
      className={`relative bg-slate-950 text-white overflow-hidden transition-all duration-500 border-b border-white/5 ${
        isKioskMode ? 'fixed inset-0 z-[100] py-12 px-6 overflow-y-auto bg-slate-950/98 backdrop-blur-2xl' : 'py-20 sm:py-28'
      }`}
      onMouseEnter={() => setIsPausedHover(true)}
      onMouseLeave={() => setIsPausedHover(false)}
    >
      {/* Dynamic Background Radial Gradients */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none transition-all duration-700" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none transition-all duration-700" />

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Bar with Auto-Play Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-cyan-400 text-[11px] font-black uppercase tracking-[0.25em] mb-4 border border-blue-500/20 shadow-lg shadow-blue-950">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>Interactive Digital Showcase • Auto-Visual Mode</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Ecosystem <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400">Visual Tour</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-medium">
              Explore live visual walkthroughs of all specialized MarufEdge systems in Oman & GCC. Sit back and watch or click any slide to jump directly into the live module.
            </p>
          </div>

          {/* Controls Dock */}
          <div className="flex flex-wrap items-center gap-2.5 bg-slate-900/90 border border-white/10 p-2 rounded-2xl backdrop-blur-xl shadow-2xl shrink-0">
            
            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                isPlaying
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950 border border-emerald-400/40'
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
              }`}
              title={isPlaying ? 'Pause Auto-Slideshow (Space)' : 'Play Auto-Slideshow (Space)'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span className="font-mono">{isPlaying ? (isPausedHover ? 'Paused (Hover)' : 'Auto-Advancing') : 'Paused'}</span>
            </button>

            {/* Speed Selector */}
            <div className="flex items-center bg-slate-950 rounded-xl p-1 border border-white/5">
              {[
                { label: '3s', val: 3000 },
                { label: '5s', val: 5000 },
                { label: '8s', val: 8000 }
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => {
                    playClickSound();
                    setSpeed(s.val);
                    setProgress(0);
                    startTimeRef.current = Date.now();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-all ${
                    speed === s.val
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title={`Set slide interval to ${s.label}`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 transition-all"
                title="Previous Slide (Left Arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 transition-all"
                title="Next Slide (Right Arrow)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Kiosk Fullscreen Mode */}
            <button
              onClick={() => {
                playClickSound();
                setIsKioskMode(!isKioskMode);
              }}
              className={`p-2 rounded-xl border transition-all ${
                isKioskMode
                  ? 'bg-cyan-600 text-white border-cyan-400'
                  : 'bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white border-white/5'
              }`}
              title={isKioskMode ? 'Exit Presentation Mode' : 'Enter Kiosk Fullscreen Mode'}
            >
              {isKioskMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Global Continuous Progress Bar */}
        <div className="w-full bg-slate-900 rounded-full h-1.5 mb-8 overflow-hidden border border-white/5 relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 rounded-full transition-all ease-linear shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Interactive Slide Thumbnail Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
          {VISUAL_PAGES.map((slide, idx) => {
            const Icon = slide.icon;
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => handleSelectSlide(idx)}
                className={`relative flex items-center gap-2 p-2.5 rounded-2xl text-left border transition-all duration-300 ${
                  isActive
                    ? 'bg-slate-900/90 border-cyan-500/50 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/30'
                    : 'bg-slate-950/60 border-white/5 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="overflow-hidden min-w-0">
                  <p className={`text-[11px] font-black truncate leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {slide.title.split(' ')[0]} {slide.title.split(' ')[1]}
                  </p>
                  <p className="text-[9px] text-slate-500 font-mono uppercase truncate">{slide.badge}</p>
                </div>

                {/* Active Indicator Pulse */}
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full border-2 border-slate-950 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Visual Slide Card Stage */}
        <div className="relative bg-slate-950/90 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-2xl">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="p-6 sm:p-10 lg:p-14"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                
                {/* Left Content Column */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Badge & Step indicator */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-blue-900/40 border border-blue-500/30 text-cyan-300 font-mono text-[11px] font-black tracking-wider uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      {currentSlide.tag}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-mono text-[11px] font-bold">
                      Slide {currentIndex + 1} of {VISUAL_PAGES.length}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-black">
                      {currentSlide.badge}
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <div>
                    <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                      {currentSlide.title}
                    </h3>
                    <p className={`text-base sm:text-xl font-bold mt-2 ${currentSlide.accentColor}`}>
                      {currentSlide.headline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                    {currentSlide.description}
                  </p>

                  {/* 3 Metric Cards */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {currentSlide.metrics.map((m, idx) => (
                      <div key={idx} className="bg-slate-900/80 border border-white/5 p-3.5 rounded-2xl">
                        <p className="text-[10px] uppercase font-mono font-bold text-slate-400 truncate">{m.label}</p>
                        <p className="text-lg sm:text-2xl font-black text-white mt-0.5 tracking-tight">{m.value}</p>
                        <p className="text-[10px] text-slate-500 font-medium truncate">{m.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Key Feature Bullets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {currentSlide.visualHighlights.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Actions */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <a
                      href={currentSlide.anchor}
                      onClick={() => playClickSound()}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-black text-sm hover:from-blue-500 hover:to-cyan-500 transition-all shadow-xl shadow-blue-900/40 active:scale-95 group"
                    >
                      <span>{currentSlide.ctaText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                      href={`https://wa.me/96896522902?text=Hello%20Maruf,%20I%20am%20interested%20in%20your%20${encodeURIComponent(currentSlide.title)}%20services%20in%20Oman.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-4 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 rounded-2xl font-black text-sm transition-all active:scale-95"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Inquiry</span>
                    </a>
                  </div>
                </div>

                {/* Right Visual Image & Interactive Mockup Column */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                    
                    {/* Background Visual Image */}
                    <img
                      src={currentSlide.previewImage}
                      alt={currentSlide.title}
                      className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    {/* Live Section Link Pin */}
                    <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
                      <Eye className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>Live Component Preview</span>
                    </div>

                    {/* Floating Info Card at Bottom */}
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-slate-400 font-mono uppercase font-bold">HQ Location &amp; Contact</p>
                          <p className="text-xs font-black text-white">Habibur Rahman (Maruf) • Muscat, Oman</p>
                        </div>
                        <a
                          href={currentSlide.anchor}
                          className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg"
                          title="Jump directly to section"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Stage Progress Dots */}
          <div className="bg-slate-900/60 border-t border-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {VISUAL_PAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                      : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="hidden sm:inline">Use [◀] [▶] keys to navigate • [Space] to pause</span>
              <span className="font-bold text-cyan-400">MarufEdge ProMedia 2026</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
