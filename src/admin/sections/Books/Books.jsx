import React, { useEffect, useRef, useState } from "react";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, Pagination, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import CreateBook from "../../crud/create/CreateBook/CreateBook";
import axios from "axios";
import { baseUrl } from "../../../constants/baseUrl";
import AdminTable from "../../components/AdminTable/AdminTable";

function Books({ setActiveSection }) {
  const booksUrl = "/api/book/get";
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios.get(baseUrl + booksUrl).then((res) => {
      const result = res.data.data.map((book, index) => ({
        key: index + 1,
        bookImage: book.imageUrl,
        bookName: book.name,
        discountPrice: book.discountPrice,
        purchasePrice: book.purchasePrice,
        categories: book.categories,
      }));
      setBooks(result);
    });
  }, []);

  const columns = [
    {
      title: "No",
      render: (_, index) => <span>{index + 1}</span>,
    },
    {
      title: "Kitabın şəkili",
      render: (book) => (
        <div className="flex justify-center">
          <img
            className="w-[40px] h-[40px] object-cover rounded-lg"
            src={book.bookImage}
            alt={book.bookName}
          />
        </div>
      ),
    },
    {
      title: "Kitab adı",
      render: (book) => <span>{book.bookName}</span>,
    },
    {
      title: "Endirim",
      render: (book) => <span>{book.discountPrice}</span>,
    },
    {
      title: "Qiymət",
      render: (book) => <span>{book.purchasePrice}</span>,
    },
    {
      title: "Kateqoriyalar",
      render: (book) => (
        <div className="flex gap-2 justify-center">
          {book.categories && book.categories.length > 0 ? (
            book.categories.map((category, index) => (
              <span
                key={index}
                className="bg-gray-350 py-1 px-2 text-xs rounded-full text-nowrap"
              >
                {category.name}
              </span>
            ))
          ) : (
            <span>-</span>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      render: (book) => (
        <button
          onClick={() => handleDelete(book.id)}
          className="bg-red-100 py-1 px-2 rounded-lg text-white"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Flex vertical gap={10}>
      <Button
        onClick={() => setActiveSection("create-book")}
        className="w-fit ml-auto bg-skyBlue-500 text-white border-transparent"
      >
        Kitab əlavə et
      </Button>
      <AdminTable columns={columns} data={books} />
    </Flex>
  );
}
export default Books;
