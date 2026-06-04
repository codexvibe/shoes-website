"use client";

import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { 
  Database, 
  Activity, 
  Trash2, 
  Plus, 
  Globe, 
  Check, 
  Settings, 
  Phone, 
  Mail, 
  LogOut 
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const { 
    categories, 
    addCategory, 
    deleteCategory, 
    sneakers, 
    language, 
    logoutAdmin,
    contactConfig,
    setContactConfig 
  } = useStore();

  const isAr = language === "ar";

  // Form states for Category
  const [nameFr, setNameFr] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [descFr, setDescFr] = useState("");
  const [descAr, setDescAr] = useState("");
  const [slug, setSlug] = useState("");
  
  // Settings edit states
  const [whatsapp, setWhatsapp] = useState(contactConfig.whatsapp);
  const [email, setEmail] = useState(contactConfig.email);
  const [showSettingsSaved, setShowSettingsSaved] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<boolean>(false);

  // Automatically update slug when typing French name
  const handleNameFrChange = (val: string) => {
    setNameFr(val);
    // Generate clean URL slug
    const cleanSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-") // replace spaces with hyphens
      .replace(/-+/g, "-") // collapse repeat hyphens
      .trim();
    setSlug(cleanSlug);
  };

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    if (!nameFr || !nameAr || !descFr || !descAr || !slug) {
      setFormError(isAr ? "يرجى ملء جميع الحقول المطلوبة." : "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Check for duplicate slug
    const exists = categories.some(cat => cat.slug === slug);
    if (exists) {
      setFormError(isAr ? "الاسم الرمزي (Slug) موجود بالفعل. يرجى اختيار اسم فرنسي آخر." : "Le slug existe déjà. Veuillez choisir un autre titre.");
      return;
    }

    addCategory({
      slug,
      nameFr,
      nameAr,
      descFr,
      descAr
    });

    // Clear form
    setNameFr("");
    setNameAr("");
    setDescFr("");
    setDescAr("");
    setSlug("");
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setContactConfig({ whatsapp, email });
    setShowSettingsSaved(true);
    setTimeout(() => setShowSettingsSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Dashboard Top Header & Logout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white font-outfit uppercase tracking-wider flex items-center gap-2">
            <span className="h-6 w-[3px] bg-neon-lime rounded-full inline-block"></span>
            {isAr ? "لوحة الإدارة والمراقبة" : "ADMIN WORKSPACE"}
          </h1>
          <p className={`text-xs text-neutral-400 mt-1 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr 
              ? "تحكم في الفئات وقنوات الاتصال بمرونة وسلاسة." 
              : "Direct configuration of category models and direct communication channels."}
          </p>
        </div>
        <button
          onClick={logoutAdmin}
          className={`self-start sm:self-center flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-red-500/10 hover:border-red-500/40 text-neutral-400 hover:text-red-400 px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${isAr ? 'font-cairo' : 'font-outfit uppercase tracking-wider'}`}
        >
          <LogOut size={14} />
          <span>{isAr ? "خروج المشرف" : "Exit Console"}</span>
        </button>
      </div>

      {/* 1. Live Stats Monitoring Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        {/* Metric 1: Total Shoes */}
        <div className="rounded-2xl border border-neutral-800/80 bg-asphalt/50 backdrop-blur-md p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block font-outfit">
              Total Sneakers
            </span>
            <span className="text-2xl font-black text-white font-outfit mt-1 block">
              {sneakers.length}
            </span>
          </div>
          <div className="p-3 bg-neon-lime/10 text-neon-lime rounded-xl">
            <Database size={18} />
          </div>
        </div>

        {/* Metric 2: Total Categories */}
        <div className="rounded-2xl border border-neutral-800/80 bg-asphalt/50 backdrop-blur-md p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block font-outfit">
              Active Categories
            </span>
            <span className="text-2xl font-black text-white font-outfit mt-1 block">
              {categories.length}
            </span>
          </div>
          <div className="p-3 bg-cyan-400/10 text-cyan-400 rounded-xl">
            <Settings size={18} />
          </div>
        </div>

        {/* Metric 3: Localization Status */}
        <div className="rounded-2xl border border-neutral-800/80 bg-asphalt/50 backdrop-blur-md p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block font-outfit">
              Localization
            </span>
            <span className="text-sm font-black text-neon-lime font-outfit mt-2 block flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-neon-lime animate-ping"></span>
              BILINGUAL (FR/AR)
            </span>
          </div>
          <div className="p-3 bg-neon-lime/10 text-neon-lime rounded-xl">
            <Globe size={18} />
          </div>
        </div>

        {/* Metric 4: Platform Health */}
        <div className="rounded-2xl border border-neutral-800/80 bg-asphalt/50 backdrop-blur-md p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block font-outfit">
              Platform Health
            </span>
            <span className="text-sm font-black text-emerald-400 font-outfit mt-2 block flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              OPERATIONAL
            </span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Activity size={18} />
          </div>
        </div>

      </div>

      {/* 2. Dual-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Left Column: Input Form (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* New Category Box */}
          <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <Plus size={18} className="text-neon-lime" />
              {isAr ? "إضافة فئة أحذية جديدة" : "Add Basket Category"}
            </h2>

            <form onSubmit={handleCategorySubmit} className="space-y-5">
              
              {/* Bilingual Side-by-Side Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* French name (LTR) */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                    Name (French) *
                  </label>
                  <input
                    type="text"
                    value={nameFr}
                    onChange={(e) => handleNameFrChange(e.target.value)}
                    placeholder="e.g. Running Performance"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all font-outfit"
                    required
                  />
                </div>

                {/* Arabic name (RTL) */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 text-right font-cairo">
                    الاسم (بالعربية) *
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={nameAr}
                    onChange={(e) => setNameAr(e.target.value)}
                    placeholder="مثال: أحذية جري أداء"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all text-right font-cairo"
                    required
                  />
                </div>
              </div>

              {/* Technical Monospace Slug display */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                  URL Slug (Autogenerated)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="slug-value-auto"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-neutral-500 placeholder-neutral-700 focus:outline-none font-mono"
                  readOnly
                />
              </div>

              {/* Bilingual Descriptions */}
              <div className="space-y-4">
                {/* French Description (LTR) */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                    Description (French) *
                  </label>
                  <textarea
                    rows={3}
                    value={descFr}
                    onChange={(e) => setDescFr(e.target.value)}
                    placeholder="French summary of category comfort & performance parameters..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all font-outfit resize-none"
                    required
                  />
                </div>

                {/* Arabic Description (RTL) */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 text-right font-cairo">
                    الوصف (بالعربية) *
                  </label>
                  <textarea
                    rows={3}
                    dir="rtl"
                    value={descAr}
                    onChange={(e) => setDescAr(e.target.value)}
                    placeholder="وصف تفصيلي للفئة وميزات الراحة والدعم باللغة العربية..."
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all text-right font-cairo resize-none"
                    required
                  />
                </div>
              </div>

              {/* Status responses */}
              {formError && (
                <div className="text-xs text-red-400 border border-red-500/20 bg-red-500/5 rounded-xl p-3.5">
                  {formError}
                </div>
              )}

              {formSuccess && (
                <div className="flex items-center gap-2 text-xs text-neon-lime border border-neon-lime/20 bg-neon-lime/5 rounded-xl p-3.5">
                  <Check size={14} />
                  <span>{isAr ? "تمت إضافة الفئة بنجاح!" : "Catégorie ajoutée avec succès !"}</span>
                </div>
              )}

              {/* Submit Action */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-neon-lime hover:bg-white text-obsidian font-black text-xs uppercase tracking-wider transition-all hover:scale-[1.01] neon-glow-lime cursor-pointer font-outfit"
              >
                {isAr ? "حفظ الفئة الجديدة" : "Register Category"}
              </button>

            </form>
          </div>

          {/* Contact settings widget */}
          <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6">
            <h2 className="text-base font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <Settings size={16} className="text-neon-orange" />
              {isAr ? "قنوات التواصل مع المشرف" : "Shop Contact Channels"}
            </h2>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">
                  WhatsApp Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 text-neutral-500" size={14} />
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+212612345678"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-4 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-orange/60 transition-all font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">
                  Owner Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 text-neutral-500" size={14} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="owner@store.com"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-4 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-orange/60 transition-all font-mono"
                    required
                  />
                </div>
              </div>

              {showSettingsSaved && (
                <div className="text-[10px] text-neon-orange bg-neon-orange/5 border border-neon-orange/20 rounded-lg p-2.5 flex items-center gap-1.5">
                  <Check size={12} />
                  <span>{isAr ? "تم حفظ التغييرات بنجاح!" : "Paramètres de contact enregistrés !"}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl border border-neutral-800 hover:border-neon-orange/45 text-xs text-neutral-300 hover:text-neon-orange transition-all cursor-pointer font-outfit uppercase tracking-widest"
              >
                {isAr ? "تحديث قنوات الاتصال" : "Update Channels"}
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Data Table Matrix (7 Cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8 h-full flex flex-col justify-between">
            
            <div>
              <div className="flex items-center justify-between border-b border-neutral-900 pb-5 mb-6">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Database size={18} className="text-cyan-400" />
                  {isAr ? "سجل فئات الأحذية الحالية" : "Category Database"}
                </h2>
                <span className="rounded-md bg-neutral-900 border border-neutral-800 px-2.5 py-1 text-[10px] font-mono text-neutral-400">
                  SCHEMA_V1
                </span>
              </div>

              {/* Real-time Category Matrix Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-neutral-900 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                      <th className="py-3 px-4 font-outfit">{isAr ? "الفئة (عربي / فرنسي)" : "Category (FR / AR)"}</th>
                      <th className="py-3 px-4 font-outfit">URL Slug</th>
                      <th className="py-3 px-4 text-center font-outfit">{isAr ? "إجراء" : "Actions"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900/50">
                    {categories.map((cat) => (
                      <tr 
                        key={cat.id} 
                        className="text-xs text-neutral-300 hover:bg-neutral-900/20 transition-colors"
                      >
                        {/* Name (FR/AR) */}
                        <td className="py-4.5 px-4">
                          <div className="font-bold text-white">{cat.nameFr}</div>
                          <div className="text-[10px] text-neutral-500 mt-1 font-cairo text-right rtl:text-left">{cat.nameAr}</div>
                        </td>

                        {/* Monospace URL Slug */}
                        <td className="py-4.5 px-4 font-mono text-neutral-400 text-[11px] tracking-tight">
                          /{cat.slug}
                        </td>

                        {/* Deletion action */}
                        <td className="py-4.5 px-4 text-center">
                          <button
                            onClick={() => {
                              if (confirm(isAr ? `هل أنت متأكد من حذف فئة "${cat.nameAr}"؟` : `Supprimer la catégorie "${cat.nameFr}" ?`)) {
                                deleteCategory(cat.slug);
                              }
                            }}
                            className="p-2 rounded-xl text-neutral-500 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer inline-flex items-center justify-center"
                            title="Delete category"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Matrix Footer status message */}
            <div className="mt-8 border-t border-neutral-900 pt-5 text-center sm:text-left">
              <p className="text-[10px] text-neutral-500 font-mono">
                * Note: Deleting a category removes it from the customer filters instantly. Standard items remain cached.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
