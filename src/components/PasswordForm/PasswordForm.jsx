import React from "react";
import { Button, Flex, Form, Input } from "antd";

function PasswordForm() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
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
            <p className="desktop:font-medium text-sm desktop:text-base">
              Köhnə parol
            </p>
          }
          name="old-password"
          rules={[
            {
              required: true,
              message: "Please input your old password!",
            },
          ]}
        >
          <Input.Password
            className="py-4 px-[18px] mt-[2px] h-12"
            placeholder="Enter your old password"
          />
        </Form.Item>

        <Form.Item
          label={
            <p className="desktop:font-medium text-sm desktop:text-base">
              Yeni parol
            </p>
          }
          name="new-password"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}
        >
          <Input.Password
            className="py-4 px-[18px] mt-[2px] h-12"
            placeholder="Enter your new password"
          />
        </Form.Item>
      </Flex>

      <Form.Item className="flex justify-center mt-28">
        <Button
          className="bg-skyBlue-500 h-10"
          type="primary"
          htmlType="submit"
        >
          Yadda saxla
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PasswordForm;
