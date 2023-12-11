// MyRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App'; // Import your main application component
import Buy from './Buy'; // Import the Buy component
import Sell from './Sell'; // Import the Sell component
import Rent from './Rent'; // Import the Rent component
import About from './About'; // Import the About component
import Login from './Login'; // Import the Login component
import Signup from './Signup'; // Import the Signup component

function MyRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default MyRouter;
