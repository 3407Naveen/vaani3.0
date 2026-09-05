import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Assistant from './pages/Assistant';
import Review from './pages/Review';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </Router>
  );
}
