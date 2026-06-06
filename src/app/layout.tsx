import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import { StoreProvider } from "@/context/StoreContext";
import { CartDrawer } from "@/components/CartDrawer";
import "@/app/globals.css";

// Load Google Fonts for premium athletic typographic hierarchy
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Obsidian SNKRS - Premium Sneaker & Baskets Showcase",
  description: "Découvrez notre collection exclusive de sneakers et baskets haute performance. Contactez-nous pour commander directement. | أوبسيديان سنيكرز - معرض الأحذية الرياضية الفاخرة والعصرية.",
  keywords: ["sneakers", "baskets", "running shoes", "streetwear", "maroc sneakers", "nike snkrs", "cairo font"],
  authors: [{ name: "Obsidian Team" }],
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  // We manage dir dynamically inside components or simply keep it default since we use state.
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-obsidian text-zinc-100">
        <StoreProvider>
          {children}
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
