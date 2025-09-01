import React from "react";
import { Row, Col } from "react-bootstrap";
import Box from "../../../component/box/box";
import Text from "../../../component/text/text";
import imageService from "../../../assets/images/servicePage/services.png";
import { FaTools } from "react-icons/fa";
import { LuArrowUpDown } from "react-icons/lu";

import styles from "../../../css/main.module.scss";

const Service: React.FC = (): React.ReactElement => {
  return (
    <>
      <div className={styles.service}>
        <div className={styles.divImage}>
          <img src={imageService} />
        </div>
        <div className={styles.divRow}>
          <Text
            className={`${styles.tColor7} ${styles.tSize4} ${styles.tBorderRight1}`}
          >
            سرویس های دوره ای
          </Text>
        </div>
        <div className={styles.divRow}>
          <Box
            className={styles.periodicServices}
            header={{
              left: [
                <Text
                  className={`${styles.tColor7} ${styles.tSize4} ${styles.tBorderRight1}`}
                >
                  تعویض روغن
                </Text>,
              ],
              center: [],
              right: [],
            }}
            body={{
              left: [
                <FaTools className={styles.faTools} />,
                <Text className={`${styles.tColor8} ${styles.tSize5} `}>
                  هر شیشصد هزار تا
                </Text>,
              ],
              center: [],
              right: [
                <div className={styles.divCol}>
                  <Text className={`${styles.tColor8} ${styles.tSize5} `}>
                    224.000.253
                  </Text>
                  <LuArrowUpDown className={styles.luArrowUpDown} />
                  <Text className={`${styles.tColor8} ${styles.tSize5} `}>
                    224.000.253
                  </Text>
                </div>,
              ],
            }}
            footer={{
              left: [],
              center: [],
              right: [],
            }}
          />
        </div>
        <div className={styles.divRow}>
          <Box
            className={styles.periodicServices}
            header={{
              left: [
                <Text
                  className={`${styles.tColor7} ${styles.tSize4} ${styles.tBorderRight1}`}
                >
                  تعویض روغن
                </Text>,
              ],
              center: [],
              right: [],
            }}
            body={{
              left: [
                <FaTools className={styles.faTools} />,
                <Text className={`${styles.tColor8} ${styles.tSize5} `}>
                  هر شیشصد هزار تا
                </Text>,
              ],
              center: [],
              right: [
                <div className={styles.divCol}>
                  <Text className={`${styles.tColor8} ${styles.tSize5} `}>
                    224.000.253
                  </Text>
                  <LuArrowUpDown className={styles.luArrowUpDown} />
                  <Text className={`${styles.tColor8} ${styles.tSize5} `}>
                    224.000.253
                  </Text>
                </div>,
              ],
            }}
            footer={{
              left: [],
              center: [],
              right: [],
            }}
          />
        </div>
        <div className={styles.divRow}>
          <Box
            className={styles.periodicServices}
            header={{
              left: [
                <Text
                  className={`${styles.tColor7} ${styles.tSize4} ${styles.tBorderRight1}`}
                >
                  تعویض روغن
                </Text>,
              ],
              center: [],
              right: [],
            }}
            body={{
              left: [
                <FaTools className={styles.faTools} />,
                <Text className={`${styles.tColor8} ${styles.tSize5} `}>
                  هر شیشصد هزار تا
                </Text>,
              ],
              center: [],
              right: [
                <div className={styles.divCol}>
                  <Text className={`${styles.tColor8} ${styles.tSize5} `}>
                    224.000.253
                  </Text>
                  <LuArrowUpDown className={styles.luArrowUpDown} />
                  <Text className={`${styles.tColor8} ${styles.tSize5} `}>
                    224.000.253
                  </Text>
                </div>,
              ],
            }}
            footer={{
              left: [],
              center: [],
              right: [],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Service;
