import express from 'express';
import { db } from '../db.js';

const router = express.Router();

// Create a new invoice with items
router.post('/', (req, res) => {
  const { client_id, date, items } = req.body;

  let total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  db.query(
    'INSERT INTO invoices (client_id, date, total_amount) VALUES (?, ?, ?)',
    [client_id, date, total],
    (err, result) => {
      if (err) return res.status(500).json(err);

      const invoiceId = result.insertId;

      const values = items.map(item => [invoiceId, item.description, item.quantity, item.price]);

      db.query(
        'INSERT INTO invoice_items (invoice_id, description, quantity, price) VALUES ?',
        [values],
        (err2) => {
          if (err2) return res.status(500).json(err2);
          res.status(201).json({ invoice_id: invoiceId });
        }
      );
    }
  );
});

// Get all invoices (summary)
router.get('/', (req, res) => {
  db.query(
    `SELECT invoices.id, clients.name AS client_name, invoices.date, invoices.total_amount 
     FROM invoices 
     JOIN clients ON invoices.client_id = clients.id`,
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// Get full invoice by ID
router.get('/:id', (req, res) => {
  const invoiceId = req.params.id;

  db.query(
    `SELECT invoices.id, clients.name, clients.email, clients.phone, invoices.date, invoices.total_amount
     FROM invoices 
     JOIN clients ON invoices.client_id = clients.id
     WHERE invoices.id = ?`,
    [invoiceId],
    (err, invoiceResult) => {
      if (err || invoiceResult.length === 0) return res.status(404).json({ message: 'Invoice not found' });

      db.query(
        `SELECT description, quantity, price FROM invoice_items WHERE invoice_id = ?`,
        [invoiceId],
        (err2, itemsResult) => {
          if (err2) return res.status(500).json(err2);

          res.json({
            invoice: invoiceResult[0],
            items: itemsResult
          });
        }
      );
    }
  );
});

export default router; // ✅ Make sure this line is present
