import { useState } from "react";
import { PageHero } from "@/components/site/Catalog";
import { ActionLink, Reveal, SectionHeader } from "@/components/site/primitives";
import { ProductCard } from "@/components/site/ProductCard";
import { QuickView } from "@/components/site/QuickView";
import { PRODUCTS, type Product } from "@/lib/catalog";

export function GiftsPage() {
  const [quick, setQuick] = useState<Product | null>(null);
  const giftSelections = PRODUCTS.slice(0, 6);

  return (
    <>
      <PageHero
        eyebrow="The Art of Gifting"
        title="Curated Gift Guide"
        intro="Mark memorable milestones, anniversaries, and personal achievements with signature creations encased in L'ORIAN packaging."
      />

      <section className="container-maison pb-28">
        <SectionHeader
          eyebrow="Signature Gifts"
          title="Unforgettable Moments"
          intro="Each gift arrives wrapped in hand-embossed suede boxes, complete with a handwritten wax-sealed parchment note."
        />

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 lg:gap-x-10">
          {giftSelections.map((product, idx) => (
            <Reveal key={product.slug} delay={idx * 60}>
              <ProductCard product={product} onQuickView={setQuick} />
            </Reveal>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-16 text-center">
          <h3 className="font-display text-3xl">Need help selecting a gift?</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Our concierge will help choose the perfect metal, gem size, or custom engraving.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <ActionLink to="/appointments">Consult an Advisor</ActionLink>
          </div>
        </div>
      </section>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}

export default GiftsPage;
