import { Link } from "react-router-dom";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------- scroll reveal ---------- */

export function Reveal({
  children,
  delay = 0,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <As
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </As>
  );
}

/* ---------- typography ---------- */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("label-maison inline-flex items-center gap-3 text-muted-foreground", className)}>
      <span aria-hidden className="h-px w-8 bg-gold" />
      {children}
    </span>
  );
}

export function DisplayHeading({
  children,
  className,
  level = 2,
}: {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3;
}) {
  const Tag = (`h${level}` as const) satisfies "h1" | "h2" | "h3";
  return (
    <Tag
      className={cn(
        level === 1 ? "text-[clamp(3rem,10.5vw,9.5rem)]" : "text-[clamp(2.25rem,5.4vw,4.5rem)]",
        "font-display font-light",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ---------- buttons ---------- */

type ButtonTone = "primary" | "secondary" | "ghost";

const buttonBase =
  "inline-flex h-12 items-center justify-center gap-2 px-8 label-maison transition-all duration-500 disabled:pointer-events-none disabled:opacity-40";

const toneClasses: Record<ButtonTone, string> = {
  primary: "bg-foreground text-background hover:bg-gold hover:text-white",
  secondary: "border border-foreground/25 text-foreground hover:border-gold hover:text-gold",
  ghost: "text-foreground hover:text-gold px-0 h-auto",
};

export function ActionButton({
  tone = "primary",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { tone?: ButtonTone }) {
  return (
    <button className={cn(buttonBase, toneClasses[tone], className)} {...props}>
      {children}
    </button>
  );
}

export function ActionLink({
  to,
  tone = "primary",
  className,
  children,
  ...rest
}: {
  to: string;
  tone?: ButtonTone;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  return (
    <Link to={to} className={cn(buttonBase, toneClasses[tone], className)} {...rest}>
      {children}
    </Link>
  );
}

export function EditorialLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group label-maison inline-flex items-center gap-3 text-foreground transition-colors duration-500 hover:text-gold",
        className,
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight
        aria-hidden
        className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
        strokeWidth={1.25}
      />
    </Link>
  );
}

/* ---------- form fields ---------- */

export function Field({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | undefined;
  hint?: string;
}) {
  const inputId = id ?? label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={inputId} className="label-xs text-muted-foreground">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={cn(
          "h-11 w-full border-0 border-b bg-transparent text-[0.95rem] outline-none transition-colors duration-300",
          "border-foreground/20 focus:border-gold",
          error && "border-destructive",
        )}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextField({
  label,
  error,
  className,
  id,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string | undefined;
}) {
  const inputId = id ?? label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={inputId} className="label-xs text-muted-foreground">
        {label}
      </label>
      <textarea
        id={inputId}
        rows={4}
        aria-invalid={!!error}
        className={cn(
          "w-full resize-none border-0 border-b bg-transparent py-2 text-[0.95rem] outline-none transition-colors duration-300",
          "border-foreground/20 focus:border-gold",
          error && "border-destructive",
        )}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function SelectField({
  label,
  options,
  className,
  id,
  error,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: string[];
  error?: string | undefined;
}) {
  const inputId = id ?? label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={inputId} className="label-xs text-muted-foreground">
        {label}
      </label>
      <select
        id={inputId}
        className={cn(
          "h-11 w-full appearance-none border-0 border-b bg-transparent text-[0.95rem] outline-none transition-colors duration-300",
          "border-foreground/20 focus:border-gold",
          error && "border-destructive",
        )}
        {...props}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

/* ---------- misc ---------- */

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-md py-24 text-center">
      <span aria-hidden className="mx-auto mb-8 block h-10 w-px bg-gold/50" />
      <h2 className="font-display text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p>
      {action && <div className="mt-10 flex justify-center">{action}</div>}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="label-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="opacity-50">/</span>}
            {item.to ? (
              <Link to={item.to} className="link-underline transition-colors hover:text-gold">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <Reveal>
          <Eyebrow className={align === "center" ? "justify-center" : ""}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={80}>
        <DisplayHeading className="mt-6">{title}</DisplayHeading>
      </Reveal>
      {intro && (
        <Reveal delay={160}>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
