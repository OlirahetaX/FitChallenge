import React from 'react';
import './Contacto.css';

function Contacto() {
  return (
    <div>
      <h1>Contáctanos</h1>
      <form className="contacto-form">
        <input type="text" placeholder="Nombre" name="nombre" required />
        <input type="text" placeholder="Apellido" name="apellido" required />
        <input type="email" placeholder="Correo Electrónico" name="correo" required />
        <input type="tel" placeholder="Teléfono" name="telefono" required />
        <button type="submit">Solicitar Información</button>
      </form>
      <div className="contacto-content">
      </div>
    </div>
  );
}

export default Contacto;