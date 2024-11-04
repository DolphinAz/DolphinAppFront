import { Button, Checkbox, Flex, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="desktop:max-w-[404px] w-full flex flex-col gap-9"
      name="basic"
      layout="vertical"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Flex vertical>
        <Form.Item
          label={
            <p className="desktop:font-medium text-sm desktop:text-lg">
              Ad Soyad
            </p>
          }
          name="name-surname"
          rules={[
            {
              required: true,
              message: "Please input your name and surname!",
            },
          ]}
        >
          <Input
            style={{
              backgroundColor: "#EBF8FE",
            }}
            className="bg-skyBlue-100 border-none h-[50px] px-3 focus:bg-skyBlue-100 hover:bg-skyBlue-100"
          />
        </Form.Item>
        <Form.Item
          label={
            <p className="desktop:font-medium text-sm desktop:text-lg">Email</p>
          }
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            style={{
              backgroundColor: "#EBF8FE",
            }}
            className="bg-skyBlue-100 border-none h-[50px] px-3 focus:bg-skyBlue-100 hover:bg-skyBlue-100"
          />
        </Form.Item>

        <Form.Item
          label={
            <p className="desktop:font-medium text-sm desktop:text-lg">Şifrə</p>
          }
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            style={{
              backgroundColor: "#EBF8FE",
            }}
            className="bg-skyBlue-100 border-none h-[50px] px-3 focus:bg-skyBlue-100 hover:bg-skyBlue-100 target:bg-skyBlue-100"
          />
        </Form.Item>
      </Flex>

      <Flex vertical>
        <Form.Item className="mb-[11px]">
          <Button
            className="rounded-lg w-full py-[11px] h-[58px] text-lg desktop:text-2xl font-medium border-skyBlue-500 text-skyBlue-500 desktop:text-white bg-transparent desktop:bg-skyBlue-500"
            type="primary"
            htmlType="submit"
          >
            Qeydiyyat
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
