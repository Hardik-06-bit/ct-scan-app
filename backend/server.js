const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const scanRoutes = require('./routes/scanRoutes');

const app = express();

// Uploads folder exist karna chahiye
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes Middleware
app.use('/api/scans', scanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
});