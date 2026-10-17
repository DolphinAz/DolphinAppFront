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
    <main id="main-content" className="container standard-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">SEÇDİYİN KİÇİK SEVİNCLƏR</span>
          <h1>
            Səbətim<span className="heading-dot">.</span>
          </h1>
          <p>{cartCount} məhsul yeni macəraya hazırdır.</p>
        </div>
        <Link className="text-link" to="/books">
          Alış-verişə davam et <Icon name="arrow" size={18} />
        </Link>
      </div>
      {!cart.length ? (
        <div className="empty-state">
          <Icon name="bag" size={48} />
          <h2>Səbətində yeni hekayələrə yer var</h2>
          <p>Sevdiyin bir kitab və ya oyuncaqla başla.</p>
          <Link className="button button-primary" to="/books">
            Kitabları kəşf et
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(({ product, quantity }) => (
              <article className="cart-item" key={product.id}>
                <Link to={`/detail/${product.id}`}>
                  <Cover product={product} />
                </Link>
                <div className="cart-item-info">
                  <span className="product-category">{product.category}</span>
                  <h2>
                    <Link to={`/detail/${product.id}`}>{product.title}</Link>
                  </h2>
                  <p>{product.author}</p>
                  <strong>{money(product.price)}</strong>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="remove-button"
                    aria-label={`${product.title} — səbətdən sil`}
                    onClick={() => removeFromCart(product.id)}
                  >
                    <Icon name="trash" size={19} />
                  </button>
                  <div className="quantity-control">
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
          <aside className="order-summary">
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
              <p className="free-delivery-note">
                Pulsuz çatdırılmaya {money(50 - subtotal)} qaldı.
              </p>
            )}
            <div className="summary-total">
              <span>Cəmi</span>
              <strong>{money(subtotal + delivery)}</strong>
            </div>
            <Link
              className="button button-primary"
              to={user ? "/payment" : "/login?next=%2Fpayment"}
            >
              Sifarişi tamamla <Icon name="arrow" size={18} />
            </Link>
            <p className="summary-note">
              <Icon name="shield" size={15} /> Səbətin bu brauzerdə saxlanılır.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
