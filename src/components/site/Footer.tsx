import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useStore } from "@/lib/store";
import { COLLECTIONS } from "@/lib/catalog";
import { Logo } from "@/components/site/Logo";
import { getTranslation } from "@/lib/i18n";

const COLUMN_KEYS: Record<
  string,
  {
    key: string;
    links: { key: string; label: string; to: string }[];
  }
> = {
  "Client Services": {
    key: "clientServices",
    links: [
      { key: "contactMaison", label: "Contact the Maison", to: "/boutiques" },
      { key: "bookAppointment", label: "Book an Appointment", to: "/appointments" },
      { key: "deliveryReturns", label: "Delivery & Returns", to: "/services" },
      { key: "jewelryCare", label: "Jewelry Care", to: "/care" },
      { key: "sizeGuide", label: "Size Guide", to: "/services" },
      { key: "bespokeCommissions", label: "Bespoke Commissions", to: "/bespoke" },
    ],
  },
  "The Maison": {
    key: "theMaison",
    links: [
      { key: "ourStory", label: "Our Story", to: "/maison" },
      { key: "craftsmanship", label: "Craftsmanship", to: "/maison/craftsmanship" },
      { key: "responsibility", label: "Responsibility", to: "/responsibility" },
      { key: "theJournal", label: "The Journal", to: "/journal" },
      { key: "boutiques", label: "Boutiques", to: "/boutiques" },
    ],
  },
  Collections: {
    key: "collections",
    links: COLLECTIONS.map((c) => ({
      key: c.slug,
      label: c.name,
      to: `/collections/${c.slug}`,
    })),
  },
  Legal: {
    key: "legal",
    links: [
      { key: "privacyPolicy", label: "Privacy Policy", to: "/privacy" },
      { key: "termsOfSale", label: "Terms of Sale", to: "/privacy" },
      { key: "accessibility", label: "Accessibility", to: "/privacy" },
      { key: "cookiePreferences", label: "Cookie Preferences", to: "/privacy" },
    ],
  },
};

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [done, setDone] = useState(false);
  const { language } = useStore();

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const value = email.trim();
        if (!value) return setError("Please enter your email address.");
        if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value))
          return setError("Please enter a valid email address, such as name@example.com.");
        setError(undefined);
        setDone(true);
        setEmail("");
        toast("Welcome to the world of L'ORIAN.", {
          description: "A confirmation has been sent to your inbox.",
        });
      }}
      className="w-full max-w-lg"
    >
      <label htmlFor="newsletter-email" className="label-xs text-ivory/70">
        {getTranslation(language, "emailAddress")}
      </label>
      <div className="mt-3 flex items-end gap-4 border-b border-ivory/30 focus-within:border-gold">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          aria-invalid={!!error}
          className="h-11 flex-1 bg-transparent text-[0.95rem] text-ivory outline-none placeholder:text-ivory/40"
        />
        <button
          type="submit"
          className="label-xs pb-3 text-ivory transition-colors duration-500 hover:text-gold"
        >
          {getTranslation(language, "subscribe")}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      {done && !error && (
        <p className="mt-2 text-xs text-gold">Thank you — your subscription is confirmed.</p>
      )}
    </form>
  );
}

export function Footer() {
  const { currency, language, setPreference } = useStore();

  return (
    <footer className="on-dark border-t border-ivory/15 bg-obsidian text-ivory">
      <div className="container-maison py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ivory">
              {getTranslation(language, "enterWorld")}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/75">
              {getTranslation(language, "newsletterDesc")}
            </p>
            <div className="mt-8">
              <Newsletter />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {Object.entries(COLUMN_KEYS).map(([title, col]) => (
              <div key={title}>
                <h3 className="label-xs tracking-[0.2em] text-gold">
                  {getTranslation(language, col.key)}
                </h3>
                <ul className="mt-6 flex flex-col gap-3.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="link-underline text-[0.85rem] text-ivory/80 transition-colors duration-500 hover:text-gold"
                      >
                        {getTranslation(language, l.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-ivory/15 pt-10 md:flex-row md:items-center md:justify-between">
          <Link to="/" aria-label="L'ORIAN Maison — home">
            <Logo variant="full" size="md" accentGold showSubtitle />
          </Link>

          <div className="flex flex-wrap items-center gap-6">
            <label className="label-xs flex items-center gap-2 text-ivory/70">
              {getTranslation(language, "currency")}
              <select
                aria-label="Select currency"
                value={currency}
                onChange={(e) => setPreference({ currency: e.target.value })}
                className="cursor-pointer rounded-sm border border-ivory/20 bg-obsidian/90 px-2 py-1 text-xs text-ivory outline-none hover:border-gold"
              >
                {["USD", "EUR", "GBP", "AED", "JPY"].map((c) => (
                  <option key={c} value={c} className="bg-obsidian text-ivory">
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="label-xs flex items-center gap-2 text-ivory/70">
              {getTranslation(language, "language")}
              <select
                aria-label="Select language"
                value={language}
                onChange={(e) => setPreference({ language: e.target.value })}
                className="cursor-pointer rounded-sm border border-ivory/20 bg-obsidian/90 px-2 py-1 text-xs text-ivory outline-none hover:border-gold"
              >
                {["English", "Français", "Italiano", "日本語", "العربية"].map((l) => (
                  <option key={l} value={l} className="bg-obsidian text-ivory">
                    {l}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="label-xs text-ivory/60">© 2026 L'ORIAN Maison · Crafted Beyond Time</p>
        </div>
      </div>
    </footer>
  );
}
