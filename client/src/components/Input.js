import { useField } from "formik";
import React from "react";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-3 mb-5">
      <label className="font-normal" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className="w-full text-sm leading-normal bg-slate-100 rounded-lg p-4"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
