import React from "react";
import "./Rutina.css";

const RoutineCarousel = ({ exercises }) => {
  const validExercises = Array.isArray(exercises) ? exercises : [];

  return (
    <div className="routine-carousel">
      <div className="routine-header">
        <h2>Rutina de hoy</h2>
        <span className="arrow">→</span>
      </div>

      {validExercises.length > 0 ? (
        <div className="exercise-list">
          {validExercises.map((exercise) => (
            <div key={exercise.id} className="exercise-item">
              <div className="exercise-image">
                <img src={exercise.img} alt={exercise.name} />
              </div>
              <p className="exercise-name">{exercise.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-exercises">No hay ejercicios añadidos</p>
      )}
    </div>
  );
};

export default RoutineCarousel;