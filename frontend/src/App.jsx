import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa tus componentes de layout
import Header from './components/Header';
import Footer from './components/Footer';

// Importa tus páginas
import Home from './pages/Home'; // <-- 1. IMPORTA LA NUEVA HOME
import About from './pages/About';
import Evaluation from './pages/Evaluation';
import Results from './pages/Results';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="main-content">
        <Routes>
          {/* --- 2. CAMBIA ESTAS RUTAS --- */}

          {/* La ruta principal AHORA es Home */}
          <Route path="/" element={<Home />} />

          {/* La evaluación AHORA vive en /evaluacion */}
          <Route path="/evaluacion" element={<Evaluation />} />

          {/* (Estas rutas probablemente ya las tenías) */}
          <Route path="/nosotros" element={<About />} />
          <Route path="/resultado" element={<Results />} />

        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;