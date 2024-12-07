import React, { useEffect, useState } from "react";
import "./Home.css";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Rutina from "../Rutina/Rutina";
import Retos from "../Retos/Retos";
import Info from "../Info/Info";
import profileIcon from "../../assets/profileIcon.png";
import ajustes from "../../assets/ajustes.png";

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const uid = params.get("uid");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`http://localhost:3001/user/${uid}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setLoading(false);
        } else {
          // console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        // console.error("Error fetching user data:", error);
      }
    };

    if (uid) {
      fetchUserName();
    }
  }, [uid]);

  const navigateToProfile = () => {
    navigate("/Profile", { state: { user } });
  };
  const navigateToSettings = () => {
    navigate("/Settings", { state: { user } });
  };

  const navigateToHelp = () => {
    navigate(`/Help?uid=${uid}`);
  };
  if (loading) {
    return <div className="loader"></div>; // Puedes poner un spinner o cualquier indicativo de carga
  }

  const exampleExercises = [
    {
      //los que tienen // se guarda en la bd y los que no los da la ia
      id: 1, //
      nombre: "Press de banca", //
      ubicacion: "casa", //
      img: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg", //
      descripcion:
        "Este es un muy buen ejercicio elav la aiovunaob VPNOi n OIUoundasod sadv aoibv SIUDNVIO divbaoi",
      descanso: 10,
      categoria: "Pecho", //
      series: 4,
      repeticiones: 12,
      peso: 50,
      video: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg", //
      terminado: false, //
    },
    {
      id: 2,
      nombre: "Flexiones",
      img: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
      descripcion:
        "Este es un muy buen ejercicio elav la aiovunaob VPNOi n OIUoundasod sadv aoibv SIUDNVIO divbaoi",
      descanso: 10,
      categoria: "Pecho",
      series: 4,
      repeticiones: 12,
      peso: 50,
      video: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
      terminado: true,
    },
    {
      id: 3,
      nombre: "Plancha",
      img: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
    },
    {
      id: 4,
      nombre: "Burpees",
      img: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
    },
    {
      id: 5,
      nombre: "Zancadas",
      img: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
    },
    {
      id: 3,
      nombre: "Plancha",
      img: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
    },
    {
      id: 4,
      nombre: "Burpees",
      img: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
    },
    {
      id: 5,
      nombre: "Zancadas",
      img: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
    },
    {
      id: 3,
      nombre: "Plancha",
      img: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
    },
    {
      id: 4,
      nombre: "Burpees",
      img: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
    },
    {
      id: 5,
      nombre: "Zancadas",
      img: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
    },
  ];

  return (
    <div className="Home-bg">
      <div className="flex">
        <img
          className="img-profile"
          src={profileIcon}
          alt="Profile Icon"
          onClick={navigateToProfile}
        />
        <img
          className="img-profile img-ajustes"
          src={ajustes}
          alt="ajustes Icon"
          onClick={navigateToSettings}
        />
      </div>
      <Sidebar
        user={user}
        navigateToHelp={navigateToHelp}
        navigateToSettings={navigateToSettings}
        navigateToProfile={navigateToProfile}
      />
      <Rutina user={user} />
      <Retos challenges={exampleExercises} />
      <Info />
    </div>
  );
};

export default Home;
