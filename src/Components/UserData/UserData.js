import "./UserData.css";
import back from "../../assets/back.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card1 from "./Cards/Card1";

const UserData = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const uid = params.get("uid");
  const [formData, setFormData] = useState({
    objetivo: "",
    edad: "",
    genero: "",
    peso: "",
    experiencia: "",
    dias_disponibles: "",
    ubicacion: "",
    condicion_fisica: "",
    tiempo_disponible: "",
    nombre: "",
    apellido: "",
    altura: "",
    id: uid,
  });
  const [edad, setEdad] = useState("");
  const [altura, setaltura] = useState("");
  const [peso, setpeso] = useState("");
  const [condicion_fisica, setcondicion_fisica] = useState("");
  const [tiempo_disponible, setTiempo_disponible] = useState("00:00");
  const [counter, setCounter] = useState(1);
  const [nombre, setnombre] = useState("");
  const [apellido, setapellido] = useState("");

  const [errorEdad, seterrorEdad] = useState(false);
  const [erroraltura, seterroraltura] = useState(false);
  const [errorpeso, seterrorpeso] = useState(false);
  const [errornombre, seterrornombre] = useState(false);
  const [errorapellido, seterrorapellido] = useState(false);

  const navigate = useNavigate();

  const reduceCounter = () => {
    setCounter((prevCounter) => {
      const newCounter = prevCounter - 1;
      if (newCounter === 0) navigate("/"); // Redirigir cuando el contador llegue a 0
      return newCounter;
    });
  };

  const manejarCambioEdad = (e) => {
    setEdad(e.target.value);
  };
  const manejarCambioAltura = (e) => {
    setaltura(e.target.value);
  };
  const manejarCambioPeso = (e) => {
    setpeso(e.target.value);
  };
  const manejarCambioCondicion = (e) => {
    setcondicion_fisica(e.target.value);
  };
  const manejarCambioTiempo = (e) => {
    setTiempo_disponible(e.target.value);
  };
  const manejarCambioNombre = (e) => {
    setnombre(e.target.value);
  };
  const manejarCambioApellido = (e) => {
    setapellido(e.target.value);
  };

  const validarEdad = () => {
    if (edad >= 5 && edad <= 100) {
      seterrorEdad(false);
      Handleonclick("edad", edad);
    } else {
      seterrorEdad(true);
    }
  };
  const validarCondicion = () => {
    let condicion = condicion_fisica;

    if (condicion_fisica === "") {
      condicion = "Ninguna";
      setcondicion_fisica("Ninguna");
    }

    Handleonclick("condicion_fisica", condicion);
  };
  const validarPesoAltura = () => {
    const alturaValida = altura >= 30 && altura <= 300;
    seterroraltura(!alturaValida);

    const pesoValido = peso >= 20 && peso <= 500;
    seterrorpeso(!pesoValido);

    if (alturaValida && pesoValido) {
      Handleonclick("altura", altura);
      reduceCounter();
      Handleonclick("peso", peso);
    }
  };
  const validarTiempo = () => {
    const input = document.getElementById("time");
    const [hours, minutes] = input.value.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes;

    const minTime = 10;
    const maxTime = 5 * 60;

    if (totalMinutes < minTime || totalMinutes > maxTime) {
      alert("Por favor, selecciona un tiempo entre 10 minutos y 5 horas.");
    } else {
      Handleonclick("tiempo_disponible", totalMinutes);
    }
  };
  const validarNombreApellido = () => {
    const nombreValido = nombre.length >= 1;
    seterrornombre(!nombreValido);

    const apellidoValido = apellido.length >= 1;
    seterrorapellido(!apellidoValido);

    if (nombreValido && apellidoValido) {
      Handleonclick("nombre", nombre);
      reduceCounter();
      Handleonclick("apellido", apellido);
    }
  };

  const handleEnd = () => {
    fetch("http://localhost:3001/addUserData", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        objetivo: formData.objetivo,
        edad: formData.edad,
        genero: formData.genero,
        peso: formData.peso,
        experiencia: formData.experiencia,
        dias_disponibles: formData.dias_disponibles,
        ubicacion: formData.ubicacion,
        condicion_fisica: formData.condicion_fisica,
        tiempo_disponible: formData.tiempo_disponible,
        nombre: formData.nombre,
        apellido: formData.apellido,
        altura: formData.altura,
        id: uid,
      }).toString(),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));

    navigate(`/Home?uid=${uid}`);
  };
  const Handleonclick = (name, title) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: title,
    }));
    addCounter();
  };

  useEffect(() => {
    console.log("formData actualizado:", formData);
  }, [formData]);

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
      {counter <= 10 && (
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: progressBarWidth }}
          ></div>
          <div className="flex mb-3">
            <img src={back} alt="previous-arrow" onClick={reduceCounter} />
            <p>{counter}/10</p>
          </div>
          {counter === 1 && (
            <div className="container">
              <h1 className="titulo">¿Cual es tu objetivo principal?</h1>
              <div className="cards-container">
                <Card1
                  title="Mantenimiento"
                  description="Mantenerse saludable y tener buena salud cardiovascular"
                  Handleonclick={Handleonclick}
                  name="objetivo"
                />
                <Card1
                  title="Aumento de Masa Muscular"
                  description="Personas que desean ganar masa muscular y fuerza"
                  Handleonclick={Handleonclick}
                  name="objetivo"
                />
                <Card1
                  title="Definición"
                  description="Reducir la grasa corporal mientras se mantiene la masa muscular"
                  Handleonclick={Handleonclick}
                  name="objetivo"
                />
              </div>
            </div>
          )}
          {counter === 2 && (
            <div className="container">
              <h1 className="titulo">
                ¿Tienes experiencia previa con el ejercicio?
              </h1>
              <div className="cards-container">
                <Card1
                  title="Principiante"
                  description="Sin experiencia previa o con muy poca exposición a rutinas de ejercicio"
                  Handleonclick={Handleonclick}
                  name="experiencia"
                />
                <Card1
                  title="Intermedio"
                  description="Alguna experiencia con el ejercicio y conocimiento básico de técnicas y rutinas"
                  Handleonclick={Handleonclick}
                  name="experiencia"
                />
                <Card1
                  title="Avanzado"
                  description="Amplia experiencia y conocimiento en ejercicios de fuerza, resistencia y otros tipos de entrenamiento"
                  Handleonclick={Handleonclick}
                  name="experiencia"
                />
              </div>
            </div>
          )}
          {counter === 3 && (
            <div className="container">
              <h1 className="titulo">¿Tu genero?</h1>
              <div className="cards-container" style={{ gap: "20px" }}>
                <Card1
                  title="Hombre"
                  description=""
                  Handleonclick={Handleonclick}
                  name="genero"
                />
                <Card1
                  title="Mujer"
                  description=""
                  Handleonclick={Handleonclick}
                  name="genero"
                />
              </div>
            </div>
          )}
          {counter === 4 && (
            <div className="container">
              <h1 className="titulo">¿Cual es tu edad?</h1>
              <div className="flex flex-col items-start">
                <label className="mb-2 text-sm font-medium text-gray-100 subtitulo">
                  Años
                </label>
                <input
                  id="Edad"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={edad}
                  onChange={manejarCambioEdad}
                  className="w-full input-size p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center"
                />
                {errorEdad && (
                  <small className="mt-1 text-red-500">Edad invalida</small>
                )}
                <button
                  className="mt-10 w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg button-size"
                  onClick={validarEdad}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
          {counter === 5 && (
            <div className="container">
              <h1 className="titulo">¿Cual es tu peso y altura?</h1>
              <div className="flex flex-col items-start">
                <label className="mb-2 text-sm font-medium text-gray-100 subtitulo">
                  Altura
                </label>
                <div className="input-wrapper">
                  <input
                    id="altura"
                    type="number"
                    min="30"
                    max="300"
                    step="1"
                    value={altura}
                    onChange={manejarCambioAltura}
                    className="input-field input-size"
                  />
                  <span className="unit">CM</span>
                </div>
                {erroraltura && (
                  <small className="mt-1 text-red-500">Altura invalida</small>
                )}

                <label className="mb-2 text-sm font-medium text-gray-100 subtitulo">
                  Peso
                </label>
                <div className="input-wrapper">
                  <input
                    id="peso"
                    type="number"
                    min="20"
                    max="500"
                    step="1"
                    value={peso}
                    onChange={manejarCambioPeso}
                    className="input-field input-size"
                  />
                  <span className="unit">LBS</span>
                </div>
                {errorpeso && (
                  <small className="mt-1 text-red-500">Peso invalido</small>
                )}

                <button
                  className="mt-10 w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg button-size"
                  onClick={validarPesoAltura}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
          {counter === 6 && (
            <div className="container">
              <h1 className="titulo">
                ¿Cuantos dias a la semana haras ejercicio?
              </h1>
              <div className="cards-container" style={{ gap: "20px" }}>
                <Card1
                  title="1"
                  Handleonclick={Handleonclick}
                  name="dias_disponibles"
                />
                <Card1
                  title="2"
                  Handleonclick={Handleonclick}
                  name="dias_disponibles"
                />
                <Card1
                  title="3"
                  Handleonclick={Handleonclick}
                  name="dias_disponibles"
                />
                <Card1
                  title="4"
                  Handleonclick={Handleonclick}
                  name="dias_disponibles"
                />
                <Card1
                  title="5"
                  Handleonclick={Handleonclick}
                  name="dias_disponibles"
                />
                <Card1
                  title="6"
                  Handleonclick={Handleonclick}
                  name="dias_disponibles"
                />
                <Card1
                  title="7"
                  Handleonclick={Handleonclick}
                  name="dias_disponibles"
                />
              </div>
            </div>
          )}
          {counter === 7 && (
            <div className="container">
              <h1 className="titulo">¿Donde haras ejercicio?</h1>
              <div className="cards-container" style={{ gap: "20px" }}>
                <Card1
                  title="Gimnasio"
                  Handleonclick={Handleonclick}
                  name="ubicacion"
                />
                <Card1
                  title="Casa"
                  Handleonclick={Handleonclick}
                  name="ubicacion"
                />
              </div>
            </div>
          )}
          {counter === 8 && (
            <div className="container">
              <h1 className="titulo">
                ¿Tienes alguna condicion fisica o lesion?
              </h1>
              <div className="flex flex-col items-start">
                <label className="mb-2 font-medium text-gray-100 subtitulo">
                  Si no tienes escribir Ninguna
                </label>
                <input
                  id="condicion_fisica"
                  type="text"
                  maxLength="100"
                  value={condicion_fisica}
                  onChange={manejarCambioCondicion}
                  className="input-size w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ninguna"
                />
                <button
                  className="mt-10 w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg button-size"
                  onClick={validarCondicion}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
          {counter === 9 && (
            <div className="container">
              <h1 className="titulo">
                ¿Cuánto tiempo puedes dedicar a cada sesión?
              </h1>
              <div className="flex flex-col items-start">
                <label className="mb-2 text-sm font-medium text-gray-100 subtitulo">
                  Selecciona tu tiempo:
                </label>

                <form class="max-w-[8rem] mx-auto">
                  <div class="relative">
                    <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="time"
                      id="time"
                      value={tiempo_disponible}
                      onChange={manejarCambioTiempo}
                      class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    />
                  </div>
                </form>
                <button
                  className="mt-10 w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg button-size"
                  onClick={validarTiempo}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
          {counter === 10 && (
            <div className="container">
              <div className="flex flex-col items-start">
                <label className="mb-2 text-sm font-medium text-gray-100 subtitulo">
                  Nombre
                </label>
                <div className="input-wrapper">
                  <input
                    id="nombre"
                    type="text"
                    maxLength="20"
                    value={nombre}
                    onChange={manejarCambioNombre}
                    className="input-field input-size"
                    placeholder="Nombre"
                    required
                  />
                </div>
                {errornombre && (
                  <small className="mt-1 text-red-500">Nombre invalida</small>
                )}

                <label className="mb-2 text-sm font-medium text-gray-100 subtitulo">
                  Apellido
                </label>
                <div className="input-wrapper">
                  <input
                    id="apellido"
                    type="text"
                    maxLength="20"
                    value={apellido}
                    onChange={manejarCambioApellido}
                    className="input-field input-size"
                    placeholder="Apellido"
                    required
                  />
                </div>
                {errorapellido && (
                  <small className="mt-1 text-red-500">Apellido invalida</small>
                )}
                <button
                  className="mt-10 w-full bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg button-size"
                  onClick={validarNombreApellido}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {counter === 11 && (
        <div className="containerbox">
          <div className="box">
            <h2>Felicidades 🎉</h2>
            <p>Es hora de ponerte en forma 💪</p>
            <div className="loading">
              <div className="spinner"></div>
              <span>IA generando rutina...</span>
            </div>
          </div>
          <button
            className="mt-10 w-80 bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg button-size"
            onClick={handleEnd}
          >
            Continuar
          </button>
        </div>
      )}
    </div>
  );
};

export default UserData;
