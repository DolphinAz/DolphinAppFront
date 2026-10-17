import { Link } from "react-router-dom";
import { useShop } from "../../state/ShopContext";
import { cartTotal, money } from "../../state/store";
import Cover from "../../components/Cover";
import Icon from "../../components/Icon";

export default function Cart() {
  const { cart, cartCount, updateQuantity, removeFromCart, user } = useShop();
  const subtotal = cartTotal(cart);
  const delivery = subtotal >= 50 ? 0 : 3.9;
  return (
    <main
      id="main-content"
      className="container standard-page w-[min(1280px,_calc(100%_-_96px))] pt-12 pb-[75px] min-h-[55vh] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)] mobile:pt-[30px] mobile:pb-[50px] [&_>_.section-heading]:mb-[38px] mobile:[&_h1]:text-[31px] mobile:[&_h1]:tracking-[-1px] mobile:[&_>_.section-heading]:items-start mobile:[&_>_.section-heading]:flex-col mobile:[&_>_.section-heading]:mb-7 mobile:[&_>_.section-heading]:gap-5 mobile:[&_>_.section-heading_p]:text-[11px] mobile:[&_>_.section-heading_>_.text-link]:text-[11px]"
    >
      <div className="section-heading flex justify-between items-end mb-[30px] gap-6 [&_p]:text-[color:var(--muted)] [&_p]:text-[13px] [&_p]:mt-[9px] [&_>_.text-link]:mb-[5px] tablet:[&_h2]:text-[25px] mobile:mb-[21px] mobile:items-end mobile:gap-3 mobile:[&_.eyebrow]:text-[8px] mobile:[&_.eyebrow]:tracking-[1.1px] mobile:[&_.eyebrow]:mb-[9px] mobile:[&_h2]:text-[22px] mobile:[&_h2]:tracking-[-0.7px] mobile:[&_p]:text-[10px] mobile:[&_p]:mt-2 mobile:[&_>_.text-link]:text-[9px] mobile:[&_>_.text-link]:mb-[3px] mobile:[&_>_.text-link]:gap-1.5 mobile:[&_.text-link_svg]:w-3.5">
        <div>
          <h1>
            Səbətim
            <span className="heading-dot text-[color:var(--blue)]">.</span>
          </h1>
          <p>{cartCount} məhsul yeni macəraya hazırdır.</p>
        </div>
        <Link
          className="text-link inline-flex items-center text-[12px] text-[color:var(--blue)] font-[650] whitespace-nowrap gap-[11px] [&:hover]:text-[color:var(--blue-dark)]"
          to="/books"
        >
          Alış-verişə davam et <Icon name="arrow" size={18} />
        </Link>
      </div>
      {!cart.length ? (
        <div className="empty-state min-h-[310px] flex items-center justify-center flex-col text-center py-[50px] px-6 gap-[15px] [&_>_svg]:text-[color:#7fa6b0] [&_>_svg]:mb-[5px] [&_h2]:text-[25px] [&_p]:text-[13px] [&_p]:text-[color:#839098] [&_p]:max-w-[510px] [&_.button]:mt-1.5 [&_h1]:text-[33px] [&_h1]:tracking-[-1px] mobile:min-h-[300px] mobile:py-10 mobile:px-3 mobile:gap-3.5 mobile:[&_h2]:text-[23px] mobile:[&_p]:text-[11px] mobile:[&_h1]:text-[26px] mobile:[&_h1]:leading-[1.4] mobile:[&_>_.button]:text-[11px]">
          <Icon name="bag" size={48} />
          <h2>Səbətində yeni hekayələrə yer var</h2>
          <p>Sevdiyin bir kitab və ya oyuncaqla başla.</p>
          <Link
            className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]"
            to="/books"
          >
            Kitabları kəşf et
          </Link>
        </div>
      ) : (
        <div className="cart-layout grid grid-cols-[1fr_340px] [align-items:start] gap-10 compact:grid-cols-[1fr_305px] compact:gap-[25px] tablet:grid-cols-[1fr_280px] tablet:gap-[22px] mobile:grid-cols-[1fr] mobile:gap-[30px]">
          <div className="cart-items flex flex-col">
            {cart.map(({ product, quantity }) => (
              <article
                className="cart-item flex [border-top-width:1px] [border-top-style:solid] [border-top-color:var(--line)] items-center py-6 px-0 gap-6 [&_>_a]:w-[78px] [&_>_a]:shrink-0 [&_>_a]:h-[115px] [&_.product-cover]:h-full [&_.product-cover]:w-full tablet:gap-[15px] tablet:[&_>_a]:w-16 tablet:[&_>_a]:h-[95px] mobile:py-[21px] mobile:gap-[15px] mobile:[&_>_a]:w-[65px] mobile:[&_>_a]:h-[98px]"
                key={product.id}
              >
                <Link to={`/detail/${product.id}`}>
                  <Cover product={product} />
                </Link>
                <div className="cart-item-info [flex:1] min-w-0 [&_h2]:text-[15px] [&_h2]:leading-[1.5] [&_h2]:tracking-[-0.3px] [&_h2]:mt-1.5 [&_p]:text-[color:#91a0a6] [&_p]:text-[11px] [&_p]:mt-1 [&_>_strong]:text-[12px] [&_>_strong]:block [&_>_strong]:mt-3 tablet:[&_h2]:text-[12px] tablet:[&_p]:text-[10px] mobile:[&_h2]:text-[12px] mobile:[&_p]:text-[9px] mobile:[&_.product-category]:text-[7px] mobile:[&_>_strong]:text-[11px] mobile:[&_>_strong]:mt-2">
                  <span className="product-category text-[color:#8f9b9c] text-[8px] block tracking-[0.3px] mobile:text-[8px]">
                    {product.category}
                  </span>
                  <h2>
                    <Link to={`/detail/${product.id}`}>{product.title}</Link>
                  </h2>
                  <p>{product.author}</p>
                  <strong>{money(product.price)}</strong>
                </div>
                <div className="cart-item-actions flex flex-col items-end gap-[13px] [&_>_.quantity-control]:h-[34px] [&_>_.quantity-control]:min-w-[90px] [&_>_.quantity-control_button]:p-[7px] [&_>_strong]:text-[13px] mobile:gap-[11px] mobile:[&_>_strong]:text-[12px] mobile:[&_>_.quantity-control]:min-w-[79px] mobile:[&_>_.quantity-control]:h-[30px] mobile:[&_>_.quantity-control_button]:p-[5px] mobile:[&_>_.quantity-control_>_span]:text-[10px] mobile:[&_>_.quantity-control_>_span]:min-w-[19px]">
                  <button
                    className="remove-button text-[color:#9caaaf] flex p-0.5 [&:hover]:text-[color:#bd6654]"
                    aria-label={`${product.title} — səbətdən sil`}
                    onClick={() => removeFromCart(product.id)}
                  >
                    <Icon name="trash" size={19} />
                  </button>
                  <div className="quantity-control flex items-center justify-center h-[43px] min-w-[99px] shrink-0 border border-[color:#e1e9ed] border-solid rounded-[6px] [&_button]:grid [&_button]:place-items-center [&_button]:p-2.5 [&_>_span]:text-[12px] [&_>_span]:text-center [&_>_span]:min-w-[22px]">
                    <button
                      aria-label={`${product.title} — sayını azalt`}
                      disabled={quantity <= 1}
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                    >
                      <Icon name="minus" size={15} />
                    </button>
                    <span>{quantity}</span>
                    <button
                      aria-label={`${product.title} — sayını artır`}
                      disabled={quantity >= 99}
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      <Icon name="plus" size={15} />
                    </button>
                  </div>
                  <strong>{money(product.price * quantity)}</strong>
                </div>
              </article>
            ))}
          </div>
          <aside className="order-summary bg-[color:#f7f9f9] p-[26px] border border-[color:#eaf0f0] border-solid rounded-[10px] [&_h2]:text-[19px] [&_h2]:tracking-[-0.5px] [&_h2]:mb-[25px] [&_>_div]:flex [&_>_div]:justify-between [&_>_div]:text-[12px] [&_>_div]:pb-[18px] [&_>_div]:text-[color:#83949c] [&_>_div]:gap-[15px] [&_>_div_>_strong]:text-[12px] [&_>_div_>_strong]:font-[550] [&_>_div_>_strong]:text-[color:#47636f] [&_>_div_>_strong]:whitespace-nowrap [&_>_.summary-total]:[border-top-width:1px] [&_>_.summary-total]:[border-top-style:solid] [&_>_.summary-total]:[border-top-color:#e2e9eb] [&_>_.summary-total]:pt-[21px] [&_>_.summary-total]:pb-6 [&_>_.summary-total]:mt-0.5 [&_>_.summary-total]:text-[color:#2c4b5a] [&_>_.summary-total]:text-[15px] [&_>_.summary-total]:font-semibold [&_>_.summary-total_strong]:text-[19px] [&_>_.summary-total_strong]:text-[color:var(--ink)] [&_>_.summary-total_strong]:font-bold [&_>_.button]:w-full [&_>_.button]:text-[11px] tablet:p-[21px] tablet:[&_h2]:text-[17px] mobile:p-6 mobile:[&_h2]:text-[20px] mobile:[&_>_.button]:text-[12px] mobile:[&_>_div]:text-[12px]">
            <h2>Sifarişin xülasəsi</h2>
            <div>
              <span>Məhsullar ({cartCount})</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <div>
              <span>Çatdırılma</span>
              <strong>{delivery ? money(delivery) : "Pulsuz"}</strong>
            </div>
            {delivery > 0 && (
              <p className="free-delivery-note text-[10px] text-[color:#789b84] bg-[color:#edf4ed] mb-5 p-2.5 rounded-[5px]">
                Pulsuz çatdırılmaya {money(50 - subtotal)} qaldı.
              </p>
            )}
            <div className="summary-total">
              <span>Cəmi</span>
              <strong>{money(subtotal + delivery)}</strong>
            </div>
            <Link
              className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]"
              to={user ? "/payment" : "/login?next=%2Fpayment"}
            >
              Sifarişi tamamla <Icon name="arrow" size={18} />
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
