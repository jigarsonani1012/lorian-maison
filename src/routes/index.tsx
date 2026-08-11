import { useState } from "react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-necklace.jpg";
import { COLLECTIONS, IMAGES, PRODUCTS, ARTICLES, HERITAGE } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { QuickView } from "@/components/site/QuickView";
import {
  ActionLink,
  DisplayHeading,
  EditorialLink,
  Eyebrow,
  Reveal,
  SectionHeader,
} from "@/components/site/primitives";
import type { Product } from "@/lib/catalog";

export default function Home() {
  const [quick, setQuick] = useState<Product | null>(null);
  const featured = PRODUCTS.find((p) => p.slug === "celestia-diamond-ring")!;
  const newCreations = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] w-full overflow-hidden bg-obsidian">
        <img
          src={heroImg}
          alt="A L'ORIAN high jewelry diamond necklace photographed against obsidian"
          width={1920}
          height={1200}
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-obsidian/25" />
        <div className="relative flex h-full flex-col items-center justify-center px-5 text-center text-ivory">
          <span
            className="label-maison text-gold-soft"
            style={{ animation: "lorian-rise 1.2s cubic-bezier(0.16,1,0.3,1) 300ms both" }}
          >
            High Jewelry 2026
          </span>
          <h1
            className="mt-8 font-display text-[clamp(3.25rem,11vw,9.5rem)] leading-[0.95] tracking-[0.06em]"
            style={{ animation: "lorian-rise 1.3s cubic-bezier(0.16,1,0.3,1) 450ms both" }}
          >
            L'ORIAN
          </h1>
          <p
            className="mt-6 font-display text-[clamp(1.25rem,2.6vw,2rem)] italic text-ivory/85"
            style={{ animation: "lorian-rise 1.3s cubic-bezier(0.16,1,0.3,1) 650ms both" }}
          >
            Where Eternity Takes Form.
          </p>
          <div style={{ animation: "lorian-fade 1.4s ease 1100ms both" }}>
            <Link
              to="/collections/celestia"
              className="label-maison mt-12 inline-flex h-12 items-center border border-ivory/40 px-10 text-ivory transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-white"
            >
              Discover the Collection
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-ivory/70">
          <span className="label-xs">Scroll to Discover</span>
          <span className="mx-auto mt-4 block h-10 w-px overflow-hidden bg-ivory/20">
            <span className="scroll-line block h-full w-full bg-gold" />
          </span>
        </div>
      </section>

      {/* MAISON INTRODUCTION */}
      <section className="section-y">
        <div className="container-maison grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>The Art of L'ORIAN</Eyebrow>
            </Reveal>
            <Reveal delay={100}>
              <DisplayHeading className="mt-8">
                A maison built
                <br />
                on patience
              </DisplayHeading>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={160}>
              <p className="font-display text-[clamp(1.375rem,2.2vw,1.875rem)] leading-snug">
                Since 1898 the maison has worked to a single principle: nothing leaves the atelier
                until it could not be improved.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                L'ORIAN was founded in a single room on rue Séraphine, Paris, by a jeweller who
                accepted four commissions a year. That restraint remains the maison's governing
                instinct. Stones are chosen individually, settings are calibrated to two hundredths
                of a millimetre, and every piece is inspected under three light temperatures by a
                master who did not make it.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div className="mt-10">
                <EditorialLink to="/maison">Discover the Maison</EditorialLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SIGNATURE COLLECTIONS — horizontal showcase */}
      <section className="pb-20 md:pb-32">
        <div className="container-maison">
          <SectionHeader
            eyebrow="Signature Collections"
            title="Six houses within one maison"
            intro="Each collection follows its own discipline — of light, of colour, of restraint."
          />
        </div>
        <div className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:mt-20 md:gap-10 md:px-10 xl:px-16">
          {COLLECTIONS.map((c, i) => (
            <Reveal
              key={c.slug}
              delay={i * 60}
              className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw]"
            >
              <Link
                to={`/collections/${c.slug}`}
                data-cursor="discover"
                className="img-reveal group block"
              >
                <div className="aspect-[3/4] overflow-hidden bg-pearl">
                  <img
                    src={c.image}
                    alt={`${c.name} collection`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-3xl transition-colors group-hover:text-gold">
                    {c.name}
                  </h3>
                  <span className="label-xs text-muted-foreground">{c.year}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{c.tagline}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED JEWEL */}
      <section className="on-dark bg-obsidian text-ivory">
        <div className="container-maison grid items-center gap-14 py-24 md:py-36 lg:grid-cols-2 lg:gap-24">
          <Reveal className="order-2 lg:order-1">
            <Eyebrow className="text-ivory/60">The Featured Jewel</Eyebrow>
            <h2 className="mt-8 font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[1]">
              The Celestia
              <br />
              Diamond
            </h2>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-ivory/70">
              Sixty-two brilliant-cut diamonds positioned to the coordinates of a single night sky,
              carried on a platinum structure so fine it disappears against the skin.
            </p>
            <dl className="mt-10 grid max-w-md grid-cols-2 gap-y-4 border-t border-ivory/15 pt-8 text-sm">
              <dt className="label-xs text-ivory/50">Carat</dt>
              <dd>{featured.carat} ct</dd>
              <dt className="label-xs text-ivory/50">Material</dt>
              <dd>{featured.material}</dd>
              <dt className="label-xs text-ivory/50">Reference</dt>
              <dd>{featured.reference}</dd>
              <dt className="label-xs text-ivory/50">Availability</dt>
              <dd>{featured.availability}</dd>
            </dl>
            <div className="mt-10">
              <ActionLink
                to={`/product/${featured.slug}`}
                tone="secondary"
                className="border-ivory/35 text-ivory hover:border-gold hover:text-gold"
              >
                Discover the Piece
              </ActionLink>
            </div>
          </Reveal>
          <Reveal delay={120} className="order-1 lg:order-2">
            <div className="img-reveal aspect-[4/5] overflow-hidden">
              <img
                src={IMAGES.highJewelry}
                alt="The Celestia Diamond, photographed under a single beam of light"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* NEW CREATIONS */}
      <section className="section-y">
        <div className="container-maison">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="New Creations" title="Recently entered the archive" />
            <EditorialLink to="/jewelry">View All Jewelry</EditorialLink>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:mt-20 lg:grid-cols-4 lg:gap-x-10">
            {newCreations.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProductCard product={p} onQuickView={setQuick} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HIGH JEWELRY TEASER */}
      <section className="on-dark relative overflow-hidden bg-obsidian text-ivory">
        <img
          src={IMAGES.gemstones}
          alt="Rare ruby, emerald, sapphire and diamond"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
        <div className="container-maison relative flex min-h-[70vh] flex-col items-center justify-center py-28 text-center">
          <Reveal>
            <Eyebrow className="justify-center text-ivory/60">High Jewelry</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-8 font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.98]">
              Where Eternity
              <br />
              Takes Form
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-8 max-w-xl text-base text-ivory/70">
              An exhibition in six chapters. Exceptional stones, secured over years, set only once.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <ActionLink
              to="/high-jewelry"
              tone="secondary"
              className="mt-12 border-ivory/40 text-ivory hover:border-gold hover:text-gold"
            >
              Enter the Exhibition
            </ActionLink>
          </Reveal>
        </div>
      </section>

      {/* CRAFTSMANSHIP */}
      <section className="section-y">
        <div className="container-maison grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-24">
          <Reveal>
            <div className="img-reveal aspect-[5/4] overflow-hidden bg-pearl">
              <img
                src={IMAGES.craftsmanship}
                alt="A L'ORIAN setter placing a diamond at the atelier bench"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow>Craftsmanship</Eyebrow>
            <DisplayHeading className="mt-8">Eight hands, one jewel</DisplayHeading>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              Concept, sketch, stone selection, model, setting, polishing, inspection — a L'ORIAN
              piece passes through eight disciplines before it is numbered and registered in the
              maison archive.
            </p>
            <div className="mt-10">
              <EditorialLink to="/maison/craftsmanship">Enter the Atelier</EditorialLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ENGAGEMENT */}
      <section className="bg-pearl">
        <div className="container-maison grid gap-14 py-24 md:py-32 lg:grid-cols-2 lg:items-center lg:gap-24">
          <Reveal>
            <Eyebrow>Engagement</Eyebrow>
            <DisplayHeading className="mt-8">Find the one</DisplayHeading>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              A guided journey through style, stone shape, metal and budget — followed by a private
              consultation with a maison advisor.
            </p>
            <div className="mt-10">
              <ActionLink to="/engagement">Begin the Ring Finder</ActionLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="img-reveal aspect-[4/3] overflow-hidden">
              <img
                src={IMAGES.engagement}
                alt="A L'ORIAN engagement ring resting on ivory silk"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAMPAIGN */}
      <section className="section-y">
        <div className="container-maison grid gap-12 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <div className="img-reveal aspect-[4/5] overflow-hidden bg-pearl lg:aspect-[5/6]">
              <img
                src={IMAGES.campaign}
                alt="The 2026 L'ORIAN campaign portrait"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9">
            <Eyebrow>Campaign 2026</Eyebrow>
            <h2 className="mt-8 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
              The Hour
              <br />
              Before Light
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Photographed over two mornings in Paris, the campaign follows a single wearer through
              the hour when a room changes colour.
            </p>
            <div className="mt-8">
              <EditorialLink to="/journal">Read the Story</EditorialLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HERITAGE STRIP */}
      <section className="on-dark bg-obsidian text-ivory">
        <div className="container-maison py-24 md:py-32">
          <SectionHeader eyebrow="Heritage" title="A maison since 1898" align="center" />
          <ol className="mt-16 grid gap-10 md:grid-cols-3">
            {HERITAGE.slice(0, 3).map((h, i) => (
              <Reveal as="li" key={h.year} delay={i * 90}>
                <span className="font-display text-4xl text-gold">{h.year}</span>
                <h3 className="mt-3 font-display text-2xl">{h.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/60">{h.text}</p>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14 flex justify-center">
            <ActionLink
              to="/maison"
              tone="secondary"
              className="border-ivory/35 text-ivory hover:border-gold hover:text-gold"
            >
              The Full Timeline
            </ActionLink>
          </div>
        </div>
      </section>

      {/* BOUTIQUES */}
      <section className="section-y">
        <div className="container-maison grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-24">
          <Reveal>
            <Eyebrow>Boutiques</Eyebrow>
            <DisplayHeading className="mt-8">Received in person</DisplayHeading>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
              Six maison addresses, each with a private salon. Appointments may be made for high
              jewellery viewings, engagement consultations or care of an existing piece.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ActionLink to="/appointments">Book an Appointment</ActionLink>
              <ActionLink to="/boutiques" tone="secondary">
                Find a Boutique
              </ActionLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="img-reveal aspect-[16/10] overflow-hidden bg-pearl">
              <img
                src={IMAGES.boutique}
                alt="Interior of a L'ORIAN boutique"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* JOURNAL */}
      <section className="pb-24 md:pb-36">
        <div className="container-maison">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader eyebrow="The Journal" title="Stories from the maison" />
            <EditorialLink to="/journal">All Stories</EditorialLink>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {ARTICLES.slice(0, 3).map((a, i) => (
              <Reveal as="article" key={a.slug} delay={i * 90}>
                <Link
                  to={`/journal/${a.slug}`}
                  data-cursor="view"
                  className="img-reveal group block"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-pearl">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="label-xs mt-5 block text-gold">{a.category}</span>
                  <h3 className="mt-2 font-display text-2xl transition-colors group-hover:text-gold">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuickView product={quick} onClose={() => setQuick(null)} />
    </>
  );
}
