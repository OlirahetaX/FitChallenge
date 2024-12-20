import React from 'react';
import './Footer.css'; 

function Footer({setSeccion}) {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <img
            src="https://static.vecteezy.com/system/resources/previews/014/429/768/non_2x/doodle-freehand-drawing-of-honduras-map-free-png.png" 
            alt="Hecho en Honduras"
            className="footer-map"
          />
        </div>
        <div className="footer-center">
          <h4>Productos</h4>
          <ul>
            <li style={{cursor: "pointer"}}>Rutinas</li>
            <li style={{cursor: "pointer"}}>Ejercicios</li>
          </ul>
        </div>
        <div className="footer-right">
          <h4>Compañía</h4>
          <ul>
            <li style={{cursor: "pointer"}}>Quiénes somos</li>
            <li style={{cursor: "pointer"}}>Equipo</li>
            <li style={{cursor: "pointer"}} onClick={() => {
              setSeccion("Contacto");
            }}>Contáctanos</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright 2024. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#privacy">Privacidad</a>
          <a href="#terms">Términos y condiciones</a>
          <a href="#cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;