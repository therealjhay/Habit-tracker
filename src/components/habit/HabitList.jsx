import React, { useState, useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiEdit,FiTrash2 } from 'react-icons/fi';

const HabitList = ({habit, deleteHabit}) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
   
    useEffect(() => {
        const handleClickOutside = (event) =>{
            if(menuRef.current && !menuRef.current.contains(event.target)){
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>{
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

  return (
    <tr className="habit-table-row">
      <td>{habit.name}</td>
      <td>{habit.category}</td>
      <td>{habit.schedule}</td>
      <td className="habit-actions-cell" ref={menuRef}>
        <button onClick={() => setMenuOpen(!menuOpen)} className="menu-toggle-btn">
          <BsThreeDotsVertical size={20} />
        </button>

        
        {menuOpen && (
          <div className="action-menu">
            <Link to={`/edit-habit/${habit.id}`} className="menu-item">
              <FiEdit /> Edit
            </Link>
            <button
              onClick={() => {
                if (window.confirm(`Delete habit: "${habit.name}"?`)) {
                  deleteHabit(habit.id);
                }
                setMenuOpen(false);
              }}
              className="menu-item delete"
            >
              <FiTrash2 /> Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  )
}

export default HabitList