import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, Search as SearchIcon, Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useStore, useFormatPrice, track } from "@/lib/store";
import { ARTICLES, CATEGORY_LABELS, COLLECTIONS, searchAll } from "@/lib/catalog";
import { Logo, LogoEmblem } from "@/components/site/Logo";

const TRENDING = ["Engagement Rings", "Diamond Necklaces", "New Arrivals", "Celestia", "Gifts"];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const formatPrice = useFormatPrice();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => searchAll(query), [query]);
  const articles = query
    ? ARTICLES.filter((a) =>
        `${a.title} ${a.category} ${a.excerpt}`.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  useEffect(() => {
    if (query.trim().length > 2) track("search", { query });
  }, [query]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className={cn(
        "fixed inset-0 z-[70] bg-background transition-opacity duration-500",
        searchOpen ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="container-maison flex h-16 items-center justify-between md:h-20">
        <Logo variant="full" size="sm" showSubtitle={false} />
        <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)}>
          <X className="h-5 w-5" strokeWidth={1.25} />
        </button>
      </div>

      <div className="container-maison h-[calc(100dvh-4rem)] overflow-y-auto pb-20 md:h-[calc(100dvh-5rem)]">
        <div className="mx-auto max-w-4xl pt-10 md:pt-20">
          <label htmlFor="global-search" className="label-xs text-gold">
            Search the maison
          </label>
          <div className="mt-6 flex items-center gap-4 border-b border-foreground/25 pb-4 focus-within:border-gold">
            <SearchIcon className="h-5 w-5 text-muted-foreground" strokeWidth={1.25} />
            <input
              id="global-search"
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you searching for?"
              className="w-full bg-transparent font-display text-[clamp(1.75rem,5vw,3.5rem)] leading-tight outline-none placeholder:text-muted-foreground/45"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="label-xs text-muted-foreground hover:text-gold"
              >
                Clear
              </button>
            )}
          </div>

          {!query && (
            <div className="mt-12">
              <span className="label-xs text-muted-foreground">Trending searches</span>
              <ul className="mt-5 flex flex-wrap gap-3">
                {TRENDING.map((t) => (
                  <li key={t}>
                    <button
                      type="button"
                      onClick={() => setQuery(t)}
                      className="label-xs border border-foreground/20 px-5 py-2.5 transition-colors duration-500 hover:border-gold hover:text-gold"
                    >
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {query && (
            <div className="mt-12 space-y-14">
              {results.collections.length > 0 && (
                <section>
                  <h2 className="label-xs text-gold">Collections</h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {results.collections.map((c) => (
                      <li key={c.slug}>
                        <Link
                          to={`/collections/${c.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="font-display text-2xl transition-colors hover:text-gold"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {results.products.length > 0 && (
                <section>
                  <h2 className="label-xs text-gold">Creations</h2>
                  <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {results.products.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to={`/product/${p.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="group flex gap-4"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            loading="lazy"
                            className="h-24 w-20 object-cover"
                          />
                          <span className="flex flex-col gap-1">
                            <span className="label-xs text-gold">
                              {CATEGORY_LABELS[p.category]}
                            </span>
                            <span className="font-display text-lg leading-tight group-hover:text-gold">
                              {p.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatPrice(p.price)}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {articles.length > 0 && (
                <section>
                  <h2 className="label-xs text-gold">Stories</h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {articles.map((a) => (
                      <li key={a.slug}>
                        <Link
                          to={`/journal/${a.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="text-sm transition-colors hover:text-gold"
                        >
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {results.products.length === 0 &&
                results.collections.length === 0 &&
                articles.length === 0 && (
                  <div className="py-16">
                    <p className="font-display text-3xl">Nothing found for “{query}”.</p>
                    <p className="mt-4 max-w-md text-sm text-muted-foreground">
                      Try a collection name, a gemstone or a category — or speak with a client
                      advisor, who can search the full archive on your behalf.
                    </p>
                    <Link
                      to="/appointments"
                      onClick={() => setSearchOpen(false)}
                      className="label-maison mt-8 inline-flex h-12 items-center bg-foreground px-8 text-background"
                    >
                      Contact the Maison
                    </Link>
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function BagDrawer() {
  const { bagOpen, setBagOpen, cart, subtotal, setQuantity, removeFromCart } = useStore();
  const formatPrice = useFormatPrice();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBagOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setBagOpen]);

  return (
    <>
      <div
        onClick={() => setBagOpen(false)}
        aria-hidden
        className={cn(
          "fixed inset-0 z-[65] bg-obsidian/45 transition-opacity duration-500",
          bagOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={cn(
          "fixed right-0 top-0 z-[66] flex h-dvh w-full max-w-md flex-col bg-background transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          bagOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="label-maison">Shopping Bag</h2>
          <button type="button" aria-label="Close bag" onClick={() => setBagOpen(false)}>
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span aria-hidden className="mb-8 h-10 w-px bg-gold/50" />
            <p className="font-display text-3xl">Your bag is empty</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Each L'ORIAN creation is made to be chosen slowly. Begin with the signature
              collections.
            </p>
            <Link
              to="/jewelry"
              onClick={() => setBagOpen(false)}
              className="label-maison mt-10 inline-flex h-12 items-center bg-foreground px-8 text-background transition-colors hover:bg-gold"
            >
              Discover Jewelry
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-6">
              {cart.map((item) => (
                <li key={item.key} className="flex gap-4 border-b border-border py-6 first:pt-0">
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={() => setBagOpen(false)}
                    className="shrink-0"
                  >
                    <img src={item.image} alt={item.name} className="h-28 w-24 object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="font-display text-lg leading-tight">{item.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.config.material} · {item.config.gemstone}
                      {item.config.size ? ` · Size ${item.config.size}` : ""}
                    </span>
                    {item.config.engraving && (
                      <span className="text-xs italic text-gold">“{item.config.engraving}”</span>
                    )}
                    <span className="text-xs text-muted-foreground">{item.config.packaging}</span>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-foreground/15">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                          className="px-2.5 py-1.5 hover:text-gold"
                        >
                          <Minus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                          className="px-2.5 py-1.5 hover:text-gold"
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.5} />
                        </button>
                      </div>
                      <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() => {
                      removeFromCart(item.key);
                      toast("Removed from your bag.");
                    }}
                    className="self-start text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.25} />
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-6 py-6">
              <div className="flex items-center justify-between">
                <span className="label-xs text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Insured delivery and signature packaging included.
              </p>
              <Link
                to="/checkout"
                onClick={() => setBagOpen(false)}
                className="label-maison mt-6 flex h-12 items-center justify-center bg-foreground text-background transition-colors hover:bg-gold"
              >
                Proceed to Checkout
              </Link>
              <Link
                to="/bag"
                onClick={() => setBagOpen(false)}
                className="label-maison mt-3 flex h-12 items-center justify-center border border-foreground/25 transition-colors hover:border-gold hover:text-gold"
              >
                View Bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export function CookieBanner() {
  const { cookieConsent, setCookieConsent, ready } = useStore();
  if (!ready || cookieConsent) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[55] border-t border-border bg-background/97 backdrop-blur-[6px]">
      <div className="container-maison flex flex-col gap-5 py-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">
          L'ORIAN uses cookies to remember your bag, your saved pieces and your preferences. You may
          accept all cookies or continue with essential cookies only.{" "}
          <Link to="/privacy" className="link-underline text-foreground">
            Privacy Policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setCookieConsent("essential")}
            className="label-xs h-10 border border-foreground/25 px-5 transition-colors hover:border-gold hover:text-gold"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => setCookieConsent("accepted")}
            className="label-xs h-10 bg-foreground px-5 text-background transition-colors hover:bg-gold"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

export function MaisonCursor() {
  const [enabled, setEnabled] = useState(false);
  const [labelText, setLabelText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const lastHovered = useRef(false);
  const lastLabel = useRef<string | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    let animFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      const targetInteractive = (e.target as HTMLElement | null)?.closest?.(
        "a, button, [data-cursor], input, select, textarea, [role='button']",
      );
      const cursorVal = (e.target as HTMLElement | null)
        ?.closest?.("[data-cursor]")
        ?.getAttribute("data-cursor");

      const nextHovered = !!targetInteractive;
      const nextLabel =
        cursorVal === "discover"
          ? "Discover"
          : cursorVal === "view"
            ? "View"
            : cursorVal === "play"
              ? "Play"
              : cursorVal === "drag"
                ? "Drag"
                : null;

      if (nextHovered !== lastHovered.current) {
        lastHovered.current = nextHovered;
        setIsHovered(nextHovered);
      }

      if (nextLabel !== lastLabel.current) {
        lastLabel.current = nextLabel;
        setLabelText(nextLabel);
      }
    };

    const loop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[100] hidden items-center justify-center rounded-full will-change-transform transition-[width,height,background-color,border-color,opacity] duration-300 ease-out lg:flex",
          labelText
            ? "h-20 w-20 border border-gold bg-obsidian/85 text-ivory shadow-[0_0_20px_rgba(223,183,108,0.2)] backdrop-blur-[4px]"
            : isHovered
              ? "h-13 w-13 border border-gold bg-gold/15 shadow-[0_0_12px_rgba(223,183,108,0.25)]"
              : "h-9 w-9 border border-gold/70 bg-transparent",
        )}
      >
        {labelText && (
          <span className="label-xs text-[0.5625rem] tracking-[0.25em]">{labelText}</span>
        )}
      </div>

      <div
        ref={dotRef}
        aria-hidden
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[101] hidden rounded-full bg-gold will-change-transform transition-[width,height,opacity] duration-200 lg:block",
          labelText
            ? "h-1 w-1 opacity-0"
            : isHovered
              ? "h-2.5 w-2.5 opacity-100 shadow-[0_0_12px_rgba(223,183,108,0.9)]"
              : "h-1.5 w-1.5 opacity-100 shadow-[0_0_6px_rgba(223,183,108,0.5)]",
        )}
      />
    </>
  );
}

export function PageLoader() {
  const [done, setDone] = useState(false);
  const [letters, setLetters] = useState(0);
  const word = "L'ORIAN";

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem("lorian.loaded")) {
      setDone(true);
      return;
    }
    const interval = window.setInterval(
      () => setLetters((n) => Math.min(n + 1, word.length)),
      130,
    );
    const timeout = window.setTimeout(() => {
      setDone(true);
      window.sessionStorage.setItem("lorian.loaded", "1");
    }, 1500);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      aria-hidden={done}
      className={cn(
        "fixed inset-0 z-[90] flex flex-col items-center justify-center bg-obsidian text-ivory transition-opacity duration-700",
        done ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <LogoEmblem className="mb-6 h-12 w-12 animate-pulse text-gold" />
      <span className="font-display text-3xl tracking-[0.4em] text-ivory">
        {word.slice(0, letters) || "\u00A0"}
      </span>
      <span className="mt-2 text-[0.55rem] uppercase tracking-[0.32em] text-muted-foreground">
        Maison de Haute Joaillerie
      </span>
      <span className="mt-8 h-8 w-px overflow-hidden bg-ivory/15">
        <span className="scroll-line block h-full w-full bg-gold" />
      </span>
    </div>
  );
}
