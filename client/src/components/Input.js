import { useField } from "formik";
import React from "react";

const Input = ({ ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-3 mb-5">
      <input
        className="w-[95%] h-[90%] border border-sky-500 hover:border-2 outline-none p-2 rounded-xl"
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
