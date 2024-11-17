import { Button, Checkbox, Flex, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../constants/baseUrl";
import { LoadingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { loginUserSchema } from "../../validations/loginUser.validation";
import { useForm } from "antd/es/form/Form";

function LoginForm() {
  const loginUrl = "/api/identity/login";
  const confirmEmailUrl = "/api/auth/confirm-email";
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const userId = urlParams.get("UserId");
  const confirmToken = urlParams.get("Token");

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const [form] = useForm();
  const { values, errors, handleChange } = useFormik({
    initialValues: { emailorUserName: "", password: "" },
    validationSchema: loginUserSchema,
  });

  useEffect(() => {
    if (confirmToken) {
      try {
        axios
          .get(
            `${
              baseUrl + confirmEmailUrl
            }?UserId=${userId}&Token=${confirmToken}`
          )
          .then((res) => {
            toast.success(res.data.message);
            navigate("/login");
          })
          .catch((err) => toast.error(err.message));
      } catch (error) {
        toast.error(error);
      }
    }
  }, []);
  const onFinish = (values) => {
    const isInputEmpty = Object.values(values).every((item) => item !== "");

    if (Object.keys(errors).length === 0 && isInputEmpty) {
      try {
        setButtonDisabled(true);
        axios
          .post(baseUrl + loginUrl, values)
          .then((res) => {
            localStorage.setItem("accessToken", res.data.data.accessToken);
            localStorage.setItem("expiration", res.data.data.expiration);
            localStorage.setItem("refreshToken", res.data.data.refreshToken);
            form.resetFields();
            toast.success("Login successful! Welcome back.");
            navigate("/");
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          })
          .finally(() => setButtonDisabled(false));
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    } else {
      toast.error("Please fill all inputs!");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      className="desktop:max-w-[404px] w-full flex flex-col gap-3"
      name="basic"
      layout="vertical"
      initialValues={values}
      onChange={handleChange}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Flex vertical>
        <Form.Item
          validateStatus={errors.emailorUserName && "error"}
          help={<p className="mt-1 text-sm">{errors.emailorUserName}</p>}
          label={
            <p className="desktop:font-medium text-sm desktop:text-lg">
              E-mail or username
            </p>
          }
          name="emailorUserName"
        >
          <div className="flex flex-col gap-[10px]">
            <Input
              name="emailorUserName"
              style={{
                backgroundColor: "#EBF8FE",
              }}
              className="bg-skyBlue-100 border-none h-[50px] px-3 focus:bg-skyBlue-100 hover:bg-skyBlue-100"
            />
          </div>
        </Form.Item>

        <Form.Item
          validateStatus={errors.password && "error"}
          help={<p className="mt-1 text-sm">{errors.password}</p>}
          label={
            <p className="desktop:font-medium text-sm desktop:text-lg">Şifrə</p>
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
          </div>
        </Form.Item>

        <Flex justify="space-between" align="center">
          <Form.Item className="m-0" valuePropName="checked">
            <Checkbox name="remember" className="desktop:text-sm text-[12px]">
              Məni xatırla
            </Checkbox>
          </Form.Item>
          <Link
            to="/reset-password"
            onClick={() => setIsResetActive(true)}
            className="desktop:text-gray-700 desktop:text-sm text-[12px] text-skyBlue-500 underline desktop:no-underline"
          >
            Şifrəmi unutdum
          </Link>
        </Flex>
      </Flex>
      <Flex vertical gap={10}>
        <Form.Item className="m-0">
          <Button
            disabled={buttonDisabled}
            className="rounded-lg w-full py-[11px] h-[58px] text-lg desktop:text-2xl font-medium border-skyBlue-500 text-skyBlue-500 desktop:text-white bg-transparent desktop:bg-skyBlue-500"
            type="primary"
            htmlType="submit"
          >
            {buttonDisabled ? (
              <span className="flex items-center gap-[10px]">
                <LoadingOutlined />
                Gözləyin
              </span>
            ) : (
              "Giriş"
            )}
          </Button>
        </Form.Item>
        <Link
          to="/register"
          className="hidden desktop:block w-full text-end underline text-skyBlue-500 text-[14px]"
        >
          Hesabınız yoxdur?
        </Link>
      </Flex>
    </Form>
  );
}

export default LoginForm;
