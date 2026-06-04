export interface Category {
  id: string;
  slug: string;
  nameFr: string;
  nameAr: string;
  descFr: string;
  descAr: string;
}

export interface Sneaker {
  id: string;
  slug: string;
  nameFr: string;
  nameAr: string;
  price: number; // in DZD
  categorySlug: string;
  image: string;
  sizes: number[];
  sizesStock: Record<number, number>; // size -> quantity
  colorways: string[];
  descFr: string;
  descAr: string;
  featured?: boolean;
  isHotDrop?: boolean;
  isNewArrival?: boolean;
}

export interface Lead {
  id: string;
  customerName: string;
  phoneNumber: string;
  shoeId: string;
  size: number;
  wilayaId: string;
  status: "todo" | "progress" | "delivered";
  notes?: string;
  createdAt: string;
}

export interface WilayaFee {
  id: string;
  nameFr: string;
  nameAr: string;
  fee: number; // in DZD
}

export interface CartItem {
  id: string;
  sneakerId: string;
  size: number;
  quantity: number;
}

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat_1",
    slug: "running-performance",
    nameFr: "Course de performance",
    nameAr: "أحذية الجري الرياضية",
    descFr: "Propulsion maximale et amorti réactif pour battre tous vos records.",
    descAr: "دفع أقصى وامتصاص صدمات مرن لتحطيم أرقامك القياسية."
  },
  {
    id: "cat_2",
    slug: "daily-walking-comfort",
    nameFr: "Marche quotidienne",
    nameAr: "أحذية المشي اليومي",
    descFr: "Confort absolu et soutien ergonomique tout au long de la journée.",
    descAr: "راحة مطلقة ودعم مريح للقدمين طوال اليوم."
  },
  {
    id: "cat_3",
    slug: "streetwear-lifestyle",
    nameFr: "Streetwear",
    nameAr: "أحذية عصرية",
    descFr: "Le style urbain ultime combinant esthétique rétro et design futuriste.",
    descAr: "الأسلوب الحضري الأمثل الذي يجمع بين الجمال الكلاسيكي والتصميم المستقبلي."
  }
];

