import { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../state/ShopContext";
import { cartTotal, money } from "../../state/store";
import Icon from "../../components/Icon";

export default function Payment() {
  const { cart, user, placeOrder } = useShop();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [customer, setCustomer] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    address: user.address || "",
    city: "Bakı",
  });
  const subtotal = cartTotal(cart);
  const total = subtotal + (subtotal >= 50 ? 0 : 3.9);
  function submit(event) {
    event.preventDefault();
    if (pending) return;
    if (Object.values(customer).some((value) => !value.trim())) {
      setError("Bütün məlumatları doldurun.");
      return;
    }
    setPending(true);
    try {
      setOrder(placeOrder(customer));
    } catch (issue) {
      setError(issue.message);
      setPending(false);
    }
  }
  if (order)
    return (
      <main id="main-content" className="container standard-page">
        <div className="empty-state order-success">
          <span className="success-circle">
            <Icon name="check" size={36} />
          </span>
          <span className="eyebrow">YENİ HEKAYƏYƏ HAZIRSAN</span>
          <h1>Demo sifarişin saxlanıldı!</h1>
          <p>
            {order.id} · {money(order.total)}
          </p>
          <p>
            Bu sifariş yalnız brauzerində saxlanılır. Ödəniş tutulmur və
            çatdırılma sifarişi göndərilmir.
          </p>
          <Link className="button button-primary" to="/orders">
            Sifarişlərimə bax <Icon name="arrow" size={18} />
          </Link>
        </div>
      </main>
    );
  if (!cart.length)
    return (
      <main id="main-content" className="container standard-page">
        <div className="empty-state">
          <Icon name="bag" size={44} />
          <h1>Səbətin boşdur</h1>
          <p>Sifariş üçün əvvəlcə bir məhsul seç.</p>
          <Link to="/books" className="button button-primary">
            Kitablara bax
          </Link>
        </div>
      </main>
    );
  return (
    <main id="main-content" className="container standard-page">
      <div className="section-heading">
        <div>
          <span className="eyebrow">SON BİR ADDIM</span>
          <h1>Sifarişi tamamla.</h1>
          <p>Çatdırılma məlumatlarını əlavə et.</p>
        </div>
        <Link className="text-link" to="/cart">
          Səbətə qayıt <Icon name="arrow" size={17} />
        </Link>
      </div>
      <div className="checkout-layout">
        <form
          className="form-stack surface-card"
          id="checkout-form"
          onSubmit={submit}
        >
          <h2>Şəxsi məlumatlar</h2>
          {[
            ["name", "Ad və soyad", "text", "name"],
            ["email", "E-poçt ünvanı", "email", "email"],
            ["phone", "Telefon nömrəsi", "tel", "tel"],
            ["city", "Şəhər", "text", "address-level2"],
            ["address", "Çatdırılma ünvanı", "text", "street-address"],
          ].map(([key, label, type, complete]) => (
            <label key={key}>
              {label}
              <input
                name={key}
                type={type}
                autoComplete={complete}
                required
                maxLength={key === "address" ? 240 : 120}
                value={customer[key]}
                onChange={(event) =>
                  setCustomer((value) => ({
                    ...value,
                    [key]: event.target.value,
                  }))
                }
              />
            </label>
          ))}
          <div className="info-note">
            <Icon name="shield" />
            <p>
              Demo rejim. Sifariş brauzerdə saxlanılır; real ödəniş və
              çatdırılma həyata keçirilmir.
            </p>
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
        </form>
        <aside className="order-summary">
          <h2>Sifarişin</h2>
          {cart.map(({ product, quantity }) => (
            <div className="checkout-product" key={product.id}>
              <span>
                {product.title} <small>× {quantity}</small>
              </span>
              <strong>{money(product.price * quantity)}</strong>
            </div>
          ))}
          <div>
            <span>Çatdırılma</span>
            <strong>{subtotal >= 50 ? "Pulsuz" : money(3.9)}</strong>
          </div>
          <div className="summary-total">
            <span>Cəmi</span>
            <strong>{money(total)}</strong>
          </div>
          <button
            className="button button-primary"
            type="submit"
            form="checkout-form"
            disabled={pending}
          >
            Demo sifarişi saxla <Icon name="check" size={18} />
          </button>
        </aside>
      </div>
    </main>
  );
}
