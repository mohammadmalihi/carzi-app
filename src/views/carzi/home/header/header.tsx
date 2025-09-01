import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import styles from "../../../../css/main.module.scss";
import ImageProfile from "../../../../assets/images/profile/avatar1.png";
import { Row, Col } from "react-bootstrap";

const Header: React.FC = (): React.ReactElement => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Row className={styles.header}>
        <Col sm={6} className="d-flex justify-content-start">
          <IoMenu className={styles.menuIcon} onClick={toggleSidebar} />
        </Col>

        <Col sm={6} className="d-flex justify-content-end">
          <img src={ImageProfile} className={styles.ImageProfile} />
        </Col>
      </Row>

      <div
        className={`${styles.sidebar} ${
          isSidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <IoMdCloseCircle className={styles.closeIcon} onClick={toggleSidebar} />

        <ul className={styles.menuList}>
          <li>داشبورد</li>
          <li>پروفایل</li>
          <li>تنظیمات</li>
          <li>خروج</li>
        </ul>
      </div>

      {isSidebarOpen && (
        <div className={styles.backdrop} onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Header;
