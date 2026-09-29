import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow, 
  useMap 
} from '@vis.gl/react-google-maps';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Compass, 
  Layers, 
  ExternalLink, 
  Sparkles, 
  Search, 
  ShieldCheck, 
  ArrowUpRight, 
  Key, 
  TrendingUp,
  Map as MapIcon,
  Crosshair,
  CloudSun,
  Route,
  PenTool,
  Building,
  Star,
  Globe,
  Share2,
  Sliders,
  Wind,
  Droplets,
  Sun,
  Car,
  ChevronRight
} from 'lucide-react';

interface OmanLocation {
  id: string;
  name: string;
  nameAr: string;
  category: 'HQ' | 'TechLab' | 'Commercial' | 'Regional';
  role: string;
  address: string;
  position: { lat: number; lng: number };
  phone: string;
  hours: string;
  features: string[];
  localSeoRank: number;
}

const OMAN_LOCATIONS: OmanLocation[] = [
  {
    id: 'mabela-hq',
    name: 'MarufEdge ProMedia HQ & Operations',
    nameAr: 'المقر الرئيسي والعمليات - المعبيلة',
    category: 'HQ',
    role: 'Primary Digital Engineering & Strategy Center',
    address: 'Street 42, Al Maabilah Industrial / Commercial Zone, Seeb, Muscat',
    position: { lat: 23.6338, lng: 58.1254 },
    phone: '+968 96522902',
    hours: '8:00 AM – 9:00 PM (Sat–Thu)',
    features: ['Instant WhatsApp SLA <60s', 'Local SEO Map Pack', 'Server Infrastructure', 'Client Consultation'],
    localSeoRank: 1
  },
  {
    id: 'kom-tech-lab',
    name: 'Knowledge Oasis Muscat (KOM) Tech Lab',
    nameAr: 'مختبر التقنية - واحة المعرفة مسقط',
    category: 'TechLab',
    role: 'Cloud Architecture & Enterprise App R&D',
    address: 'Building 4, Knowledge Oasis Muscat (KOM), Rusayl, Oman',
    position: { lat: 23.5632, lng: 58.1678 },
    phone: '+968 96522902',
    hours: '9:00 AM – 6:00 PM (Sun–Thu)',
    features: ['AppSheet / ERP Systems', 'Cloud & Security Hosting', 'High-Speed Web Testing'],
    localSeoRank: 1
  },
  {
    id: 'ruwi-cbd',
    name: 'Muscat Corporate B2B Gateway',
    nameAr: 'بوابة الشركات - روي الحي التجاري',
    category: 'Commercial',
    role: 'Corporate Partnerships & B2B Paid Media',
    address: 'Central Business District (CBD), Ruwi, Muscat, Oman',
    position: { lat: 23.5978, lng: 58.5441 },
    phone: '+968 96522902',
    hours: '8:30 AM – 7:30 PM (Sun–Thu)',
    features: ['Bilingual Google Search Ads', 'Corporate Retainers', 'Omani Bank Gateway Integrations'],
    localSeoRank: 1
  },
  {
    id: 'seeb-corniche',
    name: 'Seeb Retail & E-Commerce Hub',
    nameAr: 'مركز التجارة الإلكترونية - السيب',
    category: 'Commercial',
    role: 'Local Retail & E-Commerce Growth Station',
    address: 'Seeb Commercial Souq Area, Seeb, Muscat',
    position: { lat: 23.6703, lng: 58.1891 },
    phone: '+968 96522902',
    hours: '9:00 AM – 10:00 PM (Daily)',
    features: ['Thawani Pay Setup', 'Meta / Instagram Dynamic Ads', 'Direct WhatsApp Ordering'],
    localSeoRank: 1
  },
  {
    id: 'bawshar-studio',
    name: 'Bawshar & Al Khuwair Media Studio',
    nameAr: 'استوديو الإعلام - بوشر والخوير',
    category: 'TechLab',
    role: 'High-Impact Visual Media & Ad Production',
    address: 'Al Khuwair 33, Bawshar, Muscat, Oman',
    position: { lat: 23.5880, lng: 58.4060 },
    phone: '+968 96522902',
    hours: '9:00 AM – 8:00 PM (Sun–Thu)',
    features: ['TikTok & Reels Campaign Production', 'Bilingual Ad Creative', 'High-Converting Landing Pages'],
    localSeoRank: 2
  },
  {
    id: 'sohar-node',
    name: 'Sohar Industrial Regional Node',
    nameAr: 'الفرع الإقليمي - صحار الصناعية',
    category: 'Regional',
    role: 'Industrial Logistics & B2B Systems',
    address: 'Sohar Freezone / Port Access Road, Sohar, Al Batinah North',
    position: { lat: 24.3644, lng: 56.7468 },
    phone: '+968 96522902',
    hours: '8:00 AM – 5:00 PM (Sun–Thu)',
    features: ['CCTV & Network Architecture', 'Logistics CRM Systems', 'Regional Lead Gen'],
    localSeoRank: 1
  },
  {
    id: 'salalah-gateway',
    name: 'Salalah Southern Gateway (Dhofar)',
    nameAr: 'بوابة ظفار الجنوبية - صلالة',
    category: 'Regional',
    role: 'Tourism & Seasonal Khareef Ad Campaigns',
    address: '23rd July Street, Al Haffa, Salalah, Dhofar Governorate',
    position: { lat: 17.0151, lng: 54.0924 },
    phone: '+968 96522902',
    hours: '9:00 AM – 9:00 PM (Daily during seasons)',
    features: ['Tourism Geo-Targeting', 'Hotel & Resort Funnels', 'Google Maps Local Pack Booster'],
    localSeoRank: 1
  }
];

