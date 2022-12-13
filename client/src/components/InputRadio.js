import { useField } from "formik";
import React from "react";

const InputRadio = ({ label, price, ...props }) => {
  const [field] = useField(props);
  return (
    <div className="grid grid-cols-9 w-[750px] p-4 h-20 text-lg ">
      <input
        className="col-start-1 grid place-items-start items-center w-10 h-10"
        {...field}
        {...props}
      />
      <label
        className="col-start-2 col-span-5 text-2xl grid place-items-start items-center"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      {price ? (
        <div className="col-start-7 col-span-3 text-2xl grid place-items-end items-center ">
          {price} đ
        </div>
      ) : null}
    </div>
  );
};

export default InputRadio;
