"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../context/StoreContext";
import { Globe, Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const { language, setLanguage } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isAr = language === "ar";
  const isAdminPage = pathname?.includes("/admin");

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "ar" : "fr");
  };

  const navItems = [
    { nameFr: "Collection", nameAr: "المجموعة", href: "#collection" },
    { nameFr: "Féguments", nameAr: "الفئات", href: "#categories" },
    { nameFr: "Nous contacter", nameAr: "تواصل معنا", href: "#contact" }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-800/70 bg-obsidian/75 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-lime opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-lime"></span>
              </span>
              <span className={`text-xl font-black uppercase tracking-wider text-white group-hover:text-neon-lime transition-colors duration-300 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
                {isAr ? "أوبسيديان" : "Obsidian"}{" "}
                <span className="text-neon-lime group-hover:text-white transition-colors duration-300">
                  {isAr ? "سنيكرز" : "SNKRS"}
                </span>
              </span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          {!isAdminPage && (
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-semibold tracking-wide text-neutral-400 hover:text-white transition-colors duration-200 ${isAr ? 'font-cairo' : 'font-outfit uppercase'}`}
                >
                  {isAr ? item.nameAr : item.nameFr}
                </a>
              ))}
            </div>
          )}

          {/* Right Action Elements */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher Widget */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 text-xs font-bold text-white hover:border-neon-lime/50 transition-all duration-300 group"
            >
              <Globe size={14} className="text-neon-lime group-hover:rotate-45 transition-transform duration-300" />
              <span className="font-outfit uppercase">
                {language === "fr" ? "العربية (AR)" : "Français (FR)"}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-2 text-neutral-400 hover:text-white"
              title="Toggle Language"
            >
              <Globe size={18} className="text-neon-lime" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-2 text-neutral-400 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800/80 bg-obsidian/95 backdrop-blur-lg px-4 py-4 space-y-3 animate-fadeIn">
          {!isAdminPage && navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block rounded-lg px-4 py-2.5 text-base font-semibold text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all ${isAr ? 'font-cairo text-right' : 'font-outfit uppercase'}`}
            >
              {isAr ? item.nameAr : item.nameFr}
            </a>
          ))}
          {/* Admin link removed */}
        </div>
      )}
    </nav>
  );
};
