import React from "react";
import styles from "../../../css/main.module.scss";

type BoxContent = {
  left?: React.ReactNode[];
  center?: React.ReactNode[];
  right?: React.ReactNode[];
};

interface ModalProps {
  header: BoxContent;
  body: BoxContent;
  footer: BoxContent;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  header,
  body,
  footer,
  isOpen,
  onClose,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
}) => {
  if (!isOpen) return null;

  const renderItems = (items?: React.ReactNode[]) => (
    <>
      {items?.map((item, index) => (
        <div
          key={index}
          className="mx-1 d-flex align-items-center justify-content-center"
        >
          {item}
        </div>
      ))}
    </>
  );

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div
        className={`${styles.modalContent} ${className || ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`card-header d-flex justify-content-between align-items-center ${
            styles.modalHeader
          } ${headerClassName || ""}`}
        >
          <div className="d-flex align-items-center">
            {renderItems(header.right)}
          </div>
          <div className="d-flex align-items-center justify-content-center flex-grow-1">
            {renderItems(header.center)}
          </div>

          <div className="d-flex align-items-center">
            {renderItems(header.left)}
          </div>
        </div>

        {/* Body */}
        <div
          className={`card-body d-flex align-items-start ${styles.modalBody} ${
            bodyClassName || ""
          }`}
          style={{
            flexDirection: "column",
            maxHeight: "70vh",
            overflowY: "auto",
            width: "100%",
          }}
        >
          {/* Left */}
          {body.left && body.left.length > 0 && (
            <div className="d-flex align-items-start">
              {renderItems(body.left)}
            </div>
          )}

          {/* Center */}
          {body.center && body.center.length > 0 && (
            <div
              className="d-flex align-items-start justify-content-center flex-grow-1"
              style={{
                width:
                  !body.left?.length && !body.right?.length
                    ? "100%"
                    : undefined,
              }}
            >
              {body.center.map((item, index) => (
                <div key={index} style={{ width: "100%" }}>
                  {item}
                </div>
              ))}
            </div>
          )}

          {/* Right */}
          {body.right && body.right.length > 0 && (
            <div className="d-flex align-items-start">
              {renderItems(body.right)}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`card-footer d-flex justify-content-between align-items-center ${
            styles.modalFooter
          } ${footerClassName || ""}`}
        >
          <div className="d-flex align-items-center">
            {renderItems(footer.right)}
          </div>
          <div className="d-flex align-items-center justify-content-center flex-grow-1">
            {renderItems(footer.center)}
          </div>

          <div className="d-flex align-items-center">
            {renderItems(footer.left)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
