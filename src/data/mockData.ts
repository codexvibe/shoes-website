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
  price: string;
  categorySlug: string;
  image: string;
  sizes: number[];
  descFr: string;
  descAr: string;
  featured?: boolean;
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
    price: "1,850 DH",
    categorySlug: "running-performance",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600",
    sizes: [40, 41, 42, 43, 44, 45],
    descFr: "Conçue pour la vitesse pure avec une plaque en fibre de carbone intégrée.",
    descAr: "مصممة للسرعة الفائقة مع لوحة مدمجة من ألياف الكربون.",
    featured: true
  },
  {
    id: "shoe_2",
    slug: "gravity-shadow-max",
    nameFr: "Gravity Shadow Max",
    nameAr: "غرافيتي شادو ماكس",
    price: "2,100 DH",
    categorySlug: "running-performance",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=600",
    sizes: [39, 40, 41, 42, 43, 44],
    descFr: "Amorti ultra-léger et mesh respirant respirant haut de gamme.",
    descAr: "تبطين فائق الخفة وشبكة علوية ممتازة تسمح بالتهوية.",
    featured: false
  },

  // Daily Walking & Comfort
  {
    id: "shoe_3",
    slug: "cloudfoam-cushion-ar",
    nameFr: "Cloudfoam Pro Cushion",
    nameAr: "كلاود فوم برو كوشن",
    price: "1,450 DH",
    categorySlug: "daily-walking-comfort",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=600",
    sizes: [36, 37, 38, 39, 40, 41, 42],
    descFr: "Technologie de semelle à mémoire de forme pour une marche sans effort.",
    descAr: "تقنية النعل الداخلي بذاكرة الشكل لخطوات مريحة دون أي مجهود.",
    featured: true
  },
  {
    id: "shoe_4",
    slug: "neon-pulse-green",
    nameFr: "Pulse Zoom Neon",
    nameAr: "بولس زوم نيون",
    price: "1,600 DH",
    categorySlug: "daily-walking-comfort",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=600",
    sizes: [40, 41, 42, 43, 44, 45],
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
    price: "1,900 DH",
    categorySlug: "streetwear-lifestyle",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    descFr: "Cuir suédé premium aux teintes terreuses, idéal pour vos tenues streetwear.",
    descAr: "جلد شمواه فاخر بألوان ترابية طبيعية، مثالي للملابس العصرية اليومية.",
    featured: true
  },
  {
    id: "shoe_6",
    slug: "electric-yellow-canvas",
    nameFr: "Vibe Classic Amber",
    nameAr: "فايب كلاسيك أمبر",
    price: "950 DH",
    categorySlug: "streetwear-lifestyle",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=600",
    sizes: [37, 38, 39, 40, 41, 42],
    descFr: "Style rétro intemporel, toile ultra-résistante avec semelle vulcanisée.",
    descAr: "تصميم كلاسيكي خالد، قماش شديد التحمل ونعل مطاطي معالج.",
    featured: false
  },
  {
    id: "shoe_7",
    slug: "obsidian-stealth-baskets",
    nameFr: "Stealth Obsidian Low",
    nameAr: "ستيلث أوبسيديان لو",
    price: "1,700 DH",
    categorySlug: "streetwear-lifestyle",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=600",
    sizes: [40, 41, 42, 43, 44, 45, 46],
    descFr: "Robe noire monochrome haut de gamme dotée d'accents réfléchissants.",
    descAr: "مظهر أسود موحد فاخر مع تفاصيل عاكسة للضوء.",
    featured: false
  }
];
