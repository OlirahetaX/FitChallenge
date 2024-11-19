import { useState, useEffect } from "react";
import "./Landing.css";
import LoginModal from "../Login/LoginModal";
import SignupModal from "../SignUp/SignupModal";
import backgroundPic from "../../assets/background-pic.png";
import Footer from "../Footer/Footer"
import Contacto from "../Contacto/Contacto";
import Navbar from "../Navbar/Navbar";

const Landing = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };
  const closeSignupModal = () => {
    setIsSignupOpen(false);
  };
  const openSignupModal = () => {
    setIsSignupOpen(true);
  };

  const [seccion, setSeccion] = useState("Principal");

  function mostrarContenido() {
    switch (seccion) {
      case "Contacto": {
        return <Contacto />;
      }
      default: {
        return (
          <div>
            <h1>Hacer ejercicio nunca ha sido tan fácil</h1>
            <p className="texto mt-3">
              Nuestra misión es impulsar a jóvenes y adultos jóvenes a llevar
              una vida más activa y saludable a través de rutinas de ejercicio
              personalizadas. Entendemos los desafíos que presenta la falta de
              actividad física en el estilo de vida moderno y, por eso, creamos
              planes adaptados a las necesidades, metas y niveles de cada
              persona.{" "}
            </p>
            <button
              class="textoButton mt-9 bg-orange-500 hover:bg-orange-700 text-white py-3 px-10 rounded hover:font-bold focus:outline-none focus:shadow-outline"
              type="button" onClick={openSignupModal}
            >
              Comenzar &gt;
            </button>
          </div>);
      }
    }
  }

  useEffect(() => {
    console.log("hola");
  }, [seccion]);

  return (
    <div>
      <Navbar setIsLoginOpen={setIsLoginOpen} setIsSignupOpen={setIsSignupOpen} setSeccion={setSeccion} />
      <div className="App">
        <div class="bg-white">
          <div className="bg-image">
            <img src={backgroundPic} alt="Background" />
            <div className="text-overlay" id="Principal">
              {mostrarContenido(seccion)}

            </div>

          </div>
          <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal}></LoginModal>
          <SignupModal isOpen={isSignupOpen} onClose={closeSignupModal} />
          <Footer setSeccion={setSeccion}/>
        </div>
      </div>
    </div>
  );
}
export default Landing;