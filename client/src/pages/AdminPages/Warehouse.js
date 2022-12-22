import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Menu, Space } from "antd";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import menu from "../../components/menu";
import { useDispatch, useSelector } from "react-redux";
import { warehouseFetch, changeStatus } from "../../redux-toolkit/adminSlice";
import { useNavigate } from "react-router-dom";

const Warehouse = () => {
  const admin = useSelector((state) => state.admin);
  const [product, setProduct] = useState([]);
  const [disable, setDisable] = useState(true);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    dispatch(warehouseFetch());
  }, [token, dispatch]);
  useEffect(() => {
    setProduct(admin.items);
  }, [admin.items]);

  const nodeRef = useRef();
  const handleChangeStatus = (item, status) => {
    const data = {
      productId: item,
      status: status,
    };
    let newStatus = "Cửa hàng";
    if(status === 2){ newStatus = "Trong kho"}
    if(admin.checked){
      let products = [];
      products = [...product];
      const index = product.findIndex((i) => i.id === item);
      products[index] = {
        ...product[index],
        status: newStatus,
      };

      setProduct(products);
    }
    
    dispatch(changeStatus(data));
  };
  const handleChange = (e) => {
    const { name, checked } = e.target;
    let tempItem = [];
    if (name === "allSelect") {
      tempItem = product.map((item) => {
        return { ...item, isChecked: checked };
      });
      setDisable(!disable);
      setProduct(tempItem);
    } else {
      tempItem = product.map((item) =>
        item.productName === name ? { ...item, isChecked: checked } : item
      );
      setProduct(tempItem);
    }
  };
  return (
    <div className="w-[95%] rounded-lg h-[95%] mx-auto drop-shadow-2xl">
      <div className="bg-white h-40 rounded-t-lg">
        <div>
          <div className="grid grid-cols-6 h-16">
            <div className="col-start-1 col-span-5 pt-4 pl-6 text-2xl font-semibold">
              Tất cả sản phẩm
            </div>
            <Button
              className="bg-teal-400 text-center h-12 py-2 px-1 w-40 mx-auto border hover:border-violet-200 drop-shadow-lg hover:drop-shadow-xl"
              onClick={() => Navigate("/admin/addproduct")}
            >
              Thêm sản phẩm
            </Button>
          </div>
          <div>
            <div className="flex gap-6">
              <div className="mt-4 ml-6 h-14 w-80 border border-teal-500 hover:border-teal-300 rounded flex cursor-pointer ">
                <div className="grid place-items-center">
                  <FontAwesomeIcon
                    className="ml-5"
                    icon={solid("magnifying-glass")}
                  />
                </div>
                <input
                  className="w-full font-normal pl-5 outline-none rounded"
                  type="text"
                  placeholder="Tìm kiếm theo tên sản phẩm"
                />
              </div>
              <div className="mt-4 h-14 border border-teal-500 hover:border-teal-300 hover:drop-shadow-lg rounded flex cursor-pointer ">
                <Dropdown overlay={menu[0]} placement="bottom">
                  <div className="grid place-items-center w-40 rounded">
                    Trạng thái
                  </div>
                </Dropdown>
              </div>

              <div className="mt-4 h-14 border border-teal-500 hover:border-teal-300 hover:drop-shadow-lg rounded flex cursor-pointer ">
                <Dropdown overlay={menu[1]} placement="bottom">
                  <div className="grid place-items-center w-36 rounded">
                    Loại
                  </div>
                </Dropdown>
              </div>

              <div className="mt-4 h-14 border border-teal-500 hover:border-teal-300 hover:drop-shadow-lg rounded flex cursor-pointer ">
                <Dropdown overlay={menu[2]} placement="bottom">
                  <div className="grid place-items-center w-36 rounded">
                    Giá
                  </div>
                </Dropdown>
              </div>
              {disable === false && (
                <div className="flex gap-5">
                  <div className="grid place-items-center">
                    <Button
                      className="bg-red-400 text-white text-center h-11 py-2 px-1 w-40 mx-auto rounded-xl border hover:border-violet-200 drop-shadow-lg hover:drop-shadow-xl"
                      onClick={() => Navigate("/admin/addproduct")}
                    >
                      Ẩn sản phẩm
                    </Button>
                  </div>
                  <div className="grid place-items-end">
                    <Button
                      className="bg-teal-400 text-center h-11 py-2 px-1 w-40 mx-auto rounded-xl border hover:border-violet-200 drop-shadow-lg hover:drop-shadow-xl"
                      onClick={() => Navigate("/admin/addproduct")}
                    >
                      Trưng bày tất cả
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-b-lg">
        <table className="w-full h-[370px] table-auto text-neutral-700">
          <thead className="h-16">
            <tr className="bg-slate-100">
              <th className="w-10">
                <input
                  ref={nodeRef}
                  name="allSelect"
                  type="checkbox"
                  className=" checked:bg-blue-500 cursor-pointer h-6 w-6"
                  // checked={!product?.some((item) => item?.isChecked !== true)}
                  checked={nodeRef?.current?.checked === true || false}
                  onChange={handleChange}
                />
              </th>
              <th className="w-12">Ảnh</th>
              <th className="w-24 text-left">Tên sách</th>
              <th className="w-24 text-center pr-10">Loại</th>
              <th className="w-16 text-left">Giá bán</th>
              <th className="w-24 text-left">Nhà xuất bản</th>
              <th className="w-20 text-left">Còn trong kho</th>
              <th className="w-20 text-left">Trạng thái</th>
            </tr>
          </thead>
          <tbody className=" w-full h-32">
            {product && 
              product.map((item) => (
                <tr className="h-20 text-xl" key={item.id}>
                  <td className="text-center">
                    <input
                      name={item.productName}
                      type="checkbox"
                      className=" checked:bg-blue-500 cursor-pointer h-6 w-6"
                      checked={item.isChecked || false}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </td>
                  <td>
                    <div className="col-start-2 col-span-2 px-2 w-full grid justify-center items-center drop-shadow-lg transition-all cursor-pointer mb-3">
                      <div className="group drop-shadow-xl text-justify text-lg h-[150px] w-[100px] rounded-xl relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30">
                        <img
                          className=" h-[140px] mt-5 object-cover w-full transition-transform duration-500 group-hover:scale-125"
                          src={item.image}
                          alt={item.productName}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                      </div>
                    </div>
                  </td>
                  <td className=" w-[100px]">{item.productName}</td>
                  <td className="text-center pr-5">{item.form}</td>
                  <td>{item.price}</td>
                  <td>{item.publisher}</td>
                  <td className="pl-10 font-medium">{item.quantity}</td>
                  {item.status === "Trong kho" ? (
                    <td>
                      <button
                        className="bg-red-400 text-white w-[80%] grid place-items-center text-center my-auto p-1 rounded-xl hover:drop-shadow-xl"
                        onClick={() => {
                          handleChangeStatus(item.id, 1);
                        }}
                      >
                        Trong kho
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button
                        className="bg-teal-400 text-white w-[80%] grid place-items-center text-center my-auto p-1 rounded-xl hover:drop-shadow-xl"
                        onClick={() => {
                          handleChangeStatus(item.id, 2);
                        }}
                      >
                        Cửa hàng
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Warehouse;
