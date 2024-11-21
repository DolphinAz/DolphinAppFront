import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, InputNumber, Select, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

function CreateBook() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const categories = [
    {
      value: "qorxulu",
      color: "#FF4D4F",
    },
    {
      value: "roman",
      color: "#1890FF",
    },
    {
      value: "tarixi",
      color: "#FAAD14",
    },
    {
      value: "romantik",
      color: "#FF85C0",
    },
    {
      value: "nağıl",
      color: "#52C41A",
    },
    {
      value: "komediya",
      color: "#722ED1",
    },
  ];

  const categoryRender = (props) => {
    const { label, value, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const category = categories.find((cat) => cat.value === value);
    const color = category ? category.color : "default";

    return (
      <Tag
        color={color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          margin: 4,
        }}
      >
        {label}
      </Tag>
    );
  };

  return (
    <Form className="admin-form flex flex-col gap-5">
      <div className="create-book-form">
        <Flex
          className="bg-white rounded-lg p-5 drop-shadow-md first"
          vertical
          gap={20}
        >
          <h1 className="text-xl font-semibold">Ümumi məlumat</h1>
          <Flex vertical gap={20}>
            <Form.Item layout="vertical" label="Kitab adı" name="username">
              <Input />
            </Form.Item>
            <Form.Item
              className="h-24"
              layout="vertical"
              label="Təsvir"
              name="description"
            >
              <TextArea className="!resize-none !h-24" />
            </Form.Item>
          </Flex>
        </Flex>
        <Flex
          vertical
          gap={20}
          className="bg-white rounded-lg p-5 drop-shadow-md h-80 second"
        >
          <h1 className="text-xl font-semibold">Kitabın şəkili</h1>

          <label className="relative cursor-pointer w-full h-60 flex justify-center items-center rounded-lg border-2 border-dashed bg-[#fafafa]">
            <input
              onChange={handleFileChange}
              type="file"
              className="t-0 left-0 absolute opacity-0"
            />
            {imagePreview ? (
              <img
                className="w-full cursor-pointer max-h-full p-3 object-cover duration-300 hover:opacity-75"
                src={imagePreview}
                alt=""
              />
            ) : (
              <UploadOutlined className="text-4xl size-52 flex justify-center items-center text-gray-600" />
            )}
          </label>
        </Flex>
        <Flex
          className="bg-white rounded-lg p-5 drop-shadow-md third"
          vertical
          gap={20}
        >
          <h1 className="text-xl font-semibold">Kitabın detalları</h1>
          <div className="grid grid-cols-4 gap-5">
            <Form.Item layout="vertical" label="Qiyməti" name="purchasePrice">
              <InputNumber className="w-full" type="number" />
            </Form.Item>
            <Form.Item layout="vertical" label="Stok" name="stockCount">
              <InputNumber className="w-full" type="number" />
            </Form.Item>
            <Form.Item layout="vertical" label="Səhifə sayı" name="pageCount">
              <InputNumber className="w-full" type="number" />
            </Form.Item>
            <Form.Item layout="vertical" label="İli" name="year">
              <InputNumber className="w-full" type="number" />
            </Form.Item>
          </div>
        </Flex>
        <Flex
          className="bg-white rounded-lg p-5 drop-shadow-md fourth"
          vertical
          gap={20}
        >
          <h1 className="text-xl font-semibold">Digər</h1>
          <div className="grid grid-cols-[1fr_1fr_2fr] gap-5">
            <Form.Item layout="vertical" label="Məhşurdur?">
              <Select
                defaultValue="Seç"
                options={[
                  { value: true, label: "Bəli" },
                  { value: false, label: "Xeyr" },
                ]}
              />
            </Form.Item>
            <Form.Item layout="vertical" label="Dili">
              <Select
                defaultValue="Seç"
                options={[
                  { value: "azerbaijan", label: "Azərbaycan" },
                  { value: "turkey", label: "Türkiyə" },
                  { value: "georgia", label: "Gürcüstan" },
                  { value: "russia", label: "Rusiya" },
                  { value: "iran", label: "İran" },
                  { value: "germany", label: "Almaniya" },
                  { value: "france", label: "Fransa" },
                  { value: "italy", label: "İtaliya" },
                  { value: "spain", label: "İspaniya" },
                  { value: "japan", label: "Yaponiya" },
                ]}
              />
            </Form.Item>
            <Form.Item layout="vertical" label="Kateqoriyalar">
              <Select
                mode="multiple"
                tagRender={categoryRender}
                defaultValue={[]}
                style={{
                  width: "100%",
                }}
                options={categories}
              />
            </Form.Item>
          </div>
        </Flex>
        <Flex
          className="bg-white rounded-lg p-5 drop-shadow-md fifth"
          vertical
          gap={20}
        >
          <h1 className="text-xl font-semibold">Referanslar</h1>
          <div className="flex flex-col gap-5">
            <Form.Item layout="vertical" label="Yazıçı" name="authorId">
              <InputNumber className="w-full" type="number" />
            </Form.Item>
            <Form.Item layout="vertical" label="Nəşriyyatçı" name="publisherId">
              <InputNumber className="w-full" type="number" />
            </Form.Item>
            <Form.Item layout="vertical" label="Satıcı" name="sellerId">
              <InputNumber className="w-full" type="number" />
            </Form.Item>
          </div>
        </Flex>
        <Button className="ml-auto sixth bg-skyBlue-500 text-white">
          Əlavə et
        </Button>
      </div>
    </Form>
  );
}

export default CreateBook;
