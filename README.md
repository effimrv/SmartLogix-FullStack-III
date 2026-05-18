# SmartLogix - Plataforma logística para PYMEs desarrollada con arquitectura de microservicios

## Integrantes

| Nombre            | Rol                                |
|-------------------|------------------------------------|
| Aracely Escobar   | Desarrollo Frontend y Backend      |
| Yannella Castilla | Desarrollo Backend y Base de Datos |

## Descripción

SmartLogix optimiza la gestión logística mediante microservicios independientes. Permite gestionar inventario, pedidos, usuarios y envíos desde una interfaz web moderna con modo claro/oscuro, dashboard dinámico y documentación OpenAPI integrada.

## Arquitectura
Frontend (React + Vite) → nginx → API Gateway :8080 → Microservicios → PostgreSQL 16

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18, Vite, CSS puro |
| Backend | Java 17, Spring Boot 3.5.1, Spring Data JPA, Spring Security |
| API Docs | SpringDoc OpenAPI (Swagger UI) |
| Base de datos | PostgreSQL 16 (schemas separados por servicio) |
| Contenedores | Docker + Docker Compose |
| Tests | JUnit 5 + Mockito |

## Microservicios

| Servicio | Puerto | Schema DB | Swagger UI |
|----------|--------|-----------|------------|
| inventario-service | 8001 | inventario | http://localhost:8001/swagger-ui/index.html |
| pedidos-service | 8002 | pedidos | http://localhost:8002/swagger-ui/index.html |
| envios-service | 8003 | envios | http://localhost:8003/swagger-ui/index.html |
| usuarios-service | 8004 | usuarios | http://localhost:8004/swagger-ui/index.html |
| gateway-service | 8080 | — | — |

## Estructura del proyecto
```
SmartLogix-FullStack-III/
├── backend/
│   ├── gateway-service/
│   │   └── src/main/resources/application.yml
│   ├── inventario-service/
│   │   └── src/main/java/com/smartlogix/inventario/
│   │       ├── config/SecurityConfig.java
│   │       ├── controller/ProductoController.java
│   │       ├── dto/ProductoDTO.java
│   │       ├── exception/GlobalExceptionHandler.java
│   │       ├── model/Producto.java
│   │       ├── repository/ProductoRepository.java
│   │       └── service/ProductoService.java
│   ├── pedidos-service/
│   │   └── src/main/java/com/smartlogix/pedidos/
│   │       ├── config/SecurityConfig.java
│   │       ├── controller/PedidoController.java
│   │       ├── dto/PedidoDTO.java
│   │       ├── exception/GlobalExceptionHandler.java
│   │       ├── model/Pedido.java
│   │       ├── repository/PedidoRepository.java
│   │       ├── service/PedidoService.java
│   │       └── PedidosServiceApplication.java
│   ├── envios-service/
│   │   └── src/main/java/com/smartlogix/envios/
│   │       ├── config/SecurityConfig.java
│   │       ├── controller/EnvioController.java
│   │       ├── dto/EnvioDTO.java
│   │       ├── exception/GlobalExceptionHandler.java
│   │       ├── model/Envio.java
│   │       ├── repository/EnvioRepository.java
│   │       └── service/EnvioService.java
│   └── usuarios-service/
│       └── src/main/java/com/smartlogix/usuarios/
│           ├── config/SecurityConfig.java
│           ├── controller/UsuarioController.java
│           ├── dto/UsuarioDTO.java
│           ├── exception/GlobalExceptionHandler.java
│           ├── model/Usuario.java
│           ├── repository/UsuarioRepository.java
│           └── service/UsuarioService.java
├── Frontend/
│   └── src/
│       ├── components/
│       │   ├── ConfirmModal.jsx
│       │   ├── Sidebar.jsx
│       │   └── Toast.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── Envios.jsx
│       │   ├── Inventario.jsx
│       │   ├── Login.jsx
│       │   ├── Pedidos.jsx
│       │   └── Usuarios.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── docker-compose.yml
├── init.sql
└── README.md
```
## Levantar con Docker (recomendado)

### Requisitos
- Docker Desktop instalado y corriendo

### Pasos

```bash
git clone https://github.com/effimrv/SmartLogix-FullStack-III.git
cd SmartLogix-FullStack-III
git checkout develop
docker compose up -d
```

Abrir en el navegador: **http://localhost:5173**

### Credenciales de acceso

| Campo | Valor |
|-------|-------|
| Email | admin@smartlogix.com |
| Contraseña | 1234 |

### Detener

```bash
docker compose down
```

## Levantar sin Docker (desarrollo local)

### Requisitos
- Node.js v18+
- Java 17
- PostgreSQL 16
- Maven

### 1. Base de datos

```sql
CREATE DATABASE smartlogix;
\c smartlogix
CREATE SCHEMA inventario;
CREATE SCHEMA pedidos;
CREATE SCHEMA envios;
CREATE SCHEMA usuarios;
```

### 2. Microservicios (una terminal por servicio)

```bash
cd backend/inventario-service && ./mvnw spring-boot:run
cd backend/pedidos-service    && ./mvnw spring-boot:run
cd backend/envios-service     && ./mvnw spring-boot:run
cd backend/usuarios-service   && ./mvnw spring-boot:run
cd backend/gateway-service    && ./mvnw spring-boot:run
```

### 3. Frontend

```bash
cd Frontend
npm install
npm run dev
```

## Endpoints

Todos los endpoints se acceden a través del API Gateway en `http://localhost:8080`.
La documentación interactiva está disponible en el Swagger UI de cada servicio.

### Inventario `/api/inventario`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | / | Obtener todos los productos |
| GET | /{id} | Obtener producto por ID |
| GET | /categoria/{categoria} | Filtrar por categoría |
| GET | /buscar?nombre= | Buscar por nombre |
| GET | /stock-bajo | Productos con stock bajo |
| POST | / | Crear producto |
| PUT | /{id} | Actualizar producto |
| PUT | /{id}/descontar?cantidad= | Descontar stock |
| DELETE | /{id} | Eliminar producto |

### Pedidos `/api/pedidos`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | / | Obtener todos los pedidos |
| GET | /{id} | Obtener pedido por ID |
| GET | /cliente/{clienteId} | Pedidos por cliente |
| GET | /estado/{estado} | Filtrar por estado |
| POST | / | Crear pedido (descuenta stock automáticamente) |
| PUT | /{id} | Actualizar pedido |
| DELETE | /{id} | Eliminar pedido |

### Envíos `/api/envios`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | / | Obtener todos los envíos |
| GET | /{id} | Obtener envío por ID |
| GET | /pedido/{pedidoId} | Envíos por pedido |
| GET | /estado/{estado} | Filtrar por estado |
| POST | / | Crear envío |
| PUT | /{id} | Actualizar envío |
| DELETE | /{id} | Eliminar envío |

### Usuarios `/api/usuarios`
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | / | Obtener todos los usuarios |
| GET | /{id} | Obtener usuario por ID |
| GET | /email/{email} | Buscar por email |
| GET | /rol/{rol} | Filtrar por rol |
| POST | / | Crear usuario |
| PUT | /{id} | Actualizar usuario |
| DELETE | /{id} | Eliminar usuario |

## Pruebas unitarias

```bash
cd backend/inventario-service && ./mvnw test
cd backend/pedidos-service    && ./mvnw test
cd backend/envios-service     && ./mvnw test
cd backend/usuarios-service   && ./mvnw test
```

**Resultado esperado: 40 pruebas, 0 fallos** (10 por servicio)

## Ramas

| Rama | Descripción |
|------|-------------|
| main | Versión estable |
| develop | Desarrollo activo |
