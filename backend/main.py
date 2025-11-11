import joblib
import json
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
# NUEVOS IMPORTS PARA GEMINI
import os 
from google import genai
# FIREBASE IMPORTS
import firebase_admin
from firebase_admin import credentials, firestore


# --- 1. Cargar modelo, scaler y columnas ---
try:
    model = joblib.load('cardio_model.pkl')
    scaler = joblib.load('cardio_scaler.pkl')
    with open('cardio_columns.json', 'r') as f:
        train_columns = json.load(f)
    print("--- ✅ Backend: Modelo, scaler y columnas cargados exitosamente. ---")
except Exception as e:
    print("--- ❌ ERROR CRÍTICO AL CARGAR ARCHIVOS ---")
    print("Asegúrate de que .pkl y .json estén en la misma carpeta que main.py.")
    print("Error:", e)
    model, scaler, train_columns = None, None, None


# ---------------------------------------------
# 1.5. Conexión SEGURA a Firebase Firestore (SDK Admin)
# ---------------------------------------------
db = None # Inicializa db a None si la conexión falla
try:
    # Asegúrate de que este nombre sea EXACTO.

    # linea de codigo de credenciales de firebase
    cred = credentials.Certificate("cardioia-d2a7a-firebase-adminsdk-fbsvc-c5fc6aba9c.json")

    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("--- ✅ Backend: Conexión a Firebase Firestore establecida. ---")
except Exception as e:
    print(f"--- ❌ ERROR CRÍTICO AL CONECTAR A FIREBASE: {e} ---")
    db = None

# ---------------------------------------------
# 1.6. Configuración de la API de Gemini
# ---------------------------------------------
client = None

#linea de codigo api de gemini
GEMINI_API_KEY = "AIzaSyD1n0-S3hSDapVp8HeqjQGaAMqjCazNQas"

try:
    if GEMINI_API_KEY != "INS_TU_CLAVE_GEMINI_AQUI":
        client = genai.Client(api_key=GEMINI_API_KEY)
        print("--- ✅ Backend: Cliente Gemini inicializado. ---")
except Exception as e:
    print(f"--- ❌ ERROR CRÍTICO AL CONECTAR A GEMINI: {e} ---")
    client = None


# --- 2. Modelos de datos ---
class HeartData(BaseModel):
    edad: int = Field(..., gt=17, lt=121, description="La edad debe estar entre 18 y 120")
    sexo: int = Field(..., ge=0, le=1)  # ge = "greater or equal", le = "less or equal"
    colesterol: int = Field(..., gt=50, lt=600)
    presion_arterial: int = Field(..., gt=50, lt=300)
    frecuencia_cardiaca: int = Field(..., gt=40, lt=250)
    fumador: int = Field(..., ge=0, le=1)
    consumo_alcohol: int = Field(..., ge=0, le=1)
    horas_ejercicio: int = Field(..., ge=0, lt=100)
    historial_familiar: int = Field(..., ge=0, le=1)
    diabetes: int = Field(..., ge=0, le=1)
    obesidad: int = Field(..., ge=0, le=1)
    nivel_estres: int = Field(..., ge=1, le=10)
    nivel_azucar: int = Field(..., gt=30, lt=600)
    angina_inducida_ejercicio: int = Field(..., ge=0, le=1)
    tipo_dolor_pecho: int = Field(..., ge=0, le=3)

class PredictionResponse(BaseModel):
    probabilidad: float
    nivel_riesgo: str
    factores_influyentes: list[str]
    reporte_ia: str


# --- 3. Inicializar FastAPI ---
app = FastAPI(title="CardioIA API")

