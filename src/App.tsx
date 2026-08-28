import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { NOT_FOUND_META, ROUTE_META, canonicalUrl, normalisePath } from "./content/seo";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Research from "./pages/Research";
import People from "./pages/People";
import Publications from "./pages/Publications";
import Software from "./pages/Software";
import Teaching from "./pages/Teaching";
import Gallery from "./pages/Gallery";
import Opportunities from "./pages/Opportunities";
import News from "./pages/News";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/** Creates the tag on first use, then keeps it pointed at the current route. */
function setMetaTag(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Gives each route its own title, description and canonical URL.
 *
 * The whole site is one HTML file, so a crawler that took the document at face
 * value would see every page sharing a single title. Unknown paths get a title
 * but no canonical, which keeps a mistyped URL from competing with a real page.
 */
function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const known = ROUTE_META[normalisePath(pathname)];
    const meta = known ?? NOT_FOUND_META;
    const url = canonicalUrl(pathname);

    document.title = meta.title;
    setMetaTag("name", "description", meta.description);
    setMetaTag("property", "og:title", meta.title);
    setMetaTag("property", "og:description", meta.description);
    setMetaTag("property", "og:url", url);
    setMetaTag("name", "twitter:title", meta.title);
    setMetaTag("name", "twitter:description", meta.description);
    setCanonical(known ? url : null);
  }, [pathname]);

  return null;
}

/** Route changes should land at the top of the new page, not mid-scroll. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-ink">
      <PageMeta />
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/research" element={<Research />} />
          <Route path="/people" element={<People />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/software" element={<Software />} />
          <Route path="/teaching" element={<Teaching />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
