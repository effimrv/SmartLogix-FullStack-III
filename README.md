# SmartLogix-FullStack-III

Descripción del Proyecto

SmartLogix es una plataforma logística orientada a pequeñas y medianas empresas (PYMEs) de eCommerce, diseñada para optimizar la gestión de inventario, pedidos y envíos mediante una arquitectura basada en microservicios.

El sistema busca reemplazar soluciones monolíticas tradicionales, mejorando la escalabilidad, mantenibilidad y eficiencia operativa.

# Arquitectura del Sistema

El proyecto está basado en una arquitectura de microservicios, donde cada servicio es independiente y enfocado en un dominio específico del negocio.

Componentes principales:

* Frontend desarrollado en React
* API Gateway como punto de entrada único
* Cuatro microservicios:
    * Inventario
    * Pedidos
    * Envíos
    * Usuarios
* Base de datos relacional (MySQL o PostgreSQL)
* Contenerización con Docker

# Estructura del Proyecto

--

# Tecnologías Utilizadas

-- Backend --

* Java
* Spring Boot
* Maven
* Spring Data JPA
* Spring Security
* JWT

-- Frontend --

* React

-- Base de Datos -- 

* MySQL 

# Herramientas

* Docker
* Postman
* GitHub
* Draw.io


# Microservicios

-- Inventario --

Gestiona los productos y el stock disponible.

Funciones:

* Registro de productos
* Control de stock
* Consulta de disponibilidad


-- Pedidos --

Gestiona el ciclo de vida de los pedidos.

Funciones:

* Creación de pedidos
* Validación de compra
* Registro de detalle

-- Envíos --

Administra la logística de entrega.

Funciones:

* Registro de envíos
* Actualización de estado
* Gestión de direcciones


-- Usuarios --

Gestiona la información de los clientes.

Funciones:

* Registro de usuarios
* Gestión de perfiles
* Almacenamiento de datos


-- Seguridad --

El sistema implementa seguridad mediante:

* Autenticación con JWT (JSON Web Token)
* Validación de solicitudes en API Gateway
* Control de acceso basado en roles
* Comunicación segura mediante HTTPS


# Flujo del Sistema

1. El usuario realiza una solicitud desde el frontend.
2. La solicitud pasa por el API Gateway.
3. Se valida el token JWT.
4. El microservicio de Pedidos procesa la solicitud.
5. Se consulta el microservicio de Inventario.
6. Se valida el stock y se registra el pedido.
7. Se genera el envío en el microservicio de Envíos.
8. Se asocia la información del usuario.

# Base de Datos

El sistema utiliza una base de datos relacional centralizada compartida entre los microservicios.

Tablas principales:

* Productos / Inventario
* Pedidos
* Detalle de pedidos
* Envíos
* Usuarios

Nota: Como mejora futura, se considera implementar el patrón “Database per Service”.


# Ejecución del Proyecto

-- Backend --

Para ejecutar cada microservicio:

mvn spring-boot:run

Cada servicio corre en un puerto distinto:

* API Gateway → 8080
* Inventario → 8001
* Pedidos → 8002
* Envíos → 8003
* Usuarios → 8004


-- Frontend --

npm install
npm start


# Trabajo Colaborativo

El desarrollo se realiza mediante GitHub utilizando ramas:

* Rama principal: main
* Ramas de desarrollo: feature/*

Distribución del equipo:

* Integrante 1:
    * API Gateway
    * Inventario
    * Pedidos
* Integrante 2:
    * Envíos
    * Usuarios


# Patrones de Diseño

* Repository Pattern
* Arquitectura en capas (Controller - Service - Repository)
* Strategy Pattern (aplicado en Envíos)
* MVC en frontend


# Estado del Proyecto

Proyecto en desarrollo académico, enfocado en la implementación progresiva de arquitectura de microservicios, integración de componentes y buenas prácticas de desarrollo.

# Autores

Yannella Castilla
Aracely Escobar
