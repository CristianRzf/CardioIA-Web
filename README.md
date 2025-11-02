# ❤️ CardioIA-Web: Tu Asistente de Prevención Cardíaca

**CardioIA-Web** es una aplicación web innovadora diseñada para la prevención proactiva de enfermedades cardíacas. Utilizando un modelo de inteligencia artificial, nuestra herramienta calcula el riesgo cardíaco de un usuario en porcentaje, ofreciendo una primera evaluación accesible y fácil de entender.

## ✨ Características Principales

-   **Cálculo de Riesgo Cardíaco:** Ingresa tus datos de salud y obtén un porcentaje de riesgo cardíaco estimado por nuestro modelo de IA.
-   **Interfaz Intuitiva:** Un diseño limpio y sencillo para que cualquier persona pueda usar la aplicación sin complicaciones.
-   **Seguridad y Privacidad:** (Planeado) Tus datos de salud son sensibles. Planeamos usar Firebase para garantizar que tu información esté segura y sea privada.
-   **Educación y Conciencia:** Fomentamos la importancia de la prevención y el cuidado de la salud cardiovascular.

## 🚀 Tecnologías Utilizadas

Este proyecto está construido con un stack de tecnologías moderno y eficiente:

-   **Frontend:** ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) - Para una interfaz de usuario dinámica y reactiva.
-   **Backend & IA:** ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) - Potencia nuestro modelo de cálculo de riesgo.
-   **Base de Datos:** ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) - (Planeado) Para la gestión de datos de usuario de forma segura y escalable.

## 🔧 Guía de Instalación y Uso

Para poner en marcha este proyecto en tu entorno local, sigue estos pasos:

### Prerrequisitos

-   Tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior).
-   Tener instalado [Python](https://www.python.org/) (versión 3.8 o superior) y `pip`.

### 1. Clonar el Repositorio

```bash
git clone https://github.com/CristianRzf/CardioIA-Web.git
cd CardioIA-Web
```

### 2. Configuración del Frontend (React)

Navega a la carpeta del frontend (ajústala si tiene otro nombre, ej. `client` o `frontend`) y ejecuta:

```bash
# Instalar dependencias
npm install

# Iniciar la aplicación en modo de desarrollo
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000).

### 3. Configuración del Backend (Python)

Navega a la carpeta del backend (ajústala si tiene otro nombre, ej. `server` o `api`) y ejecuta:

```bash
# (Recomendado) Crear un entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar las librerías de Python
pip install -r requirements.txt

# Iniciar el servidor
python app.py # O el nombre de tu archivo principal
```

El servidor estará escuchando en [http://localhost:5000](http://localhost:5000) (o el puerto que hayas configurado).

## 🤝 ¿Cómo Contribuir?

¡Estamos abiertos a contribuciones! Si quieres mejorar el proyecto, por favor sigue estos pasos:

1.  Haz un **Fork** de este repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y haz **Commit** (`git commit -m 'Añadir nueva funcionalidad'`).
4.  Haz **Push** a tu rama (`git push origin feature/nueva-funcionalidad`).
5.  Abre un **Pull Request**.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

```
