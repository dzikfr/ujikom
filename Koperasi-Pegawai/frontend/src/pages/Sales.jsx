import React, { useEffect, useState } from "react";
import axios from "axios";

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    tgl_sales: "",
    id_customer: "",
    do_number: "",
    status: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSales();
    fetchCustomers();
  }, []);

  const fetchSales = async () => {
    const res = await axios.get("http://localhost:3000/api/sales");
    setSales(res.data);
  };

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
      await axios.put(`http://localhost:3000/api/sales/${editingId}`, form);
    } else {
      await axios.post("http://localhost:3000/api/sales", form);
    }
    setForm({ tgl_sales: "", id_customer: "", do_number: "", status: "" });
    setEditingId(null);
    fetchSales();
  };

  const handleEdit = (sale) => {
    setForm({
      tgl_sales: sale.tgl_sales,
      id_customer: sale.id_customer,
      do_number: sale.do_number,
      status: sale.status,
    });
    setEditingId(sale.id_sale);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/sales/${id}`);
    fetchSales();
  };

  return (
    <div className="p-4">
      <h2>Manage Sales</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          name="tgl_sales"
          type="date"
          value={form.tgl_sales}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <select
          name="id_customer"
          value={form.id_customer}
          onChange={handleChange}
          className="form-control mb-2"
          required
        >
          <option value="">Select Customer</option>
          {customers.map((cust) => (
            <option key={cust.id_customer} value={cust.id_customer}>
              {cust.nama_customer}
            </option>
          ))}
        </select>
        <input
          name="do_number"
          placeholder="DO Number"
          value={form.do_number}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="form-control mb-2"
          required
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update" : "Add"} Sale
        </button>
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Date</th>
            <th>Customer</th>
            <th>DO Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={sale.id_sale}>
              <td>{index + 1}</td>
              <td>
                {new Date(sale.tgl_sales).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td>
                {customers.find((c) => c.id_customer === sale.id_customer)
                  ?.nama_customer || "Unknown"}
              </td>
              <td>{sale.do_number}</td>
              <td>{sale.status}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(sale)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(sale.id_sale)}
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

export default Sales;
