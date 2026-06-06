"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { SneakerGallery } from "@/components/SneakerGallery";
import { Footer } from "@/components/Footer";

import { Phone, Clock, ShieldCheck } from "lucide-react";

export default function Storefront() {
  const { language } = useStore();
  const isAr = language === "ar";

  return (
    <div className="flex flex-col min-h-screen bg-obsidian text-zinc-100 selection:bg-neon-lime selection:text-obsidian">
      
      {/* Sticky Navigation bar */}
      <Navbar />

      {/* Hero Showcase Section */}
      <Hero />

      {/* Main Content Workspace */}
      <main className="flex-1">
        
        {/* Categories Matrix */}
        <CategoryGrid />

        {/* Sneaker Products Gallery */}
        <SneakerGallery />

        {/* Value Proposition Grid (Why Choose Us) */}
        <section className="py-20 bg-[#060608] border-t border-neutral-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left md:rtl:text-right">
              
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-asphalt/20 border border-neutral-800/40 hover:border-neutral-800/80 transition-all flex flex-col items-center md:items-start md:rtl:items-end">
                <div className="p-3 bg-neon-lime/10 text-neon-lime rounded-xl mb-4">
                  <ShieldCheck size={22} />
                </div>
                <h4 className={`text-lg font-bold text-white mb-2 ${isAr ? 'font-cairo' : 'font-outfit uppercase'}`}>
                  {isAr ? "منتجات أصلية 100%" : "Authentic Products"}
                </h4>
                <p className={`text-xs text-neutral-400 leading-relaxed ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                  {isAr 
                    ? "جميع الأحذية المعروضة أصلية ومستوردة من قنوات معتمدة مباشرة لضمان أعلى جودة." 
                    : "Every item in our showcase is guaranteed authentic and inspected directly before list registration."}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-asphalt/20 border border-neutral-800/40 hover:border-neutral-800/80 transition-all flex flex-col items-center md:items-start md:rtl:items-end">
                <div className="p-3 bg-neon-orange/10 text-neon-orange rounded-xl mb-4">
                  <Phone size={22} />
                </div>
                <h4 className={`text-lg font-bold text-white mb-2 ${isAr ? 'font-cairo' : 'font-outfit uppercase'}`}>
                  {isAr ? "طلب مباشر وسهل" : "Direct Ordering"}
                </h4>
                <p className={`text-xs text-neutral-400 leading-relaxed ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                  {isAr 
                    ? "لا توجد حاجة لبطاقة ائتمان. اضغط على المنتج واطلب مباشرة لتوصيله لباب منزلك." 
                    : "Order directly on the site. Payments are handled locally upon pickup or delivery."}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-asphalt/20 border border-neutral-800/40 hover:border-neutral-800/80 transition-all flex flex-col items-center md:items-start md:rtl:items-end">
                <div className="p-3 bg-cyan-400/10 text-cyan-400 rounded-xl mb-4">
                  <Clock size={22} />
                </div>
                <h4 className={`text-lg font-bold text-white mb-2 ${isAr ? 'font-cairo' : 'font-outfit uppercase'}`}>
                  {isAr ? "دعم سريع وسلس" : "Express Response"}
                </h4>
                <p className={`text-xs text-neutral-400 leading-relaxed ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                  {isAr 
                    ? "فريقنا متواجد للرد على استفسارات المقاسات وتأكيد الطلبات عبر قنوات الواتساب طوال اليوم." 
                    : "We reply promptly to sizing availability queries and pickup alignments within minutes."}
                </p>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Main Footer (Bilingual and Detailed) */}
      <Footer />

    </div>
  );
}
