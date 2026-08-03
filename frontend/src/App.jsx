import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import UploadForm from './components/UploadForm';

function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', background: '#0f172a', color: '#fff', alignItems: 'center' }}>
      <h2 style={{ margin: 0, color: '#38bdf8' }}>🏥 MedScan CT Viewer</h2>
      <div>
        <Link to="/" style={{ color: '#fff', marginRight: '1.5rem', textDecoration: 'none', fontWeight: 'bold' }}>Dashboard</Link>
        <Link to="/upload" style={{ background: '#0284c7', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>Upload New Scan</Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadForm />} />
      </Routes>
    </Router>
  );
}