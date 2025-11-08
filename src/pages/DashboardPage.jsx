import React, { useState } from "react";
import useHabit from "../hooks/useHabit";
import HabitList from "../components/dashboard/HabitList";

const DashboardPage = () => {
  const { habits } = useHabit();
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(habits.map((h) => h.category))];
  const filtered =
    filter === "All" ? habits : habits.filter((h) => h.category === filter);

  return (
    <section className="dashboard-panel">
      <h2>My Habits</h2>

      <div className="category-filter">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={filter === c ? "active" : ""}
          >
            {c}
          </button>
        ))}
      </div>

      <HabitList habits={filtered} />
    </section>
  );
};

export default DashboardPage;
