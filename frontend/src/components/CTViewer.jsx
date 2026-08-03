import React, { useEffect, useRef } from 'react';
import { App } from 'dwv';

export default function CTViewer({ dicomUrl }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !dicomUrl) return;

    // Initialize DWV (DICOM Web Viewer)
    const app = new App();
    app.init({
      dataViewConfigs: { '*': [{ divId: 'dwv-layer' }] },
      tools: ['Scroll', 'ZoomAndPan', 'WindowLevel']
    });

    app.loadURLs([dicomUrl]);
  }, [dicomUrl]);

  return (
    <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', color: '#fff', marginTop: '1rem' }}>
      <h3 style={{ color: '#38bdf8', marginTop: 0 }}>🔬 CT Scan Inspection Canvas</h3>
      <div id="dwv-layer" ref={containerRef} style={{ width: '100%', height: '400px', background: '#000', position: 'relative', borderRadius: '8px' }}>
        {!dicomUrl && (
          <p style={{ color: '#94a3b8', textAlign: 'center', paddingTop: '180px' }}>
            No CT Scan selected. Select a patient from the list to render DICOM canvas.
          </p>
        )}
      </div>
    </div>
  );
}