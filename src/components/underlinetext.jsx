import React from "react";
import "./underlinedText.css";

const UnderlinedText = ({ text, offset = "4px" }) => {
  return (
    <span className="underlined-text" style={{ textUnderlineOffset: offset }}>
      {text}
    </span>
  );
};

export default UnderlinedText;
