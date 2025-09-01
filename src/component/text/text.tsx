import React from "react";
import styles from "../../css/main.module.scss";

interface TextProps {
  children: React.ReactNode;
  className?: string;
  onMouseEnter?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLParagraphElement>) => void;
  cursorPointer?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Text: React.FC<TextProps> = ({
  children,
  className = "",
  onMouseEnter,
  onMouseLeave,
  cursorPointer = false,
  onClick,
  disabled,
}) => {
  return (
    <div
      className={`${styles.text} ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  );
};

export default Text;
