"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { SneakerColor } from "../data/mockData";
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, MessageCircle, ArrowLeft, Star, ChevronRight, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ProductDetails: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const { sneakers, language, contactConfig, addToCart, loading } = useStore();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isFav, setIsFav] = useState(false);
  const [imageTransition, setImageTransition] = useState(false);

  const isAr = language === "ar";
  const shoe = sneakers.find((s) => String(s.id) === id || s.slug === id);

  const computedColors: SneakerColor[] = shoe?.colors || [];
  const hasColors = computedColors.length > 0;
  const selectedColor = hasColors ? computedColors[selectedColorIndex] : null;

  const displayedImage = selectedColor?.image || shoe?.image || "";

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="h-14 w-14 rounded-full border-4 border-white/10 border-t-neon-lime animate-spin mb-6" />
          <h2 className={`text-3xl font-black text-white ${isAr ? "font-cairo" : "font-outfit"}`}>
            {isAr ? "جاري تحميل المنتج..." : "Loading product..."}
          </h2>
        </div>
      </div>
    );
  }

  if (!shoe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className={`text-3xl font-black text-white mb-4 ${isAr ? "font-cairo" : "font-outfit"}`}>
          {isAr ? "المنتج غير موجود" : "Product Not Found"}
        </h2>
        <Link
          href="/"
          className="bg-neon-lime text-obsidian px-6 py-3 rounded-xl font-bold font-outfit uppercase tracking-widest neon-glow-lime hover:bg-[#a3e635] transition-colors"
        >
          {isAr ? "العودة للرئيسية" : "Back to Home"}
        </Link>
      </div>
    );
  }

  const COLOR_MAP: Record<string, string> = {
    "Black": "#000000",
    "White": "#FFFFFF",
    "Neon Lime": "#a3e635",
    "Electric Orange": "#ea580c",
    "Red": "#ef4444",
    "Grey": "#9ca3af",
    "Blue": "#3b82f6",
    "Gold": "#fbbf24",
    "Terracotta": "#c84b31",
    "Multi": "linear-gradient(45deg, red, orange, yellow, green, blue, purple)",
    "Multicolor": "linear-gradient(45deg, red, orange, yellow, green, blue, purple)",
  };

  const handleColorSelect = (index: number) => {
    if (selectedColorIndex === index) return;
    
    // Quick fade out
    setImageTransition(true);
    
    // Swap image and fade in
    setTimeout(() => {
      setSelectedColorIndex(index);
      setImageTransition(false);
    }, 150);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert(isAr ? "الرجاء اختيار المقاس أولاً" : "Veuillez d'abord choisir la taille");
      return;
    }
    if (hasColors && !selectedColor) {
      alert(isAr ? "الرجاء اختيار اللون أولاً" : "Veuillez d'abord choisir la couleur");
      return;
    }
    const colorSuffix = selectedColor ? `_${selectedColor.nameFr}` : "";
    addToCart({
      id: `${shoe.id}_${selectedSize}${colorSuffix}`,
      sneakerId: shoe.id,
      size: selectedSize,
      quantity: quantity,
      color: selectedColor || undefined,
    });
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb / Back Navigation */}
      <div className={`flex items-center gap-2 text-neutral-500 mb-6 lg:mb-10 text-xs sm:text-sm ${isAr ? 'flex-row-reverse' : ''} font-outfit uppercase tracking-widest`}>
        <button onClick={() => router.back()} className="hover:text-white transition-colors flex items-center gap-1">
          <ArrowLeft size={16} className={isAr ? "rotate-180" : ""} />
          {isAr ? "العودة" : "Back"}
        </button>
        <ChevronRight size={14} className={isAr ? "rotate-180" : ""} />
        <Link href="/" className="hover:text-white transition-colors">{isAr ? "المتجر" : "Store"}</Link>
        <ChevronRight size={14} className={isAr ? "rotate-180" : ""} />
        <span className="text-neon-lime truncate max-w-[150px] sm:max-w-[300px]">
          {isAr ? shoe.nameAr : shoe.nameFr}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        {/* Left Column: Sticky Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="sticky top-28">
            <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] bg-gradient-to-br from-neutral-900 to-black rounded-[2rem] overflow-hidden border border-white/5 flex items-center justify-center group shadow-2xl">
              
              {/* Dynamic glowing background based on selected color */}
              <div 
                className="absolute inset-0 opacity-20 blur-[100px] transition-colors duration-1000"
                style={{ backgroundColor: selectedColor?.hex || '#a3e635' }}
              />

              {/* Main Image Container */}
              <div className="relative w-full h-full flex items-center justify-center p-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={displayedImage}
                  alt={isAr ? shoe.nameAr : shoe.nameFr}
                  className={`w-full h-full object-contain filter drop-shadow-2xl transform transition-all duration-300 ease-out z-10 ${
                    imageTransition ? "opacity-0 scale-90 blur-sm" : "opacity-100 scale-100 blur-0"
                  } group-hover:scale-110 group-hover:-rotate-2`}
                />
              </div>

              {/* Badges */}
              <div className={`absolute top-6 ${isAr ? 'right-6' : 'left-6'} z-20 flex flex-col gap-2`}>
                {shoe.isHotDrop && (
                  <span className="bg-neon-orange px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white rounded-lg shadow-[0_0_15px_rgba(234,88,12,0.5)]">
                    🔥 {isAr ? "دوب حار" : "HOT DROP"}
                  </span>
                )}
                {shoe.isNewArrival && (
                  <span className="bg-cyan-500 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    ✨ {isAr ? "وصل حديثاً" : "NEW ARRIVAL"}
                  </span>
                )}
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => setIsFav(!isFav)}
                className={`absolute top-6 ${isAr ? 'left-6' : 'right-6'} z-20 w-12 h-12 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 transition-all hover:scale-110`}
              >
                <Heart size={20} className={isFav ? "fill-red-500 text-red-500" : "text-white"} />
              </button>

            </div>
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center pb-12">
          
          <div className="mb-8">
            <div className={`flex items-center gap-3 mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <span className="inline-block text-[10px] font-black text-neon-lime uppercase tracking-widest bg-neon-lime/10 border border-neon-lime/20 px-3 py-1.5 rounded-lg">
                {(shoe.categorySlug || "SNEAKERS").replace("-", " ")}
              </span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={14} className="fill-yellow-400" />
                <Star size={14} className="fill-yellow-400" />
                <Star size={14} className="fill-yellow-400" />
                <Star size={14} className="fill-yellow-400" />
                <Star size={14} className="fill-yellow-400" />
                <span className="text-neutral-400 text-xs ml-1">(4.9/5)</span>
              </div>
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight ${isAr ? "font-cairo text-right" : "font-outfit uppercase"}`}>
              {isAr ? shoe.nameAr : shoe.nameFr}
            </h1>
            
            <div className={`mt-6 flex items-baseline gap-4 ${isAr ? "flex-row-reverse" : ""}`}>
              <div className={`text-3xl sm:text-4xl font-black text-neon-lime ${isAr ? "font-cairo" : "font-outfit"}`}>
                {isAr ? `${Math.round(Number(shoe.price) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} د.ج` : `${Math.round(Number(shoe.price) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} DA`}
              </div>
              <div className="text-lg text-neutral-500 line-through font-bold">
                {isAr ? `${Math.round((Number(shoe.price) || 0) * 1.25).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} د.ج` : `${Math.round((Number(shoe.price) || 0) * 1.25).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} DA`}
              </div>
            </div>

            <p className={`mt-8 text-neutral-400 leading-relaxed text-base sm:text-lg ${isAr ? "font-cairo text-right" : "font-outfit"}`}>
              {isAr ? shoe.descAr : shoe.descFr}
            </p>
          </div>

          <hr className="border-neutral-800 my-8" />

          {/* ═══════ COLOR SWATCHES ═══════ */}
          {hasColors && (
            <div className="mb-10">
              <div className={`flex items-end justify-between mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
                <h3 className={`text-sm font-bold text-white uppercase tracking-widest ${isAr ? "font-cairo" : "font-outfit"}`}>
                  {isAr ? "اللون المتاح" : "Available Colors"}
                </h3>
                <span className={`text-xs text-neutral-400 font-bold bg-neutral-900 px-3 py-1 rounded-full ${isAr ? "font-cairo" : "font-outfit"}`}>
                  {selectedColor 
                    ? (isAr ? selectedColor.nameAr : selectedColor.nameFr)
                    : (isAr ? "الصورة الأصلية" : "Original")
                  }
                </span>
              </div>
              
              <div className={`flex flex-wrap gap-4 ${isAr ? "justify-end" : ""}`}>
                {/* Color variant swatches */}
                {computedColors.map((color, idx) => {
                  const isSelected = selectedColorIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleColorSelect(idx)}
                      title={isAr ? color.nameAr : color.nameFr}
                      className={`flex flex-col items-center gap-2 group cursor-pointer transition-all`}
                    >
                      <div className={`relative w-16 h-16 rounded-2xl transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? "ring-2 ring-white ring-offset-4 ring-offset-obsidian scale-110 z-10"
                          : "ring-1 ring-white/10 group-hover:ring-white/50 group-hover:scale-105"
                      }`}>
                        {/* If the color has a specific image, we can show a miniature of it, otherwise just the color */}
                        {color.image ? (
                          <div className="absolute inset-0 rounded-2xl overflow-hidden bg-neutral-900">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={color.image} alt="swatch" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                          </div>
                        ) : (
                          <div
                            className="absolute inset-0 rounded-2xl shadow-inner"
                            style={{ background: color.hex }}
                          />
                        )}
                        
                        {/* Overlay border for aesthetic */}
                        <div className="absolute inset-0 rounded-2xl border border-white/10" />

                        {isSelected && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg z-20">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        )}
                      </div>
                      <span className={`text-xs font-bold transition-colors ${isSelected ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"} ${isAr ? "font-cairo" : "font-outfit"}`}>
                        {isAr ? color.nameAr : color.nameFr}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══════ SIZES ═══════ */}
          <div className="mb-12">
            <div className={`flex items-end justify-between mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <h3 className={`text-sm font-bold text-white uppercase tracking-widest ${isAr ? "font-cairo" : "font-outfit"}`}>
                {isAr ? "اختر المقاس" : "Select Size"}
              </h3>
              <button className={`text-xs text-neutral-400 underline decoration-neutral-600 underline-offset-4 hover:text-white transition-colors ${isAr ? "font-cairo" : "font-outfit"}`}>
                {isAr ? "دليل المقاسات" : "Size Guide"}
              </button>
            </div>
            
            <div className={`flex flex-wrap gap-3 ${isAr ? "justify-end" : ""}`}>
              {activeSizes.filter(sz => (activeSizesStock?.[sz] || 0) > 0).length > 0 ? (
                activeSizes.filter(sz => (activeSizesStock?.[sz] || 0) > 0).map((sz) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-16 h-16 rounded-2xl text-base transition-all flex items-center justify-center cursor-pointer font-mono ${
                        isSelected
                          ? "bg-white text-obsidian font-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                          : "bg-neutral-900 text-white border border-white/10 hover:border-white/40 hover:bg-neutral-800"
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })
              ) : (
                <div className="w-full text-center py-4 text-red-500 font-bold uppercase tracking-widest border border-red-500/20 bg-red-500/5 rounded-xl">
                  {isAr ? "نفدت الكمية" : "Out of Stock"}
                </div>
              )}
            </div>
          </div>

          {/* ═══════ QUANTITY & CTA BUTTONS ═══════ */}
          <div className={`flex flex-col sm:flex-row gap-4 mb-12 ${isAr ? 'sm:flex-row-reverse' : ''}`}>
            {activeSizes.filter(sz => (activeSizesStock?.[sz] || 0) > 0).length > 0 ? (
              <>
                <div className="flex items-center justify-between bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-2 sm:py-0 w-full sm:w-auto h-[64px] sm:h-auto sm:self-stretch">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="font-mono text-lg font-black text-white w-12 text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-3 bg-neon-lime hover:bg-white text-obsidian px-8 py-5 rounded-2xl font-black transition-all neon-glow-lime hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-[0.98] ${isAr ? "font-cairo text-xl" : "font-outfit uppercase tracking-widest text-sm"}`}
                >
                  <ShoppingCart size={22} />
                  {isAr ? "أضف إلى السلة" : "ADD TO CART"}
                </button>
                <a
                  href={(() => {
                    const phone = contactConfig.whatsapp.replace(/\+/g, "");
                    const sizePart = selectedSize ? (isAr ? `، المقاس ${selectedSize}` : `, Taille ${selectedSize}`) : "";
                    const colorPart = selectedColor ? (isAr ? `، اللون ${selectedColor.nameAr}` : `, Couleur ${selectedColor.nameFr}`) : "";
                    const msg = isAr
                      ? `مرحباً ${contactConfig.siteName}! 👋\nأريد طلب هذا الحذاء:\n\n👟 *${shoe.nameAr}*\n${colorPart}\n${sizePart}\n📦 *الكمية:* ${quantity}\n💰 *السعر الإجمالي:* ${Math.round((Number(shoe.price) || 0) * quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} د.ج\n\nالرجاء تأكيد توفر المنتج، شكراً!`
                      : `Bonjour ${contactConfig.siteName}! 👋\nJe souhaite commander cette paire :\n\n👟 *${shoe.nameFr}*\n${colorPart}\n${sizePart}\n📦 *Quantité:* ${quantity}\n💰 *Prix Total:* ${Math.round((Number(shoe.price) || 0) * quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} DA\n\nMerci de me confirmer la disponibilité !`;
                    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
                  })()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366] text-[#25D366] px-8 py-5 rounded-2xl font-black transition-all hover:scale-[1.02] active:scale-[0.98] ${isAr ? "font-cairo text-xl" : "font-outfit uppercase tracking-widest text-sm"}`}
                >
                  <MessageCircle size={22} />
                  {isAr ? "طلب عبر واتساب" : "ORDER VIA WHATSAPP"}
                </a>
              </>
            ) : (
              <button disabled className={`flex-1 flex items-center justify-center gap-3 bg-neutral-800 text-neutral-500 px-8 py-5 rounded-2xl font-black cursor-not-allowed ${isAr ? "font-cairo text-xl" : "font-outfit uppercase tracking-widest text-sm"}`}>
                {isAr ? "نفدت الكمية" : "OUT OF STOCK"}
              </button>
            )}
          </div>

          {/* ═══════ PRO INFO SECTION ═══════ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`group flex items-center gap-4 p-5 rounded-2xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-800/80 transition-colors ${isAr ? "flex-row-reverse text-right" : ""}`}>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform group-hover:bg-neon-lime/20 group-hover:text-neon-lime">
                <Truck size={22} className="text-white group-hover:text-neon-lime transition-colors" />
              </div>
              <div>
                <h4 className={`text-white font-bold text-sm mb-1 ${isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"}`}>
                  {isAr ? "توصيل سريع" : "Fast Delivery"}
                </h4>
                <p className={`text-neutral-400 text-xs ${isAr ? "font-cairo" : "font-outfit"}`}>
                  {isAr ? "توصيل لـ 58 ولاية" : "Delivery across 58 wilayas"}
                </p>
              </div>
            </div>
            
            <div className={`group flex items-center gap-4 p-5 rounded-2xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-800/80 transition-colors ${isAr ? "flex-row-reverse text-right" : ""}`}>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform group-hover:bg-cyan-500/20 group-hover:text-cyan-500">
                <ShieldCheck size={22} className="text-white group-hover:text-cyan-500 transition-colors" />
              </div>
              <div>
                <h4 className={`text-white font-bold text-sm mb-1 ${isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"}`}>
                  {isAr ? "جودة مضمونة" : "Guaranteed Quality"}
                </h4>
                <p className={`text-neutral-400 text-xs ${isAr ? "font-cairo" : "font-outfit"}`}>
                  {isAr ? "أفضل جودة في السوق" : "Best quality in the market"}
                </p>
              </div>
            </div>

            <div className={`group flex items-center gap-4 p-5 rounded-2xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-800/80 transition-colors sm:col-span-2 ${isAr ? "flex-row-reverse text-right" : ""}`}>
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform group-hover:bg-purple-500/20 group-hover:text-purple-500">
                <RotateCcw size={22} className="text-white group-hover:text-purple-500 transition-colors" />
              </div>
              <div>
                <h4 className={`text-white font-bold text-sm mb-1 ${isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"}`}>
                  {isAr ? "تبديل المقاس مجاني" : "Free Size Exchange"}
                </h4>
                <p className={`text-neutral-400 text-xs ${isAr ? "font-cairo" : "font-outfit"}`}>
                  {isAr ? "يمكنك تبديل المقاس إذا لم يكن مناسباً لك" : "Exchange available if the size doesn't fit perfectly"}
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
