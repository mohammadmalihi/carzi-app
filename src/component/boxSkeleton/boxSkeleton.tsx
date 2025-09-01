import React from "react";
import { Col } from "../gridLayout/gridLayout";
import Service from "../box/box";
import styles from "../../../css/main.module.scss";

const BoxSkeleton = () => {
  return (
    <Col lg={4} md={6} xs={12}>
      <Service
        className={`${styles.mozayedeBox} ${styles.skeletonBox}`}
        header={{
          left: [<div className={styles.skeletonText} />],
          center: [],
          right: [],
        }}
        body={{
          left: [
            <div>
              <div className={styles.skeletonText} />
              <div className={styles.skeletonText} />
            </div>,
          ],
          center: [],
          right: [<div className={styles.skeletonImage} />],
        }}
        footer={{
          left: [<div className={styles.skeletonText} />],
          center: [],
          right: [],
        }}
      />
    </Col>
  );
};

export default BoxSkeleton;
