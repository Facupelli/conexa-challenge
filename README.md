# Gestión de películas y series API

Backend realizado con NestJS, que gestiona información de películas y series utilizando la API de Star Wars (SWAPI) como fuente de datos. Este proyecto implementa un sistema de autenticación, control de acceso basado en roles y gestión de películas.

## 🚀 Funcionalidades

- **Autenticación y Autorización**

  - Autenticación basada en JWT con Passport.js
  - Autorización basada en roles (Admin y Usuarios Regulares)
  - Registro y inicio de sesión de usuarios

- **Manejo de Películas**

  - Listado de todas las películas
  - Obtención de detalles detallados de una película
  - Creación de nuevas películas (solo para Admin)
  - Actualización de películas existentes (solo para Admin)
  - Eliminación de películas (solo para Admin)
  - Sincronización con la API de Star Wars (solo para Admin)

- **Tecnologías**
  - Desarrollado con NestJS
  - Pruebas unitarias para la capa de servicios
  - Documentación de la API con Swagger
  - Integración con base de datos PostgreSQL mediante Prisma ORM

## 📋 Requisitos para correr la app

- Node.js (v14 o mayor)
- npm o yarn
- PostgreSQL
- Git

## 🛠️ Instalación del proyecto

1. Clonar el repositorio

```bash
git clone https://github.com/Facupelli/conexa-challenge.git
cd conexa-challenge
```

2. Instalar dependencias

```bash
npm install
```

3. Crear un archivo `.env` en la raiz del directorio con las siguientes variables:

```env
DATABASE_URL=postgresql://tu_usuario:tu_contraseña@tu_servidor:tu_puerto/tu_base_de_datos
JWT_SECRET=tu_secreto_de_jwt
ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC=3600
```

4. Run database migrations

```bash
npm run migration:run
```

## 🚀 Corriendo la app

### Usando Docker

```bash
docker-compose up -d
```

### Desarrollo

```bash
npm run start:dev
```

### Producción

```bash
npm run build
npm run start:prod
```

### Correr tests

```bash
# unit tests
npm run test
```

## 📚 Documentación de la API

### Swagger

Se puede acceder a la documentación de la API en: `http://localhost:3000/api/docs`

### Endpoints

#### Autenticación (Públicos)

- `POST /auth/register` - Registra un nuevo usuario
- `POST /auth/login` - Iniciar sesión (obtiene un token JWT)

#### Peliculas

Públicos:

- `GET /movies` - Obtiene todas las películas

Autenticados:

- `GET /movies/:id` - Obtiene una película por su ID (Solo Usuarios Regulares)
- `POST /movies` - Crea una nueva película (Admin )
- `PUT /movies/:id` - Actualiza una película (Admin )
- `DELETE /movies/:id` - Borra una película (Admin )
- `POST /movies/sync` - Sincroniza los datos de la API de Star Wars con las base de datos del proyecto (Admin )

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Incluye el token en la cabecera de autorización:

```
Authorization: Bearer your_jwt_token
```

## 🌐 Live Demo

La api se encuentra deployada en `Render` y se puede acceder a través de la siguiente URL: `https://conexa-challenge-qz0b.onrender.com`.
Tener en cuenta que es un hosting gratiuito, el servicio entra en modo "sleep" cuando no se utiliza. El primer request luego de inactividad puede dermorar hasta 50 segundos en responder.

La base de datos ya tiene 2 usuarios registrados con los cuales se puede probar la API:

- **Usuario Admin**: Email: `admin@conexa.com`, Contraseña: `12345678`
- **Usuario Regular**: Email: `regular@conexa.com`, Contraseña: `12345678`

## Faltantes

Agregar unit tests para controladores y restricción de acceso
