"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { Sneaker } from "../data/mockData";
import { ContactModal } from "./ContactModal";
import { ShoppingCart, Heart, ShieldAlert, Sparkles, Filter } from "lucide-react";

export const SneakerGallery: React.FC = () => {
  const { sneakers, categories, language } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeContactShoe, setActiveContactShoe] = useState<Sneaker | null>(null);
  const [activeContactSize, setActiveContactSize] = useState<number | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({});

  const isAr = language === "ar";

  // Listen to filter category events dispatched from CategoryGrid
  useEffect(() => {
    const handleCategoryFilter = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setSelectedCategory(customEvent.detail);
      }
    };

    window.addEventListener("filter-category", handleCategoryFilter);
    return () => {
      window.removeEventListener("filter-category", handleCategoryFilter);
    };
  }, []);

  const handleSizeSelect = (shoeId: string, size: number) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [shoeId]: size,
    }));
  };

  const toggleFavorite = (shoeId: string) => {
    setFavorites((prev) =>
      prev.includes(shoeId) ? prev.filter((id) => id !== shoeId) : [...prev, shoeId]
    );
  };

  const handleOrderClick = (sneaker: Sneaker) => {
    const chosenSize = selectedSizes[sneaker.id] || null;
    setActiveContactShoe(sneaker);
    setActiveContactSize(chosenSize);
  };

  // Filter products by active category
  const filteredSneakers = selectedCategory === "all"
    ? sneakers
    : sneakers.filter((s) => s.categorySlug === selectedCategory);

  // Sort: Hot Drop > New Arrival > Featured > Normal
  const sortedSneakers = [...filteredSneakers].sort((a, b) => {
    const aHot = a.isHotDrop ? 1 : 0;
    const bHot = b.isHotDrop ? 1 : 0;
    if (bHot !== aHot) return bHot - aHot;

    const aNew = a.isNewArrival ? 1 : 0;
    const bNew = b.isNewArrival ? 1 : 0;
    if (bNew !== aNew) return bNew - aNew;

    const aFeat = a.featured ? 1 : 0;
    const bFeat = b.featured ? 1 : 0;
    return bFeat - aFeat;
  });

  return (
    <section id="collection" className="py-24 bg-obsidian relative">
      {/* Visual background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10 pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="rtl:text-right">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-neon-lime/10 px-3 py-1 text-xs font-bold text-neon-lime mb-3">
              <Sparkles size={12} />
              <span className={isAr ? 'font-cairo' : 'font-outfit uppercase tracking-widest'}>
                {isAr ? "معرض المنتجات" : "OUR SHOWCASE"}
              </span>
            </div>
            <h2 className={`text-3xl sm:text-5xl font-black text-white ${isAr ? 'font-cairo' : 'font-outfit uppercase'}`}>
              {isAr ? "كتالوج السنيكرز الممتاز" : "THE GRAIL COLLECTION"}
            </h2>
          </div>

          {/* Inline filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all border flex-shrink-0 cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-neon-lime text-obsidian border-neon-lime neon-glow-lime font-black"
                  : "bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white"
              } ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wider'}`}
            >
              {isAr ? "الكل" : "Tous"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all border flex-shrink-0 cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-neon-lime text-obsidian border-neon-lime neon-glow-lime font-black"
                    : "bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white"
                } ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wider'}`}
              >
                {isAr ? cat.nameAr : cat.nameFr}
              </button>
            ))}
          </div>
        </div>

        {/* Sneaker Grid Matrix */}
        {sortedSneakers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedSneakers.map((shoe) => {
              const hasSelectedSize = selectedSizes[shoe.id] !== undefined;
              const activeSize = selectedSizes[shoe.id];
              const isFav = favorites.includes(shoe.id);

              return (
                <div
                  key={shoe.id}
                  className="group relative flex flex-col justify-between rounded-3xl border border-neutral-800/70 bg-asphalt/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-neutral-700/80 hover:shadow-[0_15px_30px_-15px_rgba(0,0,0,0.8)]"
                >
                  
                  {/* Card Badge Top */}
                  <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 font-outfit">
                    {shoe.isHotDrop && (
                      <span className="rounded bg-neon-orange px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-md">
                        {isAr ? "دوب حار" : "HOT DROP"}
                      </span>
                    )}
                    {shoe.isNewArrival && (
                      <span className="rounded bg-cyan-500 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-white shadow-md">
                        {isAr ? "وصل حديثاً" : "NEW ARRIVAL"}
                      </span>
                    )}
                    {shoe.featured && !shoe.isHotDrop && !shoe.isNewArrival && (
                      <span className="rounded bg-yellow-500 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-black shadow-md">
                        {isAr ? "مميز" : "FEATURED"}
                      </span>
                    )}
                  </div>

                  {/* Favorite Toggle Button */}
                  <button
                    onClick={() => toggleFavorite(shoe.id)}
                    className="absolute top-4 right-4 z-20 p-2.5 rounded-xl bg-obsidian/80 border border-neutral-850 backdrop-blur-md text-neutral-400 hover:text-red-500 transition-all duration-200"
                  >
                    <Heart size={16} className={isFav ? "fill-red-500 text-red-500" : ""} />
                  </button>

                  {/* High-res Image Showcase */}
                  <div className="relative aspect-square w-full bg-neutral-950 overflow-hidden flex items-center justify-center group-hover:bg-[#16161c] transition-colors duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 to-transparent pointer-events-none"></div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={shoe.image}
                      alt={isAr ? shoe.nameAr : shoe.nameFr}
                      className="object-cover w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Detailed Description Panel */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    
                    {/* Title, Category & Price Row */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] uppercase font-bold text-neon-lime tracking-widest font-outfit">
                          {shoe.categorySlug.replace("-", " ")}
                        </span>
                        <span className="text-neon-orange font-black text-sm font-outfit">
                          {isAr ? `${shoe.price.toLocaleString("en-US")} د.ج` : `${shoe.price.toLocaleString("en-US")} DA`}
                        </span>
                      </div>
                      
                      <h3 className={`text-xl font-bold text-white mt-1.5 ${isAr ? 'font-cairo text-right' : 'font-outfit'}`}>
                        {isAr ? shoe.nameAr : shoe.nameFr}
                      </h3>
                      
                      <p className={`text-xs text-neutral-400 mt-2 line-clamp-2 ${isAr ? 'font-cairo text-right' : 'font-outfit'}`}>
                        {isAr ? shoe.descAr : shoe.descFr}
                      </p>
                    </div>

                    {/* Sizes Selection Bubbles */}
                    <div className="mt-5">
                      <span className={`block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 ${isAr ? 'font-cairo text-right' : 'font-outfit'}`}>
                        {isAr ? "المقاسات المتوفرة (اختر مقاساً):" : "Available Sizes (Select):"}
                      </span>
                      <div className="flex flex-wrap gap-1.5 justify-start rtl:justify-end">
                        {shoe.sizes.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => handleSizeSelect(shoe.id, sz)}
                            className={`w-9 h-9 rounded-lg text-xs font-bold transition-all border flex items-center justify-center cursor-pointer ${
                              activeSize === sz
                                ? "bg-neon-lime text-obsidian border-neon-lime font-black"
                                : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white"
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Order Action Button CTA */}
                    <div className="mt-6 pt-5 border-t border-neutral-900">
                      <button
                        onClick={() => handleOrderClick(shoe)}
                        className={`flex items-center justify-center gap-2.5 w-full rounded-xl bg-neutral-900 border border-neutral-800/80 hover:border-neon-lime/40 text-white hover:text-neon-lime py-3.5 text-xs font-bold transition-all duration-300 hover:bg-neon-lime/5 cursor-pointer ${
                          hasSelectedSize ? "border-neon-lime/25 bg-neon-lime/[0.02]" : ""
                        } ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-widest'}`}
                      >
                        <ShoppingCart size={14} />
                        <span>{isAr ? "اطلب الآن بالتواصل" : "Contact Owner to Order"}</span>
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center rounded-3xl border border-neutral-800/60 bg-neutral-900/10 p-8">
            <ShieldAlert size={48} className="text-neon-orange mb-4" />
            <h4 className={`text-xl font-bold text-white ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr ? "لا توجد منتجات متوفرة" : "No Sneakers Available"}
            </h4>
            <p className={`text-sm text-neutral-500 mt-2 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr 
                ? "لم يتم العثور على أي أحذية رياضية في هذه الفئة حالياً." 
                : "No items match your active filters. Try another category."}
            </p>
          </div>
        )}

      </div>

      {/* Render Contact Overlay Modal if Active */}
      {activeContactShoe && (
        <ContactModal
          sneaker={activeContactShoe}
          selectedSize={activeContactSize}
          onClose={() => {
            setActiveContactShoe(null);
            setActiveContactSize(null);
          }}
        />
      )}
    </section>
  );
};
