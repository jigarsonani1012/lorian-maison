import { PageHero } from "@/components/site/Catalog";
import { ActionLink, EditorialLink, Reveal, SectionHeader } from "@/components/site/primitives";
import { HERITAGE, IMAGES } from "@/lib/catalog";

const VALUES = [
  {
    title: "Slowness",
    text: "A L'ORIAN jewel takes as long as it takes. No commission has ever been accelerated to meet a season.",
  },
  {
    title: "Provenance",
    text: "Every stone above 0.30 carat is traceable to its origin, and documented in the maison archive.",
  },
  {
    title: "Singularity",
    text: "High jewellery pieces are made once. The design exists because the stone did.",
  },
  {
    title: "Discretion",
    text: "What is made for a client belongs to the client. The maison keeps the drawing, never the photograph.",
  },
];

export function MaisonPage() {
  return (
    <>
      <PageHero
        eyebrow="The Maison"
        title="Crafted beyond time"
        intro="Founded in Paris in 1898 by Élise L'ORIAN, the maison has spent one hundred and twenty-eight years refusing to hurry."
      />

      <section className="container-maison pb-24">
        <Reveal>
          <div className="img-reveal aspect-[16/9] overflow-hidden bg-pearl">
            <img
              src={IMAGES.craftsmanship}
              alt="A L'ORIAN artisan at the bench in the Paris atelier"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <Reveal>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05]">
              A house built on a single room
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground">
              <p>
                Élise L'ORIAN began with one bench, one loupe and a circle of collectors who trusted
                her judgement of colour. She took no apprentice for eleven years, on the principle
                that a hand should not teach until it is certain.
              </p>
              <p>
                That caution became method. Today the atelier employs ninety-four artisans across
                setting, polishing, gem-cutting and design, and still produces fewer than four
                hundred pieces a year.
              </p>
              <p>
                The maison remains independently held, on rue Séraphine, in the same building where
                the first brooch was finished in the winter of 1898.
              </p>
              <EditorialLink to="/maison/craftsmanship">Inside the atelier</EditorialLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-pearl/40 py-24 md:py-32">
        <div className="container-maison">
          <SectionHeader eyebrow="Heritage" title="A chronology" />
          <ol className="mt-16 flex flex-col">
            {HERITAGE.map((h, i) => (
              <Reveal as="li" key={h.year} delay={i * 60}>
                <div className="grid gap-4 border-t border-border py-10 md:grid-cols-[10rem_1fr_1.3fr] md:gap-10">
                  <span className="font-display text-3xl text-gold">{h.year}</span>
                  <h3 className="font-display text-2xl">{h.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-maison py-24 md:py-32">
        <SectionHeader eyebrow="Principles" title="What the maison holds to" />
        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <span aria-hidden className="block h-px w-10 bg-gold" />
              <h3 className="mt-6 font-display text-2xl">{v.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="on-dark bg-obsidian py-24 text-ivory md:py-32">
        <div className="container-maison grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={IMAGES.boutique}
                alt="The L'ORIAN boutique salon in Paris"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="label-maison text-gold">Visit</span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.05]">
              The maison receives by appointment
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed opacity-70">
              Private salons in Paris, New York, London, Geneva, Tokyo and Dubai. A client advisor
              will prepare a selection before you arrive.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ActionLink to="/appointments">Book an Appointment</ActionLink>
              <ActionLink to="/boutiques" tone="secondary">
                Find a Boutique
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default MaisonPage;