export const INITIAL_SNEAKERS: Sneaker[] = [
  // Running & Performance
  {
    id: "shoe_1",
    slug: "neon-volt-runner",
    nameFr: "Volt Runner Elite",
    nameAr: "فولت رانر إيليت",
    price: 18500,
    categorySlug: "running-performance",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    sizesStock: { 39: 4, 40: 8, 41: 12, 42: 15, 43: 6, 44: 5, 45: 3 },
    colorways: ["Neon Green", "Obsidian Black"],
    descFr: "Conçue pour la vitesse pure avec une plaque en fibre de carbone intégrée.",
    descAr: "مصممة للسرعة الفائقة مع لوحة مدمجة من ألياف الكربون.",
    featured: true,
    isHotDrop: true
  },
  {
    id: "shoe_2",
    slug: "gravity-shadow-max",
    nameFr: "Gravity Shadow Max",
    nameAr: "غرافيتي شادو ماكس",
    price: 21000,
    categorySlug: "running-performance",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    sizesStock: { 39: 2, 40: 5, 41: 7, 42: 9, 43: 4, 44: 2, 45: 1 },
    colorways: ["Shadow Grey", "Carbon Grey"],
    descFr: "Amorti ultra-léger et mesh respirant respirant haut de gamme.",
    descAr: "تبطين فائق الخفة وشبكة علوية ممتازة تسمح بالتهوية.",
    featured: false,
    isNewArrival: true
  },

  // Daily Walking & Comfort
  {
    id: "shoe_3",
    slug: "cloudfoam-cushion-ar",
    nameFr: "Cloudfoam Pro Cushion",
    nameAr: "كلاود فوم برو كوشن",
    price: 14500,
    categorySlug: "daily-walking-comfort",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    sizesStock: { 39: 5, 40: 10, 41: 15, 42: 12, 43: 8, 44: 4, 45: 2 },
    colorways: ["Cloud White", "Pink Volt"],
    descFr: "Technologie de semelle à mémoire de forme pour une marche sans effort.",
    descAr: "تقنية النعل الداخلي بذاكرة الشكل لخطوات مريحة دون أي مجهود.",
    featured: true,
    isNewArrival: true
  },
  {
    id: "shoe_4",
    slug: "neon-pulse-green",
    nameFr: "Pulse Zoom Neon",
    nameAr: "بولس زوم نيون",
    price: 16000,
    categorySlug: "daily-walking-comfort",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    sizesStock: { 39: 6, 40: 6, 41: 8, 42: 10, 43: 6, 44: 3, 45: 2 },
    colorways: ["Pulse Lime", "Stealth Black"],
    descFr: "Mesh ergonomique extensible avec support de voûte plantaire ciblé.",
    descAr: "نسيج مرن ومريح للقدمين مع دعم مخصص لقوس القدم.",
    featured: false
  },

  // Streetwear & Lifestyle
  {
    id: "shoe_5",
    slug: "retro-terracotta-vibe",
    nameFr: "Retro Terracotta",
    nameAr: "ريترو تيراكوتا",
    price: 19000,
    categorySlug: "streetwear-lifestyle",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    sizesStock: { 39: 3, 40: 6, 41: 9, 42: 12, 43: 7, 44: 5, 45: 3 },
    colorways: ["Suede Terracotta", "Amber Gold"],
    descFr: "Cuir suédé premium aux teintes terreuses, idéal pour vos tenues streetwear.",
    descAr: "جلد شمواه فاخر بألوان ترابية طبيعية، مثالي للملابس العصرية اليومية.",
    featured: true,
    isHotDrop: true
  },
  {
    id: "shoe_6",
    slug: "electric-yellow-canvas",
    nameFr: "Vibe Classic Amber",
    nameAr: "فايب كلاسيك أمبر",
    price: 9500,
    categorySlug: "streetwear-lifestyle",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    sizesStock: { 39: 8, 40: 12, 41: 15, 42: 14, 43: 8, 44: 6, 45: 4 },
    colorways: ["Amber Yellow", "Classic Black"],
    descFr: "Style rétro intemporel, toile ultra-résistante avec semelle vulcanisée.",
    descAr: "تصميم كلاسيكي خالد، قماش شديد التحمل ونعل مطاطي معالج.",
    featured: false
  },
  {
    id: "shoe_7",
    slug: "obsidian-stealth-baskets",
    nameFr: "Stealth Obsidian Low",
    nameAr: "ستيلث أوبسيديان لو",
    price: 17000,
    categorySlug: "streetwear-lifestyle",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=600",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    sizesStock: { 39: 5, 40: 8, 41: 11, 42: 12, 43: 5, 44: 4, 45: 2 },
    colorways: ["Matte Black", "Glow Neon"],
    descFr: "Robe noire monochrome haut de gamme dotée d'accents réfléchissants.",
    descAr: "مظهر أسود موحد فاخر مع تفاصيل عاكسة للضوء.",
    featured: false
  }
];

export const INITIAL_WILAYAS: WilayaFee[] = [
  { id: "alger", nameFr: "Alger (Algeria Center)", nameAr: "الجزائر العاصمة", fee: 400 },
  { id: "blida", nameFr: "Blida", nameAr: "البليدة", fee: 450 },
  { id: "oran", nameFr: "Oran", nameAr: "وهران", fee: 600 },
  { id: "constantine", nameFr: "Constantine", nameAr: "قسنطينة", fee: 650 },
  { id: "setif", nameFr: "Sétif", nameAr: "سطيف", fee: 700 },
  { id: "annaba", nameFr: "Annaba", nameAr: "عنابة", fee: 650 },
  { id: "tlemcen", nameFr: "Tlemcen", nameAr: "تلمسان", fee: 700 },
  { id: "bejaia", nameFr: "Béjaïa", nameAr: "بجاية", fee: 600 },
  { id: "batna", nameFr: "Batna", nameAr: "باتنة", fee: 650 },
  { id: "tizi_ouzou", nameFr: "Tizi Ouzou", nameAr: "تيزي وزو", fee: 550 },
  { id: "chlef", nameFr: "Chlef", nameAr: "الشلف", fee: 550 },
  { id: "biskra", nameFr: "Biskra", nameAr: "بسكرة", fee: 700 },
  { id: "djelfa", nameFr: "Djelfa", nameAr: "الجلفة", fee: 650 },
  { id: "sidi_bel_abbes", nameFr: "Sidi Bel Abbès", nameAr: "سيدي بلعباس", fee: 650 },
  { id: "skikda", nameFr: "Skikda", nameAr: "سكيكدة", fee: 650 },
  { id: "ouargla", nameFr: "Ouargla", nameAr: "ورقلة", fee: 800 },
  { id: "other", nameFr: "Autres Wilayas", nameAr: "ولايات أخرى", fee: 800 }
];
