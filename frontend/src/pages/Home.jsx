import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Crearemos este CSS

function Home() {
  return (
    // Contenedor principal para el "Hero" (fondo rojo)
    <div className="home-hero-container">
      {/* Usamos el container de Bootstrap para centrar el contenido */}
      <div className="container text-center text-white">

        <h1 className="display-2 fw-bold">CARDIO IA</h1>
        <p className="lead fs-4 mb-4">
          Tu aliado inteligente en la detección temprana del riesgo cardíaco.
        </p>

        {/* Este es el "Call to Action" (CTA) que lleva a la página de evaluación */}
        <Link
          to="/evaluacion"
          className="btn btn-light btn-lg btn-hero-cta"
        >
          Comenzar Evaluación
        </Link>

        <p className="mt-4">
          O aprende más sobre <Link to="/nosotros" className="text-white fw-bold">nosotros</Link>.
        </p>

      </div>
    </div>
  );
}

export default Home;