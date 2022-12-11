import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { signInUser } from "../redux-toolkit/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ModalLogin = ({ handleRegister = () => {}, handleClose = () => {} }) => {
  const user = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const HandleLogin = (values) => {
    dispatch(signInUser(values));
    handleClose();
  };
  return (
    <>
      <div
        className="absolute inset-0 bg-black bg-opacity-60 overlay"
        onClick={handleClose}
      ></div>
      <div className="relative z-10 w-full p-10 bg-white rounded-lg modal-content max-w-[482px]">
        <span
          className="absolute top-0 right-0 flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer -translate-y-2/4 translate-x-2/4 hover:bg-gray-200"
          onClick={handleClose}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.225 7L13.7375 1.4875C14.0875 1.1375 14.0875 0.6125 13.7375 0.2625C13.3875 -0.0875 12.8625 -0.0875 12.5125 0.2625L7 5.775L1.4875 0.2625C1.1375 -0.0875 0.6125 -0.0875 0.2625 0.2625C-0.0874998 0.6125 -0.0874998 1.1375 0.2625 1.4875L5.775 7L0.2625 12.5125C0.0875002 12.6875 0 12.8625 0 13.125C0 13.65 0.35 14 0.875 14C1.1375 14 1.3125 13.9125 1.4875 13.7375L7 8.225L12.5125 13.7375C12.6875 13.9125 12.8625 14 13.125 14C13.3875 14 13.5625 13.9125 13.7375 13.7375C14.0875 13.3875 14.0875 12.8625 13.7375 12.5125L8.225 7Z"
              fill="#84878B"
            />
          </svg>
        </span>
        <h2 className="mb-7 text-4xl font-medium text-center text-black">
          Đăng nhập
        </h2>

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
            HandleLogin(values);
          }}
        >
          <Form>
            <div className="w-full h-14 rounded-xl text-lg mb-2">
              <Field
                className="w-[95%] h-[90%] border border-sky-500 hover:border-2  outline-none p-2 rounded-xl"
                type="text"
                label="Tên đăng nhập"
                name="userName"
                placeholder="Nhập tên"
                id="userName"
              ></Field>
            </div>
            <div className="w-full h-14 rounded-xl text-lg mb-5">
              <Field
                className="w-[95%] h-[90%] border border-sky-500 hover:border-2 outline-none p-2 rounded-xl"
                type="password"
                label="Mật khẩu"
                name="passWord"
                placeholder="Nhập
              mật khẩu"
                id="passWord"
              ></Field>
            </div>

            <button className="w-full p-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg ">
              Đăng nhập
            </button>
          </Form>
        </Formik>
        <div
          className="text-base text-slate-600 mt-5 cursor-pointer w-60"
          onClick={handleRegister}
        >
          Chưa có tài khoản? Đăng ký ngay
        </div>
      </div>
    </>
  );
};
ModalLogin.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
export default ModalLogin;
