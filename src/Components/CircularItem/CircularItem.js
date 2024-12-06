import React from "react";
import "./CircularItem.css";
import { useNavigate } from "react-router-dom";
import ExerciseDone from "../../assets/ExerciseDone.png";

const CircularItem = ({ item, onclick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.src) onclick(item.src);
    else onclick(item);
  };

  return (
    <>
      {item.terminado && (
        <div key={item.id} className="item terminado">
          <li>
            <img src={ExerciseDone} alt={item.nombre} />
          </li>
          <span>{item.nombre}</span>
        </div>
      )}
      {!item.terminado && (
        <div key={item.id} className="item" onClick={handleClick}>
          <li>
            <img src={item.img} alt={item.nombre} />
          </li>
          <span>{item.nombre}</span>
        </div>
      )}
    </>
  );
};

export default CircularItem;
