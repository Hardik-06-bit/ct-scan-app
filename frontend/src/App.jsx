import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const defaultData = [
    { id: 1, patientName: "Rahul Sharma", age: 45, gender: "Male", scanType: "Chest CT Scan", doctorName: "Dr. Verma", date: "2026-08-01", status: "Completed" },
    { id: 2, patientName: "Priya Singh", age: 32, gender: "Female", scanType: "Brain CT Scan", doctorName: "Dr. Kapoor", date: "2026-08-02", status: "Pending" }
  ];

  const [records, setRecords] = useState(defaultData);

  useEffect(() => {
    fetch('https://ct-scan-backend.onrender.com/api/records')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setRecords(data);
        }
      })
      .catch(err => console.log("Backend offline, showing default records"));
  }, []);

  return (
    <div className="container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>CT Scan Patient Records</h2>
      <div style={{ overflowX: 'auto' }}>
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f4f4f4' }}>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Scan Type</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.patientName}</td>
                <td>{r.age}</td>
                <td>{r.gender}</td>
                <td>{r.scanType}</td>
                <td>{r.doctorName}</td>
                <td>{r.date}</td>
                <td>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '4px',
                    color: '#fff',
                    background: r.status === 'Completed' ? '#2e7d32' : '#ed6c02' 
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

export default App;
