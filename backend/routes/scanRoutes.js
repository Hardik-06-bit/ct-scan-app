const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Default mock scans (taaki data hamesha dikhe)
let mockScans = [
  {
    _id: "scan_101",
    patientName: "Rahul Sharma",
    patientId: "PAT-8801",
    age: "38",
    gender: "Male",
    bodyPart: "Chest HRCT",
    doctorNotes: "Dry cough for 2 weeks. Mild breathlessness observed.",
    dicomFilePath: "uploads/sample_chest.dcm",
    createdAt: new Date()
  },
  {
    _id: "scan_102",
    patientName: "Priya Patel",
    patientId: "PAT-8802",
    age: "29",
    gender: "Female",
    bodyPart: "Brain CT",
    doctorNotes: "Severe headache post-trauma.",
    dicomFilePath: "uploads/sample_brain.dcm",
    createdAt: new Date()
  }
];

// GET All Scans
router.get('/', (req, res) => {
  res.json(mockScans);
});

// POST Upload Scan
router.post('/upload', upload.single('dicomFile'), (req, res) => {
  const newScan = {
    _id: 'scan_' + Date.now(),
    patientName: req.body.patientName,
    patientId: req.body.patientId,
    age: req.body.age,
    gender: req.body.gender,
    bodyPart: req.body.bodyPart,
    doctorNotes: req.body.doctorNotes,
    dicomFilePath: req.file ? req.file.path : '',
    createdAt: new Date()
  };
  mockScans.unshift(newScan);
  res.status(201).json({ message: 'Scan uploaded successfully!', scan: newScan });
});

// IMPORTANT: Router ko export karna zaroori hai!
module.exports = router;