import { useState } from "react";
import "./Landing.css";
import LoginModal from "../Login/LoginModal";
import SignupModal from "../SignUp/SignupModal";

function Landing() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };
  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };
  const openSignupModal = () => {
    setIsSignupOpen(true);
  };
  const closeSignupModal = () => {
    setIsSignupOpen(false);
  };

  return (
    <div className="App" >
      <div class="bg-white">
        <header class="absolute inset-x-0 top-0 z-50">
          <nav
            class="flex items-center justify-between p-6 lg:px-8"
            aria-label="Global"
          >
            <div class="flex lg:flex-1">
              <a>Fit</a>
              <p>Challenge</p>
            </div>

            <div class="hidden lg:flex lg:gap-x-12">
              <a href="#" class="text-sm/6 font-semibold text-gray-900">
                Equipo
              </a>
              <a href="#" class="text-sm/6 font-semibold text-gray-900">
                Quienes somos
              </a>
              <a href="#" class="text-sm/6 font-semibold text-gray-900">
                Contáctanos
              </a>
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
        <LoginModal isOpen={isLoginOpen} onClose={closeLoginModal}></LoginModal>
        <SignupModal isOpen={isSignupOpen} onClose={closeSignupModal}/>
      </div>
    </div>
  );
}

export default Landing;
