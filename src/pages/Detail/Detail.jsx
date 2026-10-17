import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useShop } from "../../state/ShopContext";
import { loadWork } from "../../services/books";
import { money } from "../../state/store";
import Cover from "../../components/Cover";
import Icon from "../../components/Icon";
import ProductSection from "../../components/ProductSection";
import ErrorPage from "../Error/Error";

export default function Detail() {
  const { id } = useParams();
  const {
    books,
    toys,
    findProduct,
    addToCart,
    favorites,
    toggleFavorite,
    rememberBooks,
  } = useShop();
  const product = findProduct(id);
  const [remote, setRemote] = useState({ id: "", product: null, done: false });
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (product) return;
    const controller = new AbortController();
    loadWork(id, controller.signal)
      .then((item) => {
        if (item) rememberBooks([item]);
        setRemote({ id, product: item, done: true });
      })
      .catch(() => {
        if (!controller.signal.aborted)
          setRemote({ id, product: null, done: true });
      });
    return () => controller.abort();
  }, [id, product, rememberBooks]);
  const item = product || (remote.id === id ? remote.product : null);
  if (!item)
    return remote.id === id && remote.done ? (
      <ErrorPage />
    ) : (
      <main id="main-content" className="container loading-state" role="status">
        Kitab məlumatları yüklənir…
      </main>
    );
  const favorite = favorites.some((value) => value.id === item.id);
  const related = (item.type === "toy" ? toys : books)
    .filter((value) => value.id !== item.id)
    .slice(0, 6);
  return (
    <main id="main-content">
      <div className="container detail-page">
        <div className="breadcrumbs">
          <Link to="/">Ana səhifə</Link>
          <Icon name="chevron" size={13} />
          <Link to={item.type === "toy" ? "/toys" : "/books"}>
            {item.type === "toy" ? "Oyuncaqlar" : "Kitablar"}
          </Link>
          <Icon name="chevron" size={13} />
          <span>{item.title}</span>
        </div>
        <div className="detail-layout">
          <div className="detail-art">
            <Cover key={item.id} product={item} eager />
            {item.originalPrice > item.price && (
              <span className="detail-sale">
                −{Math.round((1 - item.price / item.originalPrice) * 100)}%
              </span>
            )}
          </div>
          <div className="detail-copy">
            <span className="eyebrow">{item.category}</span>
            <h1>{item.title}</h1>
            <p className="detail-author">{item.author}</p>
            <span className="in-stock">
              <span /> Stokda mövcuddur
            </span>
            <div className="detail-prices">
              <strong>{money(item.price)}</strong>
              {item.originalPrice > item.price && (
                <del>{money(item.originalPrice)}</del>
              )}
            </div>
            <p className="detail-description">{item.description}</p>
            <div className="detail-buy">
              <div className="quantity-control">
                <button
                  aria-label="Sayını azalt"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((value) => value - 1)}
                >
                  <Icon name="minus" size={16} />
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  aria-label="Sayını artır"
                  disabled={quantity >= 99}
                  onClick={() => setQuantity((value) => value + 1)}
                >
                  <Icon name="plus" size={16} />
                </button>
              </div>
              <button
                className="button button-primary"
                onClick={() => addToCart(item, quantity)}
              >
                <Icon name="bag" size={19} /> Səbətə əlavə et
              </button>
              <button
                className={`button button-outline detail-favorite ${favorite ? "is-favorite" : ""}`}
                aria-label="Sevimlilərə əlavə et"
                aria-pressed={favorite}
                onClick={() => toggleFavorite(item)}
              >
                <Icon name="heart" />
              </button>
            </div>
            <div className="detail-delivery">
              <Icon name="truck" size={22} />
              <span>
                <strong>Hekayən qapına gəlsin.</strong>
                <small>50 ₼-dan yuxarı sifarişlərə pulsuz çatdırılma.</small>
              </span>
            </div>
            <dl className="product-specs">
              <div>
                <dt>Kateqoriya</dt>
                <dd>{item.category}</dd>
              </div>
              {item.type === "book" ? (
                <>
                  <div>
                    <dt>Dil</dt>
                    <dd>{item.language}</dd>
                  </div>
                  {item.isbn && (
                    <div>
                      <dt>ISBN</dt>
                      <dd>{item.isbn}</dd>
                    </div>
                  )}
                  {item.pages && (
                    <div>
                      <dt>Səhifə sayı</dt>
                      <dd>{item.pages}</dd>
                    </div>
                  )}
                  {item.publisher && (
                    <div>
                      <dt>Nəşriyyat</dt>
                      <dd>{item.publisher}</dd>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <dt>Yaş qrupu</dt>
                  <dd>{item.age}</dd>
                </div>
              )}
            </dl>
            {item.type === "book" && (
              <p className="metadata-note">
                Məlumat mənbəyi: {item.source}. Qiymətlər mağazanın demo
                kataloquna aiddir.
              </p>
            )}
          </div>
        </div>
      </div>
      <ProductSection
        title="Bunlar da xoşuna gələ bilər"
        products={related}
        to={item.type === "toy" ? "/toys" : "/books"}
      />
    </main>
  );
}
