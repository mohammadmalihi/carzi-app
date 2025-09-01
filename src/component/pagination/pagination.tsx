import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styles from "../../../css/main.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`${styles.paginationButton} ${
            currentPage === i ? styles.activePage : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.paginationInner}>
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={styles.paginationButton}
        >
          <MdKeyboardArrowRight size={20} />
        </button>
        {renderPageButtons()}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={styles.paginationButton}
        >
          <MdKeyboardArrowLeft size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
