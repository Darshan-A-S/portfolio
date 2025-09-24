import React from "react";
import "./badge.css";

const Badge = ({ text }) => {
  return (
    <span
      className="badge"    >
      {text}
    </span>
  );
};

export default Badge;