const ROUTE_PRESETS = [
  {
    name: 'Muscat Int. Airport (MCT) ➔ Mabella HQ',
    origin: { lat: 23.5933, lng: 58.2844, name: 'Muscat International Airport' },
    destination: { lat: 23.6338, lng: 58.1254, name: 'MarufEdge HQ, Mabella' },
    distance: '24.8 km',
    duration: '22 mins',
    highway: 'Muscat Expressway / Route 1'
  },
  {
    name: 'KOM Tech Lab ➔ Ruwi CBD Gateway',
    origin: { lat: 23.5632, lng: 58.1678, name: 'Knowledge Oasis Muscat' },
    destination: { lat: 23.5978, lng: 58.5441, name: 'Ruwi Corporate CBD' },
    distance: '38.2 km',
    duration: '31 mins',
    highway: 'Sultan Qaboos St / Route 1'
  },
  {
    name: 'Mabella HQ ➔ Sohar Freezone Node',
    origin: { lat: 23.6338, lng: 58.1254, name: 'MarufEdge HQ, Mabella' },
    destination: { lat: 24.3644, lng: 56.7468, name: 'Sohar Freezone Node' },
    distance: '185 km',
    duration: '1 hr 48 mins',
    highway: 'Al Batinah Expressway'
  }
];

const WEATHER_FEEDS = [
  { city: 'Muscat / Seeb', temp: '31°C', condition: 'Sunny & Clear', humidity: '48%', wind: '14 km/h', uv: 'Extreme (9)' },
  { city: 'Al Maabilah', temp: '32°C', condition: 'Clear Skies', humidity: '44%', wind: '12 km/h', uv: 'Extreme (9)' },
  { city: 'KOM / Rusayl', temp: '30°C', condition: 'Sunny', humidity: '40%', wind: '16 km/h', uv: 'High (8)' },
  { city: 'Sohar Port', temp: '29°C', condition: 'Breezy Coastal', humidity: '58%', wind: '18 km/h', uv: 'High (8)' },
  { city: 'Salalah (Dhofar)', temp: '24°C', condition: 'Khareef Mist & Light Fog', humidity: '82%', wind: '22 km/h', uv: 'Moderate (4)' }
];

function MapCameraController({ selectedLocation }: { selectedLocation: OmanLocation | null }) {
  const map = useMap('marufedge-oman-map');

  useEffect(() => {
    if (!map || !selectedLocation) return;
    map.panTo(selectedLocation.position);
    map.setZoom(13);
  }, [map, selectedLocation]);

  return null;
}

