import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cpu,
  Sparkles,
  Bot,
  Zap,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Play,
  RotateCcw,
  Layers,
  Terminal,
  MessageSquare,
  ShieldCheck,
  Globe,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useSound } from './AudioCursorProvider';
import { useLocale } from './LocaleContext';

interface AgentTemplate {
  id: string;
  title: string;
  badge: string;
  model: 'Claude 3.5 Sonnet' | 'Agentic Swarm';
  prompt: string;
  simulatedSteps: string[];
  output: {
    arabic: string;
    english: string;
    actionablePayload: string;
  };
}

const AGENT_TEMPLATES: AgentTemplate[] = [
  {
    id: 'garage-ramadan',
    title: 'Ramadan Promo for Muscat Garage (Arabic + English)',
    badge: 'Automotive Marketing',
    model: 'Claude 3.5 Sonnet',
    prompt: 'Generate a high-converting Ramadan car maintenance discount package for a workshop in Mabella, Muscat. Include oil filter change, AC gas check, and 5% Oman VAT inclusive pricing in OMR.',
    simulatedSteps: [
      'Detecting intent: GCC Ramadan Automotive Campaign',
      'Retrieving Oman Tax & Pricing standards (5% VAT, OMR currency)',
      'Synthesizing bilingual copy with Claude 3.5 Sonnet',
      'Generating WhatsApp Click-to-Chat pre-filled template'
    ],
    output: {
      arabic: '🌙 عروض رمضان المبارك لصيانة السيارات في المعبيلة! باقة فحص شامل لمكيف السيارة + تبديل زيت وفلتر أصلي ابتداءً من 18 ريال عُماني فقط (شامل ضريبة القيمة المضافة 5%). احجز الآن عبر الواتساب واستمتع براحة البال!',
      english: '🌙 Ramadan Mubarak Special at Mabella Workshop! Comprehensive AC gas check + premium engine oil & filter service starting from only 18 OMR (5% VAT included). Secure your appointment on WhatsApp today!',
      actionablePayload: 'WhatsApp Ad Copy + 18 OMR Package + Oman VAT 5% verified'
    }
  },
  {
    id: 'vat-invoice',
    title: 'Autonomous Oman 5% VAT Invoice Generator',
    badge: 'Financial Agent',
    model: 'Agentic Swarm',
    prompt: 'A client in Seeb purchased 150 OMR worth of IT network cabling. Compute 5% Oman VAT, line items, and generate an official printable invoice draft with tax registration number format.',
    simulatedSteps: [
      'Parsing financial amounts: Subtotal 150.000 OMR',
      'Applying Oman VAT Law (Royal Decree 121/2020: 5% = 7.500 OMR)',
      'Generating Total: 157.500 OMR',
      'Formatting VAT Invoice Draft for AppSheet & PDF printing'
    ],
    output: {
      arabic: 'فاتورة ضريبية رسمية (سلطنة عُمان):\nالمجموع الفرعي: 150.000 ر.ع\nضريبة القيمة المضافة (5%): 7.500 ر.ع\nالإجمالي الصافي: 157.500 ر.ع\nرقم التسجيل الضريبي: OM-VAT-2024-XXXX\nالحالة: معتمدة وجاهزة للطباعة والربط السحابي.',
      english: 'Official Tax Invoice (Sultanate of Oman):\nSubtotal: 150.000 OMR\nVAT (5%): 7.500 OMR\nTotal Due: 157.500 OMR\nTax Reg No: OM-VAT-2024-XXXX\nStatus: Approved & ready for AppSheet Cloud sync.',
      actionablePayload: 'JSON Tax Schema + AppSheet Barcode Record'
    }
  },
  {
    id: 'multilingual-bot',
    title: 'Multilingual Customer Care (Malayalam, Urdu & Arabic)',
    badge: 'Customer Support',
    model: 'Claude 3.5 Sonnet',
    prompt: 'Handle a customer asking in Malayalam for emergency breakdown towing in Salalah or Muscat. Reply courteously with direct phone line and immediate location request.',
    simulatedSteps: [
      'Ingesting multilingual customer speech / text: Malayalam input',
      'Routing to Emergency Response Dispatch Agent',
      'Locating recovery tow trucks in Muscat & Salalah network',
      'Formulating response in Malayalam with English & Arabic backup'
    ],
    output: {
      arabic: 'خدمة سحب وريكفري سيارات فورية في مسقط وصلالة على مدار 24 ساعة. تواصل عبر الواتساب على +968 96522902 وسنصل إليك فوراً.',
      english: '24/7 Breakdown Recovery in Muscat & Salalah. Please share your live WhatsApp location to +968 96522902. Our recovery unit is en route.',
      actionablePayload: 'Malayalam: നമസ്കാരം! മസ്‌കറ്റിലും സലാലയിലും 24 മണിക്കൂറും റിക്കവറി സർവീസ് ലഭ്യമാണ്. ദയവായി നിങ്ങളുടെ ലൊക്കേഷൻ +968 96522902 ലേക്ക് അയക്കുക.'
    }
  },
  {
    id: 'seo-audit-agent',
    title: 'Google Maps #1 Competitor Gap Audit Agent',
    badge: 'Growth Engine',
    model: 'Agentic Swarm',
    prompt: 'Analyze Google Maps local search signals for a cafeteria in Seeb against top 3 ranking competitors.',
    simulatedSteps: [
      'Probing Google Local Pack geocodes in Seeb / Al Mouj',
      'Evaluating keyword density: "Best Shawarma Seeb", "Breakfast Cafe Muscat"',
      'Identifying review gaps and missing Arabic categories',
      'Issuing 3-step action plan to overtake #1 ranking within 14 days'
    ],
    output: {
      arabic: 'خطة تصدر المركز الأول في خرائط جوجل بالسيب:\n1. تحديث الاسم التجاري والكلمات المفتاحية الثنائية.\n2. تفعيل 15 مراجعة مع صور حقيقية وقائمة الأسعار.\n3. ربط زر الواتساب المباشر لزيادة معدل التفاعل اليومي بنسبة 300%.',
      english: 'Google Maps Rank #1 Blueprint for Seeb:\n1. Update primary business category with bilingual tags.\n2. Deploy 15 photo-verified 5-star customer reviews.\n3. Connect 1-click WhatsApp order button to boost click-through by 300%.',
      actionablePayload: '14-Day SEO Action Plan + Geo-Grid Ranking Roadmap'
    }
  }
];

