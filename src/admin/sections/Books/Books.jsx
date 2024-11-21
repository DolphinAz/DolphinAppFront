import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import CreateBook from "../../crud/create/CreateBook/CreateBook";
const data = [
  {
    key: "1",
    bookName: "John Brown",
    stockCount: 32,
    purchasePrice: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    bookName: "Joe Black",
    stockCount: 42,
    purchasePrice: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    bookName: "Jim Green",
    stockCount: 32,
    purchasePrice: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    bookName: "Jim Red",
    stockCount: 32,
    purchasePrice: 32,
    address: "London No. 2 Lake Park",
  },
];
function Books({ setActiveSection }) {
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
      title: "Kitab adı",
      dataIndex: "bookName",
      key: "bookName",
      width: "30%",
      ...getColumnSearchProps("bookName"),
    },
    {
      title: "Stok",
      dataIndex: "stockCount",
      key: "stockCount",
      width: "20%",
    },
    {
      title: "Qiymət",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      width: "20%",
    },
  ];
  return (
    <Flex vertical gap={10}>
      <Button
        onClick={() => setActiveSection(<CreateBook />)}
        className="w-fit ml-auto bg-skyBlue-500 text-white border-transparent"
      >
        Kitab əlavə et
      </Button>
      <Table columns={columns} dataSource={data} />
    </Flex>
  );
}
export default Books;
