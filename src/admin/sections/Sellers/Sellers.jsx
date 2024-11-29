import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../constants/baseUrl";
import AdminTable from "../../components/AdminTable/AdminTable";
import { Button, Flex } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Sellers({ setActiveSection }) {
  const getSellerUrl = "/api/seller/get";
  const sellersUrl = "/api/admin/seller";

  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(baseUrl + getSellerUrl).then((res) => setSellers(res.data.data));
  }, [sellers]);

  const columns = [
    {
      title: "No",
      render: (_, index) => <span>{index + 1}</span>,
    },
    {
      title: "Satıcı şəkili",
      render: (seller) => (
        <div className="flex justify-center">
          <img
            className="w-[40px] h-[40px] object-cover rounded-lg"
            src={seller.imageUrl}
            alt={seller.name}
          />
        </div>
      ),
    },
    {
      title: "Satıcı adı",
      render: (seller) => seller.name,
    },
    {
      title: "Sıra",
      render: (seller) => seller.ranking,
    },
    {
      title: "Actions",
      render: (seller) => (
        <Flex justify="center" gap={5}>
          <Button
            onClick={() => handleDelete(seller.id)}
            className="bg-red-100 py-1 px-2 rounded-lg text-white border-transparent hover:!border-red-100 hover:!text-red-100"
          >
            Sil
          </Button>
          <Button
            onClick={() => {
              handleUpdate(seller.id);
              setActiveSection("update-seller");
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
    axios
      .delete(`${baseUrl + sellersUrl}/${id}`)
      .then((res) => toast.success("Satıcı uğurla silindi!"));
  };

  const handleUpdate = (id) => {
    navigate("?updateId=" + id);
  };

  return (
    <Flex vertical gap={10}>
      <Button
        onClick={() => setActiveSection("create-seller")}
        className="w-fit ml-auto bg-skyBlue-500 text-white border-transparent"
      >
        Satıcı əlavə et
      </Button>
      <AdminTable columns={columns} data={sellers} />
    </Flex>
  );
}

export default Sellers;
