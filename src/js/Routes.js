import { Routes, Route, Link, MemoryRouter } from 'react-router-dom';
import React from 'react';
import Home from '../js/pages/home';
import About from '../js/pages/about';

export default function RouterFile() {
  return (
    <div>
      <MemoryRouter>
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
        <Routes>
          {/* Set the index route for the root path */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
}
