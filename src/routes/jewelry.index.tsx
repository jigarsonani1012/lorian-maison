import { Catalog, PageHero } from "@/components/site/Catalog";

export function JewelryPage() {
  return (
    <>
      <PageHero
        eyebrow="The Collection"
        title="All Jewelry"
        intro="Every creation of the maison, from a first Lumière band to the rarest Aurelia stone. Filter by category, collection, material or gemstone."
      />
      <Catalog />
    </>
  );
}

export default JewelryPage;
