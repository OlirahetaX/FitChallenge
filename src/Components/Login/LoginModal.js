import React from "react";
import "./LoginModal.css"; // Asegúrate de que tienes el archivo de estilos

const LoginModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div class="content-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
            alt="User Icon"
            style={{ width: "100px", height: "100px" }}
          />
          <label class="block font-bold text-gray-700">Log In</label>
        </div>

        <div class="w-full max-w-xs">
          <form class="px-4 pt-2 pb-2 mb-2">
            <div class="mb-4">
              <label
                class="text-left block text-gray-700 text-xs font-bold mb-2"
                for="email"
              >
                Correo electrónico
              </label>
              <input
                class="shadow text-xs appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Correo electrónico"
              />
            </div>
            <div class="mb-2">
              <label
                class="block text-left text-gray-700 text-xs font-bold mb-2"
                for="password"
              >
                Contraseña
              </label>
              <input
                class="shadow appearance-none text-xs border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="**********"
              />
              <p class="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <a
              class="mb-2 block text-left font-bold text-xs text-blue-500 hover:text-blue-800 hover:underline"
              href="#"
            >
              ¿Olvidaste tu contraseña?
            </a>

            <button
              class=" mb-2 bg-blue-500 hover:bg-blue-700 text-white  py-1 px-20 rounded hover:font-bold focus:outline-none focus:shadow-outline"
              type="button"
            >
              Log In
            </button>

            {/* <p class="text-xs text-left flex">
              ¿No tienes una cuenta?
              <a
                class="block font-bold text-xs text-blue-500 hover:text-blue-800 hover:underline ml-1"
                href="#"
              >
                Sign Up
              </a>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
