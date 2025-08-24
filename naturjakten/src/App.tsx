import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Lägg till fler routes här, t.ex. <Route path="/map" element={<Map />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;