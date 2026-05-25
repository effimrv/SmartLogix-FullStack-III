# SmartLogix — Plataforma logística para PYMEs

Plataforma de gestión logística desarrollada con arquitectura de microservicios. Permite administrar inventario, pedidos, envíos y usuarios desde una interfaz web moderna, con vistas diferenciadas según el rol del usuario (administrador, empleado o cliente).

---

## Integrantes

| Nombre            | Rol                                |
|-------------------|------------------------------------|
| Aracely Escobar   | Desarrollo Frontend y Backend      |
| Yannella Castilla | Desarrollo Backend y Base de Datos |

---

## Arquitectura

```
Navegador (HTTPS)
    │
    ▼
Frontend React — nginx (puerto 443)
    │  reverse proxy HTTPS
    ▼
API Gateway Spring Cloud (puerto 8443, SSL)
    ├── JwtAuthFilter   — valida Bearer token en cada request
    ├── RateLimitFilter — 100 req/min por IP
    ├── /api/inventario  →  inventario-service  :8001
    ├── /api/pedidos     →  pedidos-service     :8002
    ├── /api/envios      →  envios-service      :8003
    └── /api/usuarios    →  usuarios-service    :8004
                                  │
                                  ▼
                        PostgreSQL 16 (puerto 5433)
                        Base: smartlogix
                        Schemas: inventario | pedidos | envios | usuarios
```

Cada microservicio opera sobre su propio schema de PostgreSQL y expone documentación interactiva mediante Swagger UI. Las migraciones de base de datos son gestionadas por Flyway.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19, Vite 8, CSS puro (sin frameworks) |
| Backend | Java 17, Spring Boot 3.5 |
| Persistencia | Spring Data JPA, Hibernate, PostgreSQL 16 |
| Migraciones BD | Flyway 10 (V1: schema, V2: datos de prueba) |
| API Gateway | Spring Cloud Gateway |
| Documentación API | SpringDoc OpenAPI 2 (Swagger UI) |
| Autenticación | JWT (JJWT 0.12.3) + BCrypt (Spring Security) |
| Seguridad en tránsito | HTTPS: certificado autofirmado en nginx y keystore PKCS12 en el gateway |
| Rate limiting | Filtro global en el gateway (100 req/min por IP, responde 429) |
| Contenedores | Docker + Docker Compose |
| Tests | JUnit 5 + Mockito (10 tests por servicio, 40 en total) |
| Cobertura | JaCoCo 0.8.11 (reporte en `target/site/jacoco/`) |
| CI/CD | GitHub Actions (matrix con los 4 servicios en paralelo) |
| Servidor estático | nginx (sirve el build de React vía HTTPS) |

---

## Microservicios

### En Docker (puertos expuestos al host)

| Servicio | Puerto | Schema BD | Swagger UI |
|----------|--------|-----------|------------|
| inventario-service | 8001 | `inventario` | http://localhost:8001/swagger-ui/index.html |
| pedidos-service | 8002 | `pedidos` | http://localhost:8002/swagger-ui/index.html |
| envios-service | 8003 | `envios` | http://localhost:8003/swagger-ui/index.html |
| usuarios-service | 8004 | `usuarios` | http://localhost:8004/swagger-ui/index.html |
| gateway-service | 8443 (HTTPS) | — | — |
| frontend | 80 → 443 (HTTPS) | — | — |

### En desarrollo local (sin Docker)

| Servicio | Puerto |
|----------|--------|
| gateway-service | 8080 (HTTP) |
| frontend (Vite) | 5173 |

---

## Funcionalidades principales

### Panel de administración (roles ADMIN y EMPLEADO)

