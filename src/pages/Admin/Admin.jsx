import React, { useEffect, useState } from "react";
import { Flex, Layout } from "antd";
import "../../admin/styles/style.css";
import Dashboard from "../../admin/sections/Dashboard/Dashboard";
import Sidebar from "../../admin/layout/Sidebar/Sidebar";
import AdminHeader from "../../admin/layout/AdminHeader/AdminHeader";
import Users from "../../admin/sections/Users/Users";
import {
  BookOutlined,
  ProductOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Books from "../../admin/sections/Books/Books";
import CreateBook from "../../admin/crud/create/CreateBook/CreateBook";
import Categories from "../../admin/sections/Categories/Categories";
import CreateCategory from "../../admin/crud/create/CreateCategory/CreateCategory";
import ProfileIcon from "../../assets/icons/ProfileIcon";
import DashboardIcon from "../../assets/icons/DashboardIcon";
import Authors from "../../admin/sections/Authors/Authors";
import GroupIcon from "../../assets/icons/GroupIcon";

function Admin() {
  const [collapsed, setCollapsed] = useState(true);
  const [activeSection, setActiveSection] = useState(() => {
    const savedSection = localStorage.getItem("menu-item");
    return savedSection ? JSON.parse(savedSection) : "dashboard";
  });
  useEffect(() => {
    localStorage.setItem("menu-item", JSON.stringify(activeSection));
  }, [activeSection]);

  const menuItems = [
    {
      icon: <DashboardIcon />,
      label: "Panelim",
      value: "dashboard",
    },
    {
      icon: <UserOutlined />,
      label: "İstifadəçilər",
      value: "users",
    },
    {
      icon: <BookOutlined />,
      label: "Kitablar",
      value: "books",
    },
    {
      icon: <TagOutlined />,
      label: "Kateqoriyalar",
      value: "categories",
    },
    {
      icon: <GroupIcon />,
      label: "Media",
      value: "media",
    },
  ];

  const sections = [
    {
      label: "dashboard",
      view: <Dashboard />,
    },
    {
      label: "users",
      view: <Users />,
    },
    {
      label: "books",
      view: <Books setActiveSection={setActiveSection} />,
    },
    {
      label: "create-book",
      view: <CreateBook setActiveSection={setActiveSection} />,
    },
    {
      label: "categories",
      view: <Categories setActiveSection={setActiveSection} />,
    },
    {
      label: "create-category",
      view: <CreateCategory setActiveSection={setActiveSection} />,
    },
    {
      label: "authors",
      view: <Authors setActiveSection={setActiveSection} />,
    },
  ];
  console.log(activeSection);

  return (
    <Layout className="min-h-screen bg-white">
      <Sidebar
        activeSection={activeSection}
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
          {sections.map(
            (item) =>
              item.label.toLowerCase() === activeSection?.toLowerCase() && (
                <div key={item.label}>{item.view}</div>
              )
          )}
        </main>
      </div>
    </Layout>
  );
}

export default Admin;
