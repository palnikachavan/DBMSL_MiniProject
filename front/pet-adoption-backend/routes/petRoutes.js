const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all pets
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM Pets WHERE is_adopted = 0';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get a single pet by ID
router.get('/:id', (req, res) => {
  const petId = req.params.id;
  const sql = 'SELECT * FROM Pets WHERE pet_id = ?';
  db.query(sql, [petId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: 'Pet not found' });
    res.json(result[0]);
  });
});

// Add a new pet (for admin functionality)
router.post('/', (req, res) => {
  const { name, species_id, breed, age, gender, weight, health_status, description } = req.body;
  const sql = `INSERT INTO Pets (name, species_id, breed, age, gender, weight, health_status, arrival_date, description, is_adopted) 
               VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE(), ?, 0)`;
  db.query(sql, [name, species_id, breed, age, gender, weight, health_status, description], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Pet added successfully' });
  });
});

module.exports = router;