- **Dashboard** con tarjetas de resumen en tiempo real (pedidos, productos, envíos, usuarios), alertas de stock bajo, pedidos pendientes y gráfico SVG de ganancias por mes con tooltip interactivo.
- **Inventario** — CRUD completo de productos con filtro por categoría, búsqueda por nombre y descuento automático de stock al crear un pedido.
- **Pedidos** — listado con filtro por estado, vista detallada de productos por pedido, nombre y RUT del cliente. Al actualizar un pedido a estado `ENVIADO`, el sistema crea automáticamente un envío asociado en el módulo de envíos.
- **Envíos** — CRUD completo con estados (PREPARANDO, EN_CAMINO, ENTREGADO, FALLIDO). El selector de pedidos solo muestra pedidos que aún no tienen un envío asignado.
- **Usuarios** — gestión de cuentas con roles (ADMIN, EMPLEADO, CLIENTE) y estados (ACTIVO, INACTIVO).
- **Modo oscuro / claro** — persistido en `localStorage`.

### Vista tienda (rol CLIENTE)

- Catálogo de productos con stock disponible, selector de cantidades y carrito flotante.
- Creación de pedido con descuento automático de stock.
- Pantalla de confirmación con detalle del pedido realizado.

### Sincronización automática entre servicios

Cuando un pedido cambia a estado `ENVIADO`, `pedidos-service` realiza automáticamente un `POST` a `envios-service` para crear un envío con estado `EN_CAMINO`. Si el pedido ya tiene un envío asociado, la creación duplicada es rechazada con `400 Bad Request`.

### Formato de IDs

Los IDs son alfanuméricos generados aleatoriamente en el backend, únicos por tipo:

| Entidad | Formato | Ejemplo |
|---------|---------|---------|
| Productos | `PR` + 6 dígitos | `PR200001` |
| Pedidos | `PE` + 6 dígitos | `PE300001` |
| Envíos | `EN` + 6 dígitos | `EN400001` |
| Usuarios | `US` + 6 dígitos | `US100001` |

---

## Credenciales de acceso

Todas las cuentas tienen contraseña `1234`. Al iniciar sesión, el sistema redirige automáticamente a la vista correspondiente según el rol.

### Administradores — acceso completo al panel

| Nombre | Email | Contraseña | RUT |
|--------|-------|-----------|-----|
| Aracely Escobar | admin@smartlogix.com | 1234 | 14.567.890-K |
| Yannella Castilla | yannella@smartlogix.com | 1234 | 13.456.789-5 |

### Empleados — acceso al panel (sin gestión de usuarios)

| Nombre | Email | Contraseña | RUT |
|--------|-------|-----------|-----|
| María López | maria@smartlogix.com | 1234 | 10.234.567-9 |
| Carlos Pérez | carlos@smartlogix.com | 1234 | 8.765.432-4 |

### Clientes — acceso a la vista Tienda

| Nombre | Email | Contraseña | RUT |
|--------|-------|-----------|-----|
| Juan Soto | juan@cliente.com | 1234 | 12.456.789-3 |
| Valentina Mora | valentina@cliente.com | 1234 | 15.234.567-8 |
| Diego Fuentes | diego@cliente.com | 1234 | 11.789.456-2 |
| Camila Torres | camila@cliente.com | 1234 | 9.876.543-1 |

---

## Estructura del proyecto

