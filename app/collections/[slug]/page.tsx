import CollectionPage from "@/components/CollectionPage";
import { collections, allProducts, supplies } from "@/lib/products";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(collections).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const collection = collections[slug as keyof typeof collections];
  if (!collection) return { title: "Collection – Vitalis" };
  return {
    title: `${collection.name} – Vitalis`,
  };
}

export default async function CollectionSlugPage({ params }: Props) {
  const { slug } = await params;

  const collection = collections[slug as keyof typeof collections];

  if (!collection) {
    // Try to show a filtered view for known category slugs
    const categoryMap: Record<string, { name: string; filter: string }> = {
      "cosmetic-anti-aging": { name: "Cellular & Anti-Aging", filter: "cellular-anti-aging" },
      "recovery-regeneration": { name: "Tissue Repair", filter: "tissue-repair" },
      neurological: { name: "Neuro Health", filter: "neuro" },
      "weight-loss-metabolism": { name: "Metabolic Health", filter: "metabolic" },
      popular: { name: "Popular", filter: "featured" },
      all: { name: "All Products", filter: "all" },
      "healthcare-example-products": { name: "Full Peptide Collection", filter: "all" },
    };

    const catInfo = categoryMap[slug];
    if (!catInfo) notFound();

    const products = catInfo.filter === "all"
      ? allProducts
      : catInfo.filter === "featured"
      ? allProducts.filter((p) => p.featured)
      : allProducts.filter((p) => p.categories.includes(catInfo.filter));

    return <CollectionPage title={catInfo.name} products={products} />;
  }

  return (
    <CollectionPage
      title={collection.name}
      products={collection.products}
      description={(collection as { description?: string }).description}
    />
  );
}
