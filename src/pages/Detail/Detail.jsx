import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useShop } from "../../state/ShopContext";
import { loadWork } from "../../services/books";
import { money } from "../../state/store";
import Cover from "../../components/Cover";
import Icon from "../../components/Icon";
import FavoriteButton from "../../components/FavoriteButton";
import ProductSection from "../../components/ProductSection";
import ErrorPage from "../Error/Error";

export default function Detail() {
  const { id } = useParams();
  const {
    books,
    toys,
    findProduct,
    addToCart,
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
      <main id="main-content" className="container loading-state w-[min(1280px,_calc(100%_-_96px))] text-center text-[color:var(--muted)] py-[100px] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)]" role="status">
        Kitab məlumatları yüklənir…
      </main>
    );
  const related = (item.type === "toy" ? toys : books)
    .filter((value) => value.id !== item.id)
    .slice(0, 6);
  return (
    <main id="main-content">
      <div className="container detail-page w-[min(1280px,_calc(100%_-_96px))] pt-[27px] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)] mobile:pt-[21px] [&_>_.breadcrumbs]:mb-[35px] mobile:[&_>_.breadcrumbs]:mb-[23px]">
        <div className="breadcrumbs flex items-center text-[10px] text-[color:#8e9da2] mb-7 flex-wrap gap-[9px] [&_a:hover]:text-[color:var(--blue)] [&_>_span:last-child]:text-[color:#647e88] mobile:text-[9px] mobile:mb-[23px] mobile:gap-[7px]">
          <Link to="/">Ana səhifə</Link>
          <Icon name="chevron" size={13} />
          <Link to={item.type === "toy" ? "/toys" : "/books"}>
            {item.type === "toy" ? "Oyuncaqlar" : "Kitablar"}
          </Link>
          <Icon name="chevron" size={13} />
          <span>{item.title}</span>
        </div>
        <div className="detail-layout grid grid-cols-[0.95fr_1.05fr] [align-items:start] pb-[35px] gap-[75px] compact:gap-10 tablet:gap-[29px] mobile:grid-cols-[1fr] mobile:pb-[5px] mobile:gap-7">
          <div className="detail-art h-[505px] bg-[color:#f5f5ef] relative flex items-center justify-center py-[55px] px-[100px] rounded-[12px] [&_>_.product-cover]:h-full [&_>_.product-cover]:w-auto [&_>_.product-cover]:max-w-full [&_>_.product-cover]:aspect-[0.66] [&_>_.product-cover]:shrink-0 [&_>_.product-cover]:shadow-[10px_16px_18px_#28434826] [&_.cover-fallback]:py-[33px] [&_.cover-fallback]:px-5 [&_.cover-fallback_strong]:text-[31px] [&_.cover-fallback_span]:text-[11px] [&:has(.toy-cover)]:p-[30px] [&_>_.toy-cover]:w-full [&_>_.toy-cover]:!bg-[color:transparent] compact:h-[470px] compact:py-[55px] compact:px-[62px] tablet:h-[420px] tablet:py-[55px] tablet:px-[45px] mobile:h-[350px] mobile:py-[38px] mobile:px-[65px] mobile:rounded-[9px] mobile:[&_>_.product-cover]:max-w-[190px] mobile:[&_>_.product-cover]:aspect-[0.66] mobile:[&_>_.toy-cover]:max-w-[280px] mobile:[&_>_.toy-cover]:w-full mobile:[&_.cover-fallback_strong]:text-[26px] mobile:[&_.cover-fallback_span]:text-[8px]">
            <Cover key={item.id} product={item} eager />
            {item.originalPrice > item.price && (
              <span className="detail-sale absolute top-5 left-5 bg-[color:#c47757] text-white text-[12px] py-1.5 px-3 rounded-[5px]">
                −{Math.round((1 - item.price / item.originalPrice) * 100)}%
              </span>
            )}
          </div>
          <div className="detail-copy pt-2.5 [&_h1]:text-[35px] [&_h1]:leading-[1.3] [&_h1]:tracking-[-1.3px] compact:[&_h1]:text-[30px] tablet:[&_h1]:text-[28px] mobile:p-0 mobile:[&_.eyebrow]:text-[9px] mobile:[&_h1]:text-[30px]">
            <span className="eyebrow block text-[10px] font-bold tracking-[1.7px] text-[color:var(--blue)] mb-3">{item.category}</span>
            <h1>{item.title}</h1>
            <p className="detail-author text-[13px] text-[color:#81959d] mt-[13px] mobile:text-[12px] mobile:mt-2.5">{item.author}</p>
            <span className="in-stock flex items-center text-[10px] text-[color:#6f9982] mt-[18px] gap-1.5 [&_>_span]:h-[5px] [&_>_span]:w-[5px] [&_>_span]:bg-[color:#79a58a] [&_>_span]:rounded-full mobile:mt-[15px]">
              <span /> Stokda mövcuddur
            </span>
            <div className="detail-prices flex items-center mt-[22px] gap-3.5 [&_strong]:text-[27px] [&_del]:text-[15px] [&_del]:text-[color:#9da9ac] mobile:mt-[19px] mobile:[&_strong]:text-[26px]">
              <strong>{money(item.price)}</strong>
              {item.originalPrice > item.price && (
                <del>{money(item.originalPrice)}</del>
              )}
            </div>
            <p className="detail-description text-[12px] text-[color:#829199] mt-5 leading-[1.9] max-h-[220px] overflow-auto mobile:text-[12px] mobile:mt-[18px]">{item.description}</p>
            <div className="detail-buy flex mt-[25px] gap-2.5 [&_>_.button-primary]:[flex:1] [&_.quantity-control]:h-[49px] [&_.quantity-control]:min-w-28 tablet:flex-wrap tablet:[&_>_.button-primary]:text-[11px] tablet:[&_.quantity-control]:min-w-[91px] mobile:mt-[22px] mobile:gap-[9px] mobile:[&_.quantity-control]:min-w-[94px] mobile:[&_.quantity-control]:h-[47px] mobile:[&_>_.button-primary]:text-[10px] mobile:[&_>_.button-primary]:min-h-[47px] mobile:[&_>_.button-primary]:p-3 mobile:[&_>_.button-primary]:gap-2">
              <div className="quantity-control flex items-center justify-center h-[43px] min-w-[99px] shrink-0 border border-[color:#e1e9ed] border-solid rounded-[6px] [&_button]:grid [&_button]:place-items-center [&_button]:p-2.5 [&_>_span]:text-[12px] [&_>_span]:text-center [&_>_span]:min-w-[22px]">
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
                className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]"
                onClick={() => addToCart(item, quantity)}
              >
                <Icon name="bag" size={19} /> Səbətə əlavə et
              </button>
              <FavoriteButton
                product={item}
                className="button button-outline detail-favorite inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:white] py-[13px] px-3.5 border border-[color:#d8e1e5] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:#f4f8fa] tablet:px-[11px] mobile:min-h-[47px] mobile:px-3"
                size={20}
              />
            </div>
            <div className="detail-delivery flex bg-[color:#f4f8f8] text-[color:#7a9b9f] mt-[22px] p-[15px] rounded-[7px] gap-3 [&_strong]:block [&_strong]:text-[color:#4f727c] [&_strong]:text-[10px] [&_strong]:font-semibold [&_small]:block [&_small]:text-[9px] [&_small]:mt-[5px] mobile:mt-[19px] mobile:p-[13px] mobile:[&_strong]:text-[10px] mobile:[&_small]:text-[9px]">
              <Icon name="truck" size={22} />
              <span>
                <strong>Hekayən qapına gəlsin.</strong>
                <small>50 ₼-dan yuxarı sifarişlərə pulsuz çatdırılma.</small>
              </span>
            </div>
            <dl className="product-specs mt-6 mb-0 grid text-[11px] gap-[11px] [&_>_div]:grid [&_>_div]:grid-cols-[110px_1fr] [&_>_div]:gap-[15px] [&_dt]:text-[color:#91a0a7] [&_dd]:text-[color:#536f7b] [&_dd]:m-0 mobile:text-[11px]">
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
              <p className="metadata-note text-[9px] text-[color:#a1acb1] mt-[18px] mobile:text-[9px]">
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
