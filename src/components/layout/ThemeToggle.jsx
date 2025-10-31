import React, { useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  const handleToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.className = newTheme; // Swaps theme on body
  };

  return (
    <button onClick={handleToggle}>
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
