import { Link } from "react-router-dom";
import { Minus, Plus, X } from "lucide-react";
import { PageHero } from "@/components/site/Catalog";
import { ActionLink, EmptyState, Reveal } from "@/components/site/primitives";
import { useStore, useFormatPrice } from "@/lib/store";

export function BagPage() {
  const { cart, subtotal, setQuantity, removeFromCart, ready } = useStore();
  const formatPrice = useFormatPrice();

  return (
    <>
      <PageHero
        eyebrow="Your Bag"
        title="Before you continue"
        intro="Each L'ORIAN order is dispatched insured, in signature packaging, with its maison certificate."
      />

      <div className="container-maison pb-28">
        {!ready ? null : cart.length === 0 ? (
          <EmptyState
            title="Your bag is empty"
            body="When you find a piece that stays with you, it will wait here."
            action={<ActionLink to="/jewelry">Explore Jewelry</ActionLink>}
          />
        ) : (
          <div className="grid gap-16 lg:grid-cols-[1.4fr_0.6fr] lg:gap-24">
            <div>
              {cart.map((item) => (
                <Reveal key={item.key}>
                  <article className="grid grid-cols-[7rem_1fr] gap-6 border-t border-border py-8 sm:grid-cols-[9rem_1fr] sm:gap-8">
                    <Link
                      to={`/product/${item.slug}`}
                      className="block overflow-hidden bg-pearl"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-col">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <Link
                            to={`/product/${item.slug}`}
                            className="link-underline font-display text-2xl"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                            {item.config.material} · {item.config.gemstone}
                            {item.config.size ? ` · Size ${item.config.size}` : ""}
                          </p>
                          {item.config.engraving && (
                            <p className="text-xs text-muted-foreground">
                              Engraved “{item.config.engraving}”
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {item.config.packaging}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.key)}
                          aria-label={`Remove ${item.name}`}
                          className="text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <X className="h-4 w-4" strokeWidth={1.25} />
                        </button>
                      </div>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                        <div className="flex items-center border border-foreground/15">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            onClick={() => setQuantity(item.key, item.quantity - 1)}
                            className="flex h-10 w-10 items-center justify-center transition-colors hover:text-gold"
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={1.25} />
                          </button>
                          <span className="label-xs w-8 text-center">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            onClick={() => setQuantity(item.key, item.quantity + 1)}
                            className="flex h-10 w-10 items-center justify-center transition-colors hover:text-gold"
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={1.25} />
                          </button>
                        </div>
                        <p className="font-display text-xl">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <aside className="h-fit border-t border-border pt-8 lg:sticky lg:top-32">
              <h2 className="label-xs text-gold">Summary</h2>
              <dl className="mt-7 flex flex-col gap-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Insured Delivery</dt>
                  <dd>Complimentary</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Duties &amp; Taxes</dt>
                  <dd>Calculated at checkout</dd>
                </div>
              </dl>
              <div className="mt-7 flex justify-between border-t border-border pt-6 font-display text-2xl">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="mt-9 flex flex-col gap-4">
                <ActionLink to="/checkout" className="w-full">
                  Proceed to Checkout
                </ActionLink>
                <ActionLink to="/jewelry" tone="secondary" className="w-full">
                  Continue Exploring
                </ActionLink>
              </div>
              <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
                Complimentary engraving, resizing within the first year and lifetime care are
                included with every L'ORIAN creation.
              </p>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}

export default BagPage;
