import React from "react";
import { Row } from "react-bootstrap";
import styles from "../../css/main.module.scss";
import { FaHome, FaTools, FaPlusCircle, FaBell, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileMenu: React.FC = () => {
  return (
    <nav className={styles.mobileMenu}>
      <ul>
        <li>
          <Link to={"/rp"}>
            <FaHome />
          </Link>
        </li>
        <li>
          <Link to={"/rp/service"}>
            <FaTools />
          </Link>
        </li>
        <li className={styles.centerButton}>
          <Link to={"/rp/ai"}>
            <FaPlusCircle />
          </Link>
        </li>
        <li>
          <Link to={"/rp/signup"}>
            <FaBell />
          </Link>
        </li>
        <li>
          <Link to={"/rp/profile"}>
            <FaUser />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenu;
