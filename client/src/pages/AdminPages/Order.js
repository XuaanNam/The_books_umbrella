import React, { Fragment, useEffect, useState } from "react";
import DropDown from "../../components/DropDown";

import { DatePicker, Space } from "antd";
import moment from "moment";
import HeaderUser from "../../layouts/HeaderUser";
import { useDispatch, useSelector } from "react-redux";
import { orderFetch, changeOrderStatus } from "../../redux-toolkit/adminSlice";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const dateFormat = "DD/MM/YYYY";
const weekFormat = "DD/MM";
const monthFormat = "MM/YYYY";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
const customWeekStartEndFormat = (value) =>
  `${moment(value).startOf("week").format(weekFormat)} ~ ${moment(value)
    .endOf("week")
    .format(weekFormat)}`;

const Order = () => {
  const admin = useSelector((state) => state.admin);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    dispatch(orderFetch());
  }, [token, dispatch]);
  useEffect(() => {
    setOrders(admin.items);
  }, [admin.items]);
  const [showConfirmOrder, setShowConfirmOrder] = useState([]);
  const handleConfirm = () => {};
  const handleChangeOrderStatus = (item, status) => {
    const data = {
      orderId: item,
      status: status,
    };
    dispatch(changeOrderStatus(data));
    let newStatus = "Xác nhận";
    if (status === 2) {
      newStatus = "Đã xác nhận";
    }
    if (admin.checked) {
      let order = [];
      order = [...orders];
      const index = orders.findIndex((i) => i.id === item);
      order[index] = {
        ...orders[index],
        status: newStatus,
      };
      setOrders(order);
    }
  };
  console.log(orders);

  const [translate, setTranslate] = useState("translate-x-[0px]");
  return (
    <div className=" border w-[95%] rounded-lg h-[95%] mx-auto drop-shadow-2xl">
      <div className="flex gap-5 bg-white h-28 p-4 rounded-t-lg">
        <span className="grid place-items-center font-medium">
          Lọc theo ngày:
        </span>
        <div className="flex items-center text-lg">
          <Space direction="vertical" size={16}>
            <RangePicker
              className="text-center grid place-items-center text-lg"
              defaultValue={[
                moment("27/10/2022", dateFormat),
                moment("27/10/2022", dateFormat),
              ]}
              format={dateFormat}
            />
          </Space>
        </div>
      </div>
      <div className="bg-white rounded-b-lg">
        <div className="grid grid-cols-4 place-items-center border-b font-medium h-12 w-full ">
          <div
            className="w-full h-full grid place-items-center hover:bg-gray-100 cursor-pointer"
            onClick={() => setTranslate("translate-x-[0px]")}
          >
            Tất cả đơn hàng
          </div>
          <div
            className="w-full h-full grid place-items-center hover:bg-gray-100 cursor-pointer"
            onClick={() => setTranslate("translate-x-[396px]")}
          >
            Đang giao hàng
          </div>
          <div
            className="w-full h-full grid place-items-center hover:bg-gray-100 cursor-pointer"
            onClick={() => setTranslate("translate-x-[792px]")}
          >
            Đã thanh toán
          </div>
          <div
            className="w-full h-full grid place-items-center hover:bg-gray-100 cursor-pointer"
            onClick={() => setTranslate("translate-x-[1188px]")}
          >
            Đơn trả
          </div>
        </div>
        <div
          className={`w-[396px] h-0.5 bg-sky-700 transition-all ${translate}`}
        ></div>
        <table className="w-full h-[620px]">
          <thead className="h-16 bg-slate-100 w-full">
            <tr className="w-full flex gap-5 items-center">
              <th className="w-28">Đơn hàng</th>
              <th className="w-32 text-left">Khách hàng</th>
              <th className="w-44 text-left">Tên sách</th>
              <th className="w-36 text-left">Điện thoại</th>
              <th className="w-52 text-left">Địa chỉ</th>
              <th className="w-36 text-left">Phương thức vận chuyển</th>
              <th className="w-36 text-left">Phương thức thanh toán</th>
              <th className="w-36 text-left">Ngày đặt hàng</th>
              <th className="w-32 text-left">Trạng thái</th>
            </tr>
          </thead>
          <tbody className=" w-full h-32">
            {orders &&
              orders.map((item) => (
                <div key={item.id}>
                  <tr className="text-lg flex gap-5 h-20 mt-5 items-center">
                    <td className="w-28 text-center">{item.id}</td>
                    <td className="w-32 text-left text-ellipsis overflow-hidden">
                      {item.fullname}
                    </td>
                    <td className="w-44 text-left text-ellipsis overflow-hidden">
                      {item.productName}
                    </td>
                    <td className="w-36 text-left text-ellipsis overflow-hidden">
                      {item.phone}
                    </td>
                    <td className="w-52 text-left text-ellipsis overflow-hidden">
                      {item.address}
                    </td>
                    <td className="w-36 text-left text-ellipsis overflow-hidden">
                      {item.delivery}
                    </td>
                    <td className="w-36 text-left text-ellipsis overflow-hidden">
                      {item.payment}
                    </td>
                    <td className="w-36 text-left text-ellipsis overflow-hidden">
                      {item.timeOfOrder}
                    </td>
                    {item.status === 1 ? (
                      <td className="w-32 text-left text-ellipsis overflow-hidden">
                        <button
                          className="bg-red-400 text-white w-full grid place-items-center text-center my-auto p-1 rounded-xl hover:drop-shadow-xl"
                          onClick={() => {
                            handleChangeOrderStatus(item.id, 2);
                          }}
                        >
                          Xác nhận
                        </button>
                      </td>
                    ) : (
                      <td className="w-32 text-left text-ellipsis overflow-hidden">
                        <div className="bg-cyan-400 text-white w-full grid place-items-center text-center my-auto p-1 rounded-xl hover:drop-shadow-xl">
                          Đã xác nhận
                        </div>
                      </td>
                    )}
                  </tr>
                  <hr className="w-full"></hr>
                </div>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
