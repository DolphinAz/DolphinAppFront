import { Flex } from "antd";
import React, { useState } from "react";
import EditIcon from "../../assets/icons/EditIcon";
import ProfileForm from "../ProfileForm/ProfileForm";
import PasswordForm from "../PasswordForm/PasswordForm";
import OrdersSection from "../OrdersSection/OrdersSection";

function ProfileSection() {
  const [activeNav, setActiveNav] = useState("Profil");
  const navigations = [
    {
      label: "Profil",
      component: <ProfileForm />,
    },
    {
      label: "Parol",
      component: <PasswordForm />,
    },
    {
      label: "Sifarişlərim",
      component: <OrdersSection />,
    },
    {
      label: "Suallarım",
    },
    {
      label: "Bildirişlər",
    },
  ];

  return (
    <section className="px-5 desktop:px-10 pt-8 pb-32 flex flex-col gap-9">
      <Flex vertical className="gap-[10px] desktop:gap-[5px]">
        <h1 className="flex items-center gap-3 text-xl font-medium">
          Peter Griffin <EditIcon />
        </h1>
        <p className="text-sm text-gray-650">
          Update your username and manage your account
        </p>
      </Flex>
      <div className="flex flex-col desktop:grid desktop:grid-cols-[1fr_3fr] gap-14 desktop:gap-0">
        <Flex>
          <nav className="flex flex-col gap-[14px]">
            <ul className="flex flex-col gap-[14px]">
              <li className="cursor-pointer font-bold">Ümumi</li>
              {navigations.map((navigation, index) => (
                <li
                  onClick={() => setActiveNav(navigation.label)}
                  className={` cursor-pointer ${
                    activeNav === navigation.label
                      ? "font-bold"
                      : "text-gray-650"
                  }`}
                  key={index}
                >
                  {navigation.label}
                </li>
              ))}
            </ul>
            <Flex vertical gap={23}>
              <button className="p-0 text-gray-650 justify-start h-fit w-fit">
                Çıxış
              </button>
              <button className="p-0 text-red-100 justify-start h-fit w-fit">
                Hesabı sil
              </button>
            </Flex>
          </nav>
        </Flex>
        {navigations.map(
          (navigation, index) =>
            activeNav === navigation.label && (
              <div key={index}>{navigation.component}</div>
            )
        )}
      </div>
    </section>
  );
}

export default ProfileSection;
