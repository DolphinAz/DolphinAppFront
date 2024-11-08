import { Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";

function VerificationForm() {
  const onChange = (text) => {
    console.log("onChange:", text);
  };

  const sharedProps = {
    onChange,
  };

  return (
    <Form>
      <FormItem className="flex justify-center">
        <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
      </FormItem>
    </Form>
  );
}

export default VerificationForm;
