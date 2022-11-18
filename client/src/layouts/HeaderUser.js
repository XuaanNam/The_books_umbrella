import React, { useState } from "react";
import Modal from "../components/Modal";
import { Dropdown, Menu, Space } from "antd";

import { IconContext } from "react-icons";
import { BsCart } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";

const HeaderUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <div className="h-16 fixed w-screen z-50">
      <div className="font-medium h-full text-gray-700 bg-white grid grid-cols-12 place-items-center drop-shadow-[0_4px_5px_rgba(0,0,0,0.3)]">
        <a className="col-start-1 col-span-2 cursor-pointer" href="/">
          HOMEPAGE
        </a>
        <div className="col-start-3">
          <IconContext.Provider
            value={{
              size: "30px",
              color: "white",
            }}
          >
            <Space direction="vertical">
              <Space wrap>
                <Dropdown overlay={MenuDropdown} placement="bottomRight">
                  <button className="h-10 w-16 rounded-lg bg-violet-500 hover:bg-violet-400">
                    <div className="grid place-items-center">
                      <FiMenu className="" />
                    </div>
                  </button>
                </Dropdown>
              </Space>
            </Space>
          </IconContext.Provider>
        </div>

        <div className="col-start-4 col-span-4 h-10 w-96 border border-gray-400 hover:border-teal-300 rounded-lg flex cursor-pointer ">
          <input
            className="w-72 font-normal pl-5 outline-none rounded-lg"
            type="text"
            placeholder="Tìm kiếm sản phẩm"
          />
          <div className="grid place-items-center mx-auto">
            <IconContext.Provider
              value={{
                size: "20px",
                color: "white",
              }}
            >
              <button className="h-8 w-20 rounded-lg bg-red-400">
                <div className="grid place-items-center">
                  <BiSearchAlt className="" />
                </div>
              </button>
            </IconContext.Provider>
          </div>
        </div>

        <a
          className="col-start-10 grid-cols-2 place-items-center cursor-pointer hover:text-violet-500"
          href="/cart"
        >
          <IconContext.Provider
            value={{
              size: "20px",
              color: "gray",
            }}
          >
            <div className="grid place-items-center">
              <BsCart />
            </div>
          </IconContext.Provider>
          <span className=""> Giỏ hàng</span>
        </a>

        <button
          className="col-start-11 w-24 text-white h-9 bg-violet-600 hover:bg-violet-500 rounded"
          onClick={() => setShowModal(true)}
        >
          Login
        </button>
        <div
          className={`col-start-12 w-20 h-8 border-2  border-slate-500 rounded-3xl my-auto flex items-center cursor-pointer ${
            active ? "bg-green-400" : "bg-gray-400"
          }`}
          onClick={() => {
            setActive(!active);
          }}
        >
          <div
            className={`rounded-full border-[2px] bg-white border-slate-500 w-5 h-5 ml-2 transition-all ${
              active ? "translate-x-10" : ""
            }`}
          ></div>
        </div>
        <Modal open={showModal} handleClose={() => setShowModal(false)}></Modal>
      </div>
    </div>
  );
};

export default HeaderUser;

function MenuDropdown(props) {
  return (
    <div className="bg-slate-100 mx-auto grid grid-cols-4 gap-7 grid-rows-2 p-5 rounded-lg drop-shadow-2xl">
      <div className="">
        <div className="text-sm font-semibold pb-2 cursor-pointer hover:text-orange-500">
          VĂN HỌC
        </div>
        <div className="cursor-pointer hover:text-orange-500">Tiểu thuyết</div>
        <div className="cursor-pointer hover:text-orange-500">
          Truyện ngắn - Tản văn
        </div>
        <div className="cursor-pointer hover:text-orange-500">Light novel</div>
        <div className="cursor-pointer hover:text-orange-500">Ngôn tình</div>
      </div>
      <div className="">
        <div className="text-sm font-semibold pb-2 cursor-pointer hover:text-orange-500">
          {" "}
          KINH TẾ
        </div>
        <div className="cursor-pointer hover:text-orange-500">
          Khởi Nghiệp - Làm Giàu
        </div>
        <div className="cursor-pointer hover:text-orange-500">
          Quản trị - Lãnh đạo
        </div>
        <div className="cursor-pointer hover:text-orange-500">
          Marketing - Bán hàng
        </div>
        <div className="cursor-pointer hover:text-orange-500">
          Phân tích kinh tế
        </div>
      </div>
      <div className="">
        <div className="text-sm font-semibold pb-2 cursor-pointer hover:text-orange-500">
          TÂM LÝ - KỸ NĂNG SỐNG
        </div>
        <div className="cursor-pointer hover:text-orange-500">Kỹ năng sống</div>
        <div className="cursor-pointer hover:text-orange-500">
          Rèn luyện nhân cách
        </div>
        <div className="cursor-pointer hover:text-orange-500">Tâm lý</div>
        <div className="cursor-pointer hover:text-orange-500">
          Sách cho tuổi mới lớn
        </div>
      </div>
      <div className="">
        <div className="text-sm font-semibold pb-2 cursor-pointer hover:text-orange-500">
          NUÔI DẠY CON
        </div>
        <div className="cursor-pointer hover:text-orange-500">
          Cẩm nang làm mẹ
        </div>
        <div className="cursor-pointer hover:text-orange-500">
          Phương pháp giáo dục trẻ em
        </div>
        <div className="cursor-pointer hover:text-orange-500">
          Phát triển trí tuệ cho trẻ
        </div>
        <div className="cursor-pointer hover:text-orange-500">
          Phát triển kỹ năng cho trẻ
        </div>
      </div>
      <div className="">
        <div className="text-sm font-semibold pb-2 cursor-pointer hover:text-orange-500">
          SÁCH THIẾU NHI
        </div>
        <div className="cursor-pointer hover:text-orange-500">
          Manga - Comic
        </div>
        <div className="cursor-pointer hover:text-orange-500">
          Kiến thức bách khoa
        </div>
        <div className="cursor-pointer hover:text-orange-500">
          Tô màu - Luyện chữ
        </div>
        <div className="cursor-pointer hover:text-orange-500">
          Phát triển kỹ năng cho trẻ
        </div>
      </div>
    </div>
  );
}
