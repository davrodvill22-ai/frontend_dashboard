# 🍔 Frontend Burger Dashboard

Frontend interactivo para la gestión de catálogo de hamburguesas desarrollado con **React**, **Vite** y **Tailwind CSS**.

El proyecto implementa autenticación mediante **OpenID Connect / OAuth2 / LDAP (Keycloak)**, almacena y comparte el **JWT** globalmente utilizando **Zustand** e inyecta el token como `Bearer Token` en las peticiones HTTP (Axios) hacia la API de Backend.

---

## ✨ Características
- **Pantalla de Login (`/login`)**: Autenticación contra Keycloak utilizando Resource Owner Password Credentials (`grant_type=password`).
- **Dashboard Principal (`/dashboard`)**: Visualiza la lista de hamburguesas registradas consumiendo `GET /api/burgers`.
- **Agregar Elementos (`/add-burger`)**: Formulario para registrar nuevas hamburguesas consumiendo `POST /api/burgers` con actualización inmediata en el dashboard.
- **Gestión de Estado Global (Zustand)**: Manejo persistente del JWT y datos de sesión compartidos en todos los componentes.
- **Diseño Moderno**: Estilizado completo con Tailwind CSS y componentes responsivos.
- **Dockerizado**: Configurado con Docker multi-stage (Node 20 build -> Nginx Alpine) y enrutamiento SPA (`nginx.conf`).

---

## 🛠️ Tecnologías Utilizadas
- **React 19**
- **Vite**
- **Tailwind CSS v4**
- **Zustand** (Estado global del JWT)
- **React Router DOM**
- **Axios**
- **Docker & Nginx**

---

## 🚀 Instalación y Uso Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación se abrirá en `http://localhost:5173`.

---

## 🐳 Despliegue con Docker

Construir la imagen Docker y ejecutar el contenedor:
```bash
docker build -t frontend-burger-dashboard .
docker run -d -p 5173:80 --name frontend-burger-dashboard frontend-burger-dashboard
```

---

## 🔐 Integración con LDAP / Keycloak y Backend

- **Keycloak Token Endpoint**: `http://localhost:8081/realms/cybersecurity/protocol/openid-connect/token`
- **Backend API**: `http://localhost:3001/api/burgers`
