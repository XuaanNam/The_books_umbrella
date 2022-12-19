import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const DropDown = () => {
  const [showUser, setShowUser] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const nodeRef = useRef(null);
  const onClickHandlerUser = (e) => {
    setShowUser(!showUser);
    nodeRef.current = showUser;
    console.log(nodeRef.current);
  };
  const onClickHandlerProduct = () => {
    setShowProduct(!showProduct);
  };
  const onClickHandlerOrder = () => {
    setShowOrder(!showOrder);
  };
  const Navigate = useNavigate();
  return (
    <div className="h-screen w-72 overflow-auto bg-teal-600 top-0 bottom-0 left-0 text-slate-200 text-lg">
      <div className="h-24"></div>
      <Menu
        onClick={onClickHandlerUser}
        show={showUser}
        name="Khách hàng"
        // ref={nodeRef}
      ></Menu>

      <CSSTransition
        in={showUser}
        className="dropdown"
        unmountOnExit
        timeout={200}
      >
        {DropdownList([
          <Button
            className="text-left bg-gray-600 hover:bg-gray-500 rounded-none"
            onClick={() => Navigate("/customerlist")}
          >
            Danh sách khách hàng
          </Button>,
        ])}
      </CSSTransition>
      <Menu
        onClick={onClickHandlerProduct}
        show={showProduct}
        name="Sản phẩm"
      ></Menu>
      <CSSTransition
        in={showProduct}
        className="dropdown"
        unmountOnExit
        timeout={200}
      >
        {DropdownList([
          <Button
            className="text-left bg-gray-600 hover:bg-gray-500 rounded-none"
            onClick={() => Navigate("/productlist")}
          >
            Danh sách sản phẩm
          </Button>,
          <Button
            className="text-left bg-gray-600 hover:bg-gray-500 rounded-none"
            onClick={() => Navigate("/warehouse")}
          >
            Quản lý kho
          </Button>,
        ])}
      </CSSTransition>
      <Menu
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
            className="text-left bg-gray-600 hover:bg-gray-500 rounded-none"
            onClick={() => Navigate("/order")}
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
      className="grid grid-cols-3 p-5 w-full cursor-pointer hover:bg-teal-500 rounded duration-200 transition-all"
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
      {props.map((item) => {
        return <div className="cursor-pointer hover:bg-sky-700">{item}</div>;
      })}
    </div>
  );
}
