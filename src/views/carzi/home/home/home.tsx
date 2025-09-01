import React from "react";
import { Outlet, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const homepage = process.env.PUBLIC_URL || "/";
  const isMainPanel = location.pathname === `${homepage}`;

  return (
    <>
      <Row>
        <Header />
      </Row>
      <div className={styles.home}>
        <Outlet />
        {isMainPanel && (
          <>
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
                    <Box
                      className={styles.periodicServices}
                      header={{
                        left: [
                          <Text
                            className={`${styles.tColor7} ${styles.tSize4} ${styles.tBorderRight1}`}
                          >
                            سرویس های دوره ای
                          </Text>,
                        ],
                        center: [],
                        right: [],
                      }}
                      body={{
                        left: [],
                        center: [
                          <FaTools className={styles.faTools} />,
                          <Text
                            className={`${styles.tColor8} ${styles.tSize5} `}
                          >
                            سویس های دوره ای ماشین شما
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
                  <div className={styles.divRow}></div>
                  <Box
                    className={styles.periodicServices}
                    header={{
                      left: [
                        <Text
                          className={`${styles.tColor7} ${styles.tSize4} ${styles.tBorderRight1}`}
                        >
                          پمپ بنزین
                        </Text>,
                      ],
                      center: [],
                      right: [],
                    }}
                    body={{
                      left: [],
                      center: [
                        <FaTools className={styles.faTools} />,

                        <Text className={`${styles.tColor8} ${styles.tSize5} `}>
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
          </>
        )}
      </div>
      <Row>
        <MobileMenu />
      </Row>
    </>
  );
};

export default Home;
