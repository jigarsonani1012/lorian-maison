import { PageHero } from "@/components/site/Catalog";
import { ActionLink, Reveal, SectionHeader } from "@/components/site/primitives";
import { ShieldCheck, Truck, Sparkles, RefreshCw } from "lucide-react";

const SERVICES_LIST = [
  {
    icon: Truck,
    title: "Complimentary Insured Shipping",
    text: "Every L'ORIAN creation is delivered via armored white-glove courier service with global insurance coverage.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Authenticity & Warranty",
    text: "Accompanied by a laser-engraved maison certificate and lifetime coverage against manufacturing defects.",
  },
  {
    icon: RefreshCw,
    title: "Complimentary Resizing & Care",
    text: "Enjoy complimentary resizing within the first year and lifetime annual spa inspections at any global salon.",
  },
  {
    icon: Sparkles,
    title: "Personalized Engraving",
    text: "Add custom monograms, dates, or secret messages engraved by hand in our Paris atelier.",
  },
];

export function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Maison Services"
        title="White-Glove Concierge"
        intro="From international insured logistics to bespoke engraving and annual spa care, explore our suite of client services."
      />

      <section className="container-maison pb-28">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_LIST.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={idx * 80}>
                <div className="flex flex-col border-t border-border pt-8">
                  <Icon className="h-6 w-6 text-gold" strokeWidth={1.25} />
                  <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-pearl py-24">
        <div className="container-maison text-center">
          <SectionHeader
            align="center"
            eyebrow="Personal Assistance"
            title="Have a specific request?"
            intro="Our dedicated client relations team in Paris and London is available to assist with custom sizes, rare stone sourcing, or delivery arrangements."
          />
          <div className="mt-10 flex justify-center gap-4">
            <ActionLink to="/appointments">Book Salon Visit</ActionLink>
            <ActionLink to="/care" tone="secondary">
              Jewelry Care Guide
            </ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicesPage;
