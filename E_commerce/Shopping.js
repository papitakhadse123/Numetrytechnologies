import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const Shopping = () => {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: ""
    });

    // Fetch products from API
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products");
            setProducts(response.data);
            console.log("📦 Products loaded:", response.data);
        } catch (error) {
            console.error("❌ Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle Edit Click
    const handleEditClick = (product) => {
        console.log("📝 Editing product:", product); // Debugging
        setEditProduct(product);
        setShowModal(true);
    };

    // Handle Update Product
    const handleUpdateProduct = async () => {
        if (!editProduct || !editProduct.id) {
            console.error("❌ Error: Missing product ID");
            return;
        }

        console.log("🔄 Updating product ID:", editProduct.id);

        try {
            await axios.put(`http://localhost:5000/api/products/${editProduct.id}`, editProduct);
            fetchProducts(); // Refresh list
            setShowModal(false);
        } catch (error) {
            console.error("❌ Error updating product:", error);
        }
    };

    // Handle Delete Product
    const handleDeleteProduct = async (id) => {
        console.log("🗑️ Deleting product ID:", id); // Debugging

        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("❌ Error deleting product:", error);
        }
    };

    // Handle New Product Input Change
    const handleNewProductChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    // Handle Add New Product
    const handleAddProduct = async (e) => {
        e.preventDefault(); // Prevent form refresh

        try {
            const response = await axios.post("http://localhost:5000/api/products", newProduct);
            console.log("✅ Product Added:", response.data);

            setNewProduct({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: ""
            });

            fetchProducts(); // Refresh list
        } catch (error) {
            console.error("❌ Error adding product:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>🛒 Product List</h2>

            {/* Add Product Form */}
            <div className="card p-3 mb-4">
                <h4>➕ Add Product</h4>
                <Form onSubmit={handleAddProduct}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleNewProductChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={newProduct.description}
                            onChange={handleNewProductChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            name="price"
                            value={newProduct.price}
                            onChange={handleNewProductChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            name="category"
                            value={newProduct.category}
                            onChange={handleNewProductChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number"
                            name="stock"
                            value={newProduct.stock}
                            onChange={handleNewProductChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        ➕ Add Product
                    </Button>
                </Form>
            </div>

            {/* Product Table */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.stock}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleEditClick(product)}>
                                    ✏️ Edit
                                </Button>{" "}
                                <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
                                    🗑️ Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editProduct && (
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editProduct.name}
                                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    value={editProduct.description}
                                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={editProduct.price}
                                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Category</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editProduct.category}
                                    onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={editProduct.stock}
                                    onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        ❌ Close
                    </Button>
                    <Button variant="success" onClick={handleUpdateProduct}>
                        💾 Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Shopping;
