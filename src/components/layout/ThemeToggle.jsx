import React, { useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light"); // default theme matches your screenshot

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme; // Switch class on <body>
  };

  return (
    <button 
      onClick={handleToggle} 
      className="theme-toggle-btn"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
