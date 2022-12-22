import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const DropDown = ({ ...props }) => {
  const [showUser, setShowUser] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  useEffect(() => {});
  // const nodeRef = useRef(null);
  const onClickHandlerUser = () => {
    setShowUser(!showUser);
    // console.log(nodeRef.current);
  };
  const onClickHandlerProduct = () => {
    setShowProduct(!showProduct);
  };
  const onClickHandlerOrder = () => {
    setShowOrder(!showOrder);
  };
  const Navigate = useNavigate();
  return (
    <div {...props}>
      <Menu
        key="1"
        onClick={onClickHandlerUser}
        show={showUser}
        name="Khách hàng"
      ></Menu>
      <CSSTransition
        in={showUser}
        className="dropdown"
        unmountOnExit
        timeout={200}
      >
        {DropdownList([
          <Button
            key="1"
            className="text-left bg-gray-600 hover:bg-gray-500 rounded-none"
            onClick={() => Navigate("/admin/customerlist")}
          >
            Danh sách khách hàng
          </Button>,
        ])}
      </CSSTransition>

      <Menu
        key="2"
        onClick={onClickHandlerProduct}
        show={showProduct}
        name="Quản lý kho"
      ></Menu>
      <CSSTransition
        in={showProduct}
        className="dropdown"
        unmountOnExit
        timeout={200}
      >
        {DropdownList([
          <Button
            key="2"
            className="text-left bg-gray-600 hover:bg-gray-500 rounded-none"
            onClick={() => Navigate("/admin/warehouse")}
          >
            Sản phẩm
          </Button>,
        ])}
      </CSSTransition>
      <CSSTransition
        in={showProduct}
        className="dropdown"
        unmountOnExit
        timeout={200}
      >
        {DropdownList([
          <Button
            key="3"
            className="text-left bg-gray-600 hover:bg-gray-500 rounded-none"
            onClick={() => Navigate("/admin/addproduct")}
          >
            Thêm sản phẩm
          </Button>,
        ])}
      </CSSTransition>
      <Menu
        key="4"
        onClick={onClickHandlerOrder}
        show={showOrder}
        name="Đơn hàng"
      ></Menu>
      <CSSTransition
        in={showOrder}
        className="dropdown"
        unmountOnExit
        timeout={200}
      >
        {DropdownList([
          <Button
            key=""
            className="text-left bg-gray-600 hover:bg-gray-500 rounded-none"
            onClick={() => Navigate("/admin/order")}
          >
            Danh sách đơn hàng
          </Button>,
        ])}
      </CSSTransition>
    </div>
  );
};
export default DropDown;

function Menu(props) {
  if (typeof document === "undefined") return null;
  return (
    <div
      className="grid grid-cols-3 p-7 w-full cursor-pointer hover:bg-teal-500 rounded duration-200 transition-all"
      onClick={props.onClick}
    >
      <span className="col-start-1 col-span-2 text-md font-medium ">
        {props.name}
      </span>
      <div className="relative grid place-items-center">
        <FontAwesomeIcon
          className={`absolute right-0 transition-all ${
            props.show ? "" : "rotate-90"
          }`}
          icon={solid("angle-down")}
        />
      </div>
    </div>
  );
}
function DropdownList(props) {
  if (typeof document === "undefined") return null;
  return (
    <div className="top-full transition-all ">
      <div className="cursor-pointer hover:bg-sky-700">{props}</div>
    </div>
  );
}
