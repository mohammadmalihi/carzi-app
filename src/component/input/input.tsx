import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "../../css/main.module.scss";

interface InputProps {
  value?: string | number | undefined;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  className?: string;
  type?: string;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  borderRadius?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  className,
  type = "text",
  multiline = false,
  rows = 4,
  borderRadius = "10px",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const styleProps = { borderRadius };

  return (
    <div className={styles.inputContainer} style={{ flex: 1 }}>
      {placeholder && (
        <label className={styles.inputLabel}>{placeholder}</label>
      )}

      {multiline ? (
        <textarea
          className={`${styles.input} ${styles.roundedInput} ${className}`}
          placeholder=""
          value={value}
          onChange={onChange}
          rows={rows}
          style={styleProps}
        />
      ) : (
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          className={`${styles.input} ${styles.roundedInput} ${className}`}
          placeholder=""
          value={value}
          onChange={onChange}
          style={styleProps}
        />
      )}
    </div>
  );
};

export default Input;
