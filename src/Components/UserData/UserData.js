import "./UserData.css";
import backgroundPic from "../../assets/background-pic.png";
import back from "../../assets/back.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Card1 from "./Cards/Card1";

const UserData = () => {
  const [counter, setCounter] = useState(1);
  const navigate = useNavigate();
  const reduceCounter = () => {
    setCounter((prevCounter) => {
      const newCounter = prevCounter - 1;
      if (newCounter === 0) navigate("/"); // Redirigir cuando el contador llegue a 0
      return newCounter;
    });
  };

  const addCounter = () => {
    setCounter((prevCounter) => prevCounter + 1); // Incrementar el contador
  };
  const progressBarWidth = `${(counter / 10) * 100}%`;
  return (
    <div id="principal">
      <header className="header">
        <h1 className="header-title">FitChallenge</h1>
      </header>
      <br />
      <br />
      <br />
      <div className="progress-container">
        <div className="progress-bar" style={{ width: progressBarWidth }}></div>
        <div className="flex mb-3">
          <img src={back} alt="previous-arrow" onClick={reduceCounter} />
          <p>{counter}/10</p>
        </div>

        {counter == 1 && (
          <div>
            <h1 className="titulo">¿Cual es tu objetivo principal?</h1>
            <Card1
              title="Estamos trabajando en esta Ventana🦾🤙 regresar a la ventana principal (Pero ya puedes hacer login con tu cuenta👀)"
              description="Esta es una descripción breve para la tarjeta. Puedes poner cualquier texto aquí."
            />
          </div>
        )}
        {counter == 2 && <h1> este es el 2 </h1>}
      </div>
    </div>
  );
};

export default UserData;
{
  /* <div class="grid">
        <p className="header">FitChallenge</p>

        <div className="article">
          <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              class="bg-blue-600 h-2.5 rounded-full"
              style={{ width: "10%" }}
            ></div>
          </div>
        </div>
      </div> */
}
