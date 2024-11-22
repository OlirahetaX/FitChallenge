import React from 'react';
import './Info.css';

const FitnessInfo = () => {
  const topics = [
    { name: 'Mejores accesorios', img: 'https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg' },
    { name: 'Ejercicios en casa', img: 'https://www.hola.com/horizon/square/0fa7a005e237-entrenar-casa-t.jpg' },
    { name: 'Ejercicios con mancuernas', img: 'https://blogscdn.thehut.net/app/uploads/sites/450/2016/02/iStock-602331216opt_hero_1595000227_1596446113.jpg' },
    { name: 'Ganar masa muscular', img: 'https://fitgeneration.es/wp-content/uploads/2023/08/2125864.jpg' },
    { name: 'Los mejores suplementos', img: 'https://universalfitness.com.do/wp-content/uploads/2024/02/suplementos-universalfitness.png' },
    { name: 'Importancia del descanso', img: 'https://www.argininaforte.com/images/una-vida-saludable/2024/la-importancia-del-descanso-y-la-recuperacion-en-la-rutina-de-ejercicios.jpg' },
    { name: 'Pérdida de grasa', img: 'https://www.wundertraining.com/wp-content/uploads/2018/07/perder-peso-vs-perder-grasa.jpg' }
  ];

  return (
    <div className="info-container">
      <h1>Información importante</h1>
      <ul>
        {topics.map(topic => (
          <div key={topic.name}>
            <li>
              <img src={topic.img} alt={topic.name} />
            </li>
            <span>{topic.name}</span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FitnessInfo;
