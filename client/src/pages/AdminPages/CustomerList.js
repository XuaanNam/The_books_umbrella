import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DropDown from "../../components/DropDown";
import React from "react";
import HeaderAdmin from "../../layouts/HeaderAdmin";

const CustomerList = () => {
  return (
    <div className="w-screen flex">
      <DropDown></DropDown>
      <div className="w-full">
        <HeaderAdmin></HeaderAdmin>
        <div className=" h-[90%] bg-slate-50 pt-5">
          <div className="w-full h-full text-slate-700 drop-shadow-lg">
            <div className=" border w-[95%] rounded-lg h-[95%] mx-auto">
              <div className="bg-white h-32 rounded-t-lg">
                <div>
                  <div className="py-4 pl-6 font-semibold text-base">
                    Tất cả khách hàng
                  </div>
                  <div className="mt-4 ml-6 h-10 w-80 border border-teal-500 hover:border-teal-300 rounded flex cursor-pointer ">
                    <div className="grid place-items-center">
                      <FontAwesomeIcon
                        className="ml-5"
                        icon={solid("magnifying-glass")}
                      />
                    </div>
                    <input
                      className="w-full font-normal pl-5 outline-none rounded"
                      type="text"
                      placeholder="Tìm kiếm theo mã, tên, SĐT khách hàng"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-b-lg">
                <table className="w-full h-[370px] table-auto text-sm text-neutral-700">
                  <thead className="h-12">
                    <tr className="bg-slate-100">
                      <th className="w-10">
                        <input
                          type="checkbox"
                          className=" checked:bg-blue-500 cursor-pointer"
                        />
                      </th>
                      <th className="w-24">Mã khách hàng</th>
                      <th className="w-32 text-left pl-6">Tên khách hàng</th>
                      <th className="w-24 text-left">Số điện thoại</th>
                      <th className="w-28 text-left">Tổng chi tiêu</th>
                      <th className="w-24 text-left">Tổng đơn hàng</th>
                    </tr>
                  </thead>
                  <tbody className=" w-full h-32">
                    {menu.map((item, index) => (
                      <tr className="" key={index}>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            className=" checked:bg-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="text-center">{item.id}</td>
                        <td className="pl-6">{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.spend}</td>
                        <td>{item.orders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const menu = [
  {
    id: 1,
    name: "Quốc Anh",
    phone: "0955876957",
    spend: "90000",
    orders: "2",
  },
  {
    id: 2,
    name: "Quốc Anh",
    phone: "0955876957",
    spend: "90000",
    orders: "2",
  },
  {
    id: 3,
    name: "Quốc Anh",
    phone: "0955876957",
    spend: "90000",
    orders: "2",
  },
];
export default CustomerList;
