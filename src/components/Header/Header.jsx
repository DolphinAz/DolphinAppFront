import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../../state/ShopContext";
import Icon from "../Icon";
import logo from "../../assets/images/site-logo.png";

const links = [
  ["/books", "Kitablar"],
  ["/toys", "Oyuncaqlar"],
  ["/best-seller", "Bestseller"],
  ["/discounts", "Endirimlər"],
  ["/about", "Haqqımızda"],
  ["/contact", "Əlaqə"],
];
export default function Header() {
  const { user, cartCount, favorites } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function search(event) {
    event.preventDefault();
    navigate(
      `/books${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`,
    );
    setMenuOpen(false);
  }
  return (
    <>
      <div className="announcement">
        <div className="container announcement-inner">
          <span>Hər səhifədə yeni bir dünya.</span>
          <span>
            <Icon name="truck" size={16} /> 50 ₼-dan yuxarı çatdırılma pulsuz
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-main">
          <Link
            className="brand"
            to="/"
            onClick={() => setMenuOpen(false)}
            aria-label="Dolphin — ana səhifə"
          >
            <img src={logo} alt="" />
            <span>
              dolphin<span className="brand-dot">.</span>
              <small>kitab & sevinc</small>
            </span>
          </Link>
          <form className="search-form" role="search" onSubmit={search}>
            <Icon name="search" />
            <input
              aria-label="Kitab və ya müəllif axtar"
              placeholder="Növbəti hekayəni axtar..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="submit" aria-label="Axtar">
              <Icon name="arrow" size={19} />
            </button>
          </form>
          <div className="header-actions">
            <Link
              className="account-link"
              to={user ? "/profile" : "/login"}
              aria-label={user ? `Hesabım — ${user.name}` : "Giriş / Qeydiyyat"}
            >
              <Icon name="user" size={21} />
              <span>
                <small>{user ? "Xoş gəldiniz" : "Hesabım"}</small>
                <strong>
                  {user ? user.name.split(" ")[0] : "Giriş / Qeydiyyat"}
                </strong>
              </span>
            </Link>
            <span className="action-divider" />
            <Link
              className="icon-button"
              to="/favorites"
              aria-label={`Sevimlilər (${favorites.length})`}
            >
              <Icon name="heart" />
              {favorites.length > 0 && (
                <span className="count-badge">{favorites.length}</span>
              )}
            </Link>
            <Link
              className="icon-button"
              to="/cart"
              aria-label={`Səbət (${cartCount})`}
            >
              <Icon name="bag" />
              {cartCount > 0 && (
                <span className="count-badge">{cartCount}</span>
              )}
            </Link>
            <button
              className="icon-button menu-toggle"
              type="button"
              aria-label={menuOpen ? "Menyunu bağla" : "Menyunu aç"}
              aria-expanded={menuOpen}
              aria-controls="main-navigation"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
        <div className={`navigation-wrap ${menuOpen ? "navigation-open" : ""}`}>
          <nav
            className="container main-navigation"
            id="main-navigation"
            aria-label="Əsas naviqasiya"
          >
            <div>
              {links.map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  className={to === "/discounts" ? "discount-link" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                  {to === "/discounts" && <span className="nav-sale">%</span>}
                </NavLink>
              ))}
            </div>
            <span className="nav-note">
              <span /> Oxumağa həmişə vaxt var
            </span>
          </nav>
        </div>
      </header>
    </>
  );
}
