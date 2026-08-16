import { PageHero } from "@/components/site/Catalog";
import { Reveal, SectionHeader } from "@/components/site/primitives";
import { IMAGES } from "@/lib/catalog";

const PILLARS = [
  {
    title: "100% Conflict-Free Diamonds",
    text: "Every diamond exceeds Kimberely Process standards, sourced exclusively from mines with strict ethical, labor, and environmental governance.",
  },
  {
    title: "Recycled & Fairmined Gold",
    text: "Our ateliers utilize 100% recycled platinum and Fairmined 18k gold to minimize environmental footprint and support artisanal mining communities.",
  },
  {
    title: "Artisanal Preservation",
    text: "We support heritage jewelry-making skills in Paris by offering master apprenticeships, preserving centuries-old setting and polishing techniques.",
  },
];

export function ResponsibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Ethical Sourcing"
        title="Commitment & Integrity"
        intro="L'ORIAN believes true luxury must preserve both human dignity and the natural beauty of our planet."
      />

      <section className="container-maison pb-24">
        <Reveal>
          <div className="aspect-[21/9] overflow-hidden bg-pearl">
            <img
              src={IMAGES.gemstones}
              alt="Responsibly sourced rare gemstones"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="container-maison pb-28">
        <SectionHeader
          eyebrow="Our Pillars"
          title="Ethical High Jewelry Standards"
          intro="How we maintain total transparency across our gem supply chain."
        />
        <div className="mt-14 grid gap-12 sm:grid-cols-3">
          {PILLARS.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 80}>
              <div className="border-t border-border pt-8">
                <span className="font-display text-4xl text-gold">0{idx + 1}</span>
                <h3 className="mt-4 font-display text-2xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export default ResponsibilityPage;
