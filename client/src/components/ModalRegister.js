import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Input from "./Input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpUser, emailChecked } from "../redux-toolkit/authSlice";

const ModalRegister = ({ handleLogin = () => {}, handleClose = () => {} }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formikRef = useRef();
  console.log(user);
  const [mess, setMess] = useState("");
  const [value, setValue] = useState([]);
  useEffect(() => {
    if (value.email) {
      const body = { email: value.email };
      dispatch(emailChecked(body));
      if (user.emailChecked === false) {
        setMess(user.msg);
      }
    }
  }, [dispatch, value.email, user.msg]);
  const handleRegister = (values, isValid) => {
    if (
      isValid &&
      values.email !== "" &&
      values.password !== "" &&
      values.username !== ""
    ) {
      dispatch(signUpUser(values));
      setMess(user.msg);
      setTimeout(handleLogin(), 3000);
    } else if (
      isValid &&
      values.email === "" &&
      values.password === "" &&
      values.username === ""
    ) {
      setMess("Vui lòng điền vào trường trống");
    }
  };

  console.log(mess);
  const resetForm = () => {
    formikRef.current?.resetForm();
    setMess("");
    handleClose();
  };
  return (
    <>
      <div
        className="absolute inset-0 bg-black bg-opacity-60 overlay"
        onClick={resetForm}
      ></div>
      <div className="relative z-10 p-10 bg-white rounded-xl modal-content h-[600px] w-[850px]">
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
          Đăng Ký
        </h2>

        <Formik
          innerRef={formikRef}
          initialValues={{
            username: "",
            password: "",
            email: "",
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .max(20, "Tên đăng nhập chứa tối đa 20 ký tự")
              .required("Vui lòng điền vào trường trống"),
            password: Yup.string()
              .required("Vui lòng điền vào trường trống")
              .min(8, "Mật khẩu chứa ít nhất 8 ký tự"),
            email: Yup.string().required("Vui lòng điền vào trường trống"),
          })}
          onSubmit={(values) => {}}
        >
          {(formik) => {
            console.log(formik);
            setTimeout(() => setValue(formik.values), 0);
            return (
              <Form className="grid place-items-center">
                <div>
                  <Input
                    className="w-[550px] h-16 text-lg my-2 border border-slate-400 hover:border-2 outline-none p-2 rounded-xl"
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Email"
                    id="email"
                  ></Input>
                  {user.emailChecked === false && (
                    <div className="text-red-500 text-lg">{mess}</div>
                  )}
                  <Input
                    className="w-[550px] h-16 text-lg my-2 border border-slate-400 hover:border-2 outline-none p-2 rounded-xl"
                    type="text"
                    label="Tên đăng nhập"
                    name="username"
                    placeholder="Tên đăng nhập"
                    id="username"
                  ></Input>
                  <Input
                    className="w-[550px] h-16 text-lg my-2 border border-slate-400 hover:border-2 outline-none p-2 rounded-xl"
                    type="password"
                    label="Mật khẩu"
                    name="password"
                    placeholder="Mật khẩu"
                  ></Input>

                  {formik.isValid && user.msg && (
                    <div className="text-red-500 text-lg">{mess}</div>
                  )}
                  <button
                    className="w-full mt-3 p-4 text-2xl font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg"
                    type="button"
                    onClick={() => {
                      handleRegister(formik.values, formik.isValid);
                    }}
                  >
                    Đăng ký
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>

        <div
          className="text-xl text-slate-600 mt-5 cursor-pointer w-full"
          onClick={handleLogin}
        >
          Đã có tài khoản? Đăng nhập
        </div>
      </div>
    </>
  );
};
ModalRegister.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
export default ModalRegister;
