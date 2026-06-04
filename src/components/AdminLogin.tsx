"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { Key, Eye, EyeOff, ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const AdminLogin: React.FC = () => {
  const { loginAdmin, language } = useStore();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAr = language === "ar";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const success = loginAdmin(password);
    if (!success) {
      setError(
        isAr 
          ? "مفتاح الأمان غير صحيح. يرجى المحاولة مرة أخرى." 
          : "Clé de sécurité incorrecte. Veuillez réessayer."
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 animate-fadeIn">
      {/* Back button */}
      <div className="mb-6 flex justify-start rtl:justify-end">
        <Link
          href="/"
          className={`flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-white transition-colors uppercase tracking-wider ${isAr ? 'font-cairo' : 'font-outfit'}`}
        >
          {isAr ? <><ArrowLeft size={14} className="rotate-180" /> العودة للمتجر</> : <><ArrowLeft size={14} /> Retour à l'accueil</>}
        </Link>
      </div>

      {/* Glassmorphic Auth Container */}
      <div className="relative rounded-3xl border border-neutral-800 bg-asphalt/65 backdrop-blur-xl p-8 overflow-hidden shadow-2xl">
        
        {/* Neon Orange glow effect top */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-neon-orange to-transparent"></div>

        {/* Title Lock Indicator */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-4 bg-neon-orange/10 text-neon-orange rounded-2xl mb-4 border border-neon-orange/20 animate-pulse">
            <Key size={26} />
          </div>
          <h2 className={`text-2xl font-black text-white ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wide'}`}>
            {isAr ? "الولوج المسؤول" : "SECURE ENTRY"}
          </h2>
          <p className={`text-xs text-neutral-400 mt-1.5 leading-relaxed max-w-[280px] ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr 
              ? "يرجى إدخال مفتاح أمان المشرف للوصول إلى لوحة التحكم." 
              : "Please input the developer security credentials to unlock dashboard variables."}
          </p>
        </div>

        {/* Form panel */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={`block text-[10px] font-black uppercase text-neutral-400 tracking-wider mb-2 ${isAr ? 'font-cairo text-right' : 'font-outfit'}`}>
              {isAr ? "مفتاح أمان الإدارة" : "ADMIN SECURITY KEY"}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isAr ? "أدخل المفتاح هنا..." : "Input security key..."}
                className={`w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neon-orange/70 focus:ring-1 focus:ring-neon-orange/30 transition-all ${
                  isAr ? 'text-right font-cairo' : 'font-mono'
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-neutral-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Validation Alert */}
          {error && (
            <div className="flex items-start gap-2.5 rounded-xl border border-red-500/25 bg-red-500/5 p-3.5 text-xs text-red-400">
              <ShieldAlert size={16} className="flex-shrink-0 mt-0.5" />
              <span className={isAr ? 'font-cairo text-right' : 'font-outfit'}>{error}</span>
            </div>
          )}

          {/* Submit Trigger */}
          <button
            type="submit"
            className={`w-full py-4 rounded-xl bg-neon-orange hover:bg-white text-white hover:text-obsidian font-extrabold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-neon-orange/10 cursor-pointer ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wider'}`}
          >
            {isAr ? "تأكيد مفتاح الولوج" : "Validate Entry Key"}
          </button>
        </form>

        {/* Demo Hint */}
        <div className="mt-8 text-center border-t border-neutral-900 pt-5">
          <p className="text-[10px] font-mono text-neutral-600">
            Key Hint: AdminShoes2026
          </p>
        </div>

      </div>
    </div>
  );
};
