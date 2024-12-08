import React, { useEffect, useState } from "react";
import "./Rutina.css";
import { useNavigate } from "react-router-dom";
import CircularItem from "../CircularItem/CircularItem";
import SleepGif from "../../assets/sleep.gif";

const RoutineCarousel = ({ user, dayOfWeek, active }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [musculos, setMusculos] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const routineResponse = await fetch(
          `http://localhost:3001/getRoutine/${user._id}`
        );
        const routineData = await routineResponse.json();

        if (routineData?.sesiones) {
          const currentDaySession = routineData.sesiones[dayOfWeek];

          
          const daysOfWeek = [
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado",
            "Domingo",
          ];
          setDay(daysOfWeek[dayOfWeek]);

          if (currentDaySession?.ejercicios) {
            const exercisesDetails = await Promise.all(
              currentDaySession.ejercicios.map(async (ejercicio) => {
                try {
                  const exerciseResponse = await fetch(
                    `http://localhost:3001/getExercise/${ejercicio.idEjercicio}`
                  );
                  const exerciseData = await exerciseResponse.json();

                  return {
                    ...exerciseData,
                    peso: ejercicio.peso,
                    series: ejercicio.series,
                    repeticiones: ejercicio.repeticiones,
                    descanso: ejercicio.descanso,
                    descripcion: ejercicio.descripcion,
                    terminado: ejercicio.terminado,
                    img: exerciseData.img || "default-image-url.jpg",
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

            setExercises(exercisesDetails.filter(Boolean));
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
  }, [user._id, dayOfWeek]);

  const handleOnClick = (exercise) => {
    if (active) navigate("/Ejercicio", { state: { user, exercise } });
  };

  return (
    <div className="routine-carousel">
      <div className="routine-header">
        <h2>Rutina del {day}</h2>
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
