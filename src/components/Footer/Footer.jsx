import { Link } from "react-router-dom";
import Icon from "../Icon";
import logo from "../../assets/images/site-logo.png";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link className="brand" to="/">
            <img src={logo} alt="" />
            <span>
              dolphin<span className="brand-dot">.</span>
              <small>kitab & sevinc</small>
            </span>
          </Link>
          <p>
            Böyük hekayələrə, kiçik sevinclərə və hər yaşda kəşf etməyə
            inananlar üçün.
          </p>
          <span className="footer-signature">Bir kitab. Min yeni dünya.</span>
        </div>
        <div>
          <h3>Kəşf et</h3>
          <Link to="/books">Bütün kitablar</Link>
          <Link to="/best-seller">Ən çox satılanlar</Link>
          <Link to="/discounts">Endirimli məhsullar</Link>
          <Link to="/toys">Oyuncaqlar</Link>
        </div>
        <div>
          <h3>Dolphin</h3>
          <Link to="/about">Haqqımızda</Link>
          <Link to="/contact">Bizimlə əlaqə</Link>
          <Link to="/profile">Hesabım</Link>
          <Link to="/orders">Sifarişlərim</Link>
        </div>
        <div className="footer-note">
          <span className="footer-book-icon">
            <Icon name="book" size={27} />
          </span>
          <h3>Yeni bir səhifə aç.</h3>
          <p>Növbəti sevimli kitabın səni burada gözləyir.</p>
          <Link to="/books" className="text-link">
            Kolleksiyanı kəşf et <Icon name="arrow" size={17} />
          </Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} Dolphin. Bütün hüquqlar qorunur.
        </span>
        <span>
          Kitab məlumatları:{" "}
          <a href="https://openlibrary.org" target="_blank" rel="noreferrer">
            Open Library
          </a>
        </span>
      </div>
    </footer>
  );
}
