import React from "react";

const ProgressBar = ({ streak }) => (
  <div className="progress-bar">
    <div className="progress" style={{ width: `${streak * 10}%` }}></div>
    <span>
      Streak: {streak} {streak == 1 ? "day" : "days"}
    </span>
  </div>
);

export default ProgressBar;
