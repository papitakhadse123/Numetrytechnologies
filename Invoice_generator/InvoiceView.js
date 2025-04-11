import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../api';

const InvoiceView = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/invoices/${id}`).then(res => setData(res.data));
  }, [id]);

  if (!data) return <p>Loading...</p>;

  const { invoice, items } = data;

  return (
    <div>
      <h4>Invoice #{invoice.id}</h4>
      <p><strong>Client:</strong> {invoice.name}</p>
      <p><strong>Email:</strong> {invoice.email}</p>
      <p><strong>Phone:</strong> {invoice.phone}</p>
      <p><strong>Date:</strong> {invoice.date}</p>

      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h5>Total: ₹{invoice.total_amount}</h5>
    </div>
  );
};

export default InvoiceView;
