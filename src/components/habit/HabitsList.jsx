import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const HabitsList = ({ habits, deleteHabit }) => {
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!habits || habits.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "1rem" }}>No habits yet</p>
    );
  }

  return (
    <div style={{ width: "100%", overflowX: "auto", marginTop: "1.5rem" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0 10px",
          backgroundColor: "white",
        }}
      >
        <thead>
          <tr style={{ background: "#f9fafb", textAlign: "left" }}>
            <th style={{ padding: "12px 20px" }}>Name</th>
            <th style={{ padding: "12px 20px" }}>Category</th>
            <th style={{ padding: "12px 20px" }}>Schedule</th>
            <th style={{ padding: "12px 20px" }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {habits.map((habit) => (
            <tr
              key={habit.id}
              style={{
                background: "#ffffff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                borderRadius: "8px",
              }}
            >
              <td style={{ padding: "16px 20px" }}>{habit.name}</td>
              <td style={{ padding: "16px 20px" }}>{habit.category}</td>
              <td style={{ padding: "16px 20px" }}>{habit.schedule}</td>
              <td style={{ padding: "16px 20px", position: "relative" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === habit.id ? null : habit.id);
                  }}
                  style={{
                    background: "none",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "6px 10px",
                    cursor: "pointer",
                  }}
                >
                  <BsThreeDotsVertical size={18} />
                </button>

                {openMenuId === habit.id && (
                  <div
                    style={{
                      position: "absolute",
                      top: "45px",
                      right: "10px",
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                      zIndex: 10,
                      minWidth: "120px",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      to={`/edit-habit/${habit.id}`}
                      style={{
                        display: "block",
                        padding: "10px",
                        textDecoration: "none",
                        color: "#333",
                        borderBottom: "1px solid #eee",
                      }}
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
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "10px",
                        background: "none",
                        border: "none",
                        textAlign: "left",
                        color: "#c00",
                        cursor: "pointer",
                      }}
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
