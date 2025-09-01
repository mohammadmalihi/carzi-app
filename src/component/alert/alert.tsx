import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import styles from "../../../css/main.module.scss";

type AlertType = "success" | "error" | "warning";

interface AlertProps {
  type: AlertType;
  message: string;
}

const iconMap = {
  success: <AiOutlineCheckCircle className={styles.iconAlertSuccess} />,
  error: <AiOutlineCloseCircle className={styles.iconAlertError} />,
  warning: <AiOutlineWarning className={styles.iconAlertWarning} />,
};

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  return (
    <div className={styles[`alert${type}`]}>
      {iconMap[type]}
      <span className={styles.messageAlert}>{message}</span>
    </div>
  );
};

export default Alert;
