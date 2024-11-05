import { Flex } from "antd";
import React from "react";
import siteLogo from "../../assets/images/site-logo.png";
import InstagramIcon from "../../assets/icons/InstagramIcon";
import FacebookIcon from "../../assets/icons/FacebookIcon";
import TelegramIcon from "../../assets/icons/TelegramIcon";
import { Link } from "react-router-dom";
function Footer() {
  const navigations = [
    {
      label: "Kateqoriya",
      items: [
        {
          label: "Ən çox satılanlar",
          value: "/best-seller",
          isNew: false,
        },
        {
          label: "Yeni kitablar",
          value: "/new-books",
          isNew: true,
        },
        {
          label: "Sifarişlər",
          value: "/orders",
          isNew: false,
        },
        {
          label: "Yeni gələnlər",
          value: "/new-arrivals",
          isNew: false,
        },
        {
          label: "Qiymətlər",
          value: "/prices",
          isNew: false,
        },
      ],
    },
    {
      label: "Əlaqə",
      items: [
        {
          label: "Haqqımızda",
          value: "/about",
        },
        {
          label: "Press",
          value: "/press",
        },
        {
          label: "Xəbərlər",
          value: "/news",
        },
        {
          label: "Contact",
          value: "/contact",
        },
      ],
    },
    {
      label: "Follow us",
      items: [
        {
          label: "Instagram",
          value: "#",
          icon: <InstagramIcon />,
        },
        {
          label: "Facebook",
          value: "#",
          icon: <FacebookIcon />,
        },
        {
          label: "Telegram",
          value: "#",
          icon: <TelegramIcon />,
        },
      ],
    },
  ];

  return (
    <footer className="bg-gray-800 px-5 desktop:px-10 pt-16 pb-6 desktop:pb-12 flex flex-col gap-8 desktop:gap-16">
      <Flex
        justify="space-between"
        className="desktop:gap-4 flex-col-reverse desktop:flex-row"
      >
        <Flex
          vertical
          className="pt-8 desktop:p-0 gap-5 w-full desktop:max-w-[409px] border-t desktop:border-none border-gray-900"
        >
          <img
            className="object-cover w-20 h-20 "
            src={siteLogo}
            alt="Site Logo"
          />
          <p className="hidden desktop:block">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum
          </p>
        </Flex>
        <div
          gap={20}
          className="pb-10 desktop:p-0 desktop:flex desktop:flex-wrap desktop:justify-end grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8"
        >
          {navigations.map((navigation, index) => (
            <Flex key={index} vertical className="gap-4 desktop:w-[214px]">
              <h1 className="font-semibold">{navigation.label}</h1>
              <ul className="flex flex-col gap-3">
                {navigation.items.map((item, index) => (
                  <Link key={index} to={item.value}>
                    <li className="text-[14px] flex gap-2 items-center">
                      {item.label}
                      {item.isNew ? (
                        <span className="py-[2px] px-2 bg-green-200 text-green-100 rounded-2xl">
                          New
                        </span>
                      ) : (
                        ""
                      )}
                    </li>
                  </Link>
                ))}
              </ul>
            </Flex>
          ))}
        </div>
      </Flex>
      <p className="font-light text-gray-250 desktop:text-gray-150 ">
        © 2077 Untitled UI. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
