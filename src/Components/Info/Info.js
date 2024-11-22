import React from 'react';
import './Info.css';

const FitnessInfo = () => {
  const topics = [
    { name: 'Mejores accesorios', img: 'https://pet-fitness.cl/wp-content/uploads/2020/11/fitness.jpg', src: 'https://www.myprotein.es/thezone/entrenamiento/accesorios-de-gimnasio-entrenar/' },
    { name: 'Ejercicios en casa', img: 'https://www.hola.com/horizon/square/0fa7a005e237-entrenar-casa-t.jpg' , src: 'https://www.centrovallereal.com/lifestyle/blog-moda-noticias/los-mejores-ejercicios-mantenerte-forma-desde-casa/'},
    { name: 'Ejercicios con mancuernas', img: 'https://blogscdn.thehut.net/app/uploads/sites/450/2016/02/iStock-602331216opt_hero_1595000227_1596446113.jpg' , src: 'https://www.esquire.com/es/salud-fitness-running/a40541717/mancuernas-mejores-ejercicios/'},
    { name: 'Ganar masa muscular', img: 'https://fitgeneration.es/wp-content/uploads/2023/08/2125864.jpg', src: 'https://www.fitnessrevolucionario.com/ganar-musculo/' },
    { name: 'Los mejores suplementos', img: 'https://universalfitness.com.do/wp-content/uploads/2024/02/suplementos-universalfitness.png', src: 'https://www.fitnessrevolucionario.com/guia-de-suplementos/' },
    { name: 'Importancia del descanso', img: 'https://www.argininaforte.com/images/una-vida-saludable/2024/la-importancia-del-descanso-y-la-recuperacion-en-la-rutina-de-ejercicios.jpg' , src: 'https://www.fitnessrevolucionario.com/sueno-y-descanso/'},
    { name: 'Pérdida de grasa', img: 'https://www.wundertraining.com/wp-content/uploads/2018/07/perder-peso-vs-perder-grasa.jpg', src: 'https://www.fitnessrevolucionario.com/perdida-de-grasa/' }
  ];

  return (
    <div className="info-container">
      <h1>Información importante</h1>
      <ul>
        {topics.map(topic => (
          <div className='info-item' key={topic.name}>
            <li >
              <img onClick={()=>{window.open(topic.src)}} src={topic.img} alt={topic.name} />
            </li>
            <span onClick={()=>{window.open(topic.src)}}>{topic.name}</span>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FitnessInfo;
