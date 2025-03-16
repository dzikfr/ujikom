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
          <nav className="navbar navbar-expand-lg bg-primary navbar-dark text-center w-100">
            <h1 className="navbar-brand mx-auto">HEADER</h1>
          </nav>
        </div>

        {/* Navbar */}
        <div className="row">
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark w-100">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Navbar
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      News
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      Dropdown
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Link 1
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Link 2
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Link 3
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        {/* Main Layout */}
        <div className="row">
          {/* Sidebar */}
          <div className="col-2 bg-danger text-light min-vh-100 p-3">
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
          <div className="col-10 p-4 bg-info">
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
          <footer className="bg-warning text-light py-3 text-center w-100">
            <div className="container">
              <p className="mb-0">FOOTER</p>
            </div>
          </footer>
        </div>
      </div>
    </Router>
  );
};

export default App;
