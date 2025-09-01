import React from "react";
import { Container } from "react-bootstrap";

interface BannerProps {
  src: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string | number;
}

const Banner: React.FC<BannerProps> = ({
  src,
  height = "300px",
  width = "100%",
  borderRadius = "0",
}) => {
  return (
    <Container
      fluid
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height,
        width,
        borderRadius,
      }}
    />
  );
};

export default Banner;
