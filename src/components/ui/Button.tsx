import React from "react";
import clsx from "clsx";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
};

const Button = ({ onClick, children, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx("p-2 bg-gray-200 dark:bg-gray-700 rounded-md", className)}
    >
      {children}
    </button>
  );
};

export default Button;
