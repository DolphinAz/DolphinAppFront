import { Button, Flex, Form, Input } from "antd";
import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../constants/baseUrl";
import toast from "react-hot-toast";

function PublisherForm({ setActiveSection }) {
  const publisherUrl = "/api/admin/publisher";
  const getPublisherUrl = "/api/publisher/get";

  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const updateId = urlParams.get("updateId");

  const [values, setValues] = useState({
    Name: "",
  });
  const formData = new FormData();

  useEffect(() => {
    Object.entries(values).map(([key, value]) => {
      formData.append(key, value);
    });
  }, [values]);
  useEffect(() => {
    if (updateId) {
      axios.get(`${baseUrl + getPublisherUrl}/${updateId}`).then((res) => {
        const fixedData = res.data.data;
        setValues({ ...values, Name: fixedData.name });
      });
    }
  }, []);

  console.log(values);

  const checkInputs = Object.values(values).every(
    (value) => value.length !== 0
  );

  const createPublisherOnSubmit = () => {
    if (checkInputs) {
      try {
        axios
          .post(baseUrl + publisherUrl, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              accept: "*/*",
            },
          })
          .then((res) => {
            console.log(res);
            setActiveSection("media");
            toast.success("Yeni nəşriyyatçı yaradıldı");
          });
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.error("Bütün xanaları doldurun!");
    }
  };
  const updatePublisherOnSubmit = () => {
    axios
      .put(`${baseUrl + publisherUrl}/${updateId}`, formData, {
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
      onFinish={updateId ? updatePublisherOnSubmit : createPublisherOnSubmit}
    >
      <Flex
        className="bg-white rounded-lg p-5 drop-shadow-md first"
        vertical
        gap={20}
      >
        <h1 className="text-xl font-semibold">
          {updateId ? "Nəşriyyatçını yenilə" : "Nəşriyyatçı yarat"}
        </h1>
        <Flex vertical gap={20}>
          <Form.Item layout="vertical" label="Nəşriyyatçı adı">
            <Input
              value={values.Name}
              onChange={(e) => setValues({ ...values, Name: e.target.value })}
            />
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
          type="submit"
          htmlType="submit"
        >
          {updateId ? "Düzəliş et" : "Əlavə et"}
        </Button>
      </Flex>
    </Form>
  );
}

export default PublisherForm;
