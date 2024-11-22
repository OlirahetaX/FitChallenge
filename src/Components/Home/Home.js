import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Rutina from "../Rutina/Rutina";
import Retos from "../Retos/Retos";
import Info from "../Info/Info";

const Home = () => {
  const navigate = useNavigate()
  const regresar = () => {
    navigate("/")
  }
  return (
    <div>
      <Sidebar/>
      <Rutina/>
      <Retos/>
      <Info/>
      <button class=" mb-2 bg-blue-500 hover:bg-blue-700 text-white  py-1 px-20 rounded hover:font-bold focus:outline-none focus:shadow-outline"
      onClick={regresar}>
        Regresar
      </button>
    </div>
  );
};

export default Home;