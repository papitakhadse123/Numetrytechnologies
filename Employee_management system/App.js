// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', position: '', salary: '' });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        const response = await axios.get('/employees');
        setEmployees(response.data);
    };

    const addEmployee = async () => {
        const response = await axios.post('/employees', formData);
        setEmployees([...employees, response.data]);
        setFormData({ name: '', email: '', position: '', salary: '' });
    };

    const deleteEmployee = async (id) => {
        await axios.delete(`/employees/${id}`);
        setEmployees(employees.filter(emp => emp.id !== id));
    };

    return (
        <div>
            <h1>Employee Management System</h1>
            <form onSubmit={(e) => { e.preventDefault(); addEmployee(); }}>
                <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                <input type="text" placeholder="Position" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} required />
                <input type="number" placeholder="Salary" value={formData.salary} onChange={(e) => setFormData({ ...formData, salary: e.target.value })} required />
                <button type="submit">Add Employee</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.position}</td>
                            <td>{emp.salary}</td>
                            <td>
                                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;