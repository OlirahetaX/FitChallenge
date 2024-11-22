import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { auth } from "./Components/Firebase/firebaseConfig"
import Landing from "./Components/Landing/Landing";
import Home from "./Components/Home/Home";
import UserData from "./Components/UserData/UserData";

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  useEffect(() => {
    document.title = "FitChallenge";
  }, []);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* <Route index element={<Landing />} /> */}
            <Route index element={<Landing />} />
            <Route path="*" element={<Navigate replace to={"/"} />} />
          </Route>
          <Route path="Home" element={<Home/>} />
          <Route path="UserData" element={<UserData/>} />
          {/* <Route path="SignUp" element={<Signup />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;