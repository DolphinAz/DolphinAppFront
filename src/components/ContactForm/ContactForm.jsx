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
            message: "Please input your First name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input className="py-3 px-4" />
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[
          {
            required: true,
            message: "Please input your Phone!",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item label="Message">
        <TextArea style={{ resize: "none" }} rows={4} />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked">
        <Checkbox>
          Siz bizim mehriban <span>məxfilik siyasətimizlə</span> razılaşırsınız?
        </Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ContactForm;
