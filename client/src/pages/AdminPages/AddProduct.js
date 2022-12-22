import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Input from "../../components/Input";
import SelectBox from "../../components/SelectBox";
import TextArea from "../../components/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux-toolkit/adminSlice";
const AddProduct = () => {
  const dispatch = useDispatch();
  const [mess, setMess] = useState("");
  const handleAddProduct = (values) => {
    console.log(values);
    dispatch(addProduct(values));
  };
  return (
    <div className="h-[1000px]">
      <div className="drop-shadow-lg border-2 w-[85%] rounded-lg mx-auto">
        <div className="text-3xl text-center p-5 font-medium text-slate-700">
          Thêm sản phẩm
        </div>
        <Formik
          initialValues={{
            image: "",
            productName: "",
            chapter: "",
            author: "",
            translator: "",
            price: "",
            publisher: "",
            publicationDate: "",
            age: "",
            packagingSize: "",
            form: "",
            quantity: "",
            description: "",
            status: "",
            genre: "",
          }}
          validationSchema={Yup.object({
            image: Yup.string().required("Vui lòng điền vào trường trống"),
            productName: Yup.string().required(
              "Vui lòng điền vào trường trống"
            ),
            chapter: Yup.string().required("Vui lòng điền vào trường trống"),
            author: Yup.string().required("Vui lòng điền vào trường trống"),
            translator: Yup.string().required("Vui lòng điền vào trường trống"),
            price: Yup.string().required("Vui lòng điền vào trường trống"),
            publisher: Yup.string().required("Vui lòng điền vào trường trống"),
            publicationDate: Yup.string().required(
              "Vui lòng điền vào trường trống"
            ),
            age: Yup.string().required("Vui lòng điền vào trường trống"),
            packagingSize: Yup.string().required(
              "Vui lòng điền vào trường trống"
            ),
            form: Yup.string().required("Vui lòng điền vào trường trống"),
            quantity: Yup.string().required("Vui lòng điền vào trường trống"),
            description: Yup.string().required(
              "Vui lòng điền vào trường trống"
            ),
            status: Yup.string().required("Vui lòng điền vào trường trống"),
            genre: Yup.string().required("Vui lòng điền vào trường trống"),
          })}
          onSubmit={(values) => {
            handleAddProduct(values);
          }}
          onChange={(values) => {
            setMess("values");
          }}
        >
          {(formik) => {
            return (
              <Form className="grid place-items-center">
                <div className="w-[80%]">
                  <div className="grid grid-cols-3 gap-5 place-items-start">
                    <div>
                      <Input
                        className="w-[350px] border border-slate-100 h-16 text-xl my-2 drop-shadow-auto focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                        type="text"
                        name="productName"
                        label="Tên sản phẩm"
                        id="productName"
                      ></Input>
                    </div>
                    <Input
                      className="w-[350px] border border-slate-100 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                      type="text"
                      name="author"
                      label="Tác giả"
                      id="author"
                    ></Input>
                    <Input
                      className="w-[350px] border border-slate-100 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                      type="number"
                      name="chapter"
                      label="Tập"
                      id="chapter"
                    ></Input>
                  </div>
                  <div className="flex gap-5 items-start">
                    <div className="">
                      <Input
                        className="w-[520px] border border-slate-100 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                        type="text"
                        name="image"
                        label="Hình ảnh"
                        id="image"
                      ></Input>
                    </div>
                    <SelectBox
                      className="w-[300px] border border-slate-100 col-start-3 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                      type="text"
                      name="genre"
                      label="Thể loại"
                      id="genre"
                    >
                      <option value="1">Tiểu thuyết</option>
                      <option value="2">Truyện ngắn - Tản văn</option>
                      <option value="3">Light novel</option>
                      <option value="4">Ngôn tình</option>
                      <option value="5">Khởi Nghiệp - Làm Giàu</option>
                      <option value="6">Quản trị - Lãnh đạo</option>
                      <option value="7">Marketing - Bán hàng</option>
                      <option value="8">Phân tích kinh tế</option>
                      <option value="9">Kỹ năng sống</option>
                      <option value="10">Rèn luyện nhân cách</option>
                      <option value="11">Tâm lý</option>
                      <option value="12">Sách cho tuổi mới lớn</option>
                      <option value="13">Cẩm nang làm mẹ</option>
                      <option value="14">Phương pháp giáo dục trẻ em</option>
                      <option value="15">Phát triển trí tuệ cho trẻ</option>
                      <option value="16">Phát triển kỹ năng cho trẻ</option>
                      <option value="17">Manga - Comic</option>
                      <option value="18">Kiến thức bách khoa</option>
                      <option value="19">Tô màu - Luyện chữ</option>
                      <option value="20">
                        Kiến Thức - Kỹ Năng Sống Cho Trẻ
                      </option>
                    </SelectBox>

                    <SelectBox
                      className="w-[220px] border border-slate-100 col-start-3 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                      type="text"
                      name="form"
                      label="Loại bìa"
                      id="form"
                    >
                      <option value="1">Bìa cứng</option>
                      <option value="2">Bìa mềm</option>
                    </SelectBox>
                  </div>
                  <div className="grid grid-cols-3 gap-5 place-items-start">
                    <SelectBox
                      className="w-[350px] border border-slate-100 col-start-3 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                      type="text"
                      name="publisher"
                      label="Nhà xuất bản"
                      id="publisher"
                    >
                      <option value="1">Nhà xuất bản Kim Đồng</option>
                      <option value="2">Nhà xuất bản Trẻ</option>
                      <option value="3">Skybooks</option>
                      <option value="4">NXB Hội Nhà Văn</option>
                      <option value="5">NXB Phụ Nữ</option>
                      <option value="6">NXB Văn Học</option>
                      <option value="7">NXB Thế Giới</option>
                      <option value="8">NXB Hà Nội</option>
                      <option value="9">NXB Hồng Đức</option>
                      <option value="10">NXB Công Thương</option>
                      <option value="11">NXB Tổng Hợp TPHCM</option>
                      <option value="12">NXB Dân Trí</option>
                      <option value="13">NXB Lao Động</option>
                      <option value="14">NXB Y Học</option>
                      <option value="15">NXB Thanh Niên</option>
                      <option value="16">Đông A</option>
                      <option value="17">NXB Mỹ Thuật</option>
                    </SelectBox>
                    <Input
                      className="w-[350px] border border-slate-100 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                      type="text"
                      name="translator"
                      label="Dịch giả"
                      id="translator"
                    ></Input>
                    <Input
                      className="w-[350px] border border-slate-100 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                      type="text"
                      name="publicationDate"
                      label="Năm phát hành"
                      id="publicationDate"
                    ></Input>
                  </div>
                  <div className="grid grid-cols-4 gap-5 place-items-start">
                    <Input
                      className="w-full border border-slate-100 col-start-3 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                      type="number"
                      name="quantity"
                      label="Số lượng"
                      id="quantity"
                    ></Input>
                    <Input
                      className="w-full border border-slate-100 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                      type="text"
                      name="age"
                      label="Độ tuổi"
                      id="age"
                    ></Input>
                    <Input
                      className="w-full border border-slate-100 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                      type="number"
                      name="price"
                      label="Giá"
                      id="price"
                    ></Input>
                    <Input
                      className="w-full border border-slate-100 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                      type="text"
                      name="packagingSize"
                      label="Kích cở"
                      id="packagingSize"
                    ></Input>
                  </div>
                  <div className="grid grid-cols-3 gap-5 place-items-start">
                    <div className="col-span-2">
                      <TextArea
                        className="w-[600px] h-32 border border-slate-100 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                        type="text"
                        name="description"
                        label="Tóm tắt"
                        id="description"
                      ></TextArea>
                    </div>
                    <SelectBox
                      className="w-[220px] border border-slate-100 h-16 text-xl my-2  focus:border-2 focus:border-cyan-600 outline-none p-2 rounded-xl"
                      type=""
                      name="status"
                      label="Trạng thái"
                      id="status"
                    >
                      <option value="1">Vào kho</option>
                      <option value="2">Trưng bày</option>
                    </SelectBox>
                  </div>
                  {mess && formik.isValid && (
                    <div className="text-red-500 text-lg text-left">{mess}</div>
                  )}
                </div>

                <button
                  className="w-[350px] m-3 mb-10 p-4 text-2xl font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-2xl "
                  type="submit"
                  // onClick={() => {
                  //   handleLogin(formik.values, formik.isValid);
                  // }}
                >
                  Thêm
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
