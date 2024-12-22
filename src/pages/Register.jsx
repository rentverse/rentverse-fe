import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeName = () => {
    setName(e.target.value);
  };
  const handleChangeUsername = () => {
    setUsername(e.target.value);
  };
  const handleChangeEmail = () => {
    setEmail(e.target.value);
  };
  const handleChangePass = () => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const payload = {
      name: name,
      username: username,
      password: password,
      email: email,
      roledId: 1,
    };

    //axios
    axios
      .post("https://api.mudoapi.tech/register", payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        localStorage.setItem("token", "abcdefege");
        console.log(err);
      });
  };

  console.log("payload", name, username, password, email);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "150px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ textAlign: "center", marginTop: "15px", marginBottom: "15px" }}>Register</h2>
          <br />
          <ul style={{ listStyle: "none" }}>
            <li>
              <input onChange={handleChangeName} placeholder="Full Name" />
            </li>
            <li>
              <input onChange={handleChangeUsername} placeholder="Username" />
            </li>
            <li>
              <input onChange={handleChangeEmail} placeholder="Email" />
            </li>
            <li>
              <input onChange={handleChangePass} type="password" placeholder="Password" />
            </li>
          </ul>
          <button className="btnlogin" onClick={handleSubmit}>
            Submit
          </button>
          <br />
          <p>
            Already have account?
            <Link className="linkreg" style={{ textDecoration: "none" }} to={"/Login"}>
              Login
            </Link>
          </p>
        </div>
      </div>
      <br />
      <footer style={{ textAlign: "center" }}>Copyright © 2024 RentVerse.com All rights reserved.</footer>
    </>
  );
};

export default Register;
