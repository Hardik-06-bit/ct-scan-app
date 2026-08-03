const mongoose = require('mongoose');

const scanSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  patientId: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  scanType: { type: String, default: 'CT Scan' },
  bodyPart: { type: String, required: true }, // e.g., Brain, Chest, Abdomen
  dicomFilePath: { type: String, required: true },
  doctorNotes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scan', scanSchema);