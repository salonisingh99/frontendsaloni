import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import Profile from "./components/profile";
import StudentDashboard from "./components/studentDashboard"
import AluminiDashboard from "./components/aluminiDashboard"

function App() {
  return (
    <Router>
      <div className="App">
            <Routes>
              <Route exact path="/student-dashboard" element={<StudentDashboard />} />
              <Route exact path="/alumini-dashboard" element={<AluminiDashboard />} />
              <Route path="/" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
    </Router>
  );
}

export default App;