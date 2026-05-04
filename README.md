# SmartLogix 🚚

Plataforma logística para eCommerce orientada a PYMEs, desarrollada con arquitectura de microservicios.

## Integrantes

| Nombre            | Rol                                |
|-------------------|------------------------------------|
| Aracely Escobar   | Desarrollo Frontend y Backend      |
| Yannella Castilla | Desarrollo Backend y Base de Datos |

## Descripción

SmartLogix es una solución tecnológica que optimiza la gestión logística mediante una arquitectura moderna basada en microservicios. Permite gestionar inventario, pedidos, usuarios y envíos en una plataforma integrada con una interfaz web moderna.

## Arquitectura

```
Frontend (React) → API Gateway (8080) → Microservicios (8001-8004) → PostgreSQL
```

Cada microservicio es independiente, escalable y se comunica mediante APIs REST con el frontend a través del API Gateway.

## Tecnologías utilizadas

### Frontend
- React 18 + Vite
- CSS puro
- Fetch API

### Backend
- Java 17
- Spring Boot 3.5.14
- Spring Data JPA
- Spring Security
- PostgreSQL 16
- Maven

### Herramientas
- Docker (pendiente)
- Postman (pruebas de endpoints)
- Git + GitHub

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
│   ├── gateway-service/        → Puerto 8080
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

## Requisitos previos

- Node.js v18+
- Java 17
- PostgreSQL 16
- Maven

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/effimrv/SmartLogix-FullStack-III.git
cd SmartLogix-FullStack-III
git checkout develop
```

### 2. Configurar la base de datos

Conectarse a PostgreSQL y ejecutar:

```sql
CREATE DATABASE smartlogix;
\c smartlogix
CREATE SCHEMA inventario;
CREATE SCHEMA pedidos;
CREATE SCHEMA envios;
CREATE SCHEMA usuarios;
```

### 3. Levantar los microservicios

Abrir una terminal por cada servicio y ejecutar en este orden:

**Inventario (puerto 8001)**
```bash
cd Backend/inventario-service
chmod +x mvnw
./mvnw spring-boot:run
```

**Pedidos (puerto 8002)**
```bash
cd Backend/pedidos-service
chmod +x mvnw
./mvnw spring-boot:run
```

**Envíos (puerto 8003)**
```bash
cd Backend/envios-service
chmod +x mvnw
./mvnw spring-boot:run
```

**Usuarios (puerto 8004)**
```bash
cd Backend/usuarios-service
chmod +x mvnw
./mvnw spring-boot:run
```

**API Gateway (puerto 8080)**
```bash
cd Backend/gateway-service
chmod +x mvnw
./mvnw spring-boot:run
```

### 4. Levantar el frontend

```bash
cd Frontend
npm install
npm run dev
```

Abrir en el navegador: **http://localhost:5173**

### Credenciales de acceso

| Campo      | Valor                |
|------------|----------------------|
| Email      | admin@smartlogix.com |
| Contraseña | 1234                 |

## Endpoints disponibles

Todos los endpoints se acceden a través del API Gateway en `http://localhost:8080`

### Inventario
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

### Pedidos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/pedidos | Obtener todos los pedidos |
| GET | /api/pedidos/{id} | Obtener pedido por ID |
| GET | /api/pedidos/usuario/{usuarioId} | Pedidos por usuario |
| GET | /api/pedidos/estado/{estado} | Filtrar por estado |
| POST | /api/pedidos | Crear pedido |
| PUT | /api/pedidos/{id} | Actualizar pedido |
| DELETE | /api/pedidos/{id} | Eliminar pedido |

### Envíos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/envios | Obtener todos los envíos |
| GET | /api/envios/{id} | Obtener envío por ID |
| GET | /api/envios/pedido/{pedidoId} | Envíos por pedido |
| GET | /api/envios/estado/{estado} | Filtrar por estado |
| POST | /api/envios | Crear envío |
| PUT | /api/envios/{id} | Actualizar envío |
| DELETE | /api/envios/{id} | Eliminar envío |

### Usuarios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/usuarios | Obtener todos los usuarios |
| GET | /api/usuarios/{id} | Obtener usuario por ID |
| GET | /api/usuarios/email/{email} | Buscar por email |
| GET | /api/usuarios/rol/{rol} | Filtrar por rol |
| POST | /api/usuarios | Crear usuario |
| PUT | /api/usuarios/{id} | Actualizar usuario |
| DELETE | /api/usuarios/{id} | Eliminar usuario |

## Pruebas unitarias

Ejecutar desde cada carpeta de microservicio:

```bash
# Inventario
cd Backend/inventario-service && ./mvnw test

# Pedidos
cd Backend/pedidos-service && ./mvnw test

# Envíos
cd Backend/envios-service && ./mvnw test

# Usuarios
cd Backend/usuarios-service && ./mvnw test
```

Resultado esperado: **40 pruebas, 0 fallos** (10 por servicio)

## Configuración de base de datos

Cada microservicio se conecta a PostgreSQL con esta configuración:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/smartlogix
spring.datasource.username=postgres
spring.datasource.password=1234
```

## Ramas

| Rama    | Descripción                   |
|---------|-------------------------------|
| main    | Versión estable               |
| develop | Desarrollo activo             |
| qa      | Pruebas unitarias verificadas |