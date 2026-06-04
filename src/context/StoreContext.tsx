"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Category, Sneaker, INITIAL_CATEGORIES, INITIAL_SNEAKERS } from "../data/mockData";

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

  // Load state from local storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
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
          setSneakers(JSON.parse(storedSneakers));
        } catch (e) {
          console.error("Failed to parse stored sneakers", e);
        }
      }

      const storedContact = localStorage.getItem("shoes_contact");
      if (storedContact) {
        try {
          setContactConfig(JSON.parse(storedContact));
        } catch (e) {
          console.error("Failed to parse stored contact details", e);
        }
      }

      const adminSession = sessionStorage.getItem("shoes_admin");
      if (adminSession === "true") {
        setIsAdmin(true);
      }

      // Initialize HTML attributes on mount
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
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
    
    // Also clean up sneakers belonging to this category or re-assign them
    // For simplicity, we just keep them, but in production, we might delete or recategorize them.
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
