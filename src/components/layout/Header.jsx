import React from "react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="header">
      <h1>Dashboard</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
