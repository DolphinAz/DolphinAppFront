import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useShop } from "../../state/ShopContext";
import { BOOKS_PAGE_SIZE, loadBookPage } from "../../services/books";
import { categories } from "../../data/catalog";
import ProductCard from "../../components/ProductCard/ProductCard";
import Icon from "../../components/Icon";
import Pagination from "../../components/Pagination";

const pageInfo = {
  books: "Kitablar",
  toys: "Oyuncaqlar",
  bestsellers: "Ən çox satılanlar",
  discounts: "Endirimlər",
  favorites: "Sevimlilər",
};
const fold = (value) =>
  value
    .toLocaleLowerCase("az")
    .replace(/\u00e4/g, "ə")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
export default function Catalog({ mode = "books" }) {
  const { books, discoveredBooks, toys, favorites, rememberBooks } = useShop();
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const category = params.get("category") || "Hamısı";
  const requestedSort = params.get("sort") || "featured";
  const sort =
    mode === "books" &&
    !["featured", "title", "new", "old"].includes(requestedSort)
      ? "featured"
      : requestedSort;
  const requestedPage = Number(params.get("page"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;
  const requestKey = JSON.stringify([query.trim(), category, sort, page]);
  const [retry, setRetry] = useState(0);
  const [remote, setRemote] = useState({
    key: "",
    products: [],
    total: 0,
    status: "idle",
  });
  const title = pageInfo[mode];
  useEffect(() => {
    if (mode !== "books") return;
    const controller = new AbortController();
    const timer = setTimeout(
      () => {
        setRemote({
          key: requestKey,
          products: [],
          total: 0,
          status: "loading",
        });
        loadBookPage({ query, category, sort, page }, controller.signal)
          .then((result) => {
            if (controller.signal.aborted) return;
            rememberBooks(result.products);
            setRemote({ ...result, key: requestKey, status: "ready" });
          })
          .catch(() => {
            if (!controller.signal.aborted)
              setRemote({
                key: requestKey,
                products: [],
                total: 0,
                status: "error",
              });
          });
      },
      query.trim() ? 400 : 0,
    );
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, category, sort, page, mode, requestKey, rememberBooks, retry]);
  const isLoading =
    mode === "books" &&
    (remote.key !== requestKey || ["idle", "loading"].includes(remote.status));
  const isLive =
    mode === "books" && remote.key === requestKey && remote.status === "ready";
  const isOffline =
    mode === "books" && remote.key === requestKey && remote.status === "error";
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
            : [
                ...new Map(
                  [...books, ...discoveredBooks].map((product) => [
                    product.id,
                    product,
                  ]),
                ).values(),
              ];
  const matching = base.filter(
    (product) =>
      !query ||
      fold(`${product.title} ${product.author}`).includes(fold(query)),
  );
  const localProducts = matching.filter(
    (product) => category === "Hamısı" || product.category === category,
  );
  if (sort === "price-asc") localProducts.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") localProducts.sort((a, b) => b.price - a.price);
  if (sort === "title")
    localProducts.sort((a, b) => a.title.localeCompare(b.title, "az"));
  if (sort === "new")
    localProducts.sort((a, b) => (b.year || 0) - (a.year || 0));
  if (sort === "old")
    localProducts.sort((a, b) => (a.year || Infinity) - (b.year || Infinity));
  const total = isLive ? remote.total : localProducts.length;
  const totalPages = Math.max(1, Math.ceil(total / BOOKS_PAGE_SIZE));
  const products = isLive
    ? remote.products
    : localProducts.slice((page - 1) * BOOKS_PAGE_SIZE, page * BOOKS_PAGE_SIZE);
  useEffect(() => {
    if (isLoading || page <= totalPages) return;
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (totalPages === 1) next.delete("page");
        else next.set("page", String(totalPages));
        return next;
      },
      { replace: true },
    );
  }, [isLoading, page, totalPages, setParams]);
  const filterCategories =
    mode === "books" || mode === "bestsellers"
      ? categories
      : ["Hamısı", ...new Set(base.map((product) => product.category))];
  const update = (key, value) =>
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (key !== "page") next.delete("page");
      if (value && value !== "Hamısı" && value !== "featured")
        next.set(key, value);
      else next.delete(key);
      return next;
    });
  return (
    <main id="main-content" className="catalog-page">
      <div className="page-intro bg-[color:#f4f7f6] pt-6 pb-[34px] mt-0 px-0 mobile:pt-5 mobile:pb-[27px]">
        <div className="container w-[min(1280px,_calc(100%_-_96px))] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)]">
          <div className="breadcrumbs flex items-center text-[10px] text-[color:#8e9da2] mb-7 flex-wrap gap-[9px] [&_a:hover]:text-[color:var(--blue)] [&_>_span:last-child]:text-[color:#647e88] mobile:text-[9px] mobile:mb-[23px] mobile:gap-[7px]">
            <Link to="/">Ana səhifə</Link>
            <Icon name="chevron" size={13} />
            <span>{title}</span>
          </div>
          <h1 className="text-[40px] mobile:text-[33px] mobile:tracking-[-1.2px]">
            {title}
            <span className="heading-dot text-[color:var(--blue)]">.</span>
          </h1>
        </div>
      </div>
      <section className="container catalog-content w-[min(1280px,_calc(100%_-_96px))] pt-[31px] pb-[70px] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)] mobile:pt-6 mobile:pb-[45px]">
        <div className="catalog-toolbar flex items-center justify-between gap-6 border-0 border-b border-solid border-[color:var(--line)] pb-[22px] mobile:flex-col mobile:items-stretch mobile:gap-4 mobile:pb-[18px]">
          <CatalogSelect
            label="Kateqoriya:"
            ariaLabel="Kateqoriyaya görə filtrlə"
            value={category}
            onChange={(value) => update("category", value)}
          >
            {filterCategories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </CatalogSelect>
          <CatalogSelect
            label="Sırala:"
            ariaLabel="Məhsulları sırala"
            value={sort}
            onChange={(value) => update("sort", value)}
          >
            <option value="featured">Tövsiyə edilən</option>
            {mode === "books" ? (
              <>
                <option value="new">Nəşr ili: yenidən köhnəyə</option>
                <option value="old">Nəşr ili: köhnədən yeniyə</option>
              </>
            ) : (
              <>
                <option value="price-asc">Qiymət: aşağıdan yuxarı</option>
                <option value="price-desc">Qiymət: yuxarıdan aşağı</option>
              </>
            )}
            <option value="title">Ada görə</option>
          </CatalogSelect>
        </div>
        <div className="results-summary flex justify-between text-[10px] text-[color:#87969b] my-6 gap-4 [&_strong]:font-semibold [&_strong]:text-[color:#4c6873] mobile:text-[9px] mobile:items-center mobile:my-[21px]">
          <span>
            {isLoading ? (
              "Kitablar yüklənir…"
            ) : (
              <>
                <strong>{total.toLocaleString("az")}</strong> məhsul
                {products.length > 0 &&
                  ` · ${(page - 1) * BOOKS_PAGE_SIZE + 1}–${(page - 1) * BOOKS_PAGE_SIZE + products.length}`}
              </>
            )}{" "}
            {query ? `· “${query}”` : ""}
          </span>
        </div>
        {isOffline && (
          <div className="catalog-retry flex flex-wrap items-center gap-y-2 gap-x-4 mb-6 bg-[color:#f6f4ed] text-[12px] py-3 px-4 rounded-[7px] [&_button]:text-[color:var(--blue-dark)] [&_button]:underline [&_button]:py-1 [&_button]:px-0">
            <span>
              İnternet bağlantısını yoxlayıb yenidən cəhd edə bilərsən.
            </span>
            <button
              type="button"
              onClick={() => setRetry((value) => value + 1)}
            >
              Yenidən cəhd et
            </button>
          </div>
        )}
        {isLoading ? (
          <div
            className="catalog-loading flex items-center justify-center min-h-[310px] text-[13px] text-[color:var(--muted)] gap-3"
            role="status"
          >
            <span className="loading-spinner w-[23px] h-[23px] [border-top-color:var(--blue)] [border-right-color:#dcecf3] [border-bottom-color:#dcecf3] [border-left-color:#dcecf3] animate-catalog-spin border-2 border-solid rounded-full motion-reduce:animate-none" />
            Kitablar yüklənir…
          </div>
        ) : products.length ? (
          <div className="product-grid catalog-grid grid grid-cols-[repeat(6,_minmax(0,_1fr))] gap-y-9 gap-x-[22px] compact:gap-[17px] tablet:grid-cols-[repeat(4,_minmax(0,_1fr))] tablet:gap-[22px] mobile:grid-cols-[repeat(2,_minmax(0,_1fr))] mobile:gap-y-[26px] mobile:gap-x-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state min-h-[310px] flex items-center justify-center flex-col text-center py-[50px] px-6 gap-[15px] [&_>_svg]:text-[color:#7fa6b0] [&_>_svg]:mb-[5px] [&_h2]:text-[25px] [&_p]:text-[13px] [&_p]:text-[color:#839098] [&_p]:max-w-[510px] [&_.button]:mt-1.5 [&_h1]:text-[33px] [&_h1]:tracking-[-1px] mobile:min-h-[300px] mobile:py-10 mobile:px-3 mobile:gap-3.5 mobile:[&_h2]:text-[23px] mobile:[&_p]:text-[11px] mobile:[&_h1]:text-[26px] mobile:[&_h1]:leading-[1.4] mobile:[&_>_.button]:text-[11px]">
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
                className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]"
                onClick={() => setParams({})}
              >
                Filtrləri təmizlə
              </button>
            ) : (
              <Link
                className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]"
                to="/books"
              >
                Kitabları kəşf et <Icon name="arrow" size={18} />
              </Link>
            )}
          </div>
        )}
        {!isLoading && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(value) => {
              update("page", value === 1 ? "" : String(value));
              document
                .querySelector(".catalog-content")
                ?.scrollIntoView({ block: "start" });
            }}
          />
        )}
      </section>
    </main>
  );
}

function CatalogSelect({ label, ariaLabel, value, onChange, children }) {
  return (
    <label className="flex items-center gap-3 text-[11px] font-medium text-[color:#829198] mobile:flex-col mobile:items-stretch mobile:gap-2">
      <span>{label}</span>
      <span className="relative block min-w-[230px] mobile:min-w-0">
        <select
          className="min-h-11 w-full cursor-pointer appearance-none rounded-lg border border-solid border-[color:#dce6eb] bg-white py-3 pl-3.5 pr-10 text-[12px] font-medium text-[color:#4c6672] transition-colors hover:border-[color:#a5c9d9] focus:border-[color:var(--blue)] focus:outline-none focus:ring-2 focus:ring-[color:#cae9f5]"
          aria-label={ariaLabel}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {children}
        </select>
        <Icon
          name="chevron"
          size={15}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-[color:#668593]"
        />
      </span>
    </label>
  );
}

CatalogSelect.propTypes = {
  label: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

Catalog.propTypes = {
  mode: PropTypes.oneOf([
    "books",
    "toys",
    "bestsellers",
    "discounts",
    "favorites",
  ]),
};
