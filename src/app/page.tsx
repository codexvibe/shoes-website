"use client";

import React from "react";
import { useStore } from "../context/StoreContext";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { CategoryGrid } from "../components/CategoryGrid";
import { SneakerGallery } from "../components/SneakerGallery";
import { Phone, Mail, Clock, ShieldCheck, RefreshCw, Truck } from "lucide-react";

export default function Storefront() {
  const { language, contactConfig } = useStore();
  const isAr = language === "ar";

  const getWhatsAppLink = () => {
    const phone = contactConfig.whatsapp.replace(/\+/g, "");
    const text = encodeURIComponent(
      isAr 
        ? "مرحباً، أود الاستفسار عن الأحذية الرياضية المتوفرة في المتجر." 
        : "Bonjour, je souhaite me renseigner sur les sneakers disponibles dans votre showcase."
    );
    return `https://wa.me/${phone}?text=${text}`;
  };

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
                    ? "لا توجد حاجة لبطاقة ائتمان. اضغط على المنتج وتحدث مباشرة مع صاحب المتجر للطلب." 
                    : "Skip the checkout hassle. Chat directly with the owner to arrange instant order pickup."}
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
      <footer id="contact" className="bg-[#040405] border-t border-neutral-900 py-16 text-neutral-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            
            {/* Column 1: Brand Info (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start md:rtl:items-end">
              <span className={`text-xl font-black uppercase tracking-wider text-white mb-4 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                {isAr ? "أوبسيديان" : "Obsidian"}{" "}
                <span className="text-neon-lime">{isAr ? "سنيكرز" : "SNKRS"}</span>
              </span>
              <p className={`text-xs text-neutral-500 leading-relaxed max-w-sm mb-6 text-center md:text-left md:rtl:text-right ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                {isAr 
                  ? "منصتك المحلية الرائدة لاستعراض أحدث وأفخر الأحذية الرياضية العصرية في السوق بلمسات تصميمية فائقة الأناقة والجاذبية." 
                  : "Your premier local showcase destination for elite sneakers and basketball trainers. Designed with obsidian dark styles."}
              </p>
              
              {/* Social / Direct order links */}
              <div className="flex gap-3">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-neutral-900 border border-neutral-800 hover:border-neon-lime/40 text-neutral-400 hover:text-neon-lime rounded-xl transition-all"
                  title="WhatsApp"
                >
                  <Phone size={16} />
                </a>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="p-3 bg-neutral-900 border border-neutral-800 hover:border-neon-lime/40 text-neutral-400 hover:text-neon-lime rounded-xl transition-all"
                  title="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links (3 cols) */}
            <div className="md:col-span-3 flex flex-col items-center md:items-start md:rtl:items-end">
              <h5 className={`text-xs font-black text-white uppercase tracking-widest mb-4 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                {isAr ? "روابط سريعة" : "Store Links"}
              </h5>
              <ul className="space-y-2.5 text-center md:text-left md:rtl:text-right">
                <li>
                  <a href="#collection" className={`text-xs hover:text-white transition-colors ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                    {isAr ? "المجموعة الكاملة" : "Full Collection"}
                  </a>
                </li>
                <li>
                  <a href="#categories" className={`text-xs hover:text-white transition-colors ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                    {isAr ? "فئات المنتجات" : "Categories"}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Showcase Policy (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start md:rtl:items-end">
              <h5 className={`text-xs font-black text-white uppercase tracking-widest mb-4 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                {isAr ? "سياسة المعرض" : "Showcase Notice"}
              </h5>
              <div className={`text-xs text-neutral-500 leading-relaxed text-center md:text-left md:rtl:text-right ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                <p className="mb-2">
                  {isAr 
                    ? "ملاحظة: هذا الموقع عبارة عن واجهة عرض إلكترونية فقط." 
                    : "NOTICE: This platform is a catalog showcase only."}
                </p>
                <p>
                  {isAr
                    ? "لا يتم الدفع عبر الإنترنت. يتم الدفع عند الاستلام بعد التنسيق المباشر مع صاحب المعرض."
                    : "No online checkout. Payments are handled locally upon pickup or delivery setup."}
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-neutral-900 pt-8 text-center flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[10px] text-neutral-600 font-mono">
              OBSIDIAN SNKRS SHOWCASE PLATFORM &copy; 2026.
            </p>
            <p className={`text-[10px] text-neutral-600 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr ? "صنع بحب للثقافة الرياضية" : "Built with precision for premium culture spaces"}
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
