# SmartLogix 🚚

Plataforma logística para eCommerce orientada a PYMEs, desarrollada con arquitectura de microservicios.

## Integrantes

- Aracely Escobar
- Yannella Castilla

## Descripción

SmartLogix es una solución tecnológica que optimiza la gestión logística mediante una arquitectura moderna basada en microservicios. Permite gestionar inventario, pedidos, usuarios y envíos en una plataforma integrada.

## Tecnologías utilizadas

### Frontend
- React + Vite
- CSS puro

### Backend
- Java 17
- Spring Boot
- PostgreSQL
- Maven
- Docker

## Estructura del proyecto

SmartLogix/
├── Frontend/
│   └── smartlogix-frontend/
│       └── src/
│           ├── assets/
│           ├── components/
│           │   └── Sidebar.jsx
│           ├── pages/
│           │   ├── Dashboard.jsx
│           │   ├── Envios.jsx
│           │   ├── Inventario.jsx
│           │   ├── Pedidos.jsx
│           │   └── Usuarios.jsx
│           ├── App.jsx
│           ├── index.css
│           └── main.jsx
└── Servicios/
├── Envios/
├── Inventario/
├── Pedidos/
└── Usuario/

## Microservicios

| Servicio | Descripción |
|----------|-------------|
| Inventario | Gestión de productos y stock |
| Pedidos | Ciclo de vida de los pedidos |
| Envíos | Logística y trazabilidad de entregas |
| Usuario | Gestión de clientes y perfiles |

## Cómo correr el frontend

```bash
cd SmartLogix/Frontend/smartlogix-frontend
npm install
npm run dev
```

Abrir en el navegador: http://localhost:5173

## Ramas

| Rama | Descripción |
|------|-------------|
| main | Versión estable |
| develop | Desarrollo activo |
| qa | Pruebas |