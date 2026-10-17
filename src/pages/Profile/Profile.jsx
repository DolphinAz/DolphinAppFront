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
    <main id="main-content" className="container standard-page">
      <div className="profile-heading">
        <span className="profile-avatar">
          {user.name.slice(0, 1).toLocaleUpperCase("az")}
        </span>
        <div>
          <span className="eyebrow">SƏNİN DOLPHIN DÜNYAN</span>
          <h1>Salam, {user.name.split(" ")[0]}.</h1>
          <p>Yeni hekayələrə hazırsan?</p>
        </div>
      </div>
      <div className="profile-layout">
        <aside className="profile-navigation">
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
          <p>Məlumatların yalnız bu brauzerdə saxlanılır.</p>
        </aside>
        <section className="surface-card profile-content">
          {activeTab === "orders" ? (
            <>
              <h2>Sifarişlərim</h2>
              {orders.length ? (
                <div className="orders-list">
                  {orders.map((order) => (
                    <article className="order-card" key={order.id}>
                      <div className="order-card-heading">
                        <div>
                          <strong>{order.id}</strong>
                          <small>
                            {new Date(order.createdAt).toLocaleDateString(
                              "az-AZ",
                            )}
                          </small>
                        </div>
                        <span className="order-status">{order.status}</span>
                      </div>
                      {order.items.map(({ product, quantity }) => (
                        <div key={product.id} className="order-product">
                          <Link to={`/detail/${product.id}`}>
                            {product.title} <small>× {quantity}</small>
                          </Link>
                          <strong>{money(product.price * quantity)}</strong>
                        </div>
                      ))}
                      <div className="order-total">
                        <span>Çatdırılma daxil cəmi</span>
                        <strong>{money(order.total)}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state compact-empty">
                  <Icon name="bag" size={36} />
                  <h3>İlk sifarişin səni gözləyir</h3>
                  <p>Sevdiyin kitabı seçərək başla.</p>
                  <Link className="button button-primary" to="/books">
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
              <p className="muted">
                {activeTab === "password"
                  ? "Dəyişiklik növbəti girişdə qüvvədə olacaq."
                  : "Məlumatlarını yenilə və rahat alış-verişə davam et."}
              </p>
              <form className="form-stack" onSubmit={submit}>
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
                  <div className="form-error" role="alert">
                    {error}
                  </div>
                )}
                <button
                  className="button button-primary"
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
