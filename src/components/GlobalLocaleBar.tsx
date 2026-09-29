import React, { useState } from 'react';
import { useLocale, COUNTRY_PRESETS, LanguageCode, FontSizeScale, ALL_LANGUAGES } from './LocaleContext';
import { useTheme, AVAILABLE_THEMES, ThemeMode } from './ThemeContext';
import { Globe, Type, ChevronDown, Check, Sparkles, MapPin, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSound } from './AudioCursorProvider';

export const GlobalLocaleBar = () => {
  const { 
    language, 
    setLanguage, 
    fontSize, 
    setFontSize, 
    country, 
    setCountry, 
    isBilingual, 
    setIsBilingual,
    t,
    isRTL,
    allLanguages
  } = useLocale();

  const { theme, setTheme, availableThemes } = useTheme();
  const { playClickSound } = useSound();

  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const fontOptions: { id: FontSizeScale; label: string; px: string }[] = [
    { id: 'sm', label: 'A-', px: 'Compact' },
    { id: 'md', label: 'A', px: 'Standard' },
    { id: 'lg', label: 'A+', px: 'Large' },
  ];

  return (
    <div className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800/80 py-2 px-4 sm:px-8 relative z-50 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Side: Country & Location Selector */}
        <div className="flex items-center gap-3">
          {/* Country Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                playClickSound();
                setIsCountryMenuOpen(!isCountryMenuOpen);
                setIsLangMenuOpen(false);
                setIsThemeMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-700 transition-all active:scale-95"
              aria-label="Select Country and Target Market"
            >
              <span className="text-base leading-none">{country.flag}</span>
              <span className="truncate max-w-[120px] sm:max-w-none">{country.name}</span>
              <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline">({country.currency})</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isCountryMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isCountryMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute left-0 mt-2 w-72 max-h-80 overflow-y-auto bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 scrollbar-thin"
                >
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-800">
                    Select Target Country / Regional Market
                  </div>
                  {COUNTRY_PRESETS.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        playClickSound();
                        setCountry(c);
                        setIsCountryMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                        country.code === c.code 
                          ? 'bg-blue-600 text-white font-bold' 
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{c.flag}</span>
                        <div>
                          <p className="font-bold leading-tight">{c.name}</p>
                          <p className="text-[10px] opacity-75">{c.nativeName} • {c.region}</p>
                        </div>
                      </div>
                      {country.code === c.code && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Regional focus badge */}
          <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-400">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span className="font-medium">{country.region}</span>
          </div>
        </div>

        {/* Right Side: Theme Switcher + 7 Languages + Font Size + Bilingual Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          
          {/* Quick Theme Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                playClickSound();
                setIsThemeMenuOpen(!isThemeMenuOpen);
                setIsLangMenuOpen(false);
                setIsCountryMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-700 transition-all text-xs active:scale-95"
              title="Change Theme Palette"
            >
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Theme</span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isThemeMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isThemeMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50"
                >
                  <div className="px-3 py-1 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-800">
                    Switch Theme Palette
                  </div>
                  {availableThemes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => {
                        playClickSound();
                        setTheme(t.id);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                        theme === t.id
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: t.primaryColor }}
                        />
                        <div>
                          <p className="font-bold leading-tight">{t.name}</p>
                          <p className="text-[10px] opacity-75">{t.badge}</p>
                        </div>
                      </div>
                      {theme === t.id && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 7-Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                playClickSound();
                setIsLangMenuOpen(!isLangMenuOpen);
                setIsCountryMenuOpen(false);
                setIsThemeMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-700 transition-all text-xs active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{allLanguages.find(l => l.code === language)?.native || 'Language'}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-1.5 z-50 max-h-72 overflow-y-auto scrollbar-thin"
                >
                  <div className="px-3 py-1 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-800">
                    Select Language / 7 Languages
                  </div>
                  {allLanguages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        playClickSound();
                        setLanguage(l.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                        language === l.code
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{l.flag}</span>
                        <div>
                          <span className="font-bold block leading-tight">{l.native}</span>
                          <span className="text-[10px] opacity-75">{l.label}</span>
                        </div>
                      </div>
                      {language === l.code && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Font Size Adjuster */}
          <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5">
            {fontOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => setFontSize(f.id)}
                title={`Set text size to ${f.px}`}
                className={`px-2 py-1 text-xs font-black rounded-lg transition-all ${
                  fontSize === f.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Bilingual Dual-Language View Switch */}
          <button
            onClick={() => setIsBilingual(!isBilingual)}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all border ${
              isBilingual
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title="Toggle Dual-Language English + Arabic/Native View"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>{isBilingual ? 'Dual View' : 'Dual View'}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
