import React from "react";
import styles from "../../../css/main.module.scss";

interface VersionProps {
  isCollapsed: boolean;
  versionText: string;
}

export const Version: React.FC<VersionProps> = ({
  isCollapsed,
  versionText,
}) => {
  return (
    <div className={`${styles.version} ${isCollapsed ? styles.collapsed : ""}`}>
      {versionText}
    </div>
  );
};
