import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import DropDown from "../../components/DropDown";
import HeaderAdmin from "../../layouts/HeaderAdmin";

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const Profile = () => {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="w-screen h-auto flex">
      <DropDown></DropDown>
      <div className="w-full">
        <HeaderAdmin></HeaderAdmin>
        <div className="h-[90%] bg-slate-100 pt-5">
          <div className="w-full h-full text-slate-700 ">
            <div className="w-[80%] rounded-lg h-[75%] mx-auto drop-shadow-xl">
              <div className="bg-white p-12 drop-shadow-xl rounded-t-lg border">
                <Form
                  className="block"
                  {...layout}
                  name="nest-messages"
                  onFinish={onFinish}
                  validateMessages={validateMessages}
                >
                  <Form.Item
                    name={["user", "name"]}
                    label="Tên người dùng"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={["user", "email"]}
                    label="Email"
                    rules={[
                      {
                        type: "email",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={["user", "age"]}
                    label="Phone number"
                    rules={[
                      {
                        type: "number",
                        min: 0,
                        max: 99,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name={["user", "address"]} label="Địa chỉ">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      ...layout.wrapperCol,
                      offset: 4,
                    }}
                  >
                    <Button
                      className="w-24 bg-sky-500"
                      type="primary"
                      htmlType="submit"
                    >
                      Cập nhật
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <button className="bg-sky-600 text-white p-1.5 rounded hover:bg-sky-400 h-8 ml-28 mt-5">
              Đổi mật khẩu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
