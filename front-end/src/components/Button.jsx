import React from "react";

const Button = ({ children = "Button", onClick, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-black text-white
        font-black text-sm uppercase
        px-12 py-3
        rounded-full
        border-2 border-transparent
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:bg-white hover:text-black hover:border-black
        transform hover:scale-105
        active:scale-95
        focus:outline-none focus:ring-4 focus:ring-gray-300
        disabled:cursor-default disabled:opacity-50 disabled:hover:scale-100
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10 block transition-transform duration-300 hover:animate-pulse">
        {children}
      </span>
    </button>
  );
};

export default Button;
