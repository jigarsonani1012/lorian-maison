import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { PageHero } from "@/components/site/Catalog";
import { ActionButton, Field, Reveal, SelectField, TextField } from "@/components/site/primitives";
import { BOUTIQUES } from "@/lib/catalog";
import { useStore, track } from "@/lib/store";

const SERVICES = [
  "High Jewelry Salon",
  "Engagement Consultation",
  "Bespoke Commission",
  "Jewelry Care & Repair",
  "Virtual Appointment",
];

const TIMES = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

export function AppointmentsPage() {
  const [searchParams] = useSearchParams();
  const preset = searchParams.get("boutique") ?? undefined;
  const { addAppointment, appointments } = useStore();

  const [service, setService] = useState(SERVICES[0]!);
  const [boutique, setBoutique] = useState(preset ?? BOUTIQUES[0]!.city);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(TIMES[0]!);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next["name"] = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next["email"] = "A valid email is required.";
    if (!date) next["date"] = "Please choose a date.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const appt = addAppointment({ service, boutique, date, time, name });
    track("book_appointment", { service, boutique });
    setConfirmed(appt.reference);
    toast.success("Appointment requested", {
      description: `${appt.reference} · ${boutique}, ${date} at ${time}`,
    });
  };

  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="A private hour"
        intro="Tell us what you would like to see. Your advisor will prepare a selection before you arrive."
      />

      <div className="container-maison grid gap-16 pb-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
        <Reveal>
          {confirmed ? (
            <div className="border border-gold/40 bg-pearl/50 p-10">
              <span className="label-xs text-gold">Requested</span>
              <h2 className="mt-5 font-display text-4xl">Your request is with us</h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Reference {confirmed}. A client advisor from the {boutique} salon will write to{" "}
                {email} within one business day to confirm {date} at {time}.
              </p>
              <div className="mt-9">
                <ActionButton tone="secondary" onClick={() => setConfirmed(null)}>
                  Book Another
                </ActionButton>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-8">
              <SelectField
                label="Service"
                options={SERVICES}
                value={service}
                onChange={(e) => setService(e.target.value)}
              />
              <SelectField
                label="Boutique"
                options={BOUTIQUES.map((b) => b.city)}
                value={boutique}
                onChange={(e) => setBoutique(e.target.value)}
              />
              <div className="grid gap-8 sm:grid-cols-2">
                <Field
                  label="Preferred Date"
                  type="date"
                  value={date}
                  error={errors["date"]}
                  onChange={(e) => setDate(e.target.value)}
                />
                <SelectField
                  label="Preferred Time"
                  options={TIMES}
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
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
              </div>
              <TextField
                label="What would you like to see?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="A particular piece, an occasion, a budget in mind…"
              />
              <div>
                <ActionButton type="submit">Request Appointment</ActionButton>
              </div>
            </form>
          )}
        </Reveal>

        <Reveal delay={120}>
          <aside className="border-t border-border pt-8">
            <h2 className="font-display text-2xl">What to expect</h2>
            <ul className="mt-6 flex flex-col gap-5 text-sm leading-relaxed text-muted-foreground">
              <li>A private salon, reserved for the hour of your visit.</li>
              <li>A selection prepared in advance from your note.</li>
              <li>No obligation, and no photography without your consent.</li>
            </ul>

            {appointments.length > 0 && (
              <div className="mt-12 border-t border-border pt-8">
                <h3 className="label-xs text-gold">Your Appointments</h3>
                <ul className="mt-5 flex flex-col gap-5">
                  {appointments.map((a) => (
                    <li key={a.reference} className="text-sm">
                      <p className="font-display text-lg">{a.service}</p>
                      <p className="text-muted-foreground">
                        {a.boutique} · {a.date} at {a.time}
                      </p>
                      <p className="label-xs mt-1 text-muted-foreground">{a.reference}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </Reveal>
      </div>
    </>
  );
}

export default AppointmentsPage;
