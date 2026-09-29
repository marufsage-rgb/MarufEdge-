import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Briefcase,
  MapPin,
  Database,
  Cpu,
  Sparkles,
  ChevronDown,
  LayoutGrid,
  Check,
  Zap,
  Filter,
  Bot,
  Share2
} from 'lucide-react';
import { useSound } from './AudioCursorProvider';

export type CategoryTab = 'all' | 'work' | 'agentic' | 'marketing' | 'erp' | 'social' | 'tech';

interface SectionCategoryNavigatorProps {
  activeTab: CategoryTab;
  onTabChange: (tab: CategoryTab) => void;
  onOpenAdmin?: () => void;
}

interface CategoryOption {
  id: CategoryTab;
  titleEn: string;
  titleNative: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const CATEGORIES: CategoryOption[] = [
  {
    id: 'work',
    titleEn: 'Work & Cheap Rates',
    titleNative: 'কাজের ডেস্ক ও সুলভ মূল্য',
    badge: 'From 15 OMR',
    icon: Briefcase,
    description: 'Instant calculator, Google keywords & cheap packages in Oman'
  },
  {
    id: 'agentic',
    titleEn: 'Agentic & Claude AI',
    titleNative: 'এজেন্টিক এআই ও ক্লড',
    badge: 'Claude 3.5',
    icon: Bot,
    description: 'Autonomous workflows, bilingual customer bots & VAT invoicing'
  },
  {
    id: 'social',
    titleEn: 'All Social Media',
    titleNative: 'সকল সোশ্যাল মিডিয়া',
    badge: '9 Channels',
    icon: Share2,
    description: 'WhatsApp, Instagram, TikTok, YouTube, LinkedIn & Google Maps'
  },
  {
    id: 'marketing',
    titleEn: 'Google Maps & Ads',
    titleNative: 'গুগল ম্যাপস ও মেটা',
    badge: 'Local SEO #1',
    icon: MapPin,
    description: 'Muscat & Mabella Local 3-Pack ranking, Meta campaigns & visual tour'
  },
  {
    id: 'erp',
    titleEn: 'Cloud ERP & Drive',
    titleNative: 'অ্যাপশিট ইআরপি ও ড্রাইভ',
    badge: '5% VAT Ready',
    icon: Database,
    description: 'AppSheet zero-monthly fee software, Evidence Vault & Google Drive'
  },
  {
    id: 'tech',
    titleEn: 'IT & Telecom NOC',
    titleNative: 'আইটি, টেলিকম ও স্ট্র্যাটেজি',
    badge: '12+ Yrs Exp',
    icon: Cpu,
    description: 'Fiber infrastructure, enterprise strategy deck & management'
  },
  {
    id: 'all',
    titleEn: 'All Sections View',
    titleNative: 'সম্পূর্ণ পেজ স্ক্রল',
    badge: 'Full Overview',
    icon: LayoutGrid,
    description: 'Browse all components continuously in a single page'
  }
];

export const SectionCategoryNavigator: React.FC<SectionCategoryNavigatorProps> = ({
  activeTab,
  onTabChange,
  onOpenAdmin
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { playClickSound } = useSound();

  const currentCategory = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  const handleSelect = (tab: CategoryTab) => {
    playClickSound();
    onTabChange(tab);
    setIsDropdownOpen(false);

    // Smooth scroll down to the content area
    const contentTarget = document.getElementById('hub-content-anchor');
    if (contentTarget) {
      contentTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-20 z-30 bg-slate-950/95 backdrop-blur-xl border-y border-white/10 shadow-2xl py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left: Quick Label & Dropdown Selector for Mobile/Desktop */}
        <div className="w-full md:w-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-400 shrink-0">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Hub View:</span>
          </div>

          {/* Interactive Dropdown Button */}
          <div className="relative flex-1 md:flex-initial">
            <button
              onClick={() => {
                playClickSound();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="w-full md:w-80 flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 hover:border-cyan-500/50 text-white text-xs font-bold transition-all shadow-lg active:scale-98"
            >
              <div className="flex items-center gap-2.5 truncate">
                <currentCategory.icon className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="flex flex-col text-left truncate">
                  <span className="truncate">{currentCategory.titleEn}</span>
                  <span className="text-[10px] text-slate-400 font-normal truncate">{currentCategory.titleNative}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/20">
                  {currentCategory.badge}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {/* Dropdown Menu Overlay */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 md:left-0 md:w-96 top-full mt-2 z-50 bg-slate-900/98 backdrop-blur-2xl border border-white/15 rounded-2xl p-2 shadow-2xl overflow-hidden"
                >
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500 px-3 py-1.5 border-b border-white/5">
                    Select Focused Section / সেকশন বেছে নিন
                  </div>

                  <div className="space-y-1 mt-1 max-h-[70vh] overflow-y-auto">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = cat.id === activeTab;

                      return (
                        <button
                          key={cat.id}
                          onClick={() => handleSelect(cat.id)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all group ${
                            isSelected
                              ? 'bg-blue-600/20 border border-blue-500/40 text-white'
                              : 'hover:bg-white/5 text-slate-300 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-cyan-400'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white truncate">{cat.titleEn}</span>
                                <span className="text-[10px] text-slate-400 font-normal">({cat.titleNative})</span>
                              </div>
                              <p className="text-[10px] text-slate-400 truncate mt-0.5">{cat.description}</p>
                            </div>
                          </div>

                          <div className="shrink-0 ml-2">
                            {isSelected ? (
                              <Check className="w-4 h-4 text-cyan-400" />
                            ) : (
                              <span className="text-[9px] font-mono text-slate-500 px-1.5 py-0.5 bg-slate-950 rounded">
                                {cat.badge}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Desktop Pill Buttons for Ultra-Fast Switching */}
        <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto max-w-full">
          {CATEGORIES.map((cat) => {
            const isSelected = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-900/50 border border-blue-400/30'
                    : 'bg-slate-900/70 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                <span>{cat.titleEn}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />}
              </button>
            );
          })}
        </div>

        {/* Quick Admin Access Button */}
        {onOpenAdmin && (
          <button
            onClick={() => {
              playClickSound();
              onOpenAdmin();
            }}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-bold transition-all"
            title="Open Admin Panel & Settings"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Admin Settings</span>
          </button>
        )}

      </div>
    </div>
  );
};
