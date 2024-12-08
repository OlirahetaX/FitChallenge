import React, { useState } from "react";
import "./Sidebar.css";
import SidebarButton from "./Sidebar-button/Sidebarbutton";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ user, navigateToProfile, navigateToHelp, handleChagePage }) => {
  const navigate = useNavigate();

  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [activePage, setActivePage] = useState("home"); // Estado para la página activa

  const toggleSidebar = () => {
    setIsSidebarActive(!isSidebarActive);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    handleChagePage(page === "home");
  };

  const regresar = async () => {
    try {
      const response = await fetch("http://localhost:3001/logOut", {
        method: "POST",
      });
      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error(errorData.descripcion);
      }
    } catch (error) {
      alert("Error logging out:", error);
    }
  };

  return (
    <aside
      className={`sidebar ${isSidebarActive ? "sidebar-active" : "custom-sidebar"}`}
    >
      {!isSidebarActive && (
        <>
          <div className="hamburger mb-10" onClick={toggleSidebar}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <nav className="menu-options">
            <div
              className={`menu-item ${activePage === "home" ? "active" : ""}`}
              onClick={() => handlePageChange("home")}
            >
              <i className="menu-icon">★</i>
              <span className="menu-label">Home</span>
            </div>
            <div
              className={`menu-item ${activePage === "rutina" ? "active" : ""}`}
              onClick={() => handlePageChange("rutina")}
            >
              <i className="menu-icon">★</i>
              <span className="menu-label">Rutina</span>
            </div>
          </nav>
        </>
      )}
      {isSidebarActive && (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "50px",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
              alt="User Icon"
              style={{ width: "5rem", height: "5rem", marginRight: "1rem" }}
            />
            <div style={{ textAlign: "center", maxWidth: "10rem" }}>
              <h1 style={{ margin: 0 }}>
                {user.nombre || "Cargando..."} {user.apellido}
              </h1>
              <h2 style={{ fontSize: "0.7rem" }}>{user.email}</h2>
            </div>
            <div className="hamburger ml-8" onClick={toggleSidebar}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <SidebarButton title="Perfil" action={navigateToProfile} />
          <SidebarButton title="Ayuda" action={navigateToHelp} />
          <SidebarButton title="Cerrar sesión" action={regresar} />
        </>
      )}
    </aside>
  );
};

export default Sidebar;
