import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import "./habitslist.css";

const HabitsList = ({ habits, deleteHabit }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!habits || habits.length === 0) {
    return (
      <p className="no-habits-msg">No habits yet</p>
    );
  }

  return (
    <div className="habit-table-wrapper">
      <table className="habit-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Schedule</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <tr key={habit.id}>
              <td>{habit.name}</td>
              <td>{habit.category}</td>
              <td>{habit.schedule}</td>
              <td style={{ position: "relative" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === habit.id ? null : habit.id);
                  }}
                  className="dots-btn"
                  type="button"
                >
                  <BsThreeDotsVertical size={18} />
                </button>
                {openMenuId === habit.id && (
                  <div className="actions-menu" onClick={(e) => e.stopPropagation()}>
                    <Link
                      to={`/edit-habit/${habit.id}`}
                      className="actions-menu-link"
                    >
                      <FiEdit /> Edit
                    </Link>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete habit: "${habit.name}"?`)) {
                          deleteHabit(habit.id);
                        }
                        setOpenMenuId(null);
                      }}
                      className="actions-menu-delete"
                      type="button"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitsList;
