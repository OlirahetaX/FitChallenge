import React from "react";
import "./Retos.css";  

const ChallengeCarousel = ({ challenges }) => {
  const validChallenges = Array.isArray(challenges) ? challenges : [];

  return (
    <div className="challenge-carousel">
      <div className="challenge-header">
        <h2>Retos de la Comunidad</h2>
        <h2 className="challenge-arrow">→</h2>
      </div>
      <ul>
        {validChallenges.map((challenge, index) => (
          <div key={index} className="exercise-item">
            <li>
              <img src={challenge.img} alt={challenge.nombre} />
            </li>
            <span>{challenge.nombre}</span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeCarousel;
