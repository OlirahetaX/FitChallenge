import "./Card1.css";
import React from 'react';



const Card1 = ({ title, description, Handleonclick, name }) => {
  
  return (
    <div className="card" onClick={() => Handleonclick(name, title)}>
      <h2 className="card-title">{title}</h2>
      <h2 className="card-description">{description}</h2>
    </div>
  );
};

export default Card1;