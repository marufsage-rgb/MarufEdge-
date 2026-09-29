import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Instagram,
  Facebook,
  Linkedin,
  Video,
  Youtube,
  Twitter,
  Send,
  MapPin,
  Share2,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Sparkles,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { useSound } from './AudioCursorProvider';

interface SocialChannel {
  id: string;
  name: string;
  handle: string;
  category: 'direct' | 'visual' | 'professional' | 'community';
  url: string;
  color: string;
  hoverBg: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  stat: string;
}

const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    handle: '+968 96522902',
    category: 'direct',
    url: 'https://wa.me/96896522902?text=Hello%20Habibur%20Rahman%20(Maruf),%20I%20am%20contacting%20you%20from%20your%20Oman%20Social%20Hub.',
    color: '#25D366',
    hoverBg: 'hover:border-emerald-500/50 hover:bg-emerald-950/20',
    icon: MessageSquare,
    description: '<60s Guaranteed Response for AI, Google Maps & AppSheet Work',
    stat: 'Active 24/7'
  },
  {
    id: 'instagram',
    name: 'Instagram Official',
    handle: '@marufedge.om',
    category: 'visual',
    url: 'https://instagram.com/marufedge.om',
    color: '#E4405F',
    hoverBg: 'hover:border-rose-500/50 hover:bg-rose-950/20',
    icon: Instagram,
    description: 'Daily Case Studies, Reels on Oman Businesses, Google Maps Results',
    stat: 'Verified Channel'
  },
  {
    id: 'facebook',
    name: 'Facebook Business Page',
    handle: 'MarufEdge ProMedia',
    category: 'community',
    url: 'https://facebook.com/marufedge',
    color: '#1877F2',
    hoverBg: 'hover:border-blue-500/50 hover:bg-blue-950/20',
    icon: Facebook,
    description: 'Meta Ads Case Studies, Workshop ERP Guides, Community Updates',
    stat: 'Official Page'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Professional',
    handle: 'in/habibur-maruf',
    category: 'professional',
    url: 'https://linkedin.com/in/habibur-maruf',
    color: '#0A66C2',
    hoverBg: 'hover:border-sky-500/50 hover:bg-sky-950/20',
    icon: Linkedin,
    description: 'Telecom NOC Engineering, Enterprise Digital Transformation & Strategy',
    stat: '12+ Yrs Network'
  },
  {
    id: 'tiktok',
    name: 'TikTok Oman Tech',
    handle: '@marufedge_oman',
    category: 'visual',
    url: 'https://tiktok.com/@marufedge_oman',
    color: '#00F2FE',
    hoverBg: 'hover:border-cyan-500/50 hover:bg-cyan-950/20',
    icon: Video,
    description: 'Quick 60s Tech Hacks, Oman Garage Systems & Google Maps Tips',
    stat: 'Viral Content'
  },
  {
    id: 'youtube',
    name: 'YouTube Channel',
    handle: '@marufedge_tech',
    category: 'visual',
    url: 'https://youtube.com/@marufedge_tech',
    color: '#FF0000',
    hoverBg: 'hover:border-red-500/50 hover:bg-red-950/20',
    icon: Youtube,
    description: 'In-Depth AppSheet Tutorials, Fiber Optic NOC Tours & Live Demos',
    stat: 'Video Tutorials'
  },
  {
    id: 'x',
    name: 'X (Formerly Twitter)',
    handle: '@marufedge',
    category: 'community',
    url: 'https://x.com/marufedge',
    color: '#1DA1F2',
    hoverBg: 'hover:border-slate-500/50 hover:bg-slate-900/50',
    icon: Twitter,
    description: 'AI Agent Dispatches, Claude 3.5 Prompts, GCC Tech Insights',
    stat: 'Tech Thoughts'
  },
  {
    id: 'telegram',
    name: 'Telegram Channel',
    handle: '@marufedge_om',
    category: 'community',
    url: 'https://t.me/marufedge_om',
    color: '#0088CC',
    hoverBg: 'hover:border-cyan-500/50 hover:bg-cyan-950/20',
    icon: Send,
    description: 'Direct Broadcasts, Free Prompts, Arabic-English Templates',
    stat: 'Instant Alerts'
  },
  {
    id: 'gmaps',
    name: 'Google Maps Business Profile',
    handle: 'Al Maabilah, Muscat',
    category: 'direct',
    url: 'https://maps.google.com/?q=Al+Maabilah+Muscat+Oman',
    color: '#4285F4',
    hoverBg: 'hover:border-blue-500/50 hover:bg-blue-950/20',
    icon: MapPin,
    description: 'Verified Sultanate of Oman Headquarters & Client Consultation Office',
    stat: '5-Star Verified'
  }
];

