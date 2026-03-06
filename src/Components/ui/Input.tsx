import { Input as AntInput, type InputProps } from "antd";
import React from "react";

const CustomInput: React.FC<InputProps> = ({ className = "", ...props }) => {
  return <AntInput className={`rounded-lg ${className}`} {...props} />;
};

export default CustomInput;
