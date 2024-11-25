import React, { useEffect, useState } from "react";
import "./Home.css";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Rutina from "../Rutina/Rutina";
import Retos from "../Retos/Retos";
import Info from "../Info/Info";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const uid = params.get("uid");

  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/${uid}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData); 
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (uid) {
      fetchUserName();
    }
  }, [uid]);

  const regresar = async () => {
    try {
      const response = await fetch("http://localhost:3001/logOut", {
        method: "POST",
      });
      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error(errorData.descripcion);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <h1>Hola, {user.nombre || "Cargando..."}</h1>
      <Sidebar />
      <Rutina />
      <Retos />
      <Info />
      <button
        className="mb-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-20 rounded hover:font-bold focus:outline-none focus:shadow-outline"
        onClick={regresar}
      >
        Regresar
      </button>
    </div>
  );
};

export default Home;
