import React from "react";
import { Button, Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;

function Users() {
  const columns = [
    {
      title: "#",
      dataIndex: "key",
      rowScope: "row",
      sorter: (a, b) => a.key - b.key,
      sortDirections: ["descend", "ascend"],
      width: "100px",
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
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "verified" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
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
  const data = [
    {
      key: "1",
      firstName: "John",
      lastName: "Brown",
      address: "New York No. 1 Lake Park",
      status: "verified",
    },
    {
      key: "2",
      firstName: "Jim",
      lastName: "Green",
      address: "London No. 1 Lake Park",
      status: "unverified",
    },
    {
      key: "3",
      firstName: "Joe",
      lastName: "Black",
      address: "Sydney No. 1 Lake Park",
      status: "verified",
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      className="overflow-x-auto w-full"
      scroll={{ x: 600 }}
    >
      <Table.Column dataIndex="key" key="key" />
      <Table.Column dataIndex="firstName" key="firstName" />
      <Table.Column dataIndex="lastName" key="lastName" />
      <Table.Column dataIndex="address" key="address" />
      <Table.Column dataIndex="address" key="address" />
      <Table.Column dataIndex="status" key="status" />
      <Table.Column title="Action" key="action" />
    </Table>
  );
}

export default Users;
