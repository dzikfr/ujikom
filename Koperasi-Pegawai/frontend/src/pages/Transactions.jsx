import React, { useEffect, useState } from "react";
import axios from "axios";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    id_item: "",
    quantity: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTransactions();
    fetchItems();
  }, []);

  const fetchTransactions = async () => {
    const res = await axios.get("http://localhost:3000/api/transactions");
    setTransactions(res.data);
  };

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:3000/api/items");
    setItems(res.data);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID").format(number);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (e) => {
    const selectedItem = items.find(
      (item) => item.id_item === parseInt(e.target.value)
    );
    setForm({
      ...form,
      id_item: e.target.value,
      price: selectedItem ? selectedItem.harga_jual : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(
        `http://localhost:3000/api/transactions/${editingId}`,
        form
      );
    } else {
      await axios.post("http://localhost:3000/api/transactions", form);
    }
    setForm({ id_item: "", quantity: "", price: "" });
    setEditingId(null);
    fetchTransactions();
  };

  const handleEdit = (transaction) => {
    setForm({
      id_item: transaction.id_item,
      quantity: transaction.quantity,
      price: transaction.price,
    });
    setEditingId(transaction.id_transaction);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/api/transactions/${id}`);
    fetchTransactions();
  };

  return (
    <div className="p-4">
      <h2>Manage Transactions</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <select
          name="id_item"
          value={form.id_item}
          onChange={handleItemChange}
          className="form-control mb-2"
          required
        >
          <option value="">Select Item</option>
          {items.map((item) => (
            <option key={item.id_item} value={item.id_item}>
              {item.nama_item} ({item.uom})
            </option>
          ))}
        </select>
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="form-control mb-2"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="form-control mb-2"
          required
          readOnly
        />
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update" : "Add"} Transaction
        </button>
      </form>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item</th>
            <th>UOM</th>
            <th>Buy Price</th>
            <th>Sell Price</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id_transaction}>
              <td>{transaction.id_transaction}</td>
              <td>
                {items.find((i) => i.id_item === transaction.id_item)
                  ?.nama_item || "Unknown"}
              </td>
              <td>{transaction.uom}</td>
              <td>Rp {formatRupiah(transaction.harga_beli)}</td>
              <td>Rp {formatRupiah(transaction.harga_jual)}</td>
              <td>{transaction.quantity}</td>
              <td>Rp {formatRupiah(transaction.price)}</td>
              <td>Rp {formatRupiah(transaction.amount)}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(transaction)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(transaction.id_transaction)}
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

export default Transaction;
