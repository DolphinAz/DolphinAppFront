import React, { useEffect, useState } from "react";
import siteLogo from "../../assets/images/dolphin-logo.png";
import LoginForm from "../../components/LoginForm/LoginForm";
import { Button } from "antd";
import ArrowLeftIcon from "../../assets/icons/ArrowLeftIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";

function Auth() {
  const location = useLocation();
  const [currentMenu, setCurrentMenu] = useState("/login");
  const [currentScreen, setCurrentScreen] = useState(window.innerWidth);
  const [currentForm, setCurrentForm] = useState(location.pathname);
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentForm(location.pathname);
    setCurrentMenu(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
    const handleResize = () => {
      setCurrentScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menu = [
    {
      label: "Giriş",
      value: "/login",
    },
    {
      label: "Qeydiyyat",
      value: "/register",
    },
  ];
  return (
    <>
      {currentScreen < 1024 ? <Header /> : ""}
      <section className="relative desktop:h-screen desktop:grid desktop:grid-cols-[60%_40%] px-10 desktop:px-0 py-24 desktop:py-0">
        <Button
          onClick={() => navigate("/")}
          className="absolute top-6 left-10 desktop:top-10 desktop:left-[unset] desktop:right-20 bg-gray-500 p-0 w-7 h-7 desktop:w-12 desktop:h-12 rounded-full"
          type="submit"
        >
          <ArrowLeftIcon />
        </Button>
        <div className="custom-clipPath bg-skyBlue-400 h-screen hidden desktop:flex items-center">
          <img className="w-[500px] h-[500px]" src={siteLogo} alt="" />
        </div>
        {!currentMenu.includes("/reset-password") && (
          <div className="block desktop:hidden">
            <div className="grid grid-cols-2 place-items-center h-11">
              {menu.map((menuItem, index) => (
                <Link
                  onClick={() => setCurrentMenu(menuItem.value)}
                  key={index}
                  className="w-full text-center"
                  to={menuItem.value}
                >
                  <span
                    className={`w-full flex justify-center cursor-pointer pb-2 border-b duration-300 ${
                      currentMenu === menuItem.value
                        ? "font-medium border-skyBlue-500"
                        : "font-normal"
                    }`}
                  >
                    {menuItem.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-center desktop:justify-start px-0 desktop:px-10 pt-[17px] desktop:p-10">
          {currentForm === "/login" && currentMenu === "/login" ? (
            <LoginForm />
          ) : currentForm === "/register" && currentMenu === "/register" ? (
            <RegisterForm />
          ) : currentForm === "/reset-password" ? (
            <ResetPasswordForm />
          ) : (
            ""
          )}
        </div>
      </section>
      {currentScreen < 1024 ? <Footer /> : ""}
    </>
  );
}

export default Auth;
