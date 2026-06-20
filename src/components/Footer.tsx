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
              {(contactConfig.siteName || "SNKRS ALG").split(" ")[0]}{" "}
              <span className="text-neon-lime">{(contactConfig.siteName || "SNKRS ALG").split(" ").slice(1).join(" ")}</span>
            </span>
            <p className={`text-xs text-neutral-500 leading-relaxed max-w-sm mb-6 text-center md:text-left md:rtl:text-right ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr 
                ? "منصتك المحلية الرائدة لاستعراض أحدث وأفخر الأحذية الرياضية العصرية في السوق بلمسات تصميمية فائقة الأناقة والجاذبية." 
                : "Votre destination locale de choix pour les sneakers d'élite. Conçu avec un style sombre et élégant."}
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
              {isAr ? "روابط سريعة" : "Liens Rapides"}
            </h5>
            <ul className="space-y-2.5 text-center md:text-left md:rtl:text-right">
              <li>
                <Link href="/#collection" className={`text-xs hover:text-white transition-colors ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                  {isAr ? "المجموعة الكاملة" : "Collection Complète"}
                </Link>
              </li>
              <li>
                <Link href="/#categories" className={`text-xs hover:text-white transition-colors ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                  {isAr ? "فئات المنتجات" : "Catégories"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Showcase Policy (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start md:rtl:items-end">
            <h5 className={`text-xs font-black text-white uppercase tracking-widest mb-4 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr ? "سياسة المعرض" : "Politique du Magasin"}
            </h5>
            <div className={`text-xs text-neutral-500 leading-relaxed text-center md:text-left md:rtl:text-right ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              <p className="mb-2">
                {isAr 
                  ? "ملاحظة: هذا الموقع يتيح لك الطلب المباشر للمنتجات." 
                  : "REMARQUE : Cette plateforme vous permet de passer des commandes directes."}
              </p>
              <p>
                {isAr
                  ? "الدفع يتم عند الاستلام بعد التنسيق المباشر للطلب."
                  : "Commandez directement en ligne ou via WhatsApp. Le paiement s'effectue à la livraison."}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-neutral-900 pt-8 text-center flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-[10px] text-neutral-600 font-mono">
            {(contactConfig.siteName || "SNKRS ALG").toUpperCase()} SHOWCASE PLATFORM &copy; {new Date().getFullYear()}.
          </p>
          <p className={`text-[10px] text-neutral-600 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr ? "صنع بحب للثقافة الرياضية" : "Built with precision for premium culture spaces"}
          </p>
        </div>
      </div>
    </footer>
  );
};
