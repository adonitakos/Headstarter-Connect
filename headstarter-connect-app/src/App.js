// File: /src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages:
import Landing from './pages/Landing' 
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/auth/register" element={<SignUp/>}/>
          <Route path="/auth/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;