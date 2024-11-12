import React, { useEffect, useState } from "react";
import siteLogo from "../../assets/images/site-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, Flex, Skeleton } from "antd";
import { Sling as Hamburger } from "hamburger-react";
import NotificationIcon from "../../assets/icons/NotificationIcon";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";

function Header({ isLogged, setIsLogged }) {
  const infoUrl = "/api/identity/info";
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const navigations = [
    {
      label: "Haqqımızda",
      value: "/about",
    },
    {
      label: "Kitablar",
      value: "/books",
    },
    {
      label: "Oyuncaqlar",
      value: "/toys",
    },
    {
      label: "Endirimlər",
      value: "/discounts",
    },
    {
      label: "Bestseller",
      value: "/best-seller",
    },
    {
      label: "Əlaqə",
      value: "/contact",
    },
  ];
  const items = [
    {
      key: "1",
      label: <Link to="profile">Profil</Link>,
    },
    {
      key: "2",
      label: <Link to="orders">Sifarişlərim</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <span
          onClick={() => {
            setIsLogged(false);
            navigate("/");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("expiration");
          }}
        >
          Çıxış
        </span>
      ),
    },
  ];

  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      axios
        .get(baseUrl + infoUrl, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => setUserData(res.data.data))
        .catch((err) => {
          toast.error(err);
          console.log(err);
        });
    }
  }, [accessToken]);

  const [burgerOpen, setBurgerOpen] = useState(false);
  return (
    <header className="mx-auto px-5 desktop:px-10 py-[18px] border-b border-border-100">
      <Flex
        justify="space-between"
        className="flex flex-wrap desktop:flex-nowrap"
        align="center"
      >
        <Link to="/">
          <img src={siteLogo} alt="Site Logo" />
        </Link>
        <nav
          className={`order-1 w-full desktop:w-fit desktop:block desktop:order-none duration-300 overflow-hidden desktop:h-fit ${
            burgerOpen ? "h-[244px] mt-[30px]" : "h-0"
          }`}
        >
          <Flex className="gap-5 desktop:gap-[32px] flex flex-col desktop:flex-row">
            {navigations.map((navigation, index) => (
              <Link
                onClick={() => setBurgerOpen(false)}
                key={index}
                className="font-medium hover:text-skyBlue-500 hover:underline"
                to={navigation.value}
              >
                {navigation.label}
              </Link>
            ))}
          </Flex>
        </nav>
        <Flex className="hidden desktop:flex" align="center">
          {accessToken ? (
            <>
              {userData ? (
                <Flex className="gap-6" align="center">
                  <Button className="p-0 border-none shadow-none">
                    <NotificationIcon />
                  </Button>

                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Button
                        className="py-[12px] h-fit px-[30px] font-medium text-sm bg-skyBlue-500 border-0 shadow-none"
                        type="primary"
                      >
                        {userData?.name}
                      </Button>
                    </a>
                  </Dropdown>
                </Flex>
              ) : (
                <Skeleton.Button
                  className="rounded-[4px]"
                  style={{ width: 200 }}
                  size={40}
                  active={true}
                />
              )}
            </>
          ) : (
            <>
              <Flex className="gap-3" align="center">
                <Link to="login">
                  <Button
                    className="bg-transparent py-[12px] px-[18px] h-fit text-black-200 font-medium text-sm border-0 shadow-none"
                    type="primary"
                  >
                    Giriş
                  </Button>
                </Link>
                <Link to="register">
                  <Button
                    className="py-[12px] h-fit px-[30px] font-medium text-sm bg-skyBlue-500 border-0 shadow-none"
                    type="primary"
                  >
                    Qeydiyyat
                  </Button>
                </Link>
              </Flex>
            </>
          )}
        </Flex>
        <div className="block desktop:hidden">
          <Hamburger
            rounded
            size={30}
            toggled={burgerOpen}
            toggle={setBurgerOpen}
          />
        </div>
      </Flex>
    </header>
  );
}

export default Header;
