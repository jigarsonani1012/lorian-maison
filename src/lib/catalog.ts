import ringImg from "@/assets/prod-ring.jpg";
import necklaceImg from "@/assets/prod-necklace.jpg";
import braceletImg from "@/assets/prod-bracelet.jpg";
import earringsImg from "@/assets/prod-earrings.jpg";
import broochImg from "@/assets/prod-brooch.jpg";
import highJewelryImg from "@/assets/high-jewelry.jpg";
import engagementImg from "@/assets/engagement.jpg";
import campaignImg from "@/assets/campaign.jpg";
import gemstonesImg from "@/assets/gemstones.jpg";
import craftsmanshipImg from "@/assets/craftsmanship.jpg";
import boutiqueImg from "@/assets/boutique.jpg";

export const IMAGES = {
  ring: ringImg,
  necklace: necklaceImg,
  bracelet: braceletImg,
  earrings: earringsImg,
  brooch: broochImg,
  highJewelry: highJewelryImg,
  engagement: engagementImg,
  campaign: campaignImg,
  gemstones: gemstonesImg,
  craftsmanship: craftsmanshipImg,
  boutique: boutiqueImg,
};

export type Category =
  | "rings"
  | "necklaces"
  | "bracelets"
  | "earrings"
  | "brooches"
  | "engagement"
  | "wedding"
  | "high-jewelry";

export type Material = "Yellow Gold" | "Rose Gold" | "White Gold" | "Platinum";
export type Gemstone =
  "Diamond" | "Ruby" | "Emerald" | "Sapphire" | "Pearl" | "Onyx" | "Aquamarine";

export type Availability =
  | "Available"
  | "Limited Availability"
  | "Boutique Exclusive"
  | "Made to Order"
  | "Price Upon Request";

export type CollectionSlug =
  "eternite" | "celestia" | "lumiere" | "nocturne" | "aurelia" | "seraphine";

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: CollectionSlug;
  category: Category;
  description: string;
  story: string;
  price: number | null;
  currency: "USD";
  images: string[];
  material: Material;
  materials: Material[];
  gemstone: Gemstone;
  gemstones: Gemstone[];
  carat: number;
  reference: string;
  sizes: number[];
  availability: Availability;
  featured: boolean;
  isNew: boolean;
  exclusive: boolean;
  popularity: number;
  createdAt: string;
}

export interface Collection {
  slug: CollectionSlug;
  name: string;
  tagline: string;
  intro: string;
  story: string;
  image: string;
  dark: boolean;
  year: string;
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "eternite",
    name: "Éternité",
    tagline: "The unbroken line",
    intro:
      "A continuous circle of brilliant-cut diamonds, set without visible interruption — the maison's meditation on permanence.",
    story:
      "Éternité began in the L'ORIAN atelier as a technical obsession: how to set a line of stones so precisely that the metal all but disappears. Nine prototypes and four years later, the setters arrived at the invisible rail that now defines the collection. Every piece is calibrated stone by stone, so light travels the entire circumference without pause.",
    image: braceletImg,
    dark: false,
    year: "1924",
  },
  {
    slug: "celestia",
    name: "Celestia",
    tagline: "Charted by light",
    intro:
      "Constellations rendered in diamond and platinum, drawn from the night sky above the maison's first atelier.",
    story:
      "In 1957 a royal commission asked L'ORIAN to capture a particular evening sky. The resulting necklace — sixty-two diamonds positioned to the exact coordinates of that night — became Celestia. The collection still follows the same discipline: no ornament is placed for decoration alone; each stone marks a point that once existed in the heavens.",
    image: necklaceImg,
    dark: false,
    year: "1957",
  },
  {
    slug: "lumiere",
    name: "Lumière",
    tagline: "The first hour of day",
    intro:
      "Warm yellow gold and champagne diamonds, polished to hold the particular light of early morning.",
    story:
      "Lumière is the maison's warmest expression. Its surfaces are finished by hand with a satin brush that scatters light rather than reflecting it, giving the gold the softness of dawn on stone. The collection is deliberately wearable — jewellery made for daylight, for hands that work and gesture.",
    image: ringImg,
    dark: false,
    year: "1986",
  },
  {
    slug: "nocturne",
    name: "Nocturne",
    tagline: "Composed in darkness",
    intro:
      "Onyx, blackened gold and white diamond — the maison's most architectural and most dramatic collection.",
    story:
      "Nocturne inverts the maison's own conventions. Metal is oxidised to near-black, stones are set deep, and brilliance is rationed. The effect is not absence but concentration: a single diamond against onyx reads brighter than a hundred against ivory. It is the collection L'ORIAN reserves for evening.",
    image: highJewelryImg,
    dark: true,
    year: "2004",
  },
  {
    slug: "aurelia",
    name: "Aurelia",
    tagline: "Rare colour, rarely found",
    intro:
      "Exceptional coloured stones — Burmese ruby, Colombian emerald, Kashmir sapphire — chosen one at a time.",
    story:
      "Aurelia is not designed; it is discovered. The maison's gemmologists travel to source, and a piece begins only once a stone of sufficient character has been secured. Because provenance dictates production, no two Aurelia creations are alike, and most exist as a single example.",
    image: gemstonesImg,
    dark: true,
    year: "1898",
  },
  {
    slug: "seraphine",
    name: "Seraphine",
    tagline: "Held in the hand",
    intro: "Pearl, aquamarine and rose gold in the maison's softest, most romantic register.",
    story:
      "Named for the maison's founding atelier on rue Séraphine, this collection returns to the earliest L'ORIAN vocabulary: rounded volumes, warm metal, stones with light inside rather than upon them. Seraphine pieces are traditionally given to mark a beginning.",
    image: earringsImg,
    dark: false,
    year: "1898",
  },
];

export const collectionBySlug = (slug: string) => COLLECTIONS.find((c) => c.slug === slug);

export const CATEGORY_LABELS: Record<Category, string> = {
  rings: "Rings",
  necklaces: "Necklaces",
  bracelets: "Bracelets",
  earrings: "Earrings",
  brooches: "Brooches",
  engagement: "Engagement",
  wedding: "Wedding",
  "high-jewelry": "High Jewelry",
};

export const MATERIALS: Material[] = ["Yellow Gold", "Rose Gold", "White Gold", "Platinum"];

export const GEMSTONES: Gemstone[] = [
  "Diamond",
  "Ruby",
  "Emerald",
  "Sapphire",
  "Pearl",
  "Onyx",
  "Aquamarine",
];

const RING_SIZES = Array.from({ length: 17 }, (_, i) => 44 + i);

const CATEGORY_IMAGE: Record<Category, string> = {
  rings: ringImg,
  necklaces: necklaceImg,
  bracelets: braceletImg,
  earrings: earringsImg,
  brooches: broochImg,
  engagement: ringImg,
  wedding: braceletImg,
  "high-jewelry": highJewelryImg,
};

const SECONDARY_IMAGE: Record<Category, string> = {
  rings: engagementImg,
  necklaces: campaignImg,
  bracelets: craftsmanshipImg,
  earrings: campaignImg,
  brooches: gemstonesImg,
  engagement: engagementImg,
  wedding: engagementImg,
  "high-jewelry": gemstonesImg,
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type Seed = [
  name: string,
  collection: CollectionSlug,
  category: Category,
  material: Material,
  gemstone: Gemstone,
  price: number | null,
  carat: number,
  availability: Availability,
];

const SEEDS: Seed[] = [
  // Éternité
  [
    "Éternité Line Bracelet",
    "eternite",
    "bracelets",
    "White Gold",
    "Diamond",
    12400,
    4.2,
    "Available",
  ],
  ["Éternité Eternity Band", "eternite", "rings", "Platinum", "Diamond", 6800, 1.6, "Available"],
  ["Éternité Slim Band", "eternite", "wedding", "Yellow Gold", "Diamond", 3250, 0.5, "Available"],
  [
    "Éternité Rivière Necklace",
    "eternite",
    "necklaces",
    "White Gold",
    "Diamond",
    24800,
    7.8,
    "Limited Availability",
  ],
  [
    "Éternité Hoop Earrings",
    "eternite",
    "earrings",
    "White Gold",
    "Diamond",
    5400,
    1.1,
    "Available",
  ],
  ["Éternité Double Band", "eternite", "rings", "Rose Gold", "Diamond", 4900, 0.9, "Available"],
  ["Éternité Cuff", "eternite", "bracelets", "Platinum", "Diamond", 18600, 5.4, "Made to Order"],
  [
    "Éternité Solitaire",
    "eternite",
    "engagement",
    "Platinum",
    "Diamond",
    14200,
    1.5,
    "Made to Order",
  ],

  // Celestia
  [
    "Celestia Diamond Ring",
    "celestia",
    "rings",
    "Platinum",
    "Diamond",
    15800,
    2.1,
    "Limited Availability",
  ],
  [
    "Celestia Constellation Necklace",
    "celestia",
    "necklaces",
    "White Gold",
    "Diamond",
    21600,
    5.2,
    "Available",
  ],
  [
    "Celestia Drop Earrings",
    "celestia",
    "earrings",
    "White Gold",
    "Diamond",
    9800,
    2.4,
    "Available",
  ],
  ["Celestia Pendant", "celestia", "necklaces", "White Gold", "Diamond", 4200, 0.7, "Available"],
  [
    "Celestia Star Brooch",
    "celestia",
    "brooches",
    "Platinum",
    "Diamond",
    11400,
    3.1,
    "Boutique Exclusive",
  ],
  [
    "Celestia Solitaire Ring",
    "celestia",
    "engagement",
    "Platinum",
    "Diamond",
    18900,
    2.4,
    "Made to Order",
  ],
  [
    "Celestia Meridian Bracelet",
    "celestia",
    "bracelets",
    "White Gold",
    "Sapphire",
    13600,
    3.6,
    "Available",
  ],
  ["Celestia Orbit Band", "celestia", "wedding", "Platinum", "Diamond", 4600, 0.6, "Available"],
  [
    "Celestia Nebula Necklace",
    "celestia",
    "high-jewelry",
    "Platinum",
    "Diamond",
    null,
    24.6,
    "Price Upon Request",
  ],

  // Lumière
  ["Lumière Signet Ring", "lumiere", "rings", "Yellow Gold", "Diamond", 3400, 0.3, "Available"],
  [
    "Lumière Chain Necklace",
    "lumiere",
    "necklaces",
    "Yellow Gold",
    "Diamond",
    2900,
    0.2,
    "Available",
  ],
  ["Lumière Bangle", "lumiere", "bracelets", "Yellow Gold", "Diamond", 5600, 1.0, "Available"],
  ["Lumière Ear Studs", "lumiere", "earrings", "Yellow Gold", "Diamond", 1850, 0.4, "Available"],
  ["Lumière Dawn Ring", "lumiere", "rings", "Rose Gold", "Aquamarine", 4100, 2.2, "Available"],
  [
    "Lumière Ribbon Brooch",
    "lumiere",
    "brooches",
    "Yellow Gold",
    "Diamond",
    6900,
    1.4,
    "Limited Availability",
  ],
  ["Lumière Wedding Band", "lumiere", "wedding", "Yellow Gold", "Diamond", 1980, 0.1, "Available"],
  [
    "Lumière Cascade Earrings",
    "lumiere",
    "earrings",
    "Rose Gold",
    "Diamond",
    7400,
    1.9,
    "Available",
  ],
  [
    "Lumière Halo Ring",
    "lumiere",
    "engagement",
    "Rose Gold",
    "Diamond",
    9600,
    1.2,
    "Made to Order",
  ],

  // Nocturne
  ["Nocturne Onyx Ring", "nocturne", "rings", "White Gold", "Onyx", 4700, 3.4, "Available"],
  [
    "Nocturne Collar Necklace",
    "nocturne",
    "necklaces",
    "White Gold",
    "Onyx",
    16800,
    6.1,
    "Limited Availability",
  ],
  ["Nocturne Ear Cuffs", "nocturne", "earrings", "White Gold", "Onyx", 6200, 1.7, "Available"],
  [
    "Nocturne Panel Bracelet",
    "nocturne",
    "bracelets",
    "White Gold",
    "Diamond",
    14900,
    4.4,
    "Boutique Exclusive",
  ],
  [
    "Nocturne Obsidian Brooch",
    "nocturne",
    "brooches",
    "White Gold",
    "Onyx",
    8800,
    2.8,
    "Limited Availability",
  ],
  ["Nocturne Eclipse Ring", "nocturne", "rings", "Platinum", "Diamond", 12800, 2.0, "Available"],
  [
    "Nocturne Midnight Parure",
    "nocturne",
    "high-jewelry",
    "Platinum",
    "Diamond",
    null,
    38.4,
    "Price Upon Request",
  ],
  ["Nocturne Shadow Band", "nocturne", "wedding", "White Gold", "Onyx", 2400, 0.2, "Available"],

  // Aurelia
  [
    "Aurelia Ruby Ring",
    "aurelia",
    "rings",
    "Yellow Gold",
    "Ruby",
    28400,
    4.8,
    "Limited Availability",
  ],
  [
    "Aurelia Emerald Necklace",
    "aurelia",
    "necklaces",
    "Yellow Gold",
    "Emerald",
    null,
    18.2,
    "Price Upon Request",
  ],
  [
    "Aurelia Sapphire Earrings",
    "aurelia",
    "earrings",
    "Platinum",
    "Sapphire",
    22600,
    6.4,
    "Boutique Exclusive",
  ],
  [
    "Aurelia Emerald Cuff",
    "aurelia",
    "high-jewelry",
    "Yellow Gold",
    "Emerald",
    null,
    42.1,
    "Price Upon Request",
  ],
  ["Aurelia Ruby Pendant", "aurelia", "necklaces", "Rose Gold", "Ruby", 13900, 3.2, "Available"],
  [
    "Aurelia Sapphire Solitaire",
    "aurelia",
    "engagement",
    "Platinum",
    "Sapphire",
    19400,
    3.0,
    "Made to Order",
  ],
  [
    "Aurelia Colour Brooch",
    "aurelia",
    "brooches",
    "Yellow Gold",
    "Emerald",
    15600,
    5.0,
    "Limited Availability",
  ],
  [
    "Aurelia Rare Stone Ring",
    "aurelia",
    "high-jewelry",
    "Platinum",
    "Ruby",
    null,
    12.7,
    "Price Upon Request",
  ],

  // Seraphine
  [
    "Seraphine Pearl Necklace",
    "seraphine",
    "necklaces",
    "Rose Gold",
    "Pearl",
    6400,
    0.4,
    "Available",
  ],
  ["Seraphine Pearl Studs", "seraphine", "earrings", "Rose Gold", "Pearl", 1450, 0.1, "Available"],
  [
    "Seraphine Aquamarine Ring",
    "seraphine",
    "rings",
    "Rose Gold",
    "Aquamarine",
    5200,
    3.6,
    "Available",
  ],
  [
    "Seraphine Petal Bracelet",
    "seraphine",
    "bracelets",
    "Rose Gold",
    "Pearl",
    3800,
    0.3,
    "Available",
  ],
  ["Seraphine Bridal Band", "seraphine", "wedding", "Rose Gold", "Diamond", 2650, 0.3, "Available"],
  [
    "Seraphine Promise Ring",
    "seraphine",
    "engagement",
    "Rose Gold",
    "Diamond",
    7900,
    1.0,
    "Available",
  ],
  [
    "Seraphine Aquamarine Drops",
    "seraphine",
    "earrings",
    "White Gold",
    "Aquamarine",
    4600,
    4.1,
    "Available",
  ],
  [
    "Seraphine Pearl Brooch",
    "seraphine",
    "brooches",
    "Yellow Gold",
    "Pearl",
    3200,
    0.2,
    "Limited Availability",
  ],
  [
    "Seraphine Camellia Necklace",
    "seraphine",
    "necklaces",
    "Rose Gold",
    "Diamond",
    8700,
    1.8,
    "Available",
  ],
];

const describe = (s: Seed) => {
  const [name, collection, category, material, gemstone, , carat] = s;
  const col = COLLECTIONS.find((c) => c.slug === collection)!;
  const object = CATEGORY_LABELS[category].toLowerCase().replace(/s$/, "");
  return `A ${object} from the ${col.name} collection, worked in ${material.toLowerCase()} and set with ${carat} carats of ${gemstone.toLowerCase()}. ${col.tagline} — expressed here at the scale of the hand. Each piece is finished, set and inspected within the L'ORIAN atelier before it carries the maison's mark.`;
};

export const PRODUCTS: Product[] = SEEDS.map((seed, i) => {
  const [name, collection, category, material, gemstone, price, carat, availability] = seed;
  const slug = slugify(name);
  const isHigh = category === "high-jewelry";
  return {
    id: `VLR-${String(1000 + i)}`,
    slug,
    name,
    collection,
    category,
    description: describe(seed),
    story: COLLECTIONS.find((c) => c.slug === collection)!.story,
    price,
    currency: "USD" as const,
    images: [
      CATEGORY_IMAGE[category],
      SECONDARY_IMAGE[category],
      IMAGES.craftsmanship,
      IMAGES.campaign,
      IMAGES.boutique,
    ],
    material,
    materials: isHigh ? [material] : MATERIALS,
    gemstone,
    gemstones:
      gemstone === "Diamond"
        ? (["Diamond", "Ruby", "Emerald", "Sapphire"] as Gemstone[])
        : [gemstone],
    carat,
    reference: `REF. ${String(84210 + i * 7)}`,
    sizes:
      category === "rings" || category === "engagement" || category === "wedding" ? RING_SIZES : [],
    availability,
    featured: i % 7 === 0,
    isNew: i % 5 === 0,
    exclusive: availability === "Boutique Exclusive" || availability === "Price Upon Request",
    popularity: ((i * 37) % 100) + 1,
    createdAt: new Date(2026, 0, 1 - i * 5).toISOString(),
  };
});

export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

import { formatPriceWithCurrency } from "./i18n";

export const formatPrice = (price: number | null, currency = "USD") =>
  formatPriceWithCurrency(price, currency);

export const searchAll = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return { products: [] as Product[], collections: [] as Collection[] };
  const products = PRODUCTS.filter((p) =>
    [p.name, p.collection, CATEGORY_LABELS[p.category], p.material, p.gemstone, p.description]
      .join(" ")
      .toLowerCase()
      .includes(q),
  ).slice(0, 12);
  const collections = COLLECTIONS.filter((c) =>
    `${c.name} ${c.tagline} ${c.intro}`.toLowerCase().includes(q),
  );
  return { products, collections };
};

export const recommendFor = (product: Product, count = 4) =>
  PRODUCTS.filter((p) => p.slug !== product.slug)
    .map((p) => ({
      p,
      score:
        (p.collection === product.collection ? 3 : 0) +
        (p.category === product.category ? 2 : 0) +
        (p.gemstone === product.gemstone ? 1 : 0) +
        (p.material === product.material ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score || b.p.popularity - a.p.popularity)
    .slice(0, count)
    .map((x) => x.p);

/* ---------------- editorial content ---------------- */

export interface Article {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readingTime: string;
  image: string;
  body: string[];
  pullQuote: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "the-language-of-light",
    title: "The Language of Light",
    category: "Craftsmanship",
    excerpt:
      "Inside the setting workshop, where a difference of two hundredths of a millimetre decides whether a diamond speaks or stays silent.",
    date: "12 March 2026",
    readingTime: "6 minutes",
    image: craftsmanshipImg,
    pullQuote:
      "A stone does not shine because it is beautiful. It shines because someone decided, precisely, where it should sit.",
    body: [
      "The setting workshop occupies the quietest room in the L'ORIAN atelier. There are no machines here beyond a lathe and a row of microscopes, and the loudest sound on most mornings is the tap of a graver against a bench pin.",
      "Setting is the last irreversible act in the making of a jewel. Once a claw is closed over a stone, the geometry is fixed; the light that will leave the piece for the next hundred years has already been decided. Our setters speak of the work as listening rather than making — turning the stone a fraction, watching the table, turning again.",
      "The tolerance we work to is two hundredths of a millimetre. Below that, the eye cannot resolve the difference. Above it, the eye may not name the fault but will register something unresolved, a small hesitation in the brilliance.",
      "It is a discipline learned slowly. A L'ORIAN setter completes seven years of training before touching a client's commission, and the first three of those years are spent on brass.",
    ],
  },
  {
    slug: "a-stone-from-mogok",
    title: "A Stone From Mogok",
    category: "Gemstones",
    excerpt:
      "The four-year search behind a single Burmese ruby, and why the maison waits rather than compromises.",
    date: "28 February 2026",
    readingTime: "5 minutes",
    image: gemstonesImg,
    pullQuote:
      "We do not design and then find the stone. We find the stone and then permit ourselves to design.",
    body: [
      "Rubies of true pigeon's-blood colour are among the rarest materials the maison works with. Fewer than a handful of untreated examples above five carats reach the market in a given year, and each is contested.",
      "Our gemmologists spend more time declining stones than acquiring them. Colour is only the beginning: saturation must hold under both daylight and candlelight, and the fluorescence that gives a Mogok ruby its inner glow must be present without tipping into pink.",
      "The Aurelia ruby that anchors this season's high jewellery took four years to secure. It was seen first in 2022, lost to another house, and recovered at auction three years later.",
      "This is why an Aurelia piece cannot be reordered. The design exists because the stone does.",
    ],
  },
  {
    slug: "the-architecture-of-nocturne",
    title: "The Architecture of Nocturne",
    category: "Collections",
    excerpt:
      "How the maison learned to ration brilliance — and made its darkest collection its most luminous.",
    date: "9 February 2026",
    readingTime: "7 minutes",
    image: highJewelryImg,
    pullQuote: "Restraint is not the absence of light. It is the editing of it.",
    body: [
      "Nocturne began with a refusal. The design studio was asked to produce an evening collection and returned, instead, with a proposal to remove ninety per cent of the stones normally specified for such a commission.",
      "The argument was simple. Against oxidised gold and onyx, a single well-placed diamond reads with more force than a pavé field. Contrast does the work that quantity usually attempts.",
      "Structurally, the collection borrows from architecture rather than nature — the flat planes, the deep-set stones, the hard shadow line where two surfaces meet at ninety degrees.",
      "Twenty years on, Nocturne remains the collection our clients return to when they want to be noticed without announcing themselves.",
    ],
  },
  {
    slug: "notes-on-a-commission",
    title: "Notes On a Commission",
    category: "Stories",
    excerpt:
      "Eleven months, four drawings and one changed mind: the making of a bespoke L'ORIAN piece, told through the atelier's notebooks.",
    date: "21 January 2026",
    readingTime: "8 minutes",
    image: campaignImg,
    pullQuote: "The client changed her mind in month six. She was right to.",
    body: [
      "Every bespoke commission at L'ORIAN begins with a conversation that has nothing to do with jewellery. We ask about the occasion, the hand, the way a person dresses on an ordinary Tuesday.",
      "The first drawing is deliberately imperfect. It exists to be argued with. In this commission, the client's response to drawing one — that the piece was too ceremonial — reshaped everything that followed.",
      "By month six, the emerald at the centre had been replaced by a smaller stone of finer colour, and the setting had lost two thirds of its mass. The piece became quieter, and better.",
      "It was delivered in month eleven, in a boutique in Geneva, in the late afternoon. The maison keeps a photograph of the drawing, not of the jewel.",
    ],
  },
  {
    slug: "the-ivory-room",
    title: "The Ivory Room",
    category: "Culture",
    excerpt:
      "On the design of the maison's boutiques, and why the most important object in the room is the light.",
    date: "5 January 2026",
    readingTime: "4 minutes",
    image: boutiqueImg,
    pullQuote: "A boutique is a room that must make a small object feel inevitable.",
    body: [
      "L'ORIAN boutiques are designed around a single measurement: the distance between a seated client's eye and the surface of a vitrine.",
      "Everything else follows. Ceiling height, the warmth of the lamps, the depth of the stone counters — each is calibrated so that a jewel presented on a tray is seen at its truest.",
      "The palette is deliberately restricted to warm ivory, brass and a single dark accent, because colour in the room competes with colour in the stone.",
      "There is no music. There is, in each boutique, one chair positioned so that a client may sit alone with a piece for as long as they need.",
    ],
  },
  {
    slug: "an-evening-in-the-vaults",
    title: "An Evening in the Vaults",
    category: "Events",
    excerpt:
      "The maison opened its archive for one night. Three hundred pieces, one hundred guests, no photographs.",
    date: "14 December 2025",
    readingTime: "5 minutes",
    image: boutiqueImg,
    pullQuote: "The archive is not a museum. It is a working library.",
    body: [
      "Once each year the maison opens its archive to clients and to the students of the atelier's apprenticeship programme.",
      "Three hundred pieces are brought up from the vault and laid out chronologically, from the 1898 founding brooch to the current season's high jewellery.",
      "The purpose is instructional. Apprentices are permitted to handle work from every decade, to feel how the maison's hand has changed and where it has not.",
      "No photography is permitted. What is remembered is what was worth remembering.",
    ],
  },
];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);

export interface Boutique {
  slug: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
}

export const BOUTIQUES: Boutique[] = [
  {
    slug: "paris",
    city: "Paris",
    country: "France",
    address: "18 Rue Séraphine, 75001 Paris",
    phone: "+33 1 42 60 00 18",
    hours: "Monday – Saturday, 10:00 – 19:00",
    services: ["High Jewelry Salon", "Bespoke Atelier", "Jewelry Care", "Private Viewing"],
  },
  {
    slug: "new-york",
    city: "New York",
    country: "United States",
    address: "744 Fifth Avenue, New York, NY 10019",
    phone: "+1 212 555 0188",
    hours: "Monday – Saturday, 10:00 – 18:30",
    services: ["High Jewelry Salon", "Engagement Consultation", "Jewelry Care"],
  },
  {
    slug: "london",
    city: "London",
    country: "United Kingdom",
    address: "31 Old Bond Street, London W1S 4QH",
    phone: "+44 20 7629 0031",
    hours: "Monday – Saturday, 10:00 – 18:00",
    services: ["Bespoke Atelier", "Engagement Consultation", "Private Viewing"],
  },
  {
    slug: "geneva",
    city: "Geneva",
    country: "Switzerland",
    address: "Rue du Rhône 62, 1204 Genève",
    phone: "+41 22 555 0062",
    hours: "Monday – Friday, 10:00 – 18:30",
    services: ["High Jewelry Salon", "Jewelry Care", "Private Viewing"],
  },
  {
    slug: "tokyo",
    city: "Tokyo",
    country: "Japan",
    address: "Ginza 4-5-6, Chuo-ku, Tokyo 104-0061",
    phone: "+81 3 5555 0456",
    hours: "Daily, 11:00 – 19:30",
    services: ["Engagement Consultation", "Jewelry Care", "Virtual Appointment"],
  },
  {
    slug: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    address: "Fashion Avenue, The Dubai Mall, Dubai",
    phone: "+971 4 555 0122",
    hours: "Daily, 10:00 – 22:00",
    services: ["High Jewelry Salon", "Private Viewing", "Bespoke Atelier"],
  },
];

export const boutiqueBySlug = (slug: string) => BOUTIQUES.find((b) => b.slug === slug);

export const HERITAGE = [
  {
    year: "1898",
    title: "The Maison Is Founded",
    text: "Élise L'ORIAN opens a single-room atelier on rue Séraphine, Paris, working alone on commissions for a small circle of collectors.",
  },
  {
    year: "1924",
    title: "Éternité",
    text: "The invisible rail setting is perfected after four years of prototypes, giving the maison its first signature collection.",
  },
  {
    year: "1957",
    title: "A Royal Commission",
    text: "A sixty-two diamond necklace mapping a single night sky is delivered to a European court. It becomes Celestia.",
  },
  {
    year: "1986",
    title: "Beyond Paris",
    text: "Boutiques open in New York, London and Geneva. The Lumière collection is introduced for daylight wear.",
  },
  {
    year: "2004",
    title: "Nocturne",
    text: "The maison's most architectural collection inverts its own conventions: oxidised gold, onyx and rationed brilliance.",
  },
  {
    year: "2026",
    title: "A New Era",
    text: "The high jewellery chapter Where Eternity Takes Form opens, alongside a fully traceable sourcing programme.",
  },
];

export const CRAFT_STEPS = [
  {
    n: "01",
    title: "Concept",
    text: "A conversation, a occasion, a hand. Nothing is drawn until the intention is understood.",
  },
  {
    n: "02",
    title: "Sketch",
    text: "Gouache on grey paper, at actual size. The maison still draws before it models.",
  },
  {
    n: "03",
    title: "Stone Selection",
    text: "Every stone is chosen individually and matched for colour, saturation and behaviour under light.",
  },
  {
    n: "04",
    title: "Model",
    text: "A wax and metal prototype is made and worn, so that weight and balance can be judged on the body.",
  },
  {
    n: "05",
    title: "Setting",
    text: "The irreversible act. Tolerances of two hundredths of a millimetre decide the final brilliance.",
  },
  {
    n: "06",
    title: "Polishing",
    text: "Finished by hand across nine grades, from coarse abrasive to rouge on cotton.",
  },
  {
    n: "07",
    title: "Inspection",
    text: "Reviewed under three light temperatures by a master who did not make the piece.",
  },
  {
    n: "08",
    title: "The Finished Jewel",
    text: "Numbered, registered in the maison archive and delivered in signature packaging.",
  },
];

export const DIAMOND_EDUCATION = [
  {
    letter: "Cut",
    title: "Cut",
    text: "Cut governs how light enters, travels and returns. L'ORIAN specifies Excellent cut grades exclusively — proportion outweighs size in every case.",
    detail: "Excellent · Very Good · Good",
  },
  {
    letter: "Colour",
    title: "Colour",
    text: "Measured from D, entirely colourless, downward. The maison works within D to G, where the absence of colour is invisible to the unaided eye.",
    detail: "D · E · F · G",
  },
  {
    letter: "Clarity",
    title: "Clarity",
    text: "The presence of internal characteristics. L'ORIAN sets nothing below VS2, and nothing with an inclusion visible at ten times magnification in the table.",
    detail: "FL · IF · VVS1–2 · VS1–2",
  },
  {
    letter: "Carat",
    title: "Carat",
    text: "Weight, not size. Two stones of identical carat can read very differently depending on cut proportions and the setting that carries them.",
    detail: "0.30 – 12.00 ct",
  },
];
