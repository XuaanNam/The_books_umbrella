import React, { Fragment, useState } from "react";
import DropDown from "../../components/DropDown";

import { DatePicker, Space } from "antd";
import moment from "moment";
import HeaderAdmin from "../../layouts/HeaderAdmin";

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
  const [translate, setTranslate] = useState("translate-x-[0px]");
  return (
    <div className="w-screen h-auto flex">
      <DropDown></DropDown>
      <div className="w-full">
        <HeaderAdmin></HeaderAdmin>
        <div className="w-full text-slate-700 h-[90%] bg-slate-50 pt-5">
          <div className=" border w-[95%] rounded-lg h-[95%] mx-auto drop-shadow-xl">
            <div className="flex gap-5 bg-white p-4 rounded-t-lg">
              <span className="grid place-items-center font-medium">
                Lọc theo ngày:
              </span>
              <div>
                <Space direction="vertical" size={12}>
                  <RangePicker
                    className="text-center grid place-items-center"
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
                  onClick={() => setTranslate("translate-x-[247px]")}
                >
                  Đang giao hàng
                </div>
                <div
                  className="w-full h-full grid place-items-center hover:bg-gray-100 cursor-pointer"
                  onClick={() => setTranslate("translate-x-[494px]")}
                >
                  Đã xác nhận
                </div>
                <div
                  className="w-full h-full grid place-items-center hover:bg-gray-100 cursor-pointer"
                  onClick={() => setTranslate("translate-x-[741px]")}
                >
                  Đơn trả
                </div>
              </div>
              <div
                className={`w-[247px] h-0.5 bg-sky-700 transition-all ${translate}`}
              ></div>
              <table className="w-full h-[370px] table-auto text-sm text-neutral-700">
                <thead className="h-12 bg-slate-100 w-full">
                  <tr className="w-full">
                    <th className="w-28">Mã đơn hàng</th>
                    <th className="w-24 text-left">Khách hàng</th>
                    <th className="w-20 text-left">Trạng thái</th>
                    <th className="w-28 text-left">Ghi chú</th>
                  </tr>
                </thead>
                <tbody className=" w-full h-32">
                  <tr className="">
                    <td className="text-center">1</td>
                    <td>Bìa mềm</td>
                    <td>90000</td>
                    <td>NXB Kim Đồng</td>
                  </tr>

                  <tr className="">
                    <td className="text-center">2</td>
                    <td>Bìa mềm</td>
                    <td>90000</td>
                    <td>NXB Kim Đồng</td>
                  </tr>

                  <tr className="">
                    <td className="text-center">3</td>
                    <td>Bìa mềm</td>
                    <td>90000</td>
                    <td>NXB Kim Đồng</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
