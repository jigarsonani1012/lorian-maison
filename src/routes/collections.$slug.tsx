import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collectionBySlug, PRODUCTS, type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { QuickView } from "@/components/site/QuickView";
import { Breadcrumbs, Reveal, SectionHeader } from "@/components/site/primitives";

export function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const collection = collectionBySlug(slug ?? "");
  const [quick, setQuick] = useState<Product | null>(null);

  if (!collection) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-center">
        <div>
          <h1 className="font-display text-4xl">Collection Not Found</h1>
          <p className="mt-4 text-sm text-muted-foreground">The requested collection is unavailable.</p>
          <Link to="/collections" className="label-maison mt-8 inline-flex h-12 items-center bg-foreground px-8 text-background">
            Discover Collections
          </Link>
        </div>
      </div>
    );
  }

  const items = PRODUCTS.filter((p) => p.collection === collection.slug);

  return (
    <>
      <section
        className={`relative h-[76svh] overflow-hidden ${collection.dark ? "on-dark bg-obsidian text-ivory" : "bg-pearl"}`}
      >
        <img
          src={collection.image}
          alt={`${collection.name} collection`}
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className={`absolute inset-0 ${collection.dark ? "bg-obsidian/40" : "bg-ivory/25"}`} />
        <div className="container-maison relative flex h-full flex-col justify-end pb-16">
          <span className="label-maison text-gold">Since {collection.year}</span>
          <h1 className="mt-5 font-display text-[clamp(3rem,9vw,8rem)] leading-none">
            {collection.name}
          </h1>
          <p className="mt-4 font-display text-2xl italic">{collection.tagline}</p>
        </div>
      </section>

      <div className="container-maison py-8">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Collections", to: "/collections" },
            { label: collection.name },
          ]}
        />
      </div>

      <section className="section-y pt-4">
        <div className="container-maison grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight">
              {collection.intro}
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <p className="text-base leading-relaxed text-muted-foreground">{collection.story}</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-maison">
          <SectionHeader eyebrow="The Creations" title={`${items.length} pieces`} />
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 lg:gap-x-10">
            {items.map((p) => (
              <ProductCard key={p.slug} product={p} onQuickView={setQuick} />
            ))}
          </div>
        </div>
      </section>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}

export default CollectionPage;
