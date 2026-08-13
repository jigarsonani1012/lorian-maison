import { useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import { ActionButton, Reveal, SectionHeader } from "@/components/site/primitives";
import { DIAMOND_EDUCATION, IMAGES, PRODUCTS } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const STEPS = [
  { q: "Which style speaks to you?", options: ["Classic", "Modern", "Vintage", "Statement"] },
  { q: "Which stone shape?", options: ["Round", "Oval", "Emerald", "Pear", "Cushion", "Princess"] },
  { q: "Which metal?", options: ["Yellow Gold", "Rose Gold", "White Gold", "Platinum"] },
  {
    q: "Your budget?",
    options: ["Up to $8,000", "$8,000 – $15,000", "$15,000 – $25,000", "Above $25,000"],
  },
];

export function EngagementPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step >= STEPS.length;
  const budget = answers[3];
  const cap =
    budget?.includes("8,000") && budget.startsWith("Up")
      ? 8000
      : budget?.startsWith("$8")
        ? 15000
        : budget?.startsWith("$15")
          ? 25000
          : 1e9;
  const metal = answers[2];
  const results = PRODUCTS.filter((p) => p.category === "engagement" || p.category === "rings")
    .filter((p) => (metal ? p.material === metal : true))
    .filter((p) => p.price !== null && p.price <= cap)
    .slice(0, 3);

  return (
    <>
      <section className="relative h-[70svh] overflow-hidden bg-pearl">
        <img
          src={IMAGES.engagement}
          alt="A L'ORIAN engagement ring on ivory silk"
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="container-maison relative flex h-full flex-col justify-end pb-16">
          <span className="label-maison text-gold">Engagement</span>
          <h1 className="mt-5 font-display text-[clamp(3rem,9vw,7.5rem)] leading-none">
            Find the one
          </h1>
        </div>
      </section>

      <section className="section-y">
        <div className="container-maison max-w-3xl">
          <SectionHeader
            eyebrow="The Ring Finder"
            title="Four questions"
            intro="Answer four questions and the maison will propose three rings. A client advisor can refine the selection with you afterwards."
          />
          <div className="mt-14 border border-border p-8 md:p-12">
            {!done ? (
              <>
                <div className="flex items-center gap-3">
                  {STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "h-px flex-1 transition-colors",
                        i <= step ? "bg-gold" : "bg-border",
                      )}
                    />
                  ))}
                </div>
                <span className="label-xs mt-6 block text-muted-foreground">
                  Step 0{step + 1} of 04
                </span>
                <h3 className="mt-3 font-display text-3xl">{STEPS[step]!.q}</h3>
                <div className="mt-8 flex flex-wrap gap-3">
                  {STEPS[step]!.options.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => {
                        setAnswers((a) => {
                          const n = [...a];
                          n[step] = o;
                          return n;
                        });
                        setStep(step + 1);
                      }}
                      className="label-xs h-11 border border-foreground/20 px-6 transition-colors hover:border-gold hover:text-gold"
                    >
                      {o}
                    </button>
                  ))}
                </div>
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="label-xs link-underline mt-8 text-muted-foreground"
                  >
                    Back
                  </button>
                )}
              </>
            ) : (
              <>
                <h3 className="font-display text-3xl">Three rings for you</h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {answers.filter(Boolean).join(" · ")}
                </p>
                <div className="mt-10 grid gap-8 sm:grid-cols-3">
                  {results.length ? (
                    results.map((p) => <ProductCard key={p.slug} product={p} />)
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No ring matches exactly — a maison advisor will propose a bespoke commission.
                    </p>
                  )}
                </div>
                <ActionButton
                  tone="secondary"
                  className="mt-10"
                  onClick={() => {
                    setStep(0);
                    setAnswers([]);
                  }}
                >
                  Start Again
                </ActionButton>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="container-maison py-24">
          <SectionHeader eyebrow="Diamond Education" title="The four criteria" />
          <ul className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
            {DIAMOND_EDUCATION.map((d, i) => (
              <Reveal as="li" key={d.title} delay={i * 70} className="bg-pearl p-8">
                <span className="font-display text-5xl text-gold">{d.title[0]}</span>
                <h3 className="mt-4 font-display text-2xl">{d.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
                <p className="label-xs mt-4 text-gold">{d.detail}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default EngagementPage;
