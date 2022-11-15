import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import DropDown from "../../components/DropDown";
import React from "react";
import Button from "../../components/Button";
import HeaderAdmin from "../../layouts/HeaderAdmin";
import { Dropdown } from "antd";
import menu from "../../components/menu";

const CustomerList = () => {
  return (
    <div className="w-screen h-auto flex">
      <DropDown></DropDown>
      <div className="w-full">
        <HeaderAdmin></HeaderAdmin>
        <div className="w-full h-[90%] bg-slate-50 pt-5 text-slate-700 ">
          <div className=" border w-[95%] rounded-lg h-[95%] mx-auto drop-shadow-xl">
            <div className="bg-white h-32 rounded-t-lg">
              <div className="grid grid-cols-6">
                <div className="col-start-1 col-span-5 py-4 pl-6 text-base font-semibold">
                  Tất cả sản phẩm
                </div>
                <Button className="bg-teal-400 text-center h-10 py-2 px-1 w-32 mx-auto border hover:border-violet-200 drop-shadow-lg hover:drop-shadow-xl">
                  Thêm sản phẩm
                </Button>
              </div>
              <div>
                <div className="flex">
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
                      placeholder="Tìm kiếm theo tên sản phẩm"
                    />
                  </div>
                  <div className="mt-4 ml-6 h-10 border border-teal-500 hover:border-teal-300 hover:drop-shadow-lg rounded flex cursor-pointer ">
                    <Dropdown overlay={menu[1]} placement="bottom">
                      <div className="grid place-items-center w-36 rounded">
                        Loại
                      </div>
                    </Dropdown>
                  </div>
                  <div className="mt-4 ml-6 h-10 border border-teal-500 hover:border-teal-300 hover:drop-shadow-lg rounded flex cursor-pointer ">
                    <Dropdown overlay={menu[2]} placement="bottom">
                      <div className="grid place-items-center w-36 rounded">
                        Giá
                      </div>
                    </Dropdown>
                  </div>
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
                    <th className="w-12">Ảnh</th>
                    <th className="w-48 text-left pl-6">Tên sách</th>
                    <th className="w-28 text-left">Loại</th>
                    <th className="w-28 text-left">Giá bán</th>
                    <th className="w-32 text-left">Nhà xuất bản</th>
                  </tr>
                </thead>
                <tbody className=" w-full h-32">
                  <tr className="">
                    <td className="text-center">
                      <input
                        type="checkbox"
                        className=" checked:bg-blue-500 cursor-pointer"
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

export default CustomerList;
