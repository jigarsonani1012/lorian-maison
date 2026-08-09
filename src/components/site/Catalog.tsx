import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CATEGORY_LABELS,
  COLLECTIONS,
  GEMSTONES,
  MATERIALS,
  PRODUCTS,
  type Category,
  type Gemstone,
  type Material,
  type Product,
} from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { QuickView } from "./QuickView";
import { EmptyState, ActionButton } from "./primitives";

const SORTS = [
  "Recommended",
  "Newest",
  "Price Low → High",
  "Price High → Low",
  "Most Popular",
] as const;

function Group({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <fieldset className="border-b border-border py-6">
      <legend className="label-xs text-gold">{title}</legend>
      <div className="mt-4 flex flex-col gap-2.5">
        {options.map((o) => (
          <label
            key={o}
            className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <input
              type="checkbox"
              checked={selected.includes(o)}
              onChange={() => onToggle(o)}
              className="h-3.5 w-3.5 accent-[oklch(0.678_0.0618_82.5)]"
            />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Catalog({
  initialCategory,
  products = PRODUCTS,
  title,
}: {
  initialCategory?: Category;
  products?: Product[];
  title?: string;
}) {
  const [categories, setCategories] = useState<string[]>(
    initialCategory ? [CATEGORY_LABELS[initialCategory]] : [],
  );
  const [collections, setCollections] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [gemstones, setGemstones] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(40000);
  const [flags, setFlags] = useState<string[]>([]);
  const [sort, setSort] = useState<(typeof SORTS)[number]>("Recommended");
  const [panelOpen, setPanelOpen] = useState(false);
  const [quick, setQuick] = useState<Product | null>(null);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (v: string) =>
    setter((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));

  const results = useMemo(() => {
    const list = products.filter((p) => {
      if (categories.length && !categories.includes(CATEGORY_LABELS[p.category])) return false;
      if (
        collections.length &&
        !collections.includes(COLLECTIONS.find((c) => c.slug === p.collection)!.name)
      )
        return false;
      if (materials.length && !materials.includes(p.material)) return false;
      if (gemstones.length && !gemstones.includes(p.gemstone)) return false;
      if (p.price !== null && p.price > maxPrice) return false;
      if (flags.includes("New Arrivals") && !p.isNew) return false;
      if (flags.includes("Exclusive Pieces") && !p.exclusive) return false;
      if (flags.includes("Available Now") && p.availability !== "Available") return false;
      return true;
    });
    const by: Record<string, (a: Product, b: Product) => number> = {
      Newest: (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
      "Price Low → High": (a, b) => (a.price ?? 1e9) - (b.price ?? 1e9),
      "Price High → Low": (a, b) => (b.price ?? 0) - (a.price ?? 0),
      "Most Popular": (a, b) => b.popularity - a.popularity,
      Recommended: (a, b) => Number(b.featured) - Number(a.featured) || b.popularity - a.popularity,
    };
    return [...list].sort(by[sort]!);
  }, [products, categories, collections, materials, gemstones, maxPrice, flags, sort]);

  const activeCount =
    categories.length + collections.length + materials.length + gemstones.length + flags.length;
  const clear = () => {
    setCategories([]);
    setCollections([]);
    setMaterials([]);
    setGemstones([]);
    setFlags([]);
    setMaxPrice(40000);
  };

  return (
    <div className="container-maison pb-28">
      <div className="grid gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
        <aside
          className={cn(
            "z-[68] bg-background lg:sticky lg:top-28 lg:block lg:h-fit",
            panelOpen ? "fixed inset-0 overflow-y-auto p-6" : "hidden",
          )}
        >
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <span className="label-maison">Filters</span>
            <button type="button" aria-label="Close filters" onClick={() => setPanelOpen(false)}>
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="label-xs text-muted-foreground">{results.length} creations</span>
            {activeCount > 0 && (
              <button type="button" onClick={clear} className="label-xs text-gold link-underline">
                Clear all
              </button>
            )}
          </div>
          <Group
            title="Category"
            options={Object.values(CATEGORY_LABELS)}
            selected={categories}
            onToggle={toggle(setCategories)}
          />
          <Group
            title="Collection"
            options={COLLECTIONS.map((c) => c.name)}
            selected={collections}
            onToggle={toggle(setCollections)}
          />
          <Group
            title="Material"
            options={MATERIALS as unknown as string[]}
            selected={materials}
            onToggle={toggle(setMaterials)}
          />
          <Group
            title="Gemstone"
            options={GEMSTONES as unknown as string[]}
            selected={gemstones}
            onToggle={toggle(setGemstones)}
          />
          <fieldset className="border-b border-border py-6">
            <legend className="label-xs text-gold">Price</legend>
            <input
              type="range"
              min={1000}
              max={40000}
              step={500}
              value={maxPrice}
              aria-label="Maximum price"
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-5 w-full accent-[oklch(0.678_0.0618_82.5)]"
            />
            <p className="mt-3 text-xs text-muted-foreground">
              Up to ${maxPrice.toLocaleString()} · high jewellery upon request
            </p>
          </fieldset>
          <Group
            title="Availability"
            options={["New Arrivals", "Exclusive Pieces", "Available Now"]}
            selected={flags}
            onToggle={toggle(setFlags)}
          />
          {panelOpen && (
            <ActionButton className="mt-6 w-full" onClick={() => setPanelOpen(false)}>
              Show {results.length} Creations
            </ActionButton>
          )}
        </aside>

        <div>
          <div className="mb-10 flex items-center justify-between gap-4 border-b border-border pb-5">
            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              className="label-xs flex items-center gap-2 lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.25} /> Filters
              {activeCount ? ` (${activeCount})` : ""}
            </button>
            <span className="label-xs hidden text-muted-foreground lg:block">
              {title ?? "All Jewelry"} — {results.length} creations
            </span>
            <label className="label-xs flex items-center gap-2 text-muted-foreground">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                aria-label="Sort creations"
                className="bg-transparent text-foreground outline-none"
              >
                {SORTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {results.length === 0 ? (
            <EmptyState
              title="No creations match"
              body="Adjust or clear your filters to see more of the maison's work."
              action={<ActionButton onClick={clear}>Clear Filters</ActionButton>}
            />
          ) : (
            <div className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-3 lg:gap-x-10 xl:gap-x-12">
              {results.map((p, i) => (
                <ProductCard key={p.slug} product={p} onQuickView={setQuick} priority={i < 3} />
              ))}
            </div>
          )}
        </div>
      </div>
      <QuickView product={quick} onClose={() => setQuick(null)} />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  dark?: boolean;
}) {
  return (
    <section className={cn("pt-32 md:pt-44", dark && "on-dark bg-obsidian text-ivory")}>
      <div className="container-maison pb-14 md:pb-20">
        <span className="label-maison inline-flex items-center gap-3 text-muted-foreground">
          <span aria-hidden className="h-px w-8 bg-gold" />
          {eyebrow}
        </span>
        <h1 className="mt-7 font-display text-[clamp(2.75rem,7.5vw,7rem)] leading-[0.98]">
          {title}
        </h1>
        {intro && (
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
