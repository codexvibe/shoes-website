import { ProductDetails } from "@/components/ProductDetails";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-obsidian flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-12">
        <ProductDetails id={params.id} />
      </div>
      <Footer />
    </main>
  );
}
