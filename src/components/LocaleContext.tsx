import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'ar' | 'bn' | 'ur' | 'ml' | 'ta' | 'hi';
export type FontSizeScale = 'sm' | 'md' | 'lg';

export interface CountryPreset {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  defaultLang: LanguageCode;
  currency: string;
  dialCode: string;
  region: string;
}

export const COUNTRY_PRESETS: CountryPreset[] = [
  { code: 'OM', name: 'Oman', nativeName: 'سلطنة عُمان', flag: '🇴🇲', defaultLang: 'ar', currency: 'OMR', dialCode: '+968', region: 'Muscat, Seeb, Mabella, Salalah, Sohar' },
  { code: 'AE', name: 'United Arab Emirates', nativeName: 'الإمارات', flag: '🇦🇪', defaultLang: 'ar', currency: 'AED', dialCode: '+971', region: 'Dubai, Abu Dhabi' },
  { code: 'SA', name: 'Saudi Arabia', nativeName: 'المملكة العربية السعودية', flag: '🇸🇦', defaultLang: 'ar', currency: 'SAR', dialCode: '+966', region: 'Riyadh, Jeddah' },
  { code: 'QA', name: 'Qatar', nativeName: 'قطر', flag: '🇶🇦', defaultLang: 'ar', currency: 'QAR', dialCode: '+974', region: 'Doha' },
  { code: 'KW', name: 'Kuwait', nativeName: 'الكويت', flag: '🇰🇼', defaultLang: 'ar', currency: 'KWD', dialCode: '+965', region: 'Kuwait City' },
  { code: 'BH', name: 'Bahrain', nativeName: 'البحرين', flag: '🇧🇭', defaultLang: 'ar', currency: 'BHD', dialCode: '+973', region: 'Manama' },
  { code: 'BD', name: 'Bangladesh', nativeName: 'বাংলাদেশ', flag: '🇧🇩', defaultLang: 'bn', currency: 'BDT', dialCode: '+880', region: 'Dhaka, Chittagong, Sylhet' },
  { code: 'PK', name: 'Pakistan', nativeName: 'پاکستان', flag: '🇵🇰', defaultLang: 'ur', currency: 'PKR', dialCode: '+92', region: 'Karachi, Lahore, Islamabad' },
  { code: 'IN_KL', name: 'India (Kerala)', nativeName: 'കേരളം', flag: '🇮🇳', defaultLang: 'ml', currency: 'INR', dialCode: '+91', region: 'Kochi, Kozhikode, Trivandrum' },
  { code: 'IN_TN', name: 'India (Tamil Nadu)', nativeName: 'தமிழ்நாடு', flag: '🇮🇳', defaultLang: 'ta', currency: 'INR', dialCode: '+91', region: 'Chennai, Coimbatore, Madurai' },
  { code: 'IN_HI', name: 'India (National)', nativeName: 'भारत', flag: '🇮🇳', defaultLang: 'hi', currency: 'INR', dialCode: '+91', region: 'Delhi, Mumbai, Bengaluru' },
  { code: 'GLOBAL', name: 'Global Enterprise', nativeName: 'International', flag: '🌐', defaultLang: 'en', currency: 'USD', dialCode: '+1', region: 'GCC & Worldwide' },
];

export interface LocaleTranslations {
  navGoogleMaps: string;
  navStrategyDeck: string;
  navSolutions: string;
  navMarketplace: string;
  navArchive: string;
  navSupport: string;
  navContactMaruf: string;
  navAgenticAI: string;
  navAdminPanel: string;
  navCheapRates: string;
  
  heroTagline: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroSubtitle: string;
  btnStartTransformation: string;
  btnViewCaseStudies: string;
  btnHireWhatsApp: string;

  fontSizeControl: string;
  countrySelector: string;
  bilingualToggle: string;
  activeRegion: string;
  dialCode: string;

  aiBadge: string;
  aiCheapRateOman: string;
  claudeAgentTitle: string;
  themeChanger: string;
}

