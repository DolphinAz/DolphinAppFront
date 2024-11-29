import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../constants/baseUrl";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function AuthorForm({ setActiveSection }) {
  const authorUrl = "/api/admin/author";
  const getAuthorUrl = "/api/author/get";

  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const updateId = urlParams.get("updateId");
  const [imagePreview, setImagePreview] = useState(null);
  const [values, setValues] = useState({
    FullName: "",
    Age: "",
    File: "",
    IsFame: null,
  });

  const formData = new FormData();
  useEffect(() => {
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value);
    });

    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  }, [values]);

  useEffect(() => {
    if (updateId) {
      axios.get(`${baseUrl + getAuthorUrl}/${updateId}`).then((res) => {
        const fixedData = res.data.data;
        setValues({
          ...values,
          FullName: fixedData.fullName,
          Age: fixedData.age,
          IsFame: fixedData.isFame,
        });

        setImagePreview(fixedData.imageUrl);
      });
    }
  }, []);

  const checkInputs = Object.values(values).every(
    (value) => value?.length !== 0 && value !== null
  );

  const createAuthorOnSubmit = () => {
    if (checkInputs) {
      try {
        axios
          .post(baseUrl + authorUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              accept: "*/*",
            },
          })
          .then((res) => {
            setActiveSection("media");
            toast.success("Yeni Yazıçı yaradıldı");
          });
      } catch (error) {}
    } else {
      toast.error("Bütün xanaları doldurun!");
    }
  };
  const updateAuthorOnSubmit = () => {
    axios
      .put(`${baseUrl + authorUrl}/${updateId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "*/*",
        },
      })
      .then((res) => {
        setActiveSection("media");
        toast.success("Yazıçı yeniləndi");
        navigate("/admin");
      });
  };
  return (
    <Form
      onFinish={updateId ? updateAuthorOnSubmit : createAuthorOnSubmit}
      className="admin-form flex flex-col gap-5"
    >
      <div className="grid desktop:grid-cols-[2fr_1fr] gap-5">
        <Flex
          className="bg-white rounded-lg p-5 drop-shadow-md first"
          vertical
          gap={20}
        >
          <h1 className="text-xl font-semibold">Ümumi məlumat</h1>
          <Flex vertical gap={20}>
            <Form.Item layout="vertical" label="Yazıçı adı">
              <Input
                value={values.FullName}
                onChange={(e) =>
                  setValues({ ...values, FullName: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item layout="vertical" label="Yaşı">
              <InputNumber
                className="w-full"
                value={values.Age}
                onChange={(selectedValue) =>
                  setValues({ ...values, Age: selectedValue })
                }
                type="number"
              />
            </Form.Item>
            <Form.Item layout="vertical" label="Məhşurdur?">
              <Select
                value={values.IsFame}
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
          </Flex>
        </Flex>
        <Flex
          className="bg-white rounded-lg p-5 drop-shadow-md first"
          vertical
          gap={20}
        >
          <Form.Item className="!h-64" layout="vertical" label="Yazıçı şəkli">
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
      </div>
      <Flex gap={10} className="ml-auto">
        <Button
          onClick={() => {
            navigate("/admin");
            setActiveSection("media");
          }}
          className="bg-gray-700 text-white"
          htmlType="submit"
        >
          Geri
        </Button>
        <Button
          className={`text-white ${false ? "bg-orange-500" : "bg-skyBlue-500"}`}
          type="submit"
          htmlType="submit"
        >
          {false ? "Düzəliş et" : "Əlavə et"}
        </Button>
      </Flex>
    </Form>
  );
}

export default AuthorForm;
