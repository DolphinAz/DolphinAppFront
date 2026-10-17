import { useState } from "react";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import toast from "react-hot-toast";
import { useShop } from "../../state/ShopContext";
import Icon from "../../components/Icon";
import Cover from "../../components/Cover";
import logo from "../../assets/images/site-logo.png";

export default function Auth() {
  const { user, books, authenticate } = useShop();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const register = pathname === "/register";
  const reset = pathname === "/reset-password";
  const next = params.get("next");
  const destination =
    next?.startsWith("/") &&
    !next.startsWith("//") &&
    !next.includes("\\") &&
    !/^\/(login|register|reset-password)([/?#]|$)/.test(next)
      ? next
      : "/profile";
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [terms, setTerms] = useState(false);
  if (user && !reset) return <Navigate to={destination} replace />;
  const change = (event) => {
    setValues((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setError("");
  };
  const switchPath = `${register ? "/login" : "/register"}${next ? `?next=${encodeURIComponent(destination)}` : ""}`;
  async function submit(event) {
    event.preventDefault();
    if (pending) return;
    if (register && values.password !== values.confirm) {
      setError("Şifrələr eyni olmalıdır.");
      return;
    }
    if (register && !terms) {
      setError("Brauzerdə yerli hesab yaradılmasını təsdiqləyin.");
      return;
    }
    setPending(true);
    setError("");
    try {
      await authenticate(values, register);
      toast.success(
        register
          ? "Hesabınız yaradıldı. Xoş gəldiniz!"
          : "Yenidən xoş gəldiniz!",
      );
      navigate(destination, { replace: true });
    } catch (issue) {
      setError(issue.message || "Əməliyyat baş tutmadı. Yenidən cəhd edin.");
    } finally {
      setPending(false);
    }
  }
  return (
    <main id="main-content" className="auth-page">
      <section className="auth-story">
        <Link className="brand" to="/">
          <img src={logo} alt="" />
          <span>
            dolphin<span className="brand-dot">.</span>
            <small>kitab & sevinc</small>
          </span>
        </Link>
        <div className="auth-story-content">
          <span className="eyebrow">HƏR SƏHİFƏ YENİ BAŞLANĞICDIR</span>
          <h2>
            Yaxşı hekayələr
            <br />
            bir yerdə başlayır.
          </h2>
          <p>
            Sevimli kitablarını seç. Xəyallarına yer aç.
            <br />
            Dolphin dünyasına xoş gəlmisən.
          </p>
          <div className="auth-book-scene">
            <div className="auth-book-one">
              <Cover product={books[3]} eager />
            </div>
            <div className="auth-book-two">
              <Cover product={books[1]} eager />
            </div>
            <span className="auth-spark">✦</span>
          </div>
        </div>
        <span className="auth-story-footer">Bir kitab. Min yeni dünya.</span>
      </section>
      <section className="auth-panel">
        <Link className="auth-back" to="/">
          <span>
            <Icon name="arrow" size={17} />
          </span>
          Mağazaya qayıt
        </Link>
        <div className="auth-form-wrap">
          <span className="auth-form-icon">
            <Icon
              name={register ? "sparkles" : reset ? "shield" : "book"}
              size={24}
            />
          </span>
          <span className="eyebrow">
            DOLPHIN AİLƏSİNƏ {register ? "QOŞUL" : "XOŞ GƏLDİN"}
          </span>
          <h1>
            {register
              ? "Yeni bir səhifə aç."
              : reset
                ? "Şifrə ilə bağlı kömək"
                : "Yenidən xoş gəldin."}
          </h1>
          <p className="auth-description">
            {register
              ? "Sevimlilərini və sifarişlərini bir hesabda saxla."
              : reset
                ? "Bu tətbiqdə hesablar yalnız bu brauzerdə saxlanılır."
                : "Hekayənə qaldığın yerdən davam et."}
          </p>
          {reset ? (
            <div className="reset-help">
              <p>
                E-poçt ilə şifrə bərpası qoşulmayıb. Hesabınıza girişiniz varsa,
                profilinizin “Şifrə” bölməsində mövcud şifrəni dəyişə
                bilərsiniz.
              </p>
              <p>
                Şifrəni unutmusunuzsa, başqa e-poçt ünvanı ilə yeni yerli hesab
                yarada bilərsiniz.
              </p>
              <Link className="button button-primary" to="/login">
                Girişə qayıt
              </Link>
            </div>
          ) : (
            <>
              <form className="form-stack" onSubmit={submit}>
                {register && (
                  <label>
                    Ad və soyad
                    <input
                      name="name"
                      autoComplete="name"
                      placeholder="Adınızı daxil edin"
                      required
                      minLength={2}
                      maxLength={80}
                      value={values.name}
                      onChange={change}
                    />
                  </label>
                )}
                <label>
                  E-poçt ünvanı
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="adiniz@misal.com"
                    required
                    maxLength={120}
                    value={values.email}
                    onChange={change}
                  />
                </label>
                <label>
                  Şifrə
                  <div className="password-field">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete={
                        register ? "new-password" : "current-password"
                      }
                      placeholder={
                        register ? "Ən azı 8 simvol" : "Şifrənizi daxil edin"
                      }
                      required
                      minLength={register ? 8 : 1}
                      maxLength={128}
                      value={values.password}
                      onChange={change}
                    />
                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Şifrəni gizlət" : "Şifrəni göstər"
                      }
                      aria-pressed={showPassword}
                      onClick={() => setShowPassword((value) => !value)}
                    >
                      <Icon name="eye" size={19} />
                    </button>
                  </div>
                </label>
                {register && (
                  <label>
                    Şifrəni təkrar et
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirm"
                      autoComplete="new-password"
                      placeholder="Şifrənizi yenidən daxil edin"
                      required
                      minLength={8}
                      maxLength={128}
                      value={values.confirm}
                      onChange={change}
                    />
                  </label>
                )}
                {register ? (
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={terms}
                      onChange={(event) => setTerms(event.target.checked)}
                      required
                    />
                    <span>
                      Məlumatlarımın bu brauzerdə saxlanılmasına razıyam.
                    </span>
                  </label>
                ) : (
                  <div className="form-aside">
                    <span>
                      <Icon name="shield" size={14} /> Giriş 30 gün saxlanılır
                    </span>
                    <Link to="/reset-password">Şifrəni unutmusan?</Link>
                  </div>
                )}
                {error && (
                  <div className="form-error" role="alert">
                    {error}
                  </div>
                )}
                <button
                  className="button button-primary auth-submit"
                  disabled={pending}
                  type="submit"
                >
                  {pending
                    ? "Gözləyin…"
                    : register
                      ? "Hesab yarat"
                      : "Daxil ol"}
                  {!pending && <Icon name="arrow" size={18} />}
                </button>
              </form>
              <p className="auth-switch">
                {register ? "Artıq hesabın var?" : "Hələ hesabın yoxdur?"}{" "}
                <Link to={switchPath}>
                  {register ? "Daxil ol" : "Qeydiyyatdan keç"}
                </Link>
              </p>
              <div className="local-account-note">
                <Icon name="shield" size={16} />
                <p>
                  Yerli hesab: məlumatlar bu cihazın brauzerində saxlanılır.
                  Başqa cihazlarla sinxronlaşmır.
                </p>
              </div>
            </>
          )}
        </div>
        <span className="auth-copyright">
          © {new Date().getFullYear()} Dolphin. Sevərək oxu.
        </span>
      </section>
    </main>
  );
}
