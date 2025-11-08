import React, { useState, useEffect } from "react";
import ProgressBar from "./dashboard/ProgressBar";
import "../styles/habits.css";

const HabitCard = ({ habit }) => {
  const [completed, setCompleted] = useState(habit.completed || false);
  const [streak, setStreak] = useState(habit.streak || 0);
  const [lastCompletedDate, setLastCompletedDate] = useState(
    habit.lastCompletedDate || null
  );

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (habit.reminderHour === undefined || habit.reminderMinute === undefined)
      return;

    const interval = setInterval(() => {
      const now = new Date();
      const reminderTime = new Date();

      reminderTime.setHours(habit.reminderHour, habit.reminderMinute, 0, 0);

      // If reminder already passed today, schedule for tomorrow
      if (reminderTime < now) reminderTime.setDate(reminderTime.getDate() + 1);

      const diff = reminderTime - now; // difference in ms

      const hours = Math.floor(diff / 1000 / 60 / 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [habit.reminderHour, habit.reminderMinute]);

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
      <p>
        🔥 Streak: {streak} {streak == 1 ? "day" : "days"}
      </p>

      {habit.reminderHour !== undefined &&
        habit.reminderMinute !== undefined && (
          <p>⏰ Next Reminder in: {timeLeft}</p>
        )}
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
