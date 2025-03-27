import React, { useState } from "react";
import Navbar from "./components/Navbar";
import PaymentsPage from "./components/PaymentsPage";
import "./index.css";

const App: React.FC = () => {
  const [view, setView] = useState("home");

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setView={setView} />
      {view === "payments" && <PaymentsPage />}
      {view === "home" && (
        <div className="flex items-center justify-center h-96 text-xl font-medium text-gray-600">
          Welcome to DoctorAppointments
        </div>
      )}
      {view === "about" && (
        <div className="flex items-center justify-center h-96 text-xl font-medium text-gray-600">
          This app helps manage doctor visits and payments easily.
        </div>
      )}
      {view === "services" && (
        <div className="flex items-center justify-center h-96 text-xl font-medium text-gray-600">
          We offer appointment tracking, billing, and more.
        </div>
      )}
    </div>
  );
};

export default App;
