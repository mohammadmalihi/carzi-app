import React, { useState, useEffect } from "react";
import styles from "../../../css/main.module.scss";

interface ColProps {
  children: React.ReactNode;
  xs?: number | boolean;
  sm?: number | boolean;
  md?: number | boolean;
  lg?: number | boolean;
  className?: string;
  style?: React.CSSProperties;
  colGutter?: number;
  applyGutterOnMobile?: boolean;
  onClick?: () => void;
}

const Col: React.FC<ColProps> = ({
  children,
  xs,
  sm,
  md,
  lg,
  className,
  style,
  colGutter,
  applyGutterOnMobile = true,
  onClick,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let colClass = styles.col;

  if (xs) colClass += ` ${styles[`col-${xs}`]}`;
  if (sm) colClass += ` ${styles[`col-sm-${sm}`]}`;
  if (md) colClass += ` ${styles[`col-md-${md}`]}`;
  if (lg) colClass += ` ${styles[`col-lg-${lg}`]}`;

  const finalStyle =
    colGutter && (applyGutterOnMobile || !isMobile)
      ? { ...style, marginRight: `${colGutter}px` }
      : style;

  return (
    <div
      className={`${colClass} ${className || ""}`}
      style={finalStyle}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface RowProps {
  children: React.ReactNode;
  gutter?: [number, number];
  className?: string;
  rowGutter?: number;
  applyGutterOnMobile?: boolean;
  style?: React.CSSProperties;
}

const Row: React.FC<RowProps> = ({
  children,
  gutter,
  className,
  rowGutter,
  applyGutterOnMobile = true,
}) => {
  const isMobile = window.innerWidth <= 768;
  let rowClass = styles.row;

  if (gutter) {
    const [horizontal, vertical] = gutter;
    rowClass += ` g-${horizontal} gy-${vertical}`;
  }

  const rowStyle =
    rowGutter && (applyGutterOnMobile || !isMobile)
      ? { marginBottom: `${rowGutter}px` }
      : {};

  return (
    <div className={`${rowClass} ${className || ""}`} style={rowStyle}>
      {children}
    </div>
  );
};

interface ContainerProps {
  rows: number;
  cols: number;
  children: React.ReactNode;
  className?: string;
  rowGutter?: number;
  colGutter?: number;
  applyGutterOnMobile?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  rows,
  cols,
  children,
  className,
  rowGutter,
  colGutter,
  applyGutterOnMobile = true,
}) => {
  const rowsArray = Array.from({ length: rows }, (_, index) => index);

  let childrenArray = React.Children.toArray(children);
  const grid = rowsArray.map((_, rowIndex) => {
    const rowChildren = childrenArray.slice(
      rowIndex * cols,
      (rowIndex + 1) * cols
    );
    return (
      <Row
        key={rowIndex}
        className={className}
        rowGutter={rowGutter}
        applyGutterOnMobile={applyGutterOnMobile}
      >
        {rowChildren.map((child, colIndex) => (
          <Col
            key={colIndex}
            className={className}
            colGutter={colGutter}
            applyGutterOnMobile={applyGutterOnMobile}
          >
            {child}
          </Col>
        ))}
      </Row>
    );
  });

  return <div className={`${styles.container} ${className || ""}`}>{grid}</div>;
};

export { Container, Row, Col };
