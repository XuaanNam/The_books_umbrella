import { useField } from "formik";
import React from "react";

const TextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex flex-col gap-2 mb-5">
      <label
        className="drop-shadow-none text-xl"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextArea;
