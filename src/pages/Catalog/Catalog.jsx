import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useShop } from "../../state/ShopContext";
import { searchBooks } from "../../services/books";
import { categories } from "../../data/catalog";
import ProductCard from "../../components/ProductCard/ProductCard";
import Icon from "../../components/Icon";

const pageInfo = {
  books: [
    "ÖZ HEKAYƏNİ TAP",
    "Kitablar",
    "Bir rəfdən min fərqli dünyaya. Növbəti sevimli kitabını kəşf et.",
  ],
  toys: [
    "OYNA, ÖYRƏN, BÖYÜ",
    "Oyuncaqlar",
    "Kiçik kəşfçilər üçün böyük ideyalar və rəngli macəralar.",
  ],
  bestsellers: [
    "OXUCULARIN SEÇİMİ",
    "Ən çox satılanlar",
    "Rəflərimizin ən çox sevilən, dönə-dönə oxunan kitabları.",
  ],
  discounts: [
    "SEVİMLİLƏRİN DAHA SƏRFƏLİ",
    "Endirimlər",
    "Kitab rəfinə və oyun saatına kiçik bir hədiyyə.",
  ],
  favorites: [
    "SƏNİN KOLLEKSİYAN",
    "Sevimlilər",
    "Bəyəndiyin hekayələr və kiçik sevinclər bir yerdə.",
  ],
};
const fold = (value) =>
  value
    .toLocaleLowerCase("az")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
export default function Catalog({ mode = "books" }) {
  const { books, toys, favorites, apiStatus, rememberBooks } = useShop();
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const category = params.get("category") || "Hamısı";
  const sort = params.get("sort") || "featured";
  const [remote, setRemote] = useState({
    query: "",
    products: [],
    status: "idle",
  });
  const [eyebrow, title, description] = pageInfo[mode];
  useEffect(() => {
    if (mode !== "books" || query.trim().length < 2) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      setRemote({ query, products: [], status: "loading" });
      searchBooks(query.trim(), controller.signal)
        .then((products) => {
          rememberBooks(products);
          setRemote({ query, products, status: "ready" });
        })
        .catch(() => {
          if (!controller.signal.aborted)
            setRemote({ query, products: [], status: "error" });
        });
    }, 450);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, mode, rememberBooks]);
  const base =
    mode === "toys"
      ? toys
      : mode === "discounts"
        ? [...books, ...toys].filter(
            (product) => product.originalPrice > product.price,
          )
        : mode === "bestsellers"
          ? books.filter((product) => product.bestseller)
          : mode === "favorites"
            ? favorites
            : books;
  const matching = base.filter(
    (product) =>
      !query ||
      fold(`${product.title} ${product.author}`).includes(fold(query)),
  );
  const remoteProducts =
    mode === "books" && query === remote.query && remote.status === "ready"
      ? remote.products
      : [];
  let products = [...matching];
  const existingTitles = new Set(
    products.map((product) => fold(product.title)),
  );
  remoteProducts.forEach((product) => {
    if (!existingTitles.has(fold(product.title))) {
      existingTitles.add(fold(product.title));
      products.push(product);
    }
  });
  products = products.filter(
    (product) => category === "Hamısı" || product.category === category,
  );
  if (sort === "price-asc") products.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") products.sort((a, b) => b.price - a.price);
  if (sort === "title") products.sort((a, b) => a.title.localeCompare(b.title));
  const filterCategories =
    mode === "books" || mode === "bestsellers"
      ? categories
      : ["Hamısı", ...new Set(base.map((product) => product.category))];
  const update = (key, value) =>
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (value && value !== "Hamısı" && value !== "featured")
        next.set(key, value);
      else next.delete(key);
      return next;
    });
  return (
    <main id="main-content" className="catalog-page">
      <div className="page-intro">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Ana səhifə</Link>
            <Icon name="chevron" size={13} />
            <span>{title}</span>
          </div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>
            {title}
            <span className="heading-dot">.</span>
          </h1>
          <p>{description}</p>
        </div>
      </div>
      <section className="container catalog-content">
        <div className="catalog-search">
          <Icon name="search" />
          <input
            type="search"
            aria-label="Kolleksiyada axtar"
            placeholder={
              mode === "toys"
                ? "Oyuncaq axtar..."
                : "Kitab, müəllif və ya hekayə axtar..."
            }
            value={query}
            onChange={(event) => update("q", event.target.value)}
          />
        </div>
        <div className="catalog-toolbar">
          <div className="filter-pills" aria-label="Kateqoriyalar">
            {filterCategories.map((name) => (
              <button
                key={name}
                className={category === name ? "active" : ""}
                onClick={() => update("category", name)}
              >
                {name}
              </button>
            ))}
          </div>
          <label className="sort-control">
            <span>Sırala:</span>
            <select
              value={sort}
              onChange={(event) => update("sort", event.target.value)}
              aria-label="Məhsulları sırala"
            >
              <option value="featured">Tövsiyə edilən</option>
              <option value="price-asc">Qiymət: aşağıdan yuxarı</option>
              <option value="price-desc">Qiymət: yuxarıdan aşağı</option>
              <option value="title">Ada görə</option>
            </select>
          </label>
        </div>
        <div className="results-summary">
          <span>
            <strong>{products.length}</strong> məhsul{" "}
            {query ? `· “${query}”` : ""}
          </span>
          <span className="catalog-status" role="status">
            {remote.query === query && remote.status === "loading"
              ? "Kitablar axtarılır…"
              : remote.query === query && remote.status === "error"
                ? "Canlı axtarış əlçatan deyil. Yerli nəticələr göstərilir."
                : mode === "books" && apiStatus === "offline"
                  ? "Seçilmiş kolleksiya göstərilir"
                  : "Sənin növbəti sevimlin burada"}
          </span>
        </div>
        {products.length ? (
          <div className="product-grid catalog-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Icon name={mode === "favorites" ? "heart" : "search"} size={44} />
            <h2>
              {mode === "favorites" && !favorites.length
                ? "Sevimlilərini bir yerə topla"
                : "Axtardığın məhsul tapılmadı"}
            </h2>
            <p>
              {mode === "favorites" && !favorites.length
                ? "Məhsulların üzərindəki ürəyə toxun, sonra burada tap."
                : "Başqa sözlə axtar və ya bütün kateqoriyalara bax."}
            </p>
            {query || category !== "Hamısı" ? (
              <button
                className="button button-primary"
                onClick={() => setParams({})}
              >
                Filtrləri təmizlə
              </button>
            ) : (
              <Link className="button button-primary" to="/books">
                Kitabları kəşf et <Icon name="arrow" size={18} />
              </Link>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

Catalog.propTypes = {
  mode: PropTypes.oneOf([
    "books",
    "toys",
    "bestsellers",
    "discounts",
    "favorites",
  ]),
};
