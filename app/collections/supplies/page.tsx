import CollectionPage from "@/components/CollectionPage";
import { supplies } from "@/lib/products";

export const metadata = {
  title: "Research Supplies – Vitalis",
  description: "Laboratory supplies for handling and storing research materials.",
};

export default function SuppliesPage() {
  return (
    <CollectionPage
      title="Research Supplies"
      products={supplies}
      description="Laboratory supplies for handling and storing research materials"
    />
  );
}
