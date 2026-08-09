import { Link } from "react-router-dom";
import { Heart, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, COLLECTIONS, type Product } from "@/lib/catalog";
import { useStore, useFormatPrice, track } from "@/lib/store";

export function WishlistButton({
  slug,
  className,
  label = false,
}: {
  slug: string;
  className?: string;
  label?: boolean;
}) {
  const { isWishlisted, toggleWishlist } = useStore();
  const active = isWishlisted(slug);
  return (
    <button
      type="button"
      aria-label={active ? "Remove from wishlist" : "Save to wishlist"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggleWishlist(slug);
        track(added ? "add_to_wishlist" : "remove_from_wishlist", { slug });
        toast(added ? "Saved to your wishlist." : "Removed from your wishlist.");
      }}
      className={cn(
        "group/wish inline-flex items-center gap-2 text-foreground transition-colors duration-500 hover:text-gold",
        className,
      )}
    >
      <Heart
        className={cn("h-4 w-4 transition-all duration-500", active && "fill-gold text-gold")}
        strokeWidth={1.25}
      />
      {label && <span className="label-xs">{active ? "Saved" : "Save"}</span>}
    </button>
  );
}

export function ProductCard({
  product,
  onQuickView,
  priority = false,
}: {
  product: Product;
  onQuickView?: (p: Product) => void;
  priority?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const formatPrice = useFormatPrice();
  const collection = COLLECTIONS.find((c) => c.slug === product.collection)!;

  return (
    <article
      className="group relative flex flex-col"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        to={`/product/${product.slug}`}
        className="relative block overflow-hidden bg-pearl"
        data-cursor="discover"
      >
        <div className="relative aspect-[4/5] w-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading={priority ? "eager" : "lazy"}
            width={1024}
            height={1280}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              hover ? "scale-[1.03] opacity-0" : "scale-100 opacity-100",
            )}
          />
          <img
            src={product.images[1]}
            alt={`${product.name} — alternate view`}
            loading="lazy"
            width={1024}
            height={1280}
            aria-hidden
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
              hover ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
            )}
          />
        </div>

        {(product.isNew || product.exclusive) && (
          <span className="absolute left-4 top-4 label-xs bg-background/85 px-3 py-1.5 text-gold backdrop-blur-[2px]">
            {product.exclusive ? "Exclusive" : "New"}
          </span>
        )}
      </Link>

      <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 transition-opacity duration-500 focus-within:opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
        <span className="flex h-9 w-9 items-center justify-center bg-background/85 backdrop-blur-[2px]">
          <WishlistButton slug={product.slug} />
        </span>
        {onQuickView && (
          <button
            type="button"
            aria-label={`Quick view ${product.name}`}
            onClick={() => onQuickView(product)}
            className="hidden h-9 w-9 items-center justify-center bg-background/85 backdrop-blur-[2px] transition-colors hover:text-gold md:flex"
          >
            <Eye className="h-4 w-4" strokeWidth={1.25} />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 pt-5">
        <span className="label-xs text-gold">{collection.name}</span>
        <Link
          to={`/product/${product.slug}`}
          className="font-display text-xl leading-snug transition-colors duration-500 hover:text-gold"
        >
          {product.name}
        </Link>
        <span className="text-xs text-muted-foreground">
          {product.material} · {CATEGORY_LABELS[product.category]}
        </span>
        <span className="mt-1 text-sm">{formatPrice(product.price)}</span>
      </div>
    </article>
  );
}
