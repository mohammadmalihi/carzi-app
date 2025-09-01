import React, { useState } from "react";
import { IconType } from "react-icons";

interface IconTextProps {
  icon: IconType;
  text: any;
  className?: string;
  backgroundColor?: string;
  borderRadius?: string;
  size?: number;
  hoverTextColor?: string;
  hoverIconColor?: string;
  textColor?: string;
  iconColor?: string;
  type?: "iconText" | "modal";
  onClickModal?: () => void;
}

const IconText: React.FC<IconTextProps> = ({
  icon: Icon,
  text,
  className,
  backgroundColor = "lightgray",
  borderRadius = "50%",
  size = 20,
  hoverTextColor = "blue",
  hoverIconColor = "blue",
  textColor = "inherit",
  iconColor = "inherit",
  type = "iconText",
  onClickModal,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (type === "modal" && onClickModal) {
      onClickModal();
    }
  };

  return (
    <div
      className={`d-flex align-items-center ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ cursor: "pointer", direction: "rtl" }}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          padding: "8px",
          width: `${size + 12}px`,
          height: `${size + 12}px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "10px",
        }}
      >
        <Icon
          size={size}
          style={{
            color: isHovered ? hoverIconColor : iconColor,
          }}
        />
      </div>
      <span
        style={{
          color: isHovered ? hoverTextColor : textColor,
          textAlign: "right",
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default IconText;
