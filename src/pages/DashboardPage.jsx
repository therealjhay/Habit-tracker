import React, { useState } from "react";
import HabitCard from "../components/dashboard/HabitCard";
import QuoteBox from "../components/dashboard/QuoteBox";

const dummyHabits = [
  { name: "Drink Water", category: "Health", streak: 5, completed: true },
  { name: "Read 30 min", category: "Learning", streak: 2, completed: false },
  { name: "Morning Walk", category: "Health", streak: 7, completed: true },
  { name: "Deep Work", category: "Productivity", streak: 3, completed: false }
];

const categories = ["All", "Health", "Learning", "Productivity"];

const DashboardPage = () => {
  const [filter, setFilter] = useState("All");

  const filteredHabits = filter === "All" 
    ? dummyHabits 
    : dummyHabits.filter(habit => habit.category === filter);

  return (
    <section>
      <h2>Today's Habits</h2>
      <div className="habit-filter">
        <label htmlFor="category">Filter:</label>
        <select
          id="category"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="habit-cards">
        {filteredHabits.length > 0 ? (
          filteredHabits.map((habit, idx) => (
            <HabitCard key={idx} habit={habit} />
          ))
        ) : (
          <p>No habits in this category.</p>
        )}
      </div>
      <QuoteBox />
    </section>
  );
};

export default DashboardPage;
