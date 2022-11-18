import React from "react";

const Button = ({
  onClick,
  className = "",
  type = "button",
  children,
  ...props
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`py-4 px-6 w-full rounded-lg mt-auto border-transparent hover:border-current ${className}`}
    {...props}
  >
    {children}
  </button>
);
export default Button;
