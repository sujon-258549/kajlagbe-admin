import { Button as AntButton, type ButtonProps as AntButtonProps } from "antd";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

interface CustomButtonProps extends Omit<AntButtonProps, "size" | "variant"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const Button: React.FC<CustomButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  // Base classes for our custom button
  const baseClasses =
    "transition-all font-medium flex items-center justify-center border-solid";

  // Size logic
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs rounded-sm h-8",
    md: "px-4 py-2 text-sm rounded-sm h-10",
    lg: "px-6 py-3 text-base rounded-sm h-12",
    icon: "w-11 h-11 rounded-sm", // specialized sizes for icon buttons
  };

  // Variant logic
  const variantClasses = {
    primary: "bg-primary text-white border-primary hover:bg-primary/90",
    secondary: "bg-secondary text-white border-secondary hover:bg-secondary/90",
    outline:
      "bg-transparent text-gray-700 border-gray-200 hover:bg-gray-50 hover:text-gray-900",
    ghost:
      "bg-transparent text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-700",
    danger: "bg-rose-500 text-white border-rose-500 hover:bg-rose-600",
  };

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  return (
    <AntButton className={combinedClasses} {...props}>
      {children}
    </AntButton>
  );
};

export default Button;
