import React from "react";
import "./Rutina.css";
import { useNavigate } from "react-router-dom";
import CircularItem from "../CircularItem/CircularItem";

const RoutineCarousel = ({ exercises, user }) => {
  const validExercises = Array.isArray(exercises) ? exercises : [];

  const handleOnClick = (exercise) => {
    navigate('/Ejercicio', { state: { user, exercise } });
  }
  const navigate = useNavigate()
  return (
    <div className="routine-carousel">
      <div className="routine-header">
        <h2>Rutina de hoy</h2>
        <h2 className="info-arrow">→</h2>
      </div>
      <ul>
        {validExercises.map((exercise) => (
          <CircularItem item={exercise} onclick={handleOnClick}/>
        ))}
      </ul>
    </div>
  );
};

export default RoutineCarousel;
