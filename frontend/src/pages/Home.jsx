import React, { useState, useEffect } from 'react';

export default function Home() {
  const defaultRecords = [
    { _id: '1', patientName: 'Rahul Sharma', age: 45, gender: 'Male', scanType: 'Chest CT Scan', doctorName: 'Dr. Verma', date: '2026-08-01', status: 'Completed', notes: 'Lungs are clear. Slight inflammation.'},
    { _id: '2', patientName: 'Priya Singh', age: 32, gender: 'Female', scanType: 'Brain CT Scan', doctorName: 'Dr. Kapoor', date: '2026-08-02', status: 'Pending', notes: 'Scan scheduled. Waiting for report.'}
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
      .catch((err) => console.log("Backend loading, showing initial records"));
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#0284c7', fontWeight: 'bold' }}>Patient CT Scan Records</h2>
      
      {/* Clean White Table Box standing out on Light Blue Page */}
      <div style={{ 
        overflowX: 'auto', 
        background: '#ffffff', 
        borderRadius: '12px', 
        border: '1px solid #bae6fd',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '16px', color: '#000', fontWeight: 'bold' }}>Patient Name</th>
              <th style={{ padding: '16px', color: '#000', fontWeight: 'bold' }}>Age</th>
              <th style={{ padding: '16px', color: '#000', fontWeight: 'bold' }}>Gender</th>
              <th style={{ padding: '16px', color: '#000', fontWeight: 'bold' }}>Scan Type</th>
              <th style={{ padding: '16px', color: '#000', fontWeight: 'bold' }}>Doctor</th>
              <th style={{ padding: '16px', color: '#000', fontWeight: 'bold' }}>Date</th>
              <th style={{ padding: '16px', color: '#000', fontWeight: 'bold' }}>Summary</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id || r.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f0f9ff'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '16px', fontWeight: '600', color: '#16a34a' }}>{r.patientName}</td>
                <td style={{ padding: '16px', color: '#16a34a', fontWeight: '500' }}>{r.age}</td>
                <td style={{ padding: '16px', color: '#16a34a', fontWeight: '500' }}>{r.gender}</td>
                <td style={{ padding: '16px', color: '#16a34a', fontWeight: '500' }}>{r.scanType}</td>
                <td style={{ padding: '16px', color: '#16a34a', fontWeight: '500' }}>{r.doctorName}</td>
                <td style={{ padding: '16px', color: '#16a34a', fontWeight: '500' }}>{r.date}</td>
                <td style={{ padding: '16px' }}>
                  <button 
                    onClick={() => setSelectedRecord(r)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      background: '#0284c7',
                      color: '#fff',
                      border: 'none',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#0369a1'}
                    onMouseLeave={(e) => e.target.style.background = '#0284c7'}
                  >
                    View Summary
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
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
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
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
              📋 CT Scan Summary
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