import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Header from "../header/header";
import Slider from "../../../../component/slider/slider";
import MobileMenu from "../../../../component/mobileMenu/mobileMenu";
import HorizontalSlider from "../../../../component/horizontalSlider/horizontalSlider";
import Box from "../../../../component/box/box";
import Text from "../../../../component/text/text";
import ServicesSearch from "../../../../component/servicesSearch/serviceSearch";
import { FaTools } from "react-icons/fa";
import { LuArrowUpDown } from "react-icons/lu";

import styles from "../../../../css/main.module.scss";
import Input from "../../../../component/input/input";

const Home: React.FC = (): React.ReactElement => {
  return (
    <>
      <Row>
        <Header />
      </Row>
      <div className={styles.home}>
        <Row>
          <div className={styles.textCarzi}>carzi</div>
        </Row>
        <Row>
          <div className={styles.sliderWrapper}>
            <Slider />
            <div className={styles.boxHome}>
              <ServicesSearch placeholder="جست و جوی خدمت" />
              <HorizontalSlider />
              <div className={styles.divRow}>
                <Text
                  className={`${styles.tColor7} ${styles.tSize4} ${styles.tBorderRight1}`}
                >
                  سرویس های دوره ای
                </Text>
              </div>
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
                  center: [
                    <Text className={`${styles.tColor8} ${styles.tSize2} `}>
                      ...
                    </Text>,
                  ],
                  right: [],
                }}
              />
              <div className={styles.divRow}>
                <Text
                  className={`${styles.tColor7} ${styles.tSize4} ${styles.tBorderRight1}`}
                >
                  پمپ بنزین
                </Text>
              </div>
              <Box
                className={styles.periodicServices}
                header={{
                  left: [],
                  center: [],
                  right: [],
                }}
                body={{
                  left: [],
                  center: [
                    <Text className={`${styles.tColor7} ${styles.tSize4} `}>
                      نزدیک ترین پمپ بنزین ها به شما
                    </Text>,
                  ],
                  right: [],
                }}
                footer={{
                  left: [],
                  center: [],
                  right: [],
                }}
              />
            </div>
          </div>
        </Row>
      </div>
      <Row>
        <MobileMenu />
      </Row>
    </>
  );
};

export default Home;
