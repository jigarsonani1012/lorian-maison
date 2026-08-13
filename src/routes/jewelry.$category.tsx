import { useParams, Link } from "react-router-dom";
import { Catalog, PageHero } from "@/components/site/Catalog";
import { Breadcrumbs } from "@/components/site/primitives";
import { CATEGORY_LABELS, type Category } from "@/lib/catalog";

export function JewelryCategoryPage() {
  const { category } = useParams<{ category: string }>();
  const key = category as Category;
  const label = CATEGORY_LABELS[key];

  if (!label) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-center">
        <div>
          <h1 className="font-display text-4xl">Category Not Found</h1>
          <p className="mt-4 text-sm text-muted-foreground">The requested category is unavailable.</p>
          <Link to="/jewelry" className="label-maison mt-8 inline-flex h-12 items-center bg-foreground px-8 text-background">
            Discover All Jewelry
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Jewelry"
        title={label}
        intro={`The maison's ${label.toLowerCase()}, set and finished by hand in Paris.`}
      />
      <div className="container-maison pb-10">
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Jewelry", to: "/jewelry" }, { label }]}
        />
      </div>
      <Catalog initialCategory={key} title={label} />
    </>
  );
}

export default JewelryCategoryPage;
