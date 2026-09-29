import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, GraduationCap, Laptop, Briefcase, MapPin, CheckCircle2, Globe } from 'lucide-react';
import { useLocale } from './LocaleContext';

export const Hero = () => {
  const { t, language, country, isBilingual } = useLocale();

  return (
    <div className="relative pt-32 pb-20 overflow-hidden bg-slate-950 selection:bg-blue-600 selection:text-white">
      {/* High-Resolution Cyber Background */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-900/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2 opacity-40 pointer-events-none" />
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,0,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center lg:text-left flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl"
            >
              <span className="text-base">{country.flag}</span>
              <span>{country.name} • {t.heroTagline}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 leading-[1.05]"
            >
              <span>{t.heroHeadingLine1}</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                {t.heroHeadingLine2}
              </span>{' '}
              <span className="text-white/20 italic font-light tracking-tighter">({country.name})</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-xl text-lg sm:text-xl text-slate-400 mb-8 leading-relaxed font-medium"
            >
              {t.heroSubtitle}
            </motion.p>

            {isBilingual && language !== 'en' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8 p-5 rounded-3xl bg-white/5 border border-white/5 text-xs sm:text-sm text-slate-300 leading-relaxed font-medium backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 text-cyan-400 mb-2">
                  <Globe className="w-3.5 h-3.5" />
                  <span className="font-black uppercase tracking-wider text-[10px]">Global Business Context:</span>
                </div>
                Transforming enterprise operations with bilingual AI workflows, AppSheet inventory automation, Google Maps local dominance, and executive business development.
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 sm:gap-6"
            >
              <a 
                href="#google-maps"
                className="group relative flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-blue-600 text-white rounded-2xl font-black overflow-hidden transition-all shadow-2xl shadow-blue-900/40 active:scale-95 text-sm sm:text-base"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span>{t.btnStartTransformation}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#presentation"
                className="flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-black hover:bg-white/10 transition-all text-sm sm:text-base"
              >
                <span>{t.btnViewCaseStudies}</span>
              </a>
            </motion.div>
          </div>

          <div className="flex-1 w-full lg:w-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-square max-w-xl mx-auto"
            >
              <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute inset-0 bg-slate-900/80 border border-white/10 rounded-[4rem] shadow-2xl overflow-hidden p-8 backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-6 h-full">
                  {[
                    { icon: GraduationCap, label: 'Higher Ed', desc: 'Bilingual Strategy', color: 'bg-blue-600' },
                    { icon: Laptop, label: 'IT Skills', desc: 'AppSheet & ERP', color: 'bg-cyan-600' },
                    { icon: Briefcase, label: 'Enterprise', desc: `${country.currency} Scale`, color: 'bg-emerald-600' },
                    { icon: Sparkles, label: 'AI Support', desc: '<60s SLA Funnel', color: 'bg-amber-600' },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-950/50 rounded-[3rem] p-6 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/5 hover:border-white/10 transition-all group border border-transparent">
                      <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform`}>
                        <item.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-xs font-black text-white uppercase tracking-wider block">{item.label}</span>
                        <span className="text-[10px] font-bold text-slate-500 block mt-1 uppercase font-mono">{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

