import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex } from "antd";
import React, { useEffect, useState } from "react";
import LogoutIcon from "../../../assets/icons/LogoutIcon";
import { Header } from "antd/es/layout/layout";
import axios from "axios";
import { baseUrl } from "../../../constants/baseUrl";
import { useNavigate } from "react-router-dom";
import ProfileIcon from "../../../assets/icons/ProfileIcon";

function AdminHeader({ collapsed, setCollapsed }) {
  const infoUrl = "/api/identity/info";

  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const accessTokenAdmin = localStorage.getItem("accessTokenAdmin");
    if (accessTokenAdmin) {
      axios
        .get(baseUrl + infoUrl, {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${accessTokenAdmin}`,
          },
        })
        .then((res) => setData(res.data.data))
        .catch((err) => {
          toast.error(err);
          console.log(err);
        });
    }
  }, []);

  const items = [
    {
      key: "1",
      label: (
        <Flex align="center" gap={10}>
          <img
            className="rounded-full object-cover w-[42px] h-[42px]"
            src="https://st3.depositphotos.com/3776273/31836/i/450/depositphotos_318367382-stock-photo-portrait-of-a-handsome-young.jpg"
            alt=""
          />
          <Flex vertical>
            <h1 className="font-medium">{`${data?.name} ${data?.surname}`}</h1>
            <p className="text-xs">{data?.email}</p>
          </Flex>
        </Flex>
      ),
    },
    { type: "divider" },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2">
          <ProfileIcon width={20} />
          Hesabım
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          onClick={() => {
            localStorage.removeItem("accessTokenAdmin");
            navigate("/admin/login");
          }}
          className="flex items-center gap-2"
        >
          <LogoutIcon />
          Çıxış
        </div>
      ),
    },
  ];

  return (
    <Header
      className={`flex items-center justify-between left-auto fixed top-0 h-24 duration-300 px-[30px] ${
        collapsed ? "w-full" : "admin-header"
      }`}
      style={{
        background: "rgba(250, 250, 250, 0.3)",
        borderBottom: "1px solid #E4E7EC",
        backdropFilter: "blur(10px)",
        zIndex: 10,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
        }}
      />
      <Dropdown menu={{ items }} arrow>
        <Flex align="center" gap={10}>
          <Button className="p-0 rounded-full bg-transparent w-11 h-11">
            <img
              className="object-cover rounded-full w-full h-full"
              src="https://st3.depositphotos.com/3776273/31836/i/450/depositphotos_318367382-stock-photo-portrait-of-a-handsome-young.jpg"
            />
          </Button>
        </Flex>
      </Dropdown>
    </Header>
  );
}

export default AdminHeader;
