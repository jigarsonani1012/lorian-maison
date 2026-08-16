import { PageHero } from "@/components/site/Catalog";
import { ActionLink, Reveal, SectionHeader } from "@/components/site/primitives";
import { IMAGES } from "@/lib/catalog";

const STAGES = [
  {
    n: "01",
    title: "Initial Consultation",
    text: "Meet with a master gemmologist to share your vision, milestone, or gemstone preferences.",
  },
  {
    n: "02",
    title: "Gouache Rendering",
    text: "Our design studio creates painted gouache illustrations presenting three unique design concepts.",
  },
  {
    n: "03",
    title: "Stone Selection",
    text: "Review loose unheated gemstones sourced exclusively for your commission.",
  },
  {
    n: "04",
    title: "Atelier Crafting",
    text: "Artisans hand-forge, set, and polish your piece in Paris over 8 to 14 weeks.",
  },
];

export function BespokePage() {
  return (
    <>
      <PageHero
        eyebrow="Haute Joaillerie Commissions"
        title="Bespoke Creation"
        intro="Transform a rare personal milestone or rare gemstone acquisition into a unique heirloom piece crafted exclusively for you."
      />

      <section className="container-maison pb-24">
        <Reveal>
          <div className="aspect-[21/9] overflow-hidden bg-pearl">
            <img
              src={IMAGES.highJewelry}
              alt="Bespoke high jewelry gouache sketch and diamonds"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="container-maison pb-28">
        <SectionHeader
          eyebrow="The Commission Process"
          title="From Concept to Heirloom"
          intro="Four steps to creating a piece of high jewelry that exists nowhere else in the world."
        />

        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s, idx) => (
            <Reveal key={s.n} delay={idx * 80}>
              <div className="border-t border-border pt-8">
                <span className="font-display text-4xl text-gold">{s.n}</span>
                <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-16 text-center">
          <h3 className="font-display text-3xl">Initiate a Commission</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Bespoke commissions begin with a private conversation at our Paris, London, or New York salons.
          </p>
          <div className="mt-8 flex justify-center">
            <ActionLink to="/appointments">Request Private Consultation</ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default BespokePage;
