import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Firebase/authContext.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import Koleksi from './Pages/Koleksi.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Landing from './Pages/Landing.jsx';
import ContactPage from './Pages/Contact.jsx';
import TambahCerpen from './Pages/TambahCerpen.jsx';
import { Cerpen } from './Pages/Cerpen.jsx'; // Import Cerpen component
import Cerpenku from './Pages/DashboardCerpenku.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/koleksi" element={<Koleksi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kontak" element={<ContactPage />} />
          <Route path="/tambah" element={<TambahCerpen />} />
          <Route path="/cerpenku" element={<Cerpenku />} />
          <Route path="/cerpen/:id" element={<Cerpen />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
