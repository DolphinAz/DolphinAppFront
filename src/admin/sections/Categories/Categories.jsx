import React, { useEffect, useState } from "react";
import AdminTable from "../../components/AdminTable/AdminTable";
import axios from "axios";
import { baseUrl } from "../../../constants/baseUrl";
import { Button, Flex } from "antd";

function Categories({ setActiveSection }) {
  const categoriesUrl = "/api/category/get";
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl + categoriesUrl)
      .then((res) => setCategories(res.data.data));
  }, []);

  const columns = [
    {
      title: "No",
      render: (_, index) => <span>{index + 1}</span>,
    },
    {
      title: "Şəkil",
      render: (category) => (
        <div className="flex justify-center">
          <img
            className="w-[40px] h-[40px] object-cover rounded-lg"
            src={category.imageUrl}
            alt={category.name}
          />
        </div>
      ),
    },
    {
      title: "Kateqoriya adı",
      render: (category) => <span>{category.name}</span>,
    },
    {
      title: "Actions",
      render: () => (
        <div>
          <Button className="bg-red-100 text-white hover:!border-red-100 hover:!text-red-100">
            Sil
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Flex vertical gap={10}>
      <div className="ml-auto">
        <Button
          onClick={() => setActiveSection("create-category")}
          className="bg-skyBlue-500 text-white border-transparent"
        >
          Kateqoriya yarat
        </Button>
      </div>
      <AdminTable columns={columns} data={categories} />
    </Flex>
  );
}

export default Categories;
