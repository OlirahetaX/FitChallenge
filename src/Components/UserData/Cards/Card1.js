import "./Card1.css";
import React from 'react';



const Card1 = ({ title, description }) => {
  
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card1;