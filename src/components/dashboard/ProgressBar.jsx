import React from "react";

const ProgressBar = ({ streak }) => (
  <div className="progress-bar">
    <div className="progress" style={{ width: `${streak * 10}%` }}></div>
  </div>
);

export default ProgressBar;
