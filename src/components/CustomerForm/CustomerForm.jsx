import { Form, Input, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useState } from "react";
import { countries } from "../../constants/countries";
import { Icon } from "@iconify/react";

function CustomerForm() {
  const [selectableCountry, setSelectableCountry] = useState([]);
  const [selectableCountryNums, setSelectableCountryNums] = useState([]);
  useEffect(() => {
    const mappedCountries = countries.map((country, index) => ({
      key: index,
      value: country.name,
      label: (
        <div className="flex items-center gap-2">
          <Icon width={20} icon={`flag:${country.code.toLowerCase()}-4x3`} />
          {country.name}
        </div>
      ),
    }));
    const mappedCountryNums = countries.map((country, index) => ({
      key: index,
      value: country.phone,
      label: (
        <div className="flex items-center gap-2">
          <Icon width={20} icon={`flag:${country.code.toLowerCase()}-4x3`} />
          {`+${country.phone}`}
        </div>
      ),
    }));
    setSelectableCountry(mappedCountries);
    setSelectableCountryNums(mappedCountryNums);
  }, []);
  return (
    <Form className="desktop:w-2/4 mx-auto">
      <div className="grid grid-cols-2 gap-6">
        <FormItem
          className="border-b-2"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input
            placeholder="Name"
            className="border-none rounded-none border-black-100 py-4"
          />
        </FormItem>
        <FormItem
          className="border-0 border-b-2"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            placeholder="Email"
            className="border-none rounded-none border-black-100 py-4"
          />
        </FormItem>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Form.Item
          className="relative border-b-2"
          name="country"
          rules={[
            {
              required: true,
              message: "Please input your country!",
            },
          ]}
        >
          <Select
            showSearch
            filterOption={(input, option) =>
              (option?.value ?? "").toLowerCase().includes(input.toLowerCase())
            }
            className="custom-select-input absolute"
            options={selectableCountry}
            placeholder="Country"
          />
        </Form.Item>
        <FormItem
          className="border-b-2"
          name="post-code"
          rules={[
            {
              required: true,
              message: "Please input your post code!",
            },
          ]}
        >
          <Input
            placeholder="Post code"
            className="border-none rounded-none border-black-100 py-4"
            type="number"
          />
        </FormItem>
      </div>
      <FormItem
        className="border-0 border-b-2"
        name="address"
        rules={[
          {
            required: true,
            message: "Please input your address!",
          },
        ]}
      >
        <Input
          placeholder="Address"
          className="border-none rounded-none border-black-100 py-4"
        />
      </FormItem>
      <div className="grid grid-cols-[100px_1fr] gap-6">
        <Form.Item className="relative border-b-2">
          <Select
            showSearch
            filterOption={(input, option) =>
              (String(option?.value) ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            className="custom-select-input absolute"
            options={selectableCountryNums}
            placeholder="+994"
          />
        </Form.Item>
        <FormItem
          className="border-b-2"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone!",
            },
          ]}
        >
          <Input
            placeholder="phone"
            className="border-none rounded-none border-black-100 py-4"
            type="number"
          />
        </FormItem>
      </div>
    </Form>
  );
}

export default CustomerForm;
