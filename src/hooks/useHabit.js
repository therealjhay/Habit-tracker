// src/hooks/useHabit.js
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const habitKey = "habits"; // ✅ unified with HabitForm

const useHabit = () => {
  const [habits, setHabits] = useState(() => {
    try {
      const allHabits = localStorage.getItem(habitKey);
      return allHabits ? JSON.parse(allHabits) : [];
    } catch (error) {
      console.error("Issues with JSON Parse", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(habitKey, JSON.stringify(habits));
  }, [habits]);

  // CRUD
  const addHabit = (habit) => {
    const newHabit = { ...habit, id: uuidv4(), streak: 0, completed: false };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  const updateHabit = (id, updatedHabit) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, ...updatedHabit } : habit
      )
    );
  };

  const getHabitById = (id) => habits.find((habit) => habit.id === id);

  return { habits, addHabit, deleteHabit, updateHabit, getHabitById };
};

export default useHabit;
