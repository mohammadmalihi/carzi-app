import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "../../../css/main.module.scss"; 

function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Spinner animation="grow" className={styles.spinner} />
      <Spinner animation="grow" className={styles.spinner} />
      <Spinner animation="grow" className={styles.spinner} />
    </div>
  );
}

export default Loading;
