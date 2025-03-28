// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_management'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// POST /employees
app.post('/employees', (req, res) => {
    const { name, email, position, salary } = req.body;
    const sql = 'INSERT INTO employees (name, email, position, salary) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, position, salary], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, name, email, position, salary });
    });
});

// GET /employees
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// PUT /employees/:id
app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, position, salary } = req.body;
    const sql = 'UPDATE employees SET name = ?, email = ?, position = ?, salary = ? WHERE id = ?';
    db.query(sql, [name, email, position, salary, id], (err, result) => {
        if (err) throw err;
        res.send({ id, name, email, position, salary });
    });
});

// DELETE /employees/:id
app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM employees WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Employee deleted' });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});