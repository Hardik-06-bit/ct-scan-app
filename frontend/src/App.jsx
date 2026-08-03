import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import UploadForm from './components/UploadForm';

function Navbar() {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem 2rem', 
      background: '#ffffff', 
      alignItems: 'center',
      borderBottom: '1px solid #cbd5e1', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)' 
    }}>
      {/* MedScan CT Viewer in High-Contrast Electric Navy Blue */}
      <h2 style={{ margin: 0, color: '#0284c7', fontWeight: '800', letterSpacing: '0.5px' }}>
        🏥 MedScan CT Viewer
      </h2>
      <div>
        <Link to="/" style={{ color: '#0f172a', marginRight: '1.5rem', textDecoration: 'none', fontWeight: '600' }}>Dashboard</Link>
        <Link to="/upload" style={{ 
          background: '#0284c7', 
          color: '#fff', 
          padding: '0.6rem 1.2rem', 
          borderRadius: '8px', 
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.background = '#0369a1'}
        onMouseLeave={(e) => e.target.style.background = '#0284c7'}
        >
          Upload New Scan
        </Link>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    // Records Table Container ke alawa BAKI SARA BACKGROUND LIGHT BLUE (#f0f9ff)
    <div style={{ background: '#f0f9ff', minHeight: '100vh', color: '#1e293b' }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<UploadForm />} />
        </Routes>
      </Router>
    </div>
  );
}