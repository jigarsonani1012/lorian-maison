import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "stacked" | "wordmark" | "header";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  iconClassName?: string;
  showSubtitle?: boolean;
  accentGold?: boolean;
}

export function LogoEmblem({
  className,
  accentGold = false,
}: {
  className?: string;
  accentGold?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("aspect-square shrink-0", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ring-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7E6" />
          <stop offset="30%" stopColor="#F5D089" />
          <stop offset="70%" stopColor="#C9983B" />
          <stop offset="100%" stopColor="#8A601B" />
        </linearGradient>
        <linearGradient id="ring-gold-shine" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F8E3B6" />
          <stop offset="90%" stopColor="#A87A2A" />
        </linearGradient>
        <radialGradient id="ring-diamond-sparkle" cx="50%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="50%" stopColor="#F5E0B3" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#DFB76C" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Main Jewelry Ring Band */}
      <circle
        cx="50"
        cy="62"
        r="28"
        stroke={accentGold ? "url(#ring-gold-grad)" : "currentColor"}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <circle
        cx="50"
        cy="62"
        r="23.5"
        stroke={accentGold ? "url(#ring-gold-shine)" : "currentColor"}
        strokeWidth="1.5"
        opacity="0.7"
      />

      {/* Setting Claws */}
      <path
        d="M36 38 L40 24 L44 28 L38 40 Z"
        fill={accentGold ? "url(#ring-gold-grad)" : "currentColor"}
      />
      <path
        d="M64 38 L60 24 L56 28 L62 40 Z"
        fill={accentGold ? "url(#ring-gold-grad)" : "currentColor"}
      />
      <path
        d="M46 38 L48 22 L52 22 L54 38 Z"
        fill={accentGold ? "url(#ring-gold-shine)" : "currentColor"}
      />

      {/* Solitaire Diamond Head */}
      <polygon
        points="34,22 66,22 74,32 26,32"
        stroke={accentGold ? "url(#ring-gold-shine)" : "currentColor"}
        strokeWidth="1.5"
        fill={accentGold ? "url(#ring-gold-shine)" : "currentColor"}
      />
      {/* Table & Crown Facets */}
      <polygon points="40,22 60,22 50,11" fill="#FFFFFF" />
      <line
        x1="40"
        y1="22"
        x2="34"
        y2="32"
        stroke={accentGold ? "url(#ring-gold-grad)" : "currentColor"}
        strokeWidth="1"
      />
      <line
        x1="60"
        y1="22"
        x2="66"
        y2="32"
        stroke={accentGold ? "url(#ring-gold-grad)" : "currentColor"}
        strokeWidth="1"
      />
      <line
        x1="50"
        y1="11"
        x2="50"
        y2="32"
        stroke={accentGold ? "url(#ring-gold-grad)" : "currentColor"}
        strokeWidth="1.2"
      />

      {/* Pavilion Facets & Solitaire Point */}
      <polygon
        points="26,32 74,32 50,56"
        stroke={accentGold ? "url(#ring-gold-grad)" : "currentColor"}
        strokeWidth="1.5"
        fill={accentGold ? "url(#ring-diamond-sparkle)" : "currentColor"}
      />
      <line
        x1="34"
        y1="32"
        x2="50"
        y2="56"
        stroke={accentGold ? "url(#ring-gold-shine)" : "currentColor"}
        strokeWidth="1"
        opacity="0.85"
      />
      <line
        x1="66"
        y1="32"
        x2="50"
        y2="56"
        stroke={accentGold ? "url(#ring-gold-shine)" : "currentColor"}
        strokeWidth="1"
        opacity="0.85"
      />
      <line
        x1="50"
        y1="32"
        x2="50"
        y2="56"
        stroke={accentGold ? "url(#ring-gold-shine)" : "currentColor"}
        strokeWidth="1.5"
      />

      {/* Solitaire Diamond Starburst Glow */}
      <polygon
        points="50,0 52.5,8 60.5,10.5 52.5,13 50,21 47.5,13 39.5,10.5 47.5,8"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function Logo({
  variant = "full",
  size = "md",
  className,
  iconClassName,
  showSubtitle = true,
  accentGold = false,
}: LogoProps) {
  const sizeClasses = {
    sm: { icon: "h-5 w-5 md:h-6 md:w-6", text: "text-base md:text-lg", sub: "text-[0.45rem]" },
    md: { icon: "h-6.5 w-6.5 md:h-8 md:w-8", text: "text-xl md:text-2xl", sub: "text-[0.5rem]" },
    lg: {
      icon: "h-8.5 w-8.5 md:h-11 md:w-11",
      text: "text-2xl md:text-3xl",
      sub: "text-[0.55rem]",
    },
    xl: { icon: "h-12 w-12 md:h-16 md:w-16", text: "text-3xl md:text-5xl", sub: "text-[0.65rem]" },
  }[size];

  if (variant === "icon") {
    return (
      <LogoEmblem
        accentGold={accentGold}
        className={cn(sizeClasses.icon, className, iconClassName)}
      />
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={cn("inline-flex flex-col items-center text-center", className)}>
        <span className={cn("font-display leading-none tracking-[0.42em]", sizeClasses.text)}>
          L'ORIAN
        </span>
        {showSubtitle && (
          <span
            className={cn(
              "mt-1.5 block tracking-[0.36em] text-muted-foreground font-light",
              sizeClasses.sub,
            )}
          >
            MAISON DE HAUTE JOAILLERIE
          </span>
        )}
      </div>
    );
  }

  if (variant === "header") {
    return (
      <div className={cn("inline-flex flex-col items-center text-center group", className)}>
        <div className="flex items-center justify-center gap-2.5">
          <LogoEmblem
            accentGold={accentGold}
            className={cn(
              "h-6.5 w-6.5 transition-transform duration-700 ease-out group-hover:scale-110 md:h-8 md:w-8",
              iconClassName,
            )}
          />
          <span className="font-display text-xl leading-none tracking-[0.42em] md:text-[1.85rem]">
            L'ORIAN
          </span>
        </div>
        {showSubtitle && (
          <span className="mt-1 hidden text-[0.48rem] tracking-[0.36em] text-muted-foreground font-light md:block">
            MAISON DE HAUTE JOAILLERIE
          </span>
        )}
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={cn("inline-flex flex-col items-center text-center group", className)}>
        <LogoEmblem
          accentGold={accentGold}
          className={cn(
            sizeClasses.icon,
            "mb-3 transition-transform duration-700 ease-out group-hover:scale-110",
            iconClassName,
          )}
        />
        <span className={cn("font-display leading-none tracking-[0.42em]", sizeClasses.text)}>
          L'ORIAN
        </span>
        {showSubtitle && (
          <span
            className={cn(
              "mt-1.5 block tracking-[0.36em] text-muted-foreground font-light",
              sizeClasses.sub,
            )}
          >
            MAISON DE HAUTE JOAILLERIE
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-3 md:gap-3.5 group", className)}>
      <LogoEmblem
        accentGold={accentGold}
        className={cn(
          sizeClasses.icon,
          "transition-transform duration-500 ease-out group-hover:scale-105",
          iconClassName,
        )}
      />
      <div className="flex flex-col text-left">
        <span className={cn("font-display leading-none tracking-[0.42em]", sizeClasses.text)}>
          L'ORIAN
        </span>
        {showSubtitle && (
          <span
            className={cn(
              "mt-1 block tracking-[0.32em] text-muted-foreground font-light",
              sizeClasses.sub,
            )}
          >
            MAISON DE HAUTE JOAILLERIE
          </span>
        )}
      </div>
    </div>
  );
}
