import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import useHabit from "../hooks/useHabit";
import HabitsList from "../components/habit/HabitsList";
import { FiPlus } from "react-icons/fi";

const HabitsPage = () => {
  const { habits, deleteHabit } = useHabit();
  const [filter, setFilter] = useState("");

  const filteredHabits = useMemo(() => {
    if (!filter) return habits;
    return habits.filter(
      (habit) =>
        habit.name.toLowerCase().includes(filter.toLowerCase()) ||
        habit.category.toLowerCase().includes(filter.toLowerCase())
    );
  }, [habits, filter]);

  useEffect(() => {
    habits.forEach((habit) => {
      if (
        habit.reminderHour !== undefined &&
        habit.reminderMinute !== undefined
      ) {
        scheduleReminder(habit.reminderHour, habit.reminderMinute, habit.name);
      }
    });
  }, [habits]);

  const scheduleReminder = (habitName, hour, minute) => {
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hour, minute, 0, 0);
    if (reminderTime < now) reminderTime.setDate(reminderTime.getDate() + 1);

    const timeout = reminderTime - now;

    setTimeout(() => {
      if (Notification.permission === "granted") {
        new Notification(`Reminder: ${habitName}`);
      }
      scheduleReminder(hour, minute, habitName);
    }, timeout);
  };

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "2rem auto",
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Your Habits ({habits.length})</h2>
        <Link
          to="/add-habit"
          style={{
            background: "#007bff",
            color: "#fff",
            padding: "8px 14px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          + Add Habit
        </Link>
      </div>

      <input
        type="text"
        placeholder="Filter by name or category..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          width: "100%",
          marginTop: "1rem",
          marginBottom: "1.5rem",
          padding: "10px 12px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <HabitsList habits={filteredHabits} deleteHabit={deleteHabit} />
    </section>
  );
};

export default HabitsPage;
