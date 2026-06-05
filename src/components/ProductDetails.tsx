"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw, MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ProductDetails: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const { sneakers, language, contactConfig, addToCart } = useStore();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isFav, setIsFav] = useState(false);

  const isAr = language === "ar";
  const shoe = sneakers.find((s) => s.id === id);

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

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert(isAr ? "الرجاء اختيار المقاس أولاً" : "Veuillez d'abord choisir la taille");
      return;
    }
    addToCart({
      id: `${shoe.id}_${selectedSize}`,
      sneakerId: shoe.id,
      size: selectedSize,
      quantity: 1,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className={`flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors ${isAr ? 'flex-row-reverse self-end' : ''}`}
      >
        <ArrowLeft size={20} className={isAr ? "rotate-180" : ""} />
        <span className={`text-sm font-bold ${isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"}`}>
          {isAr ? "العودة" : "Back"}
        </span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
        
        {/* Left: Product Image */}
        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-[#0a0a0c] rounded-3xl overflow-hidden border border-white/5 flex items-center justify-center group">
          <div className="absolute inset-0 bg-gradient-to-tr from-neon-lime/10 via-transparent to-neon-orange/5 opacity-50"></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shoe.image}
            alt={isAr ? shoe.nameAr : shoe.nameFr}
            className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110 z-10"
          />
          {/* Badges */}
          <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
            {shoe.isHotDrop && (
              <span className="bg-neon-orange px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white rounded shadow-lg">
                {isAr ? "دوب حار" : "HOT DROP"}
              </span>
            )}
            {shoe.isNewArrival && (
              <span className="bg-cyan-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white rounded shadow-lg">
                {isAr ? "وصل حديثاً" : "NEW ARRIVAL"}
              </span>
            )}
          </div>
          {/* Favorite */}
          <button
            onClick={() => setIsFav(!isFav)}
            className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 transition-colors"
          >
            <Heart size={20} className={isFav ? "fill-red-500 text-red-500" : "text-white"} />
          </button>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <span className="inline-block text-xs font-bold text-neon-lime uppercase tracking-widest mb-3 font-outfit bg-neon-lime/10 px-3 py-1 rounded-full">
              {shoe.categorySlug.replace("-", " ")}
            </span>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight ${isAr ? "font-cairo text-right" : "font-outfit uppercase"}`}>
              {isAr ? shoe.nameAr : shoe.nameFr}
            </h1>
            <div className={`mt-6 text-3xl font-black text-neon-orange ${isAr ? "text-right" : "font-outfit"}`}>
              {isAr ? `${Math.round(Number(shoe.price) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} د.ج` : `${Math.round(Number(shoe.price) || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} DA`}
            </div>
            <p className={`mt-6 text-neutral-400 leading-relaxed text-base md:text-lg ${isAr ? "font-cairo text-right" : "font-outfit"}`}>
              {isAr ? shoe.descAr : shoe.descFr}
            </p>
          </div>

          <div className="h-px w-full bg-white/10 my-8"></div>

          {/* Sizes */}
          <div className="mb-10">
            <div className={`flex items-center justify-between mb-4 ${isAr ? 'flex-row-reverse' : ''}`}>
              <h3 className={`text-sm font-bold text-white uppercase tracking-widest ${isAr ? "font-cairo" : "font-outfit"}`}>
                {isAr ? "اختر المقاس" : "Select Size"}
              </h3>
              <span className={`text-xs text-neutral-500 underline cursor-pointer hover:text-white transition-colors ${isAr ? "font-cairo" : "font-outfit"}`}>
                {isAr ? "دليل المقاسات" : "Size Guide"}
              </span>
            </div>
            
            <div className={`flex flex-wrap gap-3 ${isAr ? "justify-end" : ""}`}>
              {shoe.sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`w-14 h-14 rounded-xl text-sm font-bold transition-all border flex items-center justify-center cursor-pointer ${
                    selectedSize === sz
                      ? "bg-neon-lime text-obsidian border-neon-lime font-black neon-glow-lime scale-105"
                      : "bg-transparent text-white border-white/20 hover:border-white/50 hover:bg-white/5"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-3 bg-white text-obsidian hover:bg-neutral-200 px-8 py-5 rounded-2xl font-black transition-all ${isAr ? "font-cairo text-lg" : "font-outfit uppercase tracking-widest text-sm"}`}
            >
              <ShoppingCart size={20} />
              {isAr ? "أضف إلى السلة" : "Add to Cart"}
            </button>
            <a
              href={(() => {
                const phone = contactConfig.whatsapp.replace(/\+/g, "");
                const sizePart = selectedSize ? (isAr ? `، المقاس ${selectedSize}` : `, Taille ${selectedSize}`) : "";
                const msg = isAr
                  ? `مرحباً، أريد شراء ${shoe.nameAr}${sizePart}، السعر ${Math.round(Number(shoe.price) || 0)} د.ج`
                  : `Bonjour, je veux acheter la ${shoe.nameFr}${sizePart}, Prix ${Math.round(Number(shoe.price) || 0)} DA`;
                return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
              })()}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 hover:border-[#25D366] text-[#25D366] px-8 py-5 rounded-2xl font-black transition-all ${isAr ? "font-cairo text-lg" : "font-outfit uppercase tracking-widest text-sm"}`}
            >
              <MessageCircle size={20} />
              {isAr ? "طلب عبر واتساب" : "Order WhatsApp"}
            </a>
          </div>

          {/* Pro Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 ${isAr ? "flex-row-reverse text-right" : ""}`}>
              <Truck size={24} className="text-neon-lime flex-shrink-0" />
              <div>
                <h4 className={`text-white font-bold text-sm mb-1 ${isAr ? "font-cairo" : "font-outfit uppercase"}`}>
                  {isAr ? "توصيل سريع" : "Fast Delivery"}
                </h4>
                <p className={`text-neutral-400 text-xs ${isAr ? "font-cairo" : "font-outfit"}`}>
                  {isAr ? "توصيل لـ 58 ولاية" : "Delivery across 58 wilayas"}
                </p>
              </div>
            </div>
            
            <div className={`flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 ${isAr ? "flex-row-reverse text-right" : ""}`}>
              <ShieldCheck size={24} className="text-neon-lime flex-shrink-0" />
              <div>
                <h4 className={`text-white font-bold text-sm mb-1 ${isAr ? "font-cairo" : "font-outfit uppercase"}`}>
                  {isAr ? "جودة مضمونة" : "Guaranteed Quality"}
                </h4>
                <p className={`text-neutral-400 text-xs ${isAr ? "font-cairo" : "font-outfit"}`}>
                  {isAr ? "أفضل جودة في السوق" : "Best quality in the market"}
                </p>
              </div>
            </div>

            <div className={`flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 sm:col-span-2 ${isAr ? "flex-row-reverse text-right" : ""}`}>
              <RotateCcw size={24} className="text-neon-lime flex-shrink-0" />
              <div>
                <h4 className={`text-white font-bold text-sm mb-1 ${isAr ? "font-cairo" : "font-outfit uppercase"}`}>
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
