import { Button, Flex, Form, Input } from "antd";
import React, { useState } from "react";
import siteLogo from "../../assets/images/dolphin-logo.png";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function AdminLogin() {
  const adminLoginUrl = "/api/admin/identity/login";

  const navigate = useNavigate();
  const [values, setValues] = useState({
    emailorUserName: "",
    password: "",
  });

  const loginOnSubmit = () => {
    if (Object.values(values).every((item) => item !== "")) {
      try {
        axios
          .post(baseUrl + adminLoginUrl, values)
          .then((res) => {
            toast.success("Uğurla giriş edildi");
            console.log(res);
            navigate("/admin");
            localStorage.setItem("accessTokenAdmin", res.data.data.accessToken);
            setValues({ emailorUserName: "", password: "" });
          })
          .catch((err) => {
            toast.error(err.response.data?.message);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Boş xanaları doldurun!");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-skyBlue-100">
      <Form
        onFinish={loginOnSubmit}
        className="grid desktop:grid-cols-2 gap-2 w-3/4 desktop:h-[75vh] !bg-white rounded-2xl shadow-lg"
      >
        <Flex
          align="center"
          gap={10}
          justify="center"
          className="rounded-t-2xl desktop:rounded-tr-none desktop:rounded-l-2xl bg-gradient-to-r from-skyBlue-500 to-skyBlue-400"
        >
          <span className="w-10 desktop:w-96 h-10 desktop:h-96 rounded-full invisible desktop:visible">
            <img className="w-full h-full" src={siteLogo} alt="" />
          </span>
        </Flex>
        <Flex vertical gap={20} justify="center" className="px-6 py-8">
          <Flex className="custom-form-item" vertical gap={10}>
            <h1 className="text-2xl desktop:text-4xl font-semibold text-center text-black-100 mb-6">
              Xoş gəlmisiniz🖐
            </h1>
            <Form.Item
              layout="vertical"
              label="Email və ya istifadəçi adı"
              className="mb-0"
            >
              <Input
                value={values.emailorUserName}
                onChange={(e) =>
                  setValues({ ...values, emailorUserName: e.target.value })
                }
                className="py-2"
              />
            </Form.Item>
            <Form.Item layout="vertical" label="Şifrə">
              <Input
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className="py-2"
              />
            </Form.Item>
            <Button
              htmlType="submit"
              className="bg-skyBlue-500 text-white py-6 text-lg font-medium"
            >
              Daxil ol
            </Button>
          </Flex>
          <p></p>
        </Flex>
      </Form>
    </div>
  );
}

export default AdminLogin;
