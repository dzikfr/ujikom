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
    try {
      const res = await axios.get("http://localhost:3000/api/sales");
      setSales(res.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/customers");
      setCustomers(res.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/api/sales/${editingId}`, {
          ...form,
          id_customer: parseInt(form.id_customer), 
        });
      } else {
        await axios.post("http://localhost:3000/api/sales", {
          ...form,
          id_customer: parseInt(form.id_customer),
        });
      }
      setForm({ tgl_sales: "", id_customer: "", do_number: "", status: "" });
      setEditingId(null);
      fetchSales();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEdit = (sale) => {
    setForm({
      tgl_sales: sale.tgl_sales,
      id_customer: sale.id_customer.toString(), 
      do_number: sale.do_number,
      status: sale.status,
    });
    setEditingId(sale.id_sale);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/sales/${id}`);
      fetchSales();
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
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
          {editingId ? "Update Sale" : "Add Sale"}
        </button>
        {editingId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditingId(null);
              setForm({
                tgl_sales: "",
                id_customer: "",
                do_number: "",
                status: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Date</th>
            <th>Customer</th>
            <th>DO Number</th>
            <th>Customer's Address</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => {
            const customer = customers.find(
              (c) => c.id_customer === sale.id_customer
            );
            return (
              <tr key={sale.id_sale}>
                <td>{index + 1}</td>
                <td>
                  {new Date(sale.tgl_sales).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </td>
                <td>{customer ? customer.nama_customer : "Unknown"}</td>
                <td>{sale.do_number}</td>
                <td>{customer ? customer.alamat : "Unknown"}</td>
                <td>
                  <div>Telp : {customer?.telp || "N/A"}</div>
                  <div>Fax : {customer?.fax || "N/A"}</div>
                  <div>Email : {customer?.email || "N/A"}</div>
                </td>
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
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
