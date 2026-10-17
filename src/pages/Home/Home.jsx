import { Link } from "react-router-dom";
import { useShop } from "../../state/ShopContext";
import ProductSection from "../../components/ProductSection";
import Cover from "../../components/Cover";
import Icon from "../../components/Icon";
import { categories } from "../../data/catalog";

export default function Home() {
  const { books, toys } = useShop();
  return (
    <main id="main-content">
      <section className="container hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="small-line" /> SƏNİN HEKAYƏN BURADAN BAŞLAYIR
          </span>
          <h1>
            Bir kitab aç.
            <br />
            Yeni bir <em>dünya</em> kəşf et.
          </h1>
          <p>
            İlham verən kitablar, xəyal gücünü böyüdən oyuncaqlar.
            <br className="desktop-break" /> Özün və sevdiklərin üçün kiçik bir
            sevinc tap.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/books">
              Kitabları kəşf et <Icon name="arrow" size={19} />
            </Link>
            <Link className="hero-secondary" to="/best-seller">
              Ən çox sevilənlər <Icon name="chevron" size={16} />
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="hero-avatars">
              <span>A</span>
              <span>N</span>
              <span>L</span>
            </span>
            <span>
              Hər oxucu üçün <strong>yeni bir hekayə.</strong>
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <span className="hero-spark spark-one">✦</span>
          <span className="hero-spark spark-two">✧</span>
          <span className="hero-caption">SƏHİFƏLƏR ARASINDA İTİR...</span>
          <Link
            className="hero-book hero-book-left"
            to={`/detail/${books[3].id}`}
          >
            <Cover product={books[3]} eager />
          </Link>
          <Link
            className="hero-book hero-book-center"
            to={`/detail/${books[0].id}`}
          >
            <Cover product={books[0]} eager />
          </Link>
          <Link
            className="hero-book hero-book-right"
            to={`/detail/${books[1].id}`}
          >
            <Cover product={books[1]} eager />
          </Link>
          <div className="hero-sticker">
            <Icon name="book" size={21} />
            <span>
              Yeni favoritini
              <br />
              <strong>tapmağın vaxtıdır</strong>
            </span>
          </div>
          <span className="hero-visual-bottom">Seç, oxu, yenidən kəşf et.</span>
        </div>
      </section>
      <div className="container benefits-strip">
        {[
          ["truck", "Rahat çatdırılma", "50 ₼-dan yuxarı pulsuz"],
          ["book", "Hər zövqə bir kitab", "Diqqətlə seçilmiş kolleksiya"],
          ["gift", "Kiçiklərə böyük sevinc", "Öyrədən, sevindirən oyuncaqlar"],
          ["heart", "Sevərək seçirik", "Sənin növbəti sevimlin üçün"],
        ].map(([icon, title, text]) => (
          <div key={icon}>
            <span>
              <Icon name={icon} size={24} />
            </span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <section className="container category-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MARAĞININ ARDINCA GET</span>
            <h2>Sənin dünyan hansıdır?</h2>
          </div>
          <Link to="/books" className="text-link">
            Bütün kateqoriyalar <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="category-grid">
          {[
            ["Bədii ədəbiyyat", "Hər həyatdan bir hekayə", "book"],
            ["Şəxsi inkişaf", "Özünün yeni versiyası", "sparkles"],
            ["Uşaq kitabları", "Balaca böyük xəyallar", "star"],
            ["Fantastika", "Sərhədsiz xəyal gücü", "gift"],
          ].map(([name, subtitle, icon], index) => (
            <Link
              className={`category-card category-${index}`}
              to={`/books?category=${encodeURIComponent(name)}`}
              key={name}
            >
              <span className="category-symbol">
                <Icon name={icon} size={30} />
              </span>
              <strong>{name}</strong>
              <small>{subtitle}</small>
              <span className="category-arrow">
                <Icon name="arrow" size={17} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <ProductSection
        eyebrow="RƏFİMİZİN ULDUZLARI"
        title="Ən çox sevilən kitablar"
        description="Oxucuların dönə-dönə qayıtdığı hekayələr."
        products={books.filter((book) => book.bestseller).slice(0, 6)}
        to="/best-seller"
      />
      <section className="container reading-banner">
        <div>
          <span className="eyebrow">BALACA KƏŞFÇİLƏR ÜÇÜN</span>
          <h2>
            Oyunla başlar.
            <br />
            Xəyalla böyüyər.
          </h2>
          <p>Yaradıcılığı oyadan, hər günə rəng qatan oyuncaqlar.</p>
          <Link className="button button-dark" to="/toys">
            Oyuncaqları kəşf et <Icon name="arrow" size={18} />
          </Link>
        </div>
        <div className="banner-toy">
          <Cover product={toys[0]} />
          <span>
            kiçik əllər,
            <br />
            <em>böyük ideyalar.</em>
          </span>
        </div>
      </section>
      <ProductSection
        eyebrow="YAXŞI KİTAB, DAHA YAXŞI QİYMƏT"
        title="Qaçırılmayacaq endirimlər"
        products={books.filter((book) => book.originalPrice).slice(0, 6)}
        to="/discounts"
      />
      <section className="container discovery-note">
        <Icon name="book" size={35} />
        <h2>Hər yaxşı gün bir kitabla başlaya bilər.</h2>
        <p>{categories.length - 1} fərqli kitab kateqoriyası. Sonsuz kəşf.</p>
        <Link to="/books" className="text-link">
          Öz hekayəni tap <Icon name="arrow" size={18} />
        </Link>
      </section>
    </main>
  );
}
