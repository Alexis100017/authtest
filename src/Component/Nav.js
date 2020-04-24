import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Button from "react-bootstrap/Button";

export default function Navbar() {
  return (
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <Link to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  );
}
