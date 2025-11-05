import React, { useState } from "react";
import ProgressBar from "./dashboard/ProgressBar"; // Adjust path if needed

const HabitCard = ({ habit }) => {
  const [completed, setCompleted] = useState(habit.completed || false);
  const [streak, setStreak] = useState(habit.streak || 0);
  const [lastCompletedDate, setLastCompletedDate] = useState(
    habit.lastCompletedDate || null
  );

  const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

  const toggleCompletion = () => {
    // If already completed today, don't increment again
    if (lastCompletedDate === today) {
      alert("You've already marked this habit as completed today!");
      return;
    }

    // Check if last completion was yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    let newStreak = streak;
    if (lastCompletedDate === yesterdayStr) {
      // Continue streak
      newStreak += 1;
    } else {
      // Missed a day — reset streak to 1
      newStreak = 1;
    }

    setCompleted(true);
    setStreak(newStreak);
    setLastCompletedDate(today);

    // Update localStorage
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    const updatedHabits = storedHabits.map((h) =>
      h.id === habit.id
        ? {
            ...h,
            completed: true,
            streak: newStreak,
            lastCompletedDate: today,
          }
        : h
    );
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  };

  return (
    <div className={`habit-card ${completed ? "completed" : ""}`}>
      <h3>{habit.name}</h3>
      <p>Category: {habit.category}</p>
      <ProgressBar streak={streak} />
      <p>🔥 Streak: {streak} { streak == 1? "day" : "days"}</p>

      <button
        onClick={toggleCompletion}
        className={completed ? "done-btn" : "mark-btn"}
      >
        {lastCompletedDate === today ? "Completed ✔️" : "Mark as Done"}
      </button>
    </div>
  );
};

export default HabitCard;
