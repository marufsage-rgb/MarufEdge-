import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Gemini Setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, conversationHistory = [] } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemInstruction = `You are the official MarufEdge AI Executive Concierge & Help Desk Assistant, representing Habibur Rahman (Maruf) and MarufEdge ProMedia based in Mabella, Muscat, Sultanate of Oman (WhatsApp/Phone: +968 96522902, Email: habiburmaruf@gmail.com).

Key Information to use:
1. Core Value Proposition: "The Hybrid Advantage: Where Strategic Marketing Meets Digital Operations." We eliminate lead loss with AI marketing, Google Maps Local SEO 3-pack supremacy, AppSheet ERP & inventory barcode workflows, and guaranteed <60s WhatsApp response SLA.
2. Services Offered:
   - Google Maps SEO & Local Dominance (Rank #1 in Muscat, Seeb, Salalah, Sohar, GCC).
   - Meta Business Suite & Paid Ads Architecture (Facebook & Instagram Ads, Dynamic Product Catalog feeds, WhatsApp Click-to-Chat ads, Meta Pixel & Conversions API CAPI).
   - AppSheet No-Code Cloud ERP & Inventory with Oman VAT Invoicing.
   - WhatsApp CRM & Conversational Funnel with <60s response guarantee.
   - IT Systems, Government Gateway Integration (ROP, MOCIIP, Sanad services).
3. Contact Details:
   - Habibur Rahman (Maruf)
   - WhatsApp / Phone: +968 96522902
   - Office: Mabella, Muscat, Sultanate of Oman
   - Direct link: https://wa.me/96896522902

Style guidelines:
- Be professional, welcoming, precise, helpful, and executive-oriented.
- Provide bilingual responses in English and Arabic if requested or appropriate.
- Include actionable WhatsApp links or direct guidance when the user wants to start a project or get pricing.
- Keep answers concise, clear, and structured with bullet points.`;

      // Build contents array with history
      const formattedContents: any[] = [];
      for (const turn of conversationHistory.slice(-8)) {
        formattedContents.push({
          role: turn.role === 'user' ? 'user' : 'model',
          parts: [{ text: turn.text }]
        });
      }
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "Thank you for reaching out to MarufEdge ProMedia. How can we scale your digital presence today?";
      res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Chat API Error:", error);
      // Graceful fallback for visitors
      res.json({
        reply: "Welcome to MarufEdge ProMedia! Habibur Rahman (Maruf) is available for direct consultation regarding Google Maps SEO, Meta Business Suite Ads, and AppSheet ERP. You can connect immediately on WhatsApp at +968 96522902 (Mabella, Oman).",
        fallback: true
      });
    }
  });

  app.post("/api/generate-image", async (req, res) => {
    try {
      const { prompt, aspectRatio = "1:1" } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      // Using the model specified in instructions/metadata or standard lite-image
      const modelName = "gemini-3.1-flash-lite-image"; 
      
      const response = await ai.models.generateContent({
        model: modelName,
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
          },
        },
      });

      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (!imageUrl) {
        return res.status(500).json({ error: "Failed to generate image" });
      }

      res.json({ imageUrl });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
