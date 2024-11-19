import React from "react";
import StatCard from "../StatCard/StatCard";
import { UsergroupAddOutlined } from "@ant-design/icons";

function StatBox() {
  const stats = [
    {
      icon: <UsergroupAddOutlined />,
      iconColor: "#5b93ff",
      iconBg: "#eef4ff",
      value: 500,
      title: "İstifadəçilər",
    },
    {
      icon: <UsergroupAddOutlined />,
      iconColor: "#ffd66b",
      iconBg: "#fffbf0",
      value: 200,
      title: "Məhsullar",
    },
    {
      icon: <UsergroupAddOutlined />,
      iconColor: "#ff8f6b",
      iconBg: "#fff4f0",
      value: 50,
      title: "Satışlarım",
    },
    {
      icon: <UsergroupAddOutlined />,
      iconColor: "#605bff",
      iconBg: "#efeeff",
      value: 1000,
      title: "Qonaqlar",
    },
  ];

  return (
    <div className="grid xl:grid-cols-4 desktop:grid-cols-2 grid-cols-1 gap-4">
      {stats.map((stat, index) => (
        <StatCard stat={stat} key={index} />
      ))}
    </div>
  );
}

export default StatBox;
