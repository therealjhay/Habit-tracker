import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import useHabit from "../hooks/useHabit";
import HabitsList from "../components/habit/HabitsList";
import { FiPlus } from "react-icons/fi";
import "../styles/habits.css";

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

  const scheduleReminder = (hour, minute, habitName) => {
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
    <section className="dashboard-panel">
      <div className="habits-header">
        <h2>Your Habits ({habits.length})</h2>
        <Link to="/add-habit" className="add-habit-btn">
          <FiPlus /> Add Habit
        </Link>
      </div>
      <input
        type="text"
        placeholder="Filter by name or category..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="habit-filter-input"
      />
      <HabitsList habits={filteredHabits} deleteHabit={deleteHabit} />
    </section>
  );
};

export default HabitsPage;
