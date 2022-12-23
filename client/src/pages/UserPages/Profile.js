import React, { useEffect, useState } from "react";
import DropDown from "../../components/DropDown";
import HeaderUser from "../../layouts/HeaderUser";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../../components/Input";
import { getProfile, changeProfile } from "../../redux-toolkit/authSlice";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const Profile = () => {
  const user = useSelector((state) => state.user.items);
  const [profile, setProfile] = useState({});

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, token]);
  // useEffect(() => {
  //   setProfile(user);
  // }, [user]);
  const handleChangeProfile = (profile) => {
    console.log(profile);
    dispatch(changeProfile(profile));
  };
  return (
    <div className="w-screen h-auto flex">
      <div className="w-full">
        <HeaderUser></HeaderUser>
        <div className="h-screen bg-slate-100 pt-32">
          <div className="w-full h-full text-slate-700 ">
            <div className="w-[1000px] rounded-xl h-[85%] mx-auto drop-shadow-xl">
              <div className="bg-white h-[700px] p-12 drop-shadow-xl rounded-xl border">
                <div className="text-2xl font-medium pb-5">
                  Thông tin tài khoản
                </div>
                <Formik
                  initialValues={{
                    fullname: user?.fullname ? user.fullname : "",
                    username: user?.username ? user.username : "",
                    email: user?.email ? user.email : "",
                    address: user?.address ? user.address : "",
                    phone: user?.phone ? user.phone : "",
                  }}
                  enableReinitialize={true}
                  validationSchema={Yup.object({
                    fullname: Yup.string()
                      .max(250, "Tên đăng nhập chứa tối đa 20 ký tự")
                      .required("Vui lòng điền họ và tên"),
                    email: Yup.string().required("Vui lòng điền email"),
                    username: Yup.string().required(
                      "Vui lòng điền tên đăng nhập"
                    ),
                    phone: Yup.string().required("Vui lòng điền số điện thoại"),
                    address: Yup.string().required("Vui lòng điền địa chỉ"),
                  })}
                  onSubmit={(values) => {
                    handleChangeProfile(values);
                  }}
                >
                  {(formik) => {
                    console.log(formik.values);
                    return (
                      <Form className="">
                        <div className="grid grid-cols-2 gap-x-9 w-full">
                          <div className="w-full ">
                            <Input
                              type="email"
                              name="email"
                              placeholder="Email"
                              id="email"
                              disabled={true}
                            ></Input>
                          </div>
                          <div className="w-full">
                            <Input
                              type="text"
                              name="username"
                              placeholder="Tên đăng nhập"
                              id="username"
                              disabled={true}
                            ></Input>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-9 w-full">
                          <div className="w-full ">
                            <Input
                              type="text"
                              name="fullname"
                              placeholder="Họ và tên"
                              // defaultValue={user.fullname ? user.fullname : ""}
                              id="fullname"
                            ></Input>
                          </div>
                          <div className="w-full ">
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
                              type="submit"
                              onClick={() => {}}
                            >
                              Cập nhật
                            </button>
                          </div>
                          <div className="grid place-items-center col-start-3">
                            <button
                              className="w-[300px] h-14 mt-10 p-3 text-2xl text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl 
                          "
                              type="submit"
                              onClick={() => {}}
                            >
                              Đổi mật khẩu
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
