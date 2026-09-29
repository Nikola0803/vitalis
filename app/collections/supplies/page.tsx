import CollectionPage from "@/components/CollectionPage";
import { supplies } from "@/lib/products";

export const metadata = {
  title: "Reconstitution Supplies – Vitalis",
  description: "Everything you need to reconstitute and handle research peptides safely.",
};

export default function SuppliesPage() {
  return (
    <CollectionPage
      title="Reconstitution Supplies"
      products={supplies}
      description="Everything you need to reconstitute and handle research peptides"
    />
  );
}
