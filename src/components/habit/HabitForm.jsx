import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik,Form,Field,ErrorMessage } from 'formik';
import * as Yup from 'yup';


const HabitValidation = Yup.object().shape({
    name: Yup.string()
    .min(3,'Name must be more than 3 characters')
    .max(50, 'Name must not be more that 50 characters')
    .required('Habit Name is required'),

    category: Yup.string()
    .min(3,'Category must be more than 3 characters')
    .max(50, 'Category must not be more that 50 characters')
    .required('Habit Category is required'),

    schedule: Yup.string().required('Schedule is required')
})

const HabitForm = ({ onSubmit, initialData = {} }) => {
    const navigate = useNavigate();

    const formInitialValues = {
        name: initialData.name || '',
        category: initialData.category || '',
        schedule: initialData.schedule || 'Daily'
    };

    const handleFormSubmit = (values) => {
        onSubmit(values);
    };

  return (
    <Formik 
    initialValues={formInitialValues}
    validationSchema={HabitValidation}
    onSubmit={handleFormSubmit}
    >
        <Form className="habit-form">
            <div className="form-group">
                <label htmlFor='name'>Habit Name</label>
                <Field 
                    type="text"
                    name="name"
                    placeholder="Enter Habit Name"
                />
                <ErrorMessage name="name" component="div" className="error-message"/>
            </div>

            <div className="form-group">
                <label htmlFor='category'>Category</label>
                <Field 
                    type="text"
                    name="category"
                    placeholder="Enter Category"
                />
                <ErrorMessage name="category" component="div" className="error-message"/>
            </div>

            <div className="form-group">
                <label htmlFor='schedule'>schedule</label>
                <Field 
                    as="select"
                    name="schedule"
                    placeholder="Enter schedule"
                >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Weekends">Weekends</option>
                </Field>
                <ErrorMessage name="schedule" component="div" className="error-message"/>
            </div>
            
            <div className="form-actions">
                <button type='submit' className="btn btn-primary" >
                    Save
                </button>

            </div>
        </Form>

    </Formik>
  );
}
export default HabitForm