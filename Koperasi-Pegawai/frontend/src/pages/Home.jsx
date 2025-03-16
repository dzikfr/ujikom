import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({
    total_customers: 0,
    total_items: 0,
    total_sales: 0,
    total_transactions: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/dashboard")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card bg-primary text-white text-center p-3">
            <h4>Total Customers</h4>
            <h2>{data.total_customers}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white text-center p-3">
            <h4>Total Items</h4>
            <h2>{data.total_items}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-white text-center p-3">
            <h4>Total Sales</h4>
            <h2>{data.total_sales}</h2>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-danger text-white text-center p-3">
            <h4>Total Transactions</h4>
            <h2>{data.total_transactions}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
