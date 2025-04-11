import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './db.js';

import clientRoutes from './routes/clients.js';
import invoiceRoutes from './routes/invoices.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);

const PORT = process.env.PORT || 5000;

db.connect(err => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
});
