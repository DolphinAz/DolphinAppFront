import React, { useEffect, useState } from "react";
import AdminTable from "../../components/AdminTable/AdminTable";
import { Button, Flex, Skeleton } from "antd";
import axios from "axios";
import { baseUrl } from "../../../constants/baseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Publishers({ setActiveSection }) {
  const getPublisherUrl = "/api/publisher/get";
  const publisherUrl = "/api/admin/publisher";

  const navigate = useNavigate();
  const [publishers, setPublishers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`${baseUrl + getPublisherUrl}?Page=${currentPage}&?Count=10`)
      .then((res) => {
        setPublishers(res.data.data);
        setTotalCount(res.data.totalCount);
      });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    axios.delete(`${baseUrl + publisherUrl}/${id}`).then((res) => {
      toast.success("Nəşriyyatçı uğurla silindi!");
      setPublishers((prev) => prev.filter((publisher) => publisher.id !== id));
    });
  };

  const handleUpdate = (id) => {
    navigate("?updateId=" + id);
  };

  const columns = [
    {
      title: "No",
      render: (_, index) => <span>{index + 1}</span>,
    },
    {
      title: "Adı",
      render: (publisher) => publisher.name,
    },
    {
      title: "Actions",
      render: (publisher) => (
        <Flex justify="center" gap={5}>
          <Button
            onClick={() => handleDelete(publisher.id)}
            className="bg-red-100 py-1 px-2 rounded-lg text-white border-transparent hover:!border-red-100 hover:!text-red-100"
          >
            Sil
          </Button>
          <Button
            onClick={() => {
              handleUpdate(publisher.id);
              setActiveSection("update-publisher");
            }}
            className="bg-orange-500 py-1 px-2 rounded-lg text-white border-transparent hover:!border-orange-500 hover:!text-orange-500"
          >
            Dəyişdir
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <Flex vertical gap={10}>
      {publishers.length ? (
        <>
          <Button
            onClick={() => setActiveSection("create-publisher")}
            className="w-fit ml-auto bg-skyBlue-500 text-white border-transparent"
          >
            Nəşriyyatçı əlavə et
          </Button>
          <AdminTable columns={columns} data={publishers} />
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

export default Publishers;
