import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  COLLECTIONS,
  CATEGORY_LABELS,
  productBySlug,
  PRODUCTS,
  recommendFor,
  type Gemstone,
  type Material,
} from "@/lib/catalog";
import { useStore, useFormatPrice, track } from "@/lib/store";
import { ProductCard, WishlistButton } from "@/components/site/ProductCard";
import { ActionButton, Breadcrumbs, Reveal, SectionHeader } from "@/components/site/primitives";

const PACKAGING = ["Signature Packaging", "Gift Packaging", "Minimal Packaging"];
const FONTS = ["Cormorant Italic", "Manrope Light", "Engraved Serif"];

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = productBySlug(slug ?? "");

  const { addToCart, setBagOpen, trackView, recentlyViewed } = useStore();
  const formatPrice = useFormatPrice();
  const [img, setImg] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [material, setMaterial] = useState<Material>(product?.material ?? "Platinum");
  const [gemstone, setGemstone] = useState<Gemstone>(product?.gemstone ?? "Diamond");
  const [size, setSize] = useState<number | undefined>();
  const [packaging, setPackaging] = useState(PACKAGING[0]!);
  const [engraving, setEngraving] = useState("");
  const [font, setFont] = useState(FONTS[0]!);
  const [engraveOpen, setEngraveOpen] = useState(false);
  const [sizeGuide, setSizeGuide] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (product) {
      setImg(0);
      setSize(undefined);
      setMaterial(product.material);
      setGemstone(product.gemstone);
      trackView(product.slug);
      track("view_item", { slug: product.slug });
    }
  }, [product?.slug, trackView]);

  if (!product) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-center">
        <div>
          <h1 className="font-display text-4xl">Creation Not Found</h1>
          <p className="mt-4 text-sm text-muted-foreground">The piece you are looking for is unavailable.</p>
          <Link to="/jewelry" className="label-maison mt-8 inline-flex h-12 items-center bg-foreground px-8 text-background">
            Discover Jewelry
          </Link>
        </div>
      </div>
    );
  }

  const collection = COLLECTIONS.find((c) => c.slug === product.collection)!;
  const upon = product.price === null;
  const recent = recentlyViewed
    .filter((s) => s !== product.slug)
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <>
      <div className="container-maison pt-28 md:pt-36">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Jewelry", to: "/jewelry" },
            {
              label: CATEGORY_LABELS[product.category],
              to: `/jewelry/${product.category}`,
            },
            { label: product.name },
          ]}
        />
      </div>

      <section className="container-maison grid gap-12 py-10 lg:grid-cols-[3fr_2fr] lg:gap-20">
        <div>
          <button
            type="button"
            onClick={() => setZoom((z) => !z)}
            data-cursor="view"
            aria-label="Zoom image"
            className="block w-full overflow-hidden bg-pearl"
          >
            <img
              src={product.images[img]}
              alt={`${product.name} — view ${img + 1}`}
              width={1024}
              height={1280}
              className={cn(
                "aspect-[4/5] w-full object-cover transition-transform duration-700",
                zoom && "scale-150",
              )}
            />
          </button>
          <div className="mt-4 grid grid-cols-5 gap-3">
            {product.images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                onClick={() => {
                  setImg(i);
                  setZoom(false);
                }}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "overflow-hidden border bg-pearl",
                  i === img ? "border-gold" : "border-transparent",
                )}
              >
                <img src={src} alt="" loading="lazy" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
          <p className="label-xs mt-3 text-muted-foreground">
            Hero · Side · Macro Detail · Lifestyle · Packaging
          </p>
        </div>

        <div className="lg:sticky lg:top-28 lg:h-fit">
          <span className="label-xs text-gold">{collection.name}</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-lg">{formatPrice(product.price)}</p>
          <p className="label-xs mt-1 text-muted-foreground">
            {product.reference} · {product.availability}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {!upon && (
            <>
              <div className="mt-8">
                <span className="label-xs text-muted-foreground">Material</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.materials.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMaterial(m)}
                      className={cn(
                        "h-10 border px-4 text-xs transition-colors",
                        material === m
                          ? "border-gold text-gold"
                          : "border-foreground/15 hover:border-foreground/40",
                      )}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <span className="label-xs text-muted-foreground">Gemstone</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.gemstones.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGemstone(g)}
                      className={cn(
                        "h-10 border px-4 text-xs transition-colors",
                        gemstone === g
                          ? "border-gold text-gold"
                          : "border-foreground/15 hover:border-foreground/40",
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              {product.sizes.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <span className="label-xs text-muted-foreground">Size</span>
                    <button
                      type="button"
                      onClick={() => setSizeGuide(true)}
                      className="label-xs link-underline text-gold"
                    >
                      Find Your Size
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSize(s);
                          setError(undefined);
                        }}
                        className={cn(
                          "h-9 w-10 border text-xs transition-colors",
                          size === s
                            ? "border-gold text-gold"
                            : "border-foreground/15 hover:border-foreground/40",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="mt-6">
                <span className="label-xs text-muted-foreground">Packaging</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PACKAGING.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPackaging(p)}
                      className={cn(
                        "h-10 border px-4 text-xs transition-colors",
                        packaging === p
                          ? "border-gold text-gold"
                          : "border-foreground/15 hover:border-foreground/40",
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEngraveOpen(true)}
                className="label-xs link-underline mt-6"
              >
                {engraving ? `Engraving: “${engraving}”` : "Add Personal Engraving"}
              </button>
              {error && <p className="mt-4 text-xs text-destructive">{error}</p>}
              <ActionButton
                className="mt-8 w-full"
                onClick={() => {
                  if (product.sizes.length > 0 && !size)
                    return setError("Please select a size to continue.");
                  addToCart({
                    slug: product.slug,
                    name: product.name,
                    price: product.price!,
                    image: product.images[0]!,
                    config: {
                      material,
                      gemstone,
                      size,
                      packaging,
                      engraving: engraving || undefined,
                      engravingFont: engraving ? font : undefined,
                    },
                  });
                  track("add_to_cart", { slug: product.slug, value: product.price });
                  toast("Added to your bag.", { description: product.name });
                  setBagOpen(true);
                }}
              >
                Add to Bag
              </ActionButton>
            </>
          )}

          {upon && (
            <Link
              to="/appointments"
              className="label-maison mt-8 flex h-12 items-center justify-center bg-foreground text-background transition-colors hover:bg-gold"
            >
              Request a Private Viewing
            </Link>
          )}

          <div className="mt-5 flex items-center justify-between">
            <WishlistButton slug={product.slug} label />
            <button
              type="button"
              className="label-xs link-underline hover:text-gold"
              onClick={() => {
                void navigator.clipboard?.writeText(window.location.href);
                toast("Link copied to clipboard.");
              }}
            >
              Share
            </button>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-y-3 border-t border-border pt-8 text-sm">
            <dt className="label-xs text-muted-foreground">Collection</dt>
            <dd>{collection.name}</dd>
            <dt className="label-xs text-muted-foreground">Category</dt>
            <dd>{CATEGORY_LABELS[product.category]}</dd>
            <dt className="label-xs text-muted-foreground">Carat</dt>
            <dd>{product.carat} ct</dd>
            <dt className="label-xs text-muted-foreground">Reference</dt>
            <dd>{product.reference}</dd>
          </dl>
        </div>
      </section>

      <section className="bg-pearl">
        <div className="container-maison grid gap-10 py-20 md:grid-cols-3">
          {[
            ["The Story", collection.story],
            [
              "Craftsmanship",
              "Set and finished by hand in the Paris atelier across nine polishing grades, then inspected under three light temperatures.",
            ],
            [
              "Care",
              "Clean with a soft dry cloth. Complimentary maison inspection and polishing every twelve months.",
            ],
          ].map(([t, b]) => (
            <Reveal key={t as string}>
              <h3 className="font-display text-2xl">{t}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{b}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container-maison">
          <SectionHeader eyebrow="You May Also Love" title="Related creations" />
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
            {recommendFor(product).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          {recent.length > 0 && (
            <>
              <h2 className="mt-24 font-display text-3xl">Recently Discovered</h2>
              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
                {recent.map((p) => p && <ProductCard key={p.slug} product={p} />)}
              </div>
            </>
          )}
        </div>
      </section>

      {engraveOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Personal engraving"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-obsidian/50 p-5"
        >
          <div className="w-full max-w-lg bg-background p-8">
            <h2 className="font-display text-3xl">Personal Engraving</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Up to 20 characters, engraved by hand on the inner band.
            </p>
            <input
              value={engraving}
              maxLength={20}
              onChange={(e) => setEngraving(e.target.value)}
              placeholder="A date, a name, a word"
              aria-label="Engraving text"
              className="mt-6 h-11 w-full border-0 border-b border-foreground/20 bg-transparent outline-none focus:border-gold"
            />
            <p className="mt-2 text-xs text-muted-foreground">{engraving.length}/20 characters</p>
            <div className="mt-6">
              <span className="label-xs text-muted-foreground">Font style</span>
              <div className="mt-3 flex flex-wrap gap-2">
                {FONTS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFont(f)}
                    className={cn(
                      "h-10 border px-4 text-xs",
                      font === f ? "border-gold text-gold" : "border-foreground/15",
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 border border-border bg-pearl p-8 text-center">
              <span className="label-xs text-muted-foreground">Preview</span>
              <p className="mt-3 font-display text-3xl italic">{engraving || "Your engraving"}</p>
            </div>
            <div className="mt-8 flex gap-3">
              <ActionButton
                className="flex-1"
                onClick={() => {
                  setEngraveOpen(false);
                  if (engraving) toast("Engraving saved to this piece.");
                }}
              >
                Save Engraving
              </ActionButton>
              <ActionButton
                tone="secondary"
                onClick={() => {
                  setEngraving("");
                  setEngraveOpen(false);
                }}
              >
                Remove
              </ActionButton>
            </div>
          </div>
        </div>
      )}

      {sizeGuide && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Size guide"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-obsidian/50 p-5"
        >
          <div className="max-h-[85dvh] w-full max-w-xl overflow-y-auto bg-background p-8">
            <h2 className="font-display text-3xl">Find Your Size</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Measure the inner circumference of a ring that fits, in millimetres. That figure is
              your L'ORIAN size.
            </p>
            <table className="mt-8 w-full text-sm">
              <thead>
                <tr className="label-xs border-b border-border text-left text-muted-foreground">
                  <th className="py-2">L'ORIAN</th>
                  <th>Diameter</th>
                  <th>Circumference</th>
                  <th>US</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [48, 15.3, 48, "4½"],
                  [50, 15.9, 50, "5¼"],
                  [52, 16.6, 52, "6"],
                  [54, 17.2, 54, "6¾"],
                  [56, 17.8, 56, "7½"],
                  [58, 18.5, 58, "8¼"],
                  [60, 19.1, 60, "9"],
                ].map((r) => (
                  <tr key={r[0] as number} className="border-b border-border/60">
                    <td className="py-2">{r[0]}</td>
                    <td>{r[1]} mm</td>
                    <td>{r[2]} mm</td>
                    <td>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ActionButton className="mt-8 w-full" onClick={() => setSizeGuide(false)}>
              Close
            </ActionButton>
          </div>
        </div>
      )}
    </>
  );
}
