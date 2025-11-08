import React from "react";
import useHabit from "../hooks/useHabit";
import "../styles/analytics.css";

const AnalyticsPage = () => {
  const { habits } = useHabit();

  // Stats
  const total = habits.length;
  const completed = habits.filter(h => h.completed).length;
  const active = total - completed;
  const bestStreak = Math.max(0, ...habits.map(h => h.streak || 0));

  return (
    <section className="dashboard-panel">
      <h2>Analytics</h2>
      <div className="analytics-stats">
        <div>Total Habits: <strong>{total}</strong></div>
        <div>Active: <strong>{active}</strong></div>
        <div>Completed: <strong>{completed}</strong></div>
        <div>Best Streak: <strong>{bestStreak}</strong> days</div>
      </div>
    </section>
  );
};

export default AnalyticsPage;
