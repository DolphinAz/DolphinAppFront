import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import axios from "axios";
import { baseUrl } from "../../../constants/baseUrl";
import toast from "react-hot-toast";

function Users() {
  const usersUrl = "/api/admin/users/get";
  const [users, setUsers] = useState([]); // Data for the table
  const [sortOrder, setSortOrder] = useState("ascend");

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

  const handleSort = () => {
    const newSortOrder = sortOrder === "ascend" ? "descend" : "ascend"; // Toggle sort order
    setSortOrder(newSortOrder);

    const sorted = [...users].sort((a, b) => {
      return newSortOrder === "ascend" ? a.key - b.key : b.key - a.key;
    });
    setUsers(sorted);
  };

  const columns = [
    {
      title: (
        <div className="flex items-center justify-between" onClick={handleSort}>
          <span>#</span>
          {sortOrder === "ascend" ? <CaretDownOutlined /> : <CaretUpOutlined />}
        </div>
      ),
      dataIndex: "key",
      width: "80px",
      onHeaderCell: () => ({
        onClick: handleSort,
        className: "sortable-table",
      }),
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Surname",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "active" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Action",
      render: () => (
        <Space size="middle">
          <Button className="bg-red-100 text-white border-transparent hover:!text-red-100 hover:!border-red-100">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      className={`overflow-x-auto w-full no-tooltip-table`}
      scroll={{ x: 600 }}
    />
  );
}

export default Users;
