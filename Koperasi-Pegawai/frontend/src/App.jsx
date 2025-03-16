import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Items from "./pages/Items";
import Customers from "./pages/Customers";
import Transactions from "./pages/Transactions";
import Sales from "./pages/Sales";
import Login from "./pages/Login";
import Register from "./pages/Register";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        {/* Header */}
        <div className="row d-flex justify-content-center">
          <nav className="navbar navbar-expand-lg bg-success navbar-dark text-center w-100">
            <h1 className="navbar-brand mx-auto">Koperasi - Pegawai</h1>
          </nav>
        </div>

        {/* Main Layout */}
        <div className="row">
          {/* Sidebar */}
          <div className="col-2 bg-dark text-light min-vh-100 p-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/items">
                  Items
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/customers">
                  Customers
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/sales">
                  Sales
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/transactions">
                  Transactions
                </Link>
              </li>
            </ul>
          </div>
          {/* Content */}
          <div className="col-10 p-4 bg-light">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/items" element={<Items />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/sales" element={<Sales />} />
            </Routes>
          </div>
        </div>

        {/* Footer */}
        <div className="row">
          <footer className="bg-secondary text-light py-3 text-center w-100">
            <div className="container">
              <p className="mb-0">
                Zixxfr @
                {new Date().toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default App;
