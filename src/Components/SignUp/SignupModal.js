import React, { useState } from "react";

import "./SignupModal.css"; // Asegúrate de que tienes el archivo de estilos
import { useNavigate } from "react-router-dom";

const SignupModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validar contraseña cuando se ingresa
    if (name === "password") {
      validatePassword(value);
    }

    // Validar confirmación de contraseña cuando se ingresa
    if (name === "confirmPassword") {
      setConfirmPasswordError(
        value !== formData.password ? "La contraseña no coincide" : ""
      );
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError(
        "La contraseña debe contener al menos una letra mayúscula."
      );
    } else if (!/[a-z]/.test(password)) {
      setPasswordError(
        "La contraseña debe contener al menos una letra minúscula."
      );
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("La contraseña debe contener al menos un número.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordError && !confirmPasswordError) {
      try {
        const response = await fetch("http://localhost:3001/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            correo: formData.email,
            contrasena: formData.password,
          }).toString(),
        });

        // Verificar si la respuesta es exitosa
        if (response.ok) {
          const data = await response.json();
          const uidNewUser = data.result.user.uid
          const userEmail = formData.email
          limpiarForm();
          navigate(`/UserData?uid=${uidNewUser}&email=${userEmail}`)
        } else {
          const errorData = await response.json();
          console.error(errorData.descripcion);
          alert(errorData.descripcion); // Muestra el error del backend
        }
      } catch (error) {
        console.error("Error al crear el usuario:", error);
        alert("Hubo un error al crear el usuario");
      }
    } else {
      alert("Por favor, corrige los errores antes de enviar.");
    }
  };

  const limpiarForm = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
    setPasswordError("");
    setConfirmPasswordError("");
  };
  const cerrarModal = () => {
    limpiarForm();
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={cerrarModal}>
          &times;
        </button>
        <label className="block font-bold text-gray-700 mb-4">Sign Up</label>

        <div className="w-full max-w-xs">
          <form className="px-4 pt-2 pb-2 mb-2" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="text-left block text-gray-700 text-xs font-bold mb-2"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <input
                className="shadow text-xs appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Correo electrónico"
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-left text-gray-700 text-xs font-bold mb-2"
                htmlFor="password"
              >
                Contraseña
              </label>
              <input
                className="shadow appearance-none text-xs border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="**********"
              />
              {passwordError && (
                <p className="text-red-500 text-xs italic">{passwordError}</p>
              )}
            </div>
            <div className="mb-2">
              <label
                className="block text-left text-gray-700 text-xs font-bold mb-2"
                htmlFor="password"
              >
                Confirmar contraseña
              </label>
              <input
                className="shadow appearance-none text-xs border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="**********"
              />
              {confirmPasswordError && (
                <p className="text-red-500 text-xs italic">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <button
              className=" mb-2 bg-blue-500 hover:bg-blue-700 text-white  py-1 px-20 rounded hover:font-bold focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
