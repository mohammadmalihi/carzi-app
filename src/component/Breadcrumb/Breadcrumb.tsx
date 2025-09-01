import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../css/main.module.scss";

type BreadcrumbItem = {
  label: string;
  to?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className={styles.breadcrumb}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;

        return (
          <span key={index} className={styles.breadcrumbItem}>
            {isFirst && <span className={styles.verticalLine}></span>}
            {!isLast && item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}
            {!isLast && <span className={styles.separator}>/</span>}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
