import React, { useEffect } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import Footer from "../../layouts/Footer";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
// import Counter from "../../components/Counter";
import { useDispatch, useSelector } from "react-redux";
import {
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
  console.log(cart);
  const initialtotalprice = 0;
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
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
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="bg-slate-100 ">
      <HeaderUser></HeaderUser>
      <div className="pt-16">
        <div className="p-5 text-xl font-semibold">GIỎ HÀNG</div>
        <div className="mx-5 bg-white font-medium text-base rounded p-4 grid grid-cols-12 drop-shadow-lg">
          <div className="col-start-1 col-span-6 flex items-center pl-9">
            <input
              type="checkbox"
              className="w-6 h-6 cursor-pointer rounded-lg"
            />
            <span className="pl-2">Chọn tất cả (1 sản phẩm)</span>
          </div>
          <div className="col-start-7 col-span-1 text-center">Đơn giá</div>
          <div className="col-start-8 col-span-2 text-center">Số lượng</div>
          <div className="col-start-10 col-span-1 text-center">Tổng giá</div>
        </div>

        <div className="m-5 pb-5 bg-white rounded drop-shadow-lg">
          {cart.cartItems &&
            cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.id}
                className="p-4 grid grid-cols-12 place-items-center border-b"
              >
                <input
                  type="checkbox"
                  className="col-start-1 w-6 h-6 cursor-pointer rounded-lg"
                />
                <img
                  className="col-start-2 col-span-2 h-40 cursor-pointer"
                  onClick={() => Navigate(`/detail/${cartItem.id}`)}
                  src={cartItem.image}
                  alt={cartItem.name}
                ></img>
                <div
                  className="col-start-4 col-span-3 text-lg font-medium text-cyan-700 text-left cursor-pointer"
                  onClick={() => Navigate(`/detail/${cartItem.id}`)}
                >
                  {cartItem.name}
                </div>
                <div className="col-start-7 text-center text-base font-medium text-red-600">
                  {cartItem.price}
                </div>
                <div className="col-start-8 col-span-2">
                  <div className="w-36 h-8 rounded-lg border border-black grid grid-cols-3 place-items-center">
                    <div
                      className="cursor-pointer h-full w-full grid place-items-center"
                      onClick={() => handleDecreaseCart(cartItem)}
                    >
                      <AiOutlineMinus></AiOutlineMinus>
                    </div>
                    <span className="text-lg">{cartItem.cartQuantity}</span>
                    <div
                      className="cursor-pointer h-full w-full grid place-items-center"
                      onClick={() => handleIncreaseCart(cartItem)}
                    >
                      <AiOutlinePlus></AiOutlinePlus>
                    </div>
                  </div>
                </div>
                <div className="col-start-10 text-center text-base font-medium text-red-600">
                  {cartItem.totalprice * cartItem.cartQuantity} đ
                </div>
                <BsTrash
                  className="col-start-11 col-span-2 h-7 w-7 cursor-pointer"
                  onClick={() => handleRemoveFromCart(cartItem)}
                ></BsTrash>
              </div>
            ))}

          <div className="flex">
            <div className="text-base font-normal w-[800px]">
              <div className="p-5">Chú thích cho cửa hàng</div>
              <textarea className="ml-5 p-3 w-96 h-32 border border-slate-700 rounded-lg outline-none"></textarea>
            </div>
            <div className="text-base font-normal my-auto">
              <div className="p-3">
                Tổng tiền
                <span className="text-2xl font-medium pl-3">sss</span>
              </div>
              <button className="p-2 bg-cyan-700 hover:bg-cyan-600 rounded-lg w-80 text-white text-base font-medium">
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
