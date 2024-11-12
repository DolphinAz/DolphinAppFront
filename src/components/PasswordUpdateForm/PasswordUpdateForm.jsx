import { LoadingOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { useFormik } from "formik";
import React, { useState } from "react";
import { resetLinkSchema } from "../../validations/resetLink.validation";
import { useForm } from "antd/es/form/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../../constants/baseUrl";
import { resetPasswordSchema } from "../../validations/resetPassword.validation";
import { useLocation, useNavigate } from "react-router-dom";

function PasswordUpdateForm() {
  const updatePassUrl = "/api/auth/update-password";
  const [form] = useForm();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const resetToken = urlParams.get("token");
  const userId = urlParams.get("userId");
  const { values, errors, handleChange } = useFormik({
    initialValues: {},
    validationSchema: resetPasswordSchema,
  });
  const onFinish = (values) => {
    const isInputEmpty = Object.values(values).every(
      (item) => item !== undefined
    );

    if (Object.keys(errors).length === 0 && isInputEmpty) {
      setButtonDisabled(true);
      try {
        axios
          .post(baseUrl + updatePassUrl, {
            userId: userId,
            resetToken: resetToken,
            ...values,
          })
          .then((res) => {
            toast.success("Your password succesfully changed");
            navigate("/login");
            console.log(res.data);
          })
          .catch((err) => console.log(err))
          .finally(() => setButtonDisabled(false));
      } catch (error) {
        toast.error(error);
      }
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
              Yeni şifrə
            </p>
          }
          name="newPassword"
        >
          <div className="flex flex-col gap-[10px]">
            <Input.Password
              name="newPassword"
              style={{
                backgroundColor: "#EBF8FE",
              }}
              className="bg-skyBlue-100 border-none h-[50px] px-3 focus:bg-skyBlue-100 hover:bg-skyBlue-100"
            />
            {errors.newPassword && (
              <p className="text-red-100 text-xs">{errors.newPassword}</p>
            )}
          </div>
        </Form.Item>

        <Form.Item
          label={
            <p className="desktop:font-medium text-sm desktop:text-lg">
              Yeni şifrəni təkrarla
            </p>
          }
          name="confirmedNewPassword"
        >
          <div className="flex flex-col gap-[10px]">
            <Input.Password
              name="confirmedNewPassword"
              style={{
                backgroundColor: "#EBF8FE",
              }}
              className="bg-skyBlue-100 border-none h-[50px] px-3 focus:bg-skyBlue-100 hover:bg-skyBlue-100 target:bg-skyBlue-100"
            />

            {errors.confirmedNewPassword && (
              <p className="text-red-100 text-xs">
                {errors.confirmedNewPassword}
              </p>
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

export default PasswordUpdateForm;
