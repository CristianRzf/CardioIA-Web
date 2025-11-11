import React from 'react';
import './About.css'; // Importamos su CSS

function About() {
  return (
    // Usamos 'container' de Bootstrap y tus clases
    <div className="page-container container about-container">
      <h2 className="text-center">Nosotros</h2>
      <p>
        CardioIA es una aplicación web basada en Inteligencia Artificial y Aprendizaje
        Automático diseñada para analizar datos clínicos y personales, identificando de forma
        temprana el riesgo de enfermedades cardíacas.
      </p>
      <p>
        Su objetivo es mejorar la precisión diagnóstica, optimizar la gestión médica y
        promover la prevención cardiovascular mediante una interfaz accesible, segura y fácil
        de usar.
      </p>
      <p>
        CardioIA representa un paso hacia el futuro de la salud digital, combinando
        tecnología, ética e innovación para cuidar tu corazón.
      </p>
    </div>
  );
}

export default About;