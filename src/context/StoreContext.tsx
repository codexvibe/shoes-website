"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Category, Sneaker, Lead, WilayaFee, INITIAL_WILAYAS, CartItem } from "../data/mockData";
import { getSupabaseClient } from "../lib/supabaseClient";

export type Language = "fr" | "ar";

interface ContactConfig {
  whatsapp: string;
  email: string;
}

interface DbCategoryRow {
  id: string;
  slug: string;
  name_fr: string;
  name_ar: string;
  desc_fr?: string | null;
  desc_ar?: string | null;
  image?: string | null;
}

interface DbSneakerRow {
  id: string;
  slug: string;
  name_fr: string;
  name_ar: string;
  price: number;
  category_slug: string;
  image?: string | null;
  sizes?: number[] | null;
  sizes_stock?: Sneaker["sizesStock"] | null;
  colorways?: string[] | null;
  desc_fr?: string | null;
  desc_ar?: string | null;
  featured?: boolean | null;
  is_hot_drop?: boolean | null;
  is_new_arrival?: boolean | null;
}

interface DbLeadRow {
  id: string;
  customer_name: string;
  phone_number: string;
  items?: CartItem[] | null;
  wilaya_id: string;
  status: Lead["status"];
  notes?: string | null;
  created_at: string;
  tracking_number?: string | null;
  shipping_provider?: string | null;
  shipped_at?: string | null;
}

interface DbWilayaRow {
  id: string | number;
  name_fr: string;
  name_ar: string;
  fee: number;
}

type AuthSubscription = {
  unsubscribe: () => void;
};

interface StoreContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => void;
  deleteCategory: (slug: string) => void;
  sneakers: Sneaker[];
  addSneaker: (sneaker: Omit<Sneaker, "id">) => void;
  deleteSneaker: (id: string) => void;
  updateSneaker: (id: string, sneaker: Omit<Sneaker, "id">) => void;
  updateStock: (shoeId: string, size: number, quantity: number) => void;
  leads: Lead[];
  addLead: (lead: Omit<Lead, "id" | "createdAt">) => void;
  updateLeadStatus: (id: string, status: Lead["status"]) => void;
  updateLeadTracking: (id: string, updates: Partial<Pick<Lead, "trackingNumber" | "shippingProvider" | "shippedAt">>) => void;
  deleteLead: (id: string) => void;
  wilayaFees: WilayaFee[];
  updateWilayaFee: (id: string, fee: number) => void;
  addWilaya: (wilaya: Omit<WilayaFee, "id">) => void;
  deleteWilaya: (id: string) => void;
  heroBanner: string | null;
  setHeroBanner: (image: string | null) => void;
  isAdmin: boolean;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
  contactConfig: ContactConfig;
  setContactConfig: (config: ContactConfig) => void;
  loading: boolean;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// ── Mapping utilities: snake_case (DB) ↔ camelCase (frontend) ──

function dbCategoryToFrontend(row: DbCategoryRow): Category {
  return {
    id: row.id,
    slug: row.slug,
    nameFr: row.name_fr,
    nameAr: row.name_ar,
    descFr: row.desc_fr || "",
    descAr: row.desc_ar || "",
    image: row.image || undefined,
  };
}

function dbSneakerToFrontend(row: DbSneakerRow): Sneaker {
  return {
    id: row.id,
    slug: row.slug,
    nameFr: row.name_fr,
    nameAr: row.name_ar,
    price: row.price,
    categorySlug: row.category_slug,
    image: row.image || "",
    sizes: row.sizes || [],
    sizesStock: row.sizes_stock || {},
    colorways: row.colorways || [],
    descFr: row.desc_fr || "",
    descAr: row.desc_ar || "",
    featured: row.featured || false,
    isHotDrop: row.is_hot_drop || false,
    isNewArrival: row.is_new_arrival || false,
  };
}

