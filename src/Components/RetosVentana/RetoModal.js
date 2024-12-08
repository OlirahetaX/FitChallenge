import React from "react";
import "./RetoModal.css";

const ChallengeModal = ({ challenge, onClose }) => {
  if (!challenge) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2 className="modal-title">{challenge.nombre_reto}</h2>
        <p className="modal-description">{challenge.descripcion}</p>
        <p className="modal-objective"><strong>Objetivo:</strong> {challenge.objetivo}</p>
        <p className="modal-level"><strong>Nivel:</strong> {challenge.nivel}</p>
        
        <h3 className="sessions-title">Sesiones:</h3>
        <div className="sessions-container">
          {challenge.sesiones.map((session, index) => (
            <div key={index} className="session">
              <h4>{session.dia}</h4>
              <ul className="exercises-list">
                {session.ejercicios.map((exercise, index) => (
                  <li key={index} className="exercise">
                    {exercise.img && (
                      <div className="exercise-image">
                        <img src={exercise.img} alt={exercise.nombre} />
                      </div>
                    )}
                    <p><strong>{exercise.nombre}</strong></p>
                    <p>Series: {exercise.series}</p>
                    <p>Repeticiones: {exercise.repeticiones}</p>
                    <p>Descanso: {exercise.descanso} segundos</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeModal;
