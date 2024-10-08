const express = require('express');
const router = express.Router();
const db = require('../db');  // Make sure you have your database connection here

// Fetch all pets
router.get('/', async (req, res) => {
  try {
    const [pets] = await db.query('SELECT * FROM Pets WHERE is_adopted=0');
    res.json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get pet by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query('SELECT * FROM Pets WHERE pet_id = ?', [id]); // Properly structured query
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    res.json(rows[0]);  // Return the first pet found
  } catch (error) {
    console.error('Error fetching pet details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// module.exports = router;