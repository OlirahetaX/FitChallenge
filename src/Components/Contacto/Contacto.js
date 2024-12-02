import React, { useRef } from "react";
import "./Contacto.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import back from "../../assets/back.png";

function Contacto() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const uid = params.get("uid");
  const navigate = useNavigate();

  const formRef = useRef(null);

  const handlesubmit = (e) => {
    e.preventDefault();

    toast.success(
      "Su solicitud fue recibida, pronto nos pondremos en contacto",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

    formRef.current.reset();
  };
  const handleBack = () => {
    if (uid == '1') navigate("/");
    else navigate(`/Home?uid=${uid}`);
  };
  return (
    <div id="principalC">
      <header className="headerC">
        <h1 className="headerC-title">FitChallenge</h1>
      </header>

      <div className="contacto-container">
        <br />
        <br />
        <img src={back} alt="previous-arrow" onClick={handleBack} />
        <h1 className="headerC-title ">Contacto</h1>
        <form className="contacto-form" onSubmit={handlesubmit} ref={formRef}>
          <input type="text" placeholder="Nombre" name="nombre" required />
          <input type="text" placeholder="Apellido" name="apellido" required />
          <input
            type="email"
            placeholder="Correo Electrónico"
            name="correo"
            required
          />
          <input
            type="text"
            placeholder="Mensaje"
            maxLength="150"
            name="mensaje"
            required
          />
          <button type="submit">Solicitar Información</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Contacto;
