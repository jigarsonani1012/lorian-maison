import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/site/Catalog";
import { Reveal } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { ARTICLES } from "@/lib/catalog";

export function JournalPage() {
  const categories = ["All", ...new Set(ARTICLES.map((a) => a.category))];
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? ARTICLES : ARTICLES.filter((a) => a.category === filter);
  const [lead, ...rest] = list;

  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Notes from the maison"
        intro="Long-form writing on the making of jewels, the search for stones and the rooms in which they are shown."
      />

      <div className="container-maison pb-28">
        <div className="mb-14 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-5">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "label-xs transition-colors duration-300",
                filter === c ? "text-gold" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {lead && (
          <Reveal>
            <Link
              to={`/journal/${lead.slug}`}
              data-cursor="read"
              className="img-reveal group grid items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <div className="aspect-[4/3] overflow-hidden bg-pearl">
                <img
                  src={lead.image}
                  alt={lead.title}
                  loading="eager"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                />
              </div>
              <div>
                <span className="label-xs text-gold">{lead.category}</span>
                <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.4rem)] leading-[1.05]">
                  {lead.title}
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {lead.excerpt}
                </p>
                <p className="label-xs mt-7 text-muted-foreground">
                  {lead.date} · {lead.readingTime}
                </p>
              </div>
            </Link>
          </Reveal>
        )}

        <div className="mt-24 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 80}>
              <Link to={`/journal/${a.slug}`} data-cursor="read" className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-pearl">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                  />
                </div>
                <span className="label-xs mt-6 block text-gold">{a.category}</span>
                <h3 className="mt-3 font-display text-2xl leading-snug">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
                <p className="label-xs mt-5 text-muted-foreground">
                  {a.date} · {a.readingTime}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

export default JournalPage;
