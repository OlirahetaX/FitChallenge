import React, { useEffect, useState } from "react";
import "./Retos.css";  

const ChallengeCarousel = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await fetch("http://localhost:3001/getChallenges"); 
        const data = await response.json();
        setChallenges(data);  
      } catch (error) {
        console.error("Error fetching challenges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div className="challenge-carousel">
      <div className="challenge-header">
        <h2>Retos de la Comunidad</h2>
        <h2 className="challenge-arrow">→</h2>
      </div>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ul className="challenges-list">
          {challenges.map((challenge, index) => (
            <li key={index} className="challenge-item">
              <div className="challenge-image">
                <img src={challenge.img} alt={challenge.nombre} />
              </div>
              <span>{challenge.nombre}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChallengeCarousel;
