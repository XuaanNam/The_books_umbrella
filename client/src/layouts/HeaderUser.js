import React, { useState } from "react";
import Modal from "../components/Modal";
import { Dropdown, Menu, Space } from "antd";

import { IconContext } from "react-icons";
import { IoCart } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { logout } from "../redux-toolkit/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const HeaderUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const username = localStorage.getItem("user");
  const isAuth = localStorage.getItem("auth");
  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      Navigate("/");
    }, 1500);
  };
  const user = localStorage.getItem("user");
  // console.log(user);
  return (
    <div className="h-24 fixed w-screen z-50 text-lg">
      <div className="font-medium h-full text-gray-700 bg-teal-500 grid grid-cols-10 place-items-center drop-shadow-[0_4px_5px_rgba(0,0,0,0.3)]">
        <a
          className="col-start-1 col-span-2 cursor-pointer text-slate-100 hover:text-slate-700 drop-shadow-lg"
          href="/"
        >
          HOMEPAGE
        </a>

        {/* {!isAuth && ( */}
        <>
          <div className="col-start-3">
            <IconContext.Provider
              value={{
                size: "40px",
                color: "white",
              }}
            >
              <Space direction="vertical">
                <Space wrap>
                  <Dropdown overlay={MenuDropdown} placement="bottomRight">
                    <button className="h-14 w-20 rounded-xl bg-violet-500 hover:bg-violet-400">
                      <div className="grid place-items-center">
                        <FiMenu className="" />
                      </div>
                    </button>
                  </Dropdown>
                </Space>
              </Space>
            </IconContext.Provider>
          </div>

          <div className="col-start-4 col-span-4 h-14 w-[550px] rounded-xl flex cursor-pointer ">
            <input
              className="w-[410px] font-normal pl-5 outline-none rounded-xl focus:border-2 focus:border-slate-600"
              type="text"
              placeholder="Tìm kiếm sản phẩm"
            />
            <div className="grid place-items-center mx-auto">
              <IconContext.Provider
                value={{
                  size: "30px",
                  color: "white",
                }}
              >
                <button className="h-14 w-32 rounded-xl bg-violet-500 hover:bg-violet-400">
                  <div className="grid place-items-center">
                    <BiSearchAlt className="" />
                  </div>
                </button>
              </IconContext.Provider>
            </div>
          </div>
          <a
            className="col-start-8 grid-cols-2 text-xl place-items-center cursor-pointer hover:drop-shadow-lg"
            href="/cart"
          >
            <IconContext.Provider
              value={{
                size: "35px",
              }}
            >
              <div className="grid place-items-center text-slate-100">
                <IoCart />
              </div>
            </IconContext.Provider>
            <span className="text-slate-100">Giỏ hàng</span>
          </a>
        </>
        {/* )} */}
        {user ? (
          <div className="relative col-start-9 hover:text-slate-700 hover:drop-shadow-lg text-black text-xl cursor-pointer">
            <Space direction="vertical">
              <Space wrap>
                <Dropdown
                  overlay={ProfileDropdown({ handleLogout })}
                  placement="bottomRight"
                >
                  <div className="flex gap-2 p-2 ">
                    <IconContext.Provider
                      value={{
                        size: "25px",
                      }}
                    >
                      <div className="grid place-items-center text-slate-100">
                        <FaUserAlt />
                      </div>
                    </IconContext.Provider>

                    <div
                      // onClick={() => setShowMenu(true)}
                      className="text-ellipsis overflow-hidden col-span-2 text-slate-100 font-medium text-xl"
                    >
                      {username}
                    </div>
                  </div>
                </Dropdown>
              </Space>
            </Space>
          </div>
        ) : (
          <button
            className="col-start-9 w-24 text-white h-9 bg-violet-600 hover:bg-violet-500 rounded"
            onClick={() => setShowModal(true)}
          >
            Login
          </button>
        )}
        <div
          className={`col-start-10 w-28 h-10 border-2  border-slate-500 rounded-3xl my-auto flex items-center cursor-pointer ${
            active ? "bg-green-400" : "bg-gray-400"
          }`}
          onClick={() => {
            setActive(!active);
          }}
        >
          <div
            className={`rounded-full border-[2px] bg-white border-slate-500 w-7 h-7 ml-2 transition-all ${
              active ? "translate-x-16" : ""
            }`}
          ></div>
        </div>

        <Modal open={showModal} handleClose={() => setShowModal(false)}></Modal>
      </div>
    </div>
  );
};

export default HeaderUser;
function ProfileDropdown({ handleLogout = () => {} }) {
  return (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a className="text-lg" href="/Profile">
              Thông tin cá nhân
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <button className="text-lg" onClick={handleLogout}>
              Đăng xuất
            </button>
          ),
        },
      ]}
    />
  );
}
function MenuDropdown(props) {
  return (
    <div className="bg-slate-100 mx-auto grid grid-cols-4 gap-7 grid-rows-2 p-5 rounded-lg drop-shadow-2xl text-lg">
      <div className="">
        <div className="text-xl font-semibold cursor-pointer hover:text-orange-500 pb-2">
          VĂN HỌC
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Tiểu thuyết
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Truyện ngắn - Tản văn
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Light novel
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Ngôn tình
        </div>
      </div>
      <div className="">
        <div className="text-xl font-semibold cursor-pointer hover:text-orange-500 pb-2">
          KINH TẾ
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Khởi Nghiệp - Làm Giàu
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Quản trị - Lãnh đạo
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Marketing - Bán hàng
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Phân tích kinh tế
        </div>
      </div>
      <div className="">
        <div className="text-xl font-semibold cursor-pointer hover:text-orange-500 pb-2">
          TÂM LÝ - KỸ NĂNG SỐNG
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Kỹ năng sống
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Rèn luyện nhân cách
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">Tâm lý</div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Sách cho tuổi mới lớn
        </div>
      </div>
      <div className="">
        <div className="text-xl font-semibold cursor-pointer hover:text-orange-500 pb-2">
          NUÔI DẠY CON
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Cẩm nang làm mẹ
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Phương pháp giáo dục trẻ em
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Phát triển trí tuệ cho trẻ
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Phát triển kỹ năng cho trẻ
        </div>
      </div>
      <div className="">
        <div className="text-xl font-semibold cursor-pointer hover:text-orange-500 pb-2">
          SÁCH THIẾU NHI
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Manga - Comic
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Kiến thức bách khoa
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Tô màu - Luyện chữ
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Kiến Thức - Kỹ Năng Sống Cho Trẻ
        </div>
      </div>
    </div>
  );
}