```
SmartLogix-FullStack-III/
├── .github/
│   └── workflows/
│       └── ci.yml                   ← pipeline CI/CD (GitHub Actions)
├── docker-compose.yml
├── backend/
│   ├── gateway-service/
│   │   ├── Dockerfile               ← genera keystore PKCS12 con keytool
│   │   └── src/main/
│   │       ├── java/com/smartlogix/gateway/
│   │       │   ├── filter/
│   │       │   │   ├── JwtAuthFilter.java    ← valida JWT en cada request
│   │       │   │   └── RateLimitFilter.java  ← 100 req/min por IP
│   │       │   └── GatewayServiceApplication.java
│   │       └── resources/
│   │           ├── application.yml
│   │           └── application-ssl.yml      ← HTTPS en puerto 8443
│   ├── inventario-service/
│   │   └── src/main/
│   │       ├── java/com/smartlogix/inventario/
│   │       │   ├── config/SecurityConfig.java
│   │       │   ├── controller/ProductoController.java
│   │       │   ├── dto/ProductoDTO.java
│   │       │   ├── model/Producto.java
│   │       │   ├── repository/ProductoRepository.java
│   │       │   └── service/ProductoService.java
│   │       └── resources/db/migration/
│   │           ├── V1__init.sql             ← crea tabla producto
│   │           └── V2__seed.sql             ← 10 productos de prueba
│   ├── pedidos-service/
│   │   └── src/main/
│   │       ├── java/com/smartlogix/pedidos/
│   │       │   ├── config/SecurityConfig.java
│   │       │   ├── controller/PedidoController.java
│   │       │   ├── dto/
│   │       │   ├── model/
│   │       │   ├── repository/
│   │       │   └── service/PedidoService.java
│   │       └── resources/db/migration/
│   │           ├── V1__init.sql
│   │           └── V2__seed.sql
│   ├── envios-service/
│   │   └── src/main/
│   │       ├── java/com/smartlogix/envios/
│   │       └── resources/db/migration/
│   │           ├── V1__init.sql
│   │           └── V2__seed.sql
│   └── usuarios-service/
│       └── src/main/
│           ├── java/com/smartlogix/usuarios/
│           │   ├── config/SecurityConfig.java   ← BCryptPasswordEncoder bean
│           │   ├── controller/UsuarioController.java
│           │   ├── dto/
│           │   │   ├── LoginRequest.java
│           │   │   ├── LoginResponse.java       ← { token, usuario }
│           │   │   └── UsuarioDTO.java
│           │   ├── model/Usuario.java
│           │   ├── repository/UsuarioRepository.java
│           │   ├── service/UsuarioService.java
│           │   └── util/JwtUtil.java            ← genera tokens JWT
│           └── resources/db/migration/
│               ├── V1__init.sql
│               └── V2__seed.sql                 ← passwords con BCrypt
├── Frontend/
│   ├── Dockerfile                   ← genera cert autofirmado con openssl
│   ├── nginx.conf                   ← HTTPS 443, redirect 80→443
│   └── src/
│       ├── utils/
│       │   └── apiFetch.js          ← añade Authorization header, maneja 401
│       ├── components/
│       │   ├── ConfirmModal/
│       │   ├── Sidebar/
│       │   └── Toast/
│       ├── pages/
│       │   ├── Dashboard/
│       │   ├── Envios/
│       │   ├── Inventario/
│       │   ├── Login/
│       │   ├── Pedidos/
│       │   ├── Tienda/
│       │   └── Usuarios/
│       ├── App.jsx
│       └── main.jsx
└── README.md
```

---

## Levantar con Docker (recomendado)

### Requisitos

- Docker Desktop instalado y en ejecución

### Pasos

```bash
git clone https://github.com/effimrv/SmartLogix-FullStack-III.git
cd SmartLogix-FullStack-III
git checkout develop
docker compose up --build -d
```

Abrir en el navegador: **https://localhost**

> El navegador mostrará una advertencia de certificado autofirmado — es esperado. Haz clic en "Continuar de todos modos" para acceder.

> **Nota:** si necesitas reiniciar con datos limpios, usa `docker compose down -v && docker compose up --build`. Flyway recreará las tablas y datos de prueba automáticamente.

### Detener

```bash
docker compose down
```

### Detener y eliminar datos

```bash
docker compose down -v
```

---

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

Flyway creará las tablas e insertará los datos de prueba automáticamente al arrancar cada servicio.

### 3. Microservicios (una terminal por servicio)

```bash
cd backend/inventario-service && ./mvnw spring-boot:run
cd backend/pedidos-service    && ./mvnw spring-boot:run
cd backend/envios-service     && ./mvnw spring-boot:run
cd backend/usuarios-service   && ./mvnw spring-boot:run
cd backend/gateway-service    && ./mvnw spring-boot:run
```

### 4. Frontend

```bash
cd Frontend
npm install
npm run dev
```

Abrir en el navegador: **http://localhost:5173**

El frontend hace proxy de `/api` hacia `http://localhost:8080` (configurado en `vite.config.js`).

---

## Autenticación

El sistema usa JWT (JSON Web Tokens). Al hacer login, el servidor retorna un token que el frontend almacena en `localStorage` y envía en cada petición como header:

