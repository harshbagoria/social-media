import React from "react";
import { Route, Routes } from "react-router-dom"; // Use react-router-dom instead of react-router
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
