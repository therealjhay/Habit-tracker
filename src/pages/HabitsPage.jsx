import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import useHabit from '../hooks/useHabit';
import HabitList from '../components/habit/HabitList';
import { FiPlus } from 'react-icons/fi';

const HabitsPage = () => {
  const { habits, deleteHabit } = useHabit();
  const [filter, setFilter] = useState('');

  const filteredHabits = useMemo(() => {
    if (!filter) {
      return habits;
    }
    return habits.filter(
      (habit) =>
        habit.name.toLowerCase().includes(filter.toLowerCase()) ||
        habit.category.toLowerCase().includes(filter.toLowerCase())
    );
  }, [habits, filter]);

  return (
    <section className="habits-page">
      <div className="page-header">
        <h2>Your Habits ({habits.length})</h2>
        <Link to="/add-habit" className="btn btn-primary add-habit-link">
          <FiPlus /> Add Habit
        </Link>
      </div>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by name or category..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>

      {filteredHabits.length > 0 ? (
        <div className="table-container">
          <table className="habit-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Schedule</th>
                <th className="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHabits.map((habit) => (
                <HabitList
                  key={habit.id}
                  habit={habit}
                  deleteHabit={deleteHabit}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="empty-state">
          {habits.length === 0
            ? "You haven't added any habits yet."
            : 'No habits match your filter.'}
        </p>
      )}
    </section>
  );
};
export default HabitsPage;
