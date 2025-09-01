import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../../css/main.module.scss";
import { IconType } from "react-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

interface ButtonProps {
  size?: "small" | "medium" | "large";
  styleType?: string;
  borderRadius?: string;
  fontWeight?: string;
  icon?: IconType;
  iconSize?: string;
  iconColor?: string;
  tooltip?: string;
  onClick?: () => void;
  label?: string;
  iconBgColor?: string;
  iconBorderRadius?: string;
  hasButtonBorder?: boolean;
  buttonBorderColor?: string;
  buttonBorderWidth?: string;
  hoverColor?: string;
  iconLabelSpacing?: string;
  marginRight?: string;
  marginTop?: string;
  changeTextColorOnHover?: boolean;
  hoverTextColor?: string;
  hasIconBackground?: boolean;
  fontFamily?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  size = "medium",
  styleType,
  borderRadius = "bRoundedSmall",
  fontWeight = "bNormal",
  icon: Icon,
  iconSize = "20px",
  iconColor = "#fff",
  tooltip,
  onClick,
  label,
  iconBgColor = "#fff",
  iconBorderRadius = "50%",
  hasButtonBorder = false,
  buttonBorderColor = "#000",
  buttonBorderWidth = "2px",
  hoverColor,
  iconLabelSpacing = "12px",
  marginRight = "0px",
  marginTop = "0px",
  changeTextColorOnHover = false,
  hoverTextColor = "#fff",
  hasIconBackground = false,
  fontFamily = "vazir",
  loading = false,
  disabled = false,
}) => {
  const buttonSize = {
    small: styles.buttonSmall,
    medium: styles.buttonMedium,
    large: styles.buttonLarge,
  };

  const styleClass = styleType ? styles[styleType] : "";
  const borderRadiusClass = styles[borderRadius];
  const fontWeightClass = styles[fontWeight];

  const renderButton = (
    <button
      className={`${styles.button} ${buttonSize[size]} ${styleClass} ${borderRadiusClass} ${fontWeightClass}`}
      style={{
        border: hasButtonBorder
          ? `${buttonBorderWidth} solid ${buttonBorderColor}`
          : "none",
        marginRight,
        marginTop,
        fontFamily,
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...(hoverColor && { "--hover-color": hoverColor }),
      }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      {loading ? (
        "در حال ورود..."
      ) : (
        <>
          {Icon && hasIconBackground ? (
            <div
              className={`${styles.iconWrapper}`}
              style={{
                backgroundColor: iconBgColor,
                borderRadius: iconBorderRadius,
              }}
            >
              <Icon style={{ fontSize: iconSize, color: iconColor }} />
            </div>
          ) : Icon ? (
            <Icon
              style={{
                fontSize: iconSize,
                color: iconColor,
                marginRight: iconLabelSpacing,
              }}
            />
          ) : null}
          {label}
        </>
      )}
    </button>
  );

  return tooltip ? (
    <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>}>
      {renderButton}
    </OverlayTrigger>
  ) : (
    renderButton
  );
};

export default Button;
