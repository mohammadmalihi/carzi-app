import React from "react";
import styles from "../../css/main.module.scss";

type BoxContent = {
  left: React.ReactNode[];
  center: React.ReactNode[];
  right: React.ReactNode[];
};

interface BoxProps {
  header: BoxContent;
  body: BoxContent;
  footer: BoxContent;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ header, body, footer, className }) => {
  const renderItems = (items: React.ReactNode[]) => (
    <>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          {item}
        </div>
      ))}
    </>
  );

  return (
    <div className={`${styles.serviceBox} ${className || ""}`}>
      {/* Header Section */}
      <div className={styles.boxHeader}>
        <div className={styles.left}>{renderItems(header.left)}</div>
        <div className={styles.center}>{renderItems(header.center)}</div>
        <div className={styles.right}>{renderItems(header.right)}</div>
      </div>

      {/* Body Section */}
      <div className={styles.boxBody}>
        <div className={styles.left}>{renderItems(body.left)}</div>
        <div className={styles.center}>{renderItems(body.center)}</div>
        <div className={styles.right}>{renderItems(body.right)}</div>
      </div>

      {/* Footer Section */}
      <div className={styles.boxFooter}>
        <div className={styles.left}>{renderItems(footer.left)}</div>
        <div className={styles.center}>{renderItems(footer.center)}</div>
        <div className={styles.right}>{renderItems(footer.right)}</div>
      </div>
    </div>
  );
};

export default Box;
