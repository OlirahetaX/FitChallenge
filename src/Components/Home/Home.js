import React, { useEffect, useState } from "react";
// import loading from "../loading.gif";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const regresar = () => {
    navigate("/")
  }
  return (
    <div>
      <button class=" mb-2 bg-blue-500 hover:bg-blue-700 text-white  py-1 px-20 rounded hover:font-bold focus:outline-none focus:shadow-outline"
      onClick={regresar}>
        regresar
      </button>
      <h1> Hola usuario</h1>
    </div>
  );
};

export default Home;
