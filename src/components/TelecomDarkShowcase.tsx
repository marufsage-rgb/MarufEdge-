import React, { useEffect, useRef } from 'react';
import { useLocale } from './LocaleContext';
import { useSound } from './AudioCursorProvider';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Globe, 
  CheckCircle2, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Radio, 
  MessageSquare,
  Network
} from 'lucide-react';
import { motion } from 'motion/react';

export const TelecomDarkShowcase = () => {
  const { country, t } = useLocale();
  const { playClickSound, playDataSound } = useSound();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High-performance animated Telecom Fiber & Dark IT Circuit Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimize for non-transparent canvas
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 650);
    let isVisible = true;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 650;
    };
    window.addEventListener('resize', handleResize);

    // Stop animation when out of view
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Circuit Nodes & Data Packets
    interface Packet {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      progress: number;
      color: string;
      size: number;
    }

    interface Node {
      x: number;
      y: number;
      radius: number;
      pulse: number;
      label: string;
    }

    const nodes: Node[] = [
      { x: width * 0.15, y: height * 0.25, radius: 4, pulse: 0, label: 'Muscat Gateway' },
      { x: width * 0.35, y: height * 0.65, radius: 5, pulse: 0, label: 'Mabella NOC' },
      { x: width * 0.60, y: height * 0.30, radius: 4, pulse: 0, label: 'GCC Cloud Core' },
      { x: width * 0.82, y: height * 0.70, radius: 6, pulse: 0, label: 'Lead Flow Edge' },
      { x: width * 0.50, y: height * 0.50, radius: 7, pulse: 0, label: 'MarufEdge Matrix' },
    ];

    const packets: Packet[] = [];
    const colors = ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b'];

    for (let i = 0; i < 18; i++) {
      const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
      const toNode = nodes[Math.floor(Math.random() * nodes.length)];
      packets.push({
        x: fromNode.x,
        y: fromNode.y,
        targetX: toNode.x,
        targetY: toNode.y,
        speed: 0.004 + Math.random() * 0.008,
        progress: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 2,
      });
    }

    const render = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid Lines (PCB IT Architecture)
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Circuit Traces between Nodes
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.25)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          // 90-degree PCB circuit trace look
          const midX = (nodes[i].x + nodes[j].x) / 2;
          ctx.lineTo(midX, nodes[i].y);
          ctx.lineTo(midX, nodes[j].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      // Draw Nodes & Text
      nodes.forEach((node) => {
        node.pulse += 0.03;
        const currentRadius = node.radius + Math.sin(node.pulse) * 1.5;

        // Glowing Aura
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, currentRadius * 3);
        grad.addColorStop(0, 'rgba(6, 182, 212, 0.6)');
        grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node Center
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
        ctx.font = '10px monospace';
        ctx.fillText(node.label, node.x + 10, node.y + 3);
      });

      // Update and Draw Data Packets
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          const fromNode = nodes[Math.floor(Math.random() * nodes.length)];
          const toNode = nodes[Math.floor(Math.random() * nodes.length)];
          p.x = fromNode.x;
          p.y = fromNode.y;
          p.targetX = toNode.x;
          p.targetY = toNode.y;
        }

        const curX = p.x + (p.targetX - p.x) * p.progress;
        const curY = p.y + (p.targetY - p.y) * p.progress;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(curX, curY, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    const startAnimation = () => {
      if (isVisible) {
        render();
      } else {
        animationFrameId = requestAnimationFrame(startAnimation);
      }
    };

    startAnimation();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="relative bg-slate-950 text-white overflow-hidden border-t border-slate-800 py-24">
      {/* Background Animated Telecom Canvas */}
      <div className="absolute inset-0 z-0 opacity-40">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Cyber Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/40 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Slide 15 Executive Synthesis • Telecom Grade Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Let&apos;s Scale Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">Business Together</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Stop losing qualified customer leads to slow, fragmented, or outdated systems. Connect with MarufEdge today for immediate digital transformation.
          </p>
        </div>

        {/* Slide 15 Hero Showcase Box */}
        <div className="bg-gradient-to-br from-slate-900/90 via-slate-950/95 to-blue-950/80 border-2 border-slate-800 hover:border-cyan-500/50 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Executive Profile & Emblem */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-4">
                {/* Vibrant ME Gradient Emblem */}
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-orange-500 p-1 shadow-2xl shadow-blue-500/30 flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-orange-400">
                      ME
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white">Habibur Rahman (Maruf)</h3>
                  <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                    Founder &amp; Principal Digital Architect
                  </p>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>Mabella, Muscat, Sultanate of Oman</span>
                  </span>
                </div>
              </div>

              {/* Tagline Card */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
                <p className="text-xs font-semibold text-slate-200 italic leading-relaxed">
                  &ldquo;MarufEdge ProMedia: Where Strategic Marketing Meets Digital Operations.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] text-emerald-400 font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Guaranteed &lt;60s WhatsApp SLA Lead Engine Active</span>
                </div>
              </div>

              {/* Direct Telecommunication Links */}
              <div className="space-y-2.5 pt-2">
                <a
                  href="https://wa.me/96896522902?text=Hello%20Maruf,%20I%20want%20to%20scale%20my%20business%20with%20MarufEdge%20ProMedia."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playDataSound()}
                  className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm transition-all flex items-center justify-between shadow-xl shadow-emerald-950/50 group active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-white" />
                    <div className="text-left">
                      <span className="block text-[10px] uppercase tracking-wider opacity-80 leading-none">Instant WhatsApp</span>
                      <span className="text-sm font-mono font-bold">+968 96522902</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="tel:+96896522902"
                  onClick={() => playClickSound()}
                  className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span>Direct Voice Call (Oman)</span>
                  </div>
                  <span className="font-mono text-cyan-400 text-xs">+968 96522902</span>
                </a>
              </div>
            </div>

            {/* Right The 4 Pillar Capabilities */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Globe className="w-5 h-5 text-blue-400" />,
                  title: "Google Maps Local 3-Pack",
                  desc: "Local SEO architecture targeting high-intent Muscat searches for #1 map dominance.",
                },
                {
                  icon: <Cpu className="w-5 h-5 text-cyan-400" />,
                  title: "AppSheet Cloud ERP & Invoicing",
                  desc: "Custom inventory barcode scanners, multi-branch stock, and Oman VAT compliance.",
                },
                {
                  icon: <Zap className="w-5 h-5 text-yellow-400" />,
                  title: "Meta Paid Ads & DPA Catalog",
                  desc: "Advantage+ catalog ads with automated feeds and server-side Conversions API (CAPI).",
                },
                {
                  icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
                  title: "Government Portal & IT Systems",
                  desc: "Enterprise IT workflows harmonized with ROP, MOCIIP, and Sanad integration frameworks.",
                },
              ].map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="p-2.5 rounded-xl bg-slate-900 w-fit mb-3 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                      {pillar.icon}
                    </div>
                    <h4 className="text-sm font-black text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-900 flex items-center gap-1.5 text-[10px] text-cyan-400 font-mono font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Operational Ready</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