# --- 4. CORS ---
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- FUNCION DE GENERACIÓN DE REPORTE CON GEMINI ---
async def generate_detailed_report(data: dict, prob_porcentaje: float, nivel: str) -> str:
    """
    Genera un reporte detallado utilizando el modelo Gemini.
    """
    if not client:
        return "Error: Servicio de generación de reportes de IA no disponible (API Key faltante o inválida)."

    # Prepara los datos del paciente para el prompt
    datos_paciente_str = "\n".join([
        f"- {k.replace('_', ' ').title()}: {v}" 
        for k, v in data.items() 
        if k not in ['angina_inducida_ejercicio', 'tipo_dolor_pecho'] # Excluir claves largas si es necesario
    ])

    # El prompt es la instrucción principal para la IA
    prompt = f"""
    Eres un asistente médico experto en Cardiología para una aplicación de evaluación de riesgo cardíaco llamada CardioIA.
    Tu tarea es generar un reporte médico NO diagnóstico, explicativo y motivacional, con base en los datos del paciente y el resultado de riesgo.

    **Instrucciones para el Reporte:**
    1. El tono debe ser profesional, de apoyo y educativo.
    2. El reporte debe estar estructurado en 3 secciones (usando títulos como # Resumen, # Análisis, # Recomendaciones):
       a) **Resumen de Riesgo:** Describe el nivel de riesgo ({nivel}) y la probabilidad ({prob_porcentaje}%).
       b) **Análisis de Factores Clave:** Menciona los 3 o 4 factores de los datos proporcionados que MÁS influyen en el resultado y por qué.
       c) **Recomendaciones Personalizadas:** Ofrece consejos de estilo de vida específicos y accionables para REDUCIR el riesgo.

    **Datos del Paciente:**
    Nivel de Riesgo Calculado: {nivel}
    Probabilidad de Riesgo: {prob_porcentaje}%

    Datos Clínicos Detallados:
    {datos_paciente_str}

    Genera el reporte en formato Markdown y en idioma español.
    """
    
    try:
        # Llama al modelo
        response = client.models.generate_content(
            model='gemini-2.5-flash', 
            contents=prompt
        )
        return response.text
        
    except Exception as e:
        print(f"--- ❌ ERROR AL GENERAR REPORTE CON GEMINI: {e} ---")
        return "Error: No se pudo generar el reporte de IA debido a un error del servicio."


# --- 5. Preprocesamiento (sin cambios) ---
def preprocess_data(data: HeartData) -> pd.DataFrame:
    # ... (Tu función de preprocesamiento, sin cambios) ...
    gender_map = {1: 'Male', 0: 'Female'}
    smoking_map = {1: 'Current', 0: 'Never'}
    alcohol_map = {1: 'Heavy', 0: 'None'}
    family_history_map = {1: 'Yes', 0: 'No'}
    diabetes_map = {1: 'Yes', 0: 'No'}
    obesity_map = {1: 'Yes', 0: 'No'}
    angina_map = {1: 'Yes', 0: 'No'}
    chest_pain_map = {
        0: 'Typical Angina',
        1: 'Atypical Angina',
        2: 'Non-anginal Pain',
        3: 'Asymptomatic'
    }

    raw_data = {
        'Age': data.edad,
        'Gender': gender_map.get(data.sexo),
        'Cholesterol': data.colesterol,
        'Blood Pressure': data.presion_arterial,
        'Heart Rate': data.frecuencia_cardiaca,
        'Smoking': smoking_map.get(data.fumador),
        'Alcohol Intake': alcohol_map.get(data.consumo_alcohol),
        'Exercise Hours': str(data.horas_ejercicio),
        'Family History': family_history_map.get(data.historial_familiar),
        'Diabetes': diabetes_map.get(data.diabetes),
        'Obesity': obesity_map.get(data.obesidad),
        'Stress Level': str(data.nivel_estres),
        'Blood Sugar': data.nivel_azucar,
        'Exercise Induced Angina': angina_map.get(data.angina_inducida_ejercicio),
        'Chest Pain Type': chest_pain_map.get(data.tipo_dolor_pecho)
    }

    df = pd.DataFrame([raw_data])

    categorical_cols = [
        'Gender', 'Smoking', 'Alcohol Intake', 'Exercise Hours',
        'Family History', 'Diabetes', 'Obesity', 'Stress Level',
        'Exercise Induced Angina', 'Chest Pain Type'
    ]

    df_processed = pd.get_dummies(df, columns=categorical_cols, drop_first=True)
    df_reindexed = df_processed.reindex(columns=train_columns, fill_value=0)

    # Escalar columnas numéricas
    numerical_cols = ['Age', 'Cholesterol', 'Blood Pressure', 'Heart Rate', 'Blood Sugar']
    df_reindexed[numerical_cols] = scaler.transform(df_reindexed[numerical_cols])

    return df_reindexed


