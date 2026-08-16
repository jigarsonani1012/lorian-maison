import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Search, MapPin, User, Heart, ShoppingBag, Menu, X, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { COLLECTIONS, IMAGES } from "@/lib/catalog";
import { Logo } from "@/components/site/Logo";
import { getTranslation } from "@/lib/i18n";

interface NavLeaf {
  label: string;
  to: string;
}

interface NavItem {
  label: string;
  to: string;
  columns?: { title: string; links: NavLeaf[] }[];
  image?: { src: string; caption: string; to: string };
}

const NAV: NavItem[] = [
  {
    label: "Jewelry",
    to: "/jewelry",
    columns: [
      {
        title: "By Category",
        links: [
          { label: "All Jewelry", to: "/jewelry" },
          { label: "Rings", to: "/jewelry/rings" },
          { label: "Necklaces", to: "/jewelry/necklaces" },
          { label: "Bracelets", to: "/jewelry/bracelets" },
          { label: "Earrings", to: "/jewelry/earrings" },
          { label: "Brooches", to: "/jewelry/brooches" },
        ],
      },
      {
        title: "Shop By Collection",
        links: COLLECTIONS.map((c) => ({
          label: c.name,
          to: `/collections/${c.slug}`,
        })),
      },
      {
        title: "Discover",
        links: [
          { label: "New Arrivals", to: "/jewelry" },
          { label: "Rare Stones", to: "/high-jewelry" },
          { label: "Diamond Education", to: "/engagement" },
          { label: "Bespoke Commissions", to: "/bespoke" },
          { label: "Jewelry Care", to: "/care" },
        ],
      },
    ],
    image: {
      src: IMAGES.necklace,
      caption: "Celestia — Constellation Necklace",
      to: "/collections/celestia",
    },
  },
  { label: "High Jewelry", to: "/high-jewelry" },
  {
    label: "Collections",
    to: "/collections",
    columns: [
      {
        title: "Signature Collections",
        links: COLLECTIONS.slice(0, 3).map((c) => ({
          label: c.name,
          to: `/collections/${c.slug}`,
        })),
      },
      {
        title: "Also Discover",
        links: COLLECTIONS.slice(3).map((c) => ({
          label: c.name,
          to: `/collections/${c.slug}`,
        })),
      },
      {
        title: "The Maison",
        links: [
          { label: "Our Story", to: "/maison" },
          { label: "Craftsmanship", to: "/maison/craftsmanship" },
          { label: "The Journal", to: "/journal" },
        ],
      },
    ],
    image: {
      src: IMAGES.highJewelry,
      caption: "Nocturne — Composed in darkness",
      to: "/collections/nocturne",
    },
  },
  {
    label: "Engagement",
    to: "/engagement",
    columns: [
      {
        title: "Engagement",
        links: [
          { label: "Engagement Rings", to: "/jewelry/engagement" },
          { label: "The Ring Finder", to: "/engagement" },
          { label: "Diamond Education", to: "/engagement" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Book an Appointment", to: "/appointments" },
          { label: "Bespoke Commissions", to: "/bespoke" },
          { label: "Find a Boutique", to: "/boutiques" },
        ],
      },
    ],
    image: { src: IMAGES.engagement, caption: "Find the one", to: "/engagement" },
  },
  { label: "Weddings", to: "/weddings" },
  { label: "Gifts", to: "/gifts" },
  { label: "The Maison", to: "/maison" },
];

const LEFT_NAV = NAV.slice(0, 4);
const RIGHT_NAV = NAV.slice(4);

const NAV_KEYS: Record<string, string> = {
  Jewelry: "jewelry",
  "High Jewelry": "highJewelry",
  Collections: "collections",
  Engagement: "engagement",
  Weddings: "weddings",
  Gifts: "gifts",
  "The Maison": "theMaison",
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const { cartCount, wishlist, setBagOpen, setSearchOpen, account, language } = useStore();
  const { pathname } = useLocation();
  const darkRoute = pathname.startsWith("/high-jewelry");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const overlayMode = !scrolled && (pathname === "/" || darkRoute);

  return (
    <>
      <header
        onMouseLeave={() => setOpenMenu(null)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,backdrop-filter] duration-700",
          overlayMode
            ? "on-dark border-b border-transparent bg-transparent text-white"
            : "border-b border-border bg-background/88 text-foreground backdrop-blur-[6px]",
          openMenu && "bg-background text-foreground",
        )}
      >
        <div className="container-maison">
          <div className="flex h-16 items-center justify-between gap-4 md:h-20 lg:h-24">
            {/* Left Nav */}
            <div className="flex items-center gap-5 xl:gap-7">
              <button
                type="button"
                className="flex items-center lg:hidden"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" strokeWidth={1.25} />
              </button>

              <nav aria-label="Main Left" className="hidden items-center gap-5 lg:flex xl:gap-7">
                {LEFT_NAV.map((item) => (
                  <div
                    key={item.label}
                    onMouseEnter={() => setOpenMenu(item.columns ? item.label : null)}
                  >
                    <Link
                      to={item.to}
                      className={cn(
                        "label-maison link-underline whitespace-nowrap transition-colors duration-500 hover:text-gold",
                        pathname === item.to && "text-gold",
                      )}
                    >
                      {getTranslation(language, NAV_KEYS[item.label] || item.label)}
                    </Link>
                  </div>
                ))}
              </nav>
            </div>

            {/* Center Logo */}
            <Link to="/" aria-label="L'ORIAN Maison — home" className="shrink-0 px-2 text-center">
              <Logo variant="header" accentGold={overlayMode} />
            </Link>

            {/* Right Nav & Actions */}
            <div className="flex items-center justify-end gap-5 xl:gap-7">
              <nav aria-label="Main Right" className="hidden items-center gap-5 lg:flex xl:gap-7">
                {RIGHT_NAV.map((item) => (
                  <div
                    key={item.label}
                    onMouseEnter={() => setOpenMenu(item.columns ? item.label : null)}
                  >
                    <Link
                      to={item.to}
                      className={cn(
                        "label-maison link-underline whitespace-nowrap transition-colors duration-500 hover:text-gold",
                        pathname === item.to && "text-gold",
                      )}
                    >
                      {getTranslation(language, NAV_KEYS[item.label] || item.label)}
                    </Link>
                  </div>
                ))}
              </nav>

              <div className="flex items-center justify-end gap-4 md:gap-5">
                <button
                  type="button"
                  aria-label="Search"
                  onClick={() => setSearchOpen(true)}
                  className="transition-colors duration-500 hover:text-gold"
                >
                  <Search className="h-[18px] w-[18px]" strokeWidth={1.25} />
                </button>
                <Link
                  to="/boutiques"
                  aria-label="Boutiques"
                  className="hidden transition-colors duration-500 hover:text-gold md:block"
                >
                  <MapPin className="h-[18px] w-[18px]" strokeWidth={1.25} />
                </Link>
                <Link
                  to="/account"
                  aria-label={account ? "Your account" : "Sign in"}
                  className="hidden transition-colors duration-500 hover:text-gold md:block"
                >
                  <User className="h-[18px] w-[18px]" strokeWidth={1.25} />
                </Link>
                <Link
                  to="/wishlist"
                  aria-label={`Wishlist, ${wishlist.length} items`}
                  className="relative transition-colors duration-500 hover:text-gold"
                >
                  <Heart className="h-[18px] w-[18px]" strokeWidth={1.25} />
                  {wishlist.length > 0 && (
                    <span className="absolute -right-2 -top-1.5 text-[0.5625rem] text-gold">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
                <button
                  type="button"
                  aria-label={`Shopping bag, ${cartCount} items`}
                  onClick={() => setBagOpen(true)}
                  className="relative flex items-center gap-1.5 transition-colors duration-500 hover:text-gold"
                >
                  <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.25} />
                  {cartCount > 0 && <span className="label-xs text-gold">({cartCount})</span>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        {NAV.filter((n) => n.columns).map((item) => (
          <div
            key={item.label}
            className={cn(
              "absolute inset-x-0 top-full hidden overflow-hidden border-b border-border bg-background text-foreground transition-[max-height,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:block",
              openMenu === item.label
                ? "max-h-[32rem] opacity-100"
                : "pointer-events-none max-h-0 opacity-0",
            )}
          >
            <div className="container-maison grid grid-cols-12 gap-12 py-14">
              {item.columns?.map((col) => (
                <div key={col.title} className="col-span-3">
                  <h3 className="label-xs text-gold">{col.title}</h3>
                  <ul className="mt-6 flex flex-col gap-3.5">
                    {col.links.map((l) => (
                      <li key={l.label + l.to}>
                        <Link
                          to={l.to}
                          className="link-underline text-sm text-foreground/80 transition-colors duration-500 hover:text-gold"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {item.image && (
                <Link to={item.image.to} className="img-reveal col-span-3 col-start-10 block">
                  <div className="aspect-[4/5] overflow-hidden bg-pearl">
                    <img
                      src={item.image.src}
                      alt={item.image.caption}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="mt-3 block label-xs text-muted-foreground">
                    {item.image.caption}
                  </span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </header>

      {/* Mobile navigation */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-background transition-opacity duration-500 lg:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Link to="/" onClick={() => setMobileOpen(false)} aria-label="L'ORIAN Maison — home">
            <Logo variant="full" size="sm" showSubtitle={false} />
          </Link>
          <button type="button" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>

        <nav aria-label="Mobile" className="h-[calc(100dvh-4rem)] overflow-y-auto px-5 pb-16">
          <ul className="border-t border-border">
            {NAV.map((item, i) => (
              <li
                key={item.label}
                className="border-b border-border"
                style={{
                  animation: mobileOpen
                    ? `lorian-rise 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both`
                    : undefined,
                }}
              >
                <div className="flex items-center justify-between">
                  <Link
                    to={item.to}
                    className="flex-1 py-5 font-display text-[1.75rem] leading-none"
                    onClick={() => setMobileOpen(false)}
                  >
                    {getTranslation(language, NAV_KEYS[item.label] || item.label)}
                  </Link>
                  {item.columns && (
                    <button
                      type="button"
                      aria-label={`Expand ${item.label}`}
                      aria-expanded={mobileSection === item.label}
                      onClick={() =>
                        setMobileSection(mobileSection === item.label ? null : item.label)
                      }
                      className="p-3 text-muted-foreground"
                    >
                      {mobileSection === item.label ? (
                        <Minus className="h-4 w-4" strokeWidth={1.25} />
                      ) : (
                        <Plus className="h-4 w-4" strokeWidth={1.25} />
                      )}
                    </button>
                  )}
                </div>
                {item.columns && mobileSection === item.label && (
                  <div className="grid gap-6 pb-6">
                    {item.columns.map((col) => (
                      <div key={col.title}>
                        <span className="label-xs text-gold">{col.title}</span>
                        <ul className="mt-3 flex flex-col gap-2.5">
                          {col.links.map((l) => (
                            <li key={l.label + l.to}>
                              <Link
                                to={l.to}
                                onClick={() => setMobileOpen(false)}
                                className="text-sm text-muted-foreground"
                              >
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              className="label-xs flex h-12 items-center justify-center border border-foreground/20"
            >
              Search
            </button>
            <Link
              to="/account"
              onClick={() => setMobileOpen(false)}
              className="label-xs flex h-12 items-center justify-center border border-foreground/20"
            >
              Account
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMobileOpen(false)}
              className="label-xs flex h-12 items-center justify-center border border-foreground/20"
            >
              Wishlist
            </Link>
            <Link
              to="/boutiques"
              onClick={() => setMobileOpen(false)}
              className="label-xs flex h-12 items-center justify-center border border-foreground/20"
            >
              Boutiques
            </Link>
          </div>
          <Link
            to="/appointments"
            onClick={() => setMobileOpen(false)}
            className="label-maison mt-4 flex h-12 items-center justify-center bg-foreground text-background"
          >
            Book an Appointment
          </Link>
        </nav>
      </div>
    </>
  );
}
