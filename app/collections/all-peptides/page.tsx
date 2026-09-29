import CollectionPage from "@/components/CollectionPage";
import { allProducts } from "@/lib/products";

export const metadata = {
  title: "Full Peptide Collection – Your Health Supply",
  description: "Browse our complete range of research-grade peptides, all third-party tested and verified for purity and consistency.",
};

export default function AllPeptidesPage() {
  return <CollectionPage title="Full Peptide Collection" products={allProducts} />;
}
