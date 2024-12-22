import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";

const Userdetail = () => {
  const [menu, setMenu] = useState({});
  const param = useParams();

  console.log(param.userId);

  const getMenu = () => {
    axios
      .get()
      .then((res) => {
        setMenu(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMenu();
  });

  return (
    <>
      <Navbar />
      <div>
        <h1>Halaman detail</h1>
        <img style={{ width: "200px" }} src={menu?.imageUrl} />
        <h1>{menu?.name}</h1>
        <p>{menu?.description}</p>
      </div>
    </>
  );
};

export default Userdetail;
