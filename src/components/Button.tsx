
import React from "react";

interface ButtonProps {
  title: string;
  color?: string;
  textColor?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ title, color = "bg-[#49543A]", textColor = "text-white", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${textColor} ${color}`}
    >
      {title}
    </button>
  );
};

export default Button;
