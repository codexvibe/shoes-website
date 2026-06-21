"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Check,
  Truck,
  ChevronDown,
  User,
  Phone,
  MapPin,
  CreditCard,
  MessageSquare,
  Mail,
  Package,
} from "lucide-react";

type DrawerStep = "cart" | "checkout" | "success";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    sneakers,
    updateCartQuantity,
    removeFromCart,
    language,
    wilayaFees,
    contactConfig,
    addLead,
    clearCart,
  } = useStore();

  const [step, setStep] = useState<DrawerStep>("cart");
  const [selectedWilayaId, setSelectedWilayaId] = useState<string>(wilayaFees[0]?.id || "16");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [wilayaSearch, setWilayaSearch] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderError, setOrderError] = useState("");
  const [deliveryType, setDeliveryType] = useState<"domicile" | "bureau">("domicile");

  const isAr = language === "ar";

  if (!isCartOpen) return null;

  const getSneakerDetails = (sneakerId: string) => {
    return sneakers.find((s) => s.id === sneakerId);
  };

  const subtotal = cart.reduce((total, item) => {
    const shoe = getSneakerDetails(item.sneakerId);
    return total + (shoe?.price || 0) * item.quantity;
  }, 0);

  const selectedWilaya = wilayaFees.find((w) => w.id === selectedWilayaId) || wilayaFees[0];
  const deliveryFee = selectedWilaya ? (deliveryType === "bureau" ? selectedWilaya.feeBureau : selectedWilaya.feeDomicile) : 0;
  const grandTotal = subtotal + deliveryFee;

  const filteredWilayas = wilayaFees.filter(
    (w) =>
      w.nameFr.toLowerCase().includes(wilayaSearch.toLowerCase()) ||
      w.nameAr.includes(wilayaSearch) ||
      w.id.includes(wilayaSearch)
  );

  const formatPrice = (price: number) => {
    const safe = Math.round(Number(price) || 0);
    const formatted = safe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return isAr ? `${formatted} د.ج` : `${formatted} DA`;
  };

  const handleProceedToCheckout = () => {
    setStep("checkout");
  };

  const handleBackToCart = () => {
    setStep("cart");
    setOrderError("");
  };

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset after close animation
    setTimeout(() => {
      setStep("cart");
      setCustomerName("");
      setPhoneNumber("");
      setOrderError("");
    }, 300);
  };

  const handlePlaceOrder = () => {
    setOrderError("");
    if (cart.length === 0) {
      setOrderError(isAr ? "السلة فارغة." : "Votre panier est vide.");
      return;
    }
    if (!customerName.trim()) {
      setOrderError(isAr ? "الرجاء إدخال الاسم." : "Veuillez entrer votre nom.");
      return;
    }
    if (!phoneNumber.trim()) {
      setOrderError(isAr ? "الرجاء إدخال رقم الهاتف." : "Veuillez entrer votre numéro de téléphone.");
      return;
    }

    addLead({
      customerName,
      phoneNumber,
      items: cart,
      wilayaId: selectedWilayaId,
      status: "todo",
    });

    clearCart();
    setStep("success");
  };

  const cartSummaryText = cart
    .map((item) => {
      const shoe = getSneakerDetails(item.sneakerId);
      const name = shoe ? (isAr ? shoe.nameAr : shoe.nameFr) : "Unknown Shoe";
      const colorPart = item.color ? (isAr ? `, اللون: ${item.color.nameAr}` : `, Color: ${item.color.nameFr}`) : "";
      return `- ${name} (Size: ${item.size}${colorPart}, Qty: ${item.quantity})`;
    })
    .join("\n");

  const getWhatsAppLink = () => {
    const phone = contactConfig.whatsapp.replace(/\+/g, "");
    const wilayaStr = selectedWilaya
      ? isAr
        ? `التوصيل إلى ${selectedWilaya.nameAr}`
        : `Livraison vers ${selectedWilaya.nameFr}`
      : "";
    const textFr = `Bonjour ${contactConfig.siteName} ! 👋\nJe souhaite confirmer ma commande :\n\n📦 *Détails de la commande :*\n${cartSummaryText}\n\n📍 *Livraison vers :* ${wilayaStr} (+${formatPrice(deliveryFee)})\n💰 *Total à payer : ${formatPrice(grandTotal)}*\n\nMerci de valider ma commande !`;
    const textAr = `مرحباً ${contactConfig.siteName} ! 👋\nأود تأكيد طلبي:\n\n📦 *تفاصيل الطلب:*\n${cartSummaryText}\n\n📍 *التوصيل إلى:* ${wilayaStr} (+${formatPrice(deliveryFee)})\n💰 *المجموع الإجمالي: ${formatPrice(grandTotal)}*\n\nالرجاء تأكيد الطلب، شكراً!`;
    const text = encodeURIComponent(isAr ? textAr : textFr);
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`relative w-full max-w-md h-full bg-[#0a0a0c] border-l border-neutral-800 shadow-2xl flex flex-col transform transition-transform duration-300 ${
          isAr ? "border-r border-l-0" : ""
        }`}
      >
        {/* ===== SUCCESS STEP ===== */}
        {step === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            {/* Success animation circle */}
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-neon-lime/10 flex items-center justify-center border-2 border-neon-lime/30">
                <div className="w-16 h-16 rounded-full bg-neon-lime/20 flex items-center justify-center">
                  <Check size={32} className="text-neon-lime" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-neon-lime/20 animate-ping"></div>
            </div>

            <h3
              className={`text-2xl font-black text-white mb-3 ${
                isAr ? "font-cairo" : "font-outfit uppercase"
              }`}
            >
              {isAr ? "تم استلام طلبك!" : "COMMANDE REÇUE !"}
            </h3>
            <p
              className={`text-sm text-neutral-400 mb-8 max-w-xs ${
                isAr ? "font-cairo" : "font-outfit"
              }`}
            >
              {isAr
                ? "شكراً لك! سيتواصل معك فريقنا قريباً لتأكيد الطلب وترتيب التوصيل."
                : "Merci ! Notre équipe vous contactera sous peu pour confirmer et organiser la livraison."}
            </p>

            <button
              onClick={handleClose}
              className={`w-full max-w-xs py-4 rounded-2xl bg-white text-obsidian font-black text-sm transition-all hover:bg-neutral-200 cursor-pointer ${
                isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"
              }`}
            >
              {isAr ? "إغلاق" : "Fermer"}
            </button>
          </div>
        )}

        {/* ===== CART STEP ===== */}
        {step === "cart" && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-800/80">
              <h2
                className={`text-xl font-bold text-white flex items-center gap-2 ${
                  isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"
                }`}
              >
                <ShoppingBag className="text-neon-lime" size={20} />
                {isAr ? "سلة التسوق" : "Votre Panier"}
                {cart.length > 0 && (
                  <span className="ml-1 text-xs bg-neon-lime/15 text-neon-lime px-2 py-0.5 rounded-full font-outfit">
                    {cart.length}
                  </span>
                )}
              </h2>
              <button
                onClick={handleClose}
                className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-neutral-500 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p className={`text-sm ${isAr ? "font-cairo" : "font-outfit"}`}>
                    {isAr ? "السلة فارغة حالياً" : "Votre panier est vide."}
                  </p>
                </div>
              ) : (
                cart.map((item) => {
                  const shoe = getSneakerDetails(item.sneakerId);
                  if (!shoe) return null;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/60"
                    >
                      <div className="w-20 h-20 rounded-xl bg-neutral-950 overflow-hidden flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.color?.image || shoe.image}
                          alt={shoe.nameFr}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3
                              className={`text-sm font-bold text-white line-clamp-1 ${
                                isAr ? "font-cairo" : "font-outfit"
                              }`}
                            >
                              {isAr ? shoe.nameAr : shoe.nameFr}
                            </h3>
                            <p className="text-[10px] text-neutral-500 font-outfit uppercase mt-0.5">
                              {isAr ? `المقاس: ${item.size}` : `Taille: ${item.size}`}
                            </p>
                            {item.color && (
                              <div className="flex items-center gap-1.5 mt-1">
                                <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: item.color.hex }} />
                                <span className="text-[10px] text-neutral-400 font-outfit">
                                  {isAr ? item.color.nameAr : item.color.nameFr}
                                </span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-neon-orange font-bold text-xs font-outfit">
                            {formatPrice(Number(shoe.price) * item.quantity)}
                          </span>

                          <div className="flex items-center gap-2 bg-neutral-950 rounded-lg p-1 border border-neutral-800">
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-bold text-white w-4 text-center font-outfit">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-800/80 bg-[#0a0a0c]">
                <div className="flex justify-between items-center mb-6">
                  <span className={`text-sm text-neutral-400 ${isAr ? "font-cairo" : "font-outfit"}`}>
                    {isAr ? "المجموع الفرعي" : "Sous-total"}
                  </span>
                  <span className="text-lg font-black text-white font-outfit">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  className={`w-full py-4 rounded-xl bg-neon-lime text-obsidian font-black transition-all duration-300 hover:bg-white flex items-center justify-center gap-2 cursor-pointer ${
                    isAr ? "font-cairo" : "font-outfit uppercase tracking-widest"
                  }`}
                >
                  <CreditCard size={18} />
                  {isAr ? "إتمام الطلب" : "Passer la Commande"}
                </button>
              </div>
            )}
          </>
        )}

        {/* ===== CHECKOUT STEP ===== */}
        {step === "checkout" && (
          <>
            {/* Header with back button */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-800/80">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToCart}
                  className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>
                <h2
                  className={`text-lg font-bold text-white flex items-center gap-2 ${
                    isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"
                  }`}
                >
                  <Package className="text-neon-lime" size={20} />
                  {isAr ? "تفاصيل الطلب" : "Checkout"}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Checkout Form - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Step indicator */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-neon-lime/20 text-neon-lime flex items-center justify-center text-xs font-black font-outfit">1</div>
                  <span className={`text-xs font-bold text-neon-lime ${isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"}`}>
                    {isAr ? "المنتجات" : "Articles"}
                  </span>
                </div>
                <div className="flex-1 h-px bg-neutral-800"></div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-neon-lime/20 text-neon-lime flex items-center justify-center text-xs font-black font-outfit">2</div>
                  <span className={`text-xs font-bold text-neon-lime ${isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"}`}>
                    {isAr ? "التوصيل" : "Livraison"}
                  </span>
                </div>
                <div className="flex-1 h-px bg-neutral-800"></div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-neon-lime/20 text-neon-lime flex items-center justify-center text-xs font-black font-outfit">3</div>
                  <span className={`text-xs font-bold text-neon-lime ${isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"}`}>
                    {isAr ? "التأكيد" : "Confirmer"}
                  </span>
                </div>
              </div>

              {/* ── Order Summary Table ── */}
              <div>
                <label
                  className={`flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 ${
                    isAr ? "font-cairo" : "font-outfit"
                  }`}
                >
                  <ShoppingBag size={12} />
                  {isAr ? "ملخص الطلب" : "RÉSUMÉ DE LA COMMANDE"}
                </label>
                <div className="rounded-2xl border border-neutral-800 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-neutral-900/80 text-neutral-500 text-[10px] uppercase tracking-wider font-outfit">
                      <tr>
                        <th className={`px-4 py-2.5 ${isAr ? "text-right font-cairo" : "text-left"}`}>
                          {isAr ? "المنتج" : "Produit"}
                        </th>
                        <th className={`px-3 py-2.5 text-center ${isAr ? "font-cairo" : ""}`}>
                          {isAr ? "المقاس" : "Taille"}
                        </th>
                        <th className={`px-3 py-2.5 text-center ${isAr ? "font-cairo" : ""}`}>
                          {isAr ? "الكمية" : "Qté"}
                        </th>
                        <th className={`px-4 py-2.5 ${isAr ? "text-left font-cairo" : "text-right"}`}>
                          {isAr ? "السعر" : "Prix"}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60 bg-neutral-950/30">
                      {cart.map((item) => {
                        const shoe = getSneakerDetails(item.sneakerId);
                        return (
                          <tr key={item.id} className="hover:bg-neutral-900/30 transition-colors">
                            <td className={`px-4 py-3 ${isAr ? "font-cairo text-right" : "font-outfit text-left"}`}>
                              <div className="flex items-center gap-2.5">
                                {shoe && (
                                  <div className="w-8 h-8 rounded-lg bg-neutral-900 overflow-hidden flex-shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={shoe.image} alt="" className="w-full h-full object-cover" />
                                  </div>
                                )}
                                <span className="text-white text-xs font-semibold line-clamp-1">
                                  {shoe ? (isAr ? shoe.nameAr : shoe.nameFr) : "—"}
                                </span>
                              </div>
                            </td>
                            <td className="px-3 py-3 text-neutral-400 text-center font-mono text-xs">
                              {item.size}
                            </td>
                            <td className="px-3 py-3 text-neutral-400 text-center font-mono text-xs">
                              x{item.quantity}
                            </td>
                            <td className={`px-4 py-3 text-white font-mono text-xs font-semibold ${isAr ? "text-left" : "text-right"}`}>
                              {formatPrice((shoe?.price || 0) * item.quantity)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ── Customer Details ── */}
              <div>
                <label
                  className={`flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 ${
                    isAr ? "font-cairo" : "font-outfit"
                  }`}
                >
                  <User size={12} />
                  {isAr ? "معلومات الاتصال" : "VOS INFORMATIONS"}
                </label>
                <div className="space-y-3">
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none" />
                    <input
                      type="text"
                      placeholder={isAr ? "الاسم الكامل *" : "Nom complet *"}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      dir={isAr ? "rtl" : "ltr"}
                      className={`w-full bg-neutral-950/80 border border-neutral-800 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neon-lime/50 transition-all ${
                        isAr ? "font-cairo text-right pr-10 pl-4" : "font-outfit"
                      }`}
                    />
                  </div>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder={isAr ? "رقم الهاتف *" : "Numéro de téléphone *"}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      dir="ltr"
                      className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neon-lime/50 transition-all font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* ── Wilaya Delivery Selection ── */}
              <div>
                <label
                  className={`flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 ${
                    isAr ? "font-cairo" : "font-outfit"
                  }`}
                >
                  <MapPin size={12} />
                  {isAr ? "ولاية التوصيل" : "WILAYA DE LIVRAISON"}
                </label>

                {/* Delivery Type Toggle */}
                <div className="flex rounded-xl border border-neutral-800 overflow-hidden mb-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryType("domicile")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold transition-all cursor-pointer ${
                      deliveryType === "domicile"
                        ? "bg-neon-lime/15 text-neon-lime border-r border-neon-lime/30"
                        : "bg-neutral-950/80 text-neutral-500 border-r border-neutral-800 hover:text-white"
                    } ${isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"}`}
                  >
                    🏠
                    <span>{isAr ? "إلى المنزل" : "À Domicile"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType("bureau")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold transition-all cursor-pointer ${
                      deliveryType === "bureau"
                        ? "bg-neon-orange/15 text-neon-orange"
                        : "bg-neutral-950/80 text-neutral-500 hover:text-white"
                    } ${isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"}`}
                  >
                    🏢
                    <span>{isAr ? "إلى المكتب" : "Au Bureau"}</span>
                  </button>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full flex items-center justify-between bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 text-sm font-semibold text-white rounded-xl py-3.5 px-4 cursor-pointer transition-all ${
                      isAr ? "font-cairo flex-row-reverse" : "font-outfit"
                    }`}
                  >
                    <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                      <Truck size={16} className="text-neon-lime/70" />
                      <span className="text-sm">
                        {selectedWilaya ? (isAr ? selectedWilaya.nameAr : selectedWilaya.nameFr) : "Select Wilaya"}
                        <span className="text-neutral-500 ml-1.5 text-xs">(+{formatPrice(deliveryFee)})</span>
                      </span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-neutral-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl">
                      <div className="p-2 border-b border-neutral-800">
                        <input
                          type="text"
                          placeholder={isAr ? "ابحث عن ولاية..." : "Chercher une wilaya..."}
                          value={wilayaSearch}
                          onChange={(e) => setWilayaSearch(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-lime/50"
                        />
                      </div>
                      <div className="max-h-40 overflow-y-auto">
                        {filteredWilayas.map((w) => (
                          <button
                            key={w.id}
                            onClick={() => {
                              setSelectedWilayaId(w.id);
                              setIsDropdownOpen(false);
                              setWilayaSearch("");
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-800 transition-colors flex items-center justify-between cursor-pointer ${
                              selectedWilayaId === w.id ? "bg-neon-lime/10 text-neon-lime" : "text-white"
                            }`}
                          >
                            <span className={isAr ? "font-cairo" : "font-outfit"}>
                              {isAr ? w.nameAr : w.nameFr}
                            </span>
                            <span className="text-neutral-500 text-xs font-mono">
                              +{formatPrice(deliveryType === "bureau" ? w.feeBureau : w.feeDomicile)}
                            </span>
                          </button>
                        ))}
                        {filteredWilayas.length === 0 && (
                          <div className="p-4 text-center text-sm text-neutral-500">
                            {isAr ? "لا نتائج" : "Aucun résultat"}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Price Summary Box ── */}
              <div className="rounded-2xl bg-neutral-900/50 border border-neutral-800 p-5 space-y-3">
                <div className="flex justify-between items-center text-sm text-neutral-400 font-outfit">
                  <span>{isAr ? "المجموع الفرعي:" : "Sous-total :"}</span>
                  <span className="font-mono text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-neutral-400 font-outfit">
                  <span className="flex items-center gap-1.5">
                    <Truck size={12} className="text-neon-orange" />
                    {isAr ? "التوصيل:" : "Livraison :"}
                  </span>
                  <span className="font-mono text-neon-orange font-bold">+{formatPrice(deliveryFee)}</span>
                </div>
                <div className="h-px bg-neutral-800"></div>
                <div className="flex justify-between items-center text-lg text-white font-black font-outfit">
                  <span>{isAr ? "الإجمالي:" : "Total :"}</span>
                  <span className="font-mono text-neon-lime">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Error message */}
              {orderError && (
                <div
                  className={`text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3 ${
                    isAr ? "font-cairo text-right" : "font-outfit"
                  }`}
                >
                  {orderError}
                </div>
              )}
            </div>

            {/* Checkout Footer CTAs */}
            <div className="p-6 border-t border-neutral-800/80 bg-[#0a0a0c] space-y-3">
              {/* Main CTA */}
              <button
                onClick={handlePlaceOrder}
                className={`flex items-center justify-center gap-2.5 w-full rounded-xl bg-neon-lime hover:bg-white text-obsidian py-4 font-black transition-all duration-300 hover:scale-[1.01] shadow-lg shadow-neon-lime/15 cursor-pointer ${
                  isAr ? "font-cairo" : "font-outfit uppercase tracking-wider"
                }`}
              >
                <Check size={18} />
                <span>{isAr ? "تأكيد الطلب" : "Confirmer la Commande"}</span>
              </button>

              {/* OR divider */}
              <div className="relative flex items-center justify-center my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-800"></div>
                </div>
                <span
                  className={`relative bg-[#0a0a0c] px-3 text-[10px] text-neutral-600 uppercase tracking-widest ${
                    isAr ? "font-cairo" : "font-outfit"
                  }`}
                >
                  {isAr ? "أو عبر" : "OU VIA"}
                </span>
              </div>

              {/* WhatsApp Only */}
              <div className="flex flex-col gap-2.5">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-[#25D366]/15 text-[#25D366] border border-neutral-800 hover:border-[#25D366]/40 py-3 font-bold transition-all cursor-pointer ${
                    isAr ? "font-cairo text-[11px]" : "font-outfit text-xs"
                  }`}
                >
                  <MessageSquare size={14} fill="currentColor" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
