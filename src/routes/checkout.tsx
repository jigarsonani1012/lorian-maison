import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/Catalog";
import {
  ActionButton,
  ActionLink,
  EmptyState,
  Field,
  Reveal,
  SelectField,
} from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import { useStore, useFormatPrice, track } from "@/lib/store";

const STEPS = ["Contact", "Delivery", "Payment", "Review"] as const;

const DELIVERY = [
  { label: "Insured Standard — 3–5 days", value: "Insured Standard", price: 0 },
  { label: "Insured Express — next day", value: "Insured Express", price: 95 },
  { label: "Boutique Collection", value: "Boutique Collection", price: 0 },
];

const COUNTRIES = [
  "United States",
  "France",
  "United Kingdom",
  "Japan",
  "United Arab Emirates",
  "Switzerland",
  "Hong Kong SAR",
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, subtotal, placeOrder, ready, account } = useStore();
  const formatPrice = useFormatPrice();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<{ reference: string; total: number } | null>(null);

  const [form, setForm] = useState({
    email: account?.email ?? "",
    firstName: account?.name?.split(" ")[0] ?? "",
    lastName: account?.name?.split(" ").slice(1).join(" ") ?? "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    country: COUNTRIES[0]!,
    delivery: DELIVERY[0]!.value,
    card: "",
    expiry: "",
    cvc: "",
    cardName: "",
  });

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const shipping = DELIVERY.find((d) => d.value === form.delivery)?.price ?? 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e["email"] = "A valid email is required.";
      if (!form.firstName.trim()) e["firstName"] = "Required.";
      if (!form.lastName.trim()) e["lastName"] = "Required.";
    }
    if (s === 1) {
      if (!form.address.trim()) e["address"] = "Required.";
      if (!form.city.trim()) e["city"] = "Required.";
      if (!form.postcode.trim()) e["postcode"] = "Required.";
    }
    if (s === 2) {
      if (form.card.replace(/\s/g, "").length < 15) e["card"] = "Enter a valid card number.";
      if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e["expiry"] = "MM/YY";
      if (form.cvc.length < 3) e["cvc"] = "3 digits";
      if (!form.cardName.trim()) e["cardName"] = "Required.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const submit = () => {
    const order = placeOrder({
      items: cart,
      total,
      delivery: form.delivery,
      recipient: `${form.firstName} ${form.lastName}`,
      city: form.city,
    });
    track("purchase", { value: total, reference: order.reference });
    setDone({ reference: order.reference, total });
  };

  if (done) {
    return (
      <>
        <PageHero eyebrow="Order Confirmed" title="Thank you" />
        <div className="container-maison pb-32">
          <Reveal>
            <div className="mx-auto max-w-xl text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
                <Check className="h-5 w-5" strokeWidth={1.25} />
              </span>
              <p className="mt-9 text-sm leading-relaxed text-muted-foreground">
                Your order <span className="text-foreground">{done.reference}</span> has been
                received. A confirmation has been sent to {form.email}, and your client advisor will
                write before dispatch.
              </p>
              <p className="mt-6 font-display text-3xl">{formatPrice(done.total)}</p>
              <div className="mt-11 flex flex-wrap justify-center gap-4">
                <ActionLink to="/account">View Your Orders</ActionLink>
                <ActionLink to="/jewelry" tone="secondary">
                  Continue Exploring
                </ActionLink>
              </div>
            </div>
          </Reveal>
        </div>
      </>
    );
  }

  if (ready && cart.length === 0) {
    return (
      <>
        <PageHero eyebrow="Checkout" title="Nothing to complete" />
        <div className="container-maison pb-28">
          <EmptyState
            title="Your bag is empty"
            body="Add a creation to your bag to continue to checkout."
            action={<ActionLink to="/jewelry">Explore Jewelry</ActionLink>}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Secure Checkout"
        title="Complete your order"
        intro="Every L'ORIAN order travels insured, in signature packaging, with its maison certificate."
      />

      <div className="container-maison pb-28">
        <ol className="mb-14 flex flex-wrap gap-x-10 gap-y-3 border-y border-border py-5">
          {STEPS.map((s, i) => (
            <li key={s}>
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "label-xs transition-colors",
                  i === step
                    ? "text-gold"
                    : i < step
                      ? "text-foreground hover:text-gold"
                      : "text-muted-foreground",
                )}
              >
                {String(i + 1).padStart(2, "0")} — {s}
              </button>
            </li>
          ))}
        </ol>

        <div className="grid gap-16 lg:grid-cols-[1.3fr_0.7fr] lg:gap-24">
          <div>
            {step === 0 && (
              <div className="flex flex-col gap-8">
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  error={errors["email"]}
                  onChange={(e) => set("email")(e.target.value)}
                />
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field
                    label="First Name"
                    value={form.firstName}
                    error={errors["firstName"]}
                    onChange={(e) => set("firstName")(e.target.value)}
                  />
                  <Field
                    label="Last Name"
                    value={form.lastName}
                    error={errors["lastName"]}
                    onChange={(e) => set("lastName")(e.target.value)}
                  />
                </div>
                <Field
                  label="Telephone"
                  value={form.phone}
                  hint="Used only for delivery coordination."
                  onChange={(e) => set("phone")(e.target.value)}
                />
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-8">
                <Field
                  label="Address"
                  value={form.address}
                  error={errors["address"]}
                  onChange={(e) => set("address")(e.target.value)}
                />
                <div className="grid gap-8 sm:grid-cols-3">
                  <Field
                    label="City"
                    value={form.city}
                    error={errors["city"]}
                    onChange={(e) => set("city")(e.target.value)}
                  />
                  <Field
                    label="Postcode"
                    value={form.postcode}
                    error={errors["postcode"]}
                    onChange={(e) => set("postcode")(e.target.value)}
                  />
                  <SelectField
                    label="Country"
                    options={COUNTRIES}
                    value={form.country}
                    onChange={(e) => set("country")(e.target.value)}
                  />
                </div>
                <fieldset className="mt-2 border-t border-border pt-8">
                  <legend className="label-xs text-gold">Delivery Method</legend>
                  <div className="mt-5 flex flex-col gap-4">
                    {DELIVERY.map((d) => (
                      <label
                        key={d.value}
                        className="flex cursor-pointer items-center justify-between gap-6 border border-foreground/12 px-5 py-4 text-sm transition-colors hover:border-gold/50"
                      >
                        <span className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="delivery"
                            checked={form.delivery === d.value}
                            onChange={() => set("delivery")(d.value)}
                            className="h-3.5 w-3.5 accent-[oklch(0.678_0.0618_82.5)]"
                          />
                          {d.label}
                        </span>
                        <span className="label-xs text-muted-foreground">
                          {d.price ? formatPrice(d.price) : "Complimentary"}
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-8">
                <Field
                  label="Card Number"
                  inputMode="numeric"
                  placeholder="0000 0000 0000 0000"
                  value={form.card}
                  error={errors["card"]}
                  onChange={(e) => set("card")(e.target.value)}
                />
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field
                    label="Expiry (MM/YY)"
                    placeholder="04/29"
                    value={form.expiry}
                    error={errors["expiry"]}
                    onChange={(e) => set("expiry")(e.target.value)}
                  />
                  <Field
                    label="Security Code"
                    inputMode="numeric"
                    value={form.cvc}
                    error={errors["cvc"]}
                    onChange={(e) => set("cvc")(e.target.value)}
                  />
                </div>
                <Field
                  label="Name on Card"
                  value={form.cardName}
                  error={errors["cardName"]}
                  onChange={(e) => set("cardName")(e.target.value)}
                />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  This is a demonstration checkout. No payment is processed and no card details are
                  transmitted or stored.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-8 text-sm">
                <div className="border-t border-border pt-6">
                  <h3 className="label-xs text-gold">Contact</h3>
                  <p className="mt-3 text-muted-foreground">
                    {form.firstName} {form.lastName} · {form.email}
                  </p>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="label-xs text-gold">Delivery</h3>
                  <p className="mt-3 text-muted-foreground">
                    {form.address}, {form.city} {form.postcode}, {form.country}
                    <br />
                    {form.delivery}
                  </p>
                </div>
                <div className="border-t border-border pt-6">
                  <h3 className="label-xs text-gold">Items</h3>
                  <ul className="mt-4 flex flex-col gap-4">
                    {cart.map((i) => (
                      <li key={i.key} className="flex justify-between gap-6">
                        <span className="text-muted-foreground">
                          {i.name} × {i.quantity}
                          <br />
                          <span className="label-xs">
                            {i.config.material} · {i.config.gemstone}
                          </span>
                        </span>
                        <span>{formatPrice(i.price * i.quantity)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-12 flex flex-wrap items-center gap-4">
              {step > 0 && (
                <ActionButton tone="secondary" onClick={() => setStep((s) => s - 1)}>
                  Back
                </ActionButton>
              )}
              {step < STEPS.length - 1 ? (
                <ActionButton onClick={next}>Continue</ActionButton>
              ) : (
                <ActionButton onClick={submit}>Place Order</ActionButton>
              )}
              <button
                type="button"
                onClick={() => navigate("/bag")}
                className="label-xs text-muted-foreground transition-colors hover:text-gold"
              >
                Return to bag
              </button>
            </div>
          </div>

          <aside className="h-fit border-t border-border pt-8 lg:sticky lg:top-32">
            <h2 className="label-xs text-gold">Order Summary</h2>
            <ul className="mt-7 flex flex-col gap-5">
              {cart.map((i) => (
                <li key={i.key} className="flex gap-4">
                  <Link
                    to={`/product/${i.slug}`}
                    className="block w-16 shrink-0 overflow-hidden bg-pearl"
                  >
                    <img
                      src={i.image}
                      alt={i.name}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 text-sm">
                    <p className="font-display text-lg leading-tight">{i.name}</p>
                    <p className="label-xs mt-1 text-muted-foreground">Qty {i.quantity}</p>
                  </div>
                  <span className="text-sm">{formatPrice(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd>{shipping ? formatPrice(shipping) : "Complimentary"}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Estimated Tax</dt>
                <dd>{formatPrice(tax)}</dd>
              </div>
            </dl>
            <div className="mt-6 flex justify-between border-t border-border pt-6 font-display text-2xl">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
