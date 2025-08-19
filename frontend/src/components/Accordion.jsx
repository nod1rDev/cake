// src/components/Accordion.jsx
import React, { useState } from "react";
import "./Accordion.scss";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <button 
        className="accordion-header" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className={`arrow ${isOpen ? "open" : ""}`}>⌄</span>
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Accordion;
