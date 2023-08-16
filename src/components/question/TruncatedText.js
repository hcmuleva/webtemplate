import React from 'react';
import './texttruncked.css'; // Import your CSS file

const TruncatedText = ({ text }) => {
  return <div className="truncated-text">{text}</div>;
};

export default TruncatedText;
