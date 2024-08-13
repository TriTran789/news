import React from "react";

const Button = ({ value, submit, className }) => {
  return (
    <button
      type={`${submit ? "submit" : "button"}`}
      className={`flex justify-center items-center font-bold bg-tertiary text-white px-4 py-3 rounded-lg hover:bg-transparent hover:text-tertiary hover:ring-2 hover:ring-tertiary ${className}`}
    >
      {value}
    </button>
  );
};

export default Button;
