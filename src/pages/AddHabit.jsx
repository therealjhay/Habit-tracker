import React from 'react';
import { useNavigate } from 'react-router-dom';
import useHabit from '../hooks/useHabit';
import HabitForm from '../components/habit/HabitForm';

const AddHabit = () => {
    const {addHabit} = useHabit();
    const navigate = useNavigate();

    const handleAddHabit = (habitData) =>{
        addHabit(habitData);
        navigate('/habits');

    }
  return (
    <section className="add-habit-page">
      <HabitForm onSubmit={handleAddHabit} />
    </section>
  )
}

export default AddHabit