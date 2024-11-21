import React, { useState } from "react";
import { Layout } from "antd";
import "../../admin/styles/style.css";
import Dashboard from "../../admin/sections/Dashboard/Dashboard";
import Sidebar from "../../admin/layout/Sidebar/Sidebar";
import AdminHeader from "../../admin/layout/AdminHeader/AdminHeader";
import Users from "../../admin/sections/Users/Users";
import {
  BookFilled,
  BookOutlined,
  ProductOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Books from "../../admin/sections/Books/Books";
import CreateBook from "../../admin/crud/create/CreateBook/CreateBook";

function Admin() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState(<CreateBook />);
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
      icon: <BookOutlined />,
      label: "Kitablar",
      view: <Books setActiveSection={setActiveSection} />,
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
        className={`duration-300 mt-24   ${
          collapsed ? "ml-0" : "desktop:ml-[200px]"
        }`}
      >
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <main
          style={{
            minHeight: "calc(100vh - 96px)",
          }}
          className="p-[30px] bg-gray-1000  flex flex-col gap-5 "
        >
          {activeSection}
        </main>
      </div>
    </Layout>
  );
}

export default Admin;
