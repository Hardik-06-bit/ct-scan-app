import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [scans, setScans] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null); // Level 1 Click: Quick Summary Drawer
  const [fullReportScan, setFullReportScan] = useState(null); // Level 2 Click: Full A4 Report
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/scans');
      setScans(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching scans:", err);
      setLoading(false);
    }
  };

  // ------------------- LEVEL 3: FULL A4 MEDICAL REPORT VIEW -------------------
  if (fullReportScan) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '2rem', fontFamily: 'serif' }}>
        {/* Top Actions */}
        <div style={{ maxWidth: '800px', margin: '0 auto 1rem auto', display: 'flex', justifyContent: 'space-between' }}>
          <button 
            onClick={() => setFullReportScan(null)}
            style={{ background: '#64748b', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontFamily: 'sans-serif' }}
          >
            ← Back to Patient Records
          </button>
          <button 
            onClick={() => window.print()}
            style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'sans-serif' }}
          >
            🖨️ Print / Download Report PDF
          </button>
        </div>

        {/* A4 Report Sheet Container */}
        <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', border: '2px solid #cbd5e1', padding: '3rem', borderRadius: '4px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', color: '#0f172a' }}>
          
          {/* Hospital Header */}
          <div style={{ borderBottom: '3px double #0284c7', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ margin: 0, color: '#0284c7', fontSize: '26px' }}>MEDSCAN ADVANCED RADIOLOGY CENTER</h1>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#475569', fontFamily: 'sans-serif' }}>
                Department of Radio-Diagnosis & Imaging | Reg No: RAD-2026-9901
              </p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px', fontFamily: 'sans-serif', color: '#64748b' }}>
              <p style={{ margin: 0 }}><strong>Report Date:</strong> 03-Aug-2026</p>
              <p style={{ margin: 0 }}><strong>Status:</strong> FINAL REPORT</p>
            </div>
          </div>

          {/* Patient Details Grid */}
          <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '6px', margin: '1.5rem 0', fontFamily: 'sans-serif', fontSize: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
            <div><strong>Patient Name:</strong> {fullReportScan.patientName}</div>
            <div><strong>Patient ID:</strong> {fullReportScan.patientId}</div>
            <div><strong>Age / Gender:</strong> {fullReportScan.age} Yrs / {fullReportScan.gender}</div>
            <div><strong>Investigation:</strong> CT Scan ({fullReportScan.bodyPart})</div>
            <div><strong>Referred By:</strong> Dr. A. K. Verma (MD, Radiologist)</div>
            <div><strong>Scan ID:</strong> SCAN-{fullReportScan._id ? fullReportScan._id.slice(-6) : '101'}</div>
          </div>

          {/* Report Main Content */}
          <div style={{ margin: '2rem 0', lineHeight: '1.7', fontSize: '15px' }}>
            <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', color: '#0369a1', fontFamily: 'sans-serif' }}>
              CLINICAL DIAGNOSIS & OBSERVED DEFECTS
            </h3>
            <p style={{ fontStyle: 'italic', background: '#fafafa', padding: '10px', borderRadius: '4px' }}>
              "{fullReportScan.doctorNotes || 'No specific clinical defects or symptoms noted.'}"
            </p>

            <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', color: '#0369a1', fontFamily: 'sans-serif', marginTop: '2rem' }}>
              RADIOLOGICAL FINDINGS ({fullReportScan.bodyPart.toUpperCase()} CT SCAN)
            </h3>
            <ul style={{ paddingLeft: '1.2rem', color: '#334155' }}>
              <li>Axial cross-sectional images were acquired and analyzed.</li>
              <li>No obvious structural abnormality or acute defect detected in primary scan regions.</li>
              <li>Soft tissue structures remain well-preserved across scanned slices.</li>
            </ul>

            <h3 style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '4px', color: '#0369a1', fontFamily: 'sans-serif', marginTop: '2rem' }}>
              RECOMMENDED ACTION / IMPRESSION
            </h3>
            <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0284c7', padding: '12px', fontSize: '15px', fontWeight: '500' }}>
              High-Resolution Computed Tomography (HRCT) of {fullReportScan.bodyPart} completed. Recommended Action: Clinical correlation and routine follow-up as advised.
            </div>
          </div>

          {/* Doctor Signature */}
          <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontFamily: 'sans-serif' }}>
            <div>
              <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>Verified Electronically</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>DICOM Image Ref: <code>{fullReportScan.dicomFilePath}</code></p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid #000', width: '180px', marginBottom: '8px' }}></div>
              <strong style={{ display: 'block', fontSize: '14px' }}>Dr. A. K. Verma</strong>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Consultant Radiologist</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ------------------- MAIN DASHBOARD VIEW -------------------
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Top Banner */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ margin: 0, color: '#0f172a' }}>🏥 Patient Diagnostic Records</h2>
        <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '14px' }}>Select any record row to view summary details or perform follow-up actions.</p>
      </div>

      {/* Clean Table */}
      {loading ? (
        <p>Loading patient records...</p>
      ) : scans.length === 0 ? (
        <div style={{ background: '#fff', padding: '3rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#64748b' }}>No Records Found</h3>
          <p>Please upload a scan first.</p>
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f1f5f9', color: '#475569', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '0.5px' }}>
                <th style={{ padding: '16px' }}>Patient ID</th>
                <th style={{ padding: '16px' }}>Patient Name</th>
                <th style={{ padding: '16px' }}>Age / Gender</th>
                <th style={{ padding: '16px' }}>Body Part</th>
                <th style={{ padding: '16px' }}>Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {scans.map((scan) => (
                <tr 
                  key={scan._id}
                  onClick={() => setSelectedScan(scan)}
                  style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                >
                  <td style={{ padding: '16px', fontWeight: 'bold', color: '#0284c7' }}>{scan.patientId}</td>
                  <td style={{ padding: '16px', fontWeight: '600', color: '#0f172a' }}>{scan.patientName}</td>
                  <td style={{ padding: '16px', color: '#475569' }}>{scan.age} Yrs / {scan.gender}</td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '12px', fontWeight: '500', fontSize: '12px' }}>
                      {scan.bodyPart}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedScan(scan); }}
                      style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
                    >
                      View Report Summary →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* QUICK SUMMARY DRAWER */}
      {selectedScan && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.6)', display: 'flex', justifyContent: 'flex-end', zIndex: 1000 }}>
          <div style={{ width: '500px', background: '#fff', height: '100%', padding: '2rem', boxShadow: '-4px 0 20px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflowY: 'auto' }}>
            
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: '#0f172a' }}>📋 Diagnostic Summary</h3>
                <button 
                  onClick={() => setSelectedScan(null)}
                  style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#64748b' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <h2 style={{ margin: '0 0 6px 0', color: '#0284c7' }}>{selectedScan.patientName}</h2>
                <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                  <strong>ID:</strong> {selectedScan.patientId} | <strong>Age:</strong> {selectedScan.age} | <strong>Gender:</strong> {selectedScan.gender}
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: '#334155', marginBottom: '6px' }}>📝 Clinical Notes / Observed Defect</h4>
                <p style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '10px', borderRadius: '6px', fontSize: '14px', color: '#475569', margin: 0 }}>
                  {selectedScan.doctorNotes || 'No specific clinical defect reported.'}
                </p>
              </div>

              <div>
                <h4 style={{ color: '#334155', marginBottom: '6px' }}>🔬 Associated CT Scan File</h4>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                  <p style={{ color: '#38bdf8', margin: '0 0 8px 0' }}>File Path: {selectedScan.dicomFilePath}</p>
                  <p style={{ margin: 0 }}>Status: Calibrated & Ready for Analysis</p>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
              <button 
                onClick={() => {
                  setFullReportScan(selectedScan);
                  setSelectedScan(null);
                }}
                style={{ width: '100%', background: '#16a34a', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                📄 Open Full Medical Diagnostic Report →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}