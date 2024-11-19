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
        <header class="absolute inset-x-0 top-0 z-50">
        <nav
          class="flex items-center justify-between p-6 lg:px-8"
          // aria-label="Global"
        >
          <div class="flex lg:flex-1" onClick={() => {
              setSeccion("Principal");
            }}>
            <a style={{cursor: "pointer"}}>Fit</a>
            <p style={{cursor: "pointer"}}>Challenge</p>
          </div>

          <div class="hidden lg:flex lg:gap-x-12">
            <a href="#" class="text-sm/6 font-semibold text-gray-900">
              Equipo
            </a>
            <a href="#" class="text-sm/6 font-semibold text-gray-900">
              Quienes somos
            </a>
            <button className="text-sm/6 font-semibold text-gray-900" onClick={() => {
              setSeccion("Contacto");
            }}>
              Contáctanos
            </button>
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={openSignupModal}
              class="open-modal-button text-sm/6 font-semibold text-gray-900"
            >
              Sign Up
            </button>
            <button
              onClick={openLoginModal}
              class="open-modal-button text-sm/6 font-semibold text-gray-900 ml-6"
            >
              Log in
            </button>
          </div>
        </nav>
      </header>
    );
  }


  export default Navbar;