import React, { useState, useEffect } from 'react';

export default function Home() {
  // Default records so they never disappear
  const defaultRecords = [
    { 
      _id: '1', 
      patientName: 'Rahul Sharma', 
      age: 45, 
      gender: 'Male', 
      scanType: 'Chest CT Scan', 
      doctorName: 'Dr. Verma', 
      date: '2026-08-01', 
      status: 'Completed',
      notes: 'Lungs are clear. Slight inflammation observed in lower left lobe.'
    },
    { 
      _id: '2', 
      patientName: 'Priya Singh', 
      age: 32, 
      gender: 'Female', 
      scanType: 'Brain CT Scan', 
      doctorName: 'Dr. Kapoor', 
      date: '2026-08-02', 
      status: 'Pending',
      notes: 'Scan scheduled for processing. Waiting for radiologist report.'
    }
  ];

  const [records, setRecords] = useState(defaultRecords);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetch('https://ct-scan-backend.onrender.com/api/records')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRecords(data);
        }
      })
      .catch((err) => console.log("Backend loading delay, showing initial records"));
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Patient CT Scan Records Heading (Yellow) */}
      <h2 style={{ marginBottom: '1.5rem', color: '#eab308' }}>Patient CT Scan Records</h2>
      
      <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              {/* Sub-headings in Bold Black */}
              <th style={{ padding: '12px 16px', color: '#000', fontWeight: 'bold' }}>Patient Name</th>
              <th style={{ padding: '12px 16px', color: '#000', fontWeight: 'bold' }}>Age</th>
              <th style={{ padding: '12px 16px', color: '#000', fontWeight: 'bold' }}>Gender</th>
              <th style={{ padding: '12px 16px', color: '#000', fontWeight: 'bold' }}>Scan Type</th>
              <th style={{ padding: '12px 16px', color: '#000', fontWeight: 'bold' }}>Doctor</th>
              <th style={{ padding: '12px 16px', color: '#000', fontWeight: 'bold' }}>Date</th>
              <th style={{ padding: '12px 16px', color: '#000', fontWeight: 'bold' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr 
                key={r._id || r.id} 
                onClick={() => setSelectedRecord(r)}
                style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {/* Record details in Green color */}
                <td style={{ padding: '12px 16px', fontWeight: '600', color: '#16a34a' }}>{r.patientName}</td>
                <td style={{ padding: '12px 16px', color: '#16a34a', fontWeight: '500' }}>{r.age}</td>
                <td style={{ padding: '12px 16px', color: '#16a34a', fontWeight: '500' }}>{r.gender}</td>
                <td style={{ padding: '12px 16px', color: '#16a34a', fontWeight: '500' }}>{r.scanType}</td>
                <td style={{ padding: '12px 16px', color: '#16a34a', fontWeight: '500' }}>{r.doctorName}</td>
                <td style={{ padding: '12px 16px', color: '#16a34a', fontWeight: '500' }}>{r.date}</td>
                {/* Status Badge */}
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    background: r.status === 'Completed' ? '#dcfce7' : '#fef3c7',
                    color: r.status === 'Completed' ? '#166534' : '#92400e'
                  }}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pop-up Modal when clicked */}
      {selectedRecord && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }} onClick={() => setSelectedRecord(null)}>
          <div style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedRecord(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                border: 'none',
                background: 'transparent',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#64748b'
              }}
            >
              ✕
            </button>
            <h3 style={{ margin: '0 0 1rem 0', color: '#0284c7', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              📋 CT Scan Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', color: '#334155' }}>
              <p><strong>Patient Name:</strong> {selectedRecord.patientName}</p>
              <p><strong>Age:</strong> {selectedRecord.age}</p>
              <p><strong>Gender:</strong> {selectedRecord.gender}</p>
              <p><strong>Scan Type:</strong> {selectedRecord.scanType}</p>
              <p><strong>Assigned Doctor:</strong> {selectedRecord.doctorName}</p>
              <p><strong>Scan Date:</strong> {selectedRecord.date}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  background: selectedRecord.status === 'Completed' ? '#dcfce7' : '#fef3c7',
                  color: selectedRecord.status === 'Completed' ? '#166534' : '#92400e'
                }}>
                  {selectedRecord.status}
                </span>
              </p>
            </div>
            {selectedRecord.notes && (
              <div style={{ marginTop: '1rem', background: '#f8fafc', padding: '0.8rem', borderRadius: '6px', borderLeft: '4px solid #0284c7' }}>
                <strong>Doctor's Notes:</strong>
                <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.9rem', color: '#475569' }}>{selectedRecord.notes}</p>
              </div>
            )}
            <button 
              onClick={() => setSelectedRecord(null)}
              style={{
                marginTop: '1.5rem',
                width: '100%',
                padding: '0.6rem',
                background: '#0f172a',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}