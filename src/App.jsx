import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DashboardPage from "./pages/DashboardPage";
import HabitsPage from "./pages/HabitsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AddHabit from "./pages/AddHabit";
import EditHabit from "./pages/EditHabit";
import "./styles/layout.css";
import "./styles/dashboard.css";


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/add-habit" element={<AddHabit />} />
          <Route path="/edit-habit/:id" element={<EditHabit />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
