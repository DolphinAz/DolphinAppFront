import React, { useEffect, useRef, useState } from "react";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Flex, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import CreateBook from "../../crud/create/CreateBook/CreateBook";
import axios from "axios";
import { baseUrl } from "../../../constants/baseUrl";

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
  const [sortOrder, setSortOrder] = useState("ascend");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === "ascend" ? "descend" : "ascend"; // Toggle sort order
    setSortOrder(newSortOrder);

    const sorted = [...books].sort((a, b) => {
      return newSortOrder === "ascend" ? a.key - b.key : b.key - a.key;
    });
    setBooks(sorted);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

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
      title: "Kitabın şəkili",
      dataIndex: "bookImage",
      render: (url) => <img src={url} />,
    },
    {
      title: "Kitab adı",
      dataIndex: "bookName",
      key: "bookName",
      width: "30%",
      ...getColumnSearchProps("bookName"),
    },
    {
      title: "Endirim",
      dataIndex: "discountPrice",
      key: "discountPrice",
      width: "20%",
    },
    {
      title: "Qiymət",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      width: "20%",
    },
    {
      title: "Kateqoriyalar",
      dataIndex: "categories",
      key: "categories",
      width: "20%",
      render: (categories) => (
        <div className="flex gap-2">
          {categories.map((category, index) => (
            <span key={index} className="bg-gray-1050 p-1 px-2 rounded-full">
              {category.name}
            </span>
          ))}
        </div>
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
      <Table columns={columns} dataSource={books} />
    </Flex>
  );
}
export default Books;
