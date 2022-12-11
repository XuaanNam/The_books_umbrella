import React from "react";
import ProductList from "../pages/AdminPages/ProductList";
import DropDown from "../components/DropDown";
const AdminLayout = () => {
  return (
    <div className="w-screen h-auto text-slate-200 flex">
      <div className=" bg-slate-800 w-72 overflow-y-auto">
        <DropDown></DropDown>
      </div>
      <div className="w-full">
        <div className="relative border-b drop-shadow h-[10%]">
          <div className="absolute inset-y-0 right-14 text-lg font-medium grid place-content-center text-slate-600 drop-shadow">
            User
          </div>
        </div>
        <div className="h-[90%] bg-current pt-5">
          <ProductList></ProductList>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
