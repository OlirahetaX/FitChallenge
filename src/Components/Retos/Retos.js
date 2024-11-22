import React from "react";
import "./Retos.css";  

const ChallengeCarousel = ({ challenges }) => {
  const validChallenges = Array.isArray(challenges) ? challenges : [];

  return (
    <div className="challenge-carousel">
      <div className="challenge-header">
        <h2>Retos de la Comunidad</h2>
        <span className="arrow">→</span>
      </div>

      {validChallenges.length > 0 ? (
        <div className="challenge-list">
          {validChallenges.map((challenge) => (
            <div key={challenge.id} className="challenge-item">
              <div className="challenge-image">
                <img src={challenge.img} alt={challenge.name} />
              </div>
              <p className="challenge-name">{challenge.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-challenges">No hay retos disponibles</p>
      )}
    </div>
  );
};

export default ChallengeCarousel;