export const AgenticClaudeHub: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<AgentTemplate>(AGENT_TEMPLATES[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [executionResult, setExecutionResult] = useState<any | null>(null);
  const [copiedLang, setCopiedLang] = useState<string | null>(null);

  const { playClickSound, playDataSound } = useSound();
  const { t, isRTL } = useLocale();

  const handleRunAgent = async (template: AgentTemplate) => {
    playClickSound();
    setIsRunning(true);
    setActiveStep(0);
    setExecutionResult(null);

    // Simulate multi-step autonomous agent execution
    for (let i = 0; i < template.simulatedSteps.length; i++) {
      setActiveStep(i);
      playDataSound();
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    setExecutionResult(template.output);
    setIsRunning(false);
  };

  const handleCopy = (text: string, label: string) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopiedLang(label);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  return (
    <section id="agentic-claude-hub" className="py-24 bg-slate-950 text-white relative overflow-hidden border-t border-b border-white/5">
      {/* Background Cyber Violet Glows */}
      <div className="absolute top-1/4 right-10 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b076410_1px,transparent_1px),linear-gradient(to_bottom,#3b076410_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-[11px] font-black uppercase tracking-[0.25em] mb-4 border border-purple-500/20">
              <Bot className="w-3.5 h-3.5 text-purple-400" />
              <span>Claude 3.5 Sonnet & Agentic AI Systems</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Agentic AI & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400">Claude AI Automation</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-medium">
              Autonomous multi-agent workflows built for Oman businesses. Claude 3.5 intelligence for bilingual marketing, automated 5% VAT invoicing, and 24/7 customer care in 7 languages.
            </p>
          </div>

          {/* Cheap Rate Badge */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-900 border border-purple-500/30 px-4 py-2.5 rounded-2xl flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
              <div>
                <p className="text-[10px] font-mono uppercase text-slate-400 font-bold">Oman Cheap Rate</p>
                <p className="text-xs font-black text-emerald-400">From 15 OMR / Month</p>
              </div>
            </div>

            <a
              href="https://wa.me/96896522902?text=Hello%20Maruf,%20I%20want%20to%20deploy%20an%20Agentic%20AI%20/%20Claude%20AI%20system%20for%20my%20business%20in%20Oman."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-purple-950 transition-all active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>Deploy Claude Agent (WhatsApp)</span>
            </a>
          </div>
        </div>

        {/* 4-Step Multi-Agent Visual Architecture */}
        <div className="mb-12">
          <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 mb-4 font-bold flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Autonomous Multi-Agent Architecture for Oman</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Multilingual Ingestion',
                sub: 'Arabic, English, Bangla, Urdu, Malayalam, Tamil, Hindi',
                desc: 'Captures voice or text inquiries from WhatsApp, Instagram DMs, or Google Maps.',
                color: 'text-cyan-400',
                border: 'border-cyan-500/20'
              },
              {
                step: '02',
                title: 'Claude 3.5 Reasoning',
                sub: 'Oman Market & VAT Context',
                desc: 'Applies Oman tax laws (5% VAT), local Muscat logistics, and customer intent analysis.',
                color: 'text-purple-400',
                border: 'border-purple-500/20'
              },
              {
                step: '03',
                title: 'Tool & Action Execution',
                sub: 'Auto-Invoicing & Quotes',
                desc: 'Triggers WhatsApp pre-filled messages, AppSheet database records, and print-ready PDFs.',
                color: 'text-fuchsia-400',
                border: 'border-fuchsia-500/20'
              },
              {
                step: '04',
                title: 'Continuous Delivery SLA',
                sub: '<60s Lead Response Guarantee',
                desc: 'Ensures no client inquiry in Oman is lost, closing high-value deals around the clock.',
                color: 'text-emerald-400',
                border: 'border-emerald-500/20'
              }
            ].map((card, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl bg-slate-900/70 border ${card.border} hover:bg-slate-900 transition-all`}
              >
                <span className={`text-[10px] font-mono font-bold ${card.color} block mb-2`}>
                  AGENT STAGE {card.step}
                </span>
                <h4 className="text-sm font-black text-white">{card.title}</h4>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">{card.sub}</p>
                <p className="text-xs text-slate-500 leading-relaxed mt-3">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Interactive Agentic Playground */}
        <div className="bg-slate-900/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block mb-1">
                Interactive Playground
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Test Claude 3.5 Sonnet & Agentic Workflows Live
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Select an Oman business scenario below to witness the step-by-step autonomous agent execution.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300">Model: {selectedTemplate.model}</span>
            </div>
          </div>

          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {AGENT_TEMPLATES.map(tmpl => {
              const isSelected = selectedTemplate.id === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => {
                    playClickSound();
                    setSelectedTemplate(tmpl);
                    setExecutionResult(null);
                  }}
                  className={`p-3.5 rounded-2xl text-left transition-all border ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-500/50 text-white shadow-lg shadow-purple-950'
                      : 'bg-slate-950/60 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold text-purple-400 block mb-1">
                    {tmpl.badge}
                  </span>
                  <p className="text-xs font-bold leading-snug line-clamp-2">{tmpl.title}</p>
                </button>
              );
            })}
          </div>

          {/* Prompt & Run Controls */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-white/10 mb-6">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>Agent Prompt Directive</span>
              </span>
              <span className="text-slate-500">Autonomous Reasoning Enabled</span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed mb-4">
              "{selectedTemplate.prompt}"
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-cyan-400" />
                <span>Outputs in Arabic & English + Action Payload</span>
              </div>

              <button
                onClick={() => handleRunAgent(selectedTemplate)}
                disabled={isRunning}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-500 hover:opacity-90 text-white rounded-xl text-xs font-black shadow-lg shadow-purple-900/50 transition-all active:scale-95 disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Executing Agent Swarm...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Execute Agentic Workflow</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Execution Progress & Terminal Output */}
          {(isRunning || executionResult) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Agent execution thought trace */}
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-purple-500/20 space-y-2">
                <p className="text-[11px] font-mono uppercase text-purple-400 font-bold flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Agent Execution Chain</span>
                </p>

                <div className="space-y-1.5 font-mono text-xs">
                  {selectedTemplate.simulatedSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 transition-opacity ${
                        idx <= activeStep ? 'opacity-100 text-slate-300' : 'opacity-30 text-slate-600'
                      }`}
                    >
                      {idx <= activeStep ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                      )}
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Generated Output */}
              {executionResult && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                  
                  {/* Arabic Output */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 text-right">
                    <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                      <button
                        onClick={() => handleCopy(executionResult.arabic, 'ar')}
                        className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        {copiedLang === 'ar' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedLang === 'ar' ? 'تم النسخ' : 'نسخ النص'}</span>
                      </button>
                      <span className="text-xs font-bold text-emerald-400">المخرجات باللغة العربية</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed whitespace-pre-line dir-rtl">
                      {executionResult.arabic}
                    </p>
                  </div>

                  {/* English Output */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 text-left">
                    <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                      <span className="text-xs font-bold text-blue-400">English Synthesized Output</span>
                      <button
                        onClick={() => handleCopy(executionResult.english, 'en')}
                        className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        {copiedLang === 'en' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedLang === 'en' ? 'Copied' : 'Copy Text'}</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed whitespace-pre-line">
                      {executionResult.english}
                    </p>
                  </div>

                  {/* Actionable Payload */}
                  <div className="md:col-span-2 p-3 bg-purple-950/40 rounded-xl border border-purple-500/30 flex items-center justify-between text-xs text-purple-200">
                    <span className="font-mono text-[11px] text-purple-300 font-bold">
                      Direct Action Triggered: {executionResult.actionablePayload}
                    </span>
                    <a
                      href={`https://wa.me/96896522902?text=${encodeURIComponent('Hello Maruf, I tested your Claude AI demo: ' + selectedTemplate.title + '. I want to deploy this for my Oman business.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[10px] transition-all"
                    >
                      Deploy on WhatsApp
                    </a>
                  </div>

                </div>
              )}
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};
