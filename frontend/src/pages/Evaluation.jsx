// src/pages/Evaluation.jsx (Versión Híbrida - Bootstrap CDN + CSS Personalizado)

import React, { useState } from 'react';
import { submitEvaluation } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Evaluation.css'; // Importa tu CSS personalizado

function Evaluation() {
  const navigate = useNavigate(); // Hook para redirigir
  const [consentido, setConsentido] = useState(false); // Estado para el consentimiento

  // --- Tus 15 Estados para el formulario ---
  const [edad, setEdad] = useState('');
  const [sexo, setSexo] = useState('1');
  const [colesterol, setColesterol] = useState('');
  const [presion, setPresion] = useState('');
  const [frecuenciaCardiaca, setFrecuenciaCardiaca] = useState('');
  const [fumador, setFumador] = useState('1');
  const [alcohol, setAlcohol] = useState('1');
  const [horasEjercicio, setHorasEjercicio] = useState('');
  const [historialFamiliar, setHistorialFamiliar] = useState('1');
  const [diabetes, setDiabetes] = useState('1');
  const [obesidad, setObesidad] = useState('1');
  const [estres, setEstres] = useState('');
  const [azucar, setAzucar] = useState('');
  const [angina, setAngina] = useState('1');
  const [tipoDolorPecho, setTipoDolorPecho] = useState('1');

  // --- Estados para la UI ---
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Manejador del envío del formulario ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = {
      edad: Number(edad),
      sexo: Number(sexo),
      colesterol: Number(colesterol),
      presion_arterial: Number(presion),
      frecuencia_cardiaca: Number(frecuenciaCardiaca),
      fumador: Number(fumador),
      consumo_alcohol: Number(alcohol),
      horas_ejercicio: Number(horasEjercicio),
      historial_familiar: Number(historialFamiliar),
      diabetes: Number(diabetes),
      obesidad: Number(obesidad),
      nivel_estres: Number(estres),
      nivel_azucar: Number(azucar),
      angina_inducida_ejercicio: Number(angina), // Cuidado aquí, verifica el nombre en tu backend
      tipo_dolor_pecho: Number(tipoDolorPecho)
    };

    try {
      const resultado = await submitEvaluation(formData);
      sessionStorage.setItem('cardioResult', JSON.stringify(resultado));
      navigate('/resultado');
    } catch (err) {
      setError(err.message || "Hubo un error al procesar la evaluación.");
      console.error(err);
      setIsLoading(false);
    }
  };

  // --- Renderizado del componente (JSX Híbrido) ---
  return (
    // Añadimos la clase 'container' de Bootstrap
    <div className="page-container evaluation-container container">

      {/* --- PANTALLA DE CONSENTIMIENTO --- */}
      {!consentido && (
        <div className="disclaimer">
          <h2>Evaluación de Riesgo</h2>
          <p>
            En CardioIA protegemos tu información. Los datos que ingreses se usarán
            únicamente para analizar el riesgo con fines educativos y preventivos.
            No compartimos tu información con terceros.
          </p>
          <p>
            Al hacer clic en "Acepto", autorizas el tratamiento de tus datos.
            Esta herramienta no reemplaza un diagnóstico médico formal.
          </p>
          <div className="consent-buttons">
            {/* Clases de Bootstrap + Clases personalizadas */}
            <button
              className="btn btn-lg btn-submit"
              onClick={() => setConsentido(true)}>
              Acepto
            </button>
            <button
              className="btn btn-lg btn-clear"
              onClick={() => navigate('/')}>
              No Acepto
            </button>
          </div>
        </div>
      )}

      {/* --- FORMULARIO DE EVALUACIÓN --- */}
      {consentido && (
        // Mantenemos tu .form-wrapper (para el borde rojo)
        <div className="form-wrapper">
          <h2>Nuevo Paciente</h2>
          <form onSubmit={handleSubmit}>

            {/* Usamos el grid de Bootstrap (row) en lugar de tu .form-grid */}
            <div className="row g-3"> {/* g-3 añade espacio */}

              {/* --- Grupo 1 --- */}
              {/* Usamos 'col-md-4' para 3 columnas en desktop */}
              <div className="col-md-4">
                {/* Mantenemos tu .form-group */}
                <div className="form-group">
                  <label htmlFor="edad" className="form-label">Edad</label>
                  {/* Usamos 'form-control' de Bootstrap */}
                  <input type="number" id="edad" className="form-control" value={edad} onChange={(e) => setEdad(e.target.value)} required />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="sexo" className="form-label">Sexo</label>
                  {/* Usamos 'form-select' de Bootstrap */}
                  <select id="sexo" className="form-select" value={sexo} onChange={(e) => setSexo(e.target.value)}>
                    <option value="1">Masculino</option>
                    <option value="0">Femenino</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="tipoDolorPecho" className="form-label">Tipo de Dolor de Pecho (cp)</label>
                  <select id="tipoDolorPecho" className="form-select" value={tipoDolorPecho} onChange={(e) => setTipoDolorPecho(e.target.value)}>
                    <option value="0">Angina Típica</option>
                    <option value="1">Angina Atípica</option>
                    <option value="2">Dolor No Anginoso</option>
                    <option value="3">Asintomático</option>
                  </select>
                </div>
              </div>

              {/* --- Grupo 2 --- */}
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="presion" className="form-label">Presión Arterial (reposo)</label>
                  <input type="number" id="presion" className="form-control" value={presion} onChange={(e) => setPresion(e.target.value)} required />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="colesterol" className="form-label">Colesterol Sérico (mg/dl)</label>
                  <input type="number" id="colesterol" className="form-control" value={colesterol} onChange={(e) => setColesterol(e.target.value)} required />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="azucar" className="form-label">Nivel de Azúcar (en ayunas)</label>
                  <input type="number" id="azucar" className="form-control" value={azucar} onChange={(e) => setAzucar(e.target.value)} required />
                </div>
              </div>

              {/* --- Grupo 3 --- */}
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="frecuenciaCardiaca" className="form-label">Frecuencia Cardíaca Máx.</label>
                  <input type="number" id="frecuenciaCardiaca" className="form-control" value={frecuenciaCardiaca} onChange={(e) => setFrecuenciaCardiaca(e.target.value)} required />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="estres" className="form-label">Nivel de Estrés (1-10)</label>
                  <input type="number" id="estres" className="form-control" min="1" max="10" value={estres} onChange={(e) => setEstres(e.target.value)} required />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="horasEjercicio" className="form-label">Horas de Ejercicio (sem.)</label>
                  <input type="number" id="horasEjercicio" className="form-control" value={horasEjercicio} onChange={(e) => setHorasEjercicio(e.target.value)} required />
                </div>
              </div>

              {/* --- Grupo 4 --- */}
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="fumador" className="form-label">¿Fumador?</label>
                  <select id="fumador" className="form-select" value={fumador} onChange={(e) => setFumador(e.target.value)}>
                    <option value="1">Sí (Actual)</option>
                    <option value="0">No (Nunca)</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="alcohol" className="form-label">Consumo de Alcohol</label>
                  <select id="alcohol" className="form-select" value={alcohol} onChange={(e) => setAlcohol(e.target.value)}>
                    <option value="1">Frecuente / Alto</option>
                    <option value="0">Ocasional / Nulo</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="historialFamiliar" className="form-label">Historial Familiar</label>
                  <select id="historialFamiliar" className="form-select" value={historialFamiliar} onChange={(e) => setHistorialFamiliar(e.target.value)}>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>

              {/* --- Grupo 5 --- */}
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="diabetes" className="form-label">¿Diabetes?</label>
                  <select id="diabetes" className="form-select" value={diabetes} onChange={(e) => setDiabetes(e.target.value)}>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="obesidad" className="form-label">¿Obesidad?</label>
                  <select id="obesidad" className="form-select" value={obesidad} onChange={(e) => setObesidad(e.target.value)}>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="angina" className="form-label">Angina Inducida por Ejercicio</label>
                  <select id="angina" className="form-select" value={angina} onChange={(e) => setAngina(e.target.value)}>
                    <option value="1">Sí</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>

            </div> {/* Fin de .row */}

            {/* Muestra el error (con clases de Bootstrap) */}
            {error && <div className="alert alert-danger mt-4">{error}</div>}

            <div className="form-buttons">
              {/* Clases de Bootstrap + Clases personalizadas */}
              <button type="submit" className="btn btn-lg btn-submit" disabled={isLoading}>
                {isLoading ? 'Calculando...' : 'Calcular Riesgo'}
              </button>
              <button type="reset" className="btn btn-lg btn-clear" disabled={isLoading}>
                Limpiar
              </button>
            </div>
          </form>
        </div>
      )} {/* Fin del renderizado condicional */}
    </div>
  );
}

export default Evaluation;