import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useShop } from "../../state/ShopContext";
import Icon from "../Icon";
import Brand from "../Brand";

const links = [
  ["/books", "Kitablar"],
  ["/toys", "Oyuncaqlar"],
  ["/best-seller", "Bestseller"],
  ["/discounts", "Endirimlər"],
  ["/about", "Haqqımızda"],
  ["/contact", "Əlaqə"],
];
export default function Header() {
  const { user, cartCount, favorites, logout } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  const accountButtonRef = useRef(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setAccountOpen(false);
  }, [location.pathname, location.search]);
  useEffect(() => {
    if (!accountOpen) return;
    const outside = (event) => {
      if (!accountRef.current?.contains(event.target)) setAccountOpen(false);
    };
    const escape = (event) => {
      if (event.key === "Escape") {
        setAccountOpen(false);
        accountButtonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [accountOpen]);
  function search(event) {
    event.preventDefault();
    navigate(
      `/books${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`,
    );
    setMenuOpen(false);
  }
  return (
    <>
      <div className="announcement bg-[color:#eef6f8] text-[10px] text-[color:#4f6e7a]"></div>
      <header className="site-header bg-[color:#fff]">
        <div className="container header-main w-[min(1280px,_calc(100%_-_96px))] h-[99px] flex items-center mx-auto gap-[52px] wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] compact:gap-[25px] tablet:w-[calc(100%_-_48px)] tablet:h-[86px] tablet:gap-[25px] mobile:w-[calc(100%_-_36px)] mobile:h-auto mobile:min-h-[122px] mobile:flex mobile:flex-wrap mobile:pt-[15px] mobile:pb-[13px] mobile:gap-0">
          <Brand onClick={() => setMenuOpen(false)} />
          <form
            className="search-form h-11 flex items-center [flex:1] max-w-[480px] bg-[color:#f6f8f9] text-[color:#86959b] ml-5 py-0 px-3.5 border border-[color:#edf0f1] border-solid rounded-[7px] [&_input]:w-full [&_input]:min-w-0 [&_input]:bg-[color:transparent] [&_input]:text-[12px] [&_input]:text-[color:var(--ink)] [&_input]:[outline:none] [&_input]:py-2.5 [&_input]:px-3 [&_input]:border-0 [&_input]:border-[color:currentColor] [&_input]:border-none [&_button]:flex [&_button]:items-center [&_button]:justify-center [&_button]:text-[color:#668593] [&_button]:p-[5px] [&:focus-within]:shadow-[0_0_0_3px_#cae9f5] compact:ml-0 mobile:[order:3] mobile:w-full mobile:max-w-[none] mobile:basis-full mobile:h-[37px] mobile:mt-[15px] mobile:px-2.5 mobile:[&_input]:text-[10px] mobile:[&_input]:p-[9px] mobile:[&_>_svg]:w-[17px]"
            role="search"
            onSubmit={search}
          >
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
          <div className="header-actions flex items-center ml-auto gap-5 compact:gap-[15px] tablet:gap-[15px] mobile:gap-2.5 mobile:[&_.icon-button]:w-[22px] mobile:[&_svg]:w-[19px] mobile:[&_svg]:h-[19px]">
            <div
              className="account-menu relative"
              ref={accountRef}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setAccountOpen(false);
              }}
            >
              <button
                ref={accountButtonRef}
                type="button"
                className="account-link flex items-center text-left py-1.5 px-0 gap-2.5 [&[aria-expanded=true]_.account-chevron]:[transform:rotate(-90deg)] [&_>_span]:grid [&_>_span]:gap-1 [&_small]:text-[9px] [&_small]:text-[color:var(--muted)] [&_strong]:text-[11px] [&_strong]:font-semibold compact:[&_strong]:text-[10px] tablet:[&_>_span]:hidden mobile:mr-[1px]"
                aria-label={
                  user ? `Hesabım — ${user.name}` : "Giriş / Qeydiyyat"
                }
                aria-expanded={accountOpen}
                aria-controls="account-navigation"
                onClick={() => setAccountOpen((value) => !value)}
              >
                <Icon name="user" size={21} />
                <span>
                  <small>{user ? "Xoş gəldiniz" : "Hesabım"}</small>
                  <strong>
                    {user ? user.name.split(" ")[0] : "Giriş / Qeydiyyat"}
                  </strong>
                </span>
                <Icon
                  name="chevron"
                  size={13}
                  className="account-chevron [transform:rotate(90deg)] [transition:transform_0.2s]"
                />
              </button>
              {accountOpen && (
                <nav
                  id="account-navigation"
                  className="account-dropdown absolute top-[calc(100%_+_12px)] right-0 w-[235px] max-w-[calc(100vw_-_36px)] bg-[color:#fff] shadow-[0_12px_36px_#20384520] z-[30] p-2 border border-[color:var(--line)] border-solid rounded-[12px] [&_a]:flex [&_a]:items-center [&_a]:w-full [&_a]:text-[12px] [&_a]:text-left [&_a]:p-3 [&_a]:rounded-[6px] [&_a]:gap-2.5 [&_>_button]:flex [&_>_button]:items-center [&_>_button]:w-full [&_>_button]:text-[12px] [&_>_button]:text-left [&_>_button]:p-3 [&_>_button]:rounded-[6px] [&_>_button]:gap-2.5 [&_a:hover]:bg-[color:#f0f7fa] [&_a:hover]:text-[color:var(--blue)] [&_>_button:hover]:bg-[color:#f0f7fa] [&_>_button:hover]:text-[color:var(--blue)] [&_.account-logout]:text-[color:#bf675a] [&_.account-logout]:[border-top-width:1px] [&_.account-logout]:[border-top-style:solid] [&_.account-logout]:[border-top-color:var(--line)] [&_.account-logout]:[border-top-left-radius:0] [&_.account-logout]:[border-top-right-radius:0] [&_.account-logout]:[border-bottom-right-radius:6px] [&_.account-logout]:[border-bottom-left-radius:6px] [&_.account-logout]:mt-1"
                  aria-label="Hesab menyusu"
                >
                  {user ? (
                    <>
                      <div className="account-summary grid mb-1 [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:var(--line)] [overflow-wrap:anywhere] p-3 gap-[5px] [&_strong]:text-[13px] [&_small]:text-[11px] [&_small]:text-[color:var(--muted)]">
                        <strong>{user.name}</strong>
                        <small>{user.email}</small>
                      </div>
                      <Link to="/profile">
                        <Icon name="user" size={17} />
                        Profilim
                      </Link>
                      <Link to="/orders">
                        <Icon name="bag" size={17} />
                        Sifarişlərim
                      </Link>
                      <Link to="/favorites">
                        <Icon name="heart" size={17} />
                        Sevimlilər ({favorites.length})
                      </Link>
                      <button
                        type="button"
                        className="account-logout"
                        onClick={() => {
                          setAccountOpen(false);
                          logout();
                          navigate("/");
                        }}
                      >
                        <Icon name="logout" size={17} />
                        Hesabdan çıx
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Icon name="user" size={17} />
                        Daxil ol
                      </Link>
                      <Link to="/register">
                        <Icon name="plus" size={17} />
                        Qeydiyyatdan keç
                      </Link>
                    </>
                  )}
                </nav>
              )}
            </div>
            <span className="action-divider h-[30px] w-[1px] bg-[color:var(--line)] mr-0.5 tablet:hidden" />
            <Link
              className="icon-button flex items-center justify-center relative w-7 h-[34px] shrink-0"
              to="/favorites"
              aria-label={`Sevimlilər (${favorites.length})`}
            >
              <Icon name="heart" />
              {favorites.length > 0 && (
                <span className="count-badge absolute right-[-5px] top-0 grid place-items-center bg-[color:var(--blue)] text-white min-w-[17px] h-[17px] text-[8px] leading-[1] border-2 border-[color:white] border-solid rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
            <Link
              className="icon-button flex items-center justify-center relative w-7 h-[34px] shrink-0"
              to="/cart"
              aria-label={`Səbət (${cartCount})`}
            >
              <Icon name="bag" />
              {cartCount > 0 && (
                <span className="count-badge absolute right-[-5px] top-0 grid place-items-center bg-[color:var(--blue)] text-white min-w-[17px] h-[17px] text-[8px] leading-[1] border-2 border-[color:white] border-solid rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="icon-button menu-toggle hidden items-center justify-center relative w-7 h-[34px] shrink-0 mobile:flex"
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
        <div
          className={`navigation-wrap [border-top-width:1px] [border-top-style:solid] [border-top-color:#f1f3f3] [border-bottom-width:1px] [border-bottom-style:solid] [border-bottom-color:var(--line)] mobile:[border-top-width:0] mobile:[border-top-style:none] mobile:[border-top-color:currentColor] ${menuOpen ? "navigation-open" : ""}`}
        >
          <nav
            className="container main-navigation w-[min(1280px,_calc(100%_-_96px))] flex justify-between items-center h-[49px] mx-auto wide:w-[min(1320px,_calc(100%_-_140px))] compact:w-[calc(100%_-_64px)] tablet:w-[calc(100%_-_48px)] mobile:w-[calc(100%_-_36px)] mobile:h-auto mobile:min-h-0 mobile:hidden [&_>_div]:flex [&_>_div]:items-center [&_>_div]:gap-[31px] [&_a]:text-[11px] [&_a]:font-[550] [&_a]:relative [&_a]:h-[49px] [&_a]:flex [&_a]:items-center [&_a]:gap-[7px] [&_a.active]:text-[color:var(--blue)] [&_a.active:after]:absolute [&_a.active:after]:content-[''] [&_a.active:after]:bottom-0 [&_a.active:after]:w-full [&_a.active:after]:h-0.5 [&_a.active:after]:bg-[color:var(--blue)] [&_a:hover]:text-[color:var(--blue)] [&_.discount-link]:text-[color:#c4724c] tablet:[&_>_div]:gap-6 mobile:[.navigation-open_&]:block mobile:[.navigation-open_&]:pb-3.5 mobile:[&_>_div]:grid mobile:[&_>_div]:grid-cols-[repeat(2,_1fr)] mobile:[&_>_div]:gap-y-0 mobile:[&_>_div]:gap-x-5 mobile:[&_a]:h-[42px] mobile:[&_a]:text-[12px] mobile:[&_a]:[border-bottom-width:1px] mobile:[&_a]:[border-bottom-style:solid] mobile:[&_a]:[border-bottom-color:var(--line)] mobile:[&_a.active:after]:hidden"
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
                  {to === "/discounts" && (
                    <span className="nav-sale text-[9px] grid place-items-center w-[17px] h-[17px] bg-[color:#f7e9df] rounded-[4px]">
                      %
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
