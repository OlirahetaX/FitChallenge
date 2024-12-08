import React, { useEffect, useState } from "react";
import "./Home.css";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Rutina from "../Rutina/Rutina";
import Retos from "../Retos/Retos";
import Info from "../Info/Info";
import profileIcon from "../../assets/profileIcon.png";
import ajustes from "../../assets/ajustes.png";
import ChallengeModal from "../RetosVentana/RetoModal";

const Home = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const uid = params.get("uid");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [Home, setHome] = useState(true);

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

  const openModal = (challenge) => {
    setSelectedChallenge(challenge);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChallenge(null);
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  const handleChagePage = (page) => {
    if (page) setHome(true);
    else setHome(false);
  };

  const getDayForRutina = () => {
    const today = new Date().getDay(); // 0 para domingo, 1 para lunes, etc.
    return today === 0 ? 6 : today; // Si es domingo (0), devolver 7
  };

  const exampleExercises = [
    {
      id: 1,
      nombre: "Press de banca",
      img: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
      descripcion:
        "Este es un muy buen ejercicio elav la aiovunaob VPNOi n OIUoundasod sadv aoibv SIUDNVIO divbaoi",
      descanso: 10,
      categoria: "Pecho",
      series: 4,
      repeticiones: 12,
      peso: 50,
      video: "https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg",
      terminado: false,
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
    // Otros ejercicios...
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
      </div>
      <Sidebar
        user={user}
        navigateToHelp={navigateToHelp}
        handleChagePage={handleChagePage}
        navigateToProfile={navigateToProfile}
      />
      {Home && (
        <div>
          <Rutina user={user} dayOfWeek={getDayForRutina()} active={true} />
          <Retos user={user} openModal={openModal} />
          <Info />
        </div>
      )}
      {Home == false && (
        <div>
          <Rutina user={user} dayOfWeek={0} active={false} />
          <Rutina user={user} dayOfWeek={1} active={false} />
          <Rutina user={user} dayOfWeek={2} active={false} />
          <Rutina user={user} dayOfWeek={3} active={false} />
          <Rutina user={user} dayOfWeek={4} active={false} />
          <Rutina user={user} dayOfWeek={5} active={false} />
          <Rutina user={user} dayOfWeek={6} active={false} />
        </div>
      )}
      {isModalOpen && (
        <ChallengeModal challenge={selectedChallenge} closeModal={closeModal} />
      )}
    </div>
  );
};

export default Home;
