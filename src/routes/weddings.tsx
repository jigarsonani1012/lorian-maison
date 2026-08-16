import { Link } from "react-router-dom";
import { PageHero } from "@/components/site/Catalog";
import { ActionLink, Reveal, SectionHeader } from "@/components/site/primitives";
import { ProductCard } from "@/components/site/ProductCard";
import { IMAGES, PRODUCTS } from "@/lib/catalog";

export function WeddingsPage() {
  const bridalJewelry = PRODUCTS.filter(
    (p) => p.category === "rings" || p.category === "necklaces" || p.category === "earrings",
  ).slice(0, 4);

  return (
    <>
      <section className="relative h-[75svh] overflow-hidden bg-obsidian text-ivory">
        <img
          src={IMAGES.engagement}
          alt="L'ORIAN Bridal & Wedding high jewelry"
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div className="container-maison relative flex h-full flex-col justify-end pb-16">
          <span className="label-maison text-gold-soft">Bridal &amp; Weddings</span>
          <h1 className="mt-5 font-display text-[clamp(3rem,9vw,7.5rem)] leading-none">
            For Ever &amp; Ever
          </h1>
          <p className="mt-4 font-display text-2xl italic text-ivory/80">
            High jewelry created to mark lifetime vows.
          </p>
        </div>
      </section>

      <PageHero
        eyebrow="The Bridal Suite"
        title="Creations for the wedding day"
        intro="From diamond tiaras and classic eternity bands to heirloom pearl drop earrings, each piece is handcrafted in Paris to illuminate the bride."
      />

      <section className="section-y pt-0">
        <div className="container-maison">
          <SectionHeader
            eyebrow="Bridal Selection"
            title="Timeless High Jewelry"
            intro="Explore pieces crafted from D-color diamonds, unheated sapphires, and platinum."
          />
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4 lg:gap-x-10">
            {bridalJewelry.map((product, idx) => (
              <Reveal key={product.slug} delay={idx * 60}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-pearl py-24 md:py-32">
        <div className="container-maison grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="label-maison text-gold">Custom Trousseau</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight">
              Bespoke Wedding Sets
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Our master artisans collaborate with couples to design matching wedding bands, customized cufflinks for the groom, and bespoke gifts for the wedding party.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ActionLink to="/appointments">Consultation Appointment</ActionLink>
              <ActionLink to="/bespoke" tone="secondary">
                Bespoke Services
              </ActionLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="aspect-[4/3] overflow-hidden bg-background">
              <img
                src={IMAGES.highJewelry}
                alt="Bespoke wedding set"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default WeddingsPage;
