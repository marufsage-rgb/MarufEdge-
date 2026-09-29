import React from 'react';
import { useLocale } from './LocaleContext';
import { Globe, Type, Smartphone, CheckCircle, Sparkles, Languages, Maximize2, ShieldCheck, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const BilingualTypographyTester = () => {
  const { 
    language, 
    setLanguage, 
    fontSize, 
    setFontSize, 
    country, 
    setCountry, 
    isBilingual, 
    setIsBilingual,
    COUNTRY_PRESETS,
    isRTL
  } = { ...useLocale(), COUNTRY_PRESETS: useLocale().country ? [
    { code: 'OM', name: 'Oman', nativeName: 'سلطنة عُمان', flag: '🇴🇲', defaultLang: 'ar', currency: 'OMR', dialCode: '+968', region: 'Muscat, Seeb, Salalah, Sohar' },
    { code: 'AE', name: 'United Arab Emirates', nativeName: 'الإمارات', flag: '🇦🇪', defaultLang: 'ar', currency: 'AED', dialCode: '+971', region: 'Dubai, Abu Dhabi' },
    { code: 'SA', name: 'Saudi Arabia', nativeName: 'المملكة العربية السعودية', flag: '🇸🇦', defaultLang: 'ar', currency: 'SAR', dialCode: '+966', region: 'Riyadh, Jeddah' },
    { code: 'QA', name: 'Qatar', nativeName: 'قطر', flag: '🇶🇦', defaultLang: 'ar', currency: 'QAR', dialCode: '+974', region: 'Doha' },
    { code: 'KW', name: 'Kuwait', nativeName: 'الكويت', flag: '🇰🇼', defaultLang: 'ar', currency: 'KWD', dialCode: '+965', region: 'Kuwait City' },
    { code: 'BH', name: 'Bahrain', nativeName: 'البحرين', flag: '🇧🇭', defaultLang: 'ar', currency: 'BHD', dialCode: '+973', region: 'Manama' },
    { code: 'BD', name: 'Bangladesh', nativeName: 'বাংলাদেশ', flag: '🇧🇩', defaultLang: 'bn', currency: 'BDT', dialCode: '+880', region: 'Dhaka, Chittagong' },
    { code: 'IN', name: 'India', nativeName: 'भारत', flag: '🇮🇳', defaultLang: 'hi', currency: 'INR', dialCode: '+91', region: 'Delhi, Mumbai, Kerala' },
    { code: 'GB', name: 'United Kingdom', nativeName: 'United Kingdom', flag: '🇬🇧', defaultLang: 'en', currency: 'GBP', dialCode: '+44', region: 'London' },
    { code: 'US', name: 'Global Enterprise', nativeName: 'International', flag: '🌐', defaultLang: 'en', currency: 'USD', dialCode: '+1', region: 'Worldwide' },
  ] : [] };

  const sampleCardData = [
    {
      titleEn: "Google Maps Local 3-Pack Supremacy",
      titleAr: "تصدر المراتب الثلاث الأولى في خرائط جوجل",
      titleBn: "গুগল ম্যাপস লোকাল টপ-৩ র‍্যাংকিং আধিপত্য",
      titleHi: "गूगल मैप्स लोकल टॉप-3 रैंकिंग प्रभुत्व",
      descEn: "Rank #1 across local search queries for verified service hubs, geo-tagged photos, and review velocity funnels.",
      descAr: "تحقيق المركز الأول في نتائج البحث المحلية عبر التوثيق الجغرافي وتحسين سرعة تدفق المراجعات الإيجابية.",
      badge: "Local SEO",
      sla: "< 60s Response"
    },
    {
      titleEn: "Bilingual WhatsApp Automation Engine",
      titleAr: "محرك أتمتة الواتساب ثنائي اللغة الفوري",
      titleBn: "দ্বিভাষিক ইনস্ট্যান্ট হোয়াটসঅ্যাপ অটোমেশন ইঞ্জিন",
      titleHi: "द्विभाषी त्वरित व्हाट्सएप ऑटोमेशन इंजन",
      descEn: "Captures inbound leads from Oman & GCC within 60 seconds with Arabic NLP qualification and instant agent routing.",
      descAr: "التقاط العملاء المحتملين في سلطنة عمان والخليج خلال 60 ثانية مع فلترة ذكية وتوجيه فوري لفريق المبيعات.",
      badge: "WhatsApp CRM",
      sla: "100% Inbound SLA"
    },
    {
      titleEn: "AppSheet Cloud Inventory & ERP",
      titleAr: "نظام إدارة المخزون والموارد عبر أب شيت",
      titleBn: "অ্যাপশীট ক্লাউড ইনভেন্টরি ও এন্টারপ্রাইজ ইআরপি",
      titleHi: "ऐपशीट क्लाउड इन्वेंटरी एवं एंटरप्राइज ईआरपी",
      descEn: "Real-time stock tracking with barcode scanning, automated VAT invoice generation, and custom dashboard reporting.",
      descAr: "تتبع المخزون في الوقت الفعلي مع مسح الباركود، وإصدار فواتير القيمة المضافة تلقائياً مع تقارير لوحة التحكم.",
      badge: "ERP & AppSheet",
      sla: "Real-Time Sync"
    }
  ];

  return (
    <section id="bilingual-checker" className="py-20 bg-slate-900 text-white border-y border-slate-800 relative overflow-hidden">
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-500/30">
              <Languages className="w-3.5 h-3.5" />
              <span>Bilingual Typography & Multi-Country Engine</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Bilingual <span className="text-blue-400">Font & Country</span> Inspector
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2">
              Inspect how Arabic, English, Bengali, and Hindi scripts render across any country preset with automatic optical sizing, line-height balance, and bidirectional text flow.
            </p>
          </div>

          {/* Quick Stats / Active Settings Indicator */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-900/40 text-blue-300 font-bold border border-blue-700/50">
              <span>Active Country:</span>
              <span>{country.flag} {country.name}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-900/40 text-emerald-300 font-bold border border-emerald-700/50">
              <span>Font Scale:</span>
              <span className="uppercase">{fontSize}</span>
            </div>
          </div>
        </div>

        {/* Live Typography Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sampleCardData.map((card, idx) => (
            <div 
              key={idx}
              className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-blue-950/40"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {card.badge}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {card.sla}
                  </span>
                </div>

                {/* Primary Script Based on Language */}
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3 leading-snug">
                  {language === 'ar' && card.titleAr}
                  {language === 'bn' && card.titleBn}
                  {language === 'hi' && card.titleHi}
                  {language === 'en' && card.titleEn}
                </h3>

                {/* Body Text */}
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {language === 'ar' && card.descAr}
                  {language === 'bn' && card.descEn}
                  {language === 'hi' && card.descEn}
                  {language === 'en' && card.descEn}
                </p>

                {/* Dual Bilingual Sub-text if Enabled */}
                {isBilingual && language !== 'en' && (
                  <div className="pt-3 border-t border-slate-900 text-xs text-slate-400 italic">
                    <span className="font-bold text-slate-500 not-italic uppercase text-[9px] tracking-wider block mb-0.5">English Reference:</span>
                    {card.titleEn}
                  </div>
                )}
                {isBilingual && language === 'en' && (
                  <div className="pt-3 border-t border-slate-900 text-xs text-blue-300/80" dir="rtl">
                    <span className="font-bold text-slate-500 not-italic uppercase text-[9px] tracking-wider block mb-0.5 text-left" dir="ltr">Arabic Reference:</span>
                    {card.titleAr}
                  </div>
                )}
              </div>

              {/* Currency & Market Footer */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>{country.region}</span>
                </span>
                <span className="font-mono text-emerald-400 font-bold">
                  {country.currency} Standard
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Country Preset Selector Strip */}
        <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-400" />
              <span>Select Any Country / Market to Test Typography & Pricing Adaptations:</span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {COUNTRY_PRESETS.map((c) => (
              <button
                key={c.code}
                onClick={() => setCountry(c)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  country.code === c.code
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-900/50 scale-[1.02]'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{c.flag}</span>
                  <span className="text-[10px] font-mono opacity-80">{c.currency}</span>
                </div>
                <div className="mt-2">
                  <p className="font-black text-xs leading-tight">{c.name}</p>
                  <p className="text-[10px] opacity-75 truncate">{c.nativeName}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
