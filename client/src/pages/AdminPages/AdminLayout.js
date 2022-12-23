import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import DropDown from "../../components/DropDown";
import HeaderUser from "../../layouts/HeaderUser";
import AddProduct from "./AddProduct";
import CustomerList from "./CustomerList";
import Order from "./Order";
import Warehouse from "./Warehouse";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authentication } from "../../redux-toolkit/authSlice";

const AdminLayout = () => {
  const { adminpage } = useParams();
  const user = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authentication())
    if(user.auth.authentication!==1){
      Navigate('/');
    }
    
  }, [dispatch]);

  
  return (
    <div>
      <HeaderUser className="row-span-1"></HeaderUser>
      <div className="grid pt-24 grid-cols-12">
        <DropDown className="col-span-2 h-[810px] overflow-auto bg-teal-600 top-0 bottom-0 left-0 text-slate-200 text-lg "></DropDown>
        <div className="col-span-10 row-span-7 pt-6 overflow-auto h-[810px] w-full text-gray-600 text-lg rounded-xl">
          {adminpage === "customerlist" && <CustomerList></CustomerList>}
          {adminpage === "warehouse" && <Warehouse></Warehouse>}
          {adminpage === "order" && <Order></Order>}
          {adminpage === "addproduct" && <AddProduct></AddProduct>}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
