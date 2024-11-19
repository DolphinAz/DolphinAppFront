import {
  ProductOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import siteLogo from "../../../assets/images/dolphin-logo.png";

function Sidebar({ collapsed, setCollapsed, setActiveSection }) {
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

        <Menu
          className="w-11/12 mx-auto"
          style={{ borderInlineEnd: "none" }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <ProductOutlined />,
              label: "Panelim",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "İstifadəçilər",
            },
            {
              key: "3",
              icon: <ShoppingOutlined />,
              label: "Məhsullar",
            },
          ]}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
