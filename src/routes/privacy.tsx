import { PageHero } from "@/components/site/Catalog";
import { Reveal } from "@/components/site/primitives";

const SECTIONS = [
  {
    title: "Information we collect",
    body: [
      "When you browse L'ORIAN we store a small amount of information on your device: the contents of your bag, your saved creations, your currency and language preferences, and whether you have responded to the cookie notice.",
      "When you request an appointment or place an order, you provide contact and delivery details. These are used solely to fulfil that request.",
    ],
  },
  {
    title: "How information is used",
    body: [
      "To present the pieces you have saved or configured, to prepare a selection ahead of a boutique appointment, to process and deliver an order, and to write to you about that order.",
      "We do not sell client information. We do not share it with third parties except where strictly necessary to deliver an order or provide a service you have asked for.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "Essential cookies keep your session, bag and preferences working. They cannot be disabled without breaking core functionality.",
      "Analytics cookies help us understand which pages are read and which creations are viewed. You may decline these at any time from the cookie notice.",
    ],
  },
  {
    title: "Retention",
    body: [
      "Order records are retained for the period required by accounting and consumer-protection law. Appointment notes are retained for twenty-four months. Locally stored preferences remain on your device until you clear them.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You may request access to, correction of, or deletion of the information the maison holds about you, and you may object to its processing.",
      "Write to privacy@lorian-maison.com and a member of the client relations team will respond within thirty days.",
    ],
  },
  {
    title: "Discretion",
    body: [
      "The maison does not publish client names, commissions or photographs. What is made for a client belongs to the client.",
    ],
  },
];

export function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy & cookies"
        intro="Last updated 1 March 2026. A short document, because we collect little."
      />

      <div className="container-maison pb-32">
        <div className="mx-auto max-w-2xl">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 60}>
              <section className="border-t border-border py-10">
                <h2 className="font-display text-2xl">{s.title}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-5 text-sm leading-[1.9] text-muted-foreground">
                    {p}
                  </p>
                ))}
              </section>
            </Reveal>
          ))}
          <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
            L'ORIAN Maison operates under high standards of data security and client confidentiality.
          </p>
        </div>
      </div>
    </>
  );
}

export default PrivacyPage;
