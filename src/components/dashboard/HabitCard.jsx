import React from "react";
import ProgressBar from "./ProgressBar"; // Adjust path if needed

const HabitCard = ({ habit }) => (
  <div className={`habit-card ${habit.completed ? "completed" : ""}`}>
    <h3>{habit.name}</h3>
    <p>Category: {habit.category}</p>
    <ProgressBar streak={habit.streak} />
    <button>{habit.completed ? "Completed ✔️" : "Mark as Done"}</button>
  </div>
);

export default HabitCard;