export const TRANSLATIONS: Record<LanguageCode, LocaleTranslations> = {
  en: {
    navGoogleMaps: 'Google Maps Hub',
    navStrategyDeck: 'Strategy Deck',
    navSolutions: 'Solutions & Skills',
    navMarketplace: 'Marketplace',
    navArchive: 'Evidence Vault',
    navSupport: 'Direct Support',
    navContactMaruf: 'Chat with Maruf',
    navAgenticAI: 'Agentic & Claude AI',
    navAdminPanel: 'Admin Settings',
    navCheapRates: 'Cheap Rate AI Work',
    
    heroTagline: 'Professional AI Automation & Digital Scale in Oman',
    heroHeadingLine1: 'The Hybrid Advantage',
    heroHeadingLine2: 'AI & Digital Scale',
    heroSubtitle: 'Transforming Oman businesses with affordable AI agents, Claude workflow automation, #1 Google Maps SEO, and AppSheet ERP with <60s WhatsApp response.',
    btnStartTransformation: 'Start at Affordable Rate',
    btnViewCaseStudies: 'View Case Studies',
    btnHireWhatsApp: 'Hire Now on WhatsApp',

    fontSizeControl: 'Text Size',
    countrySelector: 'Market / Country',
    bilingualToggle: 'Dual-Language View',
    activeRegion: 'Active Focus Region',
    dialCode: 'Direct WhatsApp Line',

    aiBadge: 'Agentic AI & Claude 3.5 Ready',
    aiCheapRateOman: 'Affordable Rates in Oman (From 15 OMR)',
    claudeAgentTitle: 'Claude AI & Autonomous Agent Workflows',
    themeChanger: 'Theme Switcher'
  },
  ar: {
    navGoogleMaps: 'خرائط جوجل والنمو',
    navStrategyDeck: 'عرض الإستراتيجية',
    navSolutions: 'الحلول والمهارات',
    navMarketplace: 'السوق الرقمي',
    navArchive: 'سجل الإنجازات',
    navSupport: 'الدعم المباشر',
    navContactMaruf: 'تواصل مع معروف',
    navAgenticAI: 'الذكاء الاصطناعي وكلود',
    navAdminPanel: 'لوحة التحكم',
    navCheapRates: 'خدمات ذكاء اصطناعي بأسعار مناسبة',
    
    heroTagline: 'منصة الذكاء الاصطناعي والأتمتة في سلطنة عُمان',
    heroHeadingLine1: 'الميزة الهجينة',
    heroHeadingLine2: 'للنمو الرقمي بالذكاء الاصطناعي',
    heroSubtitle: 'تمكين المؤسسات العُمانية بحلول الذكاء الاصطناعي، روبوتات كلود المؤتمتة، تصدر خرائط جوجل، وتطبيقات أب شيت بأسعار تنافسية تبدأ من 15 ريال عُماني.',
    btnStartTransformation: 'ابدأ بسعر اقتصادي',
    btnViewCaseStudies: 'استعراض دراسات الحالة',
    btnHireWhatsApp: 'وظّف معروف فوراً عبر واتساب',

    fontSizeControl: 'حجم الخط',
    countrySelector: 'الدولة / السوق',
    bilingualToggle: 'عرض ثنائي اللغة',
    activeRegion: 'منطقة العمليات الحالية',
    dialCode: 'خط التواصل المباشر',

    aiBadge: 'جاهز مع كلود والوكلاء الأذكياء',
    aiCheapRateOman: 'أسعار رخيصة ومناسبة في عُمان (تبدأ من 15 ر.ع)',
    claudeAgentTitle: 'روبوتات كلود والوكلاء الأذكياء للمؤسسات',
    themeChanger: 'تغيير المظهر'
  },
  bn: {
    navGoogleMaps: 'গুগল ম্যাপস হাব',
    navStrategyDeck: 'স্ট্র্যাটেজি ডেক',
    navSolutions: 'সলিউশন ও স্কিলস',
    navMarketplace: 'মার্কেটপ্লেস',
    navArchive: 'এভিডেন্স ভল্ট',
    navSupport: 'সরাসরি সাপোর্ট',
    navContactMaruf: 'মারুফের সাথে যোগাযোগ',
    navAgenticAI: 'এজেন্টিক এআই ও ক্লড',
    navAdminPanel: 'অ্যাডমিন প্যানেল',
    navCheapRates: 'ওমানে কম খরচে এআই কাজ',
    
    heroTagline: 'ওমানে প্রফেশনাল এআই অটোমেশন ও ডিজিটাল স্কেল',
    heroHeadingLine1: 'দ্য হাইব্রিড অ্যাডভান্টেজ',
    heroHeadingLine2: 'এআই ও ডিজিটাল সাফল্য',
    heroSubtitle: 'ওমানের ব্যবসার জন্য কম খরচে এআই চ্যাটবট, ক্লড এআই অটোমেশন, গুগল ম্যাপস ১ নম্বর র্যাংকিং ও অ্যাপশীট ইআরপি — ৬০ সেকেন্ডের হোয়াটসঅ্যাপ রেসপন্স।',
    btnStartTransformation: 'কম খরচে কাজ শুরু করুন',
    btnViewCaseStudies: 'কেস স্টাডি দেখুন',
    btnHireWhatsApp: 'হোয়াটসঅ্যাপে এখনই হায়ার করুন',

    fontSizeControl: 'ফন্ট সাইজ',
    countrySelector: 'দেশ / মার্কেট',
    bilingualToggle: 'দ্বিভাষিক ডিসপ্লে',
    activeRegion: 'অপারেশন অঞ্চল',
    dialCode: 'সরাসরি হোয়াটসঅ্যাপ নম্বর',

    aiBadge: 'ক্লড ৩.৫ ও এজেন্টিক এআই চালিত',
    aiCheapRateOman: 'ওমানে সুলভ মূল্যে এআই কাজ (মাত্র ১৫ ওএমআর থেকে)',
    claudeAgentTitle: 'ক্লড এআই ও স্বয়ংক্রিয় এজেন্ট ওয়ার্কফ্লো',
    themeChanger: 'থিম পরিবর্তন'
  },
  ur: {
    navGoogleMaps: 'گوگل میپس ہب',
    navStrategyDeck: 'اسٹریٹجی ڈیک',
    navSolutions: 'حل اور مہارتیں',
    navMarketplace: 'مارکیٹ پلیس',
    navArchive: 'شواہد والٹ',
    navSupport: 'براہ راست سپورٹ',
    navContactMaruf: 'معروف سے بات کریں',
    navAgenticAI: 'ایجنٹک اے آئی اور کلاؤڈ',
    navAdminPanel: 'ایڈمن پینل',
    navCheapRates: 'عمان میں سستے ریٹ پر اے آئی کام',
    
    heroTagline: 'سلطنت عمان میں پیشہ ورانہ اے آئی آٹومیشن اور ڈیجیٹل گروتھ',
    heroHeadingLine1: 'ہائبرڈ فائدہ',
    heroHeadingLine2: 'اے آئی اور ڈیجیٹل ترقی',
    heroSubtitle: 'عمان میں کاروبار کے لیے کم قیمت اے آئی چیٹ بوٹس، کلاؤڈ اے آئی آٹومیشن، گوگل میپس رینکنگ اور ایپ شیٹ سسٹم 15 ریال سے شروع۔',
    btnStartTransformation: 'مناسب قیمت میں شروع کریں',
    btnViewCaseStudies: 'کیس اسٹڈیز دیکھیں',
    btnHireWhatsApp: 'واٹس ایپ پر فوری رابطہ کریں',

    fontSizeControl: 'فونٹ سائز',
    countrySelector: 'ملک / مارکیٹ',
    bilingualToggle: 'ڈبل زبان کا منظر',
    activeRegion: 'فوکس علاقہ',
    dialCode: 'براہ راست واٹس ایپ لائن',

    aiBadge: 'کلاؤڈ 3.5 اور ایجنٹک اے آئی لیس',
    aiCheapRateOman: 'عمان میں انتہائی سستی قیمتیں (15 OMR سے شروع)',
    claudeAgentTitle: 'کلاؤڈ اے آئی اور خودکار ایجنٹ سسٹمز',
    themeChanger: 'تھیم تبدیل کریں'
  },
  ml: {
    navGoogleMaps: 'ഗൂഗിൾ മാപ്‌സ് ഹബ്',
    navStrategyDeck: 'സ്ട്രാറ്റജി ഡെക്ക്',
    navSolutions: 'സൊല്യൂഷനുകൾ',
    navMarketplace: 'മാർക്കറ്റ്‌പ്ലേസ്',
    navArchive: 'എവിഡൻസ് വോൾട്ട്',
    navSupport: 'ഡയറക്ട് സപ്പോർട്ട്',
    navContactMaruf: 'മാറൂഫുമായി ബന്ധപ്പെടുക',
    navAgenticAI: 'ഏജന്റിക് AI & ക്ലോഡ്',
    navAdminPanel: 'അഡ്മിൻ പാനൽ',
    navCheapRates: 'ഒമാനിൽ കുറഞ്ഞ നിരക്കിൽ AI സേവനം',
    
    heroTagline: 'ഒമാനിലെ പ്രൊഫഷണൽ AI ഓട്ടോമേഷനും ഡിജിറ്റൽ വളർച്ചയും',
    heroHeadingLine1: 'ഹൈബ്രിഡ് അഡ്വാന്റേജ്',
    heroHeadingLine2: 'AI & ഡിജിറ്റൽ സ്കെയിൽ',
    heroSubtitle: 'ഒമാനിലെ ബിസിനസുകൾക്കായി കുറഞ്ഞ നിരക്കിൽ AI ചാറ്റ്ബോട്ടുകൾ, ക്ലോഡ് AI വർക്ക്ഫ്ലോകൾ, ഗൂഗിൾ മാപ്സ് റാങ്കിംഗ്, ആപ്പ്ഷീറ്റ് ERP (15 OMR മുതൽ).',
    btnStartTransformation: 'കുറഞ്ഞ നിരക്കിൽ ആരംഭിക്കൂ',
    btnViewCaseStudies: 'കേസ് സ്റ്റഡീസ് കാണുക',
    btnHireWhatsApp: 'വാട്ട്‌സ്ആപ്പിൽ ബന്ധപ്പെടുക',

    fontSizeControl: 'ഫോണ്ട് വലിപ്പം',
    countrySelector: 'രാജ്യം / മാർക്കറ്റ്',
    bilingualToggle: 'ദ്വിഭാഷാ ഡിസ്‌പ്ലേ',
    activeRegion: 'പ്രവർത്തന മേഖല',
    dialCode: 'വാട്ട്‌സ്ആപ്പ് നമ്പർ',

    aiBadge: 'ക്ലോഡ് 3.5 & ഏജന്റിക് AI',
    aiCheapRateOman: 'ഒമാനിൽ ഏറ്റവും കുറഞ്ഞ നിരക്കിൽ (15 OMR മുതൽ)',
    claudeAgentTitle: 'ക്ലോഡ് AI & ഓട്ടോണമസ് വർക്ക്ഫ്ലോകൾ',
    themeChanger: 'തീം മാറ്റുക'
  },
  ta: {
    navGoogleMaps: 'கூகுள் மேப்ஸ் மையம்',
    navStrategyDeck: 'வியூக விளக்கக்காட்சி',
    navSolutions: 'தீர்வுகள் & திறன்கள்',
    navMarketplace: 'சந்தை தளம்',
    navArchive: 'சான்றுகள் காப்பகம்',
    navSupport: 'நேரடி ஆதரவு',
    navContactMaruf: 'மாருஃபுடன் உரையாடவும்',
    navAgenticAI: 'ஏஜென்டிக் AI & கிளாட்',
    navAdminPanel: 'நிர்வாக பலகை',
    navCheapRates: 'ஓமானில் குறைந்த கட்டணத்தில் AI வேலை',
    
    heroTagline: 'ஓமானில் தொழில்முறை AI தானியக்கம் மற்றும் டிஜிட்டல் வளர்ச்சி',
    heroHeadingLine1: 'ஹைப்ரிட் நன்மை',
    heroHeadingLine2: 'AI & டிஜிட்டல் வளர்ச்சி',
    heroSubtitle: 'ஓமான் வணிகங்களுக்கு குறைந்த கட்டணத்தில் AI சாட்பாட்கள், கிளாட் AI ஆட்டோமேஷன், கூகுள் மேப்ஸ் ரேங்கிங் (15 OMR முதல் தொடக்கம்).',
    btnStartTransformation: 'குறைந்த விலையில் தொடங்குங்கள்',
    btnViewCaseStudies: 'சான்றுகளை காண்க',
    btnHireWhatsApp: 'வாட்ஸ்அப்பில் உடனடியாக பணியமர்த்துக',

    fontSizeControl: 'எழுத்து அளவு',
    countrySelector: 'நாடு / சந்தை',
    bilingualToggle: 'இருமொழி காட்சி',
    activeRegion: 'செயல்பாட்டு பகுதி',
    dialCode: 'வாட்ஸ்அப் எண்',

    aiBadge: 'கிளாட் 3.5 & ஏஜென்டிக் AI வசதி',
    aiCheapRateOman: 'ஓமானில் மலிவு விலை AI (15 OMR முதல்)',
    claudeAgentTitle: 'கிளாட் AI & வணிக ஆட்டோமேஷன்',
    themeChanger: 'தீம் மாற்று'
  },
  hi: {
    navGoogleMaps: 'गूगल मैप्स हब',
    navStrategyDeck: 'रणनीति प्रस्तुति',
    navSolutions: 'समाधान एवं कौशल',
    navMarketplace: 'मार्केटप्लेस',
    navArchive: 'प्रमाण वॉल्ट',
    navSupport: 'सीधा सहयोग',
    navContactMaruf: 'मारूफ से संपर्क करें',
    navAgenticAI: 'एजेंटिक एआई और क्लॉड',
    navAdminPanel: 'एडमिन पैनल',
    navCheapRates: 'ओमान में सस्ती दरों पर एआई कार्य',
    
    heroTagline: 'ओमान में व्यावसायिक एआई ऑटोमेशन और डिजिटल विकास',
    heroHeadingLine1: 'द हाइब्रिड एडवांटेज',
    heroHeadingLine2: 'एआई और डिजिटल सफलता',
    heroSubtitle: 'ओमान के व्यवसायों के लिए किफायती एआई चैटबॉट्स, क्लॉड एआई ऑटोमेशन, गूगल मैप्स लोकल एसईओ, और ऐपशीट ईआरपी (15 OMR से शुरू)।',
    btnStartTransformation: 'सस्ती दर पर शुरू करें',
    btnViewCaseStudies: 'केस स्टडी देखें',
    btnHireWhatsApp: 'व्हाट्सएप पर तुरंत हायर करें',

    fontSizeControl: 'फ़ॉन्ट का आकार',
    countrySelector: 'देश / बाज़ार',
    bilingualToggle: 'द्विभाषी प्रदर्शन',
    activeRegion: 'सक्रिय क्षेत्र',
    dialCode: 'सीधा व्हाट्सएप नंबर',

    aiBadge: 'क्लॉड 3.5 और एजेंटिक एआई सक्षम',
    aiCheapRateOman: 'ओमान में सबसे सस्ती दरें (15 OMR से शुरू)',
    claudeAgentTitle: 'क्लॉड एआई और स्वायत्त एजेंट प्रणालियां',
    themeChanger: 'थीम बदलें'
  }
};

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  native: string;
  flag: string;
  isRtl?: boolean;
}

