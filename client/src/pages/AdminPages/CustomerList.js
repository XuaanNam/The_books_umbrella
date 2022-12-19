import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DropDown from "../../components/DropDown";
import React, { useEffect } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Redirect } from "react-router-dom";
const CustomerList = () => {
  const user = useSelector((state) => state.user);
  console.log(user.token);
  const Navigate = useNavigate();
  const handleNavigate = () => {
    Navigate("/");
  };

  return (
    <>
      {user.token ? (
        <div className="w-screen flex">
          <DropDown></DropDown>
          <div className="w-full">
            <HeaderUser></HeaderUser>
            <div className="w-full h-[90%] bg-slate-50 pt-32">
              <div className="w-full h-full text-slate-700 drop-shadow-lg">
                <div className=" border w-[95%] rounded-lg h-[95%] mx-auto">
                  <div className="bg-white h-36 rounded-t-lg">
                    <div>
                      <div className="py-4 pl-6 font-semibold text-2xl">
                        Tất cả khách hàng
                      </div>
                      <div className=" ml-6 h-14 w-[400px] text-lg border border-teal-500 hover:border-teal-300 rounded flex cursor-pointer ">
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
                    <table className="w-full h-[370px] table-auto text-lg text-neutral-700">
                      <thead className="h-12">
                        <tr className="bg-slate-100">
                          <th className="w-10">
                            <input
                              type="checkbox"
                              className=" checked:bg-blue-500 cursor-pointer h-6 w-6 grid mx-auto"
                            />
                          </th>
                          <th className="w-24">Mã khách hàng</th>
                          <th className="w-32 text-left pl-6">
                            Tên khách hàng
                          </th>
                          <th className="w-24 text-left">Số điện thoại</th>
                          <th className="w-28 text-left">Tổng chi tiêu</th>
                          <th className="w-24 text-left">Tổng đơn hàng</th>
                        </tr>
                      </thead>
                      <tbody className=" w-full h-32 text-xl">
                        {menu.map((item, index) => (
                          <tr className="" key={index}>
                            <td className="text-center">
                              <input
                                type="checkbox"
                                className=" checked:bg-blue-500 cursor-pointer h-6 w-6"
                              />
                            </td>
                            <td className="text-center">{item.id}</td>
                            <td className="pl-6">{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.spend} đ</td>
                            <td className="pl-12">{item.orders}</td>
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
      ) : (
        <Navigate to="/" />
      )}
    </>
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
