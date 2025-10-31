import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => (
  <aside className="sidebar">
    <h2>Habit Tracker</h2>
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/habits">Habits</Link></li>
        <li><Link to="/analytics">Analytics</Link></li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
