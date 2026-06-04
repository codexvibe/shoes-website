"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { X, MessageSquare, Mail, Phone, ShoppingCart, Check } from "lucide-react";
import { Sneaker } from "../data/mockData";

interface ContactModalProps {
  sneaker: Sneaker;
  selectedSize: number | null;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ sneaker, selectedSize, onClose }) => {
  const { language, contactConfig } = useStore();
  const [size, setSize] = useState<number | null>(selectedSize);
  const [quantity, setQuantity] = useState<number>(1);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const isAr = language === "ar";
  const shoeName = isAr ? sneaker.nameAr : sneaker.nameFr;

  const handleSizeSelect = (sz: number) => {
    setSize(sz);
  };

  const getWhatsAppLink = () => {
    const phone = contactConfig.whatsapp.replace(/\+/g, "");
    const sizeStr = size ? (isAr ? `بمقاس ${size}` : `en taille ${size}`) : "";
    const qtyStr = quantity > 1 ? (isAr ? `الكمية: ${quantity}` : `(Quantité: ${quantity})`) : "";
    
    const textFr = `Bonjour, je souhaite commander la paire de baskets *${sneaker.nameFr}* ${sizeStr} ${qtyStr} au prix de *${sneaker.price}* sur votre showcase. Veuillez me confirmer la disponibilité.`;
    const textAr = `مرحباً، أود طلب حذاء *${sneaker.nameAr}* ${sizeStr} ${qtyStr} بسعر *${sneaker.price}* من معرضكم الإلكتروني. أرجو تأكيد التوفر.`;
    
    const text = encodeURIComponent(isAr ? textAr : textFr);
    return `https://wa.me/${phone}?text=${text}`;
  };

  const getEmailLink = () => {
    const subjectFr = `Commande Showcase: ${sneaker.nameFr}`;
    const subjectAr = `طلب شراء: ${sneaker.nameAr}`;
    const sizeStr = size ? `Size: ${size}` : "";
    const qtyStr = `Qty: ${quantity}`;
    
    const bodyFr = `Bonjour,\n\nJe souhaite commander la paire suivante:\n- Modèle: ${sneaker.nameFr}\n- ${sizeStr}\n- ${qtyStr}\n- Prix: ${sneaker.price}\n\nMerci de me recontacter pour finaliser l'achat.`;
    const bodyAr = `مرحباً،\n\nأود طلب الحذاء التالي:\n- الموديل: ${sneaker.nameAr}\n- المقاس: ${size || 'غير محدد'}\n- الكمية: ${quantity}\n- السعر: ${sneaker.price}\n\nشكراً لكم.`;

    const subject = encodeURIComponent(isAr ? subjectAr : subjectFr);
    const body = encodeURIComponent(isAr ? bodyAr : bodyFr);
    return `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
  };

  const copyDetails = () => {
    const sizeStr = size ? `Size ${size}` : "N/A";
    const text = `${shoeName} - ${sizeStr} - Price: ${sneaker.price}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md animate-fadeIn">
      {/* Container Card */}
      <div className="relative w-full max-w-lg rounded-3xl border border-neutral-800 bg-[#0d0d11] p-6 sm:p-8 overflow-hidden shadow-2xl">
        
        {/* Glow Accent Border */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-neon-lime via-neon-orange to-cyan-400"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white hover:bg-neutral-900 p-2 rounded-xl transition-all"
        >
          <X size={20} />
        </button>

        {/* Header Title */}
        <div className="mb-6 flex items-center gap-3">
          <div className="p-3 bg-neon-lime/10 text-neon-lime rounded-xl">
            <ShoppingCart size={22} />
          </div>
          <div>
            <h3 className={`text-xl font-extrabold text-white ${isAr ? 'font-cairo' : 'font-outfit uppercase'}`}>
              {isAr ? "تقديم طلب الشراء" : "ORDER DIRECTLY"}
            </h3>
            <p className={`text-xs text-neutral-500 mt-0.5 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr ? "تواصل مباشر مع المتجر دون وسيط دفع" : "Direct showcase ordering channels"}
            </p>
          </div>
        </div>

        {/* Product Brief */}
        <div className="flex gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/60 mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sneaker.image}
            alt={shoeName}
            className="w-20 h-20 rounded-xl object-cover border border-neutral-800"
          />
          <div className="flex flex-col justify-center flex-1">
            <span className={`text-[10px] uppercase font-bold text-neon-lime font-outfit tracking-widest`}>
              {sneaker.categorySlug.replace("-", " ")}
            </span>
            <h4 className={`text-lg font-bold text-white mt-1 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {shoeName}
            </h4>
            <span className="text-neon-orange font-black text-sm mt-1.5 font-outfit">
              {sneaker.price}
            </span>
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-5">
          <label className={`block text-xs font-bold text-neutral-400 mb-2.5 uppercase tracking-wider ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr ? "تأكيد المقاس المختار:" : "CONFIRM SIZE:"}
          </label>
          <div className="flex flex-wrap gap-2">
            {sneaker.sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => handleSizeSelect(sz)}
                className={`w-11 h-11 rounded-xl text-xs font-bold transition-all border flex items-center justify-center cursor-pointer ${
                  size === sz
                    ? "bg-neon-lime text-obsidian border-neon-lime neon-glow-lime"
                    : "bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="mb-6 flex items-center justify-between border-t border-neutral-900 pt-5">
          <label className={`text-xs font-bold text-neutral-400 uppercase tracking-wider ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr ? "الكمية المطلوبة:" : "QUANTITY:"}
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 font-bold flex items-center justify-center"
            >
              -
            </button>
            <span className="font-outfit text-white font-bold w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 font-bold flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        {/* Order CTA Buttons */}
        <div className="space-y-3.5">
          {/* WhatsApp CTA */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-3 w-full rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white py-4 font-black transition-all hover:scale-[1.02] shadow-lg shadow-[#25d366]/20 ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wider'}`}
          >
            <MessageSquare size={20} fill="currentColor" />
            <span>{isAr ? "طلب عبر الواتساب" : "Commander via WhatsApp"}</span>
          </a>

          {/* Email CTA */}
          <a
            href={getEmailLink()}
            className={`flex items-center justify-center gap-3 w-full rounded-2xl bg-neutral-900 hover:bg-neutral-850 text-neutral-200 border border-neutral-800 hover:border-neutral-700 py-4 font-bold transition-all hover:scale-[1.02] ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wider'}`}
          >
            <Mail size={18} />
            <span>{isAr ? "طلب عبر البريد الإلكتروني" : "Commander via Email"}</span>
          </a>

          {/* Copy Details CTA */}
          <button
            onClick={copyDetails}
            className={`flex items-center justify-center gap-2.5 w-full text-xs font-semibold py-2.5 text-neutral-500 hover:text-neutral-300 transition-colors ${isAr ? 'font-cairo' : 'font-outfit'}`}
          >
            {isCopied ? (
              <>
                <Check size={14} className="text-neon-lime" />
                <span className="text-neon-lime">{isAr ? "تم نسخ تفاصيل المنتج!" : "Détails copiés !"}</span>
              </>
            ) : (
              <>
                <span>{isAr ? "نسخ تفاصيل المنتج للمشاركة" : "Copier les détails du modèle"}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
