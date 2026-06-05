"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { X, MessageSquare, Mail, ShoppingCart, Check, Truck, ChevronDown } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { language, contactConfig, wilayaFees, cart, sneakers, addLead, clearCart } = useStore();
  const [selectedWilayaId, setSelectedWilayaId] = useState<string>(wilayaFees[0]?.id || "16");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [wilayaSearch, setWilayaSearch] = useState<string>("");
  
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState("");

  const isAr = language === "ar";

  if (!isOpen) return null;

  // Selected Wilaya calculations
  const filteredWilayas = wilayaFees.filter(w => 
    w.nameFr.toLowerCase().includes(wilayaSearch.toLowerCase()) || 
    w.nameAr.includes(wilayaSearch) ||
    w.id.includes(wilayaSearch)
  );

  const selectedWilaya = wilayaFees.find(w => w.id === selectedWilayaId) || wilayaFees[0];
  const deliveryFee = selectedWilaya ? selectedWilaya.fee : 0;
  
  const getSneakerDetails = (sneakerId: string) => {
    return sneakers.find((s) => s.id === sneakerId);
  };

  const cartSubtotal = cart.reduce((total, item) => {
    const shoe = getSneakerDetails(item.sneakerId);
    return total + (shoe?.price || 0) * item.quantity;
  }, 0);

  const grandTotal = cartSubtotal + deliveryFee;

  const formatPrice = (price: number) => {
    const safe = Math.round(Number(price) || 0);
    const formatted = safe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return isAr ? `${formatted} د.ج` : `${formatted} DA`;
  };

  const getWilayaName = (id: string) => {
    const w = wilayaFees.find(x => x.id === id);
    return w ? (isAr ? w.nameAr : w.nameFr) : id;
  };

  const cartSummaryText = cart.map(item => {
    const shoe = getSneakerDetails(item.sneakerId);
    const name = shoe ? (isAr ? shoe.nameAr : shoe.nameFr) : "Unknown Shoe";
    return `- ${name} (Size: ${item.size}, Qty: ${item.quantity})`;
  }).join("\n");

  const getWhatsAppLink = () => {
    const phone = contactConfig.whatsapp.replace(/\+/g, "");
    const wilayaStr = selectedWilaya ? (isAr ? `التوصيل إلى ${selectedWilaya.nameAr}` : `Livraison vers ${selectedWilaya.nameFr}`) : "";
    
    const textFr = `Bonjour, je souhaite passer la commande suivante :\n${cartSummaryText}\n\n${wilayaStr} (+${formatPrice(deliveryFee)}).\n*Total: ${formatPrice(grandTotal)}*.`;
    const textAr = `مرحباً، أود تقديم الطلب التالي:\n${cartSummaryText}\n\n${wilayaStr} (+${formatPrice(deliveryFee)}).\n*الإجمالي: ${formatPrice(grandTotal)}*.`;
    
    const text = encodeURIComponent(isAr ? textAr : textFr);
    return `https://wa.me/${phone}?text=${text}`;
  };

  const getEmailLink = () => {
    const subjectFr = `Nouvelle Commande Showcase`;
    const subjectAr = `طلب شراء جديد`;
    const wilayaStr = selectedWilaya ? `Wilaya: ${selectedWilaya.nameFr} (+${formatPrice(deliveryFee)})` : "";
    
    const bodyFr = `Bonjour,\n\nJe souhaite passer la commande suivante:\n${cartSummaryText}\n\n- ${wilayaStr}\n\n*Total de la commande: ${formatPrice(grandTotal)}*\n\nMerci de me recontacter pour finaliser l'achat.`;
    const bodyAr = `مرحباً،\n\nأود طلب الآتي:\n${cartSummaryText}\n\n- ${wilayaStr}\n\n*الإجمالي: ${formatPrice(grandTotal)}*\n\nشكراً لكم.`;

    const subject = encodeURIComponent(isAr ? subjectAr : subjectFr);
    const body = encodeURIComponent(isAr ? bodyAr : bodyFr);
    return `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
  };

  const copyDetails = () => {
    const text = `Order Details:\n${cartSummaryText}\nDelivery: ${getWilayaName(selectedWilayaId)}\nTotal: ${formatPrice(grandTotal)}`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePlaceOrder = () => {
    setOrderError("");
    if (cart.length === 0) {
      setOrderError(isAr ? "السلة فارغة." : "Your cart is empty.");
      return;
    }
    if (!customerName.trim() || !phoneNumber.trim()) {
      setOrderError(isAr ? "الرجاء إدخال الاسم ورقم الهاتف." : "Please enter your name and phone number.");
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
    setOrderSuccess(true);
  };

  if (orderSuccess) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md animate-fadeIn">
        <div className="w-full max-w-md rounded-3xl border border-neon-lime/30 bg-[#0d0d11] p-8 shadow-2xl shadow-neon-lime/10 text-center">
          <div className="w-16 h-16 mx-auto bg-neon-lime/20 text-neon-lime rounded-full flex items-center justify-center mb-6">
            <Check size={32} />
          </div>
          <h3 className={`text-2xl font-black text-white mb-2 ${isAr ? 'font-cairo' : 'font-outfit uppercase'}`}>
            {isAr ? "تم استلام طلبك بنجاح!" : "ORDER RECEIVED!"}
          </h3>
          <p className={`text-neutral-400 mb-8 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr 
              ? "شكراً لك! سيتواصل معك فريقنا قريباً لتأكيد الطلب وترتيب التوصيل."
              : "Thank you! Our team will contact you shortly to confirm the order and arrange delivery."}
          </p>
          <button
            onClick={() => {
              setOrderSuccess(false);
              onClose();
            }}
            className="w-full py-4 rounded-2xl bg-white text-obsidian font-black text-sm uppercase tracking-wider transition-all hover:bg-neutral-200 font-outfit"
          >
            {isAr ? "إغلاق" : "Close"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* Container Card */}
      <div className="relative w-full max-w-xl max-h-[95vh] rounded-3xl border border-neutral-800 bg-[#0d0d11] p-5 sm:p-6 overflow-y-auto shadow-2xl scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent my-auto">
        
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

        {/* Order Summary Table */}
        <div className="mb-6 rounded-2xl border border-neutral-800 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-900/80 text-neutral-400 text-[10px] uppercase tracking-wider font-outfit">
              <tr>
                <th className={`px-4 py-3 ${isAr ? 'text-right font-cairo' : 'text-left'}`}>{isAr ? "المنتج" : "Product"}</th>
                <th className={`px-4 py-3 text-center ${isAr ? 'font-cairo' : ''}`}>{isAr ? "المقاس" : "Size"}</th>
                <th className={`px-4 py-3 text-center ${isAr ? 'font-cairo' : ''}`}>{isAr ? "الكمية" : "Qty"}</th>
                <th className={`px-4 py-3 ${isAr ? 'text-left font-cairo' : 'text-right'}`}>{isAr ? "السعر" : "Price"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800 bg-neutral-950/50">
              {cart.map((item) => {
                const shoe = getSneakerDetails(item.sneakerId);
                return (
                  <tr key={item.id} className="hover:bg-neutral-900/50 transition-colors">
                    <td className={`px-4 py-3 text-white font-semibold ${isAr ? 'font-cairo text-right' : 'font-outfit text-left'}`}>
                      {shoe ? (isAr ? shoe.nameAr : shoe.nameFr) : "Item"}
                    </td>
                    <td className="px-4 py-3 text-neutral-400 text-center font-mono text-xs">{item.size}</td>
                    <td className="px-4 py-3 text-neutral-400 text-center font-mono text-xs">x{item.quantity}</td>
                    <td className={`px-4 py-3 text-white font-mono text-xs ${isAr ? 'text-left' : 'text-right'}`}>
                      {formatPrice((shoe?.price || 0) * item.quantity)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Delivery Wilaya Selection */}
        <div className="mb-6 relative">
          <label className={`block text-xs font-bold text-neutral-400 mb-2 uppercase tracking-wider ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr ? "ولاية التوصيل:" : "DELIVERY DESTINATION:"}
          </label>
          <div className="relative group">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`w-full flex items-center justify-between bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 text-sm font-semibold text-white rounded-2xl py-3.5 px-4 cursor-pointer shadow-inner transition-all ${isAr ? 'font-cairo flex-row-reverse' : 'font-outfit'}`}
            >
              <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
                <Truck size={16} className="text-neon-lime/70" />
                <span>
                  {selectedWilaya ? (isAr ? selectedWilaya.nameAr : selectedWilaya.nameFr) : "Select Wilaya"} 
                  <span className="text-neutral-500 ml-1">(+{formatPrice(deliveryFee)})</span>
                </span>
              </div>
              <ChevronDown size={16} className={`text-neutral-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-2 border-b border-neutral-800">
                  <input 
                    type="text" 
                    placeholder={isAr ? "ابحث عن ولاية..." : "Search wilaya..."}
                    value={wilayaSearch}
                    onChange={(e) => setWilayaSearch(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-lime/50"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                  {filteredWilayas.map((w) => (
                    <button
                      key={w.id}
                      onClick={() => {
                        setSelectedWilayaId(w.id);
                        setIsDropdownOpen(false);
                        setWilayaSearch("");
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-neutral-800 transition-colors flex items-center justify-between ${selectedWilayaId === w.id ? 'bg-neon-lime/10 text-neon-lime' : 'text-white'}`}
                    >
                      <span className={isAr ? 'font-cairo' : 'font-outfit'}>{isAr ? w.nameAr : w.nameFr}</span>
                      <span className="text-neutral-500 text-xs font-mono">+{formatPrice(w.fee)}</span>
                    </button>
                  ))}
                  {filteredWilayas.length === 0 && (
                    <div className="p-4 text-center text-sm text-neutral-500">No results found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Price Summary - Bigger Design */}
        <div className="mb-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 p-5 space-y-3">
          <div className="flex justify-between items-center text-sm text-neutral-400 font-outfit">
            <span>Subtotal:</span>
            <span className="font-mono text-white">{formatPrice(cartSubtotal)}</span>
          </div>
          <div className="flex justify-between items-center text-sm text-neutral-400 font-outfit">
            <span>Delivery Fee <span className="text-[10px]">({getWilayaName(selectedWilayaId)})</span>:</span>
            <span className="font-mono text-neon-orange font-bold">+{formatPrice(deliveryFee)}</span>
          </div>
          <div className="flex justify-between items-center text-xl text-white font-black border-t border-neutral-800 pt-3 mt-1 font-outfit">
            <span>Grand Total:</span>
            <span className="font-mono text-neon-lime">{formatPrice(grandTotal)}</span>
          </div>
        </div>

        {/* Customer Details */}
        <div className="mb-6 space-y-4 border-t border-neutral-900 pt-5">
          <label className={`block text-xs font-bold text-neutral-400 uppercase tracking-wider ${isAr ? 'font-cairo text-right' : 'font-outfit'}`}>
            {isAr ? "معلومات الاتصال:" : "CONTACT INFO:"}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input 
                type="text" 
                placeholder={isAr ? "الاسم الكامل *" : "Full Name *"}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                dir={isAr ? "rtl" : "ltr"}
                className={`w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-lime/60 transition-all ${isAr ? 'font-cairo text-right' : 'font-outfit'}`}
              />
            </div>
            <div>
              <input 
                type="tel" 
                placeholder={isAr ? "رقم الهاتف *" : "Phone Number *"}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                dir="ltr"
                className={`w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-lime/60 transition-all font-mono text-left ${isAr ? 'text-right' : ''}`}
              />
            </div>
          </div>
          {orderError && (
            <div className={`text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5 mt-2 ${isAr ? 'font-cairo text-right' : 'font-outfit'}`}>
              {orderError}
            </div>
          )}
        </div>

        {/* Order CTA Buttons */}
        <div className="space-y-3.5">
          {/* Main Direct Order CTA */}
          <button
            onClick={handlePlaceOrder}
            className={`flex items-center justify-center gap-3 w-full rounded-2xl bg-neon-lime hover:bg-white text-obsidian py-4 font-black transition-all hover:scale-[1.02] shadow-lg shadow-neon-lime/20 cursor-pointer ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wider'}`}
          >
            <Check size={18} />
            <span>{isAr ? "تأكيد الطلب الآن" : "PLACE ORDER NOW"}</span>
          </button>
          
          <div className="text-center my-3 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-800"></div></div>
            <span className={`relative bg-[#0d0d11] px-3 text-[10px] text-neutral-500 uppercase tracking-widest ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr ? "أو يمكنك الطلب عبر" : "OR ORDER VIA"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-[#25D366]/20 text-[#25D366] border border-neutral-800 hover:border-[#25D366]/50 py-3 font-bold transition-all cursor-pointer ${isAr ? 'font-cairo text-[11px]' : 'font-outfit text-xs'}`}
            >
              <MessageSquare size={14} fill="currentColor" />
              <span>WhatsApp</span>
            </a>

            {/* Email CTA */}
            <a
              href={getEmailLink()}
              className={`flex items-center justify-center gap-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 py-3 font-bold transition-all cursor-pointer ${isAr ? 'font-cairo text-[11px]' : 'font-outfit text-xs'}`}
            >
              <Mail size={14} />
              <span>Email</span>
            </a>
          </div>

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
                <span>{isAr ? "نسخ تفاصيل المنتج للمشاركة" : "Copier les détails de la commande"}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
