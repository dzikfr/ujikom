import React, { useEffect, useState } from "react";
import axios from "axios";

const Items = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    nama_item: "",
    uom: "",
    harga_beli: "",
    harga_jual: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:3000/api/items");
    setItems(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:3000/api/items/${editId}`, form);
    } else {
      await axios.post("http://localhost:3000/api/items", form);
    }
    setForm({ nama_item: "", uom: "", harga_beli: "", harga_jual: "" });
    setEditId(null);
    fetchItems();
  };

  const handleEdit = (item) => {
    setForm({
      nama_item: item.nama_item,
      uom: item.uom,
      harga_beli: item.harga_beli,
      harga_jual: item.harga_jual,
    });
    setEditId(item.id_item);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Item?"
    );

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/items/${id}`);
        alert("Item deleted successfully!");
        fetchItems();
      } catch (error) {
        console.error("Delete Error:", error.response?.data || error.message);
        alert("Failed to delete Item!");
      }
    }
  };

  return (
    <div className="p-4">
      <h2>Manage Items</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          name="nama_item"
          placeholder="Item Name"
          value={form.nama_item}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          name="uom"
          placeholder="UOM"
          value={form.uom}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          name="harga_beli"
          type="number"
          placeholder="Buying Price"
          value={form.harga_beli}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          name="harga_jual"
          type="number"
          placeholder="Selling Price"
          value={form.harga_jual}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <button type="submit" className="btn btn-primary">
          {editId ? "Update Item" : "Add Item"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditId(null);
              setForm({
                nama_item: "",
                uom: "",
                harga_beli: "",
                harga_jual: "",
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
            <th>ID</th>
            <th>Name</th>
            <th>UOM</th>
            <th>Buying Price</th>
            <th>Selling Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id_item}>
              <td>{item.id_item}</td>
              <td>{item.nama_item}</td>
              <td>{item.uom}</td>
              <td>{item.harga_beli}</td>
              <td>{item.harga_jual}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item.id_item)}
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

export default Items;
