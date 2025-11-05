import React from "react";
import HabitCard from "../HabitCard";

const HabitList = ({ habits }) => {
  if (!habits || habits.length === 0) {
    return (
      <div className="no-habits text-center py-10 text-gray-500">
        <p>No habits yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="habit-grid">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} />
      ))}
    </div>
  );
};

export default HabitList;
