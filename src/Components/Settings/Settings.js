import React, { useEffect, useState } from "react";
import "./Settings.css";
import { useLocation, useNavigate } from "react-router-dom";

const Settings = () => {
  const location = useLocation();
  const { user } = location.state || {};

  const navigate = useNavigate();
  return (
    <div>
      <h1>Hola, {user.apellido}</h1>
      <button
        onClick={() => {
            navigate(`/Home?uid=${user._id}`);
        }}
      >
        regresar
      </button>
    </div>
  );
};

export default Settings;
