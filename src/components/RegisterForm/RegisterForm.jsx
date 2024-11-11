import { LoadingOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { registeredUserSchema } from "../../validations/registeredUser.validation";
import { baseUrl } from "../../constants/baseUrl";

function RegisterForm() {
  const registerUrl = "/api/identity/register";
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [form] = useForm();

  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: registeredUserSchema,
  });

  const onFinish = (values) => {
    const isInputEmpty = Object.values(values).every(
      (item) => item !== undefined
    );
    if (Object.keys(errors).length === 0 && isInputEmpty) {
      setButtonDisabled(true);
      try {
        axios
          .post(baseUrl + registerUrl, values)
          .then((res) => {
            toast.success(res.data.message);
            form.resetFields();
            navigate("/login");
          })
          .catch((err) => {
            console.log(err);
            err.response.data.data.map((errorMessage) =>
              toast.error(errorMessage.description)
            );
          })
          .finally(() => setButtonDisabled(false));
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please fill all inputs!");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo.errorFields);
  };

  return (
    <Form
      form={form}
      className="desktop:max-w-[404px] w-full flex flex-col gap-9"
      name="basic"
      layout="vertical"
      initialValues={values}
      onChange={handleChange}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Flex vertical className="gap-[30px]">
        <div className="flex flex-col gap-[30px] desktop:grid desktop:grid-cols-2 desktop:gap-3">
          <Form.Item
            className="m-0"
            label={
              <p className="desktop:font-medium text-sm desktop:text-lg">Ad</p>
            }
            name="name"
          >
            <div className="flex flex-col gap-[10px]">
              <Input
                name="name"
                style={{
                  backgroundColor: "#EBF8FE",
                }}
                className="bg-skyBlue-100 border-none h-[50px] px-3 focus:bg-skyBlue-100 hover:bg-skyBlue-100"
              />
              {errors.name && (
                <p className="text-red-100 text-xs">{errors.name}</p>
              )}
            </div>
          </Form.Item>
          <Form.Item
            className="m-0"
            label={
              <p className="desktop:font-medium text-sm desktop:text-lg">
                Soyad
              </p>
            }
            name="surname"
          >
            <div className="flex flex-col gap-[10px]">
              <Input
                name="surname"
                style={{
                  backgroundColor: "#EBF8FE",
                }}
                className="bg-skyBlue-100 border-none h-[50px] px-3 focus:bg-skyBlue-100 hover:bg-skyBlue-100"
              />
              {errors.surname && (
                <p className="text-red-100 text-xs">{errors.surname}</p>
              )}
            </div>
          </Form.Item>
        </div>
        <div className="flex flex-col gap-[30px] desktop:grid desktop:grid-cols-2 desktop:gap-3">
          <Form.Item
            className="m-0"
            label={
              <p className="desktop:font-medium text-sm desktop:text-lg">
                Email
              </p>
            }
            name="email"
          >
            <div className="flex flex-col gap-[10px]">
              <Input
                name="email"
                style={{
                  backgroundColor: "#EBF8FE",
                }}
                className="bg-skyBlue-100 border-none h-[50px] px-3 focus:bg-skyBlue-100 hover:bg-skyBlue-100"
              />
              {errors.email && (
                <p className="text-red-100 text-xs">{errors.email}</p>
              )}
            </div>
          </Form.Item>

          <Form.Item
            className="m-0"
            label={
              <p className="desktop:font-medium text-sm desktop:text-lg">
                İstifadəçi adı
              </p>
            }
            name="userName"
          >
            <div className="flex flex-col gap-[10px]">
              <Input
                name="userName"
                style={{
                  backgroundColor: "#EBF8FE",
                }}
                className="bg-skyBlue-100 border-none h-[50px] px-3 focus:bg-skyBlue-100 hover:bg-skyBlue-100"
              />
              {errors.userName && (
                <p className="text-red-100 text-xs">{errors.userName}</p>
              )}
            </div>
          </Form.Item>
        </div>
        <div className="flex flex-col gap-[30px] desktop:grid desktop:grid-cols-2 desktop:gap-3">
          <Form.Item
            className="m-0"
            label={
              <p className="desktop:font-medium text-sm desktop:text-lg">
                Şifrə
              </p>
            }
            name="password"
          >
            <div className="flex flex-col gap-[10px]">
              <Input.Password
                name="password"
                style={{
                  backgroundColor: "#EBF8FE",
                }}
                className="bg-skyBlue-100 border-none h-[50px] px-3 focus:bg-skyBlue-100 hover:bg-skyBlue-100 target:bg-skyBlue-100"
              />
              {errors.password && (
                <p className="text-red-100 text-xs">{errors.password}</p>
              )}
            </div>
          </Form.Item>
          <Form.Item
            className="m-0"
            label={
              <p className="desktop:font-medium text-sm desktop:text-lg">
                Şifrəni təkrarla
              </p>
            }
            name="confirmedPassword"
          >
            <div className="flex flex-col gap-[10px]">
              <Input.Password
                style={{
                  backgroundColor: "#EBF8FE",
                }}
                name="confirmedPassword"
                className="bg-skyBlue-100 border-none h-[50px] px-3 focus:bg-skyBlue-100 hover:bg-skyBlue-100 target:bg-skyBlue-100"
              />
              {errors.confirmedPassword && (
                <p className="text-red-100 text-xs">
                  {errors.confirmedPassword}
                </p>
              )}
            </div>
          </Form.Item>
        </div>
      </Flex>

      <Flex vertical>
        <Form.Item className="mb-[11px]">
          <Button
            disabled={buttonDisabled}
            className="rounded-lg w-full py-[11px] h-[58px] text-lg desktop:text-2xl font-medium border-skyBlue-500 text-skyBlue-500 desktop:text-white bg-transparent desktop:bg-skyBlue-500 flex gap-4 items-center"
            type="primary"
            htmlType="submit"
          >
            {buttonDisabled ? (
              <Flex align="center" gap={10}>
                <LoadingOutlined />
                Gözləyin
              </Flex>
            ) : (
              "Qeydiyyat"
            )}
          </Button>
        </Form.Item>
        <Link
          to="/login"
          className="w-full text-end underline text-skyBlue-500 text-[12px] desktop:text-[14px]"
        >
          Artıq hesabım var
        </Link>
      </Flex>
    </Form>
  );
}

export default RegisterForm;
