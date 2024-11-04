import { Button, Checkbox, Flex, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function LoginForm() {
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
              E-mail
            </p>
          }
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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

        <Flex justify="space-between" align="center">
          <Form.Item className="m-0" name="remember" valuePropName="checked">
            <Checkbox className="desktop:text-sm text-[12px]">
              Məni xatırla
            </Checkbox>
          </Form.Item>
          <Link
            to="/forgot-password"
            className="desktop:text-gray-700 desktop:text-sm text-[12px] text-skyBlue-500 underline desktop:no-underline"
          >
            Şifrəmi unutdum
          </Link>
        </Flex>
      </Flex>

      <Flex vertical>
        <Form.Item className="mb-[11px]">
          <Button
            className="rounded-lg w-full py-[11px] h-[58px] text-lg desktop:text-2xl font-medium border-skyBlue-500 text-skyBlue-500 desktop:text-white bg-transparent desktop:bg-skyBlue-500"
            type="primary"
            htmlType="submit"
          >
            Submit
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
