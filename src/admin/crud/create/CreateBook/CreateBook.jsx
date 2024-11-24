import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, InputNumber, Select, Tag } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../constants/baseUrl";
import toast from "react-hot-toast";
import Books from "../../../sections/Books/Books";

function CreateBook({ setActiveSection }) {
  const publisherUrl = "/api/publisher/get";
  const sellerUrl = "/api/seller/get";
  const authorUrl = "/api/author/get";
  const categoryUrl = "/api/category/get";
  const languageUrl = "/api/language/get";
  const createBookUrl = "/api/admin/book";

  const [imagePreview, setImagePreview] = useState(null);

  const [publishers, setPublishers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);

  const [values, setValues] = useState({
    Name: "",
    Description: "",
    StockCount: "",
    PageCount: "",
    Year: "",
    File: "",
    PurchasePrice: "",
    IsFame: "",
    AuthorId: "",
    PublisherId: "",
    SellerId: "",
    LanguageId: "",
    CategoryIds: [],
  });
  const formData = new FormData();
  useEffect(() => {
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value);
    });
  }, [values]);

  const checkInputs = Object.values(values).every(
    (value) => value.length !== 0
  );

  const createBookOnSubmit = () => {
    if (checkInputs) {
      try {
        axios
          .post(baseUrl + createBookUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              accept: "*/*",
            },
          })
          .then((res) => {
            console.log(res);
            setActiveSection(<Books setActiveSection={setActiveSection} />);
            toast.success("Yeni kitab yaradıldı");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            console.log("Erro");
          });
      } catch (error) {
        // toast.error(error);
        console.log(error);
      }
    } else {
      toast.error("Bütün xanaları doldurun!");
    }
  };

  useEffect(() => {
    try {
      axios
        .get(baseUrl + publisherUrl)
        .then((res) => setPublishers(res.data.data))
        .catch((err) => toast.error(err.message));
      axios
        .get(baseUrl + sellerUrl)
        .then((res) => setSellers(res.data.data))
        .catch((err) => toast.error(err.message));
      axios
        .get(baseUrl + authorUrl)
        .then((res) => setAuthors(res.data.data))
        .catch((err) => toast.error(err.message));
      axios
        .get(baseUrl + categoryUrl)
        .then((res) => setCategories(res.data.data))
        .catch((err) => toast.error(err.message));
      axios
        .get(baseUrl + languageUrl)
        .then((res) => setLanguages(res.data.data))
        .catch((err) => toast.error(err.message));
    } catch (error) {
      toast.error(error);
    }
  }, []);

  const categoryRender = (props) => {
    const { label, closable, onClose } = props;

    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <Tag
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
    <Form
      initialValues={values}
      onFinish={createBookOnSubmit}
      className="admin-form flex flex-col gap-5"
    >
      <div className="create-book-form">
        <Flex
          className="bg-white rounded-lg p-5 drop-shadow-md first"
          vertical
          gap={20}
        >
          <h1 className="text-xl font-semibold">Ümumi məlumat</h1>
          <Flex vertical gap={20}>
            <Form.Item layout="vertical" label="Kitab adı" name="Name">
              <Input
                onChange={(e) => setValues({ ...values, Name: e.target.value })}
              />
            </Form.Item>
            <Form.Item
              className="h-24"
              layout="vertical"
              label="Təsvir"
              name="Description"
            >
              <TextArea
                onChange={(e) =>
                  setValues({ ...values, Description: e.target.value })
                }
                className="!resize-none !h-24"
              />
            </Form.Item>
          </Flex>
        </Flex>
        <Flex
          vertical
          gap={20}
          className="bg-white rounded-lg p-5 drop-shadow-md h-80 second"
        >
          <h1 className="text-xl font-semibold">Kitabın şəkili</h1>

          <Form.Item>
            <label className="relative cursor-pointer w-full h-60 flex justify-center items-center rounded-lg border-2 border-dashed bg-[#fafafa]">
              <input
                id="File"
                type="file"
                onChange={(e) => {
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                  setValues({ ...values, File: e.target.files[0] });
                }}
                className="t-0 left-0 absolute opacity-0 w-full"
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
          </Form.Item>
        </Flex>
        <Flex
          className="bg-white rounded-lg p-5 drop-shadow-md third"
          vertical
          gap={20}
        >
          <h1 className="text-xl font-semibold">Kitabın detalları</h1>
          <div className="flex flex-col desktop:grid desktop:grid-cols-4 gap-5">
            <Form.Item layout="vertical" label="Qiyməti" name="PurchasePrice">
              <InputNumber
                onChange={(selectedValue) =>
                  setValues({ ...values, PurchasePrice: selectedValue })
                }
                className="w-full"
                type="number"
              />
            </Form.Item>
            <Form.Item layout="vertical" label="Stok" name="StockCount">
              <InputNumber
                onChange={(selectedValue) =>
                  setValues({ ...values, StockCount: selectedValue })
                }
                className="w-full"
                type="number"
              />
            </Form.Item>
            <Form.Item layout="vertical" label="Səhifə sayı" name="PageCount">
              <InputNumber
                onChange={(selectedValue) =>
                  setValues({ ...values, PageCount: selectedValue })
                }
                className="w-full"
                type="number"
              />
            </Form.Item>
            <Form.Item layout="vertical" label="İli" name="Year">
              <InputNumber
                onChange={(selectedValue) =>
                  setValues({ ...values, Year: selectedValue })
                }
                className="w-full"
                type="number"
              />
            </Form.Item>
          </div>
        </Flex>
        <Flex
          className="bg-white rounded-lg p-5 drop-shadow-md fourth"
          vertical
          gap={20}
        >
          <h1 className="text-xl font-semibold">Digər</h1>
          <div className="flex flex-col desktop:grid desktop:grid-cols-[1fr_1fr_2fr] gap-5">
            <Form.Item layout="vertical" label="Məhşurdur?" name="IsFame">
              <Select
                onChange={(selectedValue) =>
                  setValues({ ...values, IsFame: selectedValue })
                }
                placeholder="Seç"
                options={[
                  { value: true, label: "Bəli" },
                  { value: false, label: "Xeyr" },
                ]}
              />
            </Form.Item>
            <Form.Item layout="vertical" label="Dili" name="LanguageId">
              <Select
                onChange={(selectedValue) =>
                  setValues({ ...values, LanguageId: selectedValue })
                }
                placeholder="Seç"
                options={languages.map((language) => ({
                  value: language.id,
                  label: language.name,
                }))}
              />
            </Form.Item>
            <Form.Item
              layout="vertical"
              label="Kateqoriyalar"
              name="CategoryIds"
            >
              <Select
                onChange={(selectedValue) =>
                  setValues({ ...values, CategoryIds: selectedValue })
                }
                mode="multiple"
                tagRender={categoryRender}
                placeholder="Seç"
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
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
            <Form.Item layout="vertical" label="Yazıçı" name="AuthorId">
              <Select
                onChange={(selectedValue) =>
                  setValues({ ...values, AuthorId: selectedValue })
                }
                placeholder="Seç"
                options={authors.map((author) => ({
                  value: author.id,
                  label: author.fullName,
                }))}
              />
            </Form.Item>
            <Form.Item layout="vertical" label="Nəşriyyatçı" name="PublisherId">
              <Select
                onChange={(selectedValue) =>
                  setValues({ ...values, PublisherId: selectedValue })
                }
                placeholder="Seç"
                options={publishers.map((publisher) => ({
                  value: publisher.id,
                  label: publisher.name,
                }))}
              />
            </Form.Item>
            <Form.Item layout="vertical" label="Satıcı" name="SellerId">
              <Select
                onChange={(selectedValue) =>
                  setValues({ ...values, SellerId: selectedValue })
                }
                placeholder="Seç"
                options={sellers.map((seller) => ({
                  value: seller.id,
                  label: seller.name,
                }))}
              />
            </Form.Item>
          </div>
        </Flex>
        <Flex className="sixth" gap={10}>
          <Button
            onClick={() => setActiveSection("books")}
            className="ml-auto bg-gray-700 text-white"
            type="submit"
          >
            Geri
          </Button>
          <Button
            className="bg-skyBlue-500 text-white"
            type="submit"
            htmlType="submit"
          >
            Əlavə et
          </Button>
        </Flex>
      </div>
    </Form>
  );
}

export default CreateBook;
