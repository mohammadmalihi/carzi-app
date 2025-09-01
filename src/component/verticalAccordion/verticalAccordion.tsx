import React, { useState } from "react";
import styles from "../../../css/main.module.scss";

interface SidebarProps {
  items: string[];
  activeIndex?: number;
  onChange?: (index: number) => void;
}

const VerticalAccordion: React.FC<SidebarProps> = ({
  items,
  activeIndex = 0,
  onChange,
}) => {
  const [active, setActive] = useState(activeIndex);

  const handleClick = (index: number) => {
    setActive(index);
    onChange?.(index);
  };

  return (
    <div className={styles.verticalAccordionSidebar}>
      <ul className={styles.verticalAccordionSidebarList}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li
              className={`${styles.verticalAccordionSidebarItem} ${
                index === active
                  ? styles.activeVerticalAccordionSidebarItem
                  : ""
              }`}
              onClick={() => handleClick(index)}
            >
              <span className={styles.verticalAccordionDot} />
              {item}
            </li>
            {index !== items.length - 1 && (
              <li className={styles.verticalAccordionSpacer}>
                <div className={styles.spacerIcon}>━</div>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default VerticalAccordion;
