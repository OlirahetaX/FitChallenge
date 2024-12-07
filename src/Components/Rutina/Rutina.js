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
        // Paso 1: Obtener la rutina semanal
        const routineResponse = await fetch(
          `http://localhost:3001/getRoutine/${user._id}`
        );
        const routineData = await routineResponse.json();
        if (routineData && routineData.sesiones) {
          const dayOfWeek = new Date().getDay(); // 0: domingo, ..., 6: sábado
          const convertedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
          const currentDaySession = routineData.sesiones[convertedDay - 3];
          setMusculos(currentDaySession.musculos);
          if (currentDaySession && currentDaySession.ejercicios) {
            const exercisesDetailsPromises = currentDaySession.ejercicios.map(
              async (ejercicio) => {
                const exerciseResponse = await fetch(
                  `http://localhost:3001/getExercise/${ejercicio.idEjercicio}`
                );
                const exerciseData = await exerciseResponse.json();
                const ejercicioBase = {
                  categoria: exerciseData.categoria,
                  img: exerciseData.img,
                  nombre: exerciseData.nombre,
                  terminado: exerciseData.terminado,
                  ubicacion: exerciseData.ubicacion,
                  video: exerciseData.video,
                  peso: ejercicio.peso,
                  series: ejercicio.series,
                  repeticiones: ejercicio.repeticiones,
                  descanso: ejercicio.descanso,
                  descripcion: ejercicio.descripcion,
                  id: exerciseData._id,
                };
                return ejercicioBase;
              }
            );

            // Esperamos a que todos los ejercicios estén disponibles
            const exercisesDetails = await Promise.all(
              exercisesDetailsPromises
            );
            setExercises(exercisesDetails); // Guardamos los ejercicios en el estado
          }
        }
      } catch (error) {
        console.error("Error fetching routine or exercises:", error);
      } finally {
        setLoading(false); // Terminamos de cargar los datos
      }
    };

    fetchRoutine();
  }, [user.id]); // Re-fetch si el ID del usuario cambia

  const handleOnClick = (exercise) => {
    navigate("/Ejercicio", { state: { user, exercise } });
  };

  return (
    <div className="routine-carousel">
      <div className="routine-header">
        <h2>Rutina de hoy</h2>
        <h2 className="info-arrow">→</h2>
        <h2 style={{ marginLeft: "3rem", fontWeight: "normal" }}>
          {musculos}
        </h2>
      </div>
      <ul>
        {loading && <div>Cargando...</div>}
        {exercises.length > 0 ? (
          exercises.map((exercise, index) => (
            <CircularItem key={index} item={exercise} onclick={handleOnClick} />
          ))
        ) : (
          <img src={SleepGif} alt="Sleeping..." />
        )}
      </ul>
    </div>
  );
};

export default RoutineCarousel;


//cambiar en la base de datos que el atributo terminado este en lo que devuelve la ia y no en el otro
