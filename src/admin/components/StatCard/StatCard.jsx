import React from "react";
import { AdminContent } from "../../styles/admin.styles";

function StatCard({ stat }) {
  return (
    <AdminContent className="flex items-center gap-4">
      <div
        style={{ backgroundColor: stat.iconBg, color: stat.iconColor }}
        className="w-[60px] h-[60px] flex justify-center items-center rounded-full text-2xl"
      >
        {stat.icon}
      </div>
      <span className="text-gray-700">
        <h1 className="text-xl font-semibold">{stat.value} +</h1>
        <p>{stat.title}</p>
      </span>
    </AdminContent>
  );
}

export default StatCard;
