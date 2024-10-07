require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const petRoutes = require('./routes/petRoutes');
const adopterRoutes = require('./routes/adopterRoutes');

// Middleware
app.use(cors());
app.use(express.json());  // For parsing JSON request bodies

// Routes
app.use('/api/pets', petRoutes);
app.use('/api/adopt', adopterRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
