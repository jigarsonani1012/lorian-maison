import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { formatPrice, type Gemstone, type Material } from "./catalog";

export interface CartConfig {
  material: Material;
  gemstone: Gemstone;
  size?: number | undefined;
  engraving?: string | undefined;
  engravingFont?: string | undefined;
  packaging: string;
}

export interface CartItem {
  key: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  config: CartConfig;
}

export interface Order {
  reference: string;
  date: string;
  items: CartItem[];
  total: number;
  status: string;
  delivery: string;
  recipient: string;
  city: string;
}

export interface Appointment {
  reference: string;
  service: string;
  boutique: string;
  date: string;
  time: string;
  name: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  orders: Order[];
  appointments: Appointment[];
  account: { name: string; email: string } | null;
  currency: string;
  language: string;
  cookieConsent: "accepted" | "essential" | null;
}

const EMPTY: StoreState = {
  cart: [],
  wishlist: [],
  recentlyViewed: [],
  orders: [],
  appointments: [],
  account: null,
  currency: "USD",
  language: "English",
  cookieConsent: null,
};

const KEY = "L'ORIAN.state.v1";

interface StoreApi extends StoreState {
  ready: boolean;
  addToCart: (item: Omit<CartItem, "key" | "quantity">, qty?: number) => void;
  removeFromCart: (key: string) => void;
  setQuantity: (key: string, qty: number) => void;
  updateConfig: (key: string, config: CartConfig) => void;
  clearCart: () => void;
  toggleWishlist: (slug: string) => boolean;
  isWishlisted: (slug: string) => boolean;
  trackView: (slug: string) => void;
  placeOrder: (o: Omit<Order, "reference" | "date" | "status">) => Order;
  addAppointment: (a: Omit<Appointment, "reference">) => Appointment;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  setPreference: (p: Partial<Pick<StoreState, "currency" | "language">>) => void;
  setCookieConsent: (v: "accepted" | "essential") => void;
  cartCount: number;
  subtotal: number;
  bagOpen: boolean;
  setBagOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
}

const StoreContext = createContext<StoreApi | null>(null);

const configKey = (slug: string, c: CartConfig) =>
  [slug, c.material, c.gemstone, c.size ?? "-", c.engraving ?? "-", c.packaging].join("|");

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(EMPTY);
  const [ready, setReady] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setState({ ...EMPTY, ...(JSON.parse(raw) as StoreState) });
    } catch {
      /* ignore corrupted storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state, ready]);

  const addToCart: StoreApi["addToCart"] = useCallback((item, qty = 1) => {
    const key = configKey(item.slug, item.config);
    setState((s) => {
      const existing = s.cart.find((c) => c.key === key);
      const cart = existing
        ? s.cart.map((c) => (c.key === key ? { ...c, quantity: c.quantity + qty } : c))
        : [...s.cart, { ...item, key, quantity: qty }];
      return { ...s, cart };
    });
  }, []);

  const removeFromCart = useCallback((key: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((c) => c.key !== key) }));
  }, []);

  const setQuantity = useCallback((key: string, qty: number) => {
    setState((s) => ({
      ...s,
      cart:
        qty <= 0
          ? s.cart.filter((c) => c.key !== key)
          : s.cart.map((c) => (c.key === key ? { ...c, quantity: Math.min(qty, 9) } : c)),
    }));
  }, []);

  const updateConfig = useCallback((key: string, config: CartConfig) => {
    setState((s) => ({
      ...s,
      cart: s.cart.map((c) =>
        c.key === key ? { ...c, config, key: configKey(c.slug, config) } : c,
      ),
    }));
  }, []);

  const clearCart = useCallback(() => setState((s) => ({ ...s, cart: [] })), []);

  const toggleWishlist = useCallback((slug: string) => {
    let added = false;
    setState((s) => {
      added = !s.wishlist.includes(slug);
      return {
        ...s,
        wishlist: added ? [slug, ...s.wishlist] : s.wishlist.filter((w) => w !== slug),
      };
    });
    return added;
  }, []);

  const trackView = useCallback((slug: string) => {
    setState((s) => ({
      ...s,
      recentlyViewed: [slug, ...s.recentlyViewed.filter((r) => r !== slug)].slice(0, 8),
    }));
  }, []);

  const placeOrder: StoreApi["placeOrder"] = useCallback((o) => {
    const order: Order = {
      ...o,
      reference: `VLR-${Math.floor(100000 + Math.random() * 899999)}`,
      date: new Date().toISOString(),
      status: "Order Confirmed",
    };
    setState((s) => ({ ...s, orders: [order, ...s.orders], cart: [] }));
    return order;
  }, []);

  const addAppointment: StoreApi["addAppointment"] = useCallback((a) => {
    const appt: Appointment = {
      ...a,
      reference: `APT-${Math.floor(10000 + Math.random() * 89999)}`,
    };
    setState((s) => ({ ...s, appointments: [appt, ...s.appointments] }));
    return appt;
  }, []);

  const signIn = useCallback((name: string, email: string) => {
    setState((s) => ({ ...s, account: { name, email } }));
  }, []);

  const signOut = useCallback(() => setState((s) => ({ ...s, account: null })), []);

  const setPreference: StoreApi["setPreference"] = useCallback((p) => {
    setState((s) => ({ ...s, ...p }));
  }, []);

  const setCookieConsent = useCallback((v: "accepted" | "essential") => {
    setState((s) => ({ ...s, cookieConsent: v }));
  }, []);

  const value = useMemo<StoreApi>(() => {
    const cartCount = state.cart.reduce((n, c) => n + c.quantity, 0);
    const subtotal = state.cart.reduce((n, c) => n + c.price * c.quantity, 0);
    return {
      ...state,
      ready,
      addToCart,
      removeFromCart,
      setQuantity,
      updateConfig,
      clearCart,
      toggleWishlist,
      isWishlisted: (slug: string) => state.wishlist.includes(slug),
      trackView,
      placeOrder,
      addAppointment,
      signIn,
      signOut,
      setPreference,
      setCookieConsent,
      cartCount,
      subtotal,
      bagOpen,
      setBagOpen,
      searchOpen,
      setSearchOpen,
    };
  }, [
    state,
    ready,
    addToCart,
    removeFromCart,
    setQuantity,
    updateConfig,
    clearCart,
    toggleWishlist,
    trackView,
    placeOrder,
    addAppointment,
    signIn,
    signOut,
    setPreference,
    setCookieConsent,
    bagOpen,
    searchOpen,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function useFormatPrice() {
  const { currency } = useStore();
  return useCallback((price: number | null) => formatPrice(price, currency), [currency]);
}

/** Lightweight analytics hook — ready to forward to a provider. */
export function track(event: string, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event, ...payload });
}
