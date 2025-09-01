import React from "react";
import { Row, Col } from "react-bootstrap";
import Box from "../../../component/box/box";
import Text from "../../../component/text/text";
import imageService from "../../../assets/images/servicePage/services.png";
import { FaTools } from "react-icons/fa";
import { LuArrowUpDown } from "react-icons/lu";

import styles from "../../../css/main.module.scss";

const Ai: React.FC = (): React.ReactElement => {
  return (
    <>
      <div className={styles.service}>
        <div className={styles.divImage}>
          <img src={imageService} />
        </div>
        <div className={styles.divAiText}>
          <Text className={`${styles.tColor7} ${styles.tSize4} `}>
            هر سوالی که راجب ماشینت داری بپرس
          </Text>
        </div>
        <div className={styles.divBorder}></div>
      </div>
    </>
  );
};

export default Ai;
