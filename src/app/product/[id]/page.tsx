import { ProductDetails } from "@/components/ProductDetails";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-obsidian flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-12">
        <ProductDetails id={id} />
      </div>
      <Footer />
    </main>
  );
}
