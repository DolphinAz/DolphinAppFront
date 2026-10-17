import { useState } from "react";
import { Link } from "react-router-dom";
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
    <main id="main-content" className="container standard-page">
      <div className="contact-layout">
        <div className="contact-intro">
          <span className="eyebrow">SƏNİ DİNLƏMƏYƏ HAZIRIQ</span>
          <h1>
            Bir söhbətlə
            <br />
            başlayaq.
          </h1>
          <p>
            Kitablar, oyuncaqlar və ya növbəti sevimlin haqqında bir sualın var?
            Fikirlərini bizimlə bölüş.
          </p>
          <div className="contact-info">
            <Icon name="book" size={25} />
            <div>
              <strong>Yeni bir hekayə axtarırsan?</strong>
              <p>Kolleksiyamızda öz dünyanı tap.</p>
              <Link className="text-link" to="/books">
                Kitablara bax <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
          <div className="info-note">
            <Icon name="mail" size={20} />
            <p>
              Əlaqə xidməti hələ qoşulmayıb. Bu forma mesajını yalnız bu
              brauzerdə qaralama kimi saxlayır.
            </p>
          </div>
        </div>
        <section className="surface-card contact-form">
          {saved ? (
            <div className="empty-state compact-empty">
              <span className="success-circle">
                <Icon name="check" size={30} />
              </span>
              <h2>Qaralaman saxlanıldı</h2>
              <p>
                Mesaj bu brauzerdə saxlanılıb. Hələ komandaya göndərilməyib.
              </p>
              <button
                className="button button-outline"
                onClick={() => {
                  setSaved(false);
                  setValues((current) => ({ ...current, message: "" }));
                }}
              >
                Yeni qaralama
              </button>
            </div>
          ) : (
            <form className="form-stack" onSubmit={submit}>
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
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <button className="button button-primary" type="submit">
                Qaralama kimi saxla <Icon name="arrow" size={18} />
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
