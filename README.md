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
- Spring Boot 3.5.14
- PostgreSQL
- Maven
- Spring Security
- Spring Data JPA

## Estructura del proyecto

```
SmartLogix-FullStack-III/
├── Backend/
│   ├── envios-service/         → Puerto 8003
│   │   ├── config/
│   │   ├── controller/
│   │   ├── exception/
│   │   ├── model/
│   │   ├── repository/
│   │   └── service/
│   ├── inventario-service/     → Puerto 8001
│   │   ├── config/
│   │   ├── controller/
│   │   ├── exception/
│   │   ├── model/
│   │   ├── repository/
│   │   └── service/
│   ├── pedidos-service/        → Puerto 8002
│   │   ├── config/
│   │   ├── controller/
│   │   ├── exception/
│   │   ├── model/
│   │   ├── repository/
│   │   └── service/
│   └── usuarios-service/       → Puerto 8004
│       ├── config/
│       ├── controller/
│       ├── exception/
│       ├── model/
│       ├── repository/
│       └── service/
├── Frontend/
│   └── src/
│       ├── components/
│       │   └── Sidebar.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Envios.jsx
│       │   ├── Inventario.jsx
│       │   ├── Login.jsx
│       │   ├── Pedidos.jsx
│       │   └── Usuarios.jsx
│       ├── App.jsx
│       ├── index.css
│       └── main.jsx
└── README.md
```

## Endpoints disponibles

### Inventario (puerto 8001)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/inventario | Obtener todos los productos |
| GET | /api/inventario/{id} | Obtener producto por ID |
| GET | /api/inventario/categoria/{categoria} | Filtrar por categoría |
| GET | /api/inventario/buscar?nombre= | Buscar por nombre |
| GET | /api/inventario/stock-bajo | Productos con stock bajo |
| POST | /api/inventario | Crear producto |
| PUT | /api/inventario/{id} | Actualizar producto |
| DELETE | /api/inventario/{id} | Eliminar producto |

### Pedidos (puerto 8002)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/pedidos | Obtener todos los pedidos |
| GET | /api/pedidos/{id} | Obtener pedido por ID |
| GET | /api/pedidos/usuario/{usuarioId} | Pedidos por usuario |
| GET | /api/pedidos/estado/{estado} | Filtrar por estado |
| POST | /api/pedidos | Crear pedido |
| PUT | /api/pedidos/{id} | Actualizar pedido |
| DELETE | /api/pedidos/{id} | Eliminar pedido |

### Envíos (puerto 8003)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/envios | Obtener todos los envíos |
| GET | /api/envios/{id} | Obtener envío por ID |
| GET | /api/envios/pedido/{pedidoId} | Envíos por pedido |
| GET | /api/envios/estado/{estado} | Filtrar por estado |
| POST | /api/envios | Crear envío |
| PUT | /api/envios/{id} | Actualizar envío |
| DELETE | /api/envios/{id} | Eliminar envío |

### Usuarios (puerto 8004)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/usuarios | Obtener todos los usuarios |
| GET | /api/usuarios/{id} | Obtener usuario por ID |
| GET | /api/usuarios/email/{email} | Buscar por email |
| GET | /api/usuarios/rol/{rol} | Filtrar por rol |
| POST | /api/usuarios | Crear usuario |
| PUT | /api/usuarios/{id} | Actualizar usuario |
| DELETE | /api/usuarios/{id} | Eliminar usuario |

## Cómo ejecutar el proyecto

### Requisitos previos
- Node.js v18+
- Java 17
- PostgreSQL 16
- Maven

### Base de datos
```sql
CREATE DATABASE smartlogix;
CREATE SCHEMA inventario;
CREATE SCHEMA pedidos;
CREATE SCHEMA envios;
CREATE SCHEMA usuarios;
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```
Abrir en: http://localhost:5173

Credenciales de acceso:
- Email: admin@smartlogix.com
- Contraseña: 1234

### Backend
Ejecutar cada microservicio desde su carpeta:

```bash
# Inventario
cd Backend/inventario-service
./mvnw spring-boot:run

# Pedidos
cd Backend/pedidos-service
./mvnw spring-boot:run

# Envíos
cd Backend/envios-service
./mvnw spring-boot:run

# Usuarios
cd Backend/usuarios-service
./mvnw spring-boot:run
```

## Ramas

| Rama | Descripción |
|------|-------------|
| main | Versión estable |
| develop | Desarrollo activo |
| qa | Pruebas |
