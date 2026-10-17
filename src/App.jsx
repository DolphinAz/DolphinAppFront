import PropTypes from "prop-types";
import { Fragment, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Catalog from "./pages/Catalog/Catalog";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import ErrorPage from "./pages/Error/Error";
import { useShop } from "./state/ShopContext";
import "./assets/tailwind.css";

function ProtectedRoute({ children }) {
  const { user } = useShop();
  const location = useLocation();
  return user ? (
    <Fragment key={user.id}>{children}</Fragment>
  ) : (
    <Navigate
      to={`/login?next=${encodeURIComponent(location.pathname)}`}
      replace
    />
  );
}

export default function App() {
  const location = useLocation();
  const authPage = ["/login", "/register", "/reset-password"].includes(
    location.pathname,
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <>
      <a
        className="skip-link fixed top-[-80px] left-5 z-[100] bg-[color:#fff] shadow-[0_3px_20px_#0002] py-3 px-5 [&:focus]:top-2.5"
        href="#main-content"
      >
        Əsas məzmuna keç
      </a>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2600,
          style: { borderRadius: "12px", fontSize: "14px", color: "#183542" },
        }}
      />
      {!authPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Catalog key="books" />} />
        <Route path="/toys" element={<Catalog key="toys" mode="toys" />} />
        <Route
          path="/best-seller"
          element={<Catalog key="bestsellers" mode="bestsellers" />}
        />
        <Route
          path="/bestsellers"
          element={<Navigate to="/best-seller" replace />}
        />
        <Route
          path="/bestseller"
          element={<Navigate to="/best-seller" replace />}
        />
        <Route
          path="/discounts"
          element={<Catalog key="discounts" mode="discounts" />}
        />
        <Route
          path="/discounteds"
          element={<Navigate to="/discounts" replace />}
        />
        <Route
          path="/discounted"
          element={<Navigate to="/discounts" replace />}
        />
        <Route
          path="/favorites"
          element={<Catalog key="favorites" mode="favorites" />}
        />
        <Route path="/new-books" element={<Navigate to="/books" replace />} />
        <Route
          path="/new-arrivals"
          element={<Navigate to="/books" replace />}
        />
        <Route path="/login" element={<Auth key="login" />} />
        <Route path="/register" element={<Auth key="register" />} />
        <Route path="/reset-password" element={<Auth key="reset" />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/detail/:id"
          element={<Detail key={location.pathname} />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Profile key="orders" />
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {!authPage && <Footer />}
    </>
  );
}

ProtectedRoute.propTypes = { children: PropTypes.node.isRequired };
