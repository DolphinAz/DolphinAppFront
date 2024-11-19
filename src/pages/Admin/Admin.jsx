import React, { useState } from "react";
import { Layout } from "antd";
import "../../admin/styles/style.css";
import Dashboard from "../../admin/sections/Dashboard/Dashboard";
import Sidebar from "../../admin/layout/Sidebar/Sidebar";
import AdminHeader from "../../admin/layout/AdminHeader/AdminHeader";
import Users from "../../admin/sections/Users/Users";
import {
  ProductOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

function Admin() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState("Panelim");
  const menuItems = [
    {
      key: "1",
      icon: <ProductOutlined />,
      label: "Panelim",
      view: <Dashboard />,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "İstifadəçilər",
      view: <Users />,
    },
    {
      key: "3",
      icon: <ShoppingOutlined />,
      label: "Məhsullar",
    },
  ];

  return (
    <Layout className="min-h-screen bg-white">
      <Sidebar
        menuItems={menuItems}
        setActiveSection={setActiveSection}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div
        className={`duration-300 ${collapsed ? "ml-0" : "desktop:ml-[200px]"}`}
      >
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="mx-[30px] mt-28 mb-5 flex flex-col gap-5">
          {menuItems.map(
            (item, i) =>
              item.label === activeSection && <div key={i}>{item.view}</div>
          )}
        </main>
      </div>
    </Layout>
  );
}

export default Admin;
