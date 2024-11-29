// import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import siteLogo from "../../../assets/images/dolphin-logo.png";
import { useNavigate } from "react-router-dom";

function Sidebar({
  activeSection,
  menuItems,
  collapsed,
  setCollapsed,
  setActiveSection,
}) {
  const navigate = useNavigate();

  return (
    <aside
      onClick={() => setCollapsed(!collapsed)}
      className={`desktop:w-fit fixed left-0 top-0 h-screen desktop:z-[0] ${
        collapsed ? "z-0" : "z-[11] bg-gray-300 w-full"
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`bg-white h-screen py-4 flex flex-col gap-4 border-r border-gray-900 duration-300 overflow-hidden ${
          collapsed ? "w-[0px]" : "desktop:w-[200px] w-[300px]"
        }`}
      >
        <div className="bg-skyBlue-400 rounded-full w-20 desktop:w-3/4 aspect-square mx-auto flex">
          <img
            className="w-full h-full object-cover rounded-full"
            src={siteLogo}
          />
        </div>
        <ul className="flex flex-col gap-2 w-[90%] mx-auto">
          {menuItems.map((menuItem, index) => (
            <li
              key={index}
              onClick={() => {
                setActiveSection(menuItem.value);
                navigate("/admin");
              }}
              className={`flex items-center gap-[10px] p-2 rounded-md cursor-pointer hover:bg-gray-1050 ${
                activeSection === menuItem.value &&
                "bg-skyBlue-100 text-skyBlue-500 hover:!bg-skyBlue-100 menu-item"
              }`}
            >
              <span className="w-[14px]">{menuItem.icon}</span>
              <p>{menuItem.label}</p>
            </li>
          ))}
        </ul>
        {/* <Menu
          className="w-11/12 mx-auto"
          style={{ borderInlineEnd: "none" }}
          mode="inline"
          items={menuItems}
          selectedKeys={selectedKey ? [selectedKey] : []} // Controlled selected key
          onClick={handleMenuClick}
        /> */}
      </div>
    </aside>
  );
}

export default Sidebar;
