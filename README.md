# Sistema de Gestión de Turnos

Sistema web para la gestión de turnos y servicios, desarrollado con Node.js, Express y MySQL.

## Requisitos Previos
- Node.js
- MySQL
- npm

## Instalación
1. Clonar el repositorio
2. Ejecutar `npm install`
3. Configurar variables de entorno en `.env`:
```env
DB_NAME=Proyecto_Reservas
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_DIALECT=mysql
DB_PORT=3306
SECRET=tu_secreto
```

## Estructura del Proyecto

### Controladores
- `auth/`: Autenticación y registro
- `services/`: Gestión de servicios
- `appointment/`: Gestión de turnos
- `user/`: Gestión de usuarios

### Modelos
- `User`: Usuarios del sistema
- `Servicios`: Servicios disponibles
- `Turnos`: Gestión de citas

### Middleware
- `authMiddleware.js`: Control de autenticación
- `sessionMiddleware.js`: Gestión de sesiones

## Características
- Autenticación de usuarios
- Gestión de servicios
- Sistema de reserva de turnos
- Panel administrativo
- API REST
- Interfaz responsive

## Uso
```bash
npm start
```
Acceder a `http://localhost:3000`

## API Endpoints

### Usuarios
- GET `/user`: Lista usuarios
- POST `/user/new`: Crea usuario
- GET `/user/:id`: Obtiene usuario
- POST `/user/:id/update`: Actualiza usuario

### Servicios
- GET `/servicio`: Lista servicios
- POST `/servicio/create`: Crea servicio
- GET `/servicio/:id`: Obtiene servicio
- POST `/servicio/update/:id`: Actualiza servicio

### Turnos
- GET `/turno`: Lista turnos
- POST `/turno/create`: Crea turno
- GET `/turno/:id`: Obtiene turno
- POST `/turno/update/:id`: Actualiza turno

## Licencia
MIT