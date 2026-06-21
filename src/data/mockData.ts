export interface Category {
  id: string;
  slug: string;
  nameFr: string;
  nameAr: string;
  descFr: string;
  descAr: string;
  image?: string;
}

export interface SneakerColor {
  nameFr: string;
  nameAr: string;
  hex: string;
  image: string;
  sizes?: number[];
  sizesStock?: Record<number, number>;
  price?: number; // Optional per-color price overriding the main product price
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

  colors?: SneakerColor[];
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
  items: CartItem[];
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
  fee: number; // in DZD (backward compat, = feeDomicile)
  feeDomicile: number; // Livraison à domicile
  feeBureau: number; // Livraison au bureau / stop desk
}

export interface CartItem {
  id: string;
  sneakerId: string;
  size: number;
  quantity: number;
  color?: SneakerColor; // Optional chosen color
}

export const INITIAL_CATEGORIES: Category[] = [];

export const INITIAL_SNEAKERS: Sneaker[] = [];

export const INITIAL_WILAYAS: WilayaFee[] = [
  { id: "1", nameFr: "1 - Adrar", nameAr: "1 - أدرار", fee: 900, feeDomicile: 900, feeBureau: 700 },
  { id: "2", nameFr: "2 - Chlef", nameAr: "2 - الشلف", fee: 500, feeDomicile: 500, feeBureau: 300 },
  { id: "3", nameFr: "3 - Laghouat", nameAr: "3 - الأغواط", fee: 700, feeDomicile: 700, feeBureau: 500 },
  { id: "4", nameFr: "4 - Oum El Bouaghi", nameAr: "4 - أم البواقي", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "5", nameFr: "5 - Batna", nameAr: "5 - باتنة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "6", nameFr: "6 - Béjaïa", nameAr: "6 - بجاية", fee: 500, feeDomicile: 500, feeBureau: 300 },
  { id: "7", nameFr: "7 - Biskra", nameAr: "7 - بسكرة", fee: 700, feeDomicile: 700, feeBureau: 500 },
  { id: "8", nameFr: "8 - Béchar", nameAr: "8 - بشار", fee: 800, feeDomicile: 800, feeBureau: 600 },
  { id: "9", nameFr: "9 - Blida", nameAr: "9 - البليدة", fee: 400, feeDomicile: 400, feeBureau: 200 },
  { id: "10", nameFr: "10 - Bouira", nameAr: "10 - البويرة", fee: 500, feeDomicile: 500, feeBureau: 300 },
  { id: "11", nameFr: "11 - Tamanrasset", nameAr: "11 - تمنراست", fee: 1200, feeDomicile: 1200, feeBureau: 1000 },
  { id: "12", nameFr: "12 - Tébessa", nameAr: "12 - تبسة", fee: 700, feeDomicile: 700, feeBureau: 500 },
  { id: "13", nameFr: "13 - Tlemcen", nameAr: "13 - تلمسان", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "14", nameFr: "14 - Tiaret", nameAr: "14 - تيارت", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "15", nameFr: "15 - Tizi Ouzou", nameAr: "15 - تيزي وزو", fee: 500, feeDomicile: 500, feeBureau: 300 },
  { id: "16", nameFr: "16 - Alger", nameAr: "16 - الجزائر", fee: 400, feeDomicile: 400, feeBureau: 200 },
  { id: "17", nameFr: "17 - Djelfa", nameAr: "17 - الجلفة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "18", nameFr: "18 - Jijel", nameAr: "18 - جيجل", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "19", nameFr: "19 - Sétif", nameAr: "19 - سطيف", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "20", nameFr: "20 - Saïda", nameAr: "20 - سعيدة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "21", nameFr: "21 - Skikda", nameAr: "21 - سكيكدة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "22", nameFr: "22 - Sidi Bel Abbès", nameAr: "22 - سيدي بلعباس", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "23", nameFr: "23 - Annaba", nameAr: "23 - عنابة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "24", nameFr: "24 - Guelma", nameAr: "24 - قالمة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "25", nameFr: "25 - Constantine", nameAr: "25 - قسنطينة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "26", nameFr: "26 - Médéa", nameAr: "26 - المدية", fee: 500, feeDomicile: 500, feeBureau: 300 },
  { id: "27", nameFr: "27 - Mostaganem", nameAr: "27 - مستغانم", fee: 500, feeDomicile: 500, feeBureau: 300 },
  { id: "28", nameFr: "28 - M'Sila", nameAr: "28 - المسيلة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "29", nameFr: "29 - Mascara", nameAr: "29 - معسكر", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "30", nameFr: "30 - Ouargla", nameAr: "30 - ورقلة", fee: 800, feeDomicile: 800, feeBureau: 600 },
  { id: "31", nameFr: "31 - Oran", nameAr: "31 - وهران", fee: 500, feeDomicile: 500, feeBureau: 300 },
  { id: "32", nameFr: "32 - El Bayadh", nameAr: "32 - البيض", fee: 700, feeDomicile: 700, feeBureau: 500 },
  { id: "33", nameFr: "33 - Illizi", nameAr: "33 - إيليزي", fee: 1000, feeDomicile: 1000, feeBureau: 800 },
  { id: "34", nameFr: "34 - Bordj Bou Arréridj", nameAr: "34 - برج بوعريريج", fee: 500, feeDomicile: 500, feeBureau: 300 },
  { id: "35", nameFr: "35 - Boumerdès", nameAr: "35 - بومرداس", fee: 400, feeDomicile: 400, feeBureau: 200 },
  { id: "36", nameFr: "36 - El Tarf", nameAr: "36 - الطارف", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "37", nameFr: "37 - Tindouf", nameAr: "37 - تندوف", fee: 1000, feeDomicile: 1000, feeBureau: 800 },
  { id: "38", nameFr: "38 - Tissemsilt", nameAr: "38 - تيسمسيلت", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "39", nameFr: "39 - El Oued", nameAr: "39 - الوادي", fee: 800, feeDomicile: 800, feeBureau: 600 },
  { id: "40", nameFr: "40 - Khenchela", nameAr: "40 - خنشلة", fee: 700, feeDomicile: 700, feeBureau: 500 },
  { id: "41", nameFr: "41 - Souk Ahras", nameAr: "41 - سوق أهراس", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "42", nameFr: "42 - Tipaza", nameAr: "42 - تيبازة", fee: 400, feeDomicile: 400, feeBureau: 200 },
  { id: "43", nameFr: "43 - Mila", nameAr: "43 - ميلة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "44", nameFr: "44 - Aïn Defla", nameAr: "44 - عين الدفلى", fee: 500, feeDomicile: 500, feeBureau: 300 },
  { id: "45", nameFr: "45 - Naâma", nameAr: "45 - النعامة", fee: 700, feeDomicile: 700, feeBureau: 500 },
  { id: "46", nameFr: "46 - Aïn Témouchent", nameAr: "46 - عين تموشنت", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "47", nameFr: "47 - Ghardaïa", nameAr: "47 - غرداية", fee: 800, feeDomicile: 800, feeBureau: 600 },
  { id: "48", nameFr: "48 - Relizane", nameAr: "48 - غليزان", fee: 500, feeDomicile: 500, feeBureau: 300 },
  { id: "49", nameFr: "49 - Timimoun", nameAr: "49 - تيميمون", fee: 1000, feeDomicile: 1000, feeBureau: 800 },
  { id: "50", nameFr: "50 - Bordj Badji Mokhtar", nameAr: "50 - برج باجي مختار", fee: 1200, feeDomicile: 1200, feeBureau: 1000 },
  { id: "51", nameFr: "51 - Ouled Djellal", nameAr: "51 - أولاد جلال", fee: 700, feeDomicile: 700, feeBureau: 500 },
  { id: "52", nameFr: "52 - Béni Abbès", nameAr: "52 - بني عباس", fee: 1000, feeDomicile: 1000, feeBureau: 800 },
  { id: "53", nameFr: "53 - In Salah", nameAr: "53 - عين صالح", fee: 1200, feeDomicile: 1200, feeBureau: 1000 },
  { id: "54", nameFr: "54 - In Guezzam", nameAr: "54 - عين قزام", fee: 1200, feeDomicile: 1200, feeBureau: 1000 },
  { id: "55", nameFr: "55 - Touggourt", nameAr: "55 - تقرت", fee: 800, feeDomicile: 800, feeBureau: 600 },
  { id: "56", nameFr: "56 - Djanet", nameAr: "56 - جانت", fee: 1200, feeDomicile: 1200, feeBureau: 1000 },
  { id: "57", nameFr: "57 - El M'Ghair", nameAr: "57 - المغير", fee: 800, feeDomicile: 800, feeBureau: 600 },
  { id: "58", nameFr: "58 - El Meniaa", nameAr: "58 - المنيعة", fee: 800, feeDomicile: 800, feeBureau: 600 },
  { id: "59", nameFr: "59 - Aflou", nameAr: "59 - أفلو", fee: 700, feeDomicile: 700, feeBureau: 500 },
  { id: "60", nameFr: "60 - Barika", nameAr: "60 - بريكة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "61", nameFr: "61 - Ksar Chellala", nameAr: "61 - قصر الشلالة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "62", nameFr: "62 - Messaad", nameAr: "62 - مسعد", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "63", nameFr: "63 - Aïn Oussera", nameAr: "63 - عين وسارة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "64", nameFr: "64 - Bou Saâda", nameAr: "64 - بوسعادة", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "65", nameFr: "65 - El Abiodh Sidi Cheikh", nameAr: "65 - الأبيض سيدي الشيخ", fee: 700, feeDomicile: 700, feeBureau: 500 },
  { id: "66", nameFr: "66 - El Kantara", nameAr: "66 - القنطرة", fee: 700, feeDomicile: 700, feeBureau: 500 },
  { id: "67", nameFr: "67 - Bir El Ater", nameAr: "67 - بئر العاتر", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "68", nameFr: "68 - Ksar El Boukhari", nameAr: "68 - قصر البخاري", fee: 600, feeDomicile: 600, feeBureau: 400 },
  { id: "69", nameFr: "69 - El Aricha", nameAr: "69 - العريشة", fee: 700, feeDomicile: 700, feeBureau: 500 }
];