function dbLeadToFrontend(row: DbLeadRow): Lead {
  return {
    id: row.id,
    customerName: row.customer_name,
    phoneNumber: row.phone_number,
    items: row.items || [],
    wilayaId: row.wilaya_id,
    status: row.status,
    notes: row.notes || undefined,
    createdAt: row.created_at,
    trackingNumber: row.tracking_number || undefined,
    shippingProvider: row.shipping_provider || undefined,
    shippedAt: row.shipped_at || undefined,
  };
}

function dbWilayaToFrontend(row: DbWilayaRow): WilayaFee {
  return {
    id: row.id.toString(),
    nameFr: row.name_fr,
    nameAr: row.name_ar,
    fee: row.fee,
  };
}

// ── Provider ──

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("fr");
  const [categories, setCategories] = useState<Category[]>([]);
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [wilayaFees, setWilayaFees] = useState<WilayaFee[]>(INITIAL_WILAYAS);
  const [heroBanner, setHeroBannerState] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [contactConfig, setContactConfigState] = useState<ContactConfig>({
    whatsapp: "+213000000000",
    email: "contact@sneakersobsidian.com",
  });
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const storedCart = window.localStorage.getItem("shoes_cart");
    if (!storedCart) {
      return [];
    }

    try {
      return JSON.parse(storedCart) as CartItem[];
    } catch (error) {
      console.error("Failed to parse cart", error);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart to local storage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shoes_cart", JSON.stringify(cart));
    }
  }, [cart]);

  const supabase = getSupabaseClient();

  // Toggle layout direction automatically when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof document !== "undefined") {
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

  // ── Load all data from Supabase on mount ──
  const loadFromSupabase = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    
    try {
      // Fetch categories
      const { data: catData } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: true });
      if (catData) setCategories(catData.map(dbCategoryToFrontend));

      // Fetch sneakers
      const { data: shoeData } = await supabase
        .from("sneakers")
        .select("*")
        .order("created_at", { ascending: true });
      if (shoeData) setSneakers(shoeData.map(dbSneakerToFrontend));

      // Fetch leads
      const { data: leadData } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (leadData) setLeads(leadData.map(dbLeadToFrontend));

      // Fetch wilaya fees
      const { data: wilayaData } = await supabase
        .from("wilaya_fees")
        .select("*");
      if (wilayaData && wilayaData.length > 0) {
        const sortedWilayas = wilayaData
          .map(dbWilayaToFrontend)
          .sort((a, b) => {
            const numA = parseInt(a.id);
            const numB = parseInt(b.id);
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
            if (!isNaN(numA)) return -1;
            if (!isNaN(numB)) return 1;
            return a.id.localeCompare(b.id);
          });
        setWilayaFees(sortedWilayas);
      }

      // Fetch contact config
      const { data: configData } = await supabase
        .from("contact_config")
        .select("*")
        .eq("id", 1)
        .single();
      if (configData) {
        setContactConfigState({
          whatsapp: configData.whatsapp,
          email: configData.email,
        });
        if (configData.hero_banner) {
          setHeroBannerState(configData.hero_banner);
        }
      }
    } catch (err) {
      console.error("Failed to load from Supabase:", err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadFromSupabase();

      let authListener: AuthSubscription | null = null;
      // Check admin session using Supabase Auth
      if (supabase) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setIsAdmin(!!session);
        });

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setIsAdmin(!!session);
        });
        
        authListener = subscription;
      }

      // Initialize HTML attributes on mount
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;

      // ── Supabase Realtime subscriptions ──
      if (supabase) {
        const channel = supabase
          .channel("store-changes")
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "categories" },
            () => { loadFromSupabase(); }
          )
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "sneakers" },
            () => { loadFromSupabase(); }
          )
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "leads" },
            () => { loadFromSupabase(); }
          )
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "contact_config" },
            () => { loadFromSupabase(); }
          )
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
          if (authListener) authListener.unsubscribe();
        };
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  // ── Categories ──

  const addCategory = async (newCat: Omit<Category, "id">) => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("categories")
      .insert({
        slug: newCat.slug,
        name_fr: newCat.nameFr,
        name_ar: newCat.nameAr,
        desc_fr: newCat.descFr,
        desc_ar: newCat.descAr,
        image: newCat.image || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to add category:", error);
      alert("Failed to add category: " + error.message);
      return;
    }
    if (data) {
      setCategories((prev) => [...prev, dbCategoryToFrontend(data)]);
    }
  };

  const deleteCategory = async (slug: string) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("slug", slug);

    if (error) {
      console.error("Failed to delete category:", error);
      return;
    }
    setCategories((prev) => prev.filter((cat) => cat.slug !== slug));
  };

  // ── Sneakers ──

  const addSneaker = async (newShoe: Omit<Sneaker, "id">) => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("sneakers")
      .insert({
        slug: newShoe.slug,
        name_fr: newShoe.nameFr,
        name_ar: newShoe.nameAr,
        price: newShoe.price,
        category_slug: newShoe.categorySlug,
        image: newShoe.image || null,
        sizes: newShoe.sizes,
        sizes_stock: newShoe.sizesStock,
        colorways: newShoe.colorways,
        desc_fr: newShoe.descFr,
        desc_ar: newShoe.descAr,
        featured: newShoe.featured || false,
        is_hot_drop: newShoe.isHotDrop || false,
        is_new_arrival: newShoe.isNewArrival || false,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to add sneaker:", error);
      alert("Failed to add sneaker: " + error.message);
      return;
    }
    if (data) {
      setSneakers((prev) => [...prev, dbSneakerToFrontend(data)]);
    }
  };

  const deleteSneaker = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("sneakers")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete sneaker:", error);
      return;
    }
    setSneakers((prev) => prev.filter((shoe) => shoe.id !== id));
  };

  const updateSneaker = async (id: string, updatedShoe: Omit<Sneaker, "id">) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("sneakers")
      .update({
        slug: updatedShoe.slug,
        name_fr: updatedShoe.nameFr,
        name_ar: updatedShoe.nameAr,
        price: updatedShoe.price,
        category_slug: updatedShoe.categorySlug,
        image: updatedShoe.image || null,
        sizes: updatedShoe.sizes,
        sizes_stock: updatedShoe.sizesStock,
        colorways: updatedShoe.colorways,
        desc_fr: updatedShoe.descFr,
        desc_ar: updatedShoe.descAr,
        featured: updatedShoe.featured || false,
        is_hot_drop: updatedShoe.isHotDrop || false,
        is_new_arrival: updatedShoe.isNewArrival || false,
      })
      .eq("id", id);

    if (error) {
      console.error("Failed to update sneaker:", error);
      alert("Failed to update sneaker: " + error.message);
      return;
    }
    setSneakers((prev) =>
      prev.map((shoe) => (shoe.id === id ? { ...updatedShoe, id } : shoe))
    );
  };

  const updateStock = async (shoeId: string, size: number, quantity: number) => {
    if (!supabase) return;
    const shoe = sneakers.find((s) => s.id === shoeId);
    if (!shoe) return;

    const newStock = { ...shoe.sizesStock, [size]: quantity };
    const newSizes = shoe.sizes.includes(size)
      ? shoe.sizes
      : [...shoe.sizes, size].sort((a, b) => a - b);

    const { error } = await supabase
      .from("sneakers")
      .update({
        sizes: newSizes,
        sizes_stock: newStock,
      })
      .eq("id", shoeId);

    if (error) {
      console.error("Failed to update stock:", error);
      return;
    }
    setSneakers((prev) =>
      prev.map((s) =>
        s.id === shoeId ? { ...s, sizes: newSizes, sizesStock: newStock } : s
      )
    );
  };

  // ── Cart ──

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.sneakerId === item.sneakerId && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true); // Auto-open cart when adding
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const clearCart = () => setCart([]);

  // ── Leads (CRM) ──

  const addLead = async (newLead: Omit<Lead, "id" | "createdAt">) => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("leads")
      .insert({
        customer_name: newLead.customerName,
        phone_number: newLead.phoneNumber,
        items: newLead.items,
        wilaya_id: newLead.wilayaId,
        status: newLead.status || "todo",
        notes: newLead.notes || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to add lead:", error);
      alert("Failed to submit order: " + error.message);
      return;
    }
    if (data) {
      setLeads((prev) => [dbLeadToFrontend(data), ...prev]);
    }
  };

  const updateLeadStatus = async (id: string, status: Lead["status"]) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.error("Failed to update lead status:", error);
      return;
    }
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
  };

  const updateLeadTracking = async (
    id: string,
    updates: Partial<Pick<Lead, "trackingNumber" | "shippingProvider" | "shippedAt">>
  ) => {
    if (!supabase) return;
    const dbUpdates: Partial<{
      tracking_number: string;
      shipping_provider: string;
      shipped_at: string;
    }> = {};
    if (updates.trackingNumber !== undefined) dbUpdates.tracking_number = updates.trackingNumber;
    if (updates.shippingProvider !== undefined) dbUpdates.shipping_provider = updates.shippingProvider;
    if (updates.shippedAt !== undefined) dbUpdates.shipped_at = updates.shippedAt;

    const { error } = await supabase
      .from("leads")
      .update(dbUpdates)
      .eq("id", id);

    if (error) {
      console.error("Failed to update lead tracking:", error);
      return;
    }
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, ...updates } : lead))
    );
  };

  const deleteLead = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("leads")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete lead:", error);
      return;
    }
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
  };

  // ── Wilaya Fees ──

  const updateWilayaFee = async (id: string, fee: number) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("wilaya_fees")
      .update({ fee })
      .eq("id", id);

    if (error) {
      console.error("Failed to update wilaya fee:", error);
      return;
    }
    setWilayaFees((prev) =>
      prev.map((w) => (w.id === id ? { ...w, fee } : w))
    );
  };

  const addWilaya = async (newWilaya: Omit<WilayaFee, "id">) => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("wilaya_fees")
      .insert({
        name_fr: newWilaya.nameFr,
        name_ar: newWilaya.nameAr,
        fee: newWilaya.fee,
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to add wilaya:", error);
      alert("Failed to add wilaya: " + error.message);
      return;
    }
    if (data) {
      setWilayaFees((prev) => [...prev, dbWilayaToFrontend(data)]);
    }
  };

  const deleteWilaya = async (id: string) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("wilaya_fees")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to delete wilaya:", error);
      alert("Failed to delete wilaya: " + error.message);
      return;
    }
    setWilayaFees((prev) => prev.filter((w) => w.id !== id));
  };

  // ── Hero Banner & Contact Config ──

  const setHeroBanner = async (image: string | null) => {
    if (!supabase) return;
    setHeroBannerState(image);
    const { error } = await supabase
      .from("contact_config")
      .update({ hero_banner: image })
      .eq("id", 1);

    if (error) {
      console.error("Failed to update hero banner:", error);
    }
  };

  const setContactConfig = async (config: ContactConfig) => {
    if (!supabase) return;
    setContactConfigState(config);
    const { error } = await supabase
      .from("contact_config")
      .update({
        whatsapp: config.whatsapp,
        email: config.email,
      })
      .eq("id", 1);

    if (error) {
      console.error("Failed to update contact config:", error);
      alert("Database error: Failed to save Contact Settings.\nDetails: " + error.message);
    } else {
      console.log("Successfully updated contact_config in Supabase!");
    }
  };

  // ── Auth ──

  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    if (!supabase) return false;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error("Login failed:", error.message);
      return false;
    }
    
    setIsAdmin(true);
    return true;
  };

  const logoutAdmin = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        categories,
        addCategory,
        deleteCategory,
        sneakers,
        addSneaker,
        deleteSneaker,
        updateSneaker,
        updateStock,
        leads,
        addLead,
        updateLeadStatus,
        updateLeadTracking,
        deleteLead,
        wilayaFees,
        updateWilayaFee,
        addWilaya,
        deleteWilaya,
        heroBanner,
        setHeroBanner,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        contactConfig,
        setContactConfig,
        loading,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
