const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root", // Change if needed
  database: "blog_management",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

// Fetch All Blogs
app.get("/blogs", (req, res) => {
  db.query("SELECT * FROM blogs", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Add New Blog
app.post("/blogs", (req, res) => {
  const { title, content, author } = req.body;
  db.query("INSERT INTO blogs (title, content, author) VALUES (?, ?, ?)", 
    [title, content, author], 
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, title, content, author });
    }
  );
});

// Update Blog
app.put("/blogs/:id", (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  db.query("UPDATE blogs SET title=?, content=?, author=? WHERE id=?", 
    [title, content, author, id], 
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Blog updated" });
    }
  );
});

// Delete Blog
app.delete("/blogs/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM blogs WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Blog deleted" });
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
