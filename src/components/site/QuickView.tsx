import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { COLLECTIONS, type Product } from "@/lib/catalog";
import { useStore, useFormatPrice, track } from "@/lib/store";
import { WishlistButton } from "./ProductCard";

export function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart, setBagOpen } = useStore();
  const formatPrice = useFormatPrice();
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState<number | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setIndex(0);
    setSize(undefined);
    setError(undefined);
  }, [product?.slug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const open = !!product;
  const collection = product ? COLLECTIONS.find((c) => c.slug === product.collection)! : null;

  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[75] bg-obsidian/50 transition-opacity duration-500",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product ? `Quick view — ${product.name}` : "Quick view"}
        className={cn(
          "fixed left-1/2 top-1/2 z-[76] max-h-[88dvh] w-[min(1040px,92vw)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-background transition-all duration-500",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-[0.98] opacity-0",
        )}
      >
        {product && collection && (
          <div className="grid md:grid-cols-2">
            <div className="bg-pearl">
              <img
                src={product.images[index]}
                alt={product.name}
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="flex gap-2 p-3">
                {product.images.slice(0, 4).map((img, i) => (
                  <button
                    key={img + i}
                    type="button"
                    aria-label={`View image ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-16 w-14 overflow-hidden border",
                      i === index ? "border-gold" : "border-transparent",
                    )}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="relative flex flex-col p-8 md:p-12">
              <button
                type="button"
                aria-label="Close quick view"
                onClick={onClose}
                className="absolute right-5 top-5 hover:text-gold"
              >
                <X className="h-5 w-5" strokeWidth={1.25} />
              </button>

              <span className="label-xs text-gold">{collection.name}</span>
              <h2 className="mt-3 font-display text-4xl leading-tight">{product.name}</h2>
              <p className="mt-3 text-sm">{formatPrice(product.price)}</p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-y-3 text-xs">
                <dt className="text-muted-foreground">Material</dt>
                <dd>{product.material}</dd>
                <dt className="text-muted-foreground">Gemstone</dt>
                <dd>{product.gemstone}</dd>
                <dt className="text-muted-foreground">Availability</dt>
                <dd>{product.availability}</dd>
              </dl>

              {product.sizes.length > 0 && (
                <div className="mt-6">
                  <span className="label-xs text-muted-foreground">Size</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {product.sizes.slice(0, 10).map((s) => (
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
                  {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
                </div>
              )}

              <div className="mt-auto flex flex-col gap-3 pt-8">
                {product.price === null ? (
                  <Link
                    to="/appointments"
                    onClick={onClose}
                    className="label-maison flex h-12 items-center justify-center bg-foreground text-background transition-colors hover:bg-gold"
                  >
                    Request a Private Viewing
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (product.sizes.length > 0 && !size) {
                        setError("Please select a size to continue.");
                        return;
                      }
                      addToCart({
                        slug: product.slug,
                        name: product.name,
                        price: product.price!,
                        image: product.images[0]!,
                        config: {
                          material: product.material,
                          gemstone: product.gemstone,
                          size,
                          packaging: "Signature Packaging",
                        },
                      });
                      track("add_to_cart", { slug: product.slug, value: product.price });
                      toast("Added to your bag.", { description: product.name });
                      onClose();
                      setBagOpen(true);
                    }}
                    className="label-maison flex h-12 items-center justify-center bg-foreground text-background transition-colors hover:bg-gold"
                  >
                    Add to Bag
                  </button>
                )}
                <div className="flex items-center justify-between">
                  <WishlistButton slug={product.slug} label />
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="label-xs link-underline hover:text-gold"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
