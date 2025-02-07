import React from "react";
import { css } from "@todo/shared/styled";
import {
  ProgressWrapper,
  ProgressInner,
  InfoText,
  ProgressCircleWrapper,
  CircleProgress,
  DashboardWrapper,
  SuccessWrapper,
} from "./style";

// Type Definitions for the component props
interface ProgressBarProps {
  percent: number;
  showInfo?: boolean;
  status?: "success" | "exception" | "normal" | "active";
  strokeColor?: string;
  success?: { percent: number; strokeColor: string };
  strokeWidth?: number;
  trailColor?: string;
  format?: (percent: number, successPercent: number) => string;
  type?: "line" | "circle" | "dashboard";
  size?: number | string | { width: number; height: number };
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  percent,
  showInfo = true,
  status = "normal",
  strokeColor = "#4caf50",
  success,
  strokeWidth = 8,
  trailColor = "#f0f0f0",
  format = (percent) => `${percent}%`,
  type = "line",
  size = "default",
}) => {
  const successPercent = success?.percent || 0;
  const successStrokeColor = success?.strokeColor || "#4caf50";
  const statusStyles = () => {
    switch (status) {
      case "success":
        return css`
          background-color: ${successStrokeColor};
        `;
      case "exception":
        return css`
          background-color: #f44336;
        `;
      case "active":
        return css`
          background-color: #2196f3;
        `;
      default:
        return css`
          background-color: ${strokeColor};
        `;
    }
  };

  // Render line type progress bar
  const renderLineProgress = () => (
    <ProgressInner
      percentage={percent}
      strokeWidth={strokeWidth}
      strokeColor={strokeColor}
      statusStyles={statusStyles()}
    />
  );

  // Render circle type progress bar
  const renderCircleProgress = () => (
    <ProgressCircleWrapper strokeWidth={strokeWidth}>
      <svg width="100%" height="100%" viewBox="0 0 36 36">
        <CircleProgress
          percentage={percent}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          cx="18"
          cy="18"
          r="15.915"
        />
      </svg>
    </ProgressCircleWrapper>
  );

  // Render dashboard type progress bar
  const renderDashboardProgress = () => (
    <DashboardWrapper strokeWidth={strokeWidth}>
      <svg width="100%" height="100%" viewBox="0 0 36 36">
        <CircleProgress
          percentage={percent}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          cx="18"
          cy="18"
          r="15.915"
        />
      </svg>
    </DashboardWrapper>
  );

  const progressContent = () => {
    if (type === "line") return renderLineProgress();
    if (type === "circle") return renderCircleProgress();
    if (type === "dashboard") return renderDashboardProgress();
    return null;
  };

  return (
    <ProgressWrapper size={size}>
      {progressContent()}
      {showInfo && (
        <InfoText percentage={percent}>
          {format(percent, successPercent)}
        </InfoText>
      )}
      {success && percent >= successPercent && (
        <SuccessWrapper percentage={percent} successPercent={successPercent}>
          Success
        </SuccessWrapper>
      )}
    </ProgressWrapper>
  );
};

export default ProgressBar;
