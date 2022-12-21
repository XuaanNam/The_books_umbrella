import React, { useEffect, useState } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import Footer from "../../layouts/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { totalPrice, mergeInfo } from "../../redux-toolkit/cartSlice";
import Input from "../../components/Input";
import { useGetAllAddressQuery } from "../../redux-toolkit/addressApi";
import { Navigate, useNavigate } from "react-router-dom";

const OrderInfo = () => {
  const { orderItems, loading, error } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let totalPrice = 0;
    orderItems.map((item) => {
      totalPrice += item.price * item.cartQuantity;
      return totalPrice;
    });
    setTotal(totalPrice);
  }, [orderItems]);

  const [orderItem, setOrderItem] = useState([]);

  console.log(orderItem);
  const handleClick = (values) => {
    dispatch(mergeInfo(values));
    Navigate("/checkout/step2");
  };
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-200 h-screen text-lg">
      <HeaderUser></HeaderUser>
      <div className="pt-24 mb-5">
        <div className="m-5 bg-white rounded-lg w-[98%]">
          <div className="px-16 py-12 w-full flex">
            <div className="pr-28 border-r-2 w-[880px]">
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
                    fullname: "",
                    emailOrder: "",
                    phone: "",
                    address: "",
                  }}
                  validationSchema={Yup.object({
                    fullname: Yup.string()
                      .max(20, "Tên đăng nhập chứa tối đa 20 ký tự")
                      .required("Vui lòng điền vào trường trống"),
                    emailOrder: Yup.string().required(
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
                    handleClick(values);
                  }}
                >
                  {(formik) => {
                    return (
                      <Form className="">
                        <Input
                          type="text"
                          name="fullname"
                          placeholder="Họ và tên"
                          id="fullname"
                        ></Input>
                        <div className="grid grid-cols-5 gap-5 w-full">
                          <div className="col-span-3 w-full ">
                            <Input
                              type="email"
                              name="emailOrder"
                              placeholder="Email"
                              id="emailOrder"
                            ></Input>
                          </div>
                          <div className="col-start-4 col-span-2 w-full ">
                            <Input
                              type="text"
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
                        <div className="grid place-items-end ">
                          <button
                            className="bg-cyan-700 hover:bg-cyan-600 w-[400px] h-20 mt-10 p-4 text-2xl text-white rounded-xl font-medium"
                            type="submit"
                            // onClick={handleClick(formik.values)}
                          >
                            Phương thức thanh toán
                          </button>
                        </div>
                        <div className="pl-20 w-full"></div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>

            <div className="pl-20">
              {orderItems.map((orderItem, index) => (
                <div className="flex gap-5 pb-5" key={index}>
                  <img
                    className="h-32 w-[150px] object-fit border-rounded-lg drop-shadow-xl transition-transform duration-500 group-hover:scale-125"
                    src={orderItem.image}
                    alt={orderItem.productName}
                  />
                  <div className="pl-9 w-[350px] text-2xl font-medium text-cyan-700 flex items-center cursor-pointer">
                    {orderItem.productName}
                  </div>
                  <div className=" text-red-500 font-semibold text-xl flex items-center mx-5">
                    {orderItem.price * orderItem.cartQuantity} đ
                  </div>
                </div>
              ))}
              <hr className="my-3"></hr>
              <div className="flex gap-5">
                <input
                  type="text"
                  placeholder="Mã giảm giá"
                  className="w-[450px] h-16 text-xl my-2 border border-slate-400 hover:border-2 outline-none p-2 rounded-xl"
                ></input>
                <button className="w-52 h-16 p-4 text-2xl my-2 text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl ">
                  Sử dụng
                </button>
              </div>
              <hr className="my-3"></hr>
              <div className="grid grid-cols-2 text-2xl py-5 ">
                <div className="grid place-items-start">Tạm tính</div>
                <div className="grid place-items-end">{total} đ</div>
              </div>
              <div className="grid grid-cols-2 text-2xl py-5 ">
                <div className="grid place-items-start">Phí ship</div>
                <div className="grid place-items-end">-</div>
              </div>
              <hr className="my-3"></hr>
              <div className="grid grid-cols-2 text-3xl py-5 text-slate-700 font-medium">
                <div className="grid place-items-start">Tổng tiền</div>
                <div className="grid place-items-end">{total} đ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