```
Authorization: Bearer <token>
```

El gateway valida el token antes de redirigir la petición al microservicio correspondiente. Si el token es inválido o ha expirado, el gateway responde con `401` y el frontend cierra la sesión automáticamente.

La única ruta pública (sin token) es `POST /api/usuarios/login`.

---

## Endpoints de la API

Todos los endpoints se acceden a través del API Gateway. La documentación interactiva está disponible en el Swagger UI de cada servicio.

### Inventario `/api/inventario`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/inventario` | Obtener todos los productos |
| GET | `/api/inventario/{id}` | Obtener producto por ID |
| GET | `/api/inventario/categoria/{categoria}` | Filtrar por categoría |
| GET | `/api/inventario/buscar?nombre=` | Buscar por nombre |
| GET | `/api/inventario/stock-bajo?limite=5` | Productos con stock ≤ límite |
| POST | `/api/inventario` | Crear producto |
| PUT | `/api/inventario/{id}` | Actualizar producto |
| PUT | `/api/inventario/{id}/descontar?cantidad=` | Descontar stock |
| DELETE | `/api/inventario/{id}` | Eliminar producto |

**Campos del producto:** `productoId`, `nombre`, `descripcion`, `categoria`, `precio`, `stock`

---

### Pedidos `/api/pedidos`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/pedidos` | Obtener todos los pedidos |
| GET | `/api/pedidos/{id}` | Obtener pedido por ID |
| GET | `/api/pedidos/cliente/{clienteId}` | Pedidos de un cliente |
| GET | `/api/pedidos/estado/{estado}` | Filtrar por estado |
| POST | `/api/pedidos` | Crear pedido (descuenta stock automáticamente) |
| PUT | `/api/pedidos/{id}` | Actualizar pedido (si cambia a ENVIADO, crea envío automático) |
| PATCH | `/api/pedidos/{id}/estado?estado=` | Actualizar solo el estado |
| DELETE | `/api/pedidos/{id}` | Eliminar pedido |

**Estados de pedido:** `PENDIENTE` · `EN_PROCESO` · `ENVIADO` · `ENTREGADO` · `CANCELADO`

**Ejemplo de body para crear pedido:**
```json
{
  "clienteId": "US100005",
  "fechaPedido": "2026-05-25",
  "detalles": [
    { "productoId": "PR200001", "cantidad": 2, "precioUnitario": 89990.0 },
    { "productoId": "PR200003", "cantidad": 1, "precioUnitario": 54990.0 }
  ]
}
```

---

### Envíos `/api/envios`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/envios` | Obtener todos los envíos |
| GET | `/api/envios/{id}` | Obtener envío por ID |
| GET | `/api/envios/pedido/{pedidoId}` | Envíos de un pedido |
| GET | `/api/envios/estado/{estado}` | Filtrar por estado |
| POST | `/api/envios` | Crear envío (retorna 400 si el pedido ya tiene uno) |
| PUT | `/api/envios/{id}` | Actualizar envío |
| DELETE | `/api/envios/{id}` | Eliminar envío |

**Estados de envío:** `PREPARANDO` · `EN_CAMINO` · `ENTREGADO` · `FALLIDO`

---

### Usuarios `/api/usuarios`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios` | Obtener todos los usuarios |
| GET | `/api/usuarios/{id}` | Obtener usuario por ID |
| GET | `/api/usuarios/email/{email}` | Buscar por email |
| GET | `/api/usuarios/rol/{rol}` | Filtrar por rol |
| POST | `/api/usuarios` | Crear usuario (password se hashea con BCrypt) |
| POST | `/api/usuarios/login` | Iniciar sesión — retorna `{ token, usuario }` |
| PUT | `/api/usuarios/{id}` | Actualizar usuario |
| DELETE | `/api/usuarios/{id}` | Eliminar usuario |

**Roles disponibles:** `ADMIN` · `EMPLEADO` · `CLIENTE`  
**Estados disponibles:** `ACTIVO` · `INACTIVO`

