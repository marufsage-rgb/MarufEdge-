import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Wand2, Download, Loader2, Sparkles } from 'lucide-react';
import { useAuthState } from './AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const ImageGenerator = () => {
  const { user } = useAuthState();
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || !user) return;
    
    setGenerating(true);
    setError(null);
    setResultImage(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setResultImage(data.imageUrl);

      // Save to Firestore
      await addDoc(collection(db, 'generated_images'), {
        userId: user.uid,
        prompt,
        imageUrl: data.imageUrl,
        createdAt: serverTimestamp(),
      });
    } catch (err: any) {
      console.warn('Image generation status:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section id="ai-studio" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>AI Creative Studio</span>
              </div>
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Visualize Your <span className="text-indigo-600">Educational</span> Ideas
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Use our Gemini-powered AI engine to generate professional visuals for your research, presentations, or marketing needs in Oman.
              </p>

              {!user && (
                <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-amber-800 text-sm">
                  Please sign in to use the AI Creative Studio.
                </div>
              )}

              <div className="relative group">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={!user || generating}
                  placeholder="Describe the image you want to create (e.g., A futuristic university campus in Muscat with traditional Omani architecture...)"
                  className="w-full h-40 p-6 bg-white border-2 border-gray-100 rounded-3xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all resize-none shadow-sm disabled:opacity-50"
                />
                <button
                  onClick={handleGenerate}
                  disabled={!user || generating || !prompt.trim()}
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 active:scale-95"
                >
                  {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                  Generate
                </button>
              </div>

              {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="aspect-square bg-white rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative group">
              <AnimatePresence mode="wait">
                {resultImage ? (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full h-full p-4"
                  >
                    <img
                      src={resultImage}
                      alt="AI Generated"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute top-8 right-8 flex gap-2">
                      <a
                        href={resultImage}
                        download="generated-image.png"
                        className="p-3 bg-white/90 backdrop-blur shadow-xl rounded-full text-gray-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center p-12"
                  >
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ImageIcon className="w-10 h-10 text-gray-300" />
                    </div>
                    <p className="text-gray-400 font-medium">Your masterpiece will appear here</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {generating && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center">
                  <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
                  <p className="text-indigo-900 font-bold animate-pulse">Dreaming up your image...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
