import React, { useEffect, useState } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import Footer from "../../layouts/Footer";
import { useDispatch, useSelector } from "react-redux";
import { totalPrice } from "../../redux-toolkit/cartSlice";
const CheckOrder = () => {
  const order = useSelector((state) => state.cart);
  console.log(order);
  const dispatch = useDispatch();
  return (
    <div className="bg-slate-100 text-base">
      <HeaderUser></HeaderUser>
      <div className="pt-20 mb-5">
        <div className="m-5 bg-white rounded-lg h-60">
          <div className="text-xl font-medium p-5">ĐỊA CHỈ GIAO HÀNG</div>
          <hr className="mx-5"></hr>
        </div>
        <div className="m-5 bg-white rounded-lg h-200">
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
                  alt={cartItem.name}
                ></img>
                <div className="col-start-4 col-span-3 text-lg font-medium text-cyan-700 text-left cursor-pointer">
                  {cartItem.name}
                </div>
                <div className="col-start-7 text-center text-base font-medium text-red-600">
                  {cartItem.price}
                </div>

                <div className="col-start-10 text-center text-base font-medium text-red-600">
                  {cartItem.totalprice * cartItem.cartQuantity} đ
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CheckOrder;
