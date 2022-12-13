import React from "react";
import DropDown from "../../components/DropDown";
import HeaderUser from "../../layouts/HeaderUser";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../../components/Input";

import * as Yup from "yup";
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
      <div className="w-full">
        <HeaderUser></HeaderUser>
        <div className="h-screen bg-slate-100 pt-32">
          <div className="w-full h-full text-slate-700 ">
            <div className="w-[1200px] rounded-xl h-[85%] mx-auto drop-shadow-xl">
              <div className="bg-white h-[700px] p-12 drop-shadow-xl rounded-xl border">
                <div className="text-2xl font-medium pb-5">
                  Thông tin tài khoản
                </div>
                <Formik
                  initialValues={{
                    fullname: "",
                    emailProfile: "",
                    phone: "",
                    address: "",
                  }}
                  validationSchema={Yup.object({
                    fullname: Yup.string()
                      .max(20, "Tên đăng nhập chứa tối đa 20 ký tự")
                      .required("Vui lòng điền vào trường trống"),
                    emailProfile: Yup.string().required(
                      "Vui lòng điền vào trường trống"
                    ),
                    phone: Yup.string().required(
                      "Vui lòng điền vào trường trống"
                    ),
                    address: Yup.string().required(
                      "Vui lòng điền vào trường trống"
                    ),
                  })}
                  onSubmit={(values) => {
                    // HandleLogin(values);
                  }}
                >
                  {(formik) => {
                    console.log(formik.values);
                    return (
                      <Form className="">
                        <Input
                          type="text"
                          name="fullname"
                          placeholder="Họ và tên"
                          id="fullname"
                        ></Input>
                        <div className="grid grid-cols-3 gap-5 w-full">
                          <div className="col-span-2 w-full ">
                            <Input
                              type="email"
                              name="emailProfile"
                              placeholder="Email"
                              id="emailProfile"
                            ></Input>
                          </div>
                          <div className="col-start-3 w-full ">
                            <Input
                              type="number"
                              name="phone"
                              placeholder="Điện thoại"
                              id="phone"
                            ></Input>
                          </div>
                        </div>
                        <Input
                          type="text"
                          name="address"
                          placeholder="Địa chỉ"
                          id="address"
                        ></Input>
                        <div className="grid grid-cols-3 w-full">
                          <div className="grid place-items-center col-start-1">
                            <button
                              className="w-[300px] h-14 mt-10 p-3 text-2xl text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl 
                          "
                              onClick={() => {}}
                            >
                              Đổi mật khẩu
                            </button>
                          </div>
                          <div className="grid place-items-center col-start-3">
                            <button
                              className="w-[300px] h-14 mt-10 p-3 text-2xl text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl 
                          "
                              onClick={() => {}}
                            >
                              Cập nhật
                            </button>
                          </div>
                        </div>
                        <div className="pl-20 w-full"></div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </div>
          {/* <button className="bg-sky-600 text-white p-1.5 rounded hover:bg-sky-400 h-8 ml-28 mt-5">
              Đổi mật khẩu
            </button> */}
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
