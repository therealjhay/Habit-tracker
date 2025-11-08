import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const HabitValidation = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be more than 3 characters")
    .max(50, "Name must not be more than 50 characters")
    .required("Habit Name is required"),
  category: Yup.string()
    .min(3, "Category must be more than 3 characters")
    .max(50, "Category must not be more than 50 characters")
    .required("Habit Category is required"),
  schedule: Yup.string().required("Schedule is required"),
  reminderHour: Yup.number()
    .min(0, "Hour must be 0-23")
    .max(23, "Hour must be 0-23")
    .required("Reminder Hour is required"),
  reminderMinute: Yup.number()
    .min(0, "Minute must be 0-59")
    .max(59, "Minute must be 0-59")
    .required("Reminder Minute is required"),
});

const HabitForm = ({ onSubmit, initialData = {} }) => {
  const navigate = useNavigate();

  const formInitialValues = {
    name: initialData.name || "",
    category: initialData.category || "",
    schedule: initialData.schedule || "Daily",
    reminderHour: initialData.reminderHour ?? 20,
    reminderMinute: initialData.reminderMinute ?? 0,
  };

  const handleFormSubmit = (values, { resetForm }) => {
    const storedHabits = JSON.parse(localStorage.getItem("habits")) || [];

    if (initialData.id) {
      // ✅ UPDATE EXISTING HABIT
      const updatedHabits = storedHabits.map((habit) =>
        habit.id === initialData.id ? { ...habit, ...values } : habit
      );

      localStorage.setItem("habits", JSON.stringify(updatedHabits));

      if (onSubmit) onSubmit(values);
      navigate("/habits"); // optional navigation after save
    } else {
      // ✅ ADD NEW HABIT
      const newHabit = {
        id: Date.now(),
        ...values,
        streak: 0,
        completed: false,
      };

      localStorage.setItem(
        "habits",
        JSON.stringify([...storedHabits, newHabit])
      );

      if (onSubmit) onSubmit(newHabit);
      resetForm();
      navigate("/habits"); // optional
    }
  };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={HabitValidation}
      onSubmit={handleFormSubmit}
      enableReinitialize
    >
      <Form className="habit-form">
        <div className="form-group">
          <label htmlFor="name">Habit Name</label>
          <Field type="text" name="name" placeholder="Enter Habit Name" />
          <ErrorMessage name="name" component="div" className="error-message" />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <Field type="text" name="category" placeholder="Enter Category" />
          <ErrorMessage
            name="category"
            component="div"
            className="error-message"
          />
        </div>

        <div className="form-group">
          <label htmlFor="schedule">Schedule</label>
          <Field as="select" name="schedule">
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Weekdays">Weekdays</option>
            <option value="Weekends">Weekends</option>
          </Field>
          <ErrorMessage
            name="schedule"
            component="div"
            className="error-message"
          />
        </div>

        <div className="form-group">
          <label htmlFor="reminderHour">Reminder Hour (0-23)</label>
          <Field type="number" name="reminderHour" min="0" max="23" />
          <ErrorMessage
            name="reminderHour"
            component="div"
            className="error-message"
          />
        </div>

        <div className="form-group">
          <label htmlFor="reminderMinute">Reminder Minute (0-59)</label>
          <Field type="number" name="reminderMinute" min="0" max="59" />
          <ErrorMessage
            name="reminderMinute"
            component="div"
            className="error-message"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {initialData.id ? "Update Habit" : "Save Habit"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default HabitForm;
