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
  trackingNumber?: string;
  shippingProvider?: string;
  shippedAt?: string;
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
  { id: "1", nameFr: "1 - Adrar", nameAr: "1 - أدرار", fee: 900 },
  { id: "2", nameFr: "2 - Chlef", nameAr: "2 - الشلف", fee: 500 },
  { id: "3", nameFr: "3 - Laghouat", nameAr: "3 - الأغواط", fee: 700 },
  { id: "4", nameFr: "4 - Oum El Bouaghi", nameAr: "4 - أم البواقي", fee: 600 },
  { id: "5", nameFr: "5 - Batna", nameAr: "5 - باتنة", fee: 600 },
  { id: "6", nameFr: "6 - Béjaïa", nameAr: "6 - بجاية", fee: 500 },
  { id: "7", nameFr: "7 - Biskra", nameAr: "7 - بسكرة", fee: 700 },
  { id: "8", nameFr: "8 - Béchar", nameAr: "8 - بشار", fee: 800 },
  { id: "9", nameFr: "9 - Blida", nameAr: "9 - البليدة", fee: 400 },
  { id: "10", nameFr: "10 - Bouira", nameAr: "10 - البويرة", fee: 500 },
  { id: "11", nameFr: "11 - Tamanrasset", nameAr: "11 - تمنراست", fee: 1200 },
  { id: "12", nameFr: "12 - Tébessa", nameAr: "12 - تبسة", fee: 700 },
  { id: "13", nameFr: "13 - Tlemcen", nameAr: "13 - تلمسان", fee: 600 },
  { id: "14", nameFr: "14 - Tiaret", nameAr: "14 - تيارت", fee: 600 },
  { id: "15", nameFr: "15 - Tizi Ouzou", nameAr: "15 - تيزي وزو", fee: 500 },
  { id: "16", nameFr: "16 - Alger", nameAr: "16 - الجزائر العاصمة", fee: 400 },
  { id: "17", nameFr: "17 - Djelfa", nameAr: "17 - الجلفة", fee: 600 },
  { id: "18", nameFr: "18 - Jijel", nameAr: "18 - جيجل", fee: 600 },
  { id: "19", nameFr: "19 - Sétif", nameAr: "19 - سطيف", fee: 600 },
  { id: "20", nameFr: "20 - Saïda", nameAr: "20 - سعيدة", fee: 600 },
  { id: "21", nameFr: "21 - Skikda", nameAr: "21 - سكيكدة", fee: 600 },
  { id: "22", nameFr: "22 - Sidi Bel Abbès", nameAr: "22 - سيدي بلعباس", fee: 600 },
  { id: "23", nameFr: "23 - Annaba", nameAr: "23 - عنابة", fee: 600 },
  { id: "24", nameFr: "24 - Guelma", nameAr: "24 - قالمة", fee: 600 },
  { id: "25", nameFr: "25 - Constantine", nameAr: "25 - قسنطينة", fee: 600 },
  { id: "26", nameFr: "26 - Médéa", nameAr: "26 - المدية", fee: 500 },
  { id: "27", nameFr: "27 - Mostaganem", nameAr: "27 - مستغانم", fee: 500 },
  { id: "28", nameFr: "28 - M'Sila", nameAr: "28 - المسيلة", fee: 600 },
  { id: "29", nameFr: "29 - Mascara", nameAr: "29 - معسكر", fee: 600 },
  { id: "30", nameFr: "30 - Ouargla", nameAr: "30 - ورقلة", fee: 800 },
  { id: "31", nameFr: "31 - Oran", nameAr: "31 - وهران", fee: 500 },
  { id: "32", nameFr: "32 - El Bayadh", nameAr: "32 - البيض", fee: 700 },
  { id: "33", nameFr: "33 - Illizi", nameAr: "33 - إليزي", fee: 1000 },
  { id: "34", nameFr: "34 - Bordj Bou Arréridj", nameAr: "34 - برج بوعريريج", fee: 500 },
  { id: "35", nameFr: "35 - Boumerdès", nameAr: "35 - بومرداس", fee: 400 },
  { id: "36", nameFr: "36 - El Tarf", nameAr: "36 - الطارف", fee: 600 },
  { id: "37", nameFr: "37 - Tindouf", nameAr: "37 - تندوف", fee: 1000 },
  { id: "38", nameFr: "38 - Tissemsilt", nameAr: "38 - تيسمسيلت", fee: 600 },
  { id: "39", nameFr: "39 - El Oued", nameAr: "39 - الوادي", fee: 800 },
  { id: "40", nameFr: "40 - Khenchela", nameAr: "40 - خنشلة", fee: 700 },
  { id: "41", nameFr: "41 - Souk Ahras", nameAr: "41 - سوق أهراس", fee: 600 },
  { id: "42", nameFr: "42 - Tipaza", nameAr: "42 - تيبازة", fee: 400 },
  { id: "43", nameFr: "43 - Mila", nameAr: "43 - ميلة", fee: 600 },
  { id: "44", nameFr: "44 - Aïn Defla", nameAr: "44 - عين الدفلى", fee: 500 },
  { id: "45", nameFr: "45 - Naâma", nameAr: "45 - النعامة", fee: 700 },
  { id: "46", nameFr: "46 - Aïn Témouchent", nameAr: "46 - عين تموشنت", fee: 600 },
  { id: "47", nameFr: "47 - Ghardaïa", nameAr: "47 - غرداية", fee: 800 },
  { id: "48", nameFr: "48 - Relizane", nameAr: "48 - غليزان", fee: 500 },
  { id: "49", nameFr: "49 - El M'Ghair", nameAr: "49 - المغير", fee: 800 },
  { id: "50", nameFr: "50 - El Meniaa", nameAr: "50 - المنيعة", fee: 800 },
  { id: "51", nameFr: "51 - Ouled Djellal", nameAr: "51 - أولاد جلال", fee: 700 },
  { id: "52", nameFr: "52 - Bordj Baji Mokhtar", nameAr: "52 - برج باجي مختار", fee: 1200 },
  { id: "53", nameFr: "53 - Béni Abbès", nameAr: "53 - بني عباس", fee: 1000 },
  { id: "54", nameFr: "54 - Timimoun", nameAr: "54 - تيميمون", fee: 1000 },
  { id: "55", nameFr: "55 - Touggourt", nameAr: "55 - تقرت", fee: 800 },
  { id: "56", nameFr: "56 - Djanet", nameAr: "56 - جانت", fee: 1200 },
  { id: "57", nameFr: "57 - In Salah", nameAr: "57 - عين صالح", fee: 1200 },
  { id: "58", nameFr: "58 - In Guezzam", nameAr: "58 - عين قزام", fee: 1200 }
];
