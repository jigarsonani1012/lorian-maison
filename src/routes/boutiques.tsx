import { useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/site/Catalog";
import { ActionLink, Reveal } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { BOUTIQUES, IMAGES } from "@/lib/catalog";

export function BoutiquesPage() {
  const regions = ["All", "Europe", "Americas", "Asia & Middle East"];
  const [region, setRegion] = useState("All");

  const regionOf = (country: string) =>
    ["France", "United Kingdom", "Switzerland"].includes(country)
      ? "Europe"
      : country === "United States"
        ? "Americas"
        : "Asia & Middle East";

  const list =
    region === "All" ? BOUTIQUES : BOUTIQUES.filter((b) => regionOf(b.country) === region);

  return (
    <>
      <PageHero
        eyebrow="Boutiques"
        title="Where to find us"
        intro="Each salon is designed around one measurement: the distance between a seated client's eye and the surface of a vitrine."
      />

      <section className="container-maison pb-20">
        <Reveal>
          <div className="img-reveal aspect-[21/9] overflow-hidden bg-pearl">
            <img
              src={IMAGES.boutique}
              alt="Interior of a L'ORIAN boutique salon"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      <div className="container-maison pb-28">
        <div className="mb-12 flex flex-wrap gap-x-8 gap-y-3 border-y border-border py-5">
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={cn(
                "label-xs transition-colors duration-300",
                region === r ? "text-gold" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="grid gap-x-14 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {list.map((b, i) => (
            <Reveal key={b.slug} delay={(i % 3) * 70}>
              <article className="flex h-full flex-col border-t border-border pt-8">
                <span className="label-xs text-gold">{b.country}</span>
                <h2 className="mt-4 font-display text-3xl">{b.city}</h2>
                <address className="mt-5 not-italic text-sm leading-relaxed text-muted-foreground">
                  {b.address}
                  <br />
                  <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="link-underline">
                    {b.phone}
                  </a>
                </address>
                <p className="mt-4 text-sm text-muted-foreground">{b.hours}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {b.services.map((s) => (
                    <li
                      key={s}
                      className="label-xs border border-foreground/15 px-3 py-1.5 text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex-1" />
                <Link
                  to={`/appointments?boutique=${encodeURIComponent(b.city)}`}
                  className="label-maison link-underline self-start text-foreground transition-colors hover:text-gold"
                >
                  Book an Appointment
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <section className="on-dark bg-obsidian py-24 text-ivory">
        <div className="container-maison text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)]">Prefer to meet from home?</h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed opacity-70">
            A client advisor can present a curated selection over a private video appointment, at a
            time that suits you.
          </p>
          <div className="mt-10 flex justify-center">
            <ActionLink to="/appointments">Arrange a Virtual Viewing</ActionLink>
          </div>
        </div>
      </section>
    </>
  );
}

export default BoutiquesPage;
