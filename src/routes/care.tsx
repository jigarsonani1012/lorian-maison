import { PageHero } from "@/components/site/Catalog";
import { ActionLink, Reveal, SectionHeader } from "@/components/site/primitives";
import { IMAGES } from "@/lib/catalog";

const CARE_TIPS = [
  {
    title: "Daily Wear & Storage",
    text: "Store creations separately in individual suede pouches to prevent diamonds from scratching softer gemstones or metals.",
  },
  {
    title: "Cleaning & Polishing",
    text: "Clean gold and diamonds gently using lukewarm water and a soft-bristle brush. Avoid harsh chemical cleaners or ultrasonic baths for emeralds.",
  },
  {
    title: "Annual Inspection",
    text: "We recommend bringing your jewelry into a L'ORIAN salon once a year for a claw-tightening inspection and ultrasonic refresh.",
  },
];

export function CarePage() {
  return (
    <>
      <PageHero
        eyebrow="Preservation"
        title="Jewelry Care & Servicing"
        intro="High jewelry requires gentle stewardship to retain its brilliance across generations."
      />

      <section className="container-maison pb-24">
        <Reveal>
          <div className="aspect-[21/9] overflow-hidden bg-pearl">
            <img
              src={IMAGES.craftsmanship}
              alt="Maison jewel inspection under microscope"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="container-maison pb-28">
        <SectionHeader
          eyebrow="Stewardship"
          title="Care Recommendations"
          intro="Essential guidance for preserving gold, platinum, emeralds, and diamonds."
        />
        <div className="mt-14 grid gap-12 sm:grid-cols-3">
          {CARE_TIPS.map((c, idx) => (
            <Reveal key={c.title} delay={idx * 80}>
              <div className="border-t border-border pt-8">
                <span className="font-display text-4xl text-gold">0{idx + 1}</span>
                <h3 className="mt-4 font-display text-2xl">{c.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-16 text-center">
          <h3 className="font-display text-3xl">Book a Spa Service</h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Drop off your piece at any of our global boutiques for complimentary inspection and cleaning.
          </p>
          <div className="mt-8 flex justify-center">
            <ActionLink to="/appointments">Schedule Salon Drop-off</ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default CarePage;
