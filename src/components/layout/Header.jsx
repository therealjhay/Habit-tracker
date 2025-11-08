import React from "react";
import { useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const location = useLocation();

  const pageMap = {
    "/": "Home",
    "/habits": "Habits",
    "/analytics": "Analytics",
    "/add-habit": "Add New Habit",
  };

  const pageName = pageMap[location.pathname] || "Edit Habit"; 

  return (
    <header className="header flex justify-between items-center p-4">
      <h1 className="text-xl font-bold">{pageName}</h1>
      <ThemeToggle />
    </header>
  );
};

export default Header;
