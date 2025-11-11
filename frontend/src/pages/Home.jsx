import React from 'react';
import { Link } from 'react-router-dom';
import Iridescence from "../components/Iridescence.jsx"; // Ruta corregida
import './Home.css';

function Home() {
  return (
    <div className="home-hero-container">
      {/* Componente Iridescence como fondo */}
      <Iridescence
        color={[0.545, 0.0, 0.0]} // Equivalente a #8B0000 en RGB normalizado
        speed={0.8}
        amplitude={0.05}
        mouseReact={true}
        className="iridescence-background"
      />

      {/* Contenido sobre el fondo */}
      <div className="container text-center text-white content-overlay">
        <h1 className="display-2 fw-bold">CARDIO IA</h1>
        <p className="lead fs-4 mb-4">
          Tu aliado inteligente en la detección temprana del riesgo cardíaco.
        </p>

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