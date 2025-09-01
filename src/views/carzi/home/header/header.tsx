import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import ImageProfile from "../../../../assets/images/profile/avatar1.png";
import logo from "../../../../../assets/images/Screenshot 2024-08-17 100408.png";
import {
  fetchProcessesTempIdentify,
  fetchPagesUrls,
} from "../../../../API/apiServices";
import { FaClipboardList, FaUser, FaAngleLeft } from "react-icons/fa";
import { IoCall, IoMenu } from "react-icons/io5";
import { IoMdCloseCircle } from "react-icons/io";
import { LuLogIn, LuPanelsRightBottom } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";

import styles from "../../../../css/main.module.scss";

const Header: React.FC = (): React.ReactElement => {
  return (
    <>
      <div className={styles.header}>
        <img src={ImageProfile} className={styles.ImageProfile} />
      </div>
    </>
  );
};

export default Header;
