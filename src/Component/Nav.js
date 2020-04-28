import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import Button from "react-bootstrap/Button";

class Nav extends React.Component {
  render() {
    const { isAuthenticated, login, logOut } = this.props.auth;
    return (
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <button onClick={isAuthenticated() ? logOut : login}>
            {isAuthenticated() ? "logOut" : "login"}
          </button>
          {}
        </li>
        <li>
          <Link to="/public">Public</Link>
        </li>
        <li>{isAuthenticated() && <Link to="/private">Private</Link>}</li>
      </ul>
    );
  }
}

export default Nav;
