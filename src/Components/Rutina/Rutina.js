import React, { useEffect, useState } from "react";
import "./Rutina.css";
import { useNavigate } from "react-router-dom";
import CircularItem from "../CircularItem/CircularItem";
import SleepGif from "../../assets/sleep.gif";

const RoutineCarousel = ({ user }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [musculos, setMusculos] = useState("");

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const routineResponse = await fetch(
          `http://localhost:3001/getRoutine/${user._id}`
        );
        const routineData = await routineResponse.json();

        if (routineData?.sesiones) {
          const dayOfWeek = new Date().getDay();
          const convertedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
          const currentDaySession = routineData.sesiones[convertedDay - 3];

          if (currentDaySession?.ejercicios) {
            const exercisesDetails = await Promise.all(
              currentDaySession.ejercicios.map(async (ejercicio) => {
                try {
                  const exerciseResponse = await fetch(
                    `http://localhost:3001/getExercise/${ejercicio.idEjercicio}`
                  );
                  const exerciseData = await exerciseResponse.json();
                  // Añadir la imagen del ejercicio desde Pixabay
                  const imageUrl = await fetchPixabayImage(exerciseData.nombre);
                  return {
                    ...exerciseData,
                    peso: ejercicio.peso,
                    series: ejercicio.series,
                    repeticiones: ejercicio.repeticiones,
                    descanso: ejercicio.descanso,
                    descripcion: ejercicio.descripcion,
                    terminado: ejercicio.terminado,
                    img: imageUrl || "default-image-url.jpg", 
                  };
                } catch (err) {
                  console.error(
                    `Error fetching exercise ${ejercicio.idEjercicio}:`,
                    err
                  );
                  return null; 
                }
              })
            );

            setExercises(exercisesDetails.filter(Boolean)); // Filtra los nulos
            setMusculos(currentDaySession.musculos);
          }
        }
      } catch (error) {
        console.error("Error fetching routine:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutine();
  }, [user._id]);

  const fetchPixabayImage = async (exerciseName) => {
    try {
      const query = `${exerciseName} exercise workout fitness`;  
      const response = await fetch(`https://pixabay.com/api/?key=47517999-cd0e11c0cb362a0f64b6b9296&q=${query}&image_type=photo`);
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

  const handleOnClick = (exercise) => {
    navigate("/Ejercicio", { state: { user, exercise } });
  };

  return (
    <div className="routine-carousel">
      <div className="routine-header">
        <h2>Rutina de hoy</h2>
        <h2 className="info-arrow">→</h2>
        <h2 style={{ marginLeft: "3rem", fontWeight: "normal" }}>{musculos}</h2>
      </div>
      <ul className={exercises.length === 0 ? "routine-carousel-centered" : ""}>
        {loading && <div>Cargando...</div>}
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <CircularItem key={index} item={exercise} onclick={handleOnClick} />
          ))
        ) : (
          <img id="SleepingImg" src={SleepGif} alt="Sleeping..." />
        )}
      </ul>
    </div>
  );
};

export default RoutineCarousel;