export const SocialMediaHub: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'direct' | 'visual' | 'professional' | 'community'>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const { playClickSound } = useSound();

  const handleCopyProfile = () => {
    playClickSound();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const filteredChannels = activeCategory === 'all'
    ? SOCIAL_CHANNELS
    : SOCIAL_CHANNELS.filter(c => c.category === activeCategory);

  return (
    <section id="social-hub" className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-b border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-black uppercase tracking-[0.25em] mb-4 border border-blue-500/20">
              <Share2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Full Social Ecosystem & Direct Lines</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Connect Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">All Social Media</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-medium">
              Follow Habibur Rahman (Maruf) on Instagram, YouTube, TikTok, LinkedIn, and chat 24/7 on WhatsApp for instant AI & Google SEO project execution.
            </p>
          </div>

          {/* Quick Share and QR code buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopyProfile}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-bold border border-white/10 transition-all active:scale-95"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Portfolio URL'}</span>
            </button>

            <button
              onClick={() => {
                playClickSound();
                setShowQrCode(!showQrCode);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-cyan-950/80 hover:bg-cyan-900/80 text-cyan-300 rounded-xl text-xs font-bold border border-cyan-500/30 transition-all active:scale-95"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>{showQrCode ? 'Hide QR' : 'Show Contact QR'}</span>
            </button>

            <a
              href="https://wa.me/96896522902?text=Hello%20Maruf,%20I%20want%20to%20save%20your%20contact%20card."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-950 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* QR Code Card (Expandable) */}
        <AnimatePresence>
          {showQrCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 p-6 bg-slate-900 border border-cyan-500/30 rounded-3xl overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-xl mx-auto text-center sm:text-left">
                <div className="bg-white p-4 rounded-2xl shadow-2xl shrink-0">
                  {/* Real Quick-Scan SVG QR code mockup for Habibur Rahman WhatsApp */}
                  <div className="w-36 h-36 bg-slate-950 flex flex-col items-center justify-center p-2 rounded-xl text-center">
                    <QrCode className="w-20 h-20 text-cyan-400 mb-1" />
                    <span className="text-[9px] font-mono text-slate-300 font-bold tracking-tight">SCAN TO WHATSAPP</span>
                    <span className="text-[8px] font-mono text-emerald-400">+968 96522902</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-base font-black text-white">Instant WhatsApp Executive Card</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Scan with any smartphone camera to start an instant WhatsApp conversation with Habibur Rahman (Maruf). Verified in Muscat, Mabella & GCC remote.
                  </p>
                  <p className="text-[11px] font-mono text-emerald-400 font-bold">
                    Direct Line: +968 96522902 • habiburmaruf@gmail.com
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'all', label: 'All 9 Social Channels' },
            { id: 'direct', label: 'Direct Chat & Phone' },
            { id: 'visual', label: 'Reels, YouTube & TikTok' },
            { id: 'professional', label: 'LinkedIn & Business' },
            { id: 'community', label: 'Facebook & Telegram' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                playClickSound();
                setActiveCategory(cat.id as any);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border border-blue-400/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Social Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChannels.map(item => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-5 rounded-2xl bg-slate-900/80 border border-white/10 transition-all duration-300 group flex flex-col justify-between ${item.hoverBg} hover:shadow-xl hover:shadow-slate-950 hover:-translate-y-0.5`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2.5 rounded-xl text-white shadow-md"
                        style={{ backgroundColor: `${item.color}25`, color: item.color }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white group-hover:text-cyan-300 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400 block">{item.handle}</span>
                      </div>
                    </div>

                    <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-white/5 text-slate-300 border border-white/10">
                      {item.stat}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-500 group-hover:text-slate-300 transition-colors font-medium">
                    Open Official Link
                  </span>
                  <div className="flex items-center gap-1 text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                    <span>Visit</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
