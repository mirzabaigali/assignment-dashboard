import React from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../Pages/CryptoContext";
import "./Header.css";
import Profile from "./Profile";
const Header = () => {
  const { currency, setCurrency, user } = CryptoState();
  return (
    <div className="container shadow p-3 mb-3 rounded">
      <div className="row">
        <div className="col-md-11 d-flex text-primary menu">
          <Link to={"/home"} style={{ textDecoration: "None", fontSize: "25px" }}>
            Crypto
            <small className="text-warning">DashBord</small>
          </Link>
          <select
            name="currency"
            id="currency"
            className="dropdown btn btn-outline-light"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
          </select>
        </div>
        <div className="col-md-1 text-end">
          {user ? (
            <Profile />
          ) : (
            <Link to="/">
              <button className="btn btn-primary">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
