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
import Brand from "../../components/Brand";

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
    <main
      id="main-content"
      className="auth-page min-h-[100vh] grid grid-cols-[1fr_1fr] mobile:grid-cols-[1fr] mobile:min-h-[100dvh]"
    >
      <section className="auth-story bg-[color:#edf4f1] flex flex-col justify-between relative overflow-hidden py-[34px] px-[55px] [&:before]:absolute [&:before]:content-[''] [&:before]:w-[580px] [&:before]:h-[580px] [&:before]:bottom-[-150px] [&:before]:left-[50%] [&:before]:[transform:translateX(-50%)] [&:before]:pointer-events-none [&:before]:border [&:before]:border-[color:#d9e7e0] [&:before]:border-solid [&:before]:rounded-full [&_h2]:text-[43px] [&_h2]:text-[color:#2b4e52] [&_h2]:leading-[1.28] [&_h2]:tracking-[-1.7px] [&_h2]:mb-[18px] compact:px-9 compact:[&_h2]:text-[36px] tablet:px-7 tablet:[&_h2]:text-[32px] mobile:hidden">
        <Brand />
        <div className="auth-story-content mt-10 mb-2.5 z-[1] [&_>_.eyebrow]:text-[9px] [&_>_.eyebrow]:tracking-[1.8px] [&_>_p]:text-[12px] [&_>_p]:text-[color:#7e9694] [&_>_p]:leading-[1.8] tablet:[&_>_.eyebrow]:text-[7px] tablet:[&_>_p]:text-[11px]">
          <span className="eyebrow block text-[10px] font-bold tracking-[1.7px] text-[color:var(--blue)] mb-3">
            HƏR SƏHİFƏ YENİ BAŞLANĞICDIR
          </span>
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
          <div className="auth-book-scene h-[280px] relative max-w-[380px] mt-[25px] ml-[15px] tablet:ml-0 tablet:[transform:scale(0.9)] tablet:[transform-origin:left_center]">
            <div className="auth-book-one absolute [filter:drop-shadow(8px_15px_10px_#35585b35)] h-[222px] w-[148px] left-[35px] top-[25px] [transform:rotate(-13deg)] tablet:left-[5px]">
              <Cover product={books[3]} eager />
            </div>
            <div className="auth-book-two absolute [filter:drop-shadow(8px_15px_10px_#35585b35)] h-[222px] w-[148px] left-[168px] top-[13px] [transform:rotate(12deg)] tablet:left-[136px]">
              <Cover product={books[1]} eager />
            </div>
            <span className="auth-spark absolute top-[15px] right-[15px] text-[28px] text-[color:#b09b67]">
              ✦
            </span>
          </div>
        </div>
        <span className="auth-story-footer text-[10px] font-editorial italic text-[color:#88a39d] z-[1]">
          Bir kitab. Min yeni dünya.
        </span>
      </section>
      <section className="auth-panel pt-[38px] pb-[22px] flex flex-col items-center min-w-0 px-[52px] compact:px-[35px] tablet:px-[29px] mobile:min-h-[100dvh] mobile:py-6 mobile:px-[25px]">
        <Link
          className="auth-back flex items-center [align-self:flex-start] text-[10px] text-[color:#83929a] gap-2 [&_>_span]:flex [&_>_span]:[transform:rotate(180deg)] mobile:text-[10px]"
          to="/"
        >
          <span>
            <Icon name="arrow" size={17} />
          </span>
          Mağazaya qayıt
        </Link>
        <div className="auth-form-wrap w-full max-w-[370px] py-[35px] px-0 my-auto [&_>_.eyebrow]:text-[9px] [&_>_.eyebrow]:tracking-[1.3px] [&_h1]:text-[29px] [&_h1]:tracking-[-1.2px] [&_h1]:leading-[1.3] tablet:[&_h1]:text-[26px] tablet:[&_>_.eyebrow]:text-[8px] mobile:max-w-[390px] mobile:py-[35px] mobile:[&_h1]:text-[30px] mobile:[&_h1]:tracking-[-1.1px] mobile:[&_>_.eyebrow]:text-[8px] mobile:[&_>_.eyebrow]:tracking-[1.3px]">
          <span className="auth-form-icon grid place-items-center w-[47px] h-[47px] text-[color:var(--blue)] bg-[color:#eaf4f7] mb-[23px] rounded-[11px] mobile:mb-[22px]">
            <Icon
              name={register ? "sparkles" : reset ? "shield" : "book"}
              size={24}
            />
          </span>
          <span className="eyebrow block text-[10px] font-bold tracking-[1.7px] text-[color:var(--blue)] mb-3">
            DOLPHIN AİLƏSİNƏ {register ? "QOŞUL" : "XOŞ GƏLDİN"}
          </span>
          <h1>
            {register
              ? "Yeni bir səhifə aç."
              : reset
                ? "Şifrə ilə bağlı kömək"
                : "Yenidən xoş gəldin."}
          </h1>
          <p className="auth-description text-[11px] text-[color:#8b979d] mt-3 mb-[29px] mobile:text-[11px] mobile:leading-[1.8] mobile:mb-[25px]">
            {register
              ? "Sevimlilərini və sifarişlərini bir hesabda saxla."
              : reset
                ? "Bu tətbiqdə hesablar yalnız bu brauzerdə saxlanılır."
                : "Hekayənə qaldığın yerdən davam et."}
          </p>
          {reset ? (
            <div className="reset-help [&_p]:text-[12px] [&_p]:text-[color:#7b8e98] [&_p]:mb-5 [&_.button]:mt-2">
              <p>
                E-poçt ilə şifrə bərpası qoşulmayıb. Hesabınıza girişiniz varsa,
                profilinizin “Şifrə” bölməsində mövcud şifrəni dəyişə
                bilərsiniz.
              </p>
              <p>
                Şifrəni unutmusunuzsa, başqa e-poçt ünvanı ilə yeni yerli hesab
                yarada bilərsiniz.
              </p>
              <Link
                className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]"
                to="/login"
              >
                Girişə qayıt
              </Link>
            </div>
          ) : (
            <>
              <form
                className="form-stack flex flex-col gap-5 [&_>_label]:flex [&_>_label]:flex-col [&_>_label]:text-[11px] [&_>_label]:font-[550] [&_>_label]:text-[color:#49616c] [&_>_label]:gap-2 [&_input]:w-full [&_input]:min-h-[45px] [&_input]:text-[12px] [&_input]:leading-[1.6] [&_input]:bg-[color:#fff] [&_input]:text-[color:var(--ink)] [&_input]:[transition:border-color_0.2s] [&_input]:py-3 [&_input]:px-3.5 [&_input]:border [&_input]:border-[color:#e0e7eb] [&_input]:border-solid [&_input]:rounded-[6px] [&_textarea]:w-full [&_textarea]:min-h-[120px] [&_textarea]:text-[12px] [&_textarea]:leading-[1.6] [&_textarea]:bg-[color:#fff] [&_textarea]:text-[color:var(--ink)] [&_textarea]:[transition:border-color_0.2s] [&_textarea]:resize-y [&_textarea]:py-3 [&_textarea]:px-3.5 [&_textarea]:border [&_textarea]:border-[color:#e0e7eb] [&_textarea]:border-solid [&_textarea]:rounded-[6px] [&_input::placeholder]:text-[color:#a4afb3] [&_input::placeholder]:text-[11px] [&_input:focus]:[outline:2px_solid_#e1f1f7] [&_input:focus]:[outline-offset:1px] [&_input:focus]:border-[color:#76b7d5] [&_textarea:focus]:[outline:2px_solid_#e1f1f7] [&_textarea:focus]:[outline-offset:1px] [&_textarea:focus]:border-[color:#76b7d5] [&_input:disabled]:bg-[color:#f6f8f9] [&_input:disabled]:text-[color:#95a2a7] [&_label_small]:text-[10px] [&_label_small]:font-normal [&_label_small]:text-[color:#97a3a8] [&_>_.checkbox-label]:flex-row [&_>_.checkbox-label]:items-start [&_>_.checkbox-label]:text-[10px] [&_>_.checkbox-label]:leading-[1.6] [&_>_.checkbox-label]:font-normal [&_>_.checkbox-label]:text-[color:#85929a] [&_>_.checkbox-label]:gap-[9px] mobile:gap-[19px] mobile:[&_>_label]:text-[11px] mobile:[&_input]:text-[12px] mobile:[&_input]:min-h-[47px] mobile:[&_input::placeholder]:text-[11px]"
                onSubmit={submit}
              >
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
                  <div className="password-field relative [&_input]:pr-[46px] [&_button]:absolute [&_button]:right-[9px] [&_button]:top-[50%] [&_button]:[transform:translateY(-50%)] [&_button]:flex [&_button]:text-[color:#94a2a9] [&_button]:p-[5px]">
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
                  <label className="checkbox-label [&.checkbox-label_input]:w-3.5 [&.checkbox-label_input]:h-3.5 [&.checkbox-label_input]:min-h-3.5 [&.checkbox-label_input]:mt-0.5 [&.checkbox-label_input]:mb-0 [&.checkbox-label_input]:[accent-color:var(--blue)] [&.checkbox-label_input]:shrink-0 [&.checkbox-label_input]:mx-0 mobile:[&.checkbox-label_input]:min-h-[47px]">
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
                  <div className="form-aside flex items-center justify-between text-[9px] text-[color:#96a4a9] gap-3 [&_>_span]:flex [&_>_span]:items-center [&_>_span]:gap-[5px] [&_a]:text-[color:var(--blue)] [&_a]:text-[10px] tablet:text-[8px] tablet:[&_a]:text-[9px] mobile:text-[8px] mobile:[&_a]:text-[10px]">
                    <Link to="/reset-password">Şifrəni unutmusan?</Link>
                  </div>
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
                  className="button button-primary auth-submit inline-flex items-center justify-center min-h-[47px] text-[12px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white w-full py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)] mobile:text-[12px] mobile:min-h-12"
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
              <p className="auth-switch text-center text-[11px] text-[color:#8a979e] mt-[23px] [&_a]:text-[color:var(--blue)] [&_a]:font-semibold [&_a]:ml-1 mobile:text-[11px]">
                {register ? "Artıq hesabın var?" : "Hələ hesabın yoxdur?"}{" "}
                <Link to={switchPath}>
                  {register ? "Daxil ol" : "Qeydiyyatdan keç"}
                </Link>
              </p>
            </>
          )}
        </div>
        <span className="auth-copyright text-[9px] text-[color:#a4afb4] mt-[18px] mobile:text-[8px]">
          © {new Date().getFullYear()} Dolphin. Sevərək oxu.
        </span>
      </section>
    </main>
  );
}
