"use client";

import React, { useState, useEffect, useRef } from "react";
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
  LogOut,
  Package,
  Tag,
  Sliders,
  Sparkles,
  AlertTriangle,
  Image as ImageIcon,
  UploadCloud,
  ChevronRight,
  TrendingUp,
  ListTodo,
  Truck,
  ArrowRightLeft,
  Edit,
  X,
  Palette
} from "lucide-react";
import { Sneaker, Lead, WilayaFee, SneakerColor } from "../data/mockData";

export const AdminDashboard: React.FC = () => {
  const { 
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
    resetWilayas,
    heroBanner,
    setHeroBanner,
    language, 
    logoutAdmin,
    contactConfig,
    setContactConfig 
  } = useStore();

  const isAr = language === "ar";

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<"quicksale" | "catalog" | "inventory" | "crm" | "categories" | "shipping" | "marketing" | "appearance">("catalog");

  // Preset Image Gallery
  const presetImages = [
    { name: "Volt Green", url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600" },
    { name: "Pink Zoom", url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600" },
    { name: "Pulse Lime", url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600" },
    { name: "Suede Terracotta", url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600" },
    { name: "Classic Amber", url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600" },
    { name: "Stealth Obsidian", url: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=600" },
    { name: "Zoom Blue", url: "https://images.unsplash.com/photo-1579338559194-a162d19bd842?auto=format&fit=crop&q=80&w=600" },
    { name: "White Retro", url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=600" }
  ];

  // Helper for pricing currency display
  const formatPrice = (price: number) => {
    const safe = Math.round(Number(price) || 0);
    const formatted = safe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return isAr ? `${formatted} د.ج` : `${formatted} DA`;
  };

  // --- TAB 0: QUICK SALE STATES ---
  const [qsSearch, setQsSearch] = useState("");
  const [qsSelectedShoeId, setQsSelectedShoeId] = useState<string | null>(null);
  const [qsSelectedSize, setQsSelectedSize] = useState<number | null>(null);
  const [qsSuccess, setQsSuccess] = useState(false);
  const qsSearchInputRef = useRef<HTMLInputElement>(null);

  // --- TAB 1: SNEAKER CATALOG & UPLOADER STATES ---
  const [shoeNameFr, setShoeNameFr] = useState("");
  const [shoeNameAr, setShoeNameAr] = useState("");
  const [shoePrice, setShoePrice] = useState("");
  const [shoeCategory, setShoeCategory] = useState("");
  const [shoeImage, setShoeImage] = useState("");
  const [shoeDescFr, setShoeDescFr] = useState("");
  const [shoeDescAr, setShoeDescAr] = useState("");
  const [shoeFeatured, setShoeFeatured] = useState(false);
  const [shoeHotDrop, setShoeHotDrop] = useState(false);
  const [shoeNewArrival, setShoeNewArrival] = useState(false);
  
  // Quick Add Category
  const [isQuickAddingCat, setIsQuickAddingCat] = useState(false);
  const [quickCatName, setQuickCatName] = useState("");
  
  // Size picker
  const allSizesList = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
  const [shoeSizes, setShoeSizes] = useState<number[]>([39, 40, 41, 42, 43, 44, 45]);
  
  // Colorways states
  const presetColors = ["Black", "White", "Neon Lime", "Electric Orange", "Red", "Grey", "Blue", "Gold", "Terracotta", "Multi"];
  const [selectedColors, setSelectedColors] = useState<string[]>(["Black"]);
  const [customColor, setCustomColor] = useState("");
  
  // NEW Variants
  const [shoeVariantColors, setShoeVariantColors] = useState<SneakerColor[]>([]);
  const [showVariantGallery, setShowVariantGallery] = useState(false);
  const [showEditVariantGallery, setShowEditVariantGallery] = useState(false);
  const [variantNameFr, setVariantNameFr] = useState("");
  const [variantNameAr, setVariantNameAr] = useState("");
  const [variantHex, setVariantHex] = useState("#FFFFFF");
  const [variantImage, setVariantImage] = useState("");

  // Dropzone State
  const [dragActive, setDragActive] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [shoeFormError, setShoeFormError] = useState<string | null>(null);
  const [shoeFormSuccess, setShoeFormSuccess] = useState(false);
  const [shoeImageError, setShoeImageError] = useState(false);

  // --- EDIT MODAL STATES ---
  const [editingShoe, setEditingShoe] = useState<Sneaker | null>(null);
  const [editNameFr, setEditNameFr] = useState("");
  const [editNameAr, setEditNameAr] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editDescFr, setEditDescFr] = useState("");
  const [editDescAr, setEditDescAr] = useState("");
  const [editFeatured, setEditFeatured] = useState(false);
  const [editHotDrop, setEditHotDrop] = useState(false);
  const [editNewArrival, setEditNewArrival] = useState(false);
  const [editSizes, setEditSizes] = useState<number[]>([]);
  const [editColors, setEditColors] = useState<string[]>([]);
  const [editCustomColor, setEditCustomColor] = useState("");
  const [editShoeVariantColors, setEditShoeVariantColors] = useState<SneakerColor[]>([]);
  const [editVariantNameFr, setEditVariantNameFr] = useState("");
  const [editVariantNameAr, setEditVariantNameAr] = useState("");
  const [editVariantHex, setEditVariantHex] = useState("#FFFFFF");
  const [editVariantImage, setEditVariantImage] = useState("");
  const [editShowGallery, setEditShowGallery] = useState(false);
  const [editDragActive, setEditDragActive] = useState(false);
  const [editImageError, setEditImageError] = useState(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  // --- TAB 2: KEYBOARD STOCK GRID CONFIG ---
  const inventorySizes = [39, 40, 41, 42, 43, 44, 45];

  // --- TAB 3: KANBAN CRM STATES ---
  const [crmName, setCrmName] = useState("");
  const [crmPhone, setCrmPhone] = useState("");
  const [crmShoeId, setCrmShoeId] = useState("");
  const [crmSize, setCrmSize] = useState<number>(40);
  const [crmWilayaId, setCrmWilayaId] = useState("alger");
  const [crmNotes, setCrmNotes] = useState("");
  const [crmError, setCrmError] = useState<string | null>(null);
  const [crmSuccess, setCrmSuccess] = useState(false);
  const [showCrmForm, setShowCrmForm] = useState(false);

  // --- TAB 4: CATEGORY STATES ---
  const [catNameFr, setCatNameFr] = useState("");
  const [catNameAr, setCatNameAr] = useState("");
  const [catDescFr, setCatDescFr] = useState("");
  const [catDescAr, setCatDescAr] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catImage, setCatImage] = useState("");
  const [catFormError, setCatFormError] = useState<string | null>(null);
  const [catFormSuccess, setCatFormSuccess] = useState(false);
  const [showAdvancedCatOptions, setShowAdvancedCatOptions] = useState(false);

  const [wilayaEditId, setWilayaEditId] = useState<string | null>(null);
  const [wilayaEditFee, setWilayaEditFee] = useState<string>("");
  const [wilayaEditFeeBureau, setWilayaEditFeeBureau] = useState<string>("");
  const [wilayaSearch, setWilayaSearch] = useState("");
  const [showAddWilaya, setShowAddWilaya] = useState(false);
  const [newWilayaId, setNewWilayaId] = useState("");
  const [newWilayaNameFr, setNewWilayaNameFr] = useState("");
  const [newWilayaNameAr, setNewWilayaNameAr] = useState("");
  const [newWilayaFee, setNewWilayaFee] = useState("");
  const [newWilayaFeeBureau, setNewWilayaFeeBureau] = useState("");
  const [wilayaAddSuccess, setWilayaAddSuccess] = useState(false);

  // --- TAB 6: MARKETING BANNER STATES ---
  const [bannerDragActive, setBannerDragActive] = useState(false);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);
  const [bannerSuccess, setBannerSuccess] = useState(false);

  // General settings state
  const [whatsapp, setWhatsapp] = useState(contactConfig.whatsapp);
  const [email, setEmail] = useState(contactConfig.email);
  const [siteName, setSiteName] = useState(contactConfig.siteName);
  const [primaryColor, setPrimaryColor] = useState(contactConfig.primaryColor);
  const [announcement, setAnnouncement] = useState(contactConfig.announcement);
  const [showSettingsSaved, setShowSettingsSaved] = useState(false);

  // Initializations
  useEffect(() => {
    if (!shoeCategory && categories.length > 0) {
      setShoeCategory(categories[0].slug);
    }
  }, [categories, shoeCategory]);

  useEffect(() => {
    if (sneakers.length > 0 && !crmShoeId) {
      setCrmShoeId(sneakers[0].id);
    }
  }, [sneakers, crmShoeId]);

  // Image uploader drag & drop
  const handleDrag = (e: React.DragEvent, isEdit = false) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      if (isEdit) setEditDragActive(true);
      else setDragActive(true);
    } else if (e.type === "dragleave") {
      if (isEdit) setEditDragActive(false);
      else setDragActive(false);
    }
  };

  const processFileIfHeic = async (file: File | Blob): Promise<File | Blob> => {
    if ((file as File).name?.toLowerCase().endsWith(".heic") || file.type === "image/heic") {
      try {
        const heic2any = (await import("heic2any")).default;
        const converted = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.8 });
        return Array.isArray(converted) ? converted[0] : converted;
      } catch (error) {
        console.error("HEIC conversion failed", error);
      }
    }
    return file;
  };

  const handleDrop = (e: React.DragEvent, isEdit = false) => {
    e.preventDefault();
    e.stopPropagation();
    if (isEdit) setEditDragActive(false);
    else setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0], isEdit);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0], isEdit);
    }
  };

  const handleVariantFileInput = async (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    if (e.target.files && e.target.files[0]) {
      const file = await processFileIfHeic(e.target.files[0]);
      if (!file.type.startsWith("image/")) {
        const msg = isAr ? "يرجى اختيار ملف صورة صالح." : "Veuillez choisir un fichier image valide.";
        alert(msg);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const img = document.createElement("img");
          img.onload = () => {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;
            const maxDim = 800;
            
            if (width > height && width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
            
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
              if (isEdit) {
                setEditVariantImage(compressedBase64);
              } else {
                setVariantImage(compressedBase64);
              }
            }
          };
          img.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFile = async (rawFile: File, isEdit = false) => {
    const file = await processFileIfHeic(rawFile);
    if (!file.type.startsWith("image/")) {
      const msg = isAr ? "يرجى اختيار ملف صورة صالح." : "Veuillez choisir un fichier image valide.";
      if (isEdit) alert(msg);
      else setShoeFormError(msg);
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        // Compress image using canvas
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 800;
          
          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
            if (isEdit) {
              setEditImage(compressedBase64);
              setEditImageError(false);
            } else {
              setShoeImage(compressedBase64);
              setShoeImageError(false);
            }
          }
        };
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  // Colorways
  const toggleColorway = (color: string, isEdit = false) => {
    const list = isEdit ? editColors : selectedColors;
    const setter = isEdit ? setEditColors : setSelectedColors;
    if (list.includes(color)) {
      setter(list.filter(c => c !== color));
    } else {
      setter([...list, color]);
    }
  };

  const addCustomColor = (isEdit = false) => {
    const val = isEdit ? editCustomColor : customColor;
    const list = isEdit ? editColors : selectedColors;
    const setter = isEdit ? setEditColors : setSelectedColors;
    const inputSetter = isEdit ? setEditCustomColor : setCustomColor;

    if (val.trim()) {
      if (!list.includes(val.trim())) {
        setter([...list, val.trim()]);
      }
      inputSetter("");
    }
  };

  // Keyboard stock cell navigation
  const handleGridKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, shoeIndex: number, size: number) => {
    const sizeIndex = inventorySizes.indexOf(size);
    let targetId = "";

    switch (e.key) {
      case "ArrowUp":
        if (shoeIndex > 0) {
          targetId = `stock-${shoeIndex - 1}-${size}`;
        }
        break;
      case "ArrowDown":
        if (shoeIndex < sneakers.length - 1) {
          targetId = `stock-${shoeIndex + 1}-${size}`;
        }
        break;
      case "ArrowLeft":
        if (sizeIndex > 0) {
          const prevSize = inventorySizes[sizeIndex - 1];
          targetId = `stock-${shoeIndex}-${prevSize}`;
        }
        break;
      case "ArrowRight":
        if (sizeIndex < inventorySizes.length - 1) {
          const nextSize = inventorySizes[sizeIndex + 1];
          targetId = `stock-${shoeIndex}-${nextSize}`;
        }
        break;
      case "Enter":
        if (sizeIndex < inventorySizes.length - 1) {
          const nextSize = inventorySizes[sizeIndex + 1];
          targetId = `stock-${shoeIndex}-${nextSize}`;
        } else if (shoeIndex < sneakers.length - 1) {
          targetId = `stock-${shoeIndex + 1}-${inventorySizes[0]}`;
        }
        break;
      default:
        return;
    }

    if (targetId) {
      e.preventDefault();
      const nextInput = document.getElementById(targetId) as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    }
  };

  // Publish new sneaker
  const handleSneakerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShoeFormError(null);
    setShoeFormSuccess(false);

    if (!shoeNameFr || !shoeNameAr || !shoePrice || !shoeCategory || !shoeImage || !shoeDescFr || !shoeDescAr) {
      setShoeFormError(isAr ? "يرجى ملء جميع الحقول المطلوبة." : "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const priceNum = parseFloat(shoePrice.replace(/[^0-9.]/g, ""));
    if (isNaN(priceNum)) {
      setShoeFormError(isAr ? "يرجى إدخال سعر رقمي صحيح." : "Veuillez entrer un prix numérique valide.");
      return;
    }

    const generatedSlug = shoeNameFr
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    const exists = sneakers.some(s => s.slug === generatedSlug);
    const uniqueSlug = exists ? `${generatedSlug}-${Date.now()}` : generatedSlug;

    // Set stock record
    const initialStock: Record<number, number> = {};
    allSizesList.forEach((sz) => {
      if (shoeSizes.includes(sz)) {
        initialStock[sz] = 10; 
      }
    });

    addSneaker({
      slug: uniqueSlug,
      nameFr: shoeNameFr,
      nameAr: shoeNameAr,
      price: priceNum,
      categorySlug: shoeCategory,
      image: shoeImage,
      sizes: shoeSizes,
      sizesStock: initialStock,
      colorways: selectedColors.length > 0 ? selectedColors : ["Default"],
      colors: shoeVariantColors,
      descFr: shoeDescFr,
      descAr: shoeDescAr,
      featured: shoeFeatured,
      isHotDrop: shoeHotDrop,
      isNewArrival: shoeNewArrival
    });

    setShoeNameFr("");
    setShoeNameAr("");
    setShoePrice("");
    setShoeImage("");
    setShoeDescFr("");
    setShoeDescAr("");
    setShoeFeatured(false);
    setShoeHotDrop(false);
    setShoeNewArrival(false);
    setShoeSizes([39, 40, 41, 42, 43, 44, 45]);
    setSelectedColors(["Black"]);
    setShoeVariantColors([]);
    setShoeImageError(false);
    setShoeFormSuccess(true);
    setTimeout(() => setShoeFormSuccess(false), 3000);
  };

  // Start edit sneaker modal
  const startEdit = (shoe: Sneaker) => {
    setEditingShoe(shoe);
    setEditNameFr(shoe.nameFr);
    setEditNameAr(shoe.nameAr);
    setEditPrice(shoe.price.toString());
    setEditCategory(shoe.categorySlug);
    setEditImage(shoe.image);
    setEditDescFr(shoe.descFr);
    setEditDescAr(shoe.descAr);
    setEditFeatured(!!shoe.featured);
    setEditHotDrop(!!shoe.isHotDrop);
    setEditNewArrival(!!shoe.isNewArrival);
    setEditSizes(Array.isArray(shoe.sizes) ? shoe.sizes : [39, 40, 41, 42, 43, 44, 45]);
    setEditColors(Array.isArray(shoe.colorways) ? shoe.colorways : ["Default"]);
    setEditShoeVariantColors(shoe.colors || []);
    setEditImageError(false);
    setEditShowGallery(false);
  };

  // Edit sneaker submission
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editNameFr || !editNameAr || !editPrice || !editCategory || !editImage || !editDescFr || !editDescAr) {
      alert("Please fill all required fields");
      return;
    }
    const priceNum = parseFloat(editPrice.replace(/[^0-9.]/g, ""));
    if (isNaN(priceNum)) {
      alert("Please enter a valid price");
      return;
    }
    if (editSizes.length === 0) {
      alert("Please select at least one size");
      return;
    }

    if (!editingShoe) return;

    // Preserving stock for sizes that are still present, setting default 10 for new ones
    const updatedStock: Record<number, number> = {};
    editSizes.forEach((sz) => {
      if (editingShoe.sizesStock[sz] !== undefined) {
        updatedStock[sz] = editingShoe.sizesStock[sz];
      } else {
        updatedStock[sz] = 10;
      }
    });

    updateSneaker(editingShoe.id, {
      slug: editingShoe.slug,
      nameFr: editNameFr,
      nameAr: editNameAr,
      price: priceNum,
      categorySlug: editCategory,
      image: editImage,
      sizes: editSizes,
      sizesStock: updatedStock,
      colorways: editColors.length > 0 ? editColors : ["Default"],
      colors: editShoeVariantColors,
      descFr: editDescFr,
      descAr: editDescAr,
      featured: editFeatured,
      isHotDrop: editHotDrop,
      isNewArrival: editNewArrival
    });

    setEditingShoe(null);
  };

  // Quick Sale Terminal Handlers
  const filteredQsShoes = qsSearch.trim() === "" 
    ? [] 
    : sneakers.filter(s => 
        s.nameFr.toLowerCase().includes(qsSearch.toLowerCase()) || 
        s.nameAr.includes(qsSearch)
      ).slice(0, 5);

  const qsSelectedShoe = sneakers.find(s => s.id === qsSelectedShoeId);

  const processQsSale = () => {
    if (!qsSelectedShoeId || qsSelectedSize === null || !qsSelectedShoe) return;
    const currentStock = qsSelectedShoe.sizesStock[qsSelectedSize] || 0;
    if (currentStock <= 0) return;
    updateStock(qsSelectedShoeId, qsSelectedSize, currentStock - 1);
    setQsSuccess(true);
    setQsSelectedShoeId(null);
    setQsSelectedSize(null);
    setQsSearch("");
    setTimeout(() => {
      setQsSuccess(false);
      qsSearchInputRef.current?.focus();
    }, 1500);
  };

  const handleQsKeyDown = (e: React.KeyboardEvent) => {
    // If we're typing search and hit enter
    if (e.key === "Enter" && document.activeElement === qsSearchInputRef.current) {
      if (filteredQsShoes.length > 0) {
        setQsSelectedShoeId(filteredQsShoes[0].id);
        setQsSearch("");
      }
      return;
    }

    // If a shoe is selected and size is selected, hit enter to sell
    if (e.key === "Enter" && qsSelectedShoeId && qsSelectedSize !== null) {
      processQsSale();
    }
  };

  // Leads submission
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCrmError(null);
    setCrmSuccess(false);

    if (!crmName || !crmPhone || !crmShoeId || !crmSize || !crmWilayaId) {
      setCrmError(isAr ? "يرجى إدخال جميع التفاصيل المطلوبة للطلب." : "Veuillez remplir toutes les informations du lead.");
      return;
    }

    addLead({
      customerName: crmName,
      phoneNumber: crmPhone,
      items: [{
        id: `manual_${Date.now()}`,
        sneakerId: crmShoeId,
        size: crmSize,
        quantity: 1
      }],
      wilayaId: crmWilayaId,
      status: "todo",
      notes: crmNotes
    });

    setCrmName("");
    setCrmPhone("");
      setCrmNotes("");
    setCrmSuccess(true);
    setTimeout(() => setCrmSuccess(false), 3000);
  };

  // Category states
  const [showCategoryGallery, setShowCategoryGallery] = useState(false);

  // Category submission
  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCatFormError(null);
    setCatFormSuccess(false);

    if (!catNameFr || !catSlug) {
      setCatFormError(isAr ? "يرجى إدخال اسم الفئة بالفرنسية على الأقل." : "Veuillez entrer au moins le nom de la catégorie (FR).");
      return;
    }

    if (categories.some(c => c.slug === catSlug)) {
      setCatFormError(isAr ? "الاسم الرمزي (Slug) موجود بالفعل." : "Ce slug de catégorie existe déjà.");
      return;
    }

    addCategory({
      slug: catSlug,
      nameFr: catNameFr,
      nameAr: catNameAr || catNameFr,
      descFr: catDescFr || catNameFr,
      descAr: catDescAr || catNameAr || catNameFr,
      image: catImage
    });

    setCatNameFr("");
    setCatNameAr("");
    setCatDescFr("");
    setCatDescAr("");
    setCatSlug("");
    setCatImage("");
    setCatFormSuccess(true);
    setTimeout(() => setCatFormSuccess(false), 3000);
  };

  const handleCatNameFrChange = (val: string) => {
    setCatNameFr(val);
    const cleanSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setCatSlug(cleanSlug);
  };

  const handleSaveWilayaFee = (id: string) => {
    const feeVal = parseFloat(wilayaEditFee);
    const feeBureauVal = parseFloat(wilayaEditFeeBureau);
    if (!isNaN(feeVal)) {
      updateWilayaFee(id, feeVal, !isNaN(feeBureauVal) ? feeBureauVal : undefined);
      setWilayaEditId(null);
      setWilayaEditFee("");
      setWilayaEditFeeBureau("");
    }
  };

  // Marketing Banner drag drop handlers
  const handleBannerDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setBannerDragActive(true);
    } else if (e.type === "dragleave") {
      setBannerDragActive(false);
    }
  };

  const handleBannerDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBannerDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleBannerFile(e.dataTransfer.files[0]);
    }
  };

  const handleBannerFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleBannerFile(e.target.files[0]);
    }
  };

  const handleBannerFile = async (rawFile: File) => {
    const file = await processFileIfHeic(rawFile);
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 1920; // Banner can be wider
          
          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
            setHeroBanner(compressedBase64);
            setBannerSuccess(true);
            setTimeout(() => setBannerSuccess(false), 3000);
          }
        };
        img.src = event.target.result as string;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setContactConfig({ whatsapp, email, siteName, primaryColor, announcement });
    setShowSettingsSaved(true);
    setTimeout(() => setShowSettingsSaved(false), 3000);
  };

  // Getter helpers
  const getShoeTitle = (id: string) => {
    const s = sneakers.find(x => x.id === id);
    return s ? (isAr ? s.nameAr : s.nameFr) : "Unknown Model";
  };

  const getShoeImage = (id: string) => {
    const s = sneakers.find(x => x.id === id);
    return s ? s.image : "";
  };

  const getWilayaName = (id: string) => {
    const w = wilayaFees.find(x => x.id === id);
    return w ? (isAr ? w.nameAr : w.nameFr) : id;
  };

  const getWilayaFeeVal = (id: string) => {
    const w = wilayaFees.find(x => x.id === id);
    return w ? w.fee : 0;
  };

  const getShoePriceVal = (id: string) => {
    const s = sneakers.find(x => x.id === id);
    return s ? s.price : 0;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white font-outfit uppercase tracking-wider flex items-center gap-2">
            <span className="h-6 w-[3px] bg-neon-lime rounded-full inline-block"></span>
            {isAr ? "لوحة المراقبة وإدارة المخزون" : "Console Management Console"}
          </h1>
          <p className={`text-xs text-neutral-400 mt-1 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
            {isAr 
              ? "مساحة آمنة لإدارة المخزون، لوحة العملاء، تتبع الطلبات، وتجهيز الشحن." 
              : "Bilingual secure dashboard for sneaker inventory, live lead CRM, Wilaya shipping, and catalog releases."}
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

      {/* 1. Dashboard Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="rounded-2xl border border-neutral-800 bg-asphalt/50 backdrop-blur-md p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block font-outfit">Total Sneakers</span>
            <span className="text-2xl font-black text-white font-outfit mt-1 block">{sneakers.length}</span>
          </div>
          <div className="p-3 bg-neon-lime/10 text-neon-lime rounded-xl">
            <Package size={18} />
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-asphalt/50 backdrop-blur-md p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block font-outfit">Active Leads (CRM)</span>
            <span className="text-2xl font-black text-white font-outfit mt-1 block">{leads.length}</span>
          </div>
          <div className="p-3 bg-cyan-400/10 text-cyan-400 rounded-xl">
            <ListTodo size={18} />
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-asphalt/50 backdrop-blur-md p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block font-outfit">Wilaya Delivery Pricing</span>
            <span className="text-2xl font-black text-white font-outfit mt-1 block">{wilayaFees.length}</span>
          </div>
          <div className="p-3 bg-neon-orange/10 text-neon-orange rounded-xl">
            <Truck size={18} />
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-asphalt/50 backdrop-blur-md p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block font-outfit">Platform State</span>
            <span className="text-sm font-black text-emerald-400 font-outfit mt-2 block flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>DA BILINGUAL ACTIVE
            </span>
          </div>
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
            <Activity size={18} />
          </div>
        </div>
      </div>

      {/* 2. Premium Tabbed Selector */}
      <div className="flex border-b border-neutral-800 mb-8 gap-1 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "quicksale", nameFr: "Quick Sale POS", nameAr: "نقطة البيع السريعة", icon: Activity },
          { id: "catalog", nameFr: "Uploader & Catalog", nameAr: "إضافة وعرض الموديلات", icon: Package },
          { id: "inventory", nameFr: "Keyboard Stock Manager", nameAr: "مخزن المقاسات السريع", icon: ArrowRightLeft },
          { id: "crm", nameFr: "CRM Lead Board", nameAr: "تتبع الطلبات (CRM)", icon: ListTodo },
          { id: "categories", nameFr: "Categories Setup", nameAr: "إعداد الفئات", icon: Tag },
          { id: "shipping", nameFr: "Wilaya Logistics", nameAr: "تكاليف الولايات", icon: Truck },
          { id: "marketing", nameFr: "Hero & Marketing", nameAr: "التسويق والبنر", icon: Sparkles },
          { id: "appearance", nameFr: "Store Appearance", nameAr: "مظهر المتجر", icon: Palette }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-all border-b-2 cursor-pointer flex-shrink-0 ${
                active
                  ? "border-neon-lime text-neon-lime bg-neon-lime/5"
                  : "border-transparent text-neutral-400 hover:text-white hover:bg-neutral-900/40"
              }`}
            >
              <Icon size={14} />
              <span className={isAr ? "font-cairo text-[13px]" : "font-outfit"}>
                {isAr ? tab.nameAr : tab.nameFr}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}

      {/* TAB 0: QUICK SALE POS TERMINAL */}
      {activeTab === "quicksale" && (
        <div className="animate-fadeIn" onKeyDown={handleQsKeyDown}>
          <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-900 pb-5 mb-6 gap-2">
              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Activity size={18} className="text-neon-lime" />
                  {isAr ? "نقطة بيع سريعة بلوحة المفاتيح" : "Keyboard-Only Quick Sale Terminal"}
                </h2>
                <p className="text-[10px] text-neutral-500 mt-1 font-mono">
                  {isAr 
                    ? "[تعليمات] ابحث عن الحذاء → اضغط Enter للاختيار → حدد المقاس → اضغط Enter لتأكيد البيع" 
                    : "[INSTRUCTIONS] Search shoe → ENTER to select → Pick size → ENTER to confirm sale. Stock deducts instantly."}
                </p>
              </div>
              <span className="rounded-md bg-neon-lime/10 border border-neon-lime/20 px-2.5 py-1 text-[9px] font-mono text-neon-lime tracking-widest">
                POS_TERMINAL_V1
              </span>
            </div>

            {/* Success Flash */}
            {qsSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-neon-lime/10 border border-neon-lime/30 flex items-center gap-3 animate-fadeIn">
                <div className="p-2 bg-neon-lime/20 rounded-xl">
                  <Check size={20} className="text-neon-lime" />
                </div>
                <div>
                  <span className="text-sm font-black text-neon-lime font-outfit uppercase">
                    {isAr ? "تم بنجاح! تم خصم وحدة من المخزون." : "SALE RECORDED! Stock deducted successfully."}
                  </span>
                </div>
              </div>
            )}

            {/* Step 1: Search */}
            <div className="mb-6">
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                {isAr ? "الخطوة 1: ابحث عن الحذاء" : "Step 1: Search Sneaker Model"}
              </label>
              <input
                ref={qsSearchInputRef}
                type="text"
                autoFocus
                value={qsSearch}
                onChange={(e) => {
                  setQsSearch(e.target.value);
                  setQsSelectedShoeId(null);
                  setQsSelectedSize(null);
                }}
                placeholder={isAr ? "اكتب اسم الحذاء..." : "Type sneaker name to search..."}
                className="w-full bg-neutral-950 border-2 border-neutral-800 focus:border-neon-lime/60 rounded-2xl px-5 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:ring-2 focus:ring-neon-lime/20 transition-all font-outfit"
              />

              {/* Search Results Dropdown */}
              {filteredQsShoes.length > 0 && !qsSelectedShoeId && (
                <div className="mt-2 rounded-2xl border border-neutral-800 bg-neutral-950 divide-y divide-neutral-900 overflow-hidden">
                  {filteredQsShoes.map((shoe, idx) => (
                    <button
                      key={shoe.id}
                      onClick={() => {
                        setQsSelectedShoeId(shoe.id);
                        setQsSearch("");
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-neutral-900/60 transition-all cursor-pointer ${idx === 0 ? "bg-neutral-900/30" : ""}`}
                    >
                      <div className="h-10 w-10 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={shoe.image} alt={shoe.nameFr} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-sm truncate font-outfit">{isAr ? shoe.nameAr : shoe.nameFr}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">{formatPrice(shoe.price)} · {shoe.categorySlug}</div>
                      </div>
                      {idx === 0 && (
                        <span className="text-[8px] font-mono text-neutral-500 border border-neutral-800 rounded px-1.5 py-0.5">ENTER</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Step 2: Selected Shoe + Size Picker */}
            {qsSelectedShoe && (
              <div className="mb-6 animate-fadeIn">
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3 font-outfit">
                  {isAr ? "الخطوة 2: اختر المقاس" : "Step 2: Select Size & Confirm"}
                </label>
                <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
                  <div className="flex items-center gap-4 mb-5 pb-4 border-b border-neutral-900">
                    <div className="h-16 w-16 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={qsSelectedShoe.image} alt={qsSelectedShoe.nameFr} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg font-outfit">{isAr ? qsSelectedShoe.nameAr : qsSelectedShoe.nameFr}</h3>
                      <span className="text-xs text-neon-lime font-mono font-bold">{formatPrice(qsSelectedShoe.price)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setQsSelectedShoeId(null);
                        setQsSelectedSize(null);
                        qsSearchInputRef.current?.focus();
                      }}
                      className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-500/40 hover:text-red-400 text-neutral-500 transition-all cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Size Grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-2">
                    {qsSelectedShoe.sizes.map((sz) => {
                      const stock = qsSelectedShoe.sizesStock[sz] || 0;
                      const isActive = qsSelectedSize === sz;
                      const isEmpty = stock === 0;

                      return (
                        <button
                          key={sz}
                          onClick={() => !isEmpty && setQsSelectedSize(sz)}
                          disabled={isEmpty}
                          className={`rounded-xl p-3 text-center transition-all border cursor-pointer ${
                            isEmpty
                              ? "opacity-30 border-neutral-900 bg-neutral-950 cursor-not-allowed"
                              : isActive
                              ? "border-neon-lime bg-neon-lime/10 ring-2 ring-neon-lime/30"
                              : "border-neutral-800 bg-neutral-900/50 hover:border-neutral-700"
                          }`}
                        >
                          <span className={`block text-sm font-black ${isActive ? "text-neon-lime" : isEmpty ? "text-neutral-700" : "text-white"} font-mono`}>
                            {sz}
                          </span>
                          <span className={`block text-[9px] mt-0.5 font-mono ${stock <= 2 && stock > 0 ? "text-neon-orange" : isEmpty ? "text-neutral-700" : "text-neutral-500"}`}>
                            {stock} {isAr ? "قطعة" : "pcs"}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Confirm Sale Button */}
                  {qsSelectedSize !== null && (
                    <div className="mt-5 pt-4 border-t border-neutral-900 animate-fadeIn">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-neutral-400 font-outfit">
                          {isAr ? "الحذاء" : "Model"}: <span className="text-white font-bold">{isAr ? qsSelectedShoe.nameAr : qsSelectedShoe.nameFr}</span>
                        </span>
                        <span className="text-xs text-neutral-400 font-mono">
                          Size <span className="text-white font-bold">{qsSelectedSize}</span> · Stock: <span className="text-neon-orange font-bold">{qsSelectedShoe.sizesStock[qsSelectedSize] || 0}</span>
                        </span>
                      </div>
                      <button
                        onClick={processQsSale}
                        className="w-full py-4 rounded-2xl bg-neon-lime hover:bg-white text-obsidian font-black text-sm uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Check size={18} />
                        {isAr ? "تأكيد البيع وخصم من المخزون" : "CONFIRM SALE — DEDUCT 1 FROM STOCK"}
                        <span className="text-[9px] font-mono opacity-60 ml-2">[ENTER]</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-neutral-900">
              <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-3 text-center">
                <span className="text-[9px] text-neutral-500 font-mono block uppercase">{isAr ? "إجمالي الموديلات" : "Total Models"}</span>
                <span className="text-lg font-black text-white font-outfit">{sneakers.length}</span>
              </div>
              <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-3 text-center">
                <span className="text-[9px] text-neutral-500 font-mono block uppercase">{isAr ? "إجمالي المخزون" : "Total Stock"}</span>
                <span className="text-lg font-black text-white font-outfit">
                  {sneakers.reduce((sum, s) => sum + Object.values(s.sizesStock).reduce((a, b) => a + b, 0), 0)}
                </span>
              </div>
              <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-3 text-center">
                <span className="text-[9px] text-neutral-500 font-mono block uppercase">{isAr ? "نفاد المخزون" : "Out of Stock"}</span>
                <span className="text-lg font-black text-neon-orange font-outfit">
                  {sneakers.filter(s => Object.values(s.sizesStock).every(v => v === 0)).length}
                </span>
              </div>
              <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-3 text-center">
                <span className="text-[9px] text-neutral-500 font-mono block uppercase">{isAr ? "مخزون منخفض" : "Low Stock"}</span>
                <span className="text-lg font-black text-yellow-400 font-outfit">
                  {sneakers.filter(s => Object.values(s.sizesStock).some(v => v > 0 && v <= 3)).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: SNEAKER CATALOG & UPLOADER */}
      {activeTab === "catalog" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 animate-fadeIn">
          {/* Uploader Form (Left, 5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2 border-b border-neutral-900 pb-4">
                <Plus size={18} className="text-neon-lime" />
                {isAr ? "إضافة منتج جديد" : "Ajouter un produit"}
              </h2>

              <form onSubmit={handleSneakerSubmit} className="space-y-5">
                
                {/* Drag & Drop File Zone */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                    Image du Produit *
                  </label>
                  
                  <div
                    onDragEnter={(e) => handleDrag(e, false)}
                    onDragOver={(e) => handleDrag(e, false)}
                    onDragLeave={(e) => handleDrag(e, false)}
                    onDrop={(e) => handleDrop(e, false)}
                    className={`h-40 w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-4 cursor-pointer transition-all duration-300 relative ${
                      dragActive
                        ? "border-neon-lime bg-neon-lime/5"
                        : shoeImage
                        ? "border-neutral-800 bg-neutral-950"
                        : "border-neutral-800 bg-neutral-900/20 hover:border-neutral-700"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.heic,.heif"
                      onChange={(e) => handleFileInput(e, false)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {shoeImage && !shoeImageError ? (
                      <div className="relative h-full w-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={shoeImage}
                          alt="Staged"
                          className="h-full w-full object-contain rounded-xl"
                          onError={() => setShoeImageError(true)}
                        />
                        <div className="absolute inset-0 bg-obsidian/45 flex items-center justify-center opacity-0 hover:opacity-100 transition-all rounded-xl">
                          <UploadCloud className="text-white" size={24} />
                          <span className="text-[10px] text-white font-bold ml-1 font-outfit">CHANGE ARTWORK</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <UploadCloud className="text-neutral-500 animate-bounce mb-2" size={24} />
                        <p className="text-xs font-bold text-white uppercase font-outfit">
                          {isAr ? "اسحب وأسقط الصورة" : "Glisser-déposer l'image"}
                        </p>
                        <p className="text-[9px] text-neutral-600 mt-1 uppercase font-mono">
                          {isAr ? "أو اضغط للتصفح" : "ou cliquer pour parcourir"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Preset Image Gallery Picker */}
                <div>
                  <button
                    type="button"
                    onClick={() => setShowGallery(!showGallery)}
                    className="w-full py-2 bg-neutral-900 hover:bg-neutral-850 text-[10px] font-bold text-neutral-400 hover:text-white rounded-xl border border-neutral-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer font-outfit"
                  >
                    <ImageIcon size={12} className="text-neon-lime" />
                    {showGallery ? "MASQUER LA GALERIE" : "SÉLECTIONNER DEPUIS LA GALERIE"}
                  </button>

                  {showGallery && (
                    <div className="grid grid-cols-4 gap-2 border border-neutral-800 bg-neutral-950 p-2 rounded-xl mt-2 animate-fadeIn">
                      {presetImages.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setShoeImage(img.url);
                            setShoeImageError(false);
                            setShowGallery(false);
                          }}
                          className="relative aspect-square rounded-lg overflow-hidden border border-neutral-850 hover:border-neon-lime transition-all cursor-pointer bg-neutral-900 group"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-obsidian/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                            <span className="text-[8px] text-white font-bold font-mono">CHOOSE</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Name fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Nom du modèle (FR) *</label>
                    <input
                      type="text"
                      value={shoeNameFr}
                      onChange={(e) => setShoeNameFr(e.target.value)}
                      placeholder="e.g. Forum Retro Volt"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all font-outfit"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 text-right font-cairo">اسم الموديل (AR) *</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={shoeNameAr}
                      onChange={(e) => setShoeNameAr(e.target.value)}
                      placeholder="مثال: فوروم ريترو فولت"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all text-right font-cairo"
                      required
                    />
                  </div>
                </div>

                {/* Price & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Prix (DA) *</label>
                    <input
                      type="number"
                      value={shoePrice}
                      onChange={(e) => setShoePrice(e.target.value)}
                      placeholder="e.g. 14500"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all font-mono"
                      required
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className={`block text-[10px] font-bold text-neutral-400 uppercase tracking-widest ${isAr ? 'text-right font-cairo' : 'font-outfit'}`}>
                        {isAr ? "الفئة *" : "Catégorie *"}
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsQuickAddingCat(!isQuickAddingCat)}
                        className="text-[9px] font-bold text-neon-lime hover:text-white uppercase tracking-widest font-outfit transition-colors cursor-pointer"
                      >
                        {isQuickAddingCat ? (isAr ? "إلغاء" : "Cancel") : (isAr ? "+ فئة جديدة" : "+ Quick Add")}
                      </button>
                    </div>

                    {isQuickAddingCat ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={quickCatName}
                          onChange={(e) => setQuickCatName(e.target.value)}
                          placeholder={isAr ? "اسم الفئة الجديدة" : "New category name"}
                          className={`flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-neon-lime/60 transition-all ${isAr ? 'font-cairo text-right' : 'font-outfit'}`}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!quickCatName.trim()) return;
                            const slug = quickCatName.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
                            if (categories.some(c => c.slug === slug)) {
                              alert(isAr ? "هذه الفئة موجودة بالفعل" : "Category already exists");
                              return;
                            }
                            addCategory({
                              slug,
                              nameFr: quickCatName,
                              nameAr: quickCatName,
                              descFr: quickCatName,
                              descAr: quickCatName
                            });
                            setShoeCategory(slug);
                            setQuickCatName("");
                            setIsQuickAddingCat(false);
                          }}
                          className="px-4 bg-neon-lime hover:bg-white text-obsidian rounded-xl text-xs font-black uppercase transition-all cursor-pointer"
                        >
                          {isAr ? "إضافة" : "Add"}
                        </button>
                      </div>
                    ) : (
                      <select
                        value={shoeCategory}
                        onChange={(e) => setShoeCategory(e.target.value)}
                        className={`w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-3 text-xs text-white focus:outline-none focus:border-neon-lime/60 transition-all cursor-pointer ${isAr ? 'font-cairo text-right' : 'font-outfit'}`}
                        required
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.slug} className="bg-obsidian text-white">
                            {isAr ? c.nameAr : c.nameFr}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {/* Colorways */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">Couleurs disponibles</label>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {presetColors.map((color) => {
                      const selected = selectedColors.includes(color);
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => toggleColorway(color, false)}
                          className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer font-outfit ${
                            selected
                              ? "bg-neon-lime/10 text-neon-lime border-neon-lime/40"
                              : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white"
                          }`}
                        >
                          {color}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      placeholder="Type custom color..."
                      className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neon-lime/50 font-outfit"
                    />
                    <button
                      type="button"
                      onClick={() => addCustomColor(false)}
                      className="px-3.5 py-1.5 bg-neutral-800 text-white rounded-lg text-xs font-bold font-outfit border border-neutral-700 hover:bg-neutral-700 cursor-pointer"
                    >
                      ADD
                    </button>
                  </div>
                </div>

                {/* ══════ COLOR VARIANTS (Image per Color) ══════ */}
                <div>
                  <label className="block text-[10px] font-bold text-neon-orange uppercase tracking-widest mb-2 font-outfit">
                    🎨 {isAr ? "صور الألوان المتعددة" : "Variantes de couleurs"}
                  </label>

                  {/* Listed variants */}
                  {shoeVariantColors.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {shoeVariantColors.map((vc, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-800 rounded-xl px-3 py-2">
                          <div className="w-7 h-7 rounded-full border-2 border-white/20 flex-shrink-0" style={{ backgroundColor: vc.hex }} />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-white font-outfit truncate">{vc.nameFr}</div>
                            <div className="text-[9px] text-neutral-500 font-mono truncate">{vc.nameAr} · {vc.hex}</div>
                          </div>
                          {vc.image && (
                            <div className="w-8 h-8 rounded-lg overflow-hidden border border-neutral-700 flex-shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={vc.image} alt={vc.nameFr} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => setShoeVariantColors(shoeVariantColors.filter((_, i) => i !== idx))}
                            className="text-red-500 hover:text-red-400 p-1 cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add new variant form */}
                  <div className="bg-neutral-950/50 border border-dashed border-neutral-700 rounded-xl p-3 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={variantNameFr}
                        onChange={(e) => setVariantNameFr(e.target.value)}
                        placeholder={isAr ? "اسم اللون (FR)" : "Color name (FR)"}
                        className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neon-orange/50 font-outfit"
                      />
                      <input
                        type="text"
                        value={variantNameAr}
                        onChange={(e) => setVariantNameAr(e.target.value)}
                        placeholder={isAr ? "اسم اللون (AR)" : "Color name (AR)"}
                        className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neon-orange/50 font-cairo text-right"
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={variantHex}
                        onChange={(e) => setVariantHex(e.target.value)}
                        className="w-10 h-10 rounded-lg border border-neutral-700 cursor-pointer bg-transparent p-0.5"
                      />
                      <input
                        type="text"
                        value={variantHex}
                        onChange={(e) => setVariantHex(e.target.value)}
                        placeholder="#FFFFFF"
                        className="w-24 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neon-orange/50 font-mono"
                      />
                      <div className="flex-1 flex flex-col gap-2">
                        <input
                          type="file"
                          accept="image/*,.heic,.heif"
                          id="variantImageUpload"
                          className="hidden"
                          onChange={(e) => handleVariantFileInput(e, false)}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById("variantImageUpload")?.click()}
                          className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-white rounded-lg border border-neutral-700 transition-all flex items-center justify-center gap-2 cursor-pointer font-outfit"
                        >
                          {variantImage ? (
                            <img src={variantImage} alt="Preview" className="h-4 w-4 object-cover rounded" />
                          ) : (
                            <UploadCloud size={14} className="text-neon-orange" />
                          )}
                          {variantImage ? (isAr ? "تم اختيار الصورة (تغيير)" : "Image Selected (Change)") : (isAr ? "رفع من الجهاز" : "UPLOAD FROM PC")}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowVariantGallery(!showVariantGallery)}
                          className="w-full py-1.5 bg-neutral-800 hover:bg-neutral-700 text-[10px] font-bold text-neutral-300 hover:text-white rounded-lg border border-neutral-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer font-outfit"
                        >
                          <ImageIcon size={12} className="text-neon-orange" />
                          {showVariantGallery ? "HIDE GALLERY" : "SELECT IMAGE FROM GALLERY (اختر من المعرض)"}
                        </button>
                      </div>
                    </div>
                    
                    {/* Variant Image Gallery */}
                    {showVariantGallery && (
                      <div className="grid grid-cols-4 gap-2 border border-neutral-800 bg-neutral-950 p-2 rounded-xl mb-4 animate-fadeIn">
                        {presetImages.map((img, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setVariantImage(img.url);
                              setShowVariantGallery(false);
                            }}
                            className="relative aspect-square rounded-lg overflow-hidden border border-neutral-850 hover:border-neon-orange transition-all cursor-pointer bg-neutral-900 group"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-obsidian/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                              <span className="text-[8px] text-white font-bold font-mono">CHOOSE</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (!variantNameFr || !variantImage) {
                          alert(isAr ? "يرجى ملء اسم اللون ورابط الصورة" : "Please fill color name and image URL");
                          return;
                        }
                        setShoeVariantColors([...shoeVariantColors, {
                          nameFr: variantNameFr,
                          nameAr: variantNameAr || variantNameFr,
                          hex: variantHex,
                          image: variantImage,
                        }]);
                        setVariantNameFr("");
                        setVariantNameAr("");
                        setVariantHex("#FFFFFF");
                        setVariantImage("");
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-neon-orange/10 border border-neon-orange/30 text-neon-orange hover:bg-neon-orange/20 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer font-outfit"
                    >
                      <Plus size={14} />
                      {isAr ? "إضافة لون" : "Add Color Variant"}
                    </button>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">Sizes Selector</label>
                  <div className="flex flex-wrap gap-1.5">
                    {allSizesList.map((sz) => {
                      const selected = shoeSizes.includes(sz);
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => {
                            if (selected) {
                              setShoeSizes(shoeSizes.filter(s => s !== sz));
                            } else {
                              setShoeSizes([...shoeSizes, sz].sort((a, b) => a - b));
                            }
                          }}
                          className={`h-8 w-8 text-xs font-black rounded-lg border font-mono transition-all flex items-center justify-center cursor-pointer ${
                            selected
                              ? "border-neon-lime bg-neon-lime/10 text-neon-lime"
                              : "border-neutral-850 bg-neutral-900/40 text-neutral-500"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Descriptions */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Description (FR) *</label>
                    <textarea
                      rows={2}
                      value={shoeDescFr}
                      onChange={(e) => setShoeDescFr(e.target.value)}
                      placeholder="French details..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all font-outfit resize-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 text-right font-cairo">الوصف (AR) *</label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={shoeDescAr}
                      onChange={(e) => setShoeDescAr(e.target.value)}
                      placeholder="الوصف بالعربية..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all text-right font-cairo resize-none"
                      required
                    />
                  </div>
                </div>

                {/* Featured / Drops toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl border border-neutral-850 bg-neutral-950/70 p-3 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-white font-outfit">Featured Highlight</span>
                    <button
                      type="button"
                      onClick={() => setShoeFeatured(!shoeFeatured)}
                      className={`mt-2 w-full py-1 text-[9px] font-bold rounded-lg border transition-all ${
                        shoeFeatured ? "bg-neon-lime/15 border-neon-lime text-neon-lime" : "bg-neutral-900 border-neutral-800 text-neutral-500"
                      }`}
                    >
                      {shoeFeatured ? "FEATURED ACTIVE" : "TOGGLE FEATURED"}
                    </button>
                  </div>
                  <div className="rounded-xl border border-neutral-850 bg-neutral-950/70 p-3 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-white font-outfit flex items-center gap-1">
                      <Sparkles size={10} className="text-neon-orange" />
                      Hot Drop Badge
                    </span>
                    <button
                      type="button"
                      onClick={() => setShoeHotDrop(!shoeHotDrop)}
                      className={`mt-2 w-full py-1 text-[9px] font-bold rounded-lg border transition-all ${
                        shoeHotDrop ? "bg-neon-orange/15 border-neon-orange text-neon-orange" : "bg-neutral-900 border-neutral-800 text-neutral-500"
                      }`}
                    >
                      {shoeHotDrop ? "HOT DROP ACTIVE" : "TOGGLE HOT DROP"}
                    </button>
                  </div>
                  <div className="rounded-xl border border-neutral-850 bg-neutral-950/70 p-3 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-white font-outfit flex items-center gap-1">
                      <TrendingUp size={10} className="text-cyan-400" />
                      New Arrival Badge
                    </span>
                    <button
                      type="button"
                      onClick={() => setShoeNewArrival(!shoeNewArrival)}
                      className={`mt-2 w-full py-1 text-[9px] font-bold rounded-lg border transition-all ${
                        shoeNewArrival ? "bg-cyan-400/15 border-cyan-400 text-cyan-400" : "bg-neutral-900 border-neutral-800 text-neutral-500"
                      }`}
                    >
                      {shoeNewArrival ? "NEW ARRIVAL ACTIVE" : "TOGGLE NEW ARRIVAL"}
                    </button>
                  </div>
                </div>

                {shoeFormError && (
                  <div className="text-xs text-red-400 border border-red-500/20 bg-red-500/5 rounded-xl p-3 flex items-center gap-1.5">
                    <AlertTriangle size={14} />
                    <span>{shoeFormError}</span>
                  </div>
                )}

                {shoeFormSuccess && (
                  <div className="text-xs text-neon-lime border border-neon-lime/20 bg-neon-lime/5 rounded-xl p-3 flex items-center gap-1.5">
                    <Check size={14} />
                    <span>Product registered successfully in catalog!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-neon-lime hover:bg-white text-obsidian font-black text-xs uppercase tracking-wider transition-all hover:scale-[1.01] neon-glow-lime cursor-pointer font-outfit"
                >
                  {isAr ? "نشر الحذاء الرياضي" : "Publish to Showroom"}
                </button>
              </form>
            </div>
          </div>

          {/* Catalog Database List (Right, 7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2 border-b border-neutral-900 pb-4">
                  <Database size={18} className="text-neon-lime" />
                  Showroom Database (Active Release Matrix)
                </h2>

                <div className="overflow-x-auto max-h-[600px] overflow-y-auto pr-1">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-neutral-900 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                        <th className="py-3 px-2 font-outfit">Product Details</th>
                        <th className="py-3 px-2 font-outfit">Pricing</th>
                        <th className="py-3 px-2 font-outfit">Hype Flags</th>
                        <th className="py-3 px-2 text-center font-outfit">Configure</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900/30">
                      {sneakers.map((shoe) => (
                        <tr key={shoe.id} className="text-xs text-neutral-300 hover:bg-neutral-900/10 transition-colors">
                          <td className="py-3.5 px-2">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 flex-shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={shoe.image} alt={shoe.nameFr} className="h-full w-full object-cover" />
                              </div>
                              <div>
                                <div className="font-bold text-white">{shoe.nameFr}</div>
                                <div className="text-[9px] text-neutral-500 font-mono mt-0.5">{(shoe.colorways || ["Default"]).join(" | ")}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-2 font-mono">
                            <div className="text-neon-lime font-bold">{formatPrice(shoe.price)}</div>
                            <div className="text-[9px] text-neutral-500 font-outfit">{categories.find(c => c.slug === shoe.categorySlug)?.nameFr || shoe.categorySlug}</div>
                          </td>
                          <td className="py-3.5 px-2">
                            <div className="flex flex-wrap gap-1">
                              {shoe.featured && <span className="text-[8px] font-bold bg-yellow-500/10 text-yellow-400 px-1 py-0.5 rounded border border-yellow-500/20">STAR</span>}
                              {shoe.isHotDrop && <span className="text-[8px] font-bold bg-neon-orange/10 text-neon-orange px-1 py-0.5 rounded border border-neon-orange/20">HOT</span>}
                              {shoe.isNewArrival && <span className="text-[8px] font-bold bg-cyan-400/10 text-cyan-400 px-1 py-0.5 rounded border border-cyan-400/20">NEW</span>}
                            </div>
                          </td>
                          <td className="py-3.5 px-2 text-center">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => startEdit(shoe)}
                                className="p-1.5 rounded-lg text-neutral-400 hover:text-neon-lime hover:bg-neon-lime/5 cursor-pointer border border-transparent hover:border-neon-lime/20"
                                title="Edit sneaker details"
                              >
                                <Edit size={13} />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(isAr ? `حذف حذاء "${shoe.nameAr}"؟` : `Supprimer "${shoe.nameFr}" ?`)) {
                                    deleteSneaker(shoe.id);
                                  }
                                }}
                                className="p-1.5 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-red-500/5 cursor-pointer border border-transparent hover:border-red-500/15"
                                title="Delete sneaker"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p className="text-[9px] text-neutral-600 font-mono mt-6 border-t border-neutral-900/60 pt-4">
                * Note: Uploaded artworks are stored as direct Base64 schemas in memory buffer grids.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KEYBOARD STOCK GRID MANAGER */}
      {activeTab === "inventory" && (
        <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-900 pb-5 mb-6 gap-2">
            <div>
              <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <ArrowRightLeft size={18} className="text-neon-lime" />
                Keyboard-Navigable Size & Stock Manager Grid
              </h2>
              <p className="text-[10px] text-neutral-500 mt-1 font-mono">
                [INSTRUCTIONS] Use ARROW KEYS (← ↑ ↓ →) or TAB/SHIFT+TAB to navigate stock quantity inputs in real-time. Quantities update instantly.
              </p>
            </div>
            <span className="rounded-md bg-neon-lime/10 border border-neon-lime/20 px-2.5 py-1 text-[9px] font-mono text-neon-lime tracking-widest">
              SCANNER_FREE_V2.1
            </span>
          </div>

          <div className="overflow-x-auto pr-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-900 text-[10px] font-black text-neutral-500 uppercase tracking-widest text-center">
                  <th className="py-3 px-2 text-left font-outfit w-1/4">Shoe Model (Baskets Showcase)</th>
                  {inventorySizes.map(sz => (
                    <th key={sz} className="py-3 px-2 font-mono">Size {sz}</th>
                  ))}
                  <th className="py-3 px-2 font-outfit">Total Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900/50">
                {sneakers.map((shoe, shoeIndex) => {
                  let totalQuantity = 0;
                  inventorySizes.forEach((sz) => {
                    totalQuantity += (shoe.sizesStock[sz] || 0);
                  });

                  return (
                    <tr key={shoe.id} className="hover:bg-neutral-900/10 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-lg overflow-hidden bg-neutral-950 border border-neutral-850 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={shoe.image} alt={shoe.nameFr} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <div className="font-bold text-white text-xs">{shoe.nameFr}</div>
                            <div className="text-[8px] text-neutral-500 font-mono mt-0.5">{(shoe.categorySlug || "").replace("-", " ")}</div>
                          </div>
                        </div>
                      </td>

                      {/* Stock Inputs */}
                      {inventorySizes.map((sz) => {
                        const cellId = `stock-${shoeIndex}-${sz}`;
                        const qty = shoe.sizesStock[sz] !== undefined ? shoe.sizesStock[sz] : 0;
                        return (
                          <td key={sz} className="py-4 px-2 text-center">
                            <input
                              type="number"
                              id={cellId}
                              min={0}
                              max={999}
                              value={qty}
                              onChange={(e) => {
                                const val = parseInt(e.target.value);
                                updateStock(shoe.id, sz, isNaN(val) ? 0 : val);
                              }}
                              onKeyDown={(e) => handleGridKeyDown(e, shoeIndex, sz)}
                              className="w-14 bg-neutral-950 border border-neutral-850 focus:border-neon-lime/60 rounded-lg py-1 px-1.5 text-center text-xs text-white font-mono focus:outline-none focus:ring-1 focus:ring-neon-lime/20 transition-all font-bold"
                            />
                          </td>
                        );
                      })}

                      <td className="py-4 px-2 text-center font-mono text-xs font-black text-neutral-400">
                        {totalQuantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CRM LEADS TRACKER */}
      {activeTab === "crm" && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className={`lg:col-span-12 rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md transition-all duration-500 ${showCrmForm ? 'p-6 sm:p-8' : 'p-4'}`}>
              <div 
                className="flex items-center justify-between cursor-pointer group"
                onClick={() => setShowCrmForm(!showCrmForm)}
              >
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Plus size={16} className="text-cyan-400 group-hover:scale-125 transition-transform" />
                  Add Direct Order Lead Manually
                </h2>
                <ChevronRight size={18} className={`text-neutral-500 transition-transform duration-300 ${showCrmForm ? "rotate-90" : ""}`} />
              </div>

              {showCrmForm && (
                <form onSubmit={handleLeadSubmit} className="space-y-4 mt-6 animate-fadeIn">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Customer Name *</label>
                      <input
                      type="text"
                      value={crmName}
                      onChange={(e) => setCrmName(e.target.value)}
                      placeholder="e.g. Slimane Mohamed"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-400/60 transition-all font-outfit"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Phone Number *</label>
                    <input
                      type="text"
                      value={crmPhone}
                      onChange={(e) => setCrmPhone(e.target.value)}
                      placeholder="e.g. +213550123456"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-400/60 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Requested Sneaker *</label>
                    <select
                      value={crmShoeId}
                      onChange={(e) => setCrmShoeId(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/60 transition-all cursor-pointer font-outfit"
                      required
                    >
                      {sneakers.map((shoe) => (
                        <option key={shoe.id} value={shoe.id}>
                          {shoe.nameFr} ({formatPrice(shoe.price)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Shoe Size *</label>
                    <select
                      value={crmSize}
                      onChange={(e) => setCrmSize(parseInt(e.target.value))}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/60 transition-all cursor-pointer font-mono"
                      required
                    >
                      {allSizesList.map((sz) => (
                        <option key={sz} value={sz}>Size {sz}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Delivery Destination (Wilaya) *</label>
                  <select
                    value={crmWilayaId}
                    onChange={(e) => setCrmWilayaId(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400/60 transition-all cursor-pointer font-outfit"
                    required
                  >
                    {wilayaFees.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.nameFr} (+{formatPrice(w.fee)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Lead Notes</label>
                  <textarea
                    rows={2}
                    value={crmNotes}
                    onChange={(e) => setCrmNotes(e.target.value)}
                    placeholder="e.g. Call customer after 5:00 PM for confirmation"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-cyan-400/60 transition-all font-outfit resize-none"
                  />
                </div>

                {crmError && (
                  <div className="text-xs text-red-400 border border-red-500/25 bg-red-500/5 rounded-xl p-3 flex items-center gap-1">
                    <AlertTriangle size={14} />
                    <span>{crmError}</span>
                  </div>
                )}

                {crmSuccess && (
                  <div className="text-xs text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 rounded-xl p-3 flex items-center gap-1">
                    <Check size={14} />
                    <span>Manually logged CRM lead successfully!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-white text-obsidian font-black text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Record Order Lead
                </button>
              </form>
              )}
            </div>

            {/* CRM Stats Box */}
            <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-asphalt/40 border border-neutral-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-neon-orange mb-1">{leads.filter(l => l.status === "todo").length}</span>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Pending (To Do)</span>
              </div>
              <div className="bg-asphalt/40 border border-neutral-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-cyan-400 mb-1">{leads.filter(l => l.status === "progress").length}</span>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">In Progress</span>
              </div>
              <div className="bg-asphalt/40 border border-neutral-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-neon-lime mb-1">{leads.filter(l => l.status === "delivered").length}</span>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Delivered</span>
              </div>
              <div className="bg-asphalt/40 border border-neutral-800 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-white mb-1">{leads.length}</span>
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Total Orders</span>
              </div>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* COLUMN 1: TO DO */}
            <div className="rounded-3xl border border-neutral-800 bg-asphalt/35 p-5 flex flex-col min-h-[500px]">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-neutral-900">
                <span className="text-xs font-black uppercase text-neon-orange tracking-widest font-outfit flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-neon-orange"></span>
                  To Do (Unconfirmed)
                </span>
                <span className="bg-neutral-900 border border-neutral-850 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-500">
                  {leads.filter(l => l.status === "todo").length}
                </span>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto max-h-[600px] scrollbar-thin">
                {leads.filter(l => l.status === "todo").map(lead => (
                  <div key={lead.id} className="glass-card rounded-2xl p-4.5 space-y-3 shadow-lg border-neutral-800 group hover:-translate-y-1 z-10 hover:z-20">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-white text-sm font-outfit">{lead.customerName}</h4>
                        <a href={`tel:${lead.phoneNumber}`} className="text-[10px] font-mono text-neutral-400 hover:text-neon-orange flex items-center gap-1 mt-1 transition-colors">
                          <Phone size={10} />
                          {lead.phoneNumber}
                        </a>
                      </div>
                      <button 
                        onClick={() => deleteLead(lead.id)}
                        className="text-neutral-600 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <div className="flex flex-col gap-2 p-2.5 rounded-xl bg-obsidian/60 border border-neutral-800 max-h-32 overflow-y-auto scrollbar-thin">
                      {lead.items.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <div className="h-10 w-10 rounded border border-neutral-800 overflow-hidden flex-shrink-0 bg-neutral-900">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.color?.image || getShoeImage(item.sneakerId)} alt="Shoe" className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-bold text-white truncate">{item.quantity}x {getShoeTitle(item.sneakerId)}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[9px] text-neutral-500 font-mono">Size {item.size}</span>
                              {item.color && (
                                <div className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full border border-neutral-700" style={{ backgroundColor: item.color.hex }}></span>
                                  <span className="text-[8px] text-neutral-400 font-bold uppercase">{isAr ? item.color.nameAr : item.color.nameFr}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono mt-2">
                      <span>Dest: {getWilayaName(lead.wilayaId)}</span>
                      <span className="font-bold text-neon-lime">
                        {formatPrice(lead.items.reduce((sum, item) => sum + (getShoePriceVal(item.sneakerId) * item.quantity), 0) + getWilayaFeeVal(lead.wilayaId))}
                      </span>
                    </div>

                    {lead.notes && (
                      <p className="text-[9px] text-neutral-500 bg-neutral-900/50 p-2 rounded-lg border border-neutral-900 leading-normal">
                        {lead.notes}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={(() => {
                          const phone = lead.phoneNumber.replace(/\+/g, "");
                          const itemsTotal = lead.items.reduce((sum, item) => sum + (getShoePriceVal(item.sneakerId) * item.quantity), 0);
                          const totalStr = formatPrice(itemsTotal + getWilayaFeeVal(lead.wilayaId));
                          const itemsSummaryFr = lead.items.map(i => `${i.quantity}x ${getShoeTitle(i.sneakerId)} (Taille ${i.size})`).join(", ");
                          const itemsSummaryAr = lead.items.map(i => `${i.quantity}x ${getShoeTitle(i.sneakerId)} (مقاس ${i.size})`).join("، ");
                          const msg = isAr
                            ? `مرحبا ${lead.customerName}، نود تأكيد طلبك لـ ${itemsSummaryAr} إلى ${getWilayaName(lead.wilayaId)}. المبلغ الإجمالي: ${totalStr}.`
                            : `Bonjour ${lead.customerName}, nous confirmons votre commande: ${itemsSummaryFr} vers ${getWilayaName(lead.wilayaId)}. Total: ${totalStr}.`;
                          return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
                        })()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10 text-[9px] font-bold text-emerald-400 uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Phone size={10} />
                        WhatsApp
                      </a>
                      <button
                        onClick={() => updateLeadStatus(lead.id, "progress")}
                        className="py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-[10px] font-bold text-white uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1 group-hover:border-neutral-700 border border-transparent"
                      >
                        Process
                        <ChevronRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 2: IN PROGRESS */}
            <div className="rounded-3xl border border-neutral-800 bg-asphalt/35 p-5 flex flex-col min-h-[500px]">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-neutral-900">
                <span className="text-xs font-black uppercase text-cyan-400 tracking-widest font-outfit flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                  In Progress (In Transit)
                </span>
                <span className="bg-neutral-900 border border-neutral-850 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-500">
                  {leads.filter(l => l.status === "progress").length}
                </span>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto max-h-[600px] scrollbar-thin">
                {leads.filter(l => l.status === "progress").map(lead => (
                  <div key={lead.id} className="rounded-2xl border border-neutral-800 bg-[#0d0d10] p-4.5 space-y-3 shadow-md hover:border-neutral-700/60 transition-all group">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-white text-sm font-outfit">{lead.customerName}</h4>
                        <a href={`tel:${lead.phoneNumber}`} className="text-[10px] font-mono text-neutral-400 hover:text-cyan-400 flex items-center gap-1 mt-1 transition-colors">
                          <Phone size={10} />
                          {lead.phoneNumber}
                        </a>
                      </div>
                      <button 
                        onClick={() => deleteLead(lead.id)}
                        className="text-neutral-600 hover:text-red-500 p-1 rounded-lg hover:bg-neutral-900 cursor-pointer transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <div className="flex flex-col gap-2 p-2 rounded-xl bg-neutral-950 border border-neutral-850 max-h-32 overflow-y-auto scrollbar-thin">
                      {lead.items.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <div className="h-8 w-8 rounded overflow-hidden flex-shrink-0 bg-neutral-900">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={getShoeImage(item.sneakerId)} alt="Shoe" className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-bold text-white truncate">{item.quantity}x {getShoeTitle(item.sneakerId)}</div>
                            <div className="text-[9px] text-neutral-500 font-mono mt-0.5">Size {item.size}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono mt-2">
                      <span>Dest: {getWilayaName(lead.wilayaId)}</span>
                      <span className="font-bold text-neon-lime">
                        {formatPrice(lead.items.reduce((sum, item) => sum + (getShoePriceVal(item.sneakerId) * item.quantity), 0) + getWilayaFeeVal(lead.wilayaId))}
                      </span>
                    </div>

                    {lead.notes && (
                      <p className="text-[9px] text-neutral-500 bg-neutral-900/50 p-2 rounded-lg border border-neutral-900 leading-normal">
                        {lead.notes}
                      </p>
                    )}

                    <div className="space-y-2 pt-2 border-t border-neutral-800/50">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Tracking # (e.g. Yalidine)"
                          defaultValue={lead.trackingNumber || ""}
                          onBlur={(e) => updateLeadTracking(lead.id, { trackingNumber: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded px-2 py-1.5 text-[10px] text-white focus:outline-none focus:border-cyan-400/60 font-mono"
                        />
                        <input
                          type="text"
                          placeholder="Provider"
                          defaultValue={lead.shippingProvider || ""}
                          onBlur={(e) => updateLeadTracking(lead.id, { shippingProvider: e.target.value })}
                          className="w-20 bg-neutral-950 border border-neutral-800 rounded px-2 py-1.5 text-[10px] text-white focus:outline-none focus:border-cyan-400/60 font-outfit"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <button
                        onClick={() => updateLeadStatus(lead.id, "todo")}
                        className="py-1.5 rounded-lg border border-neutral-850 hover:bg-neutral-900 text-[9px] font-bold text-neutral-400 hover:text-white uppercase transition-all cursor-pointer"
                      >
                        Revert Back
                      </button>
                      <button
                        onClick={() => {
                          updateLeadTracking(lead.id, { shippedAt: new Date().toISOString() });
                          updateLeadStatus(lead.id, "delivered");
                        }}
                        className="py-1.5 rounded-lg bg-neon-lime hover:bg-white text-obsidian text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Delivered
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 3: DELIVERED */}
            <div className="rounded-3xl border border-neutral-800 bg-asphalt/35 p-5 flex flex-col min-h-[500px]">
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-neutral-900">
                <span className="text-xs font-black uppercase text-neon-lime tracking-widest font-outfit flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-neon-lime"></span>
                  Delivered (Completed)
                </span>
                <span className="bg-neutral-900 border border-neutral-850 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-500">
                  {leads.filter(l => l.status === "delivered").length}
                </span>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto max-h-[600px] scrollbar-thin">
                {leads.filter(l => l.status === "delivered").map(lead => (
                  <div key={lead.id} className="glass-card opacity-80 hover:opacity-100 rounded-2xl p-4.5 space-y-3 shadow-lg border-neon-lime/20 group hover:-translate-y-1 z-10 hover:z-20 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-white text-sm font-outfit">{lead.customerName}</h4>
                        <div className="text-[10px] font-mono text-neutral-500 mt-1 flex items-center gap-1">
                          <Phone size={10} />
                          {lead.phoneNumber}
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteLead(lead.id)}
                        className="text-neutral-700 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-500/10 cursor-pointer transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    <div className="flex flex-col gap-2 p-2.5 rounded-xl bg-obsidian/60 border border-neutral-800 max-h-32 overflow-y-auto scrollbar-thin">
                      {lead.items.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-center">
                          <div className="h-10 w-10 rounded border border-neutral-800 overflow-hidden flex-shrink-0 bg-neutral-900">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.color?.image || getShoeImage(item.sneakerId)} alt="Shoe" className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-bold text-neutral-400 truncate">{item.quantity}x {getShoeTitle(item.sneakerId)}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[9px] text-neutral-500 font-mono">Size {item.size}</span>
                              {item.color && (
                                <div className="flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full border border-neutral-700 opacity-60" style={{ backgroundColor: item.color.hex }}></span>
                                  <span className="text-[8px] text-neutral-500 font-bold uppercase">{isAr ? item.color.nameAr : item.color.nameFr}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center text-[10px] text-neutral-500 font-mono mt-2">
                      <span>Dest: {getWilayaName(lead.wilayaId)}</span>
                      <span className="font-bold text-neon-lime">
                        {formatPrice(lead.items.reduce((sum, item) => sum + (getShoePriceVal(item.sneakerId) * item.quantity), 0) + getWilayaFeeVal(lead.wilayaId))}
                      </span>
                    </div>

                    {(lead.trackingNumber || lead.shippingProvider) && (
                      <div className="text-[9px] font-mono text-neutral-400 bg-neutral-900/50 p-2 rounded border border-neutral-800">
                        <div>Tracking: <span className="text-white">{lead.trackingNumber || "N/A"}</span></div>
                        <div>Provider: <span className="text-white">{lead.shippingProvider || "N/A"}</span></div>
                      </div>
                    )}

                    <div className="flex items-center gap-1 text-[9px] text-neon-lime bg-neon-lime/5 border border-neon-lime/10 rounded-lg p-2.5">
                      <Check size={12} />
                      <span>ORDER COMPLETED SUCCESSFULLY</span>
                    </div>

                    <button
                      onClick={() => updateLeadStatus(lead.id, "progress")}
                      className="w-full py-1.5 rounded-lg border border-neutral-850 hover:bg-neutral-900 text-[9px] font-bold text-neutral-400 hover:text-white uppercase transition-all cursor-pointer"
                    >
                      Revert Delivery
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CATEGORIES SETUP */}
      {activeTab === "categories" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 animate-fadeIn">
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2 border-b border-neutral-900 pb-4">
                <Plus size={18} className="text-neon-lime" />
                {isAr ? "إضافة فئة أحذية جديدة" : "Add Basket Category"}
              </h2>

              <form onSubmit={handleCategorySubmit} className="space-y-6">
                {/* Main Name Input - Prominent */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                    Category Name (Primary) *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={catNameFr}
                      onChange={(e) => handleCatNameFrChange(e.target.value)}
                      placeholder="e.g. Running Performance"
                      className="w-full bg-neutral-950 border-2 border-neutral-800 rounded-2xl px-4 py-4 text-base text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all font-outfit font-bold"
                      required
                    />
                    {catSlug && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 rounded-lg border border-neutral-800">
                        <Tag size={10} className="text-neon-lime" />
                        <span className="text-[10px] text-neutral-400 font-mono">/{catSlug}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Optional Expandable Section */}
                <div className="rounded-2xl border border-neutral-800/80 bg-neutral-900/20 overflow-hidden transition-all">
                  <button 
                    type="button"
                    onClick={() => setShowAdvancedCatOptions(!showAdvancedCatOptions)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-neutral-900/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Settings size={14} className="text-neutral-500" />
                      <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest font-outfit">
                        Advanced / Image / Multilingual Options (Optional)
                      </span>
                    </div>
                    <ChevronRight size={16} className={`text-neutral-500 transition-transform duration-300 ${showAdvancedCatOptions ? "rotate-90" : ""}`} />
                  </button>

                  {showAdvancedCatOptions && (
                    <div className="p-5 border-t border-neutral-800/80 space-y-5 bg-neutral-950/30 animate-fadeIn">
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">Category Image</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={catImage}
                            onChange={(e) => setCatImage(e.target.value)}
                            placeholder="URL or Upload from PC/Phone..."
                            className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all font-mono"
                          />
                          <input
                            type="file"
                            id="catImageUpload"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setCatImage(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => document.getElementById('catImageUpload')?.click()}
                            className="px-4 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                          >
                            <UploadCloud size={14} className="text-neon-lime" />
                            Upload Image
                          </button>
                        </div>
                        {catImage && catImage.startsWith('data:image') && (
                          <div className="mt-2 text-[9px] text-neon-lime font-mono">Image successfully loaded from local storage.</div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 text-right font-cairo">الاسم (عربي) - اختياري</label>
                        <input
                          type="text"
                          dir="rtl"
                          value={catNameAr}
                          onChange={(e) => setCatNameAr(e.target.value)}
                          placeholder="مثال: أحذية جري"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all text-right font-cairo"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">Description (FR) - Optional</label>
                          <textarea
                            rows={2}
                            value={catDescFr}
                            onChange={(e) => setCatDescFr(e.target.value)}
                            placeholder="Brief description for SEO..."
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all font-outfit resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 text-right font-cairo">الوصف (AR) - اختياري</label>
                          <textarea
                            rows={2}
                            dir="rtl"
                            value={catDescAr}
                            onChange={(e) => setCatDescAr(e.target.value)}
                            placeholder="وصف للفئة..."
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-lime/60 transition-all text-right font-cairo resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {catFormError && (
                  <div className="text-xs text-red-400 border border-red-500/20 bg-red-500/5 rounded-xl p-3.5 flex items-center gap-2">
                    <AlertTriangle size={14} />
                    {catFormError}
                  </div>
                )}
                {catFormSuccess && (
                  <div className="text-xs text-neon-lime border border-neon-lime/20 bg-neon-lime/5 rounded-xl p-3.5 flex items-center gap-2">
                    <Check size={14} />
                    <span>Category created successfully!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-neon-lime hover:bg-white text-obsidian font-black text-sm uppercase tracking-wider transition-all hover:scale-[1.02] neon-glow-lime cursor-pointer flex justify-center items-center gap-2 font-outfit"
                >
                  <Plus size={16} />
                  {isAr ? "حفظ الفئة الجديدة" : "Create Category"}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-900 pb-5 mb-6">
                  <Database size={18} className="text-cyan-400" />
                  Category Schema Table
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-neutral-900 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                        <th className="py-3 px-4 font-outfit">Category name</th>
                        <th className="py-3 px-4 font-outfit">URL Slug</th>
                        <th className="py-3 px-4 text-center font-outfit">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900/40">
                      {categories.map((cat) => (
                        <tr key={cat.id} className="text-xs text-neutral-300 hover:bg-neutral-900/10 transition-colors">
                          <td className="py-4.5 px-4">
                            <div className="font-bold text-white">{cat.nameFr}</div>
                            <div className="text-[10px] text-neutral-500 mt-1 font-cairo text-right rtl:text-left">{cat.nameAr}</div>
                          </td>
                          <td className="py-4.5 px-4 font-mono text-neutral-400 text-[11px] tracking-tight">/{cat.slug}</td>
                          <td className="py-4.5 px-4 text-center">
                            <button
                              onClick={() => {
                                if (confirm(isAr ? `حذف فئة "${cat.nameAr}"؟` : `Supprimer "${cat.nameFr}" ?`)) {
                                  deleteCategory(cat.slug);
                                }
                              }}
                              className="p-2 rounded-xl text-neutral-500 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
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
              <p className="text-[10px] text-neutral-500 font-mono mt-8 border-t border-neutral-900 pt-5">
                * Note: Deleting a category updates filter bubbles on home layout immediately.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: WILAYA LOGISTICS */}
      {activeTab === "shipping" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 animate-fadeIn">
          <div className="lg:col-span-7 rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-900 pb-5 mb-6 gap-4">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Truck size={18} className="text-neon-orange" />
                Wilaya Delivery Fees Setup
              </h2>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-neutral-900 border border-neutral-850 px-2 py-0.5 text-[10px] font-mono text-neutral-400">
                  {wilayaFees.length} WILAYAS
                </span>
                <button
                  onClick={async () => {
                    const confirm = window.confirm("This will erase existing wilayas and import the 69 new wilayas. Continue?");
                    if (confirm) {
                      await resetWilayas();
                    }
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all border bg-neon-lime/10 text-neon-lime border-neon-lime/30 hover:bg-neon-lime hover:text-obsidian font-outfit uppercase tracking-wider`}
                >
                  <Database size={12} />
                  AUTO SYNC 69 WILAYAS
                </button>
                <button
                  onClick={() => setShowAddWilaya(!showAddWilaya)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition-all border ${
                    showAddWilaya
                      ? "bg-neon-lime/10 text-neon-lime border-neon-lime/30"
                      : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white"
                  } font-outfit uppercase tracking-wider`}
                >
                  <Plus size={12} />
                  {showAddWilaya ? "CANCEL" : "ADD WILAYA"}
                </button>
              </div>
            </div>

            {/* Add Wilaya Form */}
            {showAddWilaya && (
              <div className="mb-6 rounded-2xl border border-neon-lime/20 bg-neon-lime/[0.02] p-5 animate-fadeIn">
                <h3 className="text-xs font-black text-neon-lime uppercase tracking-widest mb-4 font-outfit flex items-center gap-2">
                  <Plus size={14} />
                  Add New Wilaya
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">ID / Code *</label>
                    <input
                      type="text"
                      value={newWilayaId}
                      onChange={(e) => setNewWilayaId(e.target.value)}
                      placeholder="Ex: 70"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-neon-lime/60 transition-all font-outfit"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Name (FR) *</label>
                    <input
                      type="text"
                      value={newWilayaNameFr}
                      onChange={(e) => setNewWilayaNameFr(e.target.value)}
                      placeholder="Ex: 70 - Nom"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-neon-lime/60 transition-all font-outfit"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-cairo text-right">الاسم (AR) *</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={newWilayaNameAr}
                      onChange={(e) => setNewWilayaNameAr(e.target.value)}
                      placeholder="مثال: 70 - الاسم"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-neon-lime/60 transition-all font-cairo text-right"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">🏠 Domicile (DA) *</label>
                    <input
                      type="number"
                      value={newWilayaFee}
                      onChange={(e) => setNewWilayaFee(e.target.value)}
                      placeholder="600"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-neon-lime/60 transition-all font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">🏢 Bureau (DA) *</label>
                    <input
                      type="number"
                      value={newWilayaFeeBureau}
                      onChange={(e) => setNewWilayaFeeBureau(e.target.value)}
                      placeholder="400"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-neon-orange/60 transition-all font-mono"
                    />
                  </div>
                </div>

                {wilayaAddSuccess && (
                  <div className="text-xs text-neon-lime border border-neon-lime/20 bg-neon-lime/5 rounded-lg p-2 mb-3 flex items-center gap-1.5 font-outfit">
                    <Check size={12} />
                    <span>Wilaya added successfully!</span>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (!newWilayaId.trim() || !newWilayaNameFr.trim() || !newWilayaNameAr.trim() || !newWilayaFee.trim() || !newWilayaFeeBureau.trim()) {
                      alert("Please fill all fields");
                      return;
                    }
                    const feeVal = parseFloat(newWilayaFee);
                    const feeBureauVal = parseFloat(newWilayaFeeBureau);
                    if (isNaN(feeVal) || feeVal < 0 || isNaN(feeBureauVal) || feeBureauVal < 0) {
                      alert("Please enter valid fees");
                      return;
                    }
                    addWilaya({
                      id: newWilayaId.trim(),
                      nameFr: newWilayaNameFr.trim(),
                      nameAr: newWilayaNameAr.trim(),
                      fee: feeVal,
                      feeDomicile: feeVal,
                      feeBureau: feeBureauVal,
                    });
                    setNewWilayaId("");
                    setNewWilayaNameFr("");
                    setNewWilayaNameAr("");
                    setNewWilayaFee("");
                    setNewWilayaFeeBureau("");
                    setWilayaAddSuccess(true);
                    setTimeout(() => setWilayaAddSuccess(false), 3000);
                  }}
                  className="w-full py-2.5 rounded-xl bg-neon-lime/10 border border-neon-lime/30 hover:bg-neon-lime hover:text-obsidian text-neon-lime text-xs font-black cursor-pointer transition-all font-outfit uppercase tracking-wider"
                >
                  Add Wilaya to Database
                </button>
              </div>
            )}

            {/* Search filter */}
            <div className="mb-4">
              <input
                type="text"
                placeholder={isAr ? "ابحث عن ولاية..." : "Search wilayas..."}
                value={wilayaSearch}
                onChange={(e) => setWilayaSearch(e.target.value)}
                className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neon-orange/50 transition-all font-outfit"
              />
            </div>

            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-asphalt/95 backdrop-blur-md z-10">
                  <tr className="border-b border-neutral-900 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                    <th className="py-3 px-4 font-outfit">Wilaya / Province</th>
                    <th className="py-3 px-4 font-outfit">🏠 Domicile</th>
                    <th className="py-3 px-4 font-outfit">🏢 Bureau</th>
                    <th className="py-3 px-4 text-center font-outfit">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900/50">
                  {wilayaFees
                    .filter((w) =>
                      w.nameFr.toLowerCase().includes(wilayaSearch.toLowerCase()) ||
                      w.nameAr.includes(wilayaSearch) ||
                      w.id.includes(wilayaSearch)
                    )
                    .map((w) => {
                    const editing = wilayaEditId === w.id;
                    return (
                      <tr key={w.id} className="text-xs text-neutral-300 hover:bg-neutral-900/10 transition-colors">
                        <td className="py-4 px-4 font-bold">
                          <div className="text-white">{w.nameFr}</div>
                          <div className="text-[10px] text-neutral-500 font-cairo text-right rtl:text-left mt-0.5">{w.nameAr}</div>
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-neon-lime text-sm">
                          {editing ? (
                            <input
                              type="number"
                              value={wilayaEditFee}
                              onChange={(e) => setWilayaEditFee(e.target.value)}
                              placeholder="Domicile"
                              className="w-20 bg-neutral-950 border border-neon-lime/40 focus:border-neon-lime/60 rounded px-2 py-1 text-white text-xs"
                            />
                          ) : (
                            <span>{formatPrice(w.feeDomicile)}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 font-mono font-bold text-neon-orange text-sm">
                          {editing ? (
                            <input
                              type="number"
                              value={wilayaEditFeeBureau}
                              onChange={(e) => setWilayaEditFeeBureau(e.target.value)}
                              placeholder="Bureau"
                              className="w-20 bg-neutral-950 border border-neon-orange/40 focus:border-neon-orange/60 rounded px-2 py-1 text-white text-xs"
                            />
                          ) : (
                            <span>{formatPrice(w.feeBureau)}</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {editing ? (
                              <>
                                <button
                                  onClick={() => handleSaveWilayaFee(w.id)}
                                  className="p-1.5 bg-neon-orange/10 hover:bg-neon-orange hover:text-obsidian text-neon-orange border border-neon-orange/20 rounded-lg text-[10px] font-bold cursor-pointer"
                                >
                                  SAVE
                                </button>
                                <button
                                  onClick={() => { setWilayaEditId(null); setWilayaEditFeeBureau(""); }}
                                  className="p-1.5 bg-neutral-800 text-neutral-400 hover:text-white rounded-lg text-[10px] font-bold cursor-pointer"
                                >
                                  CANCEL
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => {
                                    setWilayaEditId(w.id);
                                    setWilayaEditFee(w.feeDomicile.toString());
                                    setWilayaEditFeeBureau(w.feeBureau.toString());
                                  }}
                                  className="px-2.5 py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white rounded-lg text-[10px] font-bold cursor-pointer transition-colors"
                                >
                                  Edit Fees
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(isAr ? `حذف ولاية "${w.nameAr}"؟` : `Delete "${w.nameFr}"?`)) {
                                      deleteWilaya(w.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg text-neutral-500 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {wilayaFees.filter((w) =>
              w.nameFr.toLowerCase().includes(wilayaSearch.toLowerCase()) ||
              w.nameAr.includes(wilayaSearch) ||
              w.id.includes(wilayaSearch)
            ).length === 0 && (
              <div className="text-center py-8 text-neutral-500 text-xs font-outfit">
                No wilayas match your search.
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2 border-b border-neutral-900 pb-4">
                <Settings size={18} className="text-neon-orange" />
                Contact Redirections
              </h2>

              <form onSubmit={handleSaveSettings} className="space-y-4 mt-2">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">WhatsApp Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 text-neutral-500" size={14} />
                    <input
                      type="text"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+213550123456"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-4 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-orange/60 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Owner Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 text-neutral-500" size={14} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="owner@sneakersdz.com"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-4 py-3 text-xs text-white placeholder-neutral-700 focus:outline-none focus:border-neon-orange/60 transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                {showSettingsSaved && (
                  <div className="text-[10px] text-neon-orange bg-neon-orange/5 border border-neon-orange/20 rounded-lg p-2.5 flex items-center gap-1.5">
                    <Check size={12} />
                    <span>Redirection settings saved successfully!</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl border border-neutral-800 hover:border-neon-orange/45 text-xs text-neutral-300 hover:text-neon-orange transition-all cursor-pointer font-outfit uppercase tracking-widest font-black"
                >
                  Save Settings
                </button>
              </form>
            </div>

            {/* Wilaya Stats Card */}
            <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8 mt-6">
              <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2 border-b border-neutral-900 pb-4">
                <TrendingUp size={18} className="text-neon-lime" />
                Delivery Stats
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400 font-outfit">Total Wilayas</span>
                  <span className="text-white font-black font-mono">{wilayaFees.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400 font-outfit">Avg. Delivery Fee</span>
                  <span className="text-neon-orange font-bold font-mono">
                    {formatPrice(Math.round(wilayaFees.reduce((a, b) => a + b.fee, 0) / (wilayaFees.length || 1)))}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400 font-outfit">Min Fee</span>
                  <span className="text-emerald-400 font-bold font-mono">
                    {formatPrice(Math.min(...wilayaFees.map(w => w.fee)))}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-400 font-outfit">Max Fee</span>
                  <span className="text-red-400 font-bold font-mono">
                    {formatPrice(Math.max(...wilayaFees.map(w => w.fee)))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: MARKETING BANNER & DROP */}
      {activeTab === "marketing" && (
        <div className="max-w-2xl mx-auto rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8 animate-fadeIn">
          <div className="border-b border-neutral-900 pb-5 mb-6">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={18} className="text-neon-lime" />
              Homepage Branding & Banner Manager
            </h2>
            <p className={`text-xs text-neutral-400 mt-1 ${isAr ? 'font-cairo' : 'font-outfit'}`}>
              {isAr 
                ? "ارفع صورة بنر تسويقي جديدة لعرضها في أعلى الصفحة الرئيسية للمتجر لجذب المشترين." 
                : "Configure custom graphical layout banners to dominate the user experience storefront."}
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                Marketing Banner Dropzone
              </label>

              <div
                onDragEnter={handleBannerDrag}
                onDragOver={handleBannerDrag}
                onDragLeave={handleBannerDrag}
                onDrop={handleBannerDrop}
                className={`h-48 w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-4 cursor-pointer transition-all duration-300 relative ${
                  bannerDragActive
                    ? "border-neon-lime bg-neon-lime/5"
                    : heroBanner
                    ? "border-neutral-800 bg-neutral-950"
                    : "border-neutral-800 bg-neutral-900/20 hover:border-neutral-700"
                }`}
              >
                <input
                  ref={bannerFileInputRef}
                  type="file"
                  accept="image/*,.heic,.heif"
                  onChange={handleBannerFileInput}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {heroBanner ? (
                  <div className="relative h-full w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={heroBanner}
                      alt="Hero banner preview"
                      className="h-full w-full object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-obsidian/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all rounded-xl">
                      <UploadCloud className="text-white" size={24} />
                      <span className="text-[10px] text-white font-bold ml-1 font-outfit">REPLACE HERO BANNER</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <UploadCloud className="text-neutral-500 animate-bounce mb-2" size={24} />
                    <p className="text-xs font-bold text-white uppercase font-outfit">
                      Drag & Drop Homepage Hero Banner Image
                    </p>
                    <p className="text-[9px] text-neutral-600 mt-1 uppercase font-mono">
                      Recommended size: 1920x1080 high-res aesthetic sneaker space photo
                    </p>
                  </div>
                )}
              </div>
            </div>

            {bannerSuccess && (
              <div className="text-xs text-neon-lime border border-neon-lime/20 bg-neon-lime/5 rounded-xl p-3 flex items-center gap-1.5">
                <Check size={14} />
                <span>Custom hero banner active!</span>
              </div>
            )}

            <div className="flex gap-4">
              {heroBanner && (
                <button
                  onClick={() => {
                    setHeroBanner(null);
                    setBannerSuccess(false);
                  }}
                  className="flex-1 py-3 border border-red-500/30 hover:border-red-500 text-red-500 hover:bg-red-500/5 text-xs font-bold uppercase rounded-xl cursor-pointer transition-all"
                >
                  Remove Custom Banner
                </button>
              )}
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 space-y-2">
              <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest font-outfit">Banner Integration Status</span>
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${heroBanner ? "bg-neon-lime animate-pulse" : "bg-neutral-700"}`}></div>
                <span className="text-xs text-neutral-400 font-mono">
                  {heroBanner ? "CUSTOM BANNER RENDERED" : "DEFAULT CULTURAL STOCK BG ACTIVE"}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-normal">
                If active, the public storefront landing page will automatically replace its default geometric sneaker space backdrop with your custom banner. Perfect for running limited-time discount drops or promoting new collections.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- EDIT SNEAKER MODAL --- */}
      {editingShoe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl rounded-3xl border border-neutral-800 bg-[#0d0d11] p-6 sm:p-8 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-thin">
            
            {/* Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-neon-lime via-neon-orange to-cyan-400"></div>

            {/* Close button */}
            <button
              onClick={() => setEditingShoe(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white hover:bg-neutral-900 p-2 rounded-xl transition-all cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-6 flex items-center gap-3">
              <div className="p-3 bg-neon-lime/10 text-neon-lime rounded-xl">
                <Package size={22} />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white font-outfit uppercase">
                  Modify Sneaker Details
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Update name, pricing, sizes, description and promotion status.
                </p>
              </div>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-5">
              {/* Image Drag & Drop */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                  Sneaker Image *
                </label>
                <div
                  onDragEnter={(e) => handleDrag(e, true)}
                  onDragOver={(e) => handleDrag(e, true)}
                  onDragLeave={(e) => handleDrag(e, true)}
                  onDrop={(e) => handleDrop(e, true)}
                  className={`h-40 w-full border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-4 cursor-pointer transition-all duration-300 relative ${
                    editDragActive
                      ? "border-neon-lime bg-neon-lime/5"
                      : editImage
                      ? "border-neutral-800 bg-neutral-950"
                      : "border-neutral-800 bg-neutral-900/20"
                  }`}
                >
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*,.heic,.heif"
                    onChange={(e) => handleFileInput(e, true)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />

                  {editImage && !editImageError ? (
                    <div className="relative h-full w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={editImage}
                        alt="Edit Staged"
                        className="h-full w-full object-contain rounded-xl"
                        onError={() => setEditImageError(true)}
                      />
                      <div className="absolute inset-0 bg-obsidian/45 flex items-center justify-center opacity-0 hover:opacity-100 transition-all rounded-xl">
                        <UploadCloud className="text-white" size={24} />
                        <span className="text-[10px] text-white font-bold ml-1 font-outfit">REPLACE IMAGE</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <UploadCloud className="text-neutral-500 animate-bounce mb-2" size={24} />
                      <p className="text-xs font-bold text-white uppercase font-outfit">Drag & Drop Image</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Preset Image Gallery Picker */}
              <div>
                <button
                  type="button"
                  onClick={() => setEditShowGallery(!editShowGallery)}
                  className="w-full py-2 bg-neutral-900 hover:bg-neutral-850 text-[10px] font-bold text-neutral-400 hover:text-white rounded-xl border border-neutral-800 transition-all flex items-center justify-center gap-1.5 cursor-pointer font-outfit"
                >
                  <ImageIcon size={12} className="text-neon-lime" />
                  {editShowGallery ? "HIDE GALLERY" : "SELECT FROM GALLERY TEMPLATES"}
                </button>

                {editShowGallery && (
                  <div className="grid grid-cols-4 gap-2 border border-neutral-800 bg-neutral-950 p-2 rounded-xl mt-2 animate-fadeIn">
                    {presetImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setEditImage(img.url);
                          setEditImageError(false);
                          setEditShowGallery(false);
                        }}
                        className="relative aspect-square rounded-lg overflow-hidden border border-neutral-850 hover:border-neon-lime transition-all cursor-pointer bg-neutral-900 group"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-obsidian/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <span className="text-[8px] text-white font-bold font-mono">CHOOSE</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Bilingual Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Model Name (FR) *</label>
                  <input
                    type="text"
                    value={editNameFr}
                    onChange={(e) => setEditNameFr(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-neon-lime/60 transition-all font-outfit"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 text-right font-cairo">اسم الموديل (AR) *</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={editNameAr}
                    onChange={(e) => setEditNameAr(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-neon-lime/60 transition-all text-right font-cairo"
                    required
                  />
                </div>
              </div>

              {/* Price & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Price (DA) *</label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-neon-lime/60 transition-all font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Category *</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-neon-lime/60 transition-all cursor-pointer font-outfit"
                    required
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.nameFr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Colorways */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">{isAr ? "خيارات الألوان" : "Couleurs disponibles"}</label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {presetColors.map((color) => {
                    const selected = editColors.includes(color);
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => toggleColorway(color, true)}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all cursor-pointer font-outfit ${
                          selected
                            ? "bg-neon-lime/10 text-neon-lime border-neon-lime/40"
                            : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700 hover:text-white"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editCustomColor}
                    onChange={(e) => setEditCustomColor(e.target.value)}
                    placeholder="Add custom color..."
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neon-lime/50 font-outfit"
                  />
                  <button
                    type="button"
                    onClick={() => addCustomColor(true)}
                    className="px-3.5 py-1.5 bg-neutral-800 text-white rounded-lg text-xs font-bold font-outfit border border-neutral-700 hover:bg-neutral-700 cursor-pointer"
                  >
                    ADD
                  </button>
                </div>
              </div>

              {/* ══════ COLOR VARIANTS (Edit Modal) ══════ */}
              <div>
                <label className="block text-[10px] font-bold text-neon-orange uppercase tracking-widest mb-2 font-outfit">
                  🎨 {isAr ? "ألوان المنتج (صورة لكل لون)" : "Color Variants (Image per Color)"}
                </label>

                {editShoeVariantColors.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {editShoeVariantColors.map((vc, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-neutral-900/60 border border-neutral-800 rounded-xl px-3 py-2">
                        <div className="w-7 h-7 rounded-full border-2 border-white/20 flex-shrink-0" style={{ backgroundColor: vc.hex }} />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-white font-outfit truncate">{vc.nameFr}</div>
                          <div className="text-[9px] text-neutral-500 font-mono truncate">{vc.nameAr} · {vc.hex}</div>
                        </div>
                        {vc.image && (
                          <div className="w-8 h-8 rounded-lg overflow-hidden border border-neutral-700 flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={vc.image} alt={vc.nameFr} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setEditShoeVariantColors(editShoeVariantColors.filter((_, i) => i !== idx))}
                          className="text-red-500 hover:text-red-400 p-1 cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-neutral-950/50 border border-dashed border-neutral-700 rounded-xl p-3 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={editVariantNameFr}
                      onChange={(e) => setEditVariantNameFr(e.target.value)}
                      placeholder="Color name (FR)"
                      className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neon-orange/50 font-outfit"
                    />
                    <input
                      type="text"
                      value={editVariantNameAr}
                      onChange={(e) => setEditVariantNameAr(e.target.value)}
                      placeholder="Color name (AR)"
                      className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neon-orange/50 font-cairo text-right"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={editVariantHex}
                      onChange={(e) => setEditVariantHex(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-neutral-700 cursor-pointer bg-transparent p-0.5"
                    />
                    <input
                      type="text"
                      value={editVariantHex}
                      onChange={(e) => setEditVariantHex(e.target.value)}
                      placeholder="#FFFFFF"
                      className="w-24 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neon-orange/50 font-mono"
                    />
                    <div className="flex-1 flex flex-col gap-2">
                      <input
                        type="file"
                        accept="image/*,.heic,.heif"
                        id="editVariantImageUpload"
                        className="hidden"
                        onChange={(e) => handleVariantFileInput(e, true)}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById("editVariantImageUpload")?.click()}
                        className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-xs font-bold text-white rounded-lg border border-neutral-700 transition-all flex items-center justify-center gap-2 cursor-pointer font-outfit"
                      >
                        {editVariantImage ? (
                          <img src={editVariantImage} alt="Preview" className="h-4 w-4 object-cover rounded" />
                        ) : (
                          <UploadCloud size={14} className="text-neon-orange" />
                        )}
                        {editVariantImage ? "Image Selected (Change)" : "UPLOAD FROM PC"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowEditVariantGallery(!showEditVariantGallery)}
                        className="w-full py-1.5 bg-neutral-800 hover:bg-neutral-700 text-[10px] font-bold text-neutral-300 hover:text-white rounded-lg border border-neutral-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer font-outfit"
                      >
                        <ImageIcon size={12} className="text-neon-orange" />
                        {showEditVariantGallery ? "HIDE GALLERY" : "SELECT IMAGE FROM GALLERY"}
                      </button>
                    </div>
                  </div>

                  {/* Edit Variant Image Gallery */}
                  {showEditVariantGallery && (
                    <div className="grid grid-cols-4 gap-2 border border-neutral-800 bg-neutral-950 p-2 rounded-xl mb-4 animate-fadeIn">
                      {presetImages.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            setEditVariantImage(img.url);
                            setShowEditVariantGallery(false);
                          }}
                          className="relative aspect-square rounded-lg overflow-hidden border border-neutral-850 hover:border-neon-orange transition-all cursor-pointer bg-neutral-900 group"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.url} alt={img.name} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-obsidian/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                            <span className="text-[8px] text-white font-bold font-mono">CHOOSE</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (!editVariantNameFr || !editVariantImage) {
                        alert("Please fill color name and image URL");
                        return;
                      }
                      setEditShoeVariantColors([...editShoeVariantColors, {
                        nameFr: editVariantNameFr,
                        nameAr: editVariantNameAr || editVariantNameFr,
                        hex: editVariantHex,
                        image: editVariantImage,
                      }]);
                      setEditVariantNameFr("");
                      setEditVariantNameAr("");
                      setEditVariantHex("#FFFFFF");
                      setEditVariantImage("");
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-neon-orange/10 border border-neon-orange/30 text-neon-orange hover:bg-neon-orange/20 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer font-outfit"
                  >
                    <Plus size={14} />
                    Add Color Variant
                  </button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">Sizes Setup</label>
                <div className="flex flex-wrap gap-1.5">
                  {allSizesList.map((sz) => {
                    const selected = editSizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          if (selected) {
                            setEditSizes(editSizes.filter(s => s !== sz));
                          } else {
                            setEditSizes([...editSizes, sz].sort((a, b) => a - b));
                          }
                        }}
                        className={`h-8 w-8 text-xs font-black rounded-lg border font-mono transition-all flex items-center justify-center cursor-pointer ${
                          selected
                            ? "border-neon-lime bg-neon-lime/10 text-neon-lime"
                            : "border-neutral-850 bg-neutral-900/40 text-neutral-500"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 font-outfit">Description (FR) *</label>
                  <textarea
                    rows={2}
                    value={editDescFr}
                    onChange={(e) => setEditDescFr(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-neon-lime/60 transition-all font-outfit resize-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5 text-right font-cairo">الوصف (AR) *</label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={editDescAr}
                    onChange={(e) => setEditDescAr(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white focus:outline-none focus:border-neon-lime/60 transition-all text-right font-cairo resize-none"
                    required
                  />
                </div>
              </div>

              {/* Featured / Drops toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-white font-outfit">Featured</span>
                  <button
                    type="button"
                    onClick={() => setEditFeatured(!editFeatured)}
                    className={`mt-2 w-full py-1 text-[9px] font-bold rounded-lg border transition-all ${
                      editFeatured ? "bg-neon-lime/15 border-neon-lime text-neon-lime" : "bg-neutral-900 border-neutral-800 text-neutral-500"
                    }`}
                  >
                    {editFeatured ? "FEATURED ACTIVE" : "TOGGLE FEATURED"}
                  </button>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-white font-outfit">Hot Drop</span>
                  <button
                    type="button"
                    onClick={() => setEditHotDrop(!editHotDrop)}
                    className={`mt-2 w-full py-1 text-[9px] font-bold rounded-lg border transition-all ${
                      editHotDrop ? "bg-neon-orange/15 border-neon-orange text-neon-orange" : "bg-neutral-900 border-neutral-800 text-neutral-500"
                    }`}
                  >
                    {editHotDrop ? "HOT DROP ACTIVE" : "TOGGLE HOT DROP"}
                  </button>
                </div>
                <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-3 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-white font-outfit">New Arrival</span>
                  <button
                    type="button"
                    onClick={() => setEditNewArrival(!editNewArrival)}
                    className={`mt-2 w-full py-1 text-[9px] font-bold rounded-lg border transition-all ${
                      editNewArrival ? "bg-cyan-400/15 border-cyan-400 text-cyan-400" : "bg-neutral-900 border-neutral-800 text-neutral-500"
                    }`}
                  >
                    {editNewArrival ? "NEW ARRIVAL ACTIVE" : "TOGGLE NEW ARRIVAL"}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-neutral-900">
                <button
                  type="button"
                  onClick={() => setEditingShoe(null)}
                  className="flex-1 py-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-xs font-bold text-neutral-400 hover:text-white rounded-xl cursor-pointer transition-all uppercase tracking-wider"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-neon-lime hover:bg-white text-obsidian text-xs font-black rounded-xl cursor-pointer transition-all hover:scale-[1.01] neon-glow-lime uppercase tracking-wider"
                >
                  Save Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* TAB 8: APPEARANCE SETTINGS */}
      {activeTab === "appearance" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 animate-fadeIn">
          <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2 border-b border-neutral-900 pb-4">
              <Palette size={18} className="text-neon-lime" />
              {isAr ? "مظهر المتجر والإعدادات" : "Store Appearance & Settings"}
            </h2>

            <form onSubmit={handleSaveSettings} className="space-y-6">
              {showSettingsSaved && (
                <div className="bg-neon-lime/10 border border-neon-lime/30 text-neon-lime text-xs font-bold p-3 rounded-xl flex items-center justify-center gap-2">
                  <Check size={14} /> {isAr ? "تم حفظ الإعدادات بنجاح!" : "Settings Saved Successfully!"}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                  {isAr ? "اسم المتجر" : "Store Name"}
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="SNKRS ALG"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-lime/60 transition-all font-outfit"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                  {isAr ? "اللون الرئيسي" : "Primary Accent Color (HEX)"}
                </label>
                <div className="flex gap-4 items-center">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="h-10 w-20 rounded cursor-pointer bg-neutral-950 border border-neutral-800 p-1"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-lime/60 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                  {isAr ? "شريط الإعلانات" : "Announcement Banner Text"}
                </label>
                <textarea
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  rows={2}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-lime/60 transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-lime/60 transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-2 font-outfit">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-lime/60 transition-all font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-neon-lime hover:bg-white text-obsidian text-sm font-black rounded-xl cursor-pointer transition-all hover:scale-[1.01] neon-glow-lime uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Settings size={18} />
                {isAr ? "حفظ مظهر المتجر" : "Save Appearance Settings"}
              </button>
            </form>
          </div>
          
          <div className="rounded-3xl border border-neutral-800 bg-asphalt/40 backdrop-blur-md p-6 sm:p-8 flex flex-col items-center justify-center text-center">
             <Palette size={48} className="text-neon-lime opacity-20 mb-4" />
             <h3 className="text-lg font-bold text-white mb-2">Live Theme Customization</h3>
             <p className="text-sm text-neutral-400 mb-6 max-w-sm">Changes made here will instantly reflect across the entire store for all users using Supabase Realtime.</p>
             <div className="w-full p-4 border border-neutral-800 rounded-xl bg-neutral-950">
               <div className="text-xs font-bold text-neutral-500 mb-2 uppercase tracking-widest">Preview Color</div>
               <div className="w-full h-12 rounded-lg" style={{ backgroundColor: primaryColor, boxShadow: `0 0 20px ${primaryColor}40` }}></div>
             </div>
          </div>
        </div>
      )}

    </div>
  );
};
