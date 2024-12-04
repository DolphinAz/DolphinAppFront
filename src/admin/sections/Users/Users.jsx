import React, { useEffect, useState } from "react";
import { Button, Flex, Pagination, Skeleton, Space, Table, Tag } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import axios from "axios";
import { baseUrl } from "../../../constants/baseUrl";
import toast from "react-hot-toast";
import AdminTable from "../../components/AdminTable/AdminTable";

function Users() {
  const usersUrl = "/api/admin/users/get";
  const changeActivityUrl = "/api/admin/users/change-activity";
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    axios
      .get(`${baseUrl + usersUrl}?Page=${currentPage}&?Count=10`)
      .then((res) => {
        const result = res.data.data.map((user, index) => ({
          key: index + 1,
          id: user.id,
          name: user.name,
          lastName: user.surname,
          email: user.email,
          status: user.isActive ? "aktiv" : "deaktiv",
        }));
        setTotalCount(res.data.totalCount);
        setUsers(result);
      })
      .catch((err) => toast.error(err.message));
  }, [currentPage]);

  const columns = [
    {
      title: "No",
      render: (_, index) => <span>{index + 1}</span>,
    },
    {
      title: "Ad",
      render: (user) => user.name,
    },
    {
      title: "Soyad",
      render: (user) => user.lastName,
    },
    {
      title: "Email",
      render: (user) => user.email,
    },
    {
      title: "Status",
      render: (user) => (
        <Tag color={user.status === "aktiv" ? "green" : "red"}>
          {user.status}
        </Tag>
      ),
    },
    {
      title: "Action",
      render: (user) => (
        <Button
          onClick={() => changeActivity(user.id)}
          className="bg-skyBlue-500 border-transparent py-1 px-2 rounded-lg text-white"
        >
          Statusu dəyişdir
        </Button>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const changeActivity = (id) => {
    axios.put(`${baseUrl + changeActivityUrl}/${id}`).then(() => {
      toast.success("İstifadəçi statusu uğurla dəyişdirildi!");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id
            ? { ...user, status: user.status === "aktiv" ? "deaktiv" : "aktiv" }
            : user
        )
      );
    });
  };

  return (
    <Flex vertical gap={10}>
      {users.length ? (
        <>
          <AdminTable data={users} columns={columns} />
          {totalCount > 10 && (
            <Pagination
              className="ml-auto"
              current={currentPage}
              onChange={handlePageChange}
              total={totalCount}
            />
          )}
        </>
      ) : (
        <Skeleton active />
      )}
    </Flex>
  );
}

export default Users;
