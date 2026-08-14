import { useParams, Link } from "react-router-dom";
import { articleBySlug, ARTICLES } from "@/lib/catalog";
import { Breadcrumbs, EditorialLink, Reveal } from "@/components/site/primitives";

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articleBySlug(slug ?? "");

  if (!article) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-center">
        <div>
          <h1 className="font-display text-4xl">Story Not Found</h1>
          <p className="mt-4 text-sm text-muted-foreground">The story you are looking for is unavailable.</p>
          <Link to="/journal" className="label-maison mt-8 inline-flex h-12 items-center bg-foreground px-8 text-background">
            Return to Journal
          </Link>
        </div>
      </div>
    );
  }

  const more = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <div className="container-maison pt-28 md:pt-36">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Journal", to: "/journal" },
            { label: article.title },
          ]}
        />
      </div>

      <article className="container-maison pb-24">
        <header className="mx-auto max-w-3xl pt-12 text-center">
          <span className="label-xs text-gold">{article.category}</span>
          <h1 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.03]">
            {article.title}
          </h1>
          <p className="label-xs mt-8 text-muted-foreground">
            {article.date} · {article.readingTime}
          </p>
        </header>

        <Reveal className="mt-16">
          <div className="img-reveal aspect-[16/9] overflow-hidden bg-pearl">
            <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
          </div>
        </Reveal>

        <div className="mx-auto mt-16 max-w-2xl">
          <p className="font-display text-2xl leading-relaxed text-foreground">{article.excerpt}</p>
          {article.body.map((p, i) => (
            <div key={i}>
              <p className="mt-7 text-base leading-[1.9] text-muted-foreground">{p}</p>
              {i === 1 && (
                <blockquote className="my-14 border-l border-gold pl-8 font-display text-[clamp(1.4rem,2.6vw,2rem)] italic leading-snug">
                  {article.pullQuote}
                </blockquote>
              )}
            </div>
          ))}
          <div className="mt-16 border-t border-border pt-8">
            <EditorialLink to="/journal">Back to the Journal</EditorialLink>
          </div>
        </div>
      </article>

      <section className="border-t border-border bg-pearl/40 py-24">
        <div className="container-maison">
          <h2 className="font-display text-3xl">Continue reading</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {more.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Link
                  to={`/journal/${a.slug}`}
                  className="group block"
                  data-cursor="read"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-pearl">
                    <img
                      src={a.image}
                      alt={a.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                    />
                  </div>
                  <span className="label-xs mt-5 block text-gold">{a.category}</span>
                  <h3 className="mt-3 font-display text-xl leading-snug">{a.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ArticlePage;
