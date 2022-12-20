import React, { useEffect, useState } from "react";
import HeaderUser from "../../layouts/HeaderUser";
import Footer from "../../layouts/Footer";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increment,
  decrement,
  addCart,
  listOrder,
} from "../../redux-toolkit/cartSlice";
import {
  productDetailFetch,
  searchProductByGenre,
} from "../../redux-toolkit/productsSlice";

const BookDetail = () => {
  const token = localStorage.getItem("token");
  const count = useSelector((state) => state.cart.count);
  const { items, similarItems, loading, error } = useSelector(
    (state) => state.products
  );
  const user = useSelector((state) => state.user);
  console.log(user);
  const productItem = [{ ...items[0], isChecked: true, cartQuantity: 1 }];
  console.log(productItem);
  const Navigate = useNavigate();
  const { bookId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productDetailFetch(bookId));
  }, [dispatch, bookId]);
  useEffect(() => {
    if (items[0]?.genreId) {
      dispatch(searchProductByGenre(items[0].genreId));
    }
  }, [dispatch, items]);
  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };
  const handleAddToCart = (product) => {
    const productCart = {
      productId: product.id,
      quantity: count,
    };
    if (token) {
      dispatch(addCart(productCart));
    } else {
      dispatch(addToCart(product));
    }
  };
  const handleOrder = (product) => {
    dispatch(listOrder(product));
    Navigate("/checkout/step1");
  };
  return (
    <div className="bg-slate-100">
      <HeaderUser />
      <div className="pt-24  text-xl">
        <div className="pl-10 py-4 cursor-pointer">
          Trang chủ {">"} Sách Tiếng Việt
        </div>

        <div className="bg-white w-[90%] border mx-auto rounded-xl p-5 mb-5 drop-shadow-xl">
          <div className="flex gap-x-28 pb-7">
            <img
              className="w-[450px]"
              src={productItem[0].image}
              alt={productItem[0].productName}
            />
            <div className="w-full">
              <div className="text-4xl text-slate-800 font-semibold pb-10">
                {productItem[0].productName}
              </div>

              <div className="grid grid-cols-2 pb-5">
                <div className="flex">
                  <div className="">Nhà xuất bản:</div>
                  <span className="text-cyan-600 font-medium pl-2">
                    {productItem[0].publisher}
                  </span>
                </div>
                <div className="flex">
                  <div className="">Tác giả:</div>
                  <span className="text-cyan-600 font-medium pl-2">
                    {productItem[0].author}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 pb-5">
                <div className="flex">
                  <div className="">Loại bìa:</div>
                  <span className="text-cyan-600 font-medium pl-2">
                    {productItem[0].form}
                  </span>
                </div>
                <div className="flex">
                  <div className="">Năm phát hành:</div>
                  <span className="text-cyan-600 font-medium pl-2">
                    {productItem[0].publicationDate}
                  </span>
                </div>
              </div>

              <div className="pb-5">
                Thể loại:
                <span className="text-cyan-600 font-medium pl-2">
                  {productItem[0].genre}
                </span>
              </div>
              <div className="pb-8 text-red-600 text-3xl font-bold">
                {productItem[0].price} đ
              </div>
              <div className="flex gap-8">
                <div className="text-2xl text-slate-700 font-semibold">
                  Số lượng:
                </div>
                <div className="ml-14">
                  <div className="w-36 h-10 rounded-xl border border-black grid grid-cols-3 place-items-center">
                    <div
                      className="cursor-pointer h-full w-full grid place-items-center hover:text-cyan-600"
                      onClick={handleDecrement}
                    >
                      <AiOutlineMinus></AiOutlineMinus>
                    </div>
                    <span className="text-2xl">{count}</span>
                    <div
                      className="cursor-pointer h-full w-full grid place-items-center hover:text-cyan-600"
                      onClick={handleIncrement}
                    >
                      <AiOutlinePlus></AiOutlinePlus>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 pl-3">
            <button
              className="border-2 border-violet-600 hover:border-violet-500 hover:shadow-xl h-12 w-60 rounded-xl p-2 font-medium text-center"
              onClick={() => handleAddToCart(productItem[0])}
            >
              <div className="flex justify-center items-center gap-3 focus:bg-black">
                <BsCart /> <span>Thêm vào giỏ hàng</span>
              </div>
            </button>
            <button
              className="bg-violet-600 hover:bg-violet-500 hover:shadow-xl h-12 w-48 rounded-xl p-2 font-medium text-center text-white"
              onClick={() => handleOrder(productItem)}
            >
              Mua ngay
            </button>
          </div>
        </div>

        <div className="bg-white w-[90%] border mx-auto rounded-lg p-5 mb-5 drop-shadow-xl">
          <div className="text-2xl font-semibold pb-5">Thông tin sản phẩm</div>
          <div className="grid grid-cols-3">
            <div className="col-start-1 py-3">Mã hàng</div>
            <div className="col-start-2 col-span-2 py-3">
              {productItem[0].id}
            </div>

            <div className="col-start-1 py-3">Độ tuổi</div>
            <div className="col-start-2 col-span-2 py-3">
              {productItem[0].age}+
            </div>

            <div className="col-start-1 py-3">Tác giả</div>
            <div className="col-start-2 col-span-2 py-3">
              {productItem[0].author}
            </div>

            <div className="col-start-1 py-3">Nhà xuất bản</div>
            <div className="col-start-2 col-span-2 py-3">
              {productItem[0].publisher}
            </div>

            <div className="col-start-1 py-3">Năm xuất bản</div>
            <div className="col-start-2 col-span-2 py-3">
              {productItem[0].publicationDate}
            </div>

            <div className="col-start-1 py-3"> Kích Thước Bao Bì</div>
            <div className="col-start-2 col-span-2 py-3">
              {productItem[0].packagingSize} cm
            </div>

            <div className="col-start-1 py-3">Loại bìa</div>
            <div className="col-start-2 col-span-2 py-3">
              {productItem[0].form}
            </div>
          </div>
          <div className="py-3 text-justify w-[95%] leading-loose">
            Giá sản phẩm trên đã bao gồm thuế theo luật hiện hành. Bên cạnh đó,
            tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát
            sinh thêm chi phí khác như phụ phí đóng gói, phụ phí hàng cồng
            kềnh,...
          </div>
          <hr></hr>
          <div className="text-2xl font-medium py-3">Tóm tắt</div>
          <div className="pb-3 text-justify w-[95%] leading-loose">
            {productItem[0].description}
          </div>
        </div>

        <div className="bg-white w-[90%] border mx-auto rounded-lg p-5 mb-5 drop-shadow-xl">
          <div className="text-2xl font-semibold pb-5">Sản phẩm liên quan</div>
          <div className="grid grid-cols-6 w-full">
            {similarItems &&
              similarItems.map((item) => (
                <div
                  key={item.id}
                  className="px-2 h-full w-full transition-all cursor-pointer mb-3"
                >
                  <div className="group drop-shadow-xl text-justify text-lg h-[300px] w-[250px] rounded-xl relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                    <img
                      className=" object-cover mt-5 h-[250px] w-[250] transition-transform duration-500 group-hover:scale-125"
                      src={item.image}
                      alt={item.productName}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                    <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-6 transition-all duration-500 group-hover:translate-y-0">
                      <p className="h-48 mt-3 italic text-justify text-ellipsis overflow-hidden  text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        {item.description}
                      </p>
                      <button
                        className="rounded-full bg-violet-600 hover:bg-violet-500 py-2  px-8  font-com text-lg capitalize text-white shadow shadow-black/60"
                        onClick={() => Navigate("/detail")}
                      >
                        Xem thêm
                      </button>
                    </div>
                  </div>
                  <a
                    className="py-3  h-[68px] text-ellipsis overflow-hidden cursor-pointer block text-xl text-cyan-600 font-semibold"
                    href="./detail"
                  >
                    {item.productName}
                  </a>
                  <div className="grid grid-cols-3 px-3">
                    <span className="col-start-1 col-span-2 text-red-600 font-bold">
                      {item.price} đ
                    </span>
                    {item.chapter && (
                      <div className="bg-gray-600 text-white rounded-lg w-18 text-center">
                        {item.chapter}
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default BookDetail;
