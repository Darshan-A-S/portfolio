import React, { useState, useRef, useEffect } from "react";
import "./project.css";

const Project = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  const updateHeight = () => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(scrollHeight);
    }
  };

  // Update height when content changes or window resizes
  useEffect(() => {
    updateHeight();
    const handleResize = () => {
      if (isExpanded) {
        updateHeight();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [children, isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="project-container">
      <div className="project-header" onClick={toggleExpand}>
        <span className="project-title">{title}</span>
        <span className={`expand-icon ${isExpanded ? "rotate" : ""}`}>
          ▼
        </span>
      </div>

      <div
        className="project-content"
        style={{ 
          maxHeight: isExpanded ? `${height + 20}px` : "0px",
          opacity: isExpanded ? 1 : 0,
          transition: 'max-height 0.3s ease-in-out, opacity 0.2s ease-in-out'
        }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
};

export default Project;
