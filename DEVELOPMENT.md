# BusI - Landing Page

**BusI** es una plataforma de gestión integral de transporte escolar en tiempo real.

## Estructura del Proyecto

```
busi-api/          # Backend REST API (Spring Boot, Java 21)
web-ui/            # Frontend (React, Vite)
```

## Requisitos Previos

- **Backend**:
  - Java 21+
  - PostgreSQL 12+
  - Gradle 8.0+

- **Frontend**:
  - Node.js 18+ y npm
  
## Configuración de la Base de Datos

Asegúrate de que PostgreSQL esté corriendo y crea la base de datos:

```sql
CREATE DATABASE busi;
```

La configuración de conexión está en `busi-api/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/busi
spring.datasource.username=postgres
spring.datasource.password=postgres
```

## Configuración local con `.env` (recomendado)

En `busi-api` puedes definir variables locales en un archivo `.env`.
Spring lo carga automáticamente por `spring.config.import`.

1. Copia el ejemplo:

```bash
cd busi-api
copy .env.example .env
```

2. Completa tus valores reales de base de datos en `.env`.

## Ejecutar el Proyecto

### Backend (API)

```bash
cd busi-api
./gradlew.bat bootRun
```

El API correrá en `http://localhost:8080`

**Endpoints principales:**
- `GET /health` - Health check
- `GET /api/landing/health` - Landing API health
- `GET /api/landing/stats` - Estadísticas de la plataforma
- `POST /api/landing/contact` - Registrar solicitud de contacto

### Frontend (Landing Page)

```bash
cd web-ui
npm install  # Solo la primera vez
npm run dev
```

La página estará disponible en `http://localhost:5173`

**Nota (dev):** el frontend proxyfía las llamadas a `/api` hacia `http://localhost:8080` para evitar problemas de CORS.

## Estructura del Backend

```
busi-api/src/main/java/augusto/machado/busiapi/
├── controller/
│   ├── HealthController.java      # Health check
│   └── LandingController.java      # Endpoints de landing page
├── service/
│   └── ContactRequestService.java  # Lógica de contactos
├── repository/
│   ├── ContactRepository.java
│   └── ContactRequestRepository.java
├── dto/
│   └── ContactRequestDTO.java      # DTO para requests de contacto
├── config/
│   └── SecurityConfig.java         # Configuración de seguridad y CORS
└── BusiApiApplication.java         # Punto de entrada
```

## Estructura del Frontend

```
web-ui/src/
├── App.jsx          # Componente principal con landing page
├── App.css          # Estilos de la landing page
├── main.jsx         # Punto de entrada
└── assets/
```

## Features Actuales

### Landing Page
- ✅ 6 secciones principales (Presentación, Problema, Solución, Cómo Funciona, Beneficios, Acciones)
- ✅ Animación de "micro" que progresa con scroll
- ✅ Barra lateral con indicadores de sección
- ✅ Formulario de contacto/solicitud de demo
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Footer con información de contacto

### API Backend
- ✅ Endpoint para registrar solicitudes de contacto
- ✅ Validación de datos con Jakarta Validation
- ✅ CORS configurado para desarrollo
- ✅ Base de datos PostgreSQL con JPA/Hibernate

## Cómo Usar el Formulario de Contacto

1. En la landing page, desplázate hasta la sección "Acciones" (#acciones)
2. Completa el formulario con:
   - Nombre completo (requerido)
   - Correo electrónico (requerido, validado)
   - Teléfono (opcional)
   - Mensaje (requerido)
3. Haz clic en "Enviar consulta"
4. El formulario enviará los datos al backend (`POST /api/landing/contact`)
5. Recibirás una confirmación de éxito o error

## Notas Técnicas

- **Framework Frontend**: React 19.2.0 + Vite
- **Framework Backend**: Spring Boot 4.0.3
- **Base de Datos**: PostgreSQL con JPA/Hibernate
- **Autenticación**: Actualmente ninguna (landing page pública)
- **CORS**: Configurado para `localhost:5173` (desarrollo)

## Próximos Pasos

- Agregar autenticación de usuarios
- Crear páginas de login/registro
- Integrar mapas en tiempo real
- Crear dashboards para escuelas, choferes y familias
- Implementar WebSocket para seguimiento en tiempo real
