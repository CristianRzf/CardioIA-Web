import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import ReactMarkdown from "react-markdown"; // 🔥 1. NUEVO IMPORT NECESARIO
import "./Results.css";

function Results() {
  const navigate = useNavigate();
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('cardioResult');
    if (data) {
      const parsedData = JSON.parse(data);

      // Normalizar datos: si viene 'nivel_riesgo' convertirlo a 'riesgo'
      if (parsedData.nivel_riesgo && !parsedData.riesgo) {
        parsedData.riesgo = parsedData.nivel_riesgo;
      }
      
      // Aseguramos que 'recomendaciones' sea null si no existe, por si el backend
      // aún las envía en un campo separado.
      if (!parsedData.recomendaciones) {
        parsedData.recomendaciones = null;
      }
      
      setResultado(parsedData);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!resultado) {
    return <div className="page-container">Cargando resultados...</div>;
  }

  // ✅ Validación mejorada de datos
  if (
    resultado.riesgo === undefined ||
    resultado.probabilidad === undefined ||
    resultado.riesgo === null ||
    resultado.probabilidad === null ||
    resultado.riesgo === '' ||
    isNaN(resultado.probabilidad)
  ) {
    console.error('Datos incompletos o inválidos en resultado:', resultado);
    return (
      <div className="page-container">
        Error: Datos incompletos o inválidos. Por favor, realice la evaluación nuevamente.
      </div>
    );
  }

  const riesgoAlto = parseFloat(resultado.probabilidad);
  const riesgoBajo = 100 - riesgoAlto;

  const chartData = [
    { name: 'Riesgo Alto', value: riesgoAlto },
    { name: 'Riesgo Bajo', value: riesgoBajo }
  ];

  const COLORS = ['#8B0000', '#4CAF50'];

  return (
    <div className="page-container results-container">
      <h2>Resultados de la Evaluación</h2>

      <div className="result-summary">
        <div className={`risk-badge ${resultado.riesgo.toLowerCase()}`}>
          Riesgo: {resultado.riesgo}
        </div>
        <p className="probability">
          Probabilidad de riesgo cardiovascular: <strong>{resultado.probabilidad}%</strong>
        </p>
      </div>
      
      {/* ---------------------------------------------------- */}
      {/* 🔥 2. NUEVA SECCIÓN: REPORTE DE IA DE GEMINI 🔥 */}
      {/* ---------------------------------------------------- */}
      {/* Solo se muestra si el campo reporte_ia existe y no está vacío */}
      {resultado.reporte_ia && (
        <div className="ai-report-section">
          <h3 className="report-header">
            Reporte Detallado de CardioIA (Generado por IA)
          </h3>
          <div className="report-content">
            {/* Usa ReactMarkdown para interpretar el texto plano con formato Markdown */}
            <ReactMarkdown>{resultado.reporte_ia}</ReactMarkdown>
          </div>
        </div>
      )}
      {/* ---------------------------------------------------- */}

      <div className="chart-container">
        <h3>Distribución de Riesgo</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* La sección de recomendaciones se mantiene solo si NO hay reporte_ia 
          para evitar duplicidad. */}
      {resultado.recomendaciones && !resultado.reporte_ia && (
        <div className="recommendations">
          <h3>Recomendaciones</h3>
          <ul>
            {resultado.recomendaciones.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="form-buttons">
        <button
          className="btn btn-submit"
          onClick={() => navigate('/')}
        >
          Nueva Evaluación
        </button>
      </div>
    </div>
  );
}

export default Results;
