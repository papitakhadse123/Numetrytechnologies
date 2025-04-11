import React, { useState, useEffect } from 'react';
import { API } from '../api';

const InvoiceForm = () => {
  const [clients, setClients] = useState([]);
  const [invoice, setInvoice] = useState({ client_id: '', date: '', items: [] });

  useEffect(() => {
    API.get('/clients').then(res => setClients(res.data));
  }, []);

  const addItem = () => {
    setInvoice({ ...invoice, items: [...invoice.items, { description: '', quantity: 1, price: 0 }] });
  };

  const updateItem = (index, field, value) => {
    const items = [...invoice.items];
    items[index][field] = field === 'description' ? value : parseFloat(value);
    setInvoice({ ...invoice, items });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post('/invoices', invoice);
    alert('Invoice Created');
    setInvoice({ client_id: '', date: '', items: [] });
  };

  const total = invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Create Invoice</h4>
      <select className="form-control mb-2" value={invoice.client_id} onChange={e => setInvoice({ ...invoice, client_id: e.target.value })}>
        <option value="">Select Client</option>
        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <input type="date" className="form-control mb-2" value={invoice.date} onChange={e => setInvoice({ ...invoice, date: e.target.value })} />

      {invoice.items.map((item, idx) => (
        <div key={idx} className="d-flex mb-2">
          <input className="form-control me-2" placeholder="Description" value={item.description} onChange={e => updateItem(idx, 'description', e.target.value)} />
          <input className="form-control me-2" type="number" placeholder="Qty" value={item.quantity} onChange={e => updateItem(idx, 'quantity', e.target.value)} />
          <input className="form-control me-2" type="number" placeholder="Price" value={item.price} onChange={e => updateItem(idx, 'price', e.target.value)} />
        </div>
      ))}
      <button type="button" className="btn btn-secondary mb-2" onClick={addItem}>+ Add Item</button>
      <div><strong>Total: ₹{total.toFixed(2)}</strong></div>
      <button className="btn btn-success mt-2">Generate Invoice</button>
    </form>
  );
};

export default InvoiceForm;
