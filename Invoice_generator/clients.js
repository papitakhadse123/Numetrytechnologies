import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Add new client
router.post('/', (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ id: result.insertId, name, email, phone });
    }
  );
});

// Get all clients
router.get('/', (req, res) => {
  db.query('SELECT * FROM clients', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

export default router;
