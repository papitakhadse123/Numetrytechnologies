import React, { useState } from 'react';
import { API } from '../api';

const ClientForm = () => {
  const [client, setClient] = useState({ name: '', email: '', phone: '' });

  const handleChange = e => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await API.post('/clients', client);
    alert('Client Added');
    setClient({ name: '', email: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h4>Add Client</h4>
      <input className="form-control mb-2" name="name" placeholder="Name" value={client.name} onChange={handleChange} />
      <input className="form-control mb-2" name="email" placeholder="Email" value={client.email} onChange={handleChange} />
      <input className="form-control mb-2" name="phone" placeholder="Phone" value={client.phone} onChange={handleChange} />
      <button className="btn btn-primary">Add Client</button>
    </form>
  );
};

export default ClientForm;
