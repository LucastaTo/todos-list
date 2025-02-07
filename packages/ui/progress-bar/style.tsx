import styled from "@todo/shared/styled";

// Wrapper for the progress bar
export const ProgressWrapper = styled.div<{
  size: string | number | { width: number; height: number };
}>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ size }) =>
    typeof size === "object" ? `${size.height}px` : "auto"};
  width: ${({ size }) =>
    typeof size === "object"
      ? `${size.width}px`
      : typeof size === "number"
        ? `${size}px`
        : "100%"};
`;

// Common styles for progress inner elements (line, circle, or dashboard)
export const ProgressInner = styled.div<{
  percentage: number;
  strokeColor: string;
  strokeWidth: number;
  statusStyles: string;
}>`
  width: ${({ percentage }) => percentage}%;
  background-color: ${({ strokeColor }) => strokeColor};
  height: ${({ strokeWidth }) => strokeWidth}px;
  border-radius: ${({ statusStyles }) =>
    statusStyles.includes("round") ? "50%" : "0"};
  transition: width 0.3s ease-in-out;
`;

export const ProgressCircleWrapper = styled.div<{ strokeWidth: number }>`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const CircleProgress = styled.circle<{
  percentage: number;
  strokeColor: string;
  strokeWidth: number;
}>`
  fill: none;
  stroke: ${({ strokeColor }) => strokeColor};
  stroke-width: ${({ strokeWidth }) => strokeWidth};
  stroke-dasharray: ${({ percentage }) => percentage}, 100;
  stroke-dashoffset: 0;
  transition: stroke-dasharray 0.5s ease;
`;

export const InfoText = styled.div<{ percentage: number }>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ percentage }) => (percentage <= 20 ? "#fff" : "#000")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const DashboardWrapper = styled.div<{ strokeWidth: number }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SuccessWrapper = styled.div<{
  percentage: number;
  successPercent: number;
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  color: ${({ percentage, successPercent }) =>
    percentage >= successPercent ? "green" : "#999"};
`;
