import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { signInUser } from "../redux-toolkit/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

const ModalLogin = ({ handleRegister = () => {}, handleClose = () => {} }) => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const formikRef = useRef();
  console.log(formikRef);
  const [mess, setMess] = useState("");
  const handleLogin = (values, isValid) => {
    console.log(values);
    if (isValid && values.email !== "" && values.password !== "") {
      dispatch(signInUser(values));
      setMess(user.msg);
    } else if (isValid && values.email === "" && values.password === "") {
      setMess("Vui lòng điền vào trường trống");
    }
  };

  console.log(mess);
  const resetForm = () => {
    formikRef.current?.resetForm();
    setMess("");
    // user.msg = "";
    console.log(mess);
    handleClose();
  };
  return (
    <>
      <div
        className="absolute inset-0 bg-black bg-opacity-60 overlay"
        onClick={resetForm}
      ></div>
      <div className="relative z-10 p-10 bg-white rounded-xl modal-content h-[500px] w-[700px]">
        <span
          className="absolute top-0 right-0 flex items-center justify-center w-10 h-10 p-1 bg-white rounded-full cursor-pointer -translate-y-2/4 translate-x-2/4 hover:bg-gray-200"
          onClick={resetForm}
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
          innerRef={formikRef}
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .max(20, "Tên đăng nhập chứa tối đa 20 ký tự")
              .required("Vui lòng điền vào trường trống"),
            password: Yup.string()
              .required("Vui lòng điền vào trường trống")
              .min(8, "Mật khẩu chứa ít nhất 8 ký tự"),
          })}
          onSubmit={(values) => {}}
          onChange={(values) => {
            setMess("values");
          }}
        >
          {(formik) => {
            console.log(formik);
            return (
              <Form className="">
                <Input
                  className="w-full h-16 text-xl my-2 border border-slate-400 hover:border-2 outline-none p-2 rounded-xl"
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                ></Input>
                <Input
                  className="w-full h-16 text-xl my-2 border border-slate-400 hover:border-2 outline-none p-2 rounded-xl"
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  id="password"
                ></Input>
                {mess && formik.isValid && (
                  <div className="text-red-500 text-lg">{mess}</div>
                )}
                {console.log(mess)}

                <button
                  className="w-full mt-3 p-4 text-2xl font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl "
                  type="button"
                  onClick={() => {
                    handleLogin(formik.values, formik.isValid);
                  }}
                >
                  Đăng nhập
                </button>
              </Form>
            );
          }}
        </Formik>
        <div
          className="text-xl text-slate-600 mt-5 cursor-pointer w-full"
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
