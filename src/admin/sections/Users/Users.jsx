import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import axios from "axios";
import { baseUrl } from "../../../constants/baseUrl";
import toast from "react-hot-toast";
import AdminTable from "../../components/AdminTable/AdminTable";

function Users() {
  const usersUrl = "/api/admin/users/get";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + usersUrl)
      .then((res) => {
        const result = res.data.data.map((user, index) => ({
          key: index + 1,
          name: user.name,
          lastName: user.surname,
          email: user.email,
          status: user.isActive ? "active" : "inactive",
        }));
        setUsers(result);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  const columns = [
    {
      title: "No",
    },
    {
      title: "Name",
    },
    {
      title: "Surname",
    },
    {
      title: "Email",
    },
    {
      title: "Status",
    },
    {
      title: "Action",
    },
  ];

  return <AdminTable data={users} columns={columns} />;
}

export default Users;
