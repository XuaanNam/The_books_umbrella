import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Menu, Space } from "antd";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DropDown from "../../components/DropDown";
import React from "react";
import Button from "../../components/Button";
import HeaderUser from "../../layouts/HeaderUser";
import menu from "../../components/menu";

const Warehouse = () => {
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
                    <th className="w-44 text-left pl-6">Tên sách</th>
                    <th className="w-24 text-left">Loại</th>
                    <th className="w-24 text-left">Giá bán</th>
                    <th className="w-24 text-left">Nhà xuất bản</th>
                    <th className="w-20 text-left">Còn trong kho</th>
                  </tr>
                </thead>
                <tbody className=" w-full h-32">
                  <tr className="">
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className=" checked:bg-blue-500 cursor-pointer h-6 w-6"
                      />
                    </td>
                    <td>
                      <img
                        className="mx-auto h-12 w-16 object-fit"
                        src="https://salt.tikicdn.com/cache/750x750/ts/product/80/3d/5a/3010e66c0524903d9256b2b7231f4d56.jpg.webp"
                        alt="bookimages"
                      ></img>
                    </td>
                    <td className="pl-6">Cà phê cùng Tony</td>
                    <td>Bìa mềm</td>
                    <td>90000</td>
                    <td>NXB Kim Đồng</td>
                  </tr>

                  <tr className="">
                    <td className="text-center">
                      <input type="checkbox" className=" checked:bg-blue-500" />
                    </td>
                    <td>
                      <img
                        className="mx-auto h-12 w-16 object-fit"
                        src="https://salt.tikicdn.com/cache/750x750/ts/product/80/3d/5a/3010e66c0524903d9256b2b7231f4d56.jpg.webp"
                        alt="bookimages"
                      ></img>
                    </td>
                    <td className="pl-6">Cà phê cùng Tony</td>
                    <td>Bìa mềm</td>
                    <td>90000</td>
                    <td>NXB Kim Đồng</td>
                  </tr>

                  <tr className="">
                    <td className="text-center">
                      <input type="checkbox" className=" checked:bg-blue-500" />
                    </td>
                    <td>
                      <img
                        className="mx-auto h-12 w-16 object-fit"
                        src="https://salt.tikicdn.com/cache/750x750/ts/product/80/3d/5a/3010e66c0524903d9256b2b7231f4d56.jpg.webp"
                        alt="bookimages"
                      ></img>
                    </td>
                    <td className="pl-6">Cà phê cùng Tony</td>
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

export default Warehouse;
