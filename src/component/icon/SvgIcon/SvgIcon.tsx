import React from "react";

interface SvgPath {
  d: string;
  active: boolean;
  id: string;
  fill?: string;
}

interface SvgResolverProps {
  paths: SvgPath[];
  width?: string;
  height?: string;
}

const SvgResolver: React.FC<SvgResolverProps> = ({
  paths,
  width = "70",
  height = "70",
}) => {
  return (
    <svg
      viewBox="0 0 1000 1000"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((path) => (
        <path
          key={path.id}
          d={path.d}
          fill={path.active ? path.fill || "#b29a6a" : "#929daf"}
          style={{
            filter: path.active ? "drop-shadow(0 0px 10px #ffd47e)" : "none",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </svg>
  );
};

export default SvgResolver;
