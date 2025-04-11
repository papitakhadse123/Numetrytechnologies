import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClientForm from './components/ClientForm';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import InvoiceView from './components/InvoiceView';

const App = () => (
  <Router>
    <div className="container mt-4">
      <nav className="mb-4">
        <Link to="/" className="btn btn-outline-primary me-2">Home</Link>
        <Link to="/clients" className="btn btn-outline-primary me-2">Add Client</Link>
        <Link to="/invoice" className="btn btn-outline-primary">New Invoice</Link>
      </nav>

      <Routes>
        <Route path="/" element={<InvoiceList />} />
        <Route path="/clients" element={<ClientForm />} />
        <Route path="/invoice" element={<InvoiceForm />} />
        <Route path="/invoice/:id" element={<InvoiceView />} />
      </Routes>
    </div>
  </Router>
);

export default App;
