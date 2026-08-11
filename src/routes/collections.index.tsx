import { Link } from "react-router-dom";
import { PageHero } from "@/components/site/Catalog";
import { Reveal } from "@/components/site/primitives";
import { COLLECTIONS } from "@/lib/catalog";

export function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="Six houses, one maison"
        intro="Each L'ORIAN collection follows its own discipline. Some are governed by light, others by colour, others by restraint."
      />
      <div className="container-maison pb-28">
        <div className="flex flex-col gap-24 md:gap-36">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.slug}>
              <Link
                to={`/collections/${c.slug}`}
                data-cursor="discover"
                className={`img-reveal group grid items-center gap-10 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[direction:rtl]" : ""}`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-pearl">
                  <img
                    src={c.image}
                    alt={`${c.name} collection`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="[direction:ltr]">
                  <span className="label-xs text-gold">Since {c.year}</span>
                  <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-none transition-colors group-hover:text-gold">
                    {c.name}
                  </h2>
                  <p className="mt-3 font-display text-xl italic text-muted-foreground">
                    {c.tagline}
                  </p>
                  <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
                    {c.intro}
                  </p>
                  <span className="label-maison link-underline mt-8 inline-block">
                    Discover {c.name}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}

export default CollectionsPage;
