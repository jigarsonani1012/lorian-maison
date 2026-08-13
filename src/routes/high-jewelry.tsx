import { Link } from "react-router-dom";
import { IMAGES, PRODUCTS } from "@/lib/catalog";
import { Reveal } from "@/components/site/primitives";

const CHAPTERS = [
  {
    n: "Chapter I",
    t: "The Awakening",
    img: IMAGES.highJewelry,
    text: "The exhibition opens with a single emerald cuff, lit from above, set against nothing at all.",
  },
  {
    n: "Chapter II",
    t: "Rare Stones",
    img: IMAGES.gemstones,
    text: "Ruby from Mogok, emerald from Muzo, sapphire from Kashmir — each secured over years, never reordered.",
  },
  {
    n: "Chapter III",
    t: "The Setting",
    img: IMAGES.craftsmanship,
    text: "The irreversible act. Once a claw closes, the light that leaves the jewel for the next century is decided.",
  },
];
const STONES = [
  {
    name: "Ruby",
    origin: "Mogok, Myanmar",
    carat: "8.42 ct",
    colour: "Pigeon's blood",
    rarity: "One of four secured this decade",
  },
  {
    name: "Emerald",
    origin: "Muzo, Colombia",
    carat: "12.10 ct",
    colour: "Vivid green, minor oil",
    rarity: "Single example",
  },
  {
    name: "Sapphire",
    origin: "Kashmir, India",
    carat: "6.88 ct",
    colour: "Velvet cornflower",
    rarity: "Archive acquisition, 2019",
  },
  {
    name: "Diamond",
    origin: "Botswana",
    carat: "14.02 ct",
    colour: "D, Type IIa",
    rarity: "Cut in the maison atelier",
  },
];

export function HighJewelryPage() {
  const pieces = PRODUCTS.filter((p) => p.category === "high-jewelry");
  return (
    <div className="on-dark bg-obsidian text-ivory">
      <section className="relative h-[100svh] overflow-hidden">
        <img
          src={IMAGES.highJewelry}
          alt="L'ORIAN high jewellery under a single beam of light"
          className="animate-slow-zoom absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="container-maison relative flex h-full flex-col items-center justify-center text-center">
          <span className="label-maison text-gold-soft">High Jewelry 2026</span>
          <h1 className="mt-8 font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.98]">
            Where Eternity
            <br />
            Takes Form
          </h1>
          <p className="mt-8 max-w-xl text-ivory/70">
            An exhibition in three chapters. No piece here exists twice.
          </p>
        </div>
      </section>

      {CHAPTERS.map((c, i) => (
        <section
          key={c.n}
          className="container-maison grid items-center gap-14 py-24 md:py-36 lg:grid-cols-2 lg:gap-24"
        >
          <Reveal className={i % 2 ? "lg:order-2" : ""}>
            <div className="img-reveal aspect-[4/5] overflow-hidden">
              <img src={c.img} alt={c.t} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <span className="label-maison text-gold">{c.n}</span>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] leading-none">
              {c.t}
            </h2>
            <p className="mt-8 max-w-lg leading-relaxed text-ivory/65">{c.text}</p>
          </Reveal>
        </section>
      ))}

      <section className="container-maison py-24">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)]">Rare Stones</h2>
        <ul className="mt-12 grid gap-px bg-ivory/15 md:grid-cols-2">
          {STONES.map((s) => (
            <li
              key={s.name}
              className="group bg-obsidian p-8 transition-colors duration-500 hover:bg-obsidian-soft"
            >
              <h3 className="font-display text-3xl text-gold">{s.name}</h3>
              <dl className="mt-6 grid grid-cols-2 gap-y-2 text-sm text-ivory/60">
                <dt className="label-xs">Origin</dt>
                <dd>{s.origin}</dd>
                <dt className="label-xs">Carat</dt>
                <dd>{s.carat}</dd>
                <dt className="label-xs">Colour</dt>
                <dd>{s.colour}</dd>
                <dt className="label-xs">Rarity</dt>
                <dd>{s.rarity}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-maison pb-32">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)]">The Creations</h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {pieces.map((p) => (
            <li key={p.slug}>
              <Link
                to={`/product/${p.slug}`}
                data-cursor="discover"
                className="img-reveal group block"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl group-hover:text-gold">{p.name}</h3>
                <p className="mt-1 label-xs text-ivory/50">Price Upon Request</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/appointments"
          className="label-maison mt-16 inline-flex h-12 items-center border border-ivory/40 px-10 transition-colors hover:border-gold hover:text-gold"
        >
          Request a Private Viewing
        </Link>
      </section>
    </div>
  );
}

export default HighJewelryPage;
