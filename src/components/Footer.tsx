"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "../context/StoreContext";
import { Phone, Mail } from "lucide-react";

export const Footer: React.FC = () => {
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
    <footer id="contact" className="bg-[#040405] border-t border-neutral-900 py-16 text-neutral-400 mt-auto">
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
                <Link href="/#collection" className={`text-xs hover:text-white transition-colors ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                  {isAr ? "المجموعة الكاملة" : "Full Collection"}
                </Link>
              </li>
              <li>
                <Link href="/#categories" className={`text-xs hover:text-white transition-colors ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                  {isAr ? "فئات المنتجات" : "Categories"}
                </Link>
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
                  ? "ملاحظة: هذا الموقع يتيح لك الطلب المباشر للمنتجات." 
                  : "NOTICE: This platform allows you to place direct orders."}
              </p>
              <p>
                {isAr
                  ? "الدفع يتم عند الاستلام بعد التنسيق المباشر للطلب."
                  : "Order directly online or via WhatsApp. Payments are handled locally upon pickup or delivery setup."}
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
  );
};
