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
      render: (_, index) => <span>{index + 1}</span>,
    },
    {
      title: "Name",
      render: (user) => user.name,
    },
    {
      title: "Surname",
      render: (user) => user.lastName,
    },
    {
      title: "Email",
      render: (user) => user.email,
    },
    {
      title: "Status",
      render: (user) => (
        <Tag color={user.status === "active" ? "green" : "red"}>
          {user.status}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (book) => (
        <button
          onClick={() => handleDelete(book.id)}
          className="bg-red-100 py-1 px-2 rounded-lg text-white"
        >
          Sil
        </button>
      ),
    },
  ];

  return <AdminTable data={users} columns={columns} />;
}

export default Users;
