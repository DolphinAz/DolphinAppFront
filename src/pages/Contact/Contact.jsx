import { useState } from "react";
import { useShop } from "../../state/ShopContext";
import { readStorage, writeStorage } from "../../services/storage";
import Icon from "../../components/Icon";

export default function Contact() {
  const { user } = useShop();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    name: user?.name || "",
    email: user?.email || "",
    message: "",
  });
  function submit(event) {
    event.preventDefault();
    if (!values.name.trim() || !values.message.trim()) {
      setError("Adınızı və mesajınızı daxil edin.");
      return;
    }
    const old = readStorage("dolphin.contact-drafts.v1", []);
    if (
      writeStorage("dolphin.contact-drafts.v1", [
        ...(Array.isArray(old) ? old : []),
        { ...values, createdAt: new Date().toISOString() },
      ])
    )
      setSaved(true);
    else setError("Mesajı saxlamaq mümkün olmadı. Brauzer yaddaşını yoxlayın.");
  }
  return (
    <main
      id="main-content"
      className="container standard-page w-[min(1280px,_calc(100%_-_96px))] pt-12 pb-[75px] min-h-[55vh] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)] mobile:pt-[30px] mobile:pb-[50px] [&_>_.section-heading]:mb-[38px] mobile:[&_h1]:text-[31px] mobile:[&_h1]:tracking-[-1px] mobile:[&_>_.section-heading]:items-start mobile:[&_>_.section-heading]:flex-col mobile:[&_>_.section-heading]:mb-7 mobile:[&_>_.section-heading]:gap-5 mobile:[&_>_.section-heading_p]:text-[11px] mobile:[&_>_.section-heading_>_.text-link]:text-[11px]"
    >
      <div className="contact-layout grid grid-cols-[1fr_1fr] gap-[100px] compact:gap-[60px] tablet:gap-[35px] mobile:grid-cols-[1fr] mobile:gap-[30px]">
        <div className="contact-intro [&_h1]:text-[48px] [&_>_p]:text-[14px] [&_>_p]:text-[color:#8c9ba2] [&_>_p]:leading-[1.8] [&_>_p]:mt-[22px] [&_>_p]:max-w-[400px] [&_>_.info-note]:mt-[35px] tablet:[&_h1]:text-[40px] tablet:[&_>_p]:text-[12px] mobile:[&_h1]:text-[39px] mobile:[&_>_p]:text-[12px] mobile:[&_>_p]:mt-[19px] mobile:[&_>_.info-note]:mt-[26px]">
          <span className="eyebrow block text-[10px] font-bold tracking-[1.7px] text-[color:var(--blue)] mb-3">
            SƏNİ DİNLƏMƏYƏ HAZIRIQ
          </span>
          <h1>
            Bir söhbətlə
            <br />
            başlayaq.
          </h1>
          <p>
            Kitablar, oyuncaqlar və ya növbəti sevimlin haqqında bir sualın var?
            Fikirlərini bizimlə bölüş.
          </p>
        </div>
        <section className="surface-card contact-form bg-[color:#fff] p-[33px] border border-[color:#e4ebee] border-solid rounded-[10px] [&_h2]:text-[23px] [&_h2]:tracking-[-0.6px] [&_h2]:mb-[7px] [&_.form-stack]:m-0 mobile:py-[25px] mobile:px-[21px] mobile:[&_h2]:text-[23px] mobile:[&_.button]:text-[11px]">
          {saved ? (
            <div className="empty-state compact-empty min-h-[250px] flex items-center justify-center flex-col text-center py-[30px] px-2.5 gap-[15px] [&_>_svg]:text-[color:#7fa6b0] [&_>_svg]:mb-[5px] [&_h2]:text-[25px] [&_p]:text-[13px] [&_p]:text-[color:#839098] [&_p]:max-w-[510px] [&_.button]:mt-1.5 [&_h1]:text-[33px] [&_h1]:tracking-[-1px] mobile:min-h-[300px] mobile:py-10 mobile:px-3 mobile:gap-3.5 mobile:[&_h2]:text-[23px] mobile:[&_p]:text-[11px] mobile:[&_h1]:text-[26px] mobile:[&_h1]:leading-[1.4] mobile:[&_>_.button]:text-[11px] [&_h3]:text-[20px]">
              <span className="success-circle w-[67px] h-[67px] grid place-items-center bg-[color:#e9f3ec] text-[color:#7aa38a] mb-[7px] rounded-full">
                <Icon name="check" size={30} />
              </span>
              <h2>Qaralaman saxlanıldı</h2>
              <p>
                Mesaj bu brauzerdə saxlanılıb. Hələ komandaya göndərilməyib.
              </p>
              <button
                className="button button-outline inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:white] py-[13px] px-[23px] border border-[color:#d8e1e5] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:#f4f8fa]"
                onClick={() => {
                  setSaved(false);
                  setValues((current) => ({ ...current, message: "" }));
                }}
              >
                Yeni qaralama
              </button>
            </div>
          ) : (
            <form
              className="form-stack flex flex-col gap-5 [&_>_label]:flex [&_>_label]:flex-col [&_>_label]:text-[11px] [&_>_label]:font-[550] [&_>_label]:text-[color:#49616c] [&_>_label]:gap-2 [&_input]:w-full [&_input]:min-h-[45px] [&_input]:text-[12px] [&_input]:leading-[1.6] [&_input]:bg-[color:#fff] [&_input]:text-[color:var(--ink)] [&_input]:[transition:border-color_0.2s] [&_input]:py-3 [&_input]:px-3.5 [&_input]:border [&_input]:border-[color:#e0e7eb] [&_input]:border-solid [&_input]:rounded-[6px] [&_textarea]:w-full [&_textarea]:min-h-[120px] [&_textarea]:text-[12px] [&_textarea]:leading-[1.6] [&_textarea]:bg-[color:#fff] [&_textarea]:text-[color:var(--ink)] [&_textarea]:[transition:border-color_0.2s] [&_textarea]:resize-y [&_textarea]:py-3 [&_textarea]:px-3.5 [&_textarea]:border [&_textarea]:border-[color:#e0e7eb] [&_textarea]:border-solid [&_textarea]:rounded-[6px] [&_input::placeholder]:text-[color:#a4afb3] [&_input::placeholder]:text-[11px] [&_input:focus]:[outline:2px_solid_#e1f1f7] [&_input:focus]:[outline-offset:1px] [&_input:focus]:border-[color:#76b7d5] [&_textarea:focus]:[outline:2px_solid_#e1f1f7] [&_textarea:focus]:[outline-offset:1px] [&_textarea:focus]:border-[color:#76b7d5] [&_input:disabled]:bg-[color:#f6f8f9] [&_input:disabled]:text-[color:#95a2a7] [&_label_small]:text-[10px] [&_label_small]:font-normal [&_label_small]:text-[color:#97a3a8] [&_>_.checkbox-label]:flex-row [&_>_.checkbox-label]:items-start [&_>_.checkbox-label]:text-[10px] [&_>_.checkbox-label]:leading-[1.6] [&_>_.checkbox-label]:font-normal [&_>_.checkbox-label]:text-[color:#85929a] [&_>_.checkbox-label]:gap-[9px] mobile:gap-[19px] mobile:[&_>_label]:text-[11px] mobile:[&_input]:text-[12px] mobile:[&_input]:min-h-[47px] mobile:[&_input::placeholder]:text-[11px]"
              onSubmit={submit}
            >
              <h2>Fikirlərini bölüş</h2>
              <label>
                Ad və soyad
                <input
                  required
                  autoComplete="name"
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
                <input
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={120}
                  value={values.email}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Mesajın
                <textarea
                  required
                  rows={5}
                  maxLength={3000}
                  value={values.message}
                  onChange={(event) =>
                    setValues((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                />
              </label>
              {error && (
                <p
                  className="form-error bg-[color:#fff1ef] text-[color:#ac4b42] text-[12px] leading-[1.6] p-3 rounded-[6px] mobile:text-[11px]"
                  role="alert"
                >
                  {error}
                </p>
              )}
              <button
                className="button button-primary inline-flex items-center justify-center min-h-[49px] text-[13px] font-[650] leading-[1.6] [transition:background_0.2s,_transform_0.2s] whitespace-normal bg-[color:var(--blue)] text-white py-[13px] px-[23px] border border-[color:transparent] border-solid rounded-[7px] gap-4 [&:hover]:[transform:translateY(-1px)] [&:hover]:bg-[color:var(--blue-dark)]"
                type="submit"
              >
                Qaralama kimi saxla <Icon name="arrow" size={18} />
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
