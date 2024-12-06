import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home/Home";
import UserData from "./Components/UserData/UserData";
import Profile from "./Components/Profile/Profile";
import Settings from "./Components/Settings/Settings";
import Contacto from "./Components/Contacto/Contacto";
import EjercicioPage from "./Components/EjercicioPage/EjercicioPage";

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    document.title = "FitChallenge";
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
            <Route path="*" element={<Navigate replace to={"/"} />} />
          </Route>
          <Route path="Home" element={<Home/>} />
          <Route path="UserData" element={<UserData/>} />
          <Route path="Profile" element={<Profile/>} />
          <Route path="Settings" element={<Settings/>} />
          <Route path="Help" element={<Contacto/>} />
          <Route path="Ejercicio" element={<EjercicioPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;