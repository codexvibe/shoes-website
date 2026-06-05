"use client";

import React, { useRef, useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { Activity, Footprints, Flame, ChevronRight, ArrowRight } from "lucide-react";

export const CategoryGrid: React.FC = () => {
  const { categories, language } = useStore();
  const isAr = language === "ar";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Pre-mapped details for aesthetics (icons & cover images)
  const categoryMeta: Record<string, { image: string; icon: React.ReactNode; gradient: string; accent: string; accentRgb: string }> = {
    "running-performance": {
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800",
      icon: <Activity size={20} />,
      gradient: "from-lime-500/20 via-emerald-500/10 to-transparent",
      accent: "text-neon-lime",
      accentRgb: "132, 204, 22",
    },
    "daily-walking-comfort": {
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
      icon: <Footprints size={20} />,
      gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
      accent: "text-neon-orange",
      accentRgb: "234, 88, 12",
    },
    "streetwear-lifestyle": {
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
      icon: <Flame size={20} />,
      gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
      accent: "text-cyan-400",
      accentRgb: "34, 211, 238",
    },
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

  // Mobile scroll spy
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.offsetWidth * 0.78;
      const idx = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(idx, categories.length - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [categories.length]);

  const getMeta = (slug: string) =>
    categoryMeta[slug] || {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
      icon: <Activity size={20} />,
      gradient: "from-neon-lime/20 via-emerald-500/10 to-transparent",
      accent: "text-neon-lime",
      accentRgb: "132, 204, 22",
    };

  return (
    <section id="categories" className="py-20 sm:py-28 bg-[#060608] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-neon-lime/[0.02] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-neon-lime/[0.07] border border-neon-lime/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime animate-pulse"></span>
            <span className={`text-[10px] font-black text-neon-lime tracking-widest ${isAr ? "font-cairo" : "font-outfit uppercase"}`}>
              {isAr ? "الفئات الرياضية" : "EXPLORE CATEGORIES"}
            </span>
          </div>
          <h3 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight ${isAr ? "font-cairo" : "font-outfit uppercase"}`}>
            {isAr ? "اختر أسلوب حركتك" : "CHOOSE YOUR VIBE"}
          </h3>
          <p className={`mt-4 text-sm sm:text-base text-neutral-500 max-w-lg mx-auto ${isAr ? "font-cairo" : "font-outfit"}`}>
            {isAr ? "اكتشف المجموعة المناسبة لنمط حياتك" : "Découvrez la collection qui correspond à votre style de vie"}
          </p>
        </div>

        {/* ======== DESKTOP: Bento Grid Layout ======== */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 auto-rows-[220px] lg:auto-rows-[240px]">
          {categories.map((category, i) => {
            const meta = getMeta(category.slug);
            // Bento layout: first item spans full left column, others stack right
            const spanClass =
              i === 0
                ? "lg:col-span-7 md:col-span-1 row-span-2"
                : "lg:col-span-5 md:col-span-1 row-span-1";

            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.slug)}
                className={`group relative rounded-2xl lg:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${spanClass}`}
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={category.image || meta.image}
                    alt={category.nameFr}
                    className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110 brightness-[0.35] group-hover:brightness-[0.45]"
                  />
                </div>

                {/* Gradient overlays */}
                <div className={`absolute inset-0 z-[1] bg-gradient-to-br ${meta.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Animated border glow on hover */}
                <div
                  className="absolute inset-0 z-[2] rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 0 1.5px rgba(${meta.accentRgb}, 0.4), 0 0 30px -10px rgba(${meta.accentRgb}, 0.15)`,
                  }}
                ></div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-6 lg:p-8 flex flex-col justify-between">
                  {/* Top: icon badge */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.06] border border-white/[0.08] backdrop-blur-lg transition-all duration-300 group-hover:bg-white/[0.1] group-hover:border-white/[0.15] ${meta.accent}`}
                    >
                      {meta.icon}
                      <span className={`text-[10px] font-black tracking-wider ${isAr ? "font-cairo" : "font-outfit uppercase"}`}>
                        {isAr ? category.nameAr : category.nameFr}
                      </span>
                    </div>
                  </div>

                  {/* Bottom: title + CTA */}
                  <div>
                    <h4 className={`font-black text-white tracking-wide mb-2 transition-all duration-300 ${i === 0 ? "text-2xl lg:text-4xl" : "text-xl lg:text-2xl"} ${isAr ? "font-cairo text-right" : "font-outfit uppercase"}`}>
                      {isAr ? category.nameAr : category.nameFr}
                    </h4>
                    <p className={`text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2 group-hover:text-neutral-300 transition-colors duration-300 ${i === 0 ? "max-w-md" : "max-w-xs"} ${isAr ? "font-cairo text-right" : "font-outfit"}`}>
                      {isAr ? category.descAr : category.descFr}
                    </p>

                    {/* CTA arrow */}
                    <div className="mt-4 flex items-center gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <span className={`text-xs font-bold ${meta.accent} ${isAr ? "font-cairo" : "font-outfit uppercase tracking-widest"}`}>
                        {isAr ? "استكشف الفئة" : "EXPLORER"}
                      </span>
                      <ArrowRight size={14} className={`${meta.accent} transition-transform duration-300 group-hover:translate-x-1`} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======== MOBILE: Horizontal Scroll Carousel ======== */}
        <div className="md:hidden">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, i) => {
              const meta = getMeta(category.slug);
              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.slug)}
                  className="group relative flex-shrink-0 w-[78vw] h-[380px] rounded-2xl overflow-hidden cursor-pointer snap-center"
                  style={{
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={category.image || meta.image}
                      alt={category.nameFr}
                      className="w-full h-full object-cover brightness-[0.35]"
                    />
                  </div>

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  <div
                    className="absolute inset-0 z-[2] rounded-2xl pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 0 1px rgba(${meta.accentRgb}, 0.2)`,
                    }}
                  ></div>

                  {/* Content */}
                  <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between">
                    {/* Top: icon */}
                    <div
                      className={`self-start flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.07] border border-white/[0.1] backdrop-blur-lg ${meta.accent}`}
                    >
                      {meta.icon}
                    </div>

                    {/* Bottom: title + description */}
                    <div>
                      <h4 className={`text-2xl font-black text-white tracking-wide mb-2 ${isAr ? "font-cairo text-right" : "font-outfit uppercase"}`}>
                        {isAr ? category.nameAr : category.nameFr}
                      </h4>
                      <p className={`text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-4 ${isAr ? "font-cairo text-right" : "font-outfit"}`}>
                        {isAr ? category.descAr : category.descFr}
                      </p>

                      {/* CTA Button */}
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${meta.accent}`}
                        style={{
                          background: `rgba(${meta.accentRgb}, 0.08)`,
                          border: `1px solid rgba(${meta.accentRgb}, 0.2)`,
                        }}
                      >
                        <span className={isAr ? "font-cairo" : "font-outfit uppercase tracking-widest"}>
                          {isAr ? "استكشف" : "EXPLORER"}
                        </span>
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dot indicators for mobile */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {categories.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 h-1.5 bg-neon-lime"
                    : "w-1.5 h-1.5 bg-neutral-700"
                }`}
              ></div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
