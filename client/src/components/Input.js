import { useField } from "formik";
import React from "react";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-2 mb-5">
      <label
        className="drop-shadow-none text-xl"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className="w-full h-16 text-lg my-2 border border-slate-400 hover:border-2 outline-none p-2 rounded-xl"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-lg">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
