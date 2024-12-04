import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../constants/baseUrl";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

function SellerForm({ setActiveSection }) {
  const sellerUrl = "/api/admin/seller";
  const getSellerUrl = "/api/seller/get";

  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const updateId = urlParams.get("updateId");

  const [imagePreview, setImagePreview] = useState(null);
  const [values, setValues] = useState({
    Name: "",
    File: "",
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
  useEffect(() => {
    if (updateId) {
      axios.get(`${baseUrl + getSellerUrl}/${updateId}`).then((res) => {
        const fixedData = res.data.data;
        setValues({ ...values, Name: fixedData.name });
        setImagePreview(fixedData.imageUrl);
      });
    }
  }, []);

  const createSellerOnSubmit = () => {
    if (checkInputs) {
      try {
        axios
          .post(baseUrl + sellerUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              accept: "*/*",
            },
          })
          .then((res) => {
            console.log(res);
            setActiveSection("media");
            toast.success("Yeni satıcı yaradıldı");
          })
          .catch((err) => {
            console.log(err);
            // toast.error(err.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Bütün xanaları doldurun!");
    }
  };

  const updateSellerOnSubmit = () => {
    axios
      .put(`${baseUrl + sellerUrl}/${updateId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "*/*",
        },
      })
      .then((res) => {
        setActiveSection("media");
        toast.success("Nəşriyyatçı yeniləndi");
        navigate("/admin");
      });
  };

  return (
    <Form
      className="admin-form flex flex-col gap-5"
      onFinish={updateId ? updateSellerOnSubmit : createSellerOnSubmit}
    >
      <Flex
        className="bg-white rounded-lg p-5 drop-shadow-md first"
        vertical
        gap={20}
      >
        <h1 className="text-xl font-semibold">
          {updateId ? "Satıcını yenilə" : "Satıcı yarat"}
        </h1>
        <Flex vertical gap={20}>
          <Form.Item layout="vertical" label="Satıcı adı">
            <Input
              value={values.Name}
              onChange={(e) => setValues({ ...values, Name: e.target.value })}
            />
          </Form.Item>
          <Form.Item className="h-56" layout="vertical" label="Şəkil">
            <label className="relative cursor-pointer w-full h-56 flex justify-center items-center rounded-lg border-2 border-dashed bg-[#fafafa]">
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
                  className="w-full !cursor-pointer max-h-full h-full p-3 object-cover duration-300 hover:opacity-75"
                  src={imagePreview}
                  alt=""
                />
              ) : (
                <UploadOutlined className="cursor-pointer text-4xl size-52 flex justify-center items-center text-gray-600" />
              )}
            </label>
          </Form.Item>
        </Flex>
      </Flex>
      <Flex className="ml-auto" gap={5}>
        <Button
          onClick={() => {
            navigate("/admin");
            setActiveSection("media");
          }}
          className="bg-gray-700 text-white"
        >
          Geri
        </Button>
        <Button
          className={`text-white ${
            updateId ? "bg-orange-500" : "bg-skyBlue-500"
          }`}
          htmlType="submit"
        >
          {updateId ? "Düzəliş et" : "Əlavə et"}
        </Button>
      </Flex>
    </Form>
  );
}

export default SellerForm;
