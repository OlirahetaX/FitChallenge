import React, { useState, useEffect } from "react";
import "./EjercicioPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

const EjercicioPage = () => {
  const location = useLocation();
  const { exercise, user } = location.state || {};
  const navigate = useNavigate();

  const [seriesCounter, setSeriesCounter] = useState(1);
  const [timeLeft, setTimeLeft] = useState(exercise?.descanso || 0);

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (!toast.isActive("resto-toast")) {
        toast.error("Tu descanso ha terminado", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: "resto-toast",
        });
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  };

  const handleStart = () => {
    if (timeLeft > 0) {
      setIsRunning(true);
    }
  };

  const handleRestart = () => {
    setTimeLeft(exercise.descanso);
    setIsRunning(false);
  };

  const handleNextSerie = () => {
    if (seriesCounter < exercise.series) {
      const nextSeries = seriesCounter + 1;
      setSeriesCounter(nextSeries);
      setTimeLeft(exercise.descanso);
      setIsRunning(false);
    } else {
      fetch(`http://localhost:3001/updateExercise/${exercise.id}`, {
        method: "PATCH",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del servidor:", data);
          navigate(`/Home?uid=${user._id}`);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  if (!exercise) {
    return (
      <div className="exercise-error">
        <h2>¡Oops!</h2>
        <p>No se pudo cargar la información del Ejercicio.</p>
      </div>
    );
  }

  return (
    <div className="exercise-bg">
      <div className="exercise-wrapper">
        <div className="exercise-card">
          <div className="exercise-avatar">
            <img src={exercise.img} alt="Avatar" />
            <div className="title">
              <h1 className="exercise-card-title">{exercise.nombre}</h1>
              <p>
                Serie {seriesCounter} de {exercise.series}
              </p>
            </div>
          </div>

          <div className="exercise-card-info">
            <div className="exercise-info">
              <div className="info-box">
                <h3>Repeticiones</h3>
                <p>{exercise.repeticiones}</p>
              </div>
              <div className="info-box">
                <h3>Peso Sugerido</h3>
                <p>{exercise.peso} Lbs</p>
              </div>
              <div className="info-box">
                <h3>Descanso</h3>
                <p>{exercise.descanso}s</p>
              </div>
            </div>

            <img src={exercise.video} alt="Video del ejercicio" />
            <div className="timer-box">
              <h2>Tiempo de Descanso</h2>
              <h1>{formatTime(timeLeft)}</h1>
              <div className="timer-buttons">
                <button className="start-button" onClick={handleStart}>
                  Iniciar
                </button>
                <button className="restart-button" onClick={handleRestart}>
                  Reiniciar
                </button>
              </div>
            </div>
            <div className="exercise-info">
              <div className="info-box instrucciones">
                <h3>Instrucciones</h3>
                <p>{exercise.descripcion}</p>
              </div>
            </div>
          </div>
          <button className="exercise-button" onClick={handleNextSerie}>
            {seriesCounter < exercise.series
              ? "Siguiente Serie →"
              : "Terminar Ejercicio"}
          </button>
        </div>
      </div>
      <ToastContainer aria-live="assertive" />
    </div>
  );
};

export default EjercicioPage;
