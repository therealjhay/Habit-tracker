import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useHabit from '../hooks/useHabit';
import HabitForm from '../components/habit/HabitForm';

const EditHabit = () => {
    const {id} = useParams();
    const {getHabitById, updateHabit} = useHabit();
    const navigate = useNavigate();

    const habitToEdit = getHabitById(id);

    const handleUpdateHabit = (habitData) =>{
        updateHabit(id,habitData);
        navigate('/habits');
    };

    if(!habitToEdit){
        return(
            <section>
                <h2>Habit not found</h2>
                <button onClick={() => navigate('/habits')}>Go Back Home</button>
            </section>
        );
    }

  return (
    <section className="edit-habit-page">
        <HabitForm onSubmit={handleUpdateHabit} initialData={habitToEdit} />
    </section>
  )
}

export default EditHabit