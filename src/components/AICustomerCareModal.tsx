import React, { useState, useRef, useEffect } from 'react';
import { useLocale } from './LocaleContext';
import { useSound } from './AudioCursorProvider';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  X, 
  Minimize2, 
  Maximize2, 
  Phone, 
  CheckCircle2, 
  HelpCircle, 
  Zap, 
  ShieldCheck, 
  RefreshCw, 
  ExternalLink,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const AICustomerCareModal = () => {
  const { t, country, language } = useLocale();
  const { playClickSound, playDataSound } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: `Welcome to MarufEdge Executive Help Desk. How can we accelerate your business today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    playClickSound();
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsLoading(true);

    try {
      playDataSound();
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend.trim(),
          conversationHistory: messages.map(m => ({ role: m.role, text: m.text }))
        })
      });

      const data = await response.json();
      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'model',
          text: data.reply || "Maruf is standing by. Call +968 96522902 for immediate escalation.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      playDataSound();
    } catch (err) {
      setMessages(prev => [...prev, { id: `err-${Date.now()}`, role: 'model', text: "Service active. Direct contact: +968 96522902.", timestamp: "Now" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? '64px' : 'min(580px, 80vh)',
              width: isMinimized ? '260px' : 'min(440px, 92vw)'
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="pointer-events-auto bg-slate-950 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-900/40 to-slate-900 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/40">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-black text-white leading-tight">MarufEdge Help Desk</p>
                  <p className="text-[9px] text-cyan-400 font-mono font-bold tracking-tighter uppercase">24/7 AI NOC Service</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => { playClickSound(); setIsMinimized(!isMinimized); }}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => { playClickSound(); setIsOpen(false); }}
                  className="p-1.5 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Quick Action Chips */}
                <div className="p-3 bg-white/5 border-b border-white/5 overflow-x-auto flex gap-2 scrollbar-none shrink-0">
                  {[
                    { label: "🚀 Meta Ads", query: "Explain your Meta Paid Ads & Catalog sync services." },
                    { label: "🗺️ SEO Maps", query: "How do you rank businesses #1 on Google Maps in Oman?" },
                    { label: "📱 AppSheet", query: "Tell me about AppSheet ERP for inventory & VAT." },
                    { label: "💰 Pricing", query: "What are the consultation packages in OMR?" }
                  ].map((chip, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(chip.query)}
                      className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600 text-[10px] font-black text-blue-400 hover:text-white border border-blue-500/20 transition-all"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20' 
                          : 'bg-white/5 border border-white/5 text-slate-200 rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-[10px] text-cyan-400 font-mono font-bold animate-pulse bg-white/5 p-2 rounded-lg w-fit">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      ANALYZING REQUEST...
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 bg-slate-900/50 border-t border-white/5">
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                    className="flex gap-2"
                  >
                    <input 
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                    <button 
                      type="submit"
                      disabled={!inputMessage.trim() || isLoading}
                      className="p-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-all disabled:opacity-50 shadow-lg shadow-blue-900/40 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                  <div className="mt-2 flex items-center justify-between px-1">
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Mabella, Oman HQ</p>
                    <a href="https://wa.me/96896522902" target="_blank" className="text-[9px] text-emerald-400 font-black hover:underline">+968 96522902</a>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}

        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { playClickSound(); setIsOpen(true); }}
            className="pointer-events-auto flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-2xl shadow-blue-900/50 hover:shadow-blue-500/40 border border-white/20 transition-all group"
          >
            <div className="relative">
              <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-blue-600" />
            </div>
            <div className="text-left leading-tight hidden sm:block">
              <p className="text-xs font-black">AI HELP DESK</p>
              <p className="text-[9px] font-bold text-blue-200">24/7 SUPPORT</p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
