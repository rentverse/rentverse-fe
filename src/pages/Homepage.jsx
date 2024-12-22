import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import "./Homepage.css";

const Homepage = () => {
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  const getMenus = () => {
    axios
      .get()
      .then((res) => {
        const data = res?.data?.data?.Data;
        setMenus(data);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDetail = (id) => {
    navigate(`/detail/${id}`);
  };

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="body">
        <div></div>
        <h1 style={{ fontFamily: "sans-serif", fontSize: "xxlarger", textAlign: "center" }}>Welcome to RentVerse</h1>
        <br />
        <h3 style={{ fontFamily: "sans-serif", fontSize: "large", marginLeft: "100px" }}>
          RentVerse adalah platform rental berbasis aplikasi/web yang dirancang untuk mempermudah masyarakat dalam menyewa berbagai jenis barang secara cepat, aman, dan efisien. Dengan mengusung prinsip sharing economy, RentVerse
          menghubungkan penyewa dengan pemilik barang, memberikan manfaat bagi kedua belah pihak serta mendukung keberlanjutan lingkunga <button style={{ color: "blue" }}>Readmore</button>
        </h3>
        <br />
        <br />
        {menus.map((item, key) => (
          <div key={key} style={{ marginButtom: "50px" }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <button onClick={() => handleDetail(item.id)}>Detail</button>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <footer style={{ textAlign: "center", marginBottom: "20px" }}>Copyright © 2024 RentVerse.com All rights reserved.</footer>
    </>
  );
};

export default Homepage;
