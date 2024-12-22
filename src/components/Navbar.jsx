import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div>
      <nav>
        <Link to={"/"} className="title" style={{ textDecoration: "none" }}>
          <h1 style={{ fontSize: "larger" }}>RENTVERSE</h1>
        </Link>
        <ul>
          <li>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <p>About</p>
            </Link>
          </li>
          <li>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <p>Login</p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
