import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'emerald' | 'gold' | 'navy' | 'cyberpunk' | 'crimson';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  nativeName: string;
  description: string;
  badge: string;
  primaryColor: string;
  accentGradient: string;
  borderGlow: string;
  previewBg: string;
}

export const AVAILABLE_THEMES: ThemeConfig[] = [
  {
    id: 'emerald',
    name: 'Muscat Emerald Tech',
    nativeName: 'الزمرد العُماني التقني',
    description: 'Fresh Oman digital green & cyber mint. Optimal for Google Maps & local ranking.',
    badge: 'Default',
    primaryColor: '#10b981',
    accentGradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    borderGlow: 'hover:border-emerald-500/50',
    previewBg: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
  },
  {
    id: 'gold',
    name: 'Oman Royal Gold & Obsidian',
    nativeName: 'الذهب الملكي العُماني',
    description: 'GCC luxury obsidian black and imperial amber gold. High prestige corporate feel.',
    badge: 'Luxury',
    primaryColor: '#f59e0b',
    accentGradient: 'from-amber-400 via-yellow-400 to-amber-500',
    borderGlow: 'hover:border-amber-500/50',
    previewBg: 'bg-amber-950/80 border-amber-500/40 text-amber-300'
  },
  {
    id: 'navy',
    name: 'Enterprise Blue & Telecom NOC',
    nativeName: 'الأزرق المؤسسي وشبكات الاتصال',
    description: 'Corporate sapphire & deep sea cyan. Perfect for ERP, Telecom & Cloud infra.',
    badge: 'Corporate',
    primaryColor: '#2563eb',
    accentGradient: 'from-blue-400 via-cyan-400 to-indigo-400',
    borderGlow: 'hover:border-blue-500/50',
    previewBg: 'bg-blue-950/80 border-blue-500/40 text-blue-300'
  },
  {
    id: 'cyberpunk',
    name: 'Claude & Agentic AI Violet',
    nativeName: 'البنفسجي الذكي والوكلاء الرقميون',
    description: 'Deep neon violet & electric fuchsia for Claude 3.5 Sonnet and autonomous AI.',
    badge: 'Agentic AI',
    primaryColor: '#8b5cf6',
    accentGradient: 'from-purple-400 via-fuchsia-400 to-violet-400',
    borderGlow: 'hover:border-purple-500/50',
    previewBg: 'bg-purple-950/80 border-purple-500/40 text-purple-300'
  },
  {
    id: 'crimson',
    name: 'Sultanate Crimson & Ruby',
    nativeName: 'الياقوت السلطاني الأحمر',
    description: 'Deep Arabian crimson and warm copper. Elegant regional authority aesthetic.',
    badge: 'Heritage',
    primaryColor: '#e11d48',
    accentGradient: 'from-rose-400 via-red-400 to-amber-400',
    borderGlow: 'hover:border-rose-500/50',
    previewBg: 'bg-rose-950/80 border-rose-500/40 text-rose-300'
  }
];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  currentThemeConfig: ThemeConfig;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('marufedge_theme') as ThemeMode;
      if (saved && AVAILABLE_THEMES.some(t => t.id === saved)) {
        return saved;
      }
    } catch (e) {
      // Local storage unavailable
    }
    return 'emerald';
  });

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem('marufedge_theme', newTheme);
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    // Remove previous theme classes
    AVAILABLE_THEMES.forEach(t => root.classList.remove(`theme-${t.id}`));
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const currentThemeConfig = AVAILABLE_THEMES.find(t => t.id === theme) || AVAILABLE_THEMES[0];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        currentThemeConfig,
        availableThemes: AVAILABLE_THEMES
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
