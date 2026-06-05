"use client";

import React from "react";
import { useStore } from "../context/StoreContext";
import { Activity, Footprints, Flame } from "lucide-react";

export const CategoryGrid: React.FC = () => {
  const { categories, language } = useStore();
  const isAr = language === "ar";

  // Pre-mapped details for aesthetics (icons & cover images)
  const categoryMeta: Record<string, { image: string; icon: React.ReactNode; color: string }> = {
    "running-performance": {
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600",
      icon: <Activity className="text-neon-lime" size={24} />,
      color: "border-neon-lime/40 text-neon-lime"
    },
    "daily-walking-comfort": {
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600",
      icon: <Footprints className="text-neon-orange" size={24} />,
      color: "border-neon-orange/40 text-neon-orange"
    },
    "streetwear-lifestyle": {
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600",
      icon: <Flame className="text-cyan-400" size={24} />,
      color: "border-cyan-400/40 text-cyan-400"
    }
  };

  const handleCategoryClick = (slug: string) => {
    // Dispatch custom event to trigger filter selection in SneakerGallery
    const event = new CustomEvent("filter-category", { detail: slug });
    window.dispatchEvent(event);

    const target = document.getElementById("collection");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="py-20 bg-[#060608] relative">
      {/* Background divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-xs font-black uppercase tracking-widest text-neon-lime mb-3 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr ? "الفئات الرياضية" : "EXPLORE CATEGORIES"}
          </h2>
          <h3 className={`text-3xl sm:text-5xl font-extrabold text-white tracking-tight ${isAr ? 'font-cairo' : 'font-outfit uppercase'}`}>
            {isAr ? "اختر أسلوب حركتك" : "CHOOSE YOUR VIBE"}
          </h3>
          <div className="w-16 h-1 bg-neon-lime mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const meta = categoryMeta[category.slug] || {
              image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
              icon: <Activity className="text-neon-lime" size={24} />,
              color: "border-neon-lime/40 text-neon-lime"
            };

            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className="group relative h-96 rounded-2xl overflow-hidden glass-card cursor-pointer border border-neutral-800/70 hover:border-neutral-700/80 transition-all duration-500"
              >
                {/* Background Image Container with Ken Burns effect */}
                <div className="absolute inset-0 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.image || meta.image}
                    alt={category.nameFr}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-40 group-hover:brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between items-start rtl:items-end h-full">
                  
                  {/* Icon badge top left */}
                  <div className={`p-3 rounded-xl bg-obsidian/80 border backdrop-blur-md transition-all duration-300 group-hover:scale-110 ${meta.color.split(' ')[0]}`}>
                    {meta.icon}
                  </div>

                  {/* Title & Desc bottom */}
                  <div className="w-full">
                    <h4 className={`text-2xl font-black text-white tracking-wide mb-2.5 transition-colors duration-300 group-hover:text-neon-lime ${isAr ? 'font-cairo text-right' : 'font-outfit uppercase'}`}>
                      {isAr ? category.nameAr : category.nameFr}
                    </h4>
                    <p className={`text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-200 transition-colors duration-300 line-clamp-2 ${isAr ? 'font-cairo text-right' : 'font-outfit'}`}>
                      {isAr ? category.descAr : category.descFr}
                    </p>
                    
                    {/* Action Link indicator */}
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-neon-lime opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className={isAr ? 'font-cairo' : 'font-outfit uppercase tracking-widest'}>
                        {isAr ? "استكشف الفئة" : "EXPLORE COLLECTION"}
                      </span>
                      <span>&rarr;</span>
                    </div>
                  </div>

                </div>

                {/* Left side thin highlight border */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-transparent group-hover:bg-neon-lime transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
