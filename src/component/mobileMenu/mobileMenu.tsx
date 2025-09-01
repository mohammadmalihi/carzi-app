import React from "react";
import { Row } from "react-bootstrap";
import styles from "../../css/main.module.scss";
import { FaHome, FaSearch, FaPlusCircle, FaBell, FaUser } from "react-icons/fa";

const MobileMenu: React.FC = () => {
  return (
    <nav className={styles.mobileMenu}>
      <ul>
        <li>
          <FaHome />
          <span>خانه</span>
        </li>
        <li>
          <FaSearch />
          <span>جستجو</span>
        </li>
        <li className={styles.centerButton}>
          <FaPlusCircle />
        </li>
        <li>
          <FaBell />
          <span>اعلان‌ها</span>
        </li>
        <li>
          <FaUser />
          <span>پروفایل</span>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
