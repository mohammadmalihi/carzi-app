import React,{useEffect,useState} from 'react';
import styles from '../../../../css/main.module.scss'; 
import suportIcon from './assets/icons8-support-96.png';
const SupportIcon = () => {
  return (
    <div className={styles.supportIcon}>
      <div className={styles.tooltipsupportIcon}>
        پشتیبانی
      </div>
      <img 
        src={suportIcon}
        alt="Support" 
        className={styles.iconsupportIcon}
      />
    </div>
  );
};

export default SupportIcon;