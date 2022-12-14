import React, { useEffect, useRef, useState } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import Footer from "../../layouts/Footer";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  totalPrice,
  mergeMethod,
  payOrder,
  paypal,
} from "../../redux-toolkit/cartSlice";
import Input from "../../components/Input";
import useSWR from "swr";
import InputRadio from "../../components/InputRadio";
import { useNavigate } from "react-router-dom";
const OrderMethod = () => {
  const order = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState([]);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [shipingfee, setShipingFee] = useState(1);

  useEffect(() => {
    let totalPrice = 0;
    order.orderItems.map((item) => {
      totalPrice += item.price * item.cartQuantity;
      if (item.deliveryMethod === "fast") {
        setShipingFee(30000);
      } else {
        setShipingFee(20000);
      }
      return totalPrice;
    });
    setTotal(totalPrice);
  }, [order.orderItems]);
  console.log(value);
  useEffect(() => {
    if (value) {
      dispatch(mergeMethod(value));
    }
  }, [value, dispatch]);
  const handleClick = (values) => {
    if (order.orderItems[0].paymentMethod) {
      order.orderItems.map((item) => {
        const data = {
          quantity: item.cartQuantity,
          productId: item.id,
          price: item.price,
          fullname: item.fullname,
          email: item.emailOrder,
          phone: item.phone,
          address: item.address,
          deliveryMethod: item.deliveryMethod,
          paymentMethod: item.paymentMethod,
        };
        console.log(data);
        dispatch(payOrder(data));
        // Navigate("/complete");
        return 0;
      });
    }
    console.log(order.orderItems[0].paymentMethod === "bank");
    if (order.orderItems[0].paymentMethod === "bank") {
      const dataPaypal = {
        quantity: order.orderItems.length,
        totalPrice: total,
        listProduct: "Order",
      };
      console.log(dataPaypal);
      dispatch(paypal(dataPaypal));
    }
  };
  const convertPrice = (price) => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
    });
    return formatter.format(price);
  };
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
                Gi??? h??ng {">"} Th??ng tin v???n chuy???n {">"} Ph????ng th???c thanh to??n
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
                        ["cod", "bank"],
                        "You can only select code or bank"
                      ),
                  })}
                  onSubmit={(values) => {
                    handleClick(values);
                  }}
                  onChange={(values) => {}}
                >
                  {(formik) => {
                    setTimeout(() => setValue(formik.values), 0);
                    const watchShip = formik.values.ship;
                    const watchPay = formik.values.pay;
                    return (
                      <Form className="">
                        <div className="pb-7 text-3xl text-slate-900">
                          Ph????ng th???c v???n chuy???n
                        </div>
                        <div className="border border-slate-400 rounded-xl cursor-pointer">
                          <InputRadio
                            className=" cursor-pointer"
                            type="radio"
                            name="ship"
                            id="fastship"
                            value="fast"
                            checked={watchShip === "fast" ? true : false}
                            label="Giao h??ng nhanh"
                            price={convertPrice(30000)}
                          ></InputRadio>
                          <hr className=""></hr>

                          <InputRadio
                            className=" cursor-pointer"
                            type="radio"
                            name="ship"
                            id="savingship"
                            value="save"
                            checked={watchShip === "save"}
                            label="Giao h??ng ti???t ki???m"
                            price={convertPrice(20000)}
                          ></InputRadio>
                        </div>
                        <div className="pt-10 pb-7 text-3xl text-slate-900">
                          Ph????ng th???c thanh to??n
                        </div>
                        <div className="border border-slate-400 rounded-xl">
                          <InputRadio
                            className=" cursor-pointer"
                            type="radio"
                            name="pay"
                            id="cod"
                            value="cod"
                            checked={watchPay === "cod"}
                            label="Thanh to??n khi giao h??ng (COD)"
                          ></InputRadio>
                          <hr className=""></hr>

                          <InputRadio
                            className=" cursor-pointer"
                            type="radio"
                            name="pay"
                            id="bank"
                            value="bank"
                            checked={watchPay === "bank" ? true : false}
                            label="Thanh to??n qua PayPal"
                          ></InputRadio>
                        </div>
                        <div className="grid place-items-end ">
                          <button
                            className="w-[200px] h-20 mt-10 p-4 text-2xl text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl "
                            type="submit"
                          >
                            ?????t h??ng
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
                    {convertPrice(orderItem.price * orderItem.cartQuantity)} ??
                  </div>
                </div>
              ))}
              <hr className="my-3"></hr>
              <div className="flex gap-5">
                <input
                  type="text"
                  placeholder="M?? gi???m gi??"
                  className="w-[450px] h-16 text-xl my-2 border border-slate-400 hover:border-2 outline-none p-2 rounded-xl"
                ></input>
                <button className="w-52 h-16 p-4 text-2xl my-2 text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl ">
                  S??? d???ng
                </button>
              </div>
              <hr className="my-3"></hr>
              <div className="grid grid-cols-2 text-2xl py-5 ">
                <div className="grid place-items-start">T???m t??nh</div>
                <div className="grid place-items-end">
                  {convertPrice(total)} ??
                </div>
              </div>
              <div className="grid grid-cols-2 text-2xl py-5 ">
                <div className="grid place-items-start">Ph?? ship</div>
                <div className="grid place-items-end">
                  {convertPrice(shipingfee)}
                </div>
              </div>
              <hr className="my-3"></hr>
              <div className="grid grid-cols-2 text-3xl py-5 text-slate-700 font-medium">
                <div className="grid place-items-start">T???ng ti???n</div>
                <div className="grid place-items-end">
                  {convertPrice(total + shipingfee)} ??
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderMethod;
