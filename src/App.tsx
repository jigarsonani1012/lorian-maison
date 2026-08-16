import { useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { StoreProvider, useStore } from "@/lib/store";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  BagDrawer,
  CookieBanner,
  MaisonCursor,
  PageLoader,
  SearchOverlay,
} from "@/components/site/Overlays";

import Home from "@/routes/index";
import { JewelryPage } from "@/routes/jewelry.index";
import { JewelryCategoryPage } from "@/routes/jewelry.$category";
import { HighJewelryPage } from "@/routes/high-jewelry";
import { CollectionsPage } from "@/routes/collections.index";
import { CollectionPage } from "@/routes/collections.$slug";
import { ProductPage } from "@/routes/product.$slug";
import { EngagementPage } from "@/routes/engagement";
import { WeddingsPage } from "@/routes/weddings";
import { GiftsPage } from "@/routes/gifts";
import { MaisonPage } from "@/routes/maison.index";
import { CraftsmanshipPage } from "@/routes/maison.craftsmanship";
import { JournalPage } from "@/routes/journal.index";
import { ArticlePage } from "@/routes/journal.$slug";
import { BoutiquesPage } from "@/routes/boutiques";
import { AppointmentsPage } from "@/routes/appointments";
import { CarePage } from "@/routes/care";
import { ServicesPage } from "@/routes/services";
import { BespokePage } from "@/routes/bespoke";
import { ResponsibilityPage } from "@/routes/responsibility";
import { CheckoutPage } from "@/routes/checkout";
import { AccountPage } from "@/routes/account";
import { BagPage } from "@/routes/bag";
import { WishlistPage } from "@/routes/wishlist";
import { PrivacyPage } from "@/routes/privacy";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LanguageEffect() {
  const { language } = useStore();

  useEffect(() => {
    const isRtl = language === "العربية";
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang =
      language === "Français"
        ? "fr"
        : language === "Italiano"
          ? "it"
          : language === "日本語"
            ? "ja"
            : language === "العربية"
              ? "ar"
              : "en";
  }, [language]);

  return null;
}

function NotFoundPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5 text-center">
      <div>
        <h1 className="font-display text-[clamp(5rem,18vw,12rem)] leading-none">404</h1>
        <p className="mt-6 font-display text-2xl">Some treasures remain undiscovered.</p>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          The page you are looking for has been moved, renamed, or never existed within the maison.
        </p>
        <Link
          to="/"
          className="label-maison mt-10 inline-flex h-12 items-center bg-foreground px-8 text-background transition-colors hover:bg-gold"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <LanguageEffect />
      <ScrollToTop />
      <PageLoader />
      <MaisonCursor />
      <Header />
      <main id="main" className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jewelry" element={<JewelryPage />} />
          <Route path="/jewelry/:category" element={<JewelryCategoryPage />} />
          <Route path="/high-jewelry" element={<HighJewelryPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:slug" element={<CollectionPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/engagement" element={<EngagementPage />} />
          <Route path="/weddings" element={<WeddingsPage />} />
          <Route path="/gifts" element={<GiftsPage />} />
          <Route path="/maison" element={<MaisonPage />} />
          <Route path="/maison/craftsmanship" element={<CraftsmanshipPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal/:slug" element={<ArticlePage />} />
          <Route path="/boutiques" element={<BoutiquesPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/care" element={<CarePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/bespoke" element={<BespokePage />} />
          <Route path="/responsibility" element={<ResponsibilityPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/bag" element={<BagPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <SearchOverlay />
      <BagDrawer />
      <CookieBanner />
      <Toaster position="bottom-right" />
    </StoreProvider>
  );
}
