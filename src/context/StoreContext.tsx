"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Category, Sneaker, Lead, WilayaFee, INITIAL_CATEGORIES, INITIAL_SNEAKERS, INITIAL_WILAYAS } from "../data/mockData";

export type Language = "fr" | "ar";

interface ContactConfig {
  whatsapp: string;
  email: string;
}

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
  deleteLead: (id: string) => void;
  wilayaFees: WilayaFee[];
  updateWilayaFee: (id: string, fee: number) => void;
  heroBanner: string | null;
  setHeroBanner: (image: string | null) => void;
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  contactConfig: ContactConfig;
  setContactConfig: (config: ContactConfig) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("fr");
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [sneakers, setSneakers] = useState<Sneaker[]>(INITIAL_SNEAKERS);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [wilayaFees, setWilayaFees] = useState<WilayaFee[]>(INITIAL_WILAYAS);
  const [heroBanner, setHeroBannerState] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [contactConfig, setContactConfig] = useState<ContactConfig>({
    whatsapp: "+212612345678",
    email: "contact@sneakersobsidian.com",
  });

  // Toggle layout direction automatically when language changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof document !== "undefined") {
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lang;
    }
  };

  // Load state from local storage and sync across tabs
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadFromStorage = () => {
        const storedCategories = localStorage.getItem("shoes_categories");
        if (storedCategories) {
          try {
            setCategories(JSON.parse(storedCategories));
          } catch (e) {
            console.error("Failed to parse stored categories", e);
          }
        }

        const storedSneakers = localStorage.getItem("shoes_sneakers");
        if (storedSneakers) {
          try {
            const parsed = JSON.parse(storedSneakers) as Sneaker[];
            // Normalize each sneaker to ensure all required array fields exist
            const normalized = parsed.map((s: any) => {
              // Aggressive price scrubbing to fix corrupted localStorage strings like "1,700 DH"
              let scrubbedPrice = s.price;
              if (typeof s.price === 'string') {
                scrubbedPrice = parseFloat(s.price.replace(/[^0-9.]/g, ""));
              }
              if (isNaN(scrubbedPrice)) scrubbedPrice = 0;

              return {
                ...s,
                price: scrubbedPrice,
                sizes: Array.isArray(s.sizes) ? s.sizes : [39, 40, 41, 42, 43, 44, 45],
                sizesStock: s.sizesStock && typeof s.sizesStock === 'object' ? s.sizesStock : {},
                colorways: Array.isArray(s.colorways) ? s.colorways : ["Default"],
              };
            });
            setSneakers(normalized);
          } catch (e) {
            console.error("Failed to parse stored sneakers", e);
          }
        }

        const storedLeads = localStorage.getItem("shoes_leads");
        if (storedLeads) {
          try {
            setLeads(JSON.parse(storedLeads));
          } catch (e) {
            console.error("Failed to parse stored leads", e);
          }
        }

        const storedWilayas = localStorage.getItem("shoes_wilayas");
        if (storedWilayas) {
          try {
            const parsedWilayas = JSON.parse(storedWilayas) as WilayaFee[];
            const mergedWilayas = [...parsedWilayas];
            INITIAL_WILAYAS.forEach(iw => {
              if (!mergedWilayas.some(pw => pw.id === iw.id)) {
                mergedWilayas.push(iw);
              }
            });
            setWilayaFees(mergedWilayas);
            if (mergedWilayas.length > parsedWilayas.length) {
              localStorage.setItem("shoes_wilayas", JSON.stringify(mergedWilayas));
            }
          } catch (e) {
            console.error("Failed to parse stored wilayas", e);
          }
        }

        const storedHeroBanner = localStorage.getItem("shoes_herobanner");
        if (storedHeroBanner) {
          setHeroBannerState(storedHeroBanner);
        } else {
          setHeroBannerState(null);
        }

        const storedContact = localStorage.getItem("shoes_contact");
        if (storedContact) {
          try {
            setContactConfig(JSON.parse(storedContact));
          } catch (e) {
            console.error("Failed to parse stored contact details", e);
          }
        }
      };

      loadFromStorage();

      // Listen for changes from other tabs (like the admin panel)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key && e.key.startsWith("shoes_")) {
          loadFromStorage();
        }
      };

      window.addEventListener("storage", handleStorageChange);

      const adminSession = sessionStorage.getItem("shoes_admin");
      if (adminSession === "true") {
        setIsAdmin(true);
      }

      // Initialize HTML attributes on mount
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;

      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, [language]);

  // Persist categories when changed
  const addCategory = (newCat: Omit<Category, "id">) => {
    const fullCat: Category = {
      ...newCat,
      id: `cat_${Date.now()}`
    };
    const updated = [...categories, fullCat];
    setCategories(updated);
    localStorage.setItem("shoes_categories", JSON.stringify(updated));
  };

  const deleteCategory = (slug: string) => {
    const updated = categories.filter((cat) => cat.slug !== slug);
    setCategories(updated);
    localStorage.setItem("shoes_categories", JSON.stringify(updated));
  };

  // Sneaker management
  const addSneaker = (newShoe: Omit<Sneaker, "id">) => {
    const fullShoe: Sneaker = {
      ...newShoe,
      id: `shoe_${Date.now()}`
    };
    const updated = [...sneakers, fullShoe];
    setSneakers(updated);
    localStorage.setItem("shoes_sneakers", JSON.stringify(updated));
  };

  const deleteSneaker = (id: string) => {
    const updated = sneakers.filter((shoe) => shoe.id !== id);
    setSneakers(updated);
    localStorage.setItem("shoes_sneakers", JSON.stringify(updated));
  };

  const updateSneaker = (id: string, updatedShoe: Omit<Sneaker, "id">) => {
    const updated = sneakers.map((shoe) => {
      if (shoe.id === id) {
        return { ...updatedShoe, id };
      }
      return shoe;
    });
    setSneakers(updated);
    localStorage.setItem("shoes_sneakers", JSON.stringify(updated));
  };

  // Keyboard-navigable stock manager
  const updateStock = (shoeId: string, size: number, quantity: number) => {
    const updated = sneakers.map((shoe) => {
      if (shoe.id === shoeId) {
        const newStock = { ...shoe.sizesStock, [size]: quantity };
        // Ensure size exists in sizes array
        const newSizes = shoe.sizes.includes(size) 
          ? shoe.sizes 
          : [...shoe.sizes, size].sort((a, b) => a - b);
        return {
          ...shoe,
          sizes: newSizes,
          sizesStock: newStock
        };
      }
      return shoe;
    });
    setSneakers(updated);
    localStorage.setItem("shoes_sneakers", JSON.stringify(updated));
  };

  // CRM Leads Management
  const addLead = (newLead: Omit<Lead, "id" | "createdAt">) => {
    const fullLead: Lead = {
      ...newLead,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    const updated = [fullLead, ...leads];
    setLeads(updated);
    localStorage.setItem("shoes_leads", JSON.stringify(updated));
  };

  const updateLeadStatus = (id: string, status: Lead["status"]) => {
    const updated = leads.map((lead) => {
      if (lead.id === id) {
        return { ...lead, status };
      }
      return lead;
    });
    setLeads(updated);
    localStorage.setItem("shoes_leads", JSON.stringify(updated));
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter((lead) => lead.id !== id);
    setLeads(updated);
    localStorage.setItem("shoes_leads", JSON.stringify(updated));
  };

  // Wilaya Shipping Configuration
  const updateWilayaFee = (id: string, fee: number) => {
    const updated = wilayaFees.map((w) => {
      if (w.id === id) {
        return { ...w, fee };
      }
      return w;
    });
    setWilayaFees(updated);
    localStorage.setItem("shoes_wilayas", JSON.stringify(updated));
  };

  // Marketing Banner Manager
  const setHeroBanner = (image: string | null) => {
    setHeroBannerState(image);
    if (image) {
      localStorage.setItem("shoes_herobanner", image);
    } else {
      localStorage.removeItem("shoes_herobanner");
    }
  };

  // Auth handler
  const loginAdmin = (password: string): boolean => {
    if (password === "AdminShoes2026") {
      setIsAdmin(true);
      sessionStorage.setItem("shoes_admin", "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("shoes_admin");
  };

  // Persist contact configurations
  const saveContactConfig = (config: ContactConfig) => {
    setContactConfig(config);
    localStorage.setItem("shoes_contact", JSON.stringify(config));
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
        deleteLead,
        wilayaFees,
        updateWilayaFee,
        heroBanner,
        setHeroBanner,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        contactConfig,
        setContactConfig: saveContactConfig,
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