export const ALL_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇴🇲', isRtl: true },
  { code: 'bn', label: 'Bangla', native: 'বাংলা', flag: '🇧🇩' },
  { code: 'ur', label: 'Urdu', native: 'اردو', flag: '🇵🇰', isRtl: true },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' }
];

interface LocaleContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  isBilingual: boolean;
  setIsBilingual: (bilingual: boolean) => void;
  fontSize: FontSizeScale;
  setFontSize: (size: FontSizeScale) => void;
  country: CountryPreset;
  setCountry: (country: CountryPreset) => void;
  t: LocaleTranslations;
  isRTL: boolean;
  allLanguages: LanguageOption[];
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('marufedge_lang') as LanguageCode;
      if (saved && TRANSLATIONS[saved]) return saved;
    } catch (e) {
      // ignore
    }
    return 'en';
  });

  const [isBilingual, setIsBilingual] = useState<boolean>(true);
  const [fontSize, setFontSize] = useState<FontSizeScale>('md');
  const [country, setCountry] = useState<CountryPreset>(COUNTRY_PRESETS[0]); // Default Oman

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('marufedge_lang', lang);
    } catch (e) {
      // ignore
    }
  };

  const isRTL = language === 'ar' || language === 'ur';

  // Sync html dir and font scale classes
  useEffect(() => {
    const root = document.documentElement;
    root.dir = isRTL ? 'rtl' : 'ltr';
    root.lang = language;

    root.classList.remove('text-scale-sm', 'text-scale-md', 'text-scale-lg');
    root.classList.add(`text-scale-${fontSize}`);
  }, [language, fontSize, isRTL]);

  const handleSetCountry = (newCountry: CountryPreset) => {
    setCountry(newCountry);
    setLanguage(newCountry.defaultLang);
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <LocaleContext.Provider
      value={{
        language,
        setLanguage,
        isBilingual,
        setIsBilingual,
        fontSize,
        setFontSize,
        country,
        setCountry: handleSetCountry,
        t,
        isRTL,
        allLanguages: ALL_LANGUAGES
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
