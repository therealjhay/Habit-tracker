import React from "react";

const quotes = [
  "Small habits, big results.",
  "Success is built on consistency.",
  "Every day is a fresh start!"
];

const QuoteBox = () => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <div className="quote-box">
      <blockquote>{quote}</blockquote>
    </div>
  );
};

export default QuoteBox;
