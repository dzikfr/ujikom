import React, { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    nama_customer: "",
    alamat: "",
    telp: "",
    fax: "",
    email: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:3000/api/customers");
    setCustomers(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`http://localhost:3000/api/customers/${editingId}`, form);
    } else {
      await axios.post("http://localhost:3000/api/customers", form);
    }
    setForm({ nama_customer: "", alamat: "", telp: "", fax: "", email: "" });
    setEditingId(null);
    fetchCustomers();
  };

  const handleEdit = (customer) => {
    setForm(customer);
    setEditingId(customer.id_customer);
  };

  const handleCancelEdit = () => {
    setForm({ nama_customer: "", alamat: "", telp: "", fax: "", email: "" });
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/customers/${id}`);
    fetchCustomers();
  };

  return (
    <div className="p-4">
      <h2>Manage Customers</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          name="nama_customer"
          placeholder="Customer Name"
          value={form.nama_customer}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          name="alamat"
          placeholder="Address"
          value={form.alamat}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          name="telp"
          placeholder="Phone"
          value={form.telp}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          name="fax"
          placeholder="Fax"
          value={form.fax}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update Customer" : "Add Customer"}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Fax</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id_customer}>
              <td>{customer.id_customer}</td>
              <td>{customer.nama_customer}</td>
              <td>{customer.alamat}</td>
              <td>{customer.telp}</td>
              <td>{customer.fax}</td>
              <td>{customer.email}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(customer)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(customer.id_customer)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
