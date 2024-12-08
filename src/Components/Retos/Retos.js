import React, { useEffect, useState } from "react";
import ChallengeModal from "../RetosVentana/RetoModal";
import "./Retos.css";

const ChallengeCarousel = ({ user }) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const fetchChallenges = async () => {
    try {
      const response = await fetch(`http://localhost:3001/getChallenges`);
      const data = await response.json();

      const updatedChallenges = await Promise.all(
        data.map(async (challenge) => {
          const imageUrl = await fetchPixabayImage(challenge);
          return { ...challenge, img: imageUrl || "default-image-url.jpg" };
        })
      );

      setChallenges(updatedChallenges);
    } catch (error) {
      console.error("Error fetching challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchChallenges();
    }
  }, [user._id]);

  const fetchPixabayImage = async (reto) => {
    try {
      const query = `${reto.nombre_reto} exercise workout fitness`;
      const response = await fetch(
        `https://pixabay.com/api/?key=47517999-cd0e11c0cb362a0f64b6b9296&q=${query}&image_type=photo`
      );
      const data = await response.json();

      if (data.hits.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.hits.length);
        return data.hits[randomIndex].webformatURL;
      } else {
        return "default-image-url.jpg";
      }
    } catch (error) {
      console.error("Error fetching image from Pixabay:", error);
      return "default-image-url.jpg";
    }
  };

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedChallenge(null);
  };

  const createReto = async () => {
    setCreating(true);
    setChallenges([]); // Elimina los retos antes de mostrar la animación
    const retoData = {
      idUsuario: user._id,
      nombre: user.nombre,
      apellido: user.apellido,
      objetivo: user.objetivo,
      edad: user.edad,
      genero: user.genero,
      peso: user.peso,
      experiencia: user.experiencia,
      dias_disponibles: user.dias_disponibles,
      ubicacion: user.ubicacion,
      condicion_fisica: user.condicion_fisica,
      tiempo_disponible: user.tiempo_disponible,
      altura: user.altura,
    };

    try {
      const response = await fetch("http://localhost:3001/crearReto", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(retoData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Reto creado:", data);
      } else {
        console.error("Error al crear reto:", data);
        alert("Hubo un error al crear el reto.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Error al crear el reto.");
    }
    fetchChallenges();
    setCreating(false); // Vuelve a permitir la creación de retos
  };

  return (
    <div className="challenge-carousel">
      <div className="challenge-header">
        <h2>Retos de la Comunidad</h2>
        <h2 className="challenge-arrow">→</h2>
        <button className="Reto-button" onClick={createReto}>
          Crear Reto
        </button>
      </div>

      {creating ? (
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      ) : loading ? (
        <div>Cargando...</div>
      ) : (
        <div className="challenges-list-wrapper">
          <ul className="challenges-list">
            {challenges.length > 0 ? (
              challenges.map((challenge, index) => (
                <li
                  key={index}
                  className="challenge-item"
                  onClick={() => handleChallengeClick(challenge)}
                >
                  <div className="challenge-image">
                    <img src={challenge.img} alt={challenge.nombre_reto} />
                  </div>
                  <div className="challenge-name">{challenge.nombre_reto}</div>
                </li>
              ))
            ) : (
              <div>No se encontraron retos.</div>
            )}
          </ul>
        </div>
      )}

      {modalOpen && (
        <ChallengeModal challenge={selectedChallenge} onClose={closeModal} />
      )}
    </div>
  );
};

export default ChallengeCarousel;
