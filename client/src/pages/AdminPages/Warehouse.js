import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Menu, Space } from "antd";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DropDown from "../../components/DropDown";
import React, { useEffect } from "react";
import Button from "../../components/Button";
import HeaderUser from "../../layouts/HeaderUser";
import menu from "../../components/menu";
import { useDispatch, useSelector } from "react-redux";
import { warehouseFetch } from "../../redux-toolkit/adminSlice";

const Warehouse = () => {
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(warehouseFetch());
  }, [dispatch, token]);
  return (
    <div className="w-screen h-auto flex text-lg">
      <DropDown></DropDown>
      <div className="w-full text-lg">
        <HeaderUser></HeaderUser>
        <div className="w-full h-[90%] bg-slate-50 pt-32 text-slate-700 ">
          <div className=" border w-[95%] rounded-lg h-[95%] mx-auto drop-shadow-xl">
            <div className="bg-white h-36 rounded-t-lg">
              <div>
                <div className="grid grid-cols-6">
                  <div className="col-start-1 col-span-5 pt-4  pl-6 text-2xl font-semibold">
                    Tất cả sản phẩm
                  </div>
                </div>
                <div>
                  <div className="flex">
                    <div className="mt-4 ml-6 h-14 w-80 border border-teal-500 hover:border-teal-300 rounded flex cursor-pointer ">
                      <div className="grid place-items-center">
                        <FontAwesomeIcon
                          className="ml-5"
                          icon={solid("magnifying-glass")}
                        />
                      </div>
                      <input
                        className="w-full font-normal pl-5 outline-none rounded"
                        type="text"
                        placeholder="Tìm kiếm theo tên sản phẩm"
                      />
                    </div>
                    <div className="mt-4 ml-6 h-14 border border-teal-500 hover:border-teal-300 hover:drop-shadow-lg rounded flex cursor-pointer ">
                      <Dropdown overlay={menu[0]} placement="bottom">
                        <div className="grid place-items-center w-40 rounded">
                          Trạng thái
                        </div>
                      </Dropdown>
                    </div>

                    <div className="mt-4 ml-6 h-14 border border-teal-500 hover:border-teal-300 hover:drop-shadow-lg rounded flex cursor-pointer ">
                      <Dropdown overlay={menu[1]} placement="bottom">
                        <div className="grid place-items-center w-36 rounded">
                          Loại
                        </div>
                      </Dropdown>
                    </div>

                    <div className="mt-4 ml-6 h-14 border border-teal-500 hover:border-teal-300 hover:drop-shadow-lg rounded flex cursor-pointer ">
                      <Dropdown overlay={menu[2]} placement="bottom">
                        <div className="grid place-items-center w-36 rounded">
                          Giá
                        </div>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-b-lg">
              <table className="w-full h-[370px] table-auto text-neutral-700">
                <thead className="h-12">
                  <tr className="bg-slate-100">
                    <th className="w-10">
                      <input
                        type="checkbox"
                        className=" checked:bg-blue-500 cursor-pointer h-6 w-6"
                      />
                    </th>
                    <th className="w-12">Ảnh</th>
                    <th className="w-24 text-left pl-6">Tên sách</th>
                    <th className="w-24 text-center pr-10">Loại</th>
                    <th className="w-16 text-left">Giá bán</th>
                    <th className="w-24 text-left">Nhà xuất bản</th>
                    <th className="w-20 text-left">Còn trong kho</th>
                  </tr>
                </thead>
                <tbody className=" w-full h-32 mt-5">
                  {admin.items &&
                    admin.items.map((item, index) => (
                      <tr className="h-20 text-xl" key={index}>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            className=" checked:bg-blue-500 cursor-pointer h-6 w-6"
                          />
                        </td>
                        <td>
                          <div className="col-start-2 col-span-2 px-2 w-full grid justify-center items-center drop-shadow-lg transition-all cursor-pointer mb-3">
                            <div className="group drop-shadow-xl text-justify text-lg h-[150px] w-[100px] rounded-xl relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                              <img
                                className=" h-[140px] mt-5 object-cover w-full transition-transform duration-500 group-hover:scale-125"
                                src={item.image}
                                alt={item.productName}
                              />
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                            </div>
                          </div>
                        </td>
                        <td className=" w-[100px]">{item.productName}</td>
                        <td className="text-center pr-5">{item.form}</td>
                        <td>{item.price}</td>
                        <td>{item.publisher}</td>
                        <td className="pl-10 font-medium">{item.quantity}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
