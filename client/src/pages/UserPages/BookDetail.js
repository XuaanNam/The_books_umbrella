import React from "react";
import HeaderUser from "../../layouts/HeaderUser";
import Footer from "../../layouts/Footer";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increment, decrement } from "../../redux-toolkit/cartSlice";

const BookDetail = () => {
  const count = useSelector((state) => state.cart.count);
  console.log(count);
  const Navigate = useNavigate();
  const { bookId } = useParams();
  console.log(bookId);
  // const { data, error, isLoading } = useGetAllProductsQuery();
  // console.log(data);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecrement = () => {
    dispatch(decrement());
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  // const handleDecreaseCart = (product) => {
  //   dispatch(decreaseCart(product));
  // };
  return (
    <div className="bg-slate-100">
      <HeaderUser />
      <div className="pt-24  text-xl">
        <div className="px-5 py-4 cursor-pointer">
          Trang chủ {">"} Sách Tiếng Việt
        </div>
        {/* {data ? (
          data.map(
            (item) =>
              parseInt(item.id) === parseInt(bookId) && (
                <div className="text-lg">
                  <div className="bg-white w-[90%] border mx-auto rounded-lg p-5 mb-5 drop-shadow-lg">
                    <div className="flex gap-x-28 pb-7">
                      <img className="w-[450px]" src={item.image} alt="" />
                      <div className="w-full">
                        <div className="text-4xl text-slate-800 font-semibold pb-5">
                          {item.productName}
                        </div>
                        <div className="grid grid-cols-2 pb-3">
                          <div className="flex pb-3">
                            <div className="">Nhà cung cấp:</div>
                            <span className="text-blue-600 font-medium pl-2">
                              Nhà xuất bản Kim Đồng
                            </span>
                          </div>
                          <div className="flex">
                            <div className="">Tác giả:</div>
                            <span className="text-slate-700 font-medium pl-2">
                              Gege Akutami
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 pb-5">
                          <div className="flex">
                            <div className="">Nhà xuất bản:</div>
                            <span className="text-blue-600 font-medium pl-2">
                              Nhà xuất bản Kim Đồng
                            </span>
                          </div>
                          <div className="flex">
                            <div className="">Loại bìa:</div>
                            <span className="text-slate-700 font-medium pl-2">
                              Bìa mềm
                            </span>
                          </div>
                        </div>

                        <div className="pb-5">
                          Bộ:
                          <span className="text-blue-600 font-medium pl-2">
                            Chú thuật hồi chiến
                          </span>
                        </div>
                        <div className="pb-6 text-red-600 text-3xl font-bold">
                          {item.price}
                        </div>
                        <div className="flex">
                          <div className="text-xl text-slate-700 font-semibold">
                            Số lượng:
                          </div>
                          <div className="ml-14">
                            <div className="w-36 h-10 rounded-xl border border-black grid grid-cols-3 place-items-center">
                              <div
                                className="cursor-pointer h-full w-full grid place-items-center"
                                onClick={handleDecrement}
                              >
                                <AiOutlineMinus></AiOutlineMinus>
                              </div>
                              <span className="text-lg">{count}</span>
                              <div
                                className="cursor-pointer h-full w-full grid place-items-center"
                                onClick={handleIncrement}
                              >
                                <AiOutlinePlus></AiOutlinePlus>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <button
                        className="border-2 border-violet-600 hover:border-violet-500 hover:shadow-xl h-12 w-60 rounded-xl p-2 font-medium text-center"
                        onClick={() => handleAddToCart(item)}
                      >
                        <div className="flex justify-center items-center gap-3 focus:bg-black">
                          <BsCart /> <span>Thêm vào giỏ hàng</span>
                        </div>
                      </button>
                      <button className="bg-violet-600 hover:bg-violet-500 hover:shadow-xl h-12 w-48 rounded-xl p-2 font-medium text-center text-white">
                        Mua ngay
                      </button>
                    </div>
                  </div>

                  <div className="bg-white w-[90%] border mx-auto rounded-lg p-5 mb-5">
                    <div className="text-xl font-semibold">
                      Thông tin sản phẩm
                    </div>
                    <div className="grid grid-cols-3">
                      <div className="col-start-1 py-3">Mã hàng</div>
                      <div className="col-start-2 col-span-2 py-3">
                        8935244872446
                      </div>

                      <div className="col-start-1 py-3">Độ tuổi</div>
                      <div className="col-start-2 col-span-2 py-3">15+</div>

                      <div className="col-start-1 py-3">Tác giả</div>
                      <div className="col-start-2 col-span-2 py-3">
                        Gege Akutami
                      </div>

                      <div className="col-start-1 py-3">Nhà xuất bản</div>
                      <div className="col-start-2 col-span-2 py-3">
                        Nhà Xuất Bản Kim Đồng
                      </div>

                      <div className="col-start-1 py-3">Năm xuất bản</div>
                      <div className="col-start-2 col-span-2 py-3">2022</div>

                      <div className="col-start-1 py-3"> Kích Thước Bao Bì</div>
                      <div className="col-start-2 col-span-2 py-3">
                        17.6 x 11.3 cm
                      </div>

                      <div className="col-start-1 py-3">Loại bìa</div>
                      <div className="col-start-2 col-span-2 py-3">Bìa mềm</div>

                      <div className="col-start-1 py-3">Ngôn ngữ</div>
                      <div className="col-start-2 col-span-2 py-3">
                        Tiếng việt
                      </div>
                    </div>
                    <div className="py-3">
                      Giá sản phẩm trên đã bao gồm thuế theo luật hiện hành. Bên
                      cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao
                      hàng mà có thể phát sinh thêm chi phí khác như Phụ phí
                      đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...
                    </div>
                    <hr></hr>
                    <div className="text-lg font-medium py-3">Tóm tắt</div>
                    <div className="pb-3">
                      Tại hiện trường án mạng do chú linh gây ra, Itadori đã gặp
                      gỡ Junpei, cả hai tâm đầu ý hợp. Nhưng Junpei lại tôn sùng
                      chú linh Mahito, thủ phạm của vụ án. Mahito lợi dụng
                      Junpei, hòng li gián cậu và Itadori. Junpei rơi vào cạm
                      bẫy của hắn và...
                    </div>
                  </div>
                </div>
              )
          )
        ) : (
          <div></div>
        )} */}
        <div className="bg-white w-[90%] border mx-auto rounded-lg p-5 mb-5 text-lg">
          <div className="text-xl font-semibold pb-5">Sản phẩm liên quan</div>
          <div className=" grid grid-cols-4 gap-5">
            <div className="px-2 w-full transition-all cursor-pointer mb-3">
              <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                <img
                  className=" object-cover transition-transform duration-500 group-hover:scale-125"
                  src="https://cdn0.fahasa.com/media/catalog/product/c/h/chu-thuat-hoi-chien---tap-4---ta-se-diet-tru-nguoi---obi.jpg"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-6 transition-all duration-500 group-hover:translate-y-0">
                  <p className="h-48 px-2 mb-3 italic text-ellipsis overflow-hidden  text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Tại hiện trường án mạng do chú linh gây ra, Itadori đã gặp
                    gỡ Junpei, cả hai tâm đầu ý hợp. Nhưng Junpei lại tôn sùng
                    chú linh Mahito, thủ phạm của vụ án. Mahito lợi dụng Junpei,
                    hòng li gián cậu và Itadori. Junpei rơi vào cạm bẫy của hắn
                    và...
                  </p>
                  <button
                    className="rounded-full bg-violet-600 hover:bg-violet-500 py-2 my-5 px-8  font-com text-lg capitalize text-white shadow shadow-black/60"
                    onClick={() => Navigate("/detail")}
                  >
                    Xem thêm
                  </button>
                </div>
              </div>
              <a
                className="py-3 cursor-pointer block text-xl text-violet-600 font-semibold"
                href="./detail"
              >
                Chú Thuật Hồi Chiến
              </a>
              <div className="grid grid-cols-3 px-3">
                <span className="col-start-1 col-span-2 text-red-600 font-bold">
                  75.000đ
                </span>
                <div className="bg-gray-600 text-white rounded-lg w-18 text-center">
                  Tập 11
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default BookDetail;
