import React, { useEffect, useState } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import Footer from "../../layouts/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { totalPrice } from "../../redux-toolkit/cartSlice";
import Input from "../../components/Input";
import useSWR from "swr";
import InputRadio from "../../components/InputRadio";
import { useNavigate } from "react-router-dom";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const OrderMethod = () => {
  // const { data, error, isLoading } = useGetAllAddressQuery();
  const { data, error, isLoading } = useSWR(
    "thongtindoanhnghiep.co/api/city",
    fetcher
  );
  console.log(data);

  const order = useSelector((state) => state.cart);
  console.log(order.orderItems);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let totalPrice = 0;
    order.orderItems.map((item) => {
      totalPrice += item.price * item.cartQuantity;
      return totalPrice;
    });
    setTotal(totalPrice);
  });
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

              <div className="pb-5 text-lg text-slate-900">
                <Formik
                  initialValues={{
                    ship: "fast",
                    pay: "cod",
                  }}
                  validationSchema={Yup.object({
                    ship: Yup.string()
                      .required("Please select your method shipping")
                      .oneOf(
                        ["fast", "save"],
                        "You can only select fast or save"
                      ),
                    pay: Yup.string()
                      .required("Please select your method payment")
                      .oneOf(
                        ["code", "bank"],
                        "You can only select code or bank"
                      ),
                  })}
                  onSubmit={(values) => {
                    // HandleLogin(values);
                  }}
                >
                  {(formik) => {
                    console.log(formik.values);
                    const watchShip = formik.values.ship;
                    const watchPay = formik.values.pay;
                    console.log("Rendering formik", watchShip, watchPay);

                    return (
                      <Form className="">
                        <div className="pb-7 text-3xl text-slate-900">
                          Phương thức vận chuyển
                        </div>
                        <div className="border border-slate-400 rounded-xl">
                          <InputRadio
                            type="radio"
                            name="ship"
                            id="fastship"
                            value="fast"
                            checked={watchShip === "fast" ? true : false}
                            label="Giao hàng nhanh"
                            price={30000}
                          ></InputRadio>
                          <hr className=""></hr>

                          <InputRadio
                            type="radio"
                            name="ship"
                            id="savingship"
                            value="save"
                            checked={watchShip === "save"}
                            label="Giao hàng tiết kiệm"
                            price={20000}
                          ></InputRadio>
                        </div>
                        <div className="pt-10 pb-7 text-3xl text-slate-900">
                          Phương thức thanh toán
                        </div>
                        <div className="border border-slate-400 rounded-xl">
                          <InputRadio
                            type="radio"
                            name="pay"
                            id="cod"
                            value="cod"
                            checked={watchPay === "cod"}
                            label="Thanh toán khi giao hàng (COD)"
                          ></InputRadio>
                          <hr className=""></hr>

                          <InputRadio
                            type="radio"
                            name="pay"
                            id="bank"
                            value="bank"
                            checked={watchPay === "bank" ? true : false}
                            label="Chuyển khoản qua ngân hàng"
                          ></InputRadio>
                        </div>
                        <div className="grid place-items-end ">
                          <button
                            className="w-[200px] h-20 mt-10 p-4 text-2xl text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl "
                            onClick={() => {
                              Navigate("/complete");
                            }}
                          >
                            Đặt hàng
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
              {order.orderItems.map((orderItem, index) => (
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

export default OrderMethod;
