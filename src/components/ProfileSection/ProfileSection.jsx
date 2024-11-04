import { Button, Flex } from "antd";
import React, { useState } from "react";
import EditIcon from "../../assets/icons/EditIcon";

function ProfileSection() {
  const [activeForm, setActiveForm] = useState("Profil");
  const navigations = [
    {
      label: "Ümumi",
    },
    {
      label: "Profil",
    },
    {
      label: "Parol",
    },
    {
      label: "Sifarişlərim",
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
      <Flex vertical gap={5}>
        <h1 className="flex items-center gap-3 text-xl font-medium">
          Peter Griffin <EditIcon />
        </h1>
        <p className="text-sm text-gray-650">
          Update your username and manage your account
        </p>
      </Flex>
      <Flex>
        <nav className="flex flex-col gap-[14px]">
          <ul className="flex flex-col gap-[14px]">
            {navigations.map((navigation, index) => (
              <li
                onClick={() => setActiveForm(navigation.label)}
                className={` cursor-pointer ${
                  activeForm === navigation.label
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
    </section>
  );
}

export default ProfileSection;
