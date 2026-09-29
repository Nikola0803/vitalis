import CollectionPage from "@/components/CollectionPage";
import { allProducts } from "@/lib/products";

export const metadata = {
  title: "Blended Compounds – Your Health Supply",
  description: "Pre-blended peptide combinations designed for enhanced research protocols.",
};

export default function BlendsPage() {
  const blendProducts = allProducts.filter((p) => p.categories.includes("blends"));
  return (
    <CollectionPage
      title="Blended Compounds"
      products={blendProducts}
      description="Pre-blended peptide combinations for enhanced research protocols"
    />
  );
}
