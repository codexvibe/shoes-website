"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { X, MessageSquare, Mail, ShoppingCart, Check, Truck, ChevronDown } from "lucide-react";
import { Sneaker } from "../data/mockData";

interface ContactModalProps {
  sneaker: Sneaker;
  selectedSize: number | null;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ sneaker, selectedSize, onClose }) => {
  const { language, contactConfig, wilayaFees } = useStore();
  const [size, setSize] = useState<number | null>(selectedSize);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedWilayaId, setSelectedWilayaId] = useState<string>(wilayaFees[0]?.id || "alger");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const isAr = language === "ar";
  const shoeName = isAr ? sneaker.nameAr : sneaker.nameFr;

  // Selected Wilaya calculations
  const selectedWilaya = wilayaFees.find(w => w.id === selectedWilayaId) || wilayaFees[0];
  const deliveryFee = selectedWilaya ? selectedWilaya.fee : 0;
  const safePrice = Number(sneaker.price) || 0;
  const sneakerTotal = safePrice * quantity;
  const grandTotal = sneakerTotal + deliveryFee;

  const formatPrice = (price: number) => {
    const safe = Math.round(Number(price) || 0);
    const formatted = safe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return isAr ? `${formatted} د.ج` : `${formatted} DA`;
  };

  const handleSizeSelect = (sz: number) => {
    setSize(sz);
  };

  const getWhatsAppLink = () => {
    const phone = contactConfig.whatsapp.replace(/\+/g, "");
    const sizeStr = size ? (isAr ? `بمقاس ${size}` : `en taille ${size}`) : "";
    const qtyStr = quantity > 1 ? (isAr ? `الكمية: ${quantity}` : `(Quantité: ${quantity})`) : "";
    const wilayaStr = selectedWilaya ? (isAr ? `التوصيل إلى ${selectedWilaya.nameAr}` : `Livraison vers ${selectedWilaya.nameFr}`) : "";
    
    const textFr = `Bonjour, je souhaite commander la paire de baskets *${sneaker.nameFr}* ${sizeStr} ${qtyStr} au prix de *${formatPrice(sneaker.price)}* sur votre showcase. ${wilayaStr} (+${formatPrice(deliveryFee)}). *Total: ${formatPrice(grandTotal)}*. Veuillez me confirmer la disponibilité.`;
    const textAr = `مرحباً، أود طلب حذاء *${sneaker.nameAr}* ${sizeStr} ${qtyStr} بسعر *${formatPrice(sneaker.price)}* من معرضكم الإلكتروني. ${wilayaStr} (+${formatPrice(deliveryFee)}). *الإجمالي: ${formatPrice(grandTotal)}*. أرجو تأكيد التوفر.`;
    
    const text = encodeURIComponent(isAr ? textAr : textFr);
    return `https://wa.me/${phone}?text=${text}`;
  };

  const getEmailLink = () => {
    const subjectFr = `Commande Showcase: ${sneaker.nameFr}`;
    const subjectAr = `طلب شراء: ${sneaker.nameAr}`;
    const sizeStr = size ? `Size: ${size}` : "";
    const qtyStr = `Qty: ${quantity}`;
    const wilayaStr = selectedWilaya ? `Wilaya: ${selectedWilaya.nameFr} (+${formatPrice(deliveryFee)})` : "";
    
    const bodyFr = `Bonjour,\n\nJe souhaite commander la paire suivante:\n- Modèle: ${sneaker.nameFr}\n- ${sizeStr}\n- ${qtyStr}\n- Prix: ${formatPrice(sneaker.price)}\n- ${wilayaStr}\n\n*Total de la commande: ${formatPrice(grandTotal)}*\n\nMerci de me recontacter pour finaliser l'achat.`;
    const bodyAr = `مرحباً،\n\nأود طلب الحذاء التالي:\n- الموديل: ${sneaker.nameAr}\n- المقاس: ${size || 'غير محدد'}\n- الكمية: ${quantity}\n- السعر: ${formatPrice(sneaker.price)}\n- ${wilayaStr}\n\n*الإجمالي: ${formatPrice(grandTotal)}*\n\nشكراً لكم.`;

    const subject = encodeURIComponent(isAr ? subjectAr : subjectFr);
    const body = encodeURIComponent(isAr ? bodyAr : bodyFr);
    return `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
  };

  const copyDetails = () => {
    const sizeStr = size ? `Size ${size}` : "N/A";
    const text = `${shoeName} - ${sizeStr} - Price: ${formatPrice(sneaker.price)} - Delivery: ${getWilayaName(selectedWilayaId)} - Total: ${formatPrice(grandTotal)}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const getWilayaName = (id: string) => {
    const w = wilayaFees.find(x => x.id === id);
    return w ? (isAr ? w.nameAr : w.nameFr) : id;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md animate-fadeIn">
      {/* Container Card */}
      <div className="relative w-full max-w-xl rounded-3xl border border-neutral-800 bg-[#0d0d11] p-6 sm:p-8 overflow-hidden shadow-2xl">
        
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
        <div className="flex gap-4 p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/60 mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sneaker.image}
            alt={shoeName}
            className="w-16 h-16 rounded-xl object-cover border border-neutral-800 flex-shrink-0"
          />
          <div className="flex flex-col justify-center flex-1">
            <span className={`text-[10px] uppercase font-bold text-neon-lime font-outfit tracking-widest`}>
              {sneaker.categorySlug.replace("-", " ")}
            </span>
            <h4 className={`text-sm font-bold text-white mt-1 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {shoeName}
            </h4>
            <span className="text-neon-orange font-black text-sm mt-1 font-outfit">
              {formatPrice(sneaker.price)}
            </span>
          </div>
        </div>

        {/* Size Selection */}
        <div className="mb-4">
          <label className={`block text-xs font-bold text-neutral-400 mb-2 uppercase tracking-wider ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr ? "تأكيد المقاس المختار:" : "CONFIRM SIZE:"}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {sneaker.sizes.map((sz) => (
              <button
                key={sz}
                onClick={() => handleSizeSelect(sz)}
                className={`w-10 h-10 rounded-lg text-xs font-bold transition-all border flex items-center justify-center cursor-pointer ${
                  size === sz
                    ? "bg-neon-lime text-obsidian border-neon-lime font-black"
                    : "bg-neutral-950 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white"
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Wilaya Selection */}
        <div className="mb-6">
          <label className={`block text-xs font-bold text-neutral-400 mb-2 uppercase tracking-wider ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr ? "ولاية التوصيل:" : "DELIVERY DESTINATION:"}
          </label>
          <div className="relative group">
            <div className={`absolute inset-y-0 ${isAr ? 'right-0 pr-4' : 'left-0 pl-4'} flex items-center pointer-events-none`}>
              <Truck size={16} className="text-neon-lime/70 group-hover:text-neon-lime transition-colors" />
            </div>
            <select
              value={selectedWilayaId}
              onChange={(e) => setSelectedWilayaId(e.target.value)}
              className={`appearance-none bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 text-sm font-semibold text-white focus:outline-none focus:ring-1 focus:ring-neon-lime focus:border-neon-lime w-full rounded-2xl py-3.5 cursor-pointer shadow-inner transition-all ${isAr ? 'font-cairo text-right pr-11 pl-10' : 'font-outfit pl-11 pr-10'}`}
            >
              {wilayaFees.map((w) => (
                <option key={w.id} value={w.id} className="bg-neutral-900 text-white text-sm py-2">
                  {isAr ? w.nameAr : w.nameFr} (+{formatPrice(w.fee)})
                </option>
              ))}
            </select>
            <div className={`absolute inset-y-0 ${isAr ? 'left-0 pl-4' : 'right-0 pr-4'} flex items-center pointer-events-none`}>
              <ChevronDown size={16} className="text-neutral-500 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="mb-4 flex items-center justify-between border-t border-neutral-900 pt-4">
          <label className={`text-xs font-bold text-neutral-400 uppercase tracking-wider ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr ? "الكمية المطلوبة:" : "QUANTITY:"}
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 font-bold flex items-center justify-center cursor-pointer"
            >
              -
            </button>
            <span className="font-outfit text-white font-bold text-xs w-6 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-lg bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 font-bold flex items-center justify-center cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Detailed Price Summary */}
        <div className="mb-5 border-t border-neutral-900 pt-4 space-y-2">
          <div className="flex justify-between items-center text-xs text-neutral-400 font-outfit">
            <span>Subtotal:</span>
            <span className="font-mono">{formatPrice(sneakerTotal)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-neutral-400 font-outfit">
            <span>Delivery Fee ({getWilayaName(selectedWilayaId)}):</span>
            <span className="font-mono text-neon-orange">+{formatPrice(deliveryFee)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-white font-extrabold border-t border-neutral-900 pt-2 font-outfit">
            <span>Grand Total:</span>
            <span className="font-mono text-neon-lime">{formatPrice(grandTotal)}</span>
          </div>
        </div>

        {/* Order CTA Buttons */}
        <div className="space-y-3.5">
          {/* WhatsApp CTA */}
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-3 w-full rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 font-black transition-all hover:scale-[1.02] shadow-lg shadow-[#25d366]/20 cursor-pointer ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wider'}`}
          >
            <MessageSquare size={18} fill="currentColor" />
            <span>{isAr ? "طلب عبر الواتساب" : "Commander via WhatsApp"}</span>
          </a>

          {/* Email CTA */}
          <a
            href={getEmailLink()}
            className={`flex items-center justify-center gap-3 w-full rounded-2xl bg-neutral-900 hover:bg-neutral-850 text-neutral-200 border border-neutral-800 hover:border-neutral-700 py-3.5 font-bold transition-all hover:scale-[1.02] cursor-pointer ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wider'}`}
          >
            <Mail size={16} />
            <span>{isAr ? "طلب عبر البريد الإلكتروني" : "Commander via Email"}</span>
          </a>

          {/* Copy Details CTA */}
          <button
            onClick={copyDetails}
            className={`flex items-center justify-center gap-2 w-full text-[11px] font-semibold py-1.5 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer ${isAr ? 'font-cairo' : 'font-outfit'}`}
          >
            {isCopied ? (
              <>
                <Check size={12} className="text-neon-lime" />
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
