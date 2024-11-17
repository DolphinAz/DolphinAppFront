import { LoadingOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { resetLinkSchema } from "../../validations/resetLink.validation";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";

function ResetLinkRequestForm() {
  const [form] = useForm();
  const resetPassUrl = "/api/auth/reset-password";
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120); // 120 seconds = 2 minutes
  const { values, errors, handleChange } = useFormik({
    initialValues: { email: "" },
    validationSchema: resetLinkSchema,
  });
  useEffect(() => {
    let timer;
    if (buttonDisabled) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setButtonDisabled(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [buttonDisabled]);

  const onFinish = (values) => {
    const isInputEmpty = Object.values(values).every((item) => item !== "");
    if (Object.keys(errors).length === 0 && isInputEmpty) {
      setTimeRemaining(120);
      setButtonDisabled(true);
      try {
        axios
          .post(baseUrl + resetPassUrl, values)
          .then((res) => {
            toast.success("Please check your email");
            form.resetFields();
          })
          .catch((err) => toast.error(err.response.data.message));
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please fill all inputs!");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <Form
      className="flex flex-col gap-2"
      form={form}
      name="basic"
      layout="vertical"
      initialValues={values}
      onChange={handleChange}
      onFinish={onFinish}
      onFinishFailed={() => toast.error("Submission was failed!")}
      autoComplete="off"
    >
      <Form.Item
        validateStatus={errors.email && "error"}
        help={<p className="mt-1 text-sm">{errors.email}</p>}
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
        </div>
      </Form.Item>
      <Form.Item className="mb-[11px]">
        <Button
          disabled={buttonDisabled}
          className="rounded-lg w-full py-[11px] h-[58px] text-lg desktop:text-2xl font-medium border-skyBlue-500 text-skyBlue-500 desktop:text-white bg-transparent desktop:bg-skyBlue-500"
          type="primary"
          htmlType="submit"
        >
          {buttonDisabled ? (
            <span className="flex items-center gap-[10px]">
              <LoadingOutlined />
              <p>Gözləyin</p>
            </span>
          ) : (
            "Şifrəni yenilə"
          )}
        </Button>
        <p className="text-end mt-2">{formatTime(timeRemaining)}</p>
      </Form.Item>
    </Form>
  );
}

export default ResetLinkRequestForm;
