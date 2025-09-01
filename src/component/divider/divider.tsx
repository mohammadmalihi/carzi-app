import React from "react";

type DividerProps = {
  color?: string;
  thickness?: string;
  margin?: string;
};

const Divider: React.FC<DividerProps> = ({
  color = "#ccc",
  thickness = "1px",
  margin = "1rem 0",
}) => {
  return (
    <div
      style={{
        display: "block",
        width: "20vw",
        maxWidth: "100%",
        height: thickness,
        backgroundColor: color,
        margin,
        alignSelf: "stretch",
      }}
    />
  );
};

export default Divider;
