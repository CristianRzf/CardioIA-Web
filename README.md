# 🫀 CardioIA

**CardioIA** es una aplicación web inteligente para la evaluación del riesgo cardiovascular basada en machine learning. Permite a los usuarios realizar predicciones sobre la probabilidad de enfermedades cardíacas utilizando un modelo de regresión logística entrenado con datos clínicos.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Uso](#-uso)
- [API Documentation](#-api-documentation)
- [Modelo de Machine Learning](#-modelo-de-machine-learning)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Contribución](#-contribución)
- [Licencia](#-licencia)

## ✨ Características

- 🤖 **Predicción basada en IA**: Modelo de machine learning entrenado para evaluar riesgo cardiovascular
- 📊 **Análisis detallado**: Evalúa 15 factores clínicos diferentes
- 🎨 **Interfaz moderna**: Frontend desarrollado con React y Vite
- 🚀 **API RESTful**: Backend robusto con FastAPI
- 📈 **Visualización de resultados**: Gráficos y niveles de riesgo claros
- 🔒 **CORS configurado**: Comunicación segura entre frontend y backend
- ⚡ **Respuesta rápida**: Predicciones en tiempo real

## 🛠 Tecnologías Utilizadas

### Frontend
- **React 19.1.1**: Biblioteca de JavaScript para construir interfaces de usuario
- **React Router DOM 7.9.4**: Enrutamiento para aplicaciones React
- **Axios 1.13.1**: Cliente HTTP para peticiones a la API
- **Recharts 3.3.0**: Librería de gráficos para visualización de datos
- **React Google Charts 5.2.1**: Componentes de gráficos de Google

### Backend
- **FastAPI**: Framework web moderno y rápido para Python.
- **scikit-learn**: Librería de machine learning.
- **pandas**: Manipulación y análisis de datos.
- **numpy**: Computación numérica
- **joblib**: Serialización de modelos de ML

### Machine Learning
- **Regresión Logística**: Modelo de clasificación binaria
- **StandardScaler**: Normalización de características numéricas
- **One-Hot Encoding**: Codificación de variables categóricas

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **Python** (3.9 o superior)
- **pip** (gestor de paquetes de Python)

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/SoyKam/CardioIA-Web.git
cd CardioIA-Web
```

### 2. Configuración del Backend

```bash
# Navegar al directorio del backend
cd backend

# Crear un entorno virtual (recomendado)
python -m venv venv

# Activar el entorno virtual
# En Windows:
venv\Scripts\activate
# En Linux/Mac:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# (Opcional) Entrenar el modelo si es necesario
python entrenar_modelo.py
```

### 3. Configuración del Frontend

```bash
# Navegar al directorio del frontend (desde la raíz del proyecto)
cd frontend

# Instalar dependencias
npm install
```

## 💻 Uso

### Iniciar el Backend

```bash
# Desde el directorio backend/
cd backend

# Activar el entorno virtual si no está activado
source venv/bin/activate  # Linux/Mac
# o
venv\Scripts\activate  # Windows

# Iniciar el servidor FastAPI
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

El backend estará disponible en: `http://localhost:8000`

Para ver la documentación interactiva de la API, visita: `http://localhost:8000/docs`

### Iniciar el Frontend

```bash
# Desde el directorio frontend/ (en otra terminal)
cd frontend

# Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173` (o el puerto que Vite indique)

### Usar la Aplicación

1. Abre tu navegador y accede a `http://localhost:5173`
2. Completa el formulario de evaluación con los datos del paciente
3. Haz clic en "Evaluar Riesgo"
4. Revisa los resultados con la probabilidad y nivel de riesgo cardiovascular

## 📡 API Documentation

### Endpoint Principal

#### `POST /predict`

Realiza una predicción de riesgo cardiovascular.

**Request Body:**

```json
{
  "edad": 45,
  "sexo": 1,
  "colesterol": 240,
  "presion_arterial": 140,
  "frecuencia_cardiaca": 80,
  "fumador": 1,
  "consumo_alcohol": 0,
  "horas_ejercicio": 3,
  "historial_familiar": 1,
  "diabetes": 0,
  "obesidad": 1,
  "nivel_estres": 5,
  "nivel_azucar": 120,
  "angina_inducida_ejercicio": 0,
  "tipo_dolor_pecho": 2
}
```

**Parámetros:**
- `edad` (int): Edad del paciente (años)
- `sexo` (int): 1 = Masculino, 0 = Femenino
- `colesterol` (int): Nivel de colesterol (mg/dL)
- `presion_arterial` (int): Presión arterial sistólica (mmHg)
- `frecuencia_cardiaca` (int): Frecuencia cardíaca en reposo (bpm)
- `fumador` (int): 1 = Fumador actual, 0 = Nunca fumó
- `consumo_alcohol` (int): 1 = Consumo alto, 0 = Sin consumo
- `horas_ejercicio` (int): Horas de ejercicio por semana
- `historial_familiar` (int): 1 = Sí, 0 = No
- `diabetes` (int): 1 = Sí, 0 = No
- `obesidad` (int): 1 = Sí, 0 = No
- `nivel_estres` (int): Nivel de estrés (1-10)
- `nivel_azucar` (int): Nivel de azúcar en sangre (mg/dL)
- `angina_inducida_ejercicio` (int): 1 = Sí, 0 = No
- `tipo_dolor_pecho` (int): 0 = Angina típica, 1 = Angina atípica, 2 = Dolor no-anginal, 3 = Asintomático

**Response:**

```json
{
  "probabilidad": 67.5,
  "nivel_riesgo": "Alto",
  "factores_influyentes": [
    "Análisis de factores aún no implementado."
  ]
}
```

#### `GET /`

Verificación del estado del servidor.

**Response:**

```json
{
  "message": "CardioIA Backend API está funcionando correctamente 🚀"
}
```

## 🧠 Modelo de Machine Learning

### Características del Modelo

- **Algoritmo**: Regresión Logística
- **Tipo**: Clasificación binaria (Enfermedad cardíaca: Sí/No)
- **Features**: 15 variables clínicas
- **Preprocesamiento**:
  - Normalización de variables numéricas con StandardScaler
  - Codificación one-hot de variables categóricas
  - Relleno de valores faltantes

### Entrenamiento del Modelo

El modelo se entrena con el script `entrenar_modelo.py`:

```bash
cd backend
python entrenar_modelo.py
```

Este script:
1. Carga el dataset `heart_disease_dataset.csv`
2. Realiza limpieza y preprocesamiento de datos
3. Divide los datos en conjuntos de entrenamiento (80%) y prueba (20%)
4. Entrena el modelo de regresión logística
5. Evalúa el modelo y muestra métricas de rendimiento
6. Guarda los artefactos:
   - `cardio_model.pkl`: Modelo entrenado
   - `cardio_scaler.pkl`: Scaler para normalización
   - `cardio_columns.json`: Columnas del dataset procesado

### Niveles de Riesgo

El sistema clasifica el riesgo en tres niveles basándose en la probabilidad:

- **Alto**: ≥ 65% de probabilidad
- **Moderado**: 35% - 64% de probabilidad
- **Bajo**: < 35% de probabilidad

## 📁 Estructura del Proyecto

```
CardioIA-Web/
├── backend/
│   ├── main.py                    # API FastAPI principal
│   ├── entrenar_modelo.py         # Script de entrenamiento del modelo
│   ├── requirements.txt           # Dependencias de Python
│   ├── cardio_model.pkl          # Modelo entrenado (generado)
│   ├── cardio_scaler.pkl         # Scaler entrenado (generado)
│   ├── cardio_columns.json       # Columnas del modelo (generado)
│   ├── heart_disease_dataset.csv # Dataset de entrenamiento
│   └── README.md                  # Documentación del backend
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx        # Componente de encabezado
│   │   │   └── Footer.jsx        # Componente de pie de página
│   │   ├── pages/
│   │   │   ├── Evaluation.jsx    # Página de formulario de evaluación
│   │   │   └── Results.jsx       # Página de resultados
│   │   ├── services/
│   │   │   └── api.js            # Servicio de comunicación con API
│   │   ├── App.jsx               # Componente principal de la app
│   │   └── main.jsx              # Punto de entrada de React
│   ├── public/                   # Archivos estáticos públicos
│   ├── index.html                # HTML principal
│   ├── package.json              # Dependencias de Node.js
│   ├── vite.config.js            # Configuración de Vite
│   └── README.md                 # Documentación del frontend
│
└── README.md                     # Este archivo
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Realiza tus cambios y haz commit (`git commit -m 'Add some AmazingFeature'`)
4. Sube los cambios a tu fork (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de código existentes
- Escribe mensajes de commit descriptivos
- Actualiza la documentación según sea necesario
- Asegúrate de que el código pase los tests y linters

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

**Nota**: Este proyecto es una herramienta de apoyo y no debe reemplazar el diagnóstico médico profesional. Siempre consulta con un profesional de la salud certificado para decisiones médicas.
