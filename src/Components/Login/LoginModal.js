import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginModal.css"; // Asegúrate de que tienes el archivo de estilos

const LoginModal = ({ isOpen, onClose, children }) => {
  const navigate = useNavigate();
  const [resetPword, setResetPword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [Error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError(false);
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmitPword = async (e) => {
    e.preventDefault();
    alert("Revisa tu correo(no funciona aun)");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/logIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          correo: formData.email,
          contrasena: formData.password,
        }).toString(),
      });
      if (response.ok) {
        const data = await response.json();
        const uid = data.result.user.uid;
        limpiarForm();

        const response2 = await fetch(
          `http://localhost:3001/checkUser/${uid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response2.status === 200) navigate(`/Home?uid=${uid}`);
        else navigate(`/UserData?uid=${uid}`);
      } else {
        const errorData = await response.json();
        console.error(errorData.descripcion);
        setError(true);
      }
    } catch (error) {}
  };

  const limpiarForm = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const cerrarModal = () => {
    limpiarForm();
    setError(false);
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={cerrarModal}>
          &times;
        </button>
        {!resetPword && (
          <>
            <div class="content-center mb-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
                alt="User Icon"
                style={{ width: "100px", height: "100px" }}
              />
              <label class="block font-bold text-gray-700">Log In</label>
            </div>

            <div class="w-full max-w-xs">
              <form class="px-4 pt-2 pb-2 mb-2" onSubmit={handleSubmit}>
                <div class="mb-4">
                  <label
                    class="text-left block text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Correo electrónico
                  </label>
                  <input
                    class="shadow text-xs appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Correo electrónico"
                  />
                </div>
                <div class="mb-2">
                  <label
                    class="block text-left text-gray-700 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <input
                    class="shadow appearance-none text-xs border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="**********"
                  />
                </div>
                <a
                  class="mb-2 block text-left font-bold text-xs text-blue-500 cursor-pointer hover:text-blue-800 hover:underline"
                  onClick={() => {
                    setResetPword(true);
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </a>

                <button
                  class=" mb-2 bg-blue-500 hover:bg-blue-700 text-white  py-1 px-20 rounded hover:font-bold focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Log In
                </button>
              </form>
            </div>
            {Error && (
              <div
                class="p-2 text-sm text-red-500 rounded-lg bg-red-200 "
                role="alert"
              >
                <span class="font-medium">Datos Incorrectos!</span>
              </div>
            )}
          </>
        )}
        {resetPword && (
          <div class="w-full max-w-xs">
            <label className="block text-xl mt-3 font-bold text-gray-700">
              Ayuda con la contraseña
            </label>
            <label className="block text-xs mt-3 text-gray-700">
              Escribe la dirección de correo electrónico asociado a tu cuenta de
              FitChallenge.
            </label>
            <form class="px-4 pt-2 pb-2 mb-2" onSubmit={handleSubmitPword}>
              <div class="mb-4">
                <label
                  class="text-left block text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Correo electrónico
                </label>
                <input
                  class="shadow text-xs appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email2"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Correo electrónico"
                />
              </div>
              <button
                class=" mb-2 bg-red-500 hover:bg-red-700 text-white  py-1 px-20 rounded hover:font-bold focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Continuar
              </button>
              <a
                class="mb-2 block text-left font-bold text-xs text-blue-500 cursor-pointer hover:text-blue-800 hover:underline"
                onClick={() => {
                  setResetPword(false);
                }}
              >
                Regresar
              </a>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
