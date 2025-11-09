/**
 * PredictionService.js
 * Función para llamar al endpoint de predicción en el backend de FastAPI.
 */
import { API_BASE_URL } from './api'; // Asegúrate de que este import sea correcto

const predictHeartDisease = async (data) => {
    try {
        console.log("Enviando datos clínicos a la API:", data);
        
        // 1. Llama al endpoint /predict de FastAPI
        const response = await fetch(`${API_BASE_URL}/predict`, {
            method: 'POST',
            headers: {
                // Indica que el cuerpo es JSON
                'Content-Type': 'application/json',
            },
            // Convierte los datos del formulario a JSON para el cuerpo de la petición
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            // Manejar errores HTTP (ej. 500 del servidor, errores de validación)
            const errorData = await response.json();
            console.error("Detalles del error de la API:", errorData);
            // Lanza un error más descriptivo
            throw new Error(`Error en la predicción (${response.status}): ${errorData.detail || response.statusText}`);
        }

        // 2. Parsea la respuesta JSON
        const result = await response.json();
        
        // El objeto 'result' ahora contiene: 
        // { probabilidad: float, nivel_riesgo: string, factores_influyentes: array, reporte_ia: string }
        console.log("Respuesta recibida de la API (incluye reporte_ia):", result);
        
        // 3. Devuelve el objeto completo al componente Results.jsx
        return result;

    } catch (error) {
        console.log("--- ERROR EN FRONTEND/PREDICTION SERVICE ---");
        console.error("Error al conectar con la API de predicción:", error);
        throw error; // Propaga el error para que Results.jsx pueda mostrarlo
    }
};

export { predictHeartDisease };