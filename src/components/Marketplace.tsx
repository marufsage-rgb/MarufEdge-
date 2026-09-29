import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Star, ArrowRight, Tag, Heart, Info, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
  rating: number;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Traditional Omani Silver Khanjar',
    price: '150.00 OMR',
    category: 'Heritage',
    image: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=400',
    description: 'A masterpiece of Omani craftsmanship, featuring intricate silver filigree and high-quality craftsmanship from Nizwa.',
    rating: 5
  },
  {
    id: '2',
    name: 'Royal Green Hojari Frankincense',
    price: '25.00 OMR',
    category: 'Aromatic',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400',
    description: 'The world’s finest frankincense from Dhofar. Rare green grade with a therapeutic citrus-pine aroma.',
    rating: 4.8
  },
  {
    id: '3',
    name: 'Handcrafted Nizwa Pottery',
    price: '12.00 OMR',
    category: 'Artisan',
    image: 'https://images.unsplash.com/photo-1565193298428-f68262f2771c?auto=format&fit=crop&q=80&w=400',
    description: 'Traditional pottery from the Bahla region, perfect for interior decor or storage.',
    rating: 4.5
  },
  {
    id: '4',
    name: 'Omani Date Honey - Premium',
    price: '8.50 OMR',
    category: 'Gourmet',
    image: 'https://images.unsplash.com/photo-1587049633562-ad3602a4756a?auto=format&fit=crop&q=80&w=400',
    description: 'Rich, natural date syrup made from high-quality Khalas dates grown in the Al Dakhiliyah region.',
    rating: 4.9
  }
];

export const Marketplace = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <section id="marketplace" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-12 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border border-emerald-100">
              <ShoppingBag className="w-4 h-4" />
              <span>Premium Omani Shop</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
              Authentic <span className="text-emerald-600">Unique</span> <br />
              Oman Marketplace
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed font-medium">
              Discover unique artisan items and professional enterprise products sourced directly from regional craftsmen across Oman.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-[2rem] font-black hover:bg-gray-800 transition-all shadow-2xl active:scale-95">
              Shop All
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gray-50 rounded-[3.5rem] border border-gray-100 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all group p-4"
            >
              <div className="aspect-[1/1.2] relative overflow-hidden rounded-[3rem] bg-gray-200">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-white text-[10px] font-bold uppercase tracking-widest text-gray-900 rounded-2xl shadow-xl">
                    {product.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="w-full py-4 bg-white text-gray-900 rounded-[1.5rem] font-black flex items-center justify-center gap-3 shadow-2xl active:scale-95"
                  >
                    <Info className="w-5 h-5" /> View Details
                  </button>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-1.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight h-14 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-2xl font-black text-emerald-600 tracking-tighter">{product.price}</span>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Heart className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 z-20 p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-1/2 aspect-square md:aspect-auto bg-gray-100">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-1/2 p-8 lg:p-12 flex flex-col">
                <div className="mb-8">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4 inline-block">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{selectedProduct.name}</h3>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-400">48 Global Reviews</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {selectedProduct.description}
                  </p>
                </div>

                <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Local Price</p>
                    <span className="text-3xl font-black text-gray-900">{selectedProduct.price}</span>
                  </div>
                  <button className="flex-1 px-8 py-5 bg-emerald-600 text-white rounded-2xl font-extrabold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95">
                    Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
