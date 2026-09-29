import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Code2, 
  Database, 
  Network, 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Headphones, 
  ChevronDown,
  ChevronUp,
  Sparkles,
  MapPin,
  Cpu,
  Globe
} from 'lucide-react';

interface Skill {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  details: {
    application: string;
    metrics: string;
    tools: string[];
  };
}

const SKILLS: Skill[] = [
  {
    id: 'google-maps',
    title: 'Google Maps SEO',
    description: '86% of Omani consumers find local services via Google Maps. We dominate the local pack for high-intent searches.',
    icon: MapPin,
    color: 'bg-orange-600',
    details: {
      application: 'Dominating search results in Muscat, Al Maabilah, and across the Sultanate to drive physical foot traffic and direct leads.',
      metrics: 'Top 3 results capture ~60% of all clicks in the local service sector.',
      tools: ['Google Business Profile', 'Local SEO', 'Review Management', 'Geofencing']
    }
  },
  {
    id: 'paid-ads',
    title: 'Bilingual Ad Campaigns',
    description: 'Precision-targeted Google & Meta Ads in Arabic and English to reach 95.3% of internet users in Oman.',
    icon: BarChart3,
    color: 'bg-blue-600',
    details: {
      application: 'Custom-built funnels that convert visitors into loyal customers through smart retargeting and data-driven budgeting.',
      metrics: '2.5x higher conversion rates compared to traditional broad-reach marketing.',
      tools: ['Google Ads', 'Meta Ads', 'Arabic Copywriting', 'Conversion Tracking']
    }
  },
  {
    id: 'crm-automation',
    title: 'WhatsApp CRM Automation',
    description: 'Integrating WhatsApp as the primary sales channel for 92% of users in the Muscat market.',
    icon: MessageSquare,
    color: 'bg-emerald-600',
    details: {
      application: 'Automated response systems that capture leads instantly and sync directly with your enterprise CRM for 24/7 engagement.',
      metrics: 'Under 5-minute response times, critical for closing deals in the Omani market.',
      tools: ['WhatsApp Business API', 'CRM Integration', 'Chatbots', 'Auto-responders']
    }
  },
  {
    id: 'custom-apps',
    title: 'No-Code Enterprise Apps',
    description: 'Custom AppSheet and ERP solutions to centralize inventory, field sales, and multi-branch operations.',
    icon: Cpu,
    color: 'bg-indigo-600',
    details: {
      application: 'Removing bottlenecks by moving away from paper-based systems to centralized digital dashboards for real-time tracking.',
      metrics: '40% reduction in operational waste through centralized inventory management.',
      tools: ['AppSheet', 'Drizzle ORM', 'ERP Systems', 'PostgreSQL']
    }
  },
  {
    id: 'web-arch',
    title: 'Web Architecture & E-commerce',
    description: 'High-performance WordPress & WooCommerce environments optimized for speed and mobile experience.',
    icon: Globe,
    color: 'bg-gray-900',
    details: {
      application: 'Building the foundation of your digital ecosystem with secure hosting, CCTV integration, and payment gateway support.',
      metrics: 'Sub-2 second load times for maximum customer retention on mobile devices.',
      tools: ['WordPress', 'WooCommerce', 'Payment Gateways', 'CCTV Systems']
    }
  }
];

export const SkillModules = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const nextSkill = () => {
    setCurrentIndex((prev) => (prev + 1) % SKILLS.length);
    setExpandedId(null);
  };

  const prevSkill = () => {
    setCurrentIndex((prev) => (prev - 1 + SKILLS.length) % SKILLS.length);
    setExpandedId(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const currentSkill = SKILLS[currentIndex];

  return (
    <section id="skills" className="py-32 bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[160px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12 text-left">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8"
            >
              <Sparkles className="w-3 h-3" />
              <span>IT Functional Skills Visualizer</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8 leading-[1.1]">
              Advancing <span className="text-blue-500">Oman's</span> <br />
              IT Ecosystem
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Experience the visual architecture of high-level development management and information systems designed for professional regional growth.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={prevSkill}
              className="p-6 rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 transition-all shadow-2xl"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={nextSkill}
              className="p-6 rounded-full bg-white/5 border border-white/10 text-white hover:bg-blue-600 transition-all shadow-2xl"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSkill.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Visual Aid */}
              <div className="relative aspect-square">
                <div className={`absolute inset-0 ${currentSkill.color} rounded-[4rem] blur-[80px] opacity-20`} />
                <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-2xl overflow-hidden flex items-center justify-center">
                  <motion.div
                    initial={{ rotate: -10, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    className="relative"
                  >
                    <div className={`w-40 h-40 ${currentSkill.color} rounded-[3rem] flex items-center justify-center text-white shadow-2xl shadow-black/40`}>
                      <currentSkill.icon className="w-20 h-20" />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/10 rounded-3xl blur-xl" />
                    <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-blue-500/20 rounded-3xl blur-xl" />
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="text-left space-y-10">
                <div>
                  <h3 className="text-4xl font-black mb-6 tracking-tight">{currentSkill.title}</h3>
                  <p className="text-2xl text-gray-400 leading-relaxed font-medium">
                    {currentSkill.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-blue-500 uppercase tracking-[0.3em]">Oman Strategy</h4>
                    <p className="text-gray-400 leading-relaxed italic text-sm">
                      {currentSkill.details.application}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-blue-500 uppercase tracking-[0.3em]">Performance</h4>
                    <p className="text-white font-black text-2xl leading-none">
                      {currentSkill.details.metrics}
                    </p>
                  </div>
                </div>

                <div className="pt-10 border-t border-white/5">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-6">Development Stack</h4>
                  <div className="flex flex-wrap gap-3">
                    {currentSkill.details.tools.map(tool => (
                      <span key={tool} className="px-5 py-2.5 bg-white/5 rounded-2xl text-xs font-bold text-gray-300 border border-white/10">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
