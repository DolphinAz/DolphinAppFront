import { LoadingOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { resetLinkSchema } from "../../validations/resetLink.validation";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";

function ResetLinkRequestForm() {
  const [form] = useForm();
  const resetPassUrl = "/api/auth/reset-password";
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: resetLinkSchema,
  });

  const onFinish = (values) => {
    const isInputEmpty = Object.values(values).every(
      (item) => item !== undefined
    );
    if (Object.keys(errors).length === 0 && isInputEmpty) {
      setButtonDisabled(true);
      try {
        axios
          .post(baseUrl + resetPassUrl, values)
          .then((res) => {
            toast.success("Please check your email");
          })
          .catch((err) => toast.error(err.response.data.message))
          .finally(() => setButtonDisabled(false));
      } catch (error) {
        console.log(error);
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
          label={
            <p className="desktop:font-medium text-sm desktop:text-lg">
              E-mailinizi daxil edin
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
            {errors?.email && (
              <p className="text-red-100 text-xs">{errors.email}</p>
            )}
          </div>
        </Form.Item>
      </Flex>
      <Flex vertical>
        <Form.Item className="mb-[11px]">
          <Button
            disabled={buttonDisabled}
            className="rounded-lg w-full py-[11px] h-[58px] text-lg desktop:text-2xl font-medium border-skyBlue-500 text-skyBlue-500 desktop:text-white bg-transparent desktop:bg-skyBlue-500"
            type="primary"
            htmlType="submit"
          >
            {buttonDisabled ? (
              <Flex align="center" gap={10}>
                <LoadingOutlined />
                Gözləyin
              </Flex>
            ) : (
              "Şifrəni yenilə"
            )}
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
}

export default ResetLinkRequestForm;
