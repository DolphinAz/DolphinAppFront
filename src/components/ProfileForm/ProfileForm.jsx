import { Button, Flex, Form, Input } from "antd";
import React from "react";

function ProfileForm() {
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
              Username
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
            className="py-4 px-[18px] mt-[2px] h-12"
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item
          label={
            <p className="desktop:font-medium text-sm desktop:text-base">
              Email
            </p>
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
            className="py-4 px-[18px] mt-[2px] h-12"
            placeholder="Enter your email"
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

export default ProfileForm;
