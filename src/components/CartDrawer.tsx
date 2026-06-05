"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { ContactModal } from "./ContactModal";

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, sneakers, updateCartQuantity, removeFromCart, language } = useStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
  const isAr = language === "ar";

  if (!isCartOpen) return null;

  const getSneakerDetails = (sneakerId: string) => {
    return sneakers.find((s) => s.id === sneakerId);
  };

  const subtotal = cart.reduce((total, item) => {
    const shoe = getSneakerDetails(item.sneakerId);
    return total + (shoe?.price || 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
        
        {/* Drawer */}
        <div className={`relative w-full max-w-md h-full bg-[#0a0a0c] border-l border-neutral-800 shadow-2xl flex flex-col transform transition-transform duration-300 ${isAr ? 'border-r border-l-0' : ''}`}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-800/80">
            <h2 className={`text-xl font-bold text-white flex items-center gap-2 ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wider'}`}>
              <ShoppingBag className="text-neon-lime" size={20} />
              {isAr ? "سلة التسوق" : "Your Cart"}
            </h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-neutral-500 space-y-4">
                <ShoppingBag size={48} className="opacity-20" />
                <p className={`text-sm ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                  {isAr ? "السلة فارغة حالياً" : "Your cart is currently empty."}
                </p>
              </div>
            ) : (
              cart.map((item) => {
                const shoe = getSneakerDetails(item.sneakerId);
                if (!shoe) return null;

                return (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/60">
                    <div className="w-20 h-20 rounded-xl bg-neutral-950 overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={shoe.image} alt={shoe.nameFr} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`text-sm font-bold text-white line-clamp-1 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                            {isAr ? shoe.nameAr : shoe.nameFr}
                          </h3>
                          <p className="text-[10px] text-neutral-500 font-outfit uppercase mt-0.5">
                            Size: {item.size}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-neon-orange font-bold text-xs font-outfit">
                          {Math.round(Number(shoe.price) * item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} DA
                        </span>

                        <div className="flex items-center gap-2 bg-neutral-950 rounded-lg p-1 border border-neutral-800">
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-bold text-white w-4 text-center font-outfit">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
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
                <span className={`text-sm text-neutral-400 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                  {isAr ? "المجموع الفرعي" : "Subtotal"}
                </span>
                <span className="text-lg font-black text-white font-outfit">
                  {Math.round(subtotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} DA
                </span>
              </div>
              
              <button
                onClick={handleCheckout}
                className={`w-full py-4 rounded-xl bg-neon-lime text-obsidian font-black transition-all duration-300 hover:bg-white flex items-center justify-center gap-2 ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-widest'}`}
              >
                {isAr ? "إتمام الطلب" : "Proceed to Checkout"}
              </button>
            </div>
          )}
        </div>
      </div>

      <ContactModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  );
};
