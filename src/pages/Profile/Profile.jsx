import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useShop } from "../../state/ShopContext";
import { changePassword } from "../../services/accounts";
import { money } from "../../state/store";
import Icon from "../../components/Icon";

export default function Profile() {
  const { user, updateProfile, logout, orders, favorites } = useShop();
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(
    location.pathname === "/orders" ? "orders" : "profile",
  );
  const activeTab = location.pathname === "/orders" ? "orders" : tab;
  const [values, setValues] = useState({
    name: user.name,
    phone: user.phone || "",
    address: user.address || "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  function switchTab(next) {
    setError("");
    setTab(next);
    if (location.pathname === "/orders" && next !== "orders")
      navigate("/profile");
  }
  async function submit(event) {
    event.preventDefault();
    setError("");
    if (pending) return;
    setPending(true);
    try {
      if (activeTab === "password") {
        if (passwords.next !== passwords.confirm)
          throw new Error("Şifrələr eyni olmalıdır.");
        await changePassword(user.id, passwords.current, passwords.next);
        setPasswords({ current: "", next: "", confirm: "" });
      } else updateProfile(values);
      toast.success("Dəyişikliklər saxlanıldı");
    } catch (issue) {
      setError(issue.message);
    } finally {
      setPending(false);
    }
  }
  return (
    <main
      id="main-content"
      className="container standard-page w-[min(1280px,_calc(100%_-_96px))] pt-12 pb-[75px] min-h-[55vh] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)] mobile:pt-[30px] mobile:pb-[50px] [&_>_.section-heading]:mb-[38px] mobile:[&_h1]:text-[31px] mobile:[&_h1]:tracking-[-1px] mobile:[&_>_.section-heading]:items-start mobile:[&_>_.section-heading]:flex-col mobile:[&_>_.section-heading]:mb-7 mobile:[&_>_.section-heading]:gap-5 mobile:[&_>_.section-heading_p]:text-[11px] mobile:[&_>_.section-heading_>_.text-link]:text-[11px]"
    >
      <div className="profile-heading flex items-center mb-10 gap-[22px] [&_h1]:text-[34px] [&_h1]:tracking-[-1px] [&_.eyebrow]:mb-[7px] [&_.eyebrow]:text-[9px] [&_p]:text-[11px] [&_p]:text-[color:#9ba6ac] [&_p]:mt-2 mobile:mb-7 mobile:gap-[15px] mobile:[&_h1]:text-[26px] mobile:[&_.eyebrow]:text-[7px] mobile:[&_.eyebrow]:tracking-[1px] mobile:[&_p]:text-[10px] mobile:[&_p]:mt-[5px]">
        <span className="profile-avatar w-[70px] h-[70px] bg-[color:#e6f1f4] text-[color:#5e98ac] grid place-items-center text-[30px] font-medium rounded-full mobile:w-[52px] mobile:h-[52px] mobile:text-[24px] mobile:shrink-0">
          {user.name.slice(0, 1).toLocaleUpperCase("az")}
        </span>
        <div>
          <span className="eyebrow block text-[10px] font-bold tracking-[1.7px] text-[color:var(--blue)] mb-3">
            SƏNİN DOLPHIN DÜNYAN
          </span>
          <h1>Salam, {user.name.split(" ")[0]}.</h1>
          <p>Yeni hekayələrə hazırsan?</p>
        </div>
      </div>
      <div className="profile-layout grid grid-cols-[250px_1fr] [align-items:start] gap-[50px] tablet:grid-cols-[210px_1fr] tablet:gap-7 mobile:grid-cols-[1fr] mobile:gap-[25px]">
        <aside className="profile-navigation flex flex-col gap-[7px] [&_>_button]:flex [&_>_button]:items-center [&_>_button]:text-[11px] [&_>_button]:text-left [&_>_button]:text-[color:#8d9ba2] [&_>_button]:p-[13px] [&_>_button]:rounded-[6px] [&_>_button]:gap-2.5 [&_>_a]:flex [&_>_a]:items-center [&_>_a]:text-[11px] [&_>_a]:text-left [&_>_a]:text-[color:#8d9ba2] [&_>_a]:p-[13px] [&_>_a]:rounded-[6px] [&_>_a]:gap-2.5 [&_>_button.active]:bg-[color:#eaf4f7] [&_>_button.active]:text-[color:var(--blue)] [&_>_button_>_svg:last-child:not(:first-child)]:ml-auto [&_>_a_>_svg:last-child]:ml-auto [&_.logout-button]:text-[color:#b27d70] [&_.logout-button]:[border-top-width:1px] [&_.logout-button]:[border-top-style:solid] [&_.logout-button]:[border-top-color:var(--line)] [&_.logout-button]:mt-2.5 [&_.logout-button]:pt-[21px] [&_.logout-button]:rounded-[0] [&_>_p]:text-[10px] [&_>_p]:text-[color:#a4afb4] [&_>_p]:py-2 [&_>_p]:px-[13px] mobile:grid mobile:grid-cols-[1fr_1fr] mobile:gap-1.5 mobile:[&_>_button]:text-[10px] mobile:[&_>_button]:p-[11px] mobile:[&_>_button]:gap-[7px] mobile:[&_>_a]:text-[10px] mobile:[&_>_a]:p-[11px] mobile:[&_>_a]:gap-[7px] mobile:[&_>_button_>_svg:last-child:not(:first-child)]:hidden mobile:[&_>_a_>_svg:last-child]:hidden mobile:[&_.logout-button]:col-span-full mobile:[&_.logout-button]:pt-[11px] mobile:[&_.logout-button]:mt-[1px] mobile:[&_.logout-button]:border-0 mobile:[&_.logout-button]:border-[color:currentColor] mobile:[&_.logout-button]:border-none mobile:[&_>_p]:col-span-full mobile:[&_>_p]:text-[9px] mobile:[&_>_p]:pt-0 mobile:[&_>_p]:mt-[-3px]">
          {[
            ["profile", "user", "Şəxsi məlumatlar"],
            ["password", "shield", "Şifrə"],
            ["orders", "bag", `Sifarişlərim (${orders.length})`],
          ].map(([key, icon, label]) => (
            <button
              key={key}
              className={activeTab === key ? "active" : ""}
              onClick={() => switchTab(key)}
            >
              <Icon name={icon} size={19} />
              {label}
              <Icon name="chevron" size={15} />
            </button>
          ))}
          <Link to="/favorites">
            <Icon name="heart" size={19} />
            Sevimlilər ({favorites.length})<Icon name="chevron" size={15} />
          </Link>
          <button
            className="logout-button"
            onClick={() => {
              logout();
              toast.success("Hesabdan çıxış edildi");
            }}
          >
            <Icon name="logout" size={19} />
            Hesabdan çıx
          </button>
        </aside>
        <section className="surface-card profile-content bg-[color:#fff] max-w-[740px] p-[31px] border border-[color:#e4ebee] border-solid rounded-[10px] [&_h2]:text-[23px] [&_h2]:tracking-[-0.6px] [&_h2]:mb-1.5 [&_.form-stack]:mt-6 [&_.form-stack]:max-w-[480px] mobile:py-6 mobile:px-5 [&_>_.muted]:text-[11px] [&_.form-stack_>_.button]:[align-self:flex-start] [&_.form-stack_>_.button]:mt-[7px] mobile:[&_h2]:text-[22px] mobile:[&_>_.muted]:text-[10px] mobile:[&_.form-stack]:mt-[23px] mobile:[&_.form-stack_>_.button]:w-full mobile:[&_.form-stack_>_.button]:text-[11px]">
          {activeTab === "orders" ? (
            <>
              <h2>Sifarişlərim</h2>
              {orders.length ? (
                <div className="orders-list grid mt-[25px] gap-[23px]">
                  {orders.map((order) => (
                    <article
                      className="order-card p-[19px] border border-[color:#e4ecee] border-solid rounded-[7px] mobile:p-[15px]"
                      key={order.id}
                    >
                      <div className="order-card-heading flex items-center justify-between pb-[18px] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:var(--line)] mb-3.5 gap-2.5 [&_strong]:text-[12px] [&_small]:block [&_small]:text-[9px] [&_small]:text-[color:#98a7ad] [&_small]:mt-1.5">
                        <div>
                          <strong>{order.id}</strong>
                          <small>
                            {new Date(order.createdAt).toLocaleDateString(
                              "az-AZ",
                            )}
                          </small>
                        </div>
                        <span className="order-status bg-[color:#eaf3ed] text-[color:#7b9c85] text-[9px] py-[5px] px-2 rounded-[4px]">
                          {order.status}
                        </span>
                      </div>
                      {order.items.map(({ product, quantity }) => (
                        <div
                          key={product.id}
                          className="order-product flex justify-between text-[11px] text-[color:#79909c] mt-[11px] leading-[1.6] gap-5 [&_strong]:text-[11px] [&_strong]:whitespace-nowrap [&_small]:text-[color:#9eafb5] mobile:text-[10px] mobile:gap-3 mobile:[&_strong]:text-[10px]"
                        >
                          <Link to={`/detail/${product.id}`}>
                            {product.title} <small>× {quantity}</small>
                          </Link>
                          <strong>{money(product.price * quantity)}</strong>
                        </div>
                      ))}
                      <div className="order-total [border-top-width:1px] [border-top-style:solid] [border-top-color:var(--line)] pt-[15px] mt-[17px] flex justify-between text-[11px] gap-[15px] [&_strong]:text-[14px] mobile:text-[10px] mobile:[&_strong]:text-[12px]">
                        <span>Çatdırılma daxil cəmi</span>
                        <strong>{money(order.total)}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state compact-empty min-h-[250px] flex items-center justify-center flex-col text-center py-[30px] px-2.5 gap-[15px] [&_>_svg]:text-[color:#7fa6b0] [&_>_svg]:mb-[5px] [&_h2]:text-[25px] [&_p]:text-[13px] [&_p]:text-[color:#839098] [&_p]:max-w-[510px] [&_.button]:mt-1.5 [&_h1]:text-[33px] [&_h1]:tracking-[-1px] mobile:min-h-[300px] mobile:py-10 mobile:px-3 mobile:gap-3.5 mobile:[&_h2]:text-[23px] mobile:[&_p]:text-[11px] mobile:[&_h1]:text-[26px] mobile:[&_h1]:leading-[1.4] mobile:[&_>_.button]:text-[11px] [&_h3]:text-[20px]">
                  <Icon name="bag" size={36} />
                  <h3>İlk sifarişin səni gözləyir</h3>
                  <p>Sevdiyin kitabı seçərək başla.</p>
                  <Link
                    className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]"
                    to="/books"
                  >
                    Kitablara bax
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <h2>
                {activeTab === "password"
                  ? "Şifrəni dəyiş"
                  : "Şəxsi məlumatlar"}
              </h2>
              <p className="muted text-[color:var(--muted)] text-[14px]">
                {activeTab === "password"
                  ? "Dəyişiklik növbəti girişdə qüvvədə olacaq."
                  : "Məlumatlarını yenilə və rahat alış-verişə davam et."}
              </p>
              <form
                className="form-stack flex flex-col gap-5 [&_>_label]:flex [&_>_label]:flex-col [&_>_label]:text-[11px] [&_>_label]:font-[550] [&_>_label]:text-[color:#49616c] [&_>_label]:gap-2 [&_input]:w-full [&_input]:min-h-[45px] [&_input]:text-[12px] [&_input]:leading-[1.6] [&_input]:bg-[color:#fff] [&_input]:text-[color:var(--ink)] [&_input]:[transition:border-color_0.2s] [&_input]:py-3 [&_input]:px-3.5 [&_input]:border [&_input]:border-[color:#e0e7eb] [&_input]:border-solid [&_input]:rounded-[6px] [&_textarea]:w-full [&_textarea]:min-h-[120px] [&_textarea]:text-[12px] [&_textarea]:leading-[1.6] [&_textarea]:bg-[color:#fff] [&_textarea]:text-[color:var(--ink)] [&_textarea]:[transition:border-color_0.2s] [&_textarea]:resize-y [&_textarea]:py-3 [&_textarea]:px-3.5 [&_textarea]:border [&_textarea]:border-[color:#e0e7eb] [&_textarea]:border-solid [&_textarea]:rounded-[6px] [&_input::placeholder]:text-[color:#a4afb3] [&_input::placeholder]:text-[11px] [&_input:focus]:[outline:2px_solid_#e1f1f7] [&_input:focus]:[outline-offset:1px] [&_input:focus]:border-[color:#76b7d5] [&_textarea:focus]:[outline:2px_solid_#e1f1f7] [&_textarea:focus]:[outline-offset:1px] [&_textarea:focus]:border-[color:#76b7d5] [&_input:disabled]:bg-[color:#f6f8f9] [&_input:disabled]:text-[color:#95a2a7] [&_label_small]:text-[10px] [&_label_small]:font-normal [&_label_small]:text-[color:#97a3a8] [&_>_.checkbox-label]:flex-row [&_>_.checkbox-label]:items-start [&_>_.checkbox-label]:text-[10px] [&_>_.checkbox-label]:leading-[1.6] [&_>_.checkbox-label]:font-normal [&_>_.checkbox-label]:text-[color:#85929a] [&_>_.checkbox-label]:gap-[9px] mobile:gap-[19px] mobile:[&_>_label]:text-[11px] mobile:[&_input]:text-[12px] mobile:[&_input]:min-h-[47px] mobile:[&_input::placeholder]:text-[11px]"
                onSubmit={submit}
              >
                {activeTab === "password" ? (
                  [
                    ["current", "Mövcud şifrə"],
                    ["next", "Yeni şifrə"],
                    ["confirm", "Yeni şifrəni təkrar et"],
                  ].map(([key, label]) => (
                    <label key={key}>
                      {label}
                      <input
                        type="password"
                        autoComplete={
                          key === "current"
                            ? "current-password"
                            : "new-password"
                        }
                        required
                        minLength={key === "current" ? 1 : 8}
                        maxLength={128}
                        value={passwords[key]}
                        onChange={(event) =>
                          setPasswords((current) => ({
                            ...current,
                            [key]: event.target.value,
                          }))
                        }
                      />
                    </label>
                  ))
                ) : (
                  <>
                    <label>
                      Ad və soyad
                      <input
                        name="name"
                        autoComplete="name"
                        required
                        minLength={2}
                        maxLength={80}
                        value={values.name}
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            name: event.target.value,
                          }))
                        }
                      />
                    </label>
                    <label>
                      E-poçt ünvanı
                      <input type="email" value={user.email} disabled />
                      <small>Hesabın giriş ünvanı.</small>
                    </label>
                    <label>
                      Telefon
                      <input
                        type="tel"
                        autoComplete="tel"
                        maxLength={30}
                        value={values.phone}
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            phone: event.target.value,
                          }))
                        }
                      />
                    </label>
                    <label>
                      Ünvan
                      <input
                        autoComplete="street-address"
                        maxLength={240}
                        value={values.address}
                        onChange={(event) =>
                          setValues((current) => ({
                            ...current,
                            address: event.target.value,
                          }))
                        }
                      />
                    </label>
                  </>
                )}
                {error && (
                  <div
                    className="form-error bg-[color:#fff1ef] text-[color:#ac4b42] text-[12px] leading-[1.6] p-3 rounded-[6px] mobile:text-[11px]"
                    role="alert"
                  >
                    {error}
                  </div>
                )}
                <button
                  className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]"
                  type="submit"
                  disabled={pending}
                >
                  {pending ? "Saxlanılır…" : "Dəyişiklikləri saxla"}
                  <Icon name="check" size={18} />
                </button>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
