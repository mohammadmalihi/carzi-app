import React from "react";
import { FaInfo } from "react-icons/fa"; 
import styles from '../../../../css/main.module.scss';

interface InfoIconProps {
  tooltipText: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ tooltipText }) => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoIcon}>
        <FaInfo />
      </div>
      <div className={styles.tooltipInfoButton}>
        <FaInfo /> 
        {tooltipText}
      </div>
    </div>
  );
};

export default InfoIcon;