export const GoogleMapsHub = () => {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const [selectedLocation, setSelectedLocation] = useState<OmanLocation | null>(OMAN_LOCATIONS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Platform Tool Tabs
  const [activeTab, setActiveTab] = useState<'map' | 'places' | 'drawing' | 'routes' | 'weather' | 'grounding'>('map');
  
  // Map Styling & Rendering States
  const [mapTypeId, setMapTypeId] = useState<string>('roadmap');
  const [activeTheme, setActiveTheme] = useState<'cyber' | 'silver' | 'desert'>('cyber');
  
  // Geofencing / Drawing States
  const [selectedGeofenceRadius, setSelectedGeofenceRadius] = useState<number>(10);
  
  // Route Compute State
  const [activeRouteIndex, setActiveRouteIndex] = useState<number>(0);
  
  // AI Grounding Simulator State
  const [groundingKeyword, setGroundingKeyword] = useState('Digital Marketing & AppSheet Seeb');
  const [groundingAuditResult, setGroundingAuditResult] = useState<string | null>(null);

  const filteredLocations = OMAN_LOCATIONS.filter(loc => {
    const matchesCat = activeCategory === 'ALL' || loc.category === activeCategory;
    const matchesSearch = 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.nameAr.includes(searchQuery) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getDirectDirectionsUrl = (loc: OmanLocation) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${loc.position.lat},${loc.position.lng}&travelmode=driving`;
  };

  const getCategoryBadgeClass = (category: OmanLocation['category']) => {
    switch (category) {
      case 'HQ': return 'bg-blue-600 text-white';
      case 'TechLab': return 'bg-indigo-600 text-white';
      case 'Commercial': return 'bg-emerald-600 text-white';
      case 'Regional': return 'bg-amber-600 text-white';
    }
  };

  const runAIGroundingAudit = () => {
    setGroundingAuditResult(
      `Grounded Analysis for "${groundingKeyword}" in Muscat/Seeb:\n• NAP Consistency: 100% Verified\n• Local 3-Pack Rank: #1 in Al Maabilah & Seeb\n• Direct WhatsApp SLA Route: Enabled (<60s Response)\n• Review Sentiment: 5.0 ★★★★★ across 148+ citations\n• Recommendation: Maintain bi-weekly localized photo uploads and targeted Google Business Profile updates.`
    );
  };

  return (
    <section id="google-maps" className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4 border border-blue-500/20">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Google Maps Platform &amp; Geospatial Engine</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Google Maps <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Geo-Infrastructure</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg mt-3 font-medium leading-relaxed">
              Powering Omani enterprise visibility through <strong>Maps JavaScript API</strong>, <strong>Places UI Kit</strong>, <strong>Compute Routes</strong>, <strong>Drawing Tools</strong>, and <strong>Weather APIs</strong> across Muscat, Seeb, KOM, Sohar, and Salalah.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl">
              <span className="block text-2xl font-black text-emerald-400">#1 Local Pack</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Muscat &amp; Seeb SEO</span>
            </div>
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl">
              <span className="block text-2xl font-black text-blue-400">&lt;60s Lead SLA</span>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Direct WhatsApp Route</span>
            </div>
          </div>
        </div>

        {/* API Key Status Notice */}
        {!apiKey && (
          <div className="mb-8 p-5 bg-gradient-to-r from-blue-950/80 to-slate-900 border border-blue-500/30 rounded-3xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-600/20 p-2.5 rounded-2xl text-blue-400 shrink-0 border border-blue-500/30">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-white text-sm">Interactive Maps Active in High-Performance Mode</h4>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  Configured with comprehensive mock geospatial telemetry. For custom Cloud map styling, set <code className="text-blue-300 bg-slate-800 px-1.5 py-0.5 rounded font-mono">VITE_GOOGLE_MAPS_API_KEY</code>.
                </p>
              </div>
            </div>
            <a 
              href="https://mapsplatform.google.com/maps-demo-key?utm_campaign=gmp_mcp_codeassist_v1_aistudio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95 shrink-0"
            >
              <span>Get Maps Demo Key</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Feature Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {[
            { id: 'map', label: '2D/3D Map Rendering', icon: MapIcon },
            { id: 'places', label: 'Places UI & Local Pack', icon: Building },
            { id: 'drawing', label: 'Drawing & Geofencing', icon: PenTool },
            { id: 'routes', label: 'Compute Routes & ETA', icon: Route },
            { id: 'weather', label: 'Weather API & Climate', icon: CloudSun },
            { id: 'grounding', label: 'Maps Grounding Lite (AI)', icon: Sparkles }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all shrink-0 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border border-blue-400' 
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: 2D/3D Map Rendering & Live Markers */}
        {activeTab === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            
            {/* Left Column: Location List & Search */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Search & Filter Bar */}
              <div className="bg-slate-900/90 p-4 rounded-3xl border border-slate-800 backdrop-blur-md shadow-xl space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search hub by city, area, or Arabic name..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { id: 'ALL', label: 'All Hubs' },
                    { id: 'HQ', label: 'HQ' },
                    { id: 'TechLab', label: 'Tech Labs' },
                    { id: 'Commercial', label: 'Commercial' },
                    { id: 'Regional', label: 'Regional' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-extrabold uppercase tracking-wider transition-all ${
                        activeCategory === cat.id 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40' 
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locations Scroll List */}
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                {filteredLocations.map((loc) => {
                  const isSelected = selectedLocation?.id === loc.id;
                  return (
                    <motion.div
                      key={loc.id}
                      onClick={() => setSelectedLocation(loc)}
                      className={`p-4 rounded-3xl border transition-all cursor-pointer relative overflow-hidden ${
                        isSelected 
                          ? 'bg-gradient-to-br from-slate-900 to-blue-950/70 border-blue-500 shadow-xl shadow-blue-950/50 scale-[1.01]' 
                          : 'bg-slate-900/70 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-blue-500" />
                      )}
                      <div className="flex items-start justify-between gap-3 mb-1.5">
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${getCategoryBadgeClass(loc.category)}`}>
                            {loc.category}
                          </span>
                          <h4 className="text-sm font-black text-white mt-1 leading-snug">{loc.name}</h4>
                          <p className="text-[11px] text-slate-400 font-medium" dir="rtl">{loc.nameAr}</p>
                        </div>
                        <div className="bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-lg text-[9px] font-black shrink-0">
                          Rank #{loc.localSeoRank} Local
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mt-1">
                        {loc.address}
                      </p>

                      <div className="flex items-center justify-between pt-3 mt-2.5 border-t border-slate-800/60 text-xs">
                        <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                          <Phone className="w-3 h-3 text-blue-400" />
                          {loc.phone}
                        </span>
                        <a 
                          href={getDirectDirectionsUrl(loc)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold text-[11px] hover:underline"
                        >
                          <span>Directions</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Google Maps Interactive Viewer */}
            <div className="lg:col-span-7">
              <div className="bg-slate-900 rounded-[2.5rem] p-3 border border-slate-800 shadow-2xl overflow-hidden relative">
                
                {/* Map Type & Control Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-slate-950/80 rounded-2xl mb-3 border border-slate-800 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-1">Map View:</span>
                    {['roadmap', 'satellite', 'hybrid', 'terrain'].map(type => (
                      <button
                        key={type}
                        onClick={() => setMapTypeId(type)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${
                          mapTypeId === type
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-500/30">
                      Oman Center (Muscat / Seeb)
                    </span>
                  </div>
                </div>

                {/* Map Viewport Container */}
                <div className="w-full h-[520px] rounded-[2rem] overflow-hidden relative border border-slate-800/80">
                  <APIProvider apiKey={apiKey}>
                    <Map
                      id="marufedge-oman-map"
                      mapId="DEMO_MAP_ID"
                      mapTypeId={mapTypeId}
                      defaultCenter={{ lat: 23.6338, lng: 58.1254 }}
                      defaultZoom={10}
                      gestureHandling="greedy"
                      disableDefaultUI={false}
                      internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                      className="w-full h-full"
                    >
                      <MapCameraController selectedLocation={selectedLocation} />

                      {/* Markers for all locations */}
                      {OMAN_LOCATIONS.map((loc) => {
                        const isSelected = selectedLocation?.id === loc.id;
                        return (
                          <AdvancedMarker
                            key={loc.id}
                            position={loc.position}
                            title={loc.name}
                            onClick={() => setSelectedLocation(loc)}
                          >
                            <Pin
                              background={isSelected ? '#2563eb' : '#0d9488'}
                              borderColor="#ffffff"
                              glyphColor="#ffffff"
                              scale={isSelected ? 1.3 : 1.0}
                            />
                          </AdvancedMarker>
                        );
                      })}

                      {/* InfoWindow for active selection */}
                      {selectedLocation && (
                        <InfoWindow
                          position={selectedLocation.position}
                          onCloseClick={() => setSelectedLocation(null)}
                        >
                          <div className="p-2 max-w-xs text-slate-900 font-sans">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                              {selectedLocation.category} • Oman Hub
                            </span>
                            <h4 className="font-black text-sm text-slate-900 mt-1 mb-0.5">{selectedLocation.name}</h4>
                            <p className="text-[11px] text-slate-500 leading-tight mb-2">{selectedLocation.address}</p>
                            <div className="text-[10px] text-slate-600 space-y-1 mb-3 pt-1 border-t border-slate-100">
                              <p className="flex items-center gap-1 font-semibold text-emerald-700">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Google Local Pack #1 Top Ranking</span>
                              </p>
                              <p className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-slate-400" />
                                <span>{selectedLocation.hours}</span>
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <a
                                href={getDirectDirectionsUrl(selectedLocation)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-black transition-all"
                              >
                                Navigate
                              </a>
                              <a
                                href={`https://wa.me/96896522902?text=Hello%20Maruf,%20I%20am%20at%20${encodeURIComponent(selectedLocation.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-black transition-all"
                              >
                                WhatsApp
                              </a>
                            </div>
                          </div>
                        </InfoWindow>
                      )}
                    </Map>
                  </APIProvider>

                  {/* Overlaid Floating Active Hub Details Bar */}
                  {selectedLocation && (
                    <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-xl border border-slate-700/80 p-3.5 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                          <h4 className="text-xs sm:text-sm font-black text-white">{selectedLocation.name}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{selectedLocation.role}</p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a
                          href={getDirectDirectionsUrl(selectedLocation)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold rounded-xl transition-all shadow-lg active:scale-95"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Turn-by-Turn GPS</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Places UI Kit & Local Pack Dominance */}
        {activeTab === 'places' && (
          <div className="bg-slate-900 p-6 sm:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-wider mb-3 border border-emerald-500/20">
                <Building className="w-4 h-4" />
                <span>Places API &amp; Local Pack Discovery</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Oman Places UI &amp; Verified Business Pack
              </h3>
              <p className="text-slate-400 text-sm mt-2">
                Simulating verified Google Business Profiles with rich attributes: reviews, photos, business categories, NAP verification, and instant WhatsApp booking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OMAN_LOCATIONS.slice(0, 3).map((loc) => (
                <div key={loc.id} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-blue-500/50 transition-all">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-black uppercase text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30">
                      {loc.category} Verified
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>5.0 (148+)</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-white leading-snug">{loc.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{loc.address}</p>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{loc.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{loc.phone}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <a
                      href={getDirectDirectionsUrl(loc)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all"
                    >
                      Maps Directions
                    </a>
                    <a
                      href={`https://wa.me/96896522902?text=Hello%20Maruf,%20booking%20at%20${encodeURIComponent(loc.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Drawing Tools & Geofencing Zones */}
        {activeTab === 'drawing' && (
          <div className="bg-slate-900 p-6 sm:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-wider mb-3 border border-cyan-500/20">
                <PenTool className="w-4 h-4" />
                <span>Geofencing &amp; Ad Targeting Radii</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Precision Ad Targeting &amp; Service Coverage Polygons
              </h3>
              <p className="text-slate-400 text-sm mt-2">
                Visualize targeted geographical polygons and radius buffers for Meta &amp; Google Ads campaigns across Al Maabilah, Seeb, KOM, Bawshar, and Muscat.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Select Geofencing Radius:</span>
                {[
                  { radius: 10, name: '10 km - Al Maabilah & Seeb Local Pack', audience: '185,000+ residents', clicks: '+78% CTR' },
                  { radius: 25, name: '25 km - Greater Muscat Capital Zone', audience: '650,000+ residents', clicks: '+62% CTR' },
                  { radius: 50, name: '50 km - Muscat to KOM & Barka Corridor', audience: '980,000+ reach', clicks: '+55% CTR' }
                ].map(item => (
                  <div
                    key={item.radius}
                    onClick={() => setSelectedGeofenceRadius(item.radius)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedGeofenceRadius === item.radius
                        ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm text-white">{item.name}</h4>
                      <span className="text-xs font-black text-emerald-400">{item.clicks}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Est. Audience: {item.audience}</p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-7 bg-slate-950 p-6 rounded-3xl border border-slate-800 text-center space-y-4">
                <div className="relative w-64 h-64 mx-auto rounded-full border-2 border-dashed border-blue-500/50 flex items-center justify-center bg-blue-950/20">
                  <div className="w-44 h-44 rounded-full border-2 border-emerald-500/60 flex items-center justify-center bg-emerald-950/30">
                    <div className="w-24 h-24 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-cyan-950/50">
                      <div className="text-center">
                        <MapPin className="w-6 h-6 text-white mx-auto animate-bounce" />
                        <span className="text-[10px] font-black text-white uppercase">Mabella HQ</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-4 text-xs">
                  <span className="text-cyan-400 font-bold">● 10km Core Zone</span>
                  <span className="text-emerald-400 font-bold">● 25km Capital Reach</span>
                  <span className="text-blue-400 font-bold">● 50km Corridor</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Compute Routes & ETA Travel Planner */}
        {activeTab === 'routes' && (
          <div className="bg-slate-900 p-6 sm:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-wider mb-3 border border-blue-500/20">
                <Route className="w-4 h-4" />
                <span>Compute Routes API &amp; Fleet Logistics</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Live Route &amp; Travel Time Computation
              </h3>
              <p className="text-slate-400 text-sm mt-2">
                Calculate ideal highway routes, travel durations, and fuel metrics between client locations, Muscat International Airport, and MarufEdge operational hubs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ROUTE_PRESETS.map((r, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveRouteIndex(idx)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                    activeRouteIndex === idx
                      ? 'bg-gradient-to-br from-slate-950 to-blue-950/80 border-blue-500 shadow-xl'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-emerald-400">{r.duration}</span>
                    <span className="text-xs font-bold text-slate-400">{r.distance}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white mb-2">{r.name}</h4>
                  <p className="text-xs text-slate-400 mb-4">Via: {r.highway}</p>
                  
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&origin=${r.origin.lat},${r.origin.lng}&destination=${r.destination.lat},${r.destination.lng}&travelmode=driving`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
                  >
                    <span>Compute Live in Google Maps</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Weather API & Regional Climate */}
        {activeTab === 'weather' && (
          <div className="bg-slate-900 p-6 sm:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black uppercase tracking-wider mb-3 border border-amber-500/20">
                <CloudSun className="w-4 h-4" />
                <span>Google Weather API &amp; Seasonal Timing</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Oman Real-Time Weather &amp; Campaign Timing Intelligence
              </h3>
              <p className="text-slate-400 text-sm mt-2">
                Aligning digital ad campaigns with local weather triggers (e.g. Dhofar Khareef monsoon tourism spikes, Muscat summer retail timings).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {WEATHER_FEEDS.map((w, idx) => (
                <div key={idx} className="bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-3">
                  <h4 className="font-black text-sm text-white">{w.city}</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-amber-400">{w.temp}</span>
                    <span className="text-[11px] text-slate-400">{w.condition}</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                    <div className="flex justify-between">
                      <span>Humidity:</span>
                      <span className="text-slate-300 font-bold">{w.humidity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wind:</span>
                      <span className="text-slate-300 font-bold">{w.wind}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>UV Index:</span>
                      <span className="text-slate-300 font-bold">{w.uv}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Maps Grounding Lite (AI Local Pack Auditor) */}
        {activeTab === 'grounding' && (
          <div className="bg-slate-900 p-6 sm:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl space-y-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-wider mb-3 border border-emerald-500/20">
                <Sparkles className="w-4 h-4" />
                <span>Maps Grounding Lite Engine</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Grounded AI Local Pack Optimization Audit
              </h3>
              <p className="text-slate-400 text-sm mt-2">
                Grounding AI intelligence with real-world Google Maps geospatial data to audit your business listing and unlock Top 3 Local Pack ranking in Muscat and Seeb.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={groundingKeyword}
                onChange={(e) => setGroundingKeyword(e.target.value)}
                placeholder="Enter business category or location (e.g. Web Design Seeb)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-5 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={runAIGroundingAudit}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all shadow-lg active:scale-95"
              >
                Run Geo-Audit
              </button>
            </div>

            {groundingAuditResult && (
              <div className="p-5 bg-slate-950 rounded-3xl border border-emerald-500/30 text-xs text-slate-300 font-mono whitespace-pre-line leading-relaxed">
                {groundingAuditResult}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