# --- 6. Endpoint de predicción (Actualizado) ---
@app.post("/predict", response_model=PredictionResponse)
async def predict_heart_disease(data: HeartData):
    if not all([model, scaler, train_columns]):
        raise HTTPException(
            status_code=500, 
            detail="Error interno del servidor: Modelo no cargado o archivos faltantes."
        )

    try:
        processed_df = preprocess_data(data)

        # --- Predicción ---
        probabilidad = model.predict_proba(processed_df)[0][1]
        prob_porcentaje = round(float(probabilidad) * 100, 2)

        if prob_porcentaje >= 65:
            nivel = "Alto"
        elif prob_porcentaje >= 35:
            nivel = "Moderado"
        else:
            nivel = "Bajo"

        factores = ["Análisis de factores aún no implementado."]

        # 6.5. GENERACIÓN DE REPORTE CON GEMINI
        reporte_ia = await generate_detailed_report(
            data=data.dict(), 
            prob_porcentaje=prob_porcentaje, 
            nivel=nivel
        )

        # 6.6. Almacenamiento Seguro en Firestore (Actualizado)
        storage_status = "NO_GUARDADO"
        
        if db:
            try:
                timestamp = datetime.now()
                
                # 1. Crear el documento de Datos Clínicos (ClinicalData)
                clinical_data_dict = data.dict()
                clinical_data_dict['timestamp'] = timestamp.isoformat()
                
                clinical_ref = db.collection('ClinicalData').document()
                clinical_ref.set(clinical_data_dict) 
                
                # 2. Crear el documento de Evaluación (Evaluations) - ¡Añadir el reporte!
                evaluation_data = {
                    "prediction_id": clinical_ref.id, 
                    "user_data_ref": f"ClinicalData/{clinical_ref.id}", 
                    "probabilidad_riesgo": prob_porcentaje,
                    "nivel_riesgo": nivel,
                    "factores_influyentes": factores,
                    "reporte_ia": reporte_ia, # <--- ¡NUEVO CAMPO GUARDADO!
                    "timestamp": timestamp.isoformat(),
                }
                db.collection('Evaluations').add(evaluation_data)

                storage_status = "OK"
                
            except Exception as storage_e:
                print(f"--- ⚠️ WARNING: Falló el almacenamiento en Firebase: {storage_e} ---")
                storage_status = "ERROR_FIREBASE"
        
        # 7. Respuesta al Frontend (Actualizado)

        resultado = {
            "probabilidad": prob_porcentaje,
            "nivel_riesgo": nivel,
            "factores_influyentes": factores,
            "reporte_ia": reporte_ia # <--- ¡NUEVO CAMPO EN LA RESPUESTA!
        }

        print(f"📤 Respuesta enviada al frontend: Prob={prob_porcentaje}%, Nivel={nivel}. Almacenamiento: {storage_status}")
        return resultado

    except Exception as e:
        print("--- ❌ ERROR DURANTE LA PREDICCIÓN ---")
        print("Error:", e)
        raise HTTPException(
            status_code=500, 
            detail=f"Error al procesar la predicción: {e}"
        )


# --- 7. Endpoint raíz ---
@app.get("/")
def read_root():
    return {"message": "CardioIA Backend API está funcionando correctamente 🚀"}