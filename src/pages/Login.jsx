import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = () => {
    setEmail(e.target.value);
  };
  const handleChangePass = () => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    const payload = {
      username: email,
      password: password,
    };
    //cara panggil api ketika login
    axios
      .post("", payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        localStorage.setItem("token", "abcdefege");
        console.log(err);
      });
  };

  console.log("payload", email, password);
  return (
    <>
      <Navbar />
      <div style={{ marginTop: "150px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ textAlign: "center", marginTop: "55px", marginBottom: "50px" }}>Login to Rentverse</h2>
          <div>
            <ul style={{ listStyle: "none" }}>
              <li>
                <input onChange={handleChangeEmail} placeholder="Email" />
              </li>
              <li>
                <input type="password" onChange={handleChangePass} placeholder="Password" />
              </li>
            </ul>

            <button className="btnlogin" onClick={handleSubmit}>
              Login
            </button>
            <br />
            <br />
            <p>
              Don't have an account?
              <Link className="linkreg" style={{ textDecoration: "none" }} to={"/Register"}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
      <br />
      <footer style={{ textAlign: "center" }}>Copyright © 2024 RentVerse.com All rights reserved.</footer>
    </>
  );
};

export default Login;
