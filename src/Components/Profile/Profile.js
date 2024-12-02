import React from "react";
import "./Profile.css";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="profile-error">
        <h2>¡Oops!</h2>
        <p>No se pudo cargar la información del usuario.</p>
      </div>
    );
  }

  return (
    <div className="profile-bg">
      <div className="profile-wrapper">
        <div className="profile-card">
          <div className="profile-avatar">
            <img
              src={`https://ui-avatars.com/api/?name=${user.nombre}+${user.apellido}&background=f5f5f5&color=007bff`}
              alt="Avatar"
            />
          </div>
          <h1 className="profile-card-title">
            {user.nombre} {user.apellido}
          </h1>
          <div className="profile-card-info">
            <p>
              <span>Edad:</span> {user.edad} años
            </p>
            <p>
              <span>Género:</span> {user.genero}
            </p>
            <p>
              <span>Email:</span> {user.email}
            </p>
            <p>
              <span>Peso:</span> {user.peso} Lbs
            </p>
            <p>
              <span>Altura:</span> {user.altura} cm
            </p>
            <p>
              <span>Objetivo:</span> {user.objetivo}
            </p>
            <p>
              <span>Experiencia:</span> {user.experiencia}
            </p>
            <p>
              <span>Días disponibles:</span> {user.dias_disponibles}
            </p>
            <p>
              <span>Ubicación:</span> {user.ubicacion}
            </p>
            <p>
              <span>Complicaciones físicas:</span> {user.condicion_fisica}
            </p>
            <p>
              <span>Tiempo disponible:</span> {user.tiempo_disponible} mins
            </p>
          </div>
          <button
            className="profile-button"
            onClick={() => navigate(`/Home?uid=${user._id}`)}
          >
            🔙 Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
