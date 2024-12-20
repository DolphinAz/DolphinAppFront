import Header from "./components/Header/Header";
import "./assets/tailwind.css";
import "./assets/style.css";
import "./assets/loader.css";
import SubHeader from "./components/SubHeader/SubHeader";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import Auth from "./pages/Auth/Auth";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Profile from "./pages/Profile/Profile";
import Cart from "./pages/Cart/Cart";
import Payment from "./pages/Payment/Payment";
import Error from "./pages/Error/Error";
import { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader/PageLoader";
import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/AdminLogin/AdminLogin";

function App() {
  const location = useLocation();
  const [isLogged, setIsLogged] = useState(false);
  const [activateLayout, setActivateLayout] = useState(false);
  const [isoaderActive, setIsLoaderActive] = useState(false);
  const accessTokenAdmin = localStorage.getItem("accessTokenAdmin");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsLoaderActive(true);
    document.body.style.overflow = "hidden";
    const loaderTimer = setTimeout(() => {
      setIsLoaderActive(false);
      document.body.style.overflow = "auto";
    }, 1500);

    if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/reset-password" ||
      location.pathname === "/admin" ||
      location.pathname === "/admin/login"
    ) {
      setActivateLayout(false);
    } else {
      setActivateLayout(true);
    }
    return () => {
      clearTimeout(loaderTimer);
    };
  }, [location.pathname]);

  return (
    <>
      {isoaderActive && <PageLoader />}
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: 10,
            position: "relative",
            overflow: "hidden",
          },

          className: "custom-toast",
        }}
        position="top-center"
        reverseOrder={true}
      />
      {activateLayout ? (
        <>
          <Header isLogged={isLogged} setIsLogged={setIsLogged} />
          <SubHeader />
        </>
      ) : (
        ""
      )}
      <Routes>
        {/*---- USER ROUTES ----*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/reset-password" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<Error />} />

        {/*---- ADMIN ROUTES ----*/}
        <Route
          path="/admin"
          element={accessTokenAdmin ? <Admin /> : <AdminLogin />}
        />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
      {activateLayout ? <Footer /> : ""}
    </>
  );
}

export default App;
