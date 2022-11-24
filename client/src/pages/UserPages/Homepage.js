import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import HeaderUser from "../.././layouts/HeaderUser";
import Footer from "../../layouts/Footer";
import { useGetAllProductsQuery } from "../../redux-toolkit/productsApi";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../redux-toolkit/cartSlice";
const Homepage = () => {
  // const { items: products, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllProductsQuery();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  console.log(data);
  console.log("Api", isLoading);
  const Navigate = useNavigate();
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="text-lg">
      <HeaderUser></HeaderUser>
      <div className="bg-slate-100 pt-20">
        <div className="px-5 py-4 cursor-pointer">
          Trang chủ {">"} Sách Tiếng Việt
        </div>
        <div className="flex mx-5 pb-5 ">
          <div className="w-[20%] h-[790px] bg-white rounded drop-shadow-md">
            <div className="p-3 font-medium text-base hover:text-violet-700 cursor-pointer">
              Tất cả thể loại
            </div>
            <div className="pl-5">
              <div className=" pb-2 hover:text-violet-700 cursor-pointer">
                Thiếu Nhi
              </div>
              <div className=" pb-2 hover:text-violet-700 cursor-pointer">
                Văn Học
              </div>
              <div className=" pb-2 hover:text-violet-700 cursor-pointer">
                Manga - Comic
              </div>
              <div className=" pb-2 hover:text-violet-700 cursor-pointer">
                Kinh tế
              </div>
            </div>
            <div className="p-3 border-y">
              <div className="pb-2 font-medium text-base">Giá</div>
              <div className="pb-2 pl-2 flex hover:text-violet-700 cursor-pointer">
                <input type="checkbox" className="cursor-pointer" />
                <div className="pl-3">0đ - 150.000đ</div>
              </div>
              <div className="pb-2 pl-2 flex  hover:text-violet-700 cursor-pointer">
                <input type="checkbox" className="cursor-pointer" />
                <div className="pl-3">150.000đ - 300.000đ</div>
              </div>
              <div className="pl-2 flex hover:text-violet-700 cursor-pointer">
                <input type="checkbox" className="cursor-pointer" />
                <div className="pl-3">300.000đ - 500.000đ</div>
              </div>
            </div>
            <div className="p-3 border-b">
              <div className="pb-2 font-medium text-base">Nhà cung cấp</div>
              <div className="pl-2">
                <div className="pb-2 hover:text-violet-700 cursor-pointer">
                  Nhà xuất bản Kim Đồng
                </div>
                <div className="pb-2 hover:text-violet-700 cursor-pointer">
                  Nhà xuất bản Trẻ
                </div>
                <div className="hover:text-violet-700 cursor-pointer">
                  Skybooks
                </div>
              </div>
            </div>
            <div className="p-3 border-b">
              <div className="pb-2 font-medium text-base">Độ tuổi</div>
              <div className="pb-2 pl-2 flex hover:text-violet-700 cursor-pointer">
                <input type="checkbox" className="cursor-pointer" />
                <div className="pl-3">16+</div>
              </div>
              <div className="pb-2 pl-2 flex hover:text-violet-700 cursor-pointer">
                <input type="checkbox" className="cursor-pointer" />
                <div className="pl-3">12+</div>
              </div>
              <div className="pl-2 flex hover:text-violet-700 cursor-pointer">
                <input type="checkbox" className="cursor-pointer" />
                <div className="pl-3">7+</div>
              </div>
            </div>
            <div className="p-3 border-b">
              <div className="pb-2 font-medium text-base">Loại bìa</div>
              <div className="pb-2 pl-2 flex hover:text-violet-700 cursor-pointer">
                <input type="checkbox" className="cursor-pointer" />
                <div className="pl-3">Bìa cứng</div>
              </div>
              <div className="pb-2 pl-2 flex hover:text-violet-700 cursor-pointer">
                <input type="checkbox" className="cursor-pointer" />
                <div className="pl-3">Bìa mềm</div>
              </div>
            </div>
          </div>
          <div className="ml-3 p-2 w-[80%] bg-white rounded drop-shadow-lg">
            <div className="grid grid-cols-2 w-[400px] place-items-center p-5 text-lg">
              <div className="font-medium text-slate-700">Sắp xếp theo</div>
              <Select
                className="hover:bg-slate-800"
                defaultValue="Giá bán"
                style={{
                  width: 170,
                  fontSize: 16,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "Giá bán",
                    label: "Giá bán",
                  },
                  {
                    value: "Bán chạy tuần",
                    label: "Bán chạy tuần",
                  },
                  {
                    value: "Bán chạy tháng",
                    label: "Bán chạy tháng",
                  },
                ]}
              />
            </div>

            <div className="grid grid-cols-4 gap-2">
              {data &&
                data?.map((product) => (
                  <div
                    key={product.id}
                    className="px-2 h-[full] transition-all cursor-pointer mb-7"
                  >
                    <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                      <img
                        className="h-68 w-full object-cover transition-transform duration-500 group-hover:scale-125"
                        src={product.image}
                        alt={product.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                      <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-6 transition-all duration-500 group-hover:translate-y-0">
                        <p className="h-44 p-2 italic text-ellipsis overflow-hidden  text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          {product.description}
                        </p>
                        <button
                          className="rounded-full bg-violet-600 hover:bg-violet-500 p-0.5 mb-2 px-5 py-1 font-com text-base capitalize text-white shadow shadow-black/60"
                          onClick={() => Navigate(`/detail/${product.id}`)}
                        >
                          Xem thêm
                        </button>
                        <button
                          className="rounded-full bg-red-500 hover:bg-red-400 p-0.5 mb-2 px-5 py-1 font-com text-base capitalize text-white shadow shadow-black/60"
                          onClick={() => handleAddToCart(product)}
                        >
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                    <a
                      className="py-2 h-16 cursor-pointer block text-slate-600 text-lg font-medium"
                      href="./detail"
                    >
                      {product.name}
                    </a>
                    <div className="grid grid-cols-3 px-3">
                      <span className="col-start-1 col-span-2 text-red-600 font-bold text-lg">
                        75.000đ
                      </span>
                      <div className="bg-gray-600 text-white rounded-xl py-0.5 w-18 text-center text-base">
                        Tập 11
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
