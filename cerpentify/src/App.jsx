import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing.jsx';
import Koleksi from './Pages/Koleksi.jsx';
import Dashboard from './Pages/Dashboard.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/koleksi" element={<Koleksi />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
  
export default App;
