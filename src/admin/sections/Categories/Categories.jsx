import React, { useEffect, useState } from "react";
import AdminTable from "../../components/AdminTable/AdminTable";
import axios from "axios";
import { baseUrl } from "../../../constants/baseUrl";
import { Button, Flex } from "antd";

function Categories({ setActiveSection }) {
  const categoriesUrl = "/api/category/get";
  const deleteCategoriesUrl = "/api/admin/category";
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl + categoriesUrl)
      .then((res) => setCategories(res.data.data));
  }, [categories]);

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
            className="w-full h-[40px] object-cover rounded-lg"
            src={category.imageUrl}
            alt={category.name}
          />
        </div>
      ),
    },
    {
      title: "Kateqoriya adı",
      render: (category) => <span className="text-base">{category.name}</span>,
    },
    {
      title: "Actions",
      render: (category) => (
        <Flex justify="center" gap={5}>
          <Button
            onClick={() => handleDelete(category.id)}
            className="bg-red-100 py-1 px-2 rounded-lg text-white border-transparent hover:!border-red-100 hover:!text-red-100"
          >
            Sil
          </Button>
          <Button
            onClick={() => handleUpdate(category.id)}
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
      .delete(`${baseUrl + deleteCategoriesUrl}/${id}`)
      .then((res) => console.log(res));
  };

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
