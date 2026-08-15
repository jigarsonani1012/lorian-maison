import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { PageHero } from "@/components/site/Catalog";
import {
  ActionButton,
  ActionLink,
  Field,
  Reveal,
  SelectField,
} from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { PRODUCTS, type Product } from "@/lib/catalog";
import { useStore, useFormatPrice } from "@/lib/store";

const TABS = ["Orders", "Appointments", "Wishlist", "Preferences"] as const;

export function AccountPage() {
  const {
    account,
    signIn,
    signOut,
    orders,
    appointments,
    wishlist,
    currency,
    language,
    setPreference,
    ready,
  } = useStore();
  const formatPrice = useFormatPrice();

  const [tab, setTab] = useState<(typeof TABS)[number]>("Orders");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const saved = wishlist
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));

  if (ready && !account) {
    return (
      <>
        <PageHero
          eyebrow="Client Account"
          title="Sign in"
          intro="Your orders, appointments and saved creations, kept in one place."
        />
        <div className="container-maison pb-32">
          <Reveal>
            <form
              className="mx-auto flex max-w-md flex-col gap-8"
              onSubmit={(e) => {
                e.preventDefault();
                const next: Record<string, string> = {};
                if (!name.trim()) next["name"] = "Please enter your name.";
                if (!/^\S+@\S+\.\S+$/.test(email)) next["email"] = "A valid email is required.";
                setErrors(next);
                if (Object.keys(next).length) return;
                signIn(name.trim(), email.trim());
                toast.success("Welcome to L'ORIAN");
              }}
              noValidate
            >
              <Field
                label="Full Name"
                value={name}
                error={errors["name"]}
                onChange={(e) => setName(e.target.value)}
              />
              <Field
                label="Email"
                type="email"
                value={email}
                error={errors["email"]}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ActionButton type="submit">Enter</ActionButton>
              <p className="text-xs leading-relaxed text-muted-foreground">
                A demonstration account. Details are kept on this device only and no password is
                required.
              </p>
            </form>
          </Reveal>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Client Account"
        title={account ? account.name : "Your account"}
        intro={account?.email ?? ""}
      />

      <div className="container-maison pb-28">
        <div className="mb-14 flex flex-wrap items-center justify-between gap-6 border-y border-border py-5">
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "label-xs transition-colors",
                  tab === t ? "text-gold" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              signOut();
              toast("Signed out");
            }}
            className="label-xs text-muted-foreground transition-colors hover:text-gold"
          >
            Sign Out
          </button>
        </div>

        {tab === "Orders" && (
          <div className="flex flex-col gap-10">
            {orders.length === 0 ? (
              <p className="py-16 text-center text-sm text-muted-foreground">
                No orders yet.{" "}
                <Link to="/jewelry" className="link-underline text-foreground">
                  Explore the collections
                </Link>
                .
              </p>
            ) : (
              orders.map((o) => (
                <Reveal key={o.reference}>
                  <article className="border-t border-border pt-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-4">
                      <div>
                        <h2 className="font-display text-2xl">{o.reference}</h2>
                        <p className="label-xs mt-2 text-muted-foreground">
                          {new Date(o.date).toLocaleDateString()} · {o.delivery} · {o.city}
                        </p>
                      </div>
                      <span className="label-xs text-gold">{o.status}</span>
                    </div>
                    <ul className="mt-6 flex flex-col gap-4">
                      {o.items.map((i) => (
                        <li key={i.key} className="flex items-center gap-4 text-sm">
                          <img
                            src={i.image}
                            alt={i.name}
                            loading="lazy"
                            className="aspect-[4/5] w-14 object-cover"
                          />
                          <span className="flex-1 text-muted-foreground">
                            {i.name} × {i.quantity}
                          </span>
                          <span>{formatPrice(i.price * i.quantity)}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-right font-display text-xl">{formatPrice(o.total)}</p>
                  </article>
                </Reveal>
              ))
            )}
          </div>
        )}

        {tab === "Appointments" && (
          <div className="flex flex-col gap-8">
            {appointments.length === 0 ? (
              <p className="py-16 text-center text-sm text-muted-foreground">
                No appointments yet.{" "}
                <Link to="/appointments" className="link-underline text-foreground">
                  Book a private hour
                </Link>
                .
              </p>
            ) : (
              appointments.map((a) => (
                <article key={a.reference} className="border-t border-border pt-8">
                  <h2 className="font-display text-2xl">{a.service}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {a.boutique} · {a.date} at {a.time}
                  </p>
                  <p className="label-xs mt-2 text-muted-foreground">{a.reference}</p>
                </article>
              ))
            )}
          </div>
        )}

        {tab === "Wishlist" && (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {saved.length === 0 ? (
              <p className="col-span-full py-16 text-center text-sm text-muted-foreground">
                Nothing saved yet.
              </p>
            ) : (
              saved.map((p) => (
                <Link key={p.slug} to={`/product/${p.slug}`} className="group block">
                  <div className="aspect-[4/5] overflow-hidden bg-pearl">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg">{p.name}</h3>
                  <p className="label-xs mt-1 text-muted-foreground">{formatPrice(p.price)}</p>
                </Link>
              ))
            )}
          </div>
        )}

        {tab === "Preferences" && (
          <div className="flex max-w-md flex-col gap-8">
            <SelectField
              label="Currency"
              options={["USD", "EUR", "GBP", "CHF", "JPY", "AED"]}
              value={currency}
              onChange={(e) => setPreference({ currency: e.target.value })}
            />
            <SelectField
              label="Language"
              options={["English", "Français", "Deutsch", "日本語", "العربية"]}
              value={language}
              onChange={(e) => setPreference({ language: e.target.value })}
            />
            <ActionLink to="/privacy" tone="secondary">
              Privacy &amp; Data
            </ActionLink>
          </div>
        )}
      </div>
    </>
  );
}

export default AccountPage;
