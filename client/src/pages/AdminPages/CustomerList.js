import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DropDown from "../../components/DropDown";
import React, { useEffect } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { customerFetch } from "../../redux-toolkit/adminSlice";

const CustomerList = () => {
  const admin = useSelector((state) => state.admin);
  console.log(admin);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(customerFetch());
  }, [dispatch, token]);
  return (
    <div className="w-[95%] rounded-lg h-full mx-auto drop-shadow-2xl">
      <div className="bg-white h-[20%] rounded-t-lg">
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
      <div className="bg-white h-[80%] rounded-b-lg">
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
              <th className="w-36 text-left pl-6">Tên khách hàng</th>
              <th className="max-w-20 text-left">Email</th>
              <th className="w-24 text-left">Tên đăng nhập</th>
              <th className="w-24 text-left">Số điện thoại</th>
              <th className="w-28 text-left">Tổng chi tiêu</th>
              <th className="w-24 text-left">Tổng đơn hàng</th>
            </tr>
          </thead>
          <tbody className=" w-full h-32 text-xl">
            {admin.items &&
              admin.items.map((item, index) => (
                <tr className="" key={index}>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className=" checked:bg-blue-500 cursor-pointer h-6 w-6"
                    />
                  </td>
                  <td className="text-center w-24 text-ellipsis overflow-hidden">
                    {item.id}
                  </td>
                  <td className="text-left w-[16px] text-ellipsis overflow-hidden">
                    {item.name}
                  </td>
                  <td className="text-left w-16 text-ellipsis overflow-hidden">
                    {item.email}
                  </td>
                  <td className="text-left w-24 text-ellipsis overflow-hidden">
                    {item.username}
                  </td>
                  <td className="text-left w-24 text-ellipsis overflow-hidden"></td>
                  {item.spend ? (
                    <td className="text-left w-28 text-ellipsis overflow-hidden">
                      {item.spend}
                    </td>
                  ) : (
                    <td className="text-left pl-10">0 đ</td>
                  )}
                  <td className="text-left w-24 text-ellipsis overflow-hidden">
                    {item.orders}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CustomerList;
