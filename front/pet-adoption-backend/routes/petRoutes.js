const express = require('express');
const router = express.Router();
const db = require('../db');

// Fetch all distinct species
router.get('/species', async (req, res) => {
  try {
    const [species] = await db.query('SELECT DISTINCT species_name FROM Pets');
    res.json(species);
  } catch (error) {
    console.error('Error fetching species:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all distinct breeds
router.get('/breeds', async (req, res) => {
  try {
    const [breeds] = await db.query('SELECT DISTINCT breed FROM Pets');
    res.json(breeds);
  } catch (error) {
    console.error('Error fetching breeds:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch all available pets with optional filters
router.get('/', async (req, res) => {
  const { species, breed } = req.query;  // Get filters from query parameters

  let query = 'SELECT * FROM Pets WHERE is_adopted = 0';
  const params = [];

  // Apply filters based on species and breed
  if (species) {
    query += ' AND species_name = ?';
    params.push(species);
  }

  if (breed) {
    query += ' AND breed = ?';
    params.push(breed);
  }

  try {
    const [pets] = await db.query(query, params);
    res.json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
