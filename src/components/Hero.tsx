"use client";

import React from "react";
import { useStore } from "../context/StoreContext";
import { ArrowRight, ArrowLeft, Flame, Sparkles } from "lucide-react";
import Image from "next/image";

export const Hero: React.FC = () => {
  const { language, heroBanner } = useStore();
  const isAr = language === "ar";

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.getElementById("collection");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center justify-center bg-obsidian py-12 md:py-20">
      {/* Custom Hero Banner Background Overlay */}
      {heroBanner && (
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroBanner}
            alt="Custom Showcase Banner"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian"></div>
        </div>
      )}

      {/* Background Neon Glowing Orbs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 md:w-96 md:h-96 rounded-full bg-neon-lime/10 blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/10 w-72 h-72 md:w-96 md:h-96 rounded-full bg-neon-orange/15 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left lg:rtl:text-right">
            
            {/* Tagline */}
            <div className={`inline-flex items-center gap-2 self-center lg:self-start rounded-full border border-neutral-800 bg-neutral-900/60 px-4 py-1.5 text-xs text-neutral-400 mb-6 ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wider'}`}>
              <Flame size={14} className="text-neon-lime animate-bounce" />
              <span>{isAr ? "ثقافة السنيكرز الممتازة" : "PREMIUM SNEAKER CULTURE"}</span>
              <span className="h-1 w-1 rounded-full bg-neutral-600"></span>
              <Sparkles size={14} className="text-neon-orange" />
              <span>{isAr ? "مجموعة 2026" : "NEW SEASON 2026"}</span>
            </div>

            {/* Bold Heading */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
              {isAr ? (
                <span className="font-cairo block leading-snug">
                  حَرّكْ <span className="text-neon-lime font-black underline decoration-neon-lime/30 underline-offset-8">حُدُودَكْ</span>
                  <span className="block text-2xl sm:text-4xl mt-3 text-neutral-400 font-medium">خطوة واحدة نحو القمة</span>
                </span>
              ) : (
                <span className="font-outfit uppercase block font-black">
                  MOVE WITHOUT <br />
                  <span className="text-neon-lime text-glow-lime">LIMITS</span>
                </span>
              )}
            </h1>

            {/* Description */}
            <p className={`text-base sm:text-lg text-neutral-400 max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr 
                ? "اكتشف تشكيلة حصرية من الأحذية الرياضية الفاخرة المصممة خصيصًا للأداء العالي والمظهر العصري. اطلب مقاسك الآن بالتواصل المباشر."
                : "Explore our curated catalog of elite sneakers engineered for high performance and streetwear dominance. Direct orders with the owner."
              }
            </p>

            {/* CTA Button */}
            <button
              onClick={handleScroll}
              className={`group self-center lg:self-start flex items-center gap-3 rounded-full bg-neon-lime hover:bg-white text-obsidian px-8 py-4 font-black transition-all duration-300 transform hover:scale-105 neon-glow-lime hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] cursor-pointer ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wider'}`}
            >
              <span>{isAr ? "تسوق المجموعة" : "Shop Collection"}</span>
              {isAr ? (
                <ArrowLeft size={18} className="group-hover:-translate-x-1.5 transition-transform duration-300" />
              ) : (
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              )}
            </button>
          </div>

          {/* Product Showcasing Graphic (Right) */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            {/* Visual Ring Backdrop */}
            <div className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full border border-neutral-800/40 flex items-center justify-center animate-[spin_20s_linear_infinite]">
              <div className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] rounded-full border border-dashed border-neutral-800/80"></div>
              <div className="absolute w-4 h-4 rounded-full bg-neon-lime top-0"></div>
              <div className="absolute w-4 h-4 rounded-full bg-neon-orange bottom-0"></div>
            </div>

            {/* Glowing Accent Hexagon Background */}
            <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-tr from-neon-lime/20 to-neon-orange/20 rounded-[40px] rotate-12 blur-2xl opacity-60"></div>

            {/* Hero Shoes Image */}
            <div className="relative z-10 w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] transition-all duration-500 hover:rotate-3 hover:scale-105 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=700"
                alt="Featured Sneakers"
                className="object-contain max-w-full max-h-full drop-shadow-[0_25px_35px_rgba(132,204,22,0.35)] select-none pointer-events-none"
              />

              {/* Float Floating Badges */}
              <div className="absolute top-1/4 -left-6 bg-neutral-900/90 border border-neutral-800 backdrop-blur-md rounded-xl p-3.5 shadow-2xl flex items-center gap-3 animate-bounce">
                <div className="w-8 h-8 rounded-lg bg-neon-lime/20 flex items-center justify-center text-neon-lime font-bold">
                  9.8
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-outfit">Rating</div>
                  <div className={`text-xs font-bold text-white ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                    {isAr ? "خفيف ومريح" : "Ultra Light weight"}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-1/4 -right-6 bg-neutral-900/90 border border-neutral-800 backdrop-blur-md rounded-xl p-3.5 shadow-2xl flex items-center gap-3 animate-[pulse_3s_infinite]">
                <div className="w-8 h-8 rounded-lg bg-neon-orange/20 flex items-center justify-center text-neon-orange font-bold font-outfit">
                  🔥
                </div>
                <div>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-outfit">Trending</div>
                  <div className={`text-xs font-bold text-white ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                    {isAr ? "الأكثر طلبًا" : "Top Seller 2026"}
                  </div>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
