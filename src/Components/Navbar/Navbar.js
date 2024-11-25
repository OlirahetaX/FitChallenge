import React from 'react';
import { useState } from "react";
import LoginModal from "../Login/LoginModal";
import SignupModal from "../SignUp/SignupModal";

function Navbar({setIsLoginOpen, setIsSignupOpen, setSeccion}) {

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };
  const openSignupModal = () => {
    setIsSignupOpen(true);
  };

    return (
        <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          // aria-label="Global"
        >
          <div className="flex lg:flex-1" onClick={() => {
              setSeccion("Principal");
            }}>
            <a style={{cursor: "pointer"}}>Fit</a>
            <p style={{cursor: "pointer"}}>Challenge</p>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Equipo
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
              Quienes somos
            </a>
            <button className="text-sm/6 font-semibold text-gray-900" onClick={() => {
              setSeccion("Contacto");
            }}>
              Contáctanos
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={openSignupModal}
              className="open-modal-button text-sm/6 font-semibold text-gray-900"
            >
              Sign Up
            </button>
            <button
              onClick={openLoginModal}
              className="open-modal-button text-sm/6 font-semibold text-gray-900 ml-6"
            >
              Log in
            </button>
          </div>
        </nav>
      </header>
    );
  }


  export default Navbar;