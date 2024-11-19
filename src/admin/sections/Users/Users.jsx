import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

function Users() {
  const [users, setUsers] = useState([
    {
      key: 1,
      firstName: "John",
      lastName: "Brown",
      email: "coqyze@mailinator.com",
      status: "verified",
    },
    {
      key: 2,
      firstName: "Jim",
      lastName: "Green",
      email: "tujetutic@mailinator.com",
      status: "unverified",
    },
    {
      key: 3,
      firstName: "Joe",
      lastName: "Black",
      email: "golaz@yahoo.com",
      status: "verified",
    },
  ]);

  const [sortedData, setSortedData] = useState(users);
  const [sortOrder, setSortOrder] = useState("ascend");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const handleSort = () => {
    const newSortOrder = sortOrder === "ascend" ? "descend" : "ascend"; // Toggle sort order
    setSortOrder(newSortOrder);

    const sorted = [...users].sort((a, b) => {
      return newSortOrder === "ascend" ? a.key - b.key : b.key - a.key;
    });
    setSortedData(sorted);
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
      rowScope: "row",
      width: "80px",
      onHeaderCell: () => ({
        onClick: handleSort,
        className: "sortable-table",
      }),
    },
    {
      title: "Name",
      dataIndex: "firstName",
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
        <Tag color={status === "verified" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Verified", value: "verified" },
        { text: "Unverified", value: "unverified" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Action",
      dataIndex: "action",
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
      dataSource={sortedData}
      columns={columns}
      className={`overflow-x-auto w-full no-tooltip-table`}
      scroll={{ x: 600 }}
      pagination={tableParams.pagination}
    >
      <Table.Column dataIndex="key" key="key" />
      <Table.Column dataIndex="firstName" key="firstName" />
      <Table.Column dataIndex="lastName" key="lastName" />
      <Table.Column dataIndex="email" key="email" />
      <Table.Column dataIndex="status" key="status" />
      <Table.Column title="Action" key="action" />
    </Table>
  );
}

export default Users;
