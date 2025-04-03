const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ Fetch all products
router.get("/", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            console.error("Error fetching products:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json(results);
    });
});

// ✅ Update a product
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stock } = req.body;

    db.query(
        "UPDATE products SET name=?, description=?, price=?, category=?, stock=? WHERE id=?",
        [name, description, price, category, stock, id],
        (err, result) => {
            if (err) {
                console.error("Error updating product:", err);
                return res.status(500).json({ message: "Database error" });
            }
            res.json({ message: "Product updated successfully!" });
        }
    );
});

// ✅ Delete a product
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    
    db.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
        if (err) {
            console.error("Error deleting product:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json({ message: "Product deleted successfully!" });
    });
});

module.exports = router;
