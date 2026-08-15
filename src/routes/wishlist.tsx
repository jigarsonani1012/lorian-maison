import { useState } from "react";
import { PageHero } from "@/components/site/Catalog";
import { ActionLink, EmptyState, Reveal } from "@/components/site/primitives";
import { ProductCard } from "@/components/site/ProductCard";
import { QuickView } from "@/components/site/QuickView";
import { PRODUCTS, type Product } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export function WishlistPage() {
  const { wishlist, ready } = useStore();
  const [quick, setQuick] = useState<Product | null>(null);
  const items = wishlist
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));

  return (
    <>
      <PageHero
        eyebrow="Wishlist"
        title="Set aside"
        intro="Pieces you have saved are kept on this device. Share the list with an advisor when you are ready."
      />

      <div className="container-maison pb-28">
        {!ready ? null : items.length === 0 ? (
          <EmptyState
            title="Nothing saved yet"
            body="Use the save mark on any creation to keep it here while you consider."
            action={<ActionLink to="/jewelry">Explore Jewelry</ActionLink>}
          />
        ) : (
          <>
            <p className="label-xs mb-10 text-muted-foreground">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </p>
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 70}>
                  <ProductCard product={p} onQuickView={setQuick} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}

export default WishlistPage;
