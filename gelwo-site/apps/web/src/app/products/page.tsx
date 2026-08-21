'use client';

/**
 * /products — GELWO Official Products & Hardware Catalogue
 * Styled with GELWO Poster Color System & synced with Supabase Admin Store.
 */

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AIAssistantWidget } from '@/components/AIAssistantWidget';
import { GlobalModals } from '@/components/GlobalModals';
import { fetchPublicProducts, ProductItem } from '@/lib/supabase';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiArrowRight, FiSearch, FiCheck, FiCpu, FiTag, FiBox } from 'react-icons/fi';

export default function ProductsPage() {
  const { addToCart, triggerQuotationModal } = useApp();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const data = await fetchPublicProducts();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));

  const filtered = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !activeCategory || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <main className="min-h-screen bg-gelwo-ivory dark:bg-gelwo-midnight text-gelwo-midnight dark:text-gelwo-ivory relative selection:bg-gelwo-purple selection:text-gelwo-ivory transition-colors duration-300">
      <Header />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="pt-36 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.3em] font-mono text-gelwo-purple bg-gelwo-blush dark:bg-gelwo-royal px-4 py-1.5 rounded-full border border-gelwo-purple/30 mb-6 font-bold"
          >
            <FiBox className="text-gelwo-purple" />
            <span>Hardware, Technology &amp; Supply Store</span>
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight uppercase leading-none"
          >
            PRODUCT <span className="text-gradient-purple dark:text-gradient-light">CATALOGUE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-sm sm:text-lg text-gelwo-midnight/70 dark:text-gelwo-gray max-w-3xl mx-auto leading-relaxed"
          >
            Official institutional supplies, Tier-1 solar hardware, AI biometric security systems, and enterprise software licenses.
          </motion.p>

          {/* Search + Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gelwo-purple" />
              <input
                type="text"
                placeholder="Search products & hardware..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-6 py-3.5 bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 rounded-2xl text-xs w-72 focus:outline-none focus:border-gelwo-purple transition-colors"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === null
                    ? 'bg-gelwo-purple text-gelwo-ivory shadow'
                    : 'bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 text-gelwo-midnight/70 dark:text-gelwo-gray hover:border-gelwo-purple'
                }`}
              >
                All Products ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeCategory === cat
                      ? 'bg-gelwo-purple text-gelwo-ivory shadow'
                      : 'bg-gelwo-blush dark:bg-gelwo-royal border border-gelwo-gray dark:border-gelwo-purple/20 text-gelwo-midnight/70 dark:text-gelwo-gray hover:border-gelwo-purple'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Product Grid ──────────────────────────────────────────────────── */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-gelwo-blush dark:bg-gelwo-royal animate-pulse h-96" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-3xl border border-gelwo-gray dark:border-gelwo-purple/20 overflow-hidden flex flex-col justify-between group hover:border-gelwo-purple transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                {/* Product Image */}
                <div className="relative h-56 bg-gelwo-midnight overflow-hidden">
                  <img
                    src={product.mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.featured && (
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-gelwo-purple text-gelwo-ivory text-[10px] font-mono font-bold uppercase rounded-full shadow">
                      Featured
                    </span>
                  )}
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-gelwo-midnight/80 backdrop-blur-sm text-gelwo-ivory text-[10px] font-mono rounded-lg border border-gelwo-purple/30">
                    {product.category}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-base font-heading group-hover:text-gelwo-purple transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gelwo-midnight/70 dark:text-gelwo-gray line-clamp-3 mt-1.5 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gelwo-gray/60 dark:border-gelwo-royal">
                    <div className="flex justify-between items-baseline mb-3">
                      <span className="text-[10px] text-gelwo-midnight/50 dark:text-gelwo-gray uppercase font-mono">
                        Official Price
                      </span>
                      <span className="text-base font-extrabold font-mono text-gelwo-purple">
                        KES {product.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          addToCart({
                            id: `cart_${product.id}_${Date.now()}`,
                            service: product.name,
                            details: product.category,
                            estimatedCost: `KES ${product.price.toLocaleString()}`,
                          });
                          alert(`Added "${product.name}" to Quotation Basket!`);
                        }}
                        className="py-2.5 px-3 rounded-xl btn-secondary text-xs font-bold font-mono text-center flex items-center justify-center space-x-1"
                      >
                        <FiShoppingBag />
                        <span>Add Quote</span>
                      </button>

                      <button
                        onClick={() => triggerQuotationModal(product.name)}
                        className="py-2.5 px-3 rounded-xl btn-primary text-xs font-bold font-mono text-center flex items-center justify-center space-x-1"
                      >
                        <span>Buy / Tender</span>
                        <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-20 text-center text-gelwo-midnight/60 dark:text-gelwo-gray">
            <p className="text-lg">No products found matching your search.</p>
          </div>
        )}
      </section>

      <Footer />
      <AIAssistantWidget />
      <GlobalModals />
    </main>
  );
}
