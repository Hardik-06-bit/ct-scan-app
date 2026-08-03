import React, { useState } from 'react';
import axios from 'axios';

export default function UploadForm() {
  const [formData, setFormData] = useState({
    patientName: 'Rahul Sharma',
    patientId: 'PAT-101',
    age: '35',
    gender: 'Male',
    bodyPart: 'Chest',
    doctorNotes: 'High resolution HRCT Chest scan. Checking for dry cough.'
  });
  
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: 'error', message: 'Kripya koi bhi file select karein!' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    const data = new FormData();
    data.append('patientName', formData.patientName);
    data.append('patientId', formData.patientId);
    data.append('age', formData.age);
    data.append('gender', formData.gender);
    data.append('bodyPart', formData.bodyPart);
    data.append('doctorNotes', formData.doctorNotes);
    data.append('dicomFile', file);

    try {
      const res = await axios.post('http://localhost:5000/api/scans/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setStatus({ type: 'success', message: '✅ Patient CT Scan successfully upload ho gaya!' });
      setLoading(false);
    } catch (err) {
      console.error("Upload error details:", err);
      const errDetail = err.response?.data?.error || err.message || 'Server connection failed';
      setStatus({ type: 'error', message: `❌ Upload Fail Ho Gaya: ${errDetail}` });
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: 'sans-serif' }}>
      <h2>📤 Upload Patient CT Scan Data</h2>

      {status.message && (
        <div style={{ padding: '0.8rem', borderRadius: '6px', marginBottom: '1rem', background: status.type === 'success' ? '#dcfce7' : '#fee2e2', color: status.type === 'success' ? '#15803d' : '#b91c1c', fontWeight: 'bold' }}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Patient Name:</label>
          <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Patient ID:</label>
            <input type="text" name="patientId" value={formData.patientId} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Age:</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Body Part:</label>
            <input type="text" name="bodyPart" value={formData.bodyPart} onChange={handleChange} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>Doctor Notes:</label>
          <textarea name="doctorNotes" value={formData.doctorNotes} onChange={handleChange} rows="3" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
        </div>

        <div style={{ marginBottom: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px dashed #0284c7' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#0284c7' }}>Select Scan File (.dcm / image):</label>
          <input type="file" onChange={handleFileChange} required />
        </div>

        <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#94a3b8' : '#0284c7', color: '#fff', padding: '10px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
          {loading ? 'Uploading Scan...' : 'Submit CT Scan'}
        </button>
      </form>
    </div>
  );
}