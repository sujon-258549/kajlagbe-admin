import { Switch as AntSwitch, type SwitchProps } from "antd";
import React from "react";

const CustomSwitch: React.FC<SwitchProps> = ({ style, ...props }) => {
  return (
    <AntSwitch
      style={{
        backgroundColor: props.checked ? "#052e16" : "#d1d5db",
        ...style,
      }}
      {...props}
    />
  );
};

export default CustomSwitch;
