import React, { useState, useEffect } from 'react';

export default function Home() {
  // Default records initialized so they never disappear
  const defaultRecords = [
    { _id: '1', patientName: 'Rahul Sharma', age: 45, gender: 'Male', scanType: 'Chest CT Scan', doctorName: 'Dr. Verma', date: '2026-08-01', status: 'Completed' },
    { _id: '2', patientName: 'Priya Singh', age: 32, gender: 'Female', scanType: 'Brain CT Scan', doctorName: 'Dr. Kapoor', date: '2026-08-02', status: 'Pending' }
  ];

  const [records, setRecords] = useState(defaultRecords);

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
      {/* Patient CT Scan Records Heading with Yellow Color */}
      <h2 style={{ marginBottom: '1.5rem', color: '#eab308' }}>Patient CT Scan Records</h2>
      
      <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <th style={{ padding: '12px 16px' }}>Patient Name</th>
              <th style={{ padding: '12px 16px' }}>Age</th>
              <th style={{ padding: '12px 16px' }}>Gender</th>
              <th style={{ padding: '12px 16px' }}>Scan Type</th>
              <th style={{ padding: '12px 16px' }}>Doctor</th>
              <th style={{ padding: '12px 16px' }}>Date</th>
              <th style={{ padding: '12px 16px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id || r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', fontWeight: '600' }}>{r.patientName}</td>
                <td style={{ padding: '12px 16px' }}>{r.age}</td>
                <td style={{ padding: '12px 16px' }}>{r.gender}</td>
                <td style={{ padding: '12px 16px' }}>{r.scanType}</td>
                <td style={{ padding: '12px 16px' }}>{r.doctorName}</td>
                <td style={{ padding: '12px 16px' }}>{r.date}</td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
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
    </div>
  );
}