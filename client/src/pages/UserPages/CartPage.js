import React, { useEffect, useState } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import Footer from "../../layouts/Footer";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import cartFetch from "../../redux-toolkit/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  listOrder,
  addToCart,
  clearCart,
  increaseCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../redux-toolkit/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart.cartItems);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [carts, setCarts] = useState([]);
  const [disable, setDisable] = useState(true);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setCarts(cart.cartItems);
  }, [cart.cartItems]);
  useEffect(() => {
    let subTotal = 0;
    setDisable(true);
    carts.map((cart) => {
      if (cart.isChecked) {
        subTotal += cart.price * cart.cartQuantity;
        setDisable(false);
      }
      return subTotal;
    });
    setTotal(subTotal);
  }, [carts]);
  useEffect(() => {
    dispatch(cartFetch());
  }, [dispatch]);
  // useEffect(() => {
  //   setDisable(true);
  //   carts.map((cart) => {
  //     if (cart.isChecked) {
  //       setDisable(false);
  //       dispatch(getTotals());
  //     } else {
  //     }
  //     return 0;
  //   });
  // }, [carts]);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    let tempCart = [];
    if (name === "allSelect") {
      tempCart = carts.map((cart) => {
        return { ...cart, isChecked: checked };
      });
      setCarts(tempCart);
      setDisable(!disable);
    } else {
      tempCart = carts.map((cart) =>
        cart.productName === name ? { ...cart, isChecked: checked } : cart
      );
      setCarts(tempCart);
    }
  };

  const handleIncreaseCart = (product) => {
    dispatch(increaseCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleOrder = (product) => {
    let orderArr = [];
    carts.map((cart) => {
      if (cart.isChecked) {
        orderArr.push(cart);
      }
      return orderArr;
    });
    console.log(orderArr);
    localStorage.setItem("orderItems", JSON.stringify(orderArr));
    // const a = JSON.parse(localStorage.getItem("orderItems"));
    // console.log(a);
    Navigate("/checkout");
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="bg-slate-100 min-h-screen text-xl">
      <HeaderUser></HeaderUser>

      {/* <ModalLogin
      // handleClose={handleClose}
      // handleRegister={handleRegister}
      ></ModalLogin> */}
      <div className="pt-24">
        <div className="p-5 text-xl font-semibold">GIỎ HÀNG</div>
        <div className="mx-5 bg-white font-medium text-xl rounded p-7 grid grid-cols-12 drop-shadow-lg">
          <div className="col-start-1 col-span-6 flex items-center pl-9">
            <input
              type="checkbox"
              name="allSelect"
              className="w-6 h-6 cursor-pointer rounded-lg"
              checked={!carts.some((cart) => cart?.isChecked !== true)}
              onChange={handleChange}
            />
            <span className="pl-2">Chọn tất cả ({carts.length} sản phẩm)</span>
          </div>
          <div className="col-start-7 col-span-1 text-center">Đơn giá</div>
          <div className="col-start-8 col-span-2 text-center">Số lượng</div>
          <div className="col-start-10 col-span-1 text-center">Tổng giá</div>
        </div>

        <div className="m-5 pb-5 bg-white rounded drop-shadow-lg">
          {console.log(carts)}

          {carts &&
            carts.map((cartItem) => (
              <div
                key={cartItem.id}
                className="p-4 grid grid-cols-12 place-items-center text-xl  border-b"
              >
                <input
                  name={cartItem.productName}
                  type="checkbox"
                  className="col-start-1 w-6 h-6 cursor-pointer rounded-lg"
                  checked={cartItem.isChecked || false}
                  onChange={handleChange}
                />
                <img
                  className="col-start-2 col-span-2 h-40 cursor-pointer"
                  onClick={() => Navigate(`/detail/${cartItem.id}`)}
                  src={cartItem.image}
                  alt={cartItem.productName}
                ></img>
                <div
                  className="col-start-4 col-span-3 text-2xl font-medium text-cyan-700 text-left cursor-pointer"
                  onClick={() => Navigate(`/detail/${cartItem.id}`)}
                >
                  {cartItem.productName}
                </div>
                <div className="col-start-7 text-center text-2xl font-medium text-red-600">
                  {cartItem.price} đ
                </div>
                <div className="col-start-8 col-span-2">
                  <div className="w-36 h-8 rounded-lg border border-black grid grid-cols-3 place-items-center">
                    <div
                      className="cursor-pointer h-full w-full grid place-items-center"
                      onClick={() => handleDecreaseCart(cartItem)}
                    >
                      <AiOutlineMinus></AiOutlineMinus>
                    </div>
                    <span className="text-xl">{cartItem.cartQuantity}</span>
                    <div
                      className="cursor-pointer h-full w-full grid place-items-center"
                      onClick={() => handleIncreaseCart(cartItem)}
                    >
                      <AiOutlinePlus></AiOutlinePlus>
                    </div>
                  </div>
                </div>
                <div className="col-start-10 text-center text-2xl font-medium text-red-600">
                  {cartItem.price * cartItem.cartQuantity} đ
                </div>
                <BsTrash
                  className="col-start-11 col-span-2 h-7 w-7 cursor-pointer"
                  onClick={() => handleRemoveFromCart(cartItem)}
                ></BsTrash>
              </div>
            ))}

          <div className="flex">
            <div className="text-base font-normal w-[800px]">
              <div className="p-5 text-lg">Chú thích cho cửa hàng</div>
              <textarea className="ml-5 p-3 w-96 h-32 border border-slate-700 rounded-lg outline-none"></textarea>
            </div>
            <div className="font-normal my-auto">
              <div className="p-3">
                Tổng tiền
                <span className="text-2xl font-medium pl-3">{total}</span>
              </div>
              <button
                className={`${
                  disable ? "bg-slate-300" : "bg-cyan-700 hover:bg-cyan-600"
                } p-2 rounded-xl w-96 h-16 text-white text-xl font-medium`}
                disabled={disable}
                onClick={() => handleOrder(carts)}
              >
                THANH TOÁN
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CartPage;
