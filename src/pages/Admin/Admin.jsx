import React, { useState } from "react";
import { Layout } from "antd";
import "../../admin/styles/style.css";
import Dashboard from "../../admin/sections/Dashboard/Dashboard";
import Sidebar from "../../admin/layout/Sidebar/Sidebar";
import AdminHeader from "../../admin/layout/AdminHeader/AdminHeader";
import Users from "../../admin/sections/Users/Users";

function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState();

  return (
    <Layout className="min-h-screen bg-white">
      <Sidebar
        setActiveSection={setActiveSection}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div
        className={`duration-300 ${collapsed ? "ml-0" : "desktop:ml-[200px]"}`}
      >
        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />
        <main className="mx-[30px] mt-28 mb-5 flex flex-col gap-5">
          <Dashboard />
          <Users />
        </main>
      </div>
    </Layout>
  );
}

export default Admin;
