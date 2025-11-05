import { useState, useEffect } from "react";

const quotes = [
  "Small habits, big results.",
  "Success is built on consistency.",
  "Every day is a fresh start!",
];

const QuoteBox = () => {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
    }, 5000); // change every 10 seconds

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="quote-box">
      <blockquote>{quote}</blockquote>
    </div>
  );
};

export default QuoteBox;
