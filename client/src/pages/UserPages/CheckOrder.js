import React, { useEffect, useState } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import Footer from "../../layouts/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { totalPrice } from "../../redux-toolkit/cartSlice";
import Input from "../../components/Input";

const CheckOrder = () => {
  const order = useSelector((state) => state.cart);
  console.log(order);
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-200 w-screen h-screen text-base">
      <HeaderUser></HeaderUser>
      <div className="pt-20 mb-5">
        <div className="m-5 bg-white rounded-lg w-[98%]">
          <div className="px-16 py-10 w-full">
            <div className="text-4xl font-medium text-slate-800 ">
              Umbrella Bookstore
            </div>
            <div className="py-5 text-lg">
              Giỏ hàng {">"} Thông tin vận chuyển {">"} Phương thức thanh toán
            </div>
            <div className="pb-7 text-3xl text-slate-900">
              Thông tin thanh toán
            </div>
            <div className="pb-5 text-lg text-slate-900">
              <Formik
                initialValues={{
                  userName: "",
                  passWord: "",
                }}
                validationSchema={Yup.object({
                  userName: Yup.string()
                    .max(20, "Tên đăng nhập chứa tối đa 20 ký tự")
                    .required("Vui lòng điền vào trường trống"),
                  passWord: Yup.string()
                    .required("Vui lòng điền vào trường trống")
                    .min(8, "Mật khẩu chứa ít nhất 8 ký tự"),
                })}
                onSubmit={(values) => {
                  // HandleLogin(values);
                }}
              >
                <Form>
                  <div className="w-full h-14 rounded-xl text-lg mb-2">
                    <Input
                      className="w-[95%] h-[90%] border border-sky-500 hover:border-2 outline-none p-2 rounded-xl"
                      name="fullName"
                      placeholder="Tên đầy đủ"
                      id="firstName"
                    ></Input>
                  </div>
                  <div className="w-full h-14 rounded-xl text-lg mb-5">
                    <Field
                      type="email"
                      label="Email"
                      name="email"
                      placeholder="Email"
                      id="email"
                    ></Field>
                  </div>
                  <div className="w-full h-14 rounded-xl text-lg mb-5">
                    <Field
                      className="w-[95%] h-[90%] border border-sky-500 hover:border-2 outline-none p-2 rounded-xl"
                      type="number"
                      label="PhoneNumber"
                      name="phoneNumber"
                      placeholder="Số điện thoại"
                      id="phoneNumber"
                    ></Field>
                  </div>
                  <div className="w-full h-14 rounded-xl text-lg mb-5">
                    <Field
                      className="w-[95%] h-[90%] border border-sky-500 hover:border-2 outline-none p-2 rounded-xl"
                      type="text"
                      label="Address"
                      name="address"
                      placeholder="Địa chỉ"
                      id="address"
                    ></Field>
                  </div>
                  <div className="w-full h-14 rounded-xl text-lg mb-5">
                    <Field
                      className="w-[95%] h-[90%] border border-sky-500 hover:border-2 outline-none p-2 rounded-xl"
                      type="text"
                      label="Address"
                      name="address"
                      placeholder="Địa chỉ"
                      id="address"
                    ></Field>
                  </div>
                  <button className="w-full p-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg ">
                    Đăng nhập
                  </button>
                </Form>
              </Formik>
              <div
                className="text-base text-slate-600 mt-5 cursor-pointer w-60"
                // onClick={}
              >
                Chưa có tài khoản? Đăng ký ngay
              </div>
            </div>
            {/* <hr className="mx-5"></hr> */}
          </div>
        </div>
        {/* <div className="m-5 bg-white rounded-lg h-200">
          <div className="text-xl font-medium p-5">KIỂM TRA LẠI ĐƠN HÀNG</div>
          <hr className="mx-5"></hr>
          {order &&
            order.orderItems.map((cartItem) => (
              <div
                key={cartItem.id}
                className="p-4 grid grid-cols-12 place-items-center border-b h-full"
              >
                <img
                  className="col-start-2 col-span-2 cursor-pointer"
                  src={cartItem.image}
                  alt={cartItem.productName}
                ></img>
                <div className="col-start-4 col-span-3 text-lg font-medium text-cyan-700 text-left cursor-pointer">
                  {cartItem.productName}
                </div>
                <div className="col-start-7 text-center text-base font-medium text-red-600">
                  {cartItem.price}
                </div>

                <div className="col-start-10 text-center text-base font-medium text-red-600">
                  {cartItem.totalprice * cartItem.cartQuantity} đ
                </div>
              </div>
            ))}
        </div> */}
      </div>
    </div>
  );
};

export default CheckOrder;
