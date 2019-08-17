import React from "react";

import { CircularProgressContainer } from "./circular-progress.styles";

const CircularProgress = ({ radius, progress, color, backgroundColor }) => {
  const stroke = (radius * 10) / 100;
  const fontSize = (radius * 2) / 3;
  const textY = radius + fontSize / 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <CircularProgressContainer>
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke={color}
          fill={backgroundColor}
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text x={radius} y={textY} textAnchor={"middle"} fontSize={fontSize}>
          {progress}%
        </text>
      </svg>
    </CircularProgressContainer>
  );
};

export default CircularProgress;
