import React from "react";
import styles from "../../css/main.module.scss";
import { FaOilCan, FaCarBattery, FaTools, FaDotCircle } from "react-icons/fa";

const items = [
  { title: "تعویض روغن", icon: <FaOilCan /> },
  { title: "باطری سازی", icon: <FaCarBattery /> },
  { title: "مکانیکی", icon: <FaTools /> },
  { title: "آپاراتی", icon: <FaDotCircle /> },
];

const HorizontalSlider: React.FC = () => {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.horizontalSlider}>
        {items.map((item, index) => (
          <div key={index} className={styles.boxHorizontalSlider}>
            <span>{item.title}</span>
            <span className={styles.icon}>{item.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalSlider;
