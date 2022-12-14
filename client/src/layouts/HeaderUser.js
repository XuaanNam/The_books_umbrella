import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { Dropdown, Menu, Space } from "antd";

import { IconContext } from "react-icons";
import { IoCart } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { authentication, logout } from "../redux-toolkit/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProduct } from "../redux-toolkit/productsSlice";

const HeaderUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Navigate = useNavigate();
  const username = localStorage.getItem("user");
  const isAuth = localStorage.getItem("auth");
  const [keywords, setKeywords] = useState("");
  const user = useSelector((state) => state.usser);
  const hangdleSearch = (e) => {
    dispatch(searchProduct(keywords));
    Navigate("/");
  };

  const handleLogout = () => {
    dispatch(logout());
    Navigate("/");
  };

  return (
    <div className="h-24 fixed w-screen z-50 text-lg">
      <div className="font-medium h-full text-gray-700 bg-teal-600 grid grid-cols-9 place-items-center drop-shadow-[0_4px_5px_rgba(0,0,0,0.3)]">
        <a
          className="col-start-1 col-span-2 cursor-pointer text-slate-100 hover:text-slate-700 drop-shadow-lg"
          href="/"
        >
          HOMEPAGE
        </a>

        {!isAuth || isAuth === "0" ? (
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
                      <button className="h-14 w-20 drop-shadow-lg rounded-xl bg-violet-500 hover:bg-violet-400">
                        <div className="grid place-items-center">
                          <FiMenu className="" />
                        </div>
                      </button>
                    </Dropdown>
                  </Space>
                </Space>
              </IconContext.Provider>
            </div>

            <div className="col-start-4 col-span-3 h-14 w-[550px] rounded-xl drop-shadow-lg flex cursor-pointer ">
              <input
                className="w-[410px] font-normal pl-5 outline-none rounded-xl focus:border-2 focus:border-slate-600"
                type="text"
                placeholder="T??m ki???m s???n ph???m"
                name="keyword"
                onChange={(e) => {
                  setKeywords(e.target.value);
                }}
              />
              <div className="grid place-items-center mx-auto">
                <IconContext.Provider
                  value={{
                    size: "30px",
                    color: "white",
                  }}
                >
                  <button
                    className="h-14 w-32 rounded-xl bg-violet-500 hover:bg-violet-400"
                    onClick={hangdleSearch}
                  >
                    <div className="grid place-items-center">
                      <BiSearchAlt className="" />
                    </div>
                  </button>
                </IconContext.Provider>
              </div>
            </div>
            <a
              className="col-start-7 grid-cols-2 text-xl place-items-center cursor-pointer hover:drop-shadow-lg"
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
              <span className="text-slate-100">Gi??? h??ng</span>
            </a>
          </>
        ) : (
          <div></div>
        )}
        {isAuth ? (
          <div
            className={`relative text-xl cursor-pointer hover:text-slate-700 w-[95%] drop-shadow-lg text-black ${
              isAuth === 1 ? "col-start-7" : "col-start-8"
            } `}
          >
            <Space direction="vertical">
              <Space wrap>
                <Dropdown
                  overlay={ProfileDropdown({ handleLogout })}
                  placement="bottomRight"
                >
                  <div className="flex place-items-start gap-3 w-44 rounded-xl py-3 px-5 drop-shadow-lg border">
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
            className="col-start-8 w-32 text-white h-12 bg-violet-600 hover:bg-violet-500 drop-shadow-lg rounded-xl"
            onClick={() => setShowModal(true)}
          >
            Login
          </button>
        )}
        <div
          className={`col-start-9 w-28 h-10 border-2  border-slate-500 rounded-3xl drop-shadow-lg my-auto flex items-center cursor-pointer ${
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
              Th??ng tin c?? nh??n
            </a>
          ),
        },
        {
          key: "2",
          label: (
            <button className="text-lg" onClick={handleLogout}>
              ????ng xu???t
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
          V??N H???C
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Ti???u thuy???t
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Truy???n ng???n - T???n v??n
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Light novel
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Ng??n t??nh
        </div>
      </div>
      <div className="">
        <div className="text-xl font-semibold cursor-pointer hover:text-orange-500 pb-2">
          KINH T???
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Kh???i Nghi???p - L??m Gi??u
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Qu???n tr??? - L??nh ?????o
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Marketing - B??n h??ng
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Ph??n t??ch kinh t???
        </div>
      </div>
      <div className="">
        <div className="text-xl font-semibold cursor-pointer hover:text-orange-500 pb-2">
          T??M L?? - K??? N??NG S???NG
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          K??? n??ng s???ng
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          R??n luy???n nh??n c??ch
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">T??m l??</div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          S??ch cho tu???i m???i l???n
        </div>
      </div>
      <div className="">
        <div className="text-xl font-semibold cursor-pointer hover:text-orange-500 pb-2">
          NU??I D???Y CON
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          C???m nang l??m m???
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Ph????ng ph??p gi??o d???c tr??? em
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Ph??t tri???n tr?? tu??? cho tr???
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Ph??t tri???n k??? n??ng cho tr???
        </div>
      </div>
      <div className="">
        <div className="text-xl font-semibold cursor-pointer hover:text-orange-500 pb-2">
          S??CH THI???U NHI
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Manga - Comic
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Ki???n th???c b??ch khoa
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          T?? m??u - Luy???n ch???
        </div>
        <div className="cursor-pointer hover:text-orange-500 pb-2">
          Ki???n Th???c - K??? N??ng S???ng Cho Tr???
        </div>
      </div>
    </div>
  );
}
