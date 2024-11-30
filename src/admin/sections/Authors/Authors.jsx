import React, { useState } from "react";
import AdminTable from "../../components/AdminTable/AdminTable";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../constants/baseUrl";
import { Button, Flex } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Authors({ setActiveSection }) {
  const getAuthorsUrl = "/api/author/get";
  const authorsUrl = "/api/admin/author";

  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(baseUrl + getAuthorsUrl).then((res) => setAuthors(res.data.data));
  }, []);

  const columns = [
    {
      title: "No",
      render: (_, index) => <span>{index + 1}</span>,
    },
    {
      title: "Yazıçı",
      render: (author) => author.fullName,
    },
    {
      title: "Yaş",
      render: (author) => author.age,
    },
    {
      title: "Actions",
      render: (author) => (
        <Flex justify="center" gap={5}>
          <Button
            onClick={() => handleDelete(author.id)}
            className="bg-red-100 py-1 px-2 rounded-lg text-white border-transparent hover:!border-red-100 hover:!text-red-100"
          >
            Sil
          </Button>
          <Button
            onClick={() => {
              handleUpdate(author.id);
              setActiveSection("update-author");
            }}
            className="bg-orange-500 py-1 px-2 rounded-lg text-white border-transparent hover:!border-orange-500 hover:!text-orange-500"
          >
            Dəyişdir
          </Button>
        </Flex>
      ),
    },
  ];

  const handleDelete = (id) => {
    axios.delete(`${baseUrl + authorsUrl}/${id}`).then((res) => {
      toast.success("Yazıçı uğurla silindi!");
      setAuthors((prev) => prev.filter((author) => author.id !== id));
    });
  };

  const handleUpdate = (id) => {
    navigate("?updateId=" + id);
  };

  return (
    <Flex vertical gap={10}>
      <Button
        onClick={() => setActiveSection("create-author")}
        className="w-fit ml-auto bg-skyBlue-500 text-white border-transparent"
      >
        Yazıçı əlavə et
      </Button>
      <AdminTable data={authors} columns={columns} />
    </Flex>
  );
}

export default Authors;
