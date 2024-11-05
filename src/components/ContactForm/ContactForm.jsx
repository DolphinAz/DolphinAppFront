import React from "react";
import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import TextArea from "antd/es/input/TextArea";

function ContactForm() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="First name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input className="py-3 px-4 w-full" placeholder="First name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your email!",
          },
        ]}
      >
        <Input className="py-3 px-4" placeholder="you@company.com" />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your phone!",
          },
        ]}
      >
        <InputNumber
          className="py-3 px-4 w-full"
          placeholder="(555) 000-0000"
        />
      </Form.Item>

      <Form.Item
        label="Message"
        name="message"
        rules={[
          {
            required: true,
            message: "Please input your phone!",
          },
        ]}
      >
        <TextArea style={{ resize: "none" }} rows={4} />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox className="flex items-center">
          <p className="text-black-300 flex flex-wrap gap-1">
            Siz bizim mehriban
            <span className="underline">məxfilik siyasətimizlə</span>
            razılaşırsınız?
          </p>
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button
          className="bg-skyBlue-500 w-full py-3 h-12 font-semibold"
          type="primary"
          htmlType="submit"
        >
          Mesaj göndər
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ContactForm;
