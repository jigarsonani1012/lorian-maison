import { PageHero } from "@/components/site/Catalog";
import { ActionLink, Reveal, SectionHeader } from "@/components/site/primitives";
import { CRAFT_STEPS, IMAGES } from "@/lib/catalog";

export function CraftsmanshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Savoir-Faire"
        title="The eight stages"
        intro="Nothing in the atelier is finished quickly. Every L'ORIAN jewel passes through eight hands, and each may return it to the one before."
      />

      <section className="container-maison pb-24">
        <Reveal>
          <div className="img-reveal aspect-[21/9] overflow-hidden bg-pearl">
            <img
              src={IMAGES.craftsmanship}
              alt="Hands setting a diamond under a microscope at the L'ORIAN bench"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="container-maison pb-24 md:pb-32">
        <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
          {CRAFT_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={(i % 2) * 80}>
              <article className="border-t border-border pt-8">
                <span className="label-xs text-gold">{s.n}</span>
                <h2 className="mt-4 font-display text-3xl">{s.title}</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="on-dark bg-obsidian py-24 text-ivory md:py-32">
        <div className="container-maison">
          <Reveal>
            <blockquote className="mx-auto max-w-3xl text-center font-display text-[clamp(1.6rem,3.6vw,3rem)] font-light leading-[1.2] italic">
              “A stone does not shine because it is beautiful. It shines because someone decided,
              precisely, where it should sit.”
            </blockquote>
            <p className="label-maison mt-8 text-center text-gold">Master Setter, Paris Atelier</p>
          </Reveal>
        </div>
      </section>

      <section className="container-maison py-24 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <div className="aspect-[4/5] overflow-hidden bg-pearl">
              <img
                src={IMAGES.gemstones}
                alt="Loose coloured gemstones on a jeweller's tray"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeader
              eyebrow="Materials"
              title="Chosen one stone at a time"
              intro="L'ORIAN gemmologists decline more stones than they acquire. Colour must hold under both daylight and candlelight, and every stone above 0.30 carat is traceable to its origin."
            />
            <div className="mt-10">
              <ActionLink to="/high-jewelry" tone="secondary">
                See High Jewelry
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

export default CraftsmanshipPage;