**Respuesta de login:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "usuario": {
    "usuarioId": "US100001",
    "nombre": "Aracely Escobar",
    "email": "admin@smartlogix.com",
    "rol": "ADMIN",
    "estado": "ACTIVO"
  }
}
```

---

## Datos de prueba precargados

Flyway inserta automáticamente los datos de prueba al levantar cada servicio (migración V2).

### Productos (10)

| ID | Nombre | Categoría | Precio | Stock |
|----|--------|-----------|--------|-------|
| PR200001 | Zapatillas Nike Air Max | Calzado | $89.990 | 45 |
| PR200002 | Polera Adidas Oversized | Ropa | $24.990 | 60 |
| PR200003 | Jeans Levi's 501 | Ropa | $54.990 | 30 |
| PR200004 | Chaqueta Zara Cuero | Ropa | $79.990 | 20 |
| PR200005 | Base MAC Studio Fix | Maquillaje | $34.990 | 50 |
| PR200006 | Labial Charlotte Tilbury | Maquillaje | $28.990 | 40 |
| PR200007 | Paleta Sombras Urban Decay | Maquillaje | $49.990 | 25 |
| PR200008 | Collar Dorado TodoModa | Accesorios | $12.990 | 80 |
| PR200009 | Cartera Michael Kors | Accesorios | $119.990 | 15 |
| PR200010 | Gafas Ray-Ban Wayfarer | Accesorios | $89.990 | 20 |

### Pedidos (10)

| ID | Cliente | Estado | Total |
|----|---------|--------|-------|
| PE300001 | Juan Soto | ENTREGADO | $139.970 |
| PE300002 | Valentina Mora | ENTREGADO | $69.980 |
| PE300003 | Diego Fuentes | ENTREGADO | $104.980 |
| PE300004 | Camila Torres | ENVIADO | $119.990 |
| PE300005 | Juan Soto | ENVIADO | $70.970 |
| PE300006 | Valentina Mora | EN_PROCESO | $79.990 |
| PE300007 | Diego Fuentes | EN_PROCESO | $139.970 |
| PE300008 | Camila Torres | PENDIENTE | $89.990 |
| PE300009 | Juan Soto | PENDIENTE | $89.980 |
| PE300010 | Valentina Mora | CANCELADO | $28.990 |

### Envíos (7)

| ID | Pedido | Transportista | Ciudad | Estado |
|----|--------|---------------|--------|--------|
| EN400001 | PE300001 | Chilexpress | Valparaíso | ENTREGADO |
| EN400002 | PE300002 | Starken | Viña del Mar | ENTREGADO |
| EN400003 | PE300003 | Correos Chile | Santiago | ENTREGADO |
| EN400004 | PE300004 | Chilexpress | Concepción | EN_CAMINO |
| EN400005 | PE300005 | Starken | La Serena | EN_CAMINO |
| EN400006 | PE300006 | Correos Chile | Temuco | PREPARANDO |
| EN400007 | PE300007 | Chilexpress | Antofagasta | PREPARANDO |

---

## Pruebas unitarias

```bash
cd backend/inventario-service && ./mvnw test
cd backend/pedidos-service    && ./mvnw test
cd backend/envios-service     && ./mvnw test
cd backend/usuarios-service   && ./mvnw test
```

**Resultado esperado: 40 tests, 0 fallos** (10 por servicio). Los tests usan Mockito para aislar la capa de repositorio y no requieren una base de datos activa.

El reporte de cobertura JaCoCo se genera en `target/site/jacoco/index.html` de cada servicio. El pipeline de CI también lo sube como artefacto descargable en cada ejecución.

---

## CI/CD

El archivo [`.github/workflows/ci.yml`](.github/workflows/ci.yml) ejecuta los tests de los 4 microservicios en paralelo (matrix strategy) en cada push o pull request a las ramas `develop` y `main`. Cada job levanta un contenedor PostgreSQL para las migraciones Flyway y sube el reporte JaCoCo como artefacto.

---

## Ramas

| Rama | Descripción |
|------|-------------|
| `main` | Versión estable |
| `develop` | Desarrollo activo |
