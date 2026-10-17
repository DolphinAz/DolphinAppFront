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
      <main id="main-content" className="container standard-page w-[min(1280px,_calc(100%_-_96px))] pt-12 pb-[75px] min-h-[55vh] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)] mobile:pt-[30px] mobile:pb-[50px] [&_>_.section-heading]:mb-[38px] mobile:[&_h1]:text-[31px] mobile:[&_h1]:tracking-[-1px] mobile:[&_>_.section-heading]:items-start mobile:[&_>_.section-heading]:flex-col mobile:[&_>_.section-heading]:mb-7 mobile:[&_>_.section-heading]:gap-5 mobile:[&_>_.section-heading_p]:text-[11px] mobile:[&_>_.section-heading_>_.text-link]:text-[11px]">
        <div className="empty-state order-success min-h-[310px] flex items-center justify-center flex-col text-center py-[50px] px-6 gap-[15px] [&_>_svg]:text-[color:#7fa6b0] [&_>_svg]:mb-[5px] [&_h2]:text-[25px] [&_p]:text-[13px] [&_p]:text-[color:#839098] [&_p]:max-w-[510px] [&_.button]:mt-1.5 [&_h1]:text-[33px] [&_h1]:tracking-[-1px] mobile:min-h-[300px] mobile:py-10 mobile:px-3 mobile:gap-3.5 mobile:[&_h2]:text-[23px] mobile:[&_p]:text-[11px] mobile:[&_h1]:text-[26px] mobile:[&_h1]:leading-[1.4] mobile:[&_>_.button]:text-[11px] [&_.eyebrow]:mt-[5px] [&_.eyebrow]:mb-0">
          <span className="success-circle w-[67px] h-[67px] grid place-items-center bg-[color:#e9f3ec] text-[color:#7aa38a] mb-[7px] rounded-full">
            <Icon name="check" size={36} />
          </span>
          <span className="eyebrow block text-[10px] font-bold tracking-[1.7px] text-[color:var(--blue)] mb-3">YENİ HEKAYƏYƏ HAZIRSAN</span>
          <h1>Demo sifarişin saxlanıldı!</h1>
          <p>
            {order.id} · {money(order.total)}
          </p>
          <p>
            Bu sifariş yalnız brauzerində saxlanılır. Ödəniş tutulmur və
            çatdırılma sifarişi göndərilmir.
          </p>
          <Link className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]" to="/orders">
            Sifarişlərimə bax <Icon name="arrow" size={18} />
          </Link>
        </div>
      </main>
    );
  if (!cart.length)
    return (
      <main id="main-content" className="container standard-page w-[min(1280px,_calc(100%_-_96px))] pt-12 pb-[75px] min-h-[55vh] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)] mobile:pt-[30px] mobile:pb-[50px] [&_>_.section-heading]:mb-[38px] mobile:[&_h1]:text-[31px] mobile:[&_h1]:tracking-[-1px] mobile:[&_>_.section-heading]:items-start mobile:[&_>_.section-heading]:flex-col mobile:[&_>_.section-heading]:mb-7 mobile:[&_>_.section-heading]:gap-5 mobile:[&_>_.section-heading_p]:text-[11px] mobile:[&_>_.section-heading_>_.text-link]:text-[11px]">
        <div className="empty-state min-h-[310px] flex items-center justify-center flex-col text-center py-[50px] px-6 gap-[15px] [&_>_svg]:text-[color:#7fa6b0] [&_>_svg]:mb-[5px] [&_h2]:text-[25px] [&_p]:text-[13px] [&_p]:text-[color:#839098] [&_p]:max-w-[510px] [&_.button]:mt-1.5 [&_h1]:text-[33px] [&_h1]:tracking-[-1px] mobile:min-h-[300px] mobile:py-10 mobile:px-3 mobile:gap-3.5 mobile:[&_h2]:text-[23px] mobile:[&_p]:text-[11px] mobile:[&_h1]:text-[26px] mobile:[&_h1]:leading-[1.4] mobile:[&_>_.button]:text-[11px]">
          <Icon name="bag" size={44} />
          <h1>Səbətin boşdur</h1>
          <p>Sifariş üçün əvvəlcə bir məhsul seç.</p>
          <Link to="/books" className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]">
            Kitablara bax
          </Link>
        </div>
      </main>
    );
  return (
    <main id="main-content" className="container standard-page w-[min(1280px,_calc(100%_-_96px))] pt-12 pb-[75px] min-h-[55vh] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)] mobile:pt-[30px] mobile:pb-[50px] [&_>_.section-heading]:mb-[38px] mobile:[&_h1]:text-[31px] mobile:[&_h1]:tracking-[-1px] mobile:[&_>_.section-heading]:items-start mobile:[&_>_.section-heading]:flex-col mobile:[&_>_.section-heading]:mb-7 mobile:[&_>_.section-heading]:gap-5 mobile:[&_>_.section-heading_p]:text-[11px] mobile:[&_>_.section-heading_>_.text-link]:text-[11px]">
      <div className="section-heading flex justify-between items-end mb-[30px] gap-6 [&_p]:text-[color:var(--muted)] [&_p]:text-[13px] [&_p]:mt-[9px] [&_>_.text-link]:mb-[5px] tablet:[&_h2]:text-[25px] mobile:mb-[21px] mobile:items-end mobile:gap-3 mobile:[&_.eyebrow]:text-[8px] mobile:[&_.eyebrow]:tracking-[1.1px] mobile:[&_.eyebrow]:mb-[9px] mobile:[&_h2]:text-[22px] mobile:[&_h2]:tracking-[-0.7px] mobile:[&_p]:text-[10px] mobile:[&_p]:mt-2 mobile:[&_>_.text-link]:text-[9px] mobile:[&_>_.text-link]:mb-[3px] mobile:[&_>_.text-link]:gap-1.5 mobile:[&_.text-link_svg]:w-3.5">
        <div>
          <span className="eyebrow block text-[10px] font-bold tracking-[1.7px] text-[color:var(--blue)] mb-3">SON BİR ADDIM</span>
          <h1>Sifarişi tamamla.</h1>
          <p>Çatdırılma məlumatlarını əlavə et.</p>
        </div>
        <Link className="text-link inline-flex items-center text-[12px] text-[color:var(--blue)] font-[650] whitespace-nowrap gap-[11px] [&:hover]:text-[color:var(--blue-dark)]" to="/cart">
          Səbətə qayıt <Icon name="arrow" size={17} />
        </Link>
      </div>
      <div className="checkout-layout grid grid-cols-[1fr_340px] [align-items:start] gap-10 [&_>_.form-stack_h2]:mb-2 compact:grid-cols-[1fr_305px] compact:gap-[25px] tablet:grid-cols-[1fr_280px] tablet:gap-[22px] mobile:grid-cols-[1fr] mobile:gap-[30px] mobile:[&_>_.surface-card]:p-6 mobile:[&_>_.surface-card_h2]:text-[22px]">
        <form
          className="form-stack surface-card flex flex-col bg-[color:#fff] p-[31px] border border-[color:#e4ebee] border-solid rounded-[10px] gap-5 [&_>_label]:flex [&_>_label]:flex-col [&_>_label]:text-[11px] [&_>_label]:font-[550] [&_>_label]:text-[color:#49616c] [&_>_label]:gap-2 [&_input]:w-full [&_input]:min-h-[45px] [&_input]:text-[12px] [&_input]:leading-[1.6] [&_input]:bg-[color:#fff] [&_input]:text-[color:var(--ink)] [&_input]:[transition:border-color_0.2s] [&_input]:py-3 [&_input]:px-3.5 [&_input]:border [&_input]:border-[color:#e0e7eb] [&_input]:border-solid [&_input]:rounded-[6px] [&_textarea]:w-full [&_textarea]:min-h-[120px] [&_textarea]:text-[12px] [&_textarea]:leading-[1.6] [&_textarea]:bg-[color:#fff] [&_textarea]:text-[color:var(--ink)] [&_textarea]:[transition:border-color_0.2s] [&_textarea]:resize-y [&_textarea]:py-3 [&_textarea]:px-3.5 [&_textarea]:border [&_textarea]:border-[color:#e0e7eb] [&_textarea]:border-solid [&_textarea]:rounded-[6px] [&_input::placeholder]:text-[color:#a4afb3] [&_input::placeholder]:text-[11px] [&_input:focus]:[outline:2px_solid_#e1f1f7] [&_input:focus]:[outline-offset:1px] [&_input:focus]:border-[color:#76b7d5] [&_textarea:focus]:[outline:2px_solid_#e1f1f7] [&_textarea:focus]:[outline-offset:1px] [&_textarea:focus]:border-[color:#76b7d5] [&_input:disabled]:bg-[color:#f6f8f9] [&_input:disabled]:text-[color:#95a2a7] [&_label_small]:text-[10px] [&_label_small]:font-normal [&_label_small]:text-[color:#97a3a8] [&_>_.checkbox-label]:flex-row [&_>_.checkbox-label]:items-start [&_>_.checkbox-label]:text-[10px] [&_>_.checkbox-label]:leading-[1.6] [&_>_.checkbox-label]:font-normal [&_>_.checkbox-label]:text-[color:#85929a] [&_>_.checkbox-label]:gap-[9px] mobile:p-6 mobile:gap-[19px] mobile:[&_>_label]:text-[11px] mobile:[&_input]:text-[12px] mobile:[&_input]:min-h-[47px] mobile:[&_input::placeholder]:text-[11px] [&_h2]:text-[23px] [&_h2]:tracking-[-0.6px] [&_h2]:mb-1.5 [&_.form-stack]:mt-6"
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
          <div className="info-note flex items-start bg-[color:#f1f6f7] text-[color:#7f99a3] p-[15px] rounded-[7px] gap-[11px] [&_p]:text-[11px] [&_p]:leading-[1.7] mobile:[&_p]:text-[10px]">
            <Icon name="shield" />
            <p>
              Demo rejim. Sifariş brauzerdə saxlanılır; real ödəniş və
              çatdırılma həyata keçirilmir.
            </p>
          </div>
          {error && (
            <p className="form-error bg-[color:#fff1ef] text-[color:#ac4b42] text-[12px] leading-[1.6] p-3 rounded-[6px] mobile:text-[11px]" role="alert">
              {error}
            </p>
          )}
        </form>
        <aside className="order-summary bg-[color:#f7f9f9] p-[26px] border border-[color:#eaf0f0] border-solid rounded-[10px] [&_h2]:text-[19px] [&_h2]:tracking-[-0.5px] [&_h2]:mb-[25px] [&_>_div]:flex [&_>_div]:justify-between [&_>_div]:text-[12px] [&_>_div]:pb-[18px] [&_>_div]:text-[color:#83949c] [&_>_div]:gap-[15px] [&_>_div_>_strong]:text-[12px] [&_>_div_>_strong]:font-[550] [&_>_div_>_strong]:text-[color:#47636f] [&_>_div_>_strong]:whitespace-nowrap [&_>_.summary-total]:[border-top-width:1px] [&_>_.summary-total]:[border-top-style:solid] [&_>_.summary-total]:[border-top-color:#e2e9eb] [&_>_.summary-total]:pt-[21px] [&_>_.summary-total]:pb-6 [&_>_.summary-total]:mt-0.5 [&_>_.summary-total]:text-[color:#2c4b5a] [&_>_.summary-total]:text-[15px] [&_>_.summary-total]:font-semibold [&_>_.summary-total_strong]:text-[19px] [&_>_.summary-total_strong]:text-[color:var(--ink)] [&_>_.summary-total_strong]:font-bold [&_>_.button]:w-full [&_>_.button]:text-[11px] tablet:p-[21px] tablet:[&_h2]:text-[17px] mobile:p-6 mobile:[&_h2]:text-[20px] mobile:[&_>_.button]:text-[12px] mobile:[&_>_div]:text-[12px]">
          <h2>Sifarişin</h2>
          {cart.map(({ product, quantity }) => (
            <div className="checkout-product [&_>_span]:leading-[1.6] [&_small]:text-[10px] [&_small]:text-[color:#a0aeb3]" key={product.id}>
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
            className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]"
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
