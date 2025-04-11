import React, { useEffect, useState } from 'react';
import { API } from '../api';
import { Link } from 'react-router-dom';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    API.get('/invoices').then(res => setInvoices(res.data));
  }, []);

  return (
    <div>
      <h4>All Invoices</h4>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Date</th>
            <th>Total</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.client_name}</td>
              <td>{inv.date}</td>
              <td>₹{inv.total_amount}</td>
              <td><Link to={`/invoice/${inv.id}`}>View</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
