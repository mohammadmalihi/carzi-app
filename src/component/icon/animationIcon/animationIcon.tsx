import React from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import styles from "../../../../css/main.module.scss"; 

const FolderIconWithPaper = () => {
  return (
    <div className={styles.folderContainer}>
      <AiFillFolderOpen className={styles.folderIcon} />
    </div>
  );
};

export default FolderIconWithPaper;
