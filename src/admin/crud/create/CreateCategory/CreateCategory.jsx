import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../constants/baseUrl";
import toast from "react-hot-toast";

function CreateCategory({ setActiveSection }) {
  const createCategoryUrl = "/api/admin/category";

  const formData = new FormData();
  const [imagePreview, setImagePreview] = useState(null);
  const [values, setValues] = useState({
    Name: "",
    File: "",
  });
  useEffect(() => {
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value);
    });
  }, [values]);
  const checkInputs = Object.values(values).every(
    (value) => value.length !== 0
  );

  const createCategoryOnSubmit = () => {
    if (checkInputs) {
      try {
        axios
          .post(baseUrl + createCategoryUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              accept: "*/*",
            },
          })
          .then((res) => {
            toast.success("Yeni kitab yaradıldı");
            setActiveSection("categories");
          })
          .catch((err) => toast.error(err.response.data.message));
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("Bütün xanaları doldurun!");
    }
  };
  return (
    <Form
      className="admin-form flex flex-col gap-5"
      onFinish={createCategoryOnSubmit}
    >
      <Flex
        className="bg-white rounded-lg p-5 drop-shadow-md first"
        vertical
        gap={20}
      >
        <h1 className="text-xl font-semibold">Kateqoriya yarat</h1>
        <Flex vertical gap={20}>
          <Form.Item layout="vertical" label="Kateqoriya adı" name="Name">
            <Input
              onChange={(e) => setValues({ ...values, Name: e.target.value })}
            />
          </Form.Item>
          <Form.Item
            className="h-56"
            layout="vertical"
            label="Şəkil"
            name="Description"
          >
            <label className="relative cursor-pointer w-full h-56 flex justify-center items-center rounded-lg border-2 border-dashed bg-[#fafafa]">
              <input
                id="File"
                type="file"
                onChange={(e) => {
                  setImagePreview(URL.createObjectURL(e.target.files[0]));
                  setValues({ ...values, File: e.target.files[0] });
                }}
                className="t-0 left-0 absolute opacity-0 w-full h-full"
              />

              {imagePreview ? (
                <img
                  className="w-full cursor-pointer max-h-full h-full p-3 object-cover duration-300 hover:opacity-75"
                  src={imagePreview}
                  alt=""
                />
              ) : (
                <UploadOutlined className="text-4xl size-52 flex justify-center items-center text-gray-600" />
              )}
            </label>
          </Form.Item>
        </Flex>
      </Flex>
      <Button
        htmlType="submit"
        className="ml-auto bg-skyBlue-500 text-white border-transparent"
      >
        Əlavə et
      </Button>
    </Form>
  );
}

export default CreateCategory;
