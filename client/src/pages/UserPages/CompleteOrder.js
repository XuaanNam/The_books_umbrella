import React, { useEffect, useState } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import { useDispatch, useSelector } from "react-redux";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IconContext } from "react-icons";

const CompleteOrder = () => {
  const { orderItems, loading, error } = useSelector((state) => state.cart);
  console.log(orderItems);
  const [total, setTotal] = useState(0);
  const [shipingfee, setShipingFee] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    let totalPrice = 0;
    orderItems.map((item) => {
      totalPrice += item.price * item.cartQuantity;
      if (item.deliveryMethod === "fast") setShipingFee(30000);
      else {
        setShipingFee(20000);
      }
      return totalPrice;
    });
    setTotal(totalPrice);
  });
  return (
    <div className="bg-slate-200 h-screen text-lg">
      <HeaderUser></HeaderUser>
      <div className="pt-24 mb-5">
        <div className="m-5 bg-white rounded-lg w-[98%]">
          <div className="px-16 py-12 w-full flex">
            <div className="pr-28 border-r-2 w-[880px]">
              <div className="text-4xl font-medium text-slate-800 mb-5">
                Umbrella Bookstore
              </div>
              <div className="flex gap-5">
                <IconContext.Provider
                  value={{
                    size: "70px",
                  }}
                >
                  <div className=" text-cyan-600 flex items-center">
                    <IoIosCheckmarkCircleOutline />
                  </div>
                </IconContext.Provider>
                <div>
                  <div className=" text-3xl pb-2">Đặt hàng thành công!</div>
                  <div className="text-xl pb-1">{orderItems[0].id}</div>
                  <div className="text-xl pb-1">Cảm ơn bạn đã mua hàng!</div>
                </div>
              </div>
              <div className="p-5 mt-5 text-lg text-slate-900 border rounded-xl">
                <div className="text-2xl pb-3 font-medium">
                  Thông tin đơn hàng
                </div>
                <div className="text-xl pb-3 font-medium">
                  Thông tin vận chuyển
                </div>
                <div className="text-xl pb-3">
                  Tên người nhận: {orderItems[0].fullname}
                </div>
                <div className="text-xl pb-3">
                  Điện thoại: {orderItems[0].phone}
                </div>
                <div className="text-xl pb-3">
                  Email: {orderItems[0].emailOrder}
                </div>
                <div className="text-xl pb-3">
                  Địa chỉ: {orderItems[0].address}
                </div>
                <div className="text-xl pb-3">Huyện ...</div>
                <div className="text-xl pb-3">Tỉnh ...</div>
                <div className="text-xl pb-3">Việt Nam</div>
                <div className="text-xl py-3 font-medium">
                  Phương thức thanh toán
                </div>
                <div className="text-xl pb-3">
                  Thanh toán khi giao hàng {"COD"}
                </div>
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
              <div className="grid grid-cols-2 text-2xl py-5 ">
                <div className="grid place-items-start">Tạm tính</div>
                <div className="grid place-items-end">{total} đ</div>
              </div>
              <div className="grid grid-cols-2 text-2xl py-5 ">
                <div className="grid place-items-start">Phí ship</div>
                <div className="grid place-items-end">{shipingfee}</div>
              </div>
              <hr className="my-3"></hr>
              <div className="grid grid-cols-2 text-3xl py-5 text-slate-700 font-medium">
                <div className="grid place-items-start">Tổng tiền</div>
                <div className="grid place-items-end">
                  {total + shipingfee} đ
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteOrder;
