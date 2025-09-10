import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      {...props} 
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E452E] placeholder-[#2E452E] ${className || ""}`}
    />
  );
};

export default Input;
