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
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(customerFetch());
  }, [dispatch, token]);
  return (
    <div className="w-[95%] rounded-lg h-full mx-auto drop-shadow-2xl">
      <div className="bg-white h-[18%] rounded-t-lg">
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
      <div className="bg-white h-[82%]  rounded-b-lg">
        <table className="h-[620px] w-full text-lg">
          <thead className="h-20">
            <tr className="bg-slate-100 h-full flex gap-5 items-center">
              <th className="w-24">
                <input
                  type="checkbox"
                  className=" checked:bg-blue-500 cursor-pointer h-6 w-6 grid mx-auto"
                />
              </th>
              <th className="w-44">Mã khách hàng</th>
              <th className="w-60 text-left pl-6">Tên khách hàng</th>
              <th className="w-44 text-left">Email</th>
              <th className="w-60 text-left pl-10">Tên đăng nhập</th>
              <th className="w-44 text-left">Số điện thoại</th>
              <th className="w-64 text-left">Địa chỉ</th>
            </tr>
          </thead>
          <tbody className=" w-full h-32 text-xl">
            {admin.items &&
              admin.items.map((item) => (
                <div key={item.id}>
                  <tr className="h-20 flex gap-5 items-center">
                    <td className="text-center w-24">
                      <input
                        type="checkbox"
                        className=" checked:bg-blue-500 cursor-pointer h-6 w-6"
                      />
                    </td>
                    <td className="text-center w-44 text-ellipsis overflow-hidden">
                      {item.id}
                    </td>
                    <td className="text-left w-60 pl-6 text-ellipsis overflow-hidden">
                      {item.fullname}
                    </td>
                    <td className="text-left w-44 text-ellipsis overflow-hidden">
                      {item.email}
                    </td>
                    <td className="text-left pl-10 w-64 text-ellipsis overflow-hidden">
                      {item.username}
                    </td>
                    <td className="text-left w-44 text-ellipsis overflow-hidden">
                      {item.phone}
                    </td>
                    <td className="text-left w-64 text-ellipsis overflow-hidden">
                      {item.address}
                    </td>
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
export default CustomerList;
