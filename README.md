# SGP Challenge

Este repositorio contiene la solución al **SGP Challenge**, una aplicación full-stack con Frontend en Angular y Backend en .NET Core. A continuación encontrarás la descripción general, requisitos e instrucciones de instalación.

---

## 📂 Estructura del proyecto

/ ├── Front-SGP/ # Frontend Angular │ ├── src/ │ ├── angular.json │ └── package.json ├── SGP-API/ # Backend .NET Core │ ├── Controllers/ │ ├── Data/ # DbContext y configuraciones EF Core │ ├── DTOs/ │ ├── Mappings/ # Perfiles AutoMapper │ ├── Models/ # Entidades │ ├── Repositories/ # Patrón Repository │ ├── Services/ # Patrón Service │ ├── Startup.cs │ └── SGP.API.csproj └── .gitignore

markdown
Copiar
Editar

---

## 🚀 Requisitos Frontend

- **Angular**  
- **PrimeNG** para componentes de UI  
- **Formularios Reactivos** (`@angular/forms`)  
- **Tabla con filtros**  
- **Redux / NGRX** para manejo de estado  
  - [Documentación NGRX](https://ngrx.io/guide/store)  

### Instalación y ejecución

```bash
cd Front-SGP
npm install
ng serve
Accede a: http://localhost:4200

🚀 Requisitos Backend
.NET 6+ / .NET 7+

Entity Framework Core

Base de datos: MySQL

AutoMapper para mapeo DTO ↔ Entidad

Patrón Repository (interfaces + implementaciones)

Patrón Service (lógica de negocio)

Inyección de Dependencias con el contenedor de .NET Core

Configuración
Ajusta tu cadena de conexión en appsettings.json:

json
Copiar
Editar
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=SGP;User=root;Password=tu_password;"
  }
}
Aplica migraciones:

bash
Copiar
Editar
cd SGP-API
dotnet ef database update
Ejecuta la API:

bash
Copiar
Editar
dotnet run
La API quedará disponible en https://localhost:5001/api

🔄 Flujo de trabajo
Frontend llama a Endpoints REST del Backend.

Controllers reciben DTOs y llaman a Services.

Services usan Repositories para CRUD sobre EF Core / MySQL.

AutoMapper convierte entre Entidades y DTOs.

NGRX en frontend mantiene el estado de usuarios y proyectos; despliega tablas con filtros y formularios reactivos.

📚 Recursos
Angular

PrimeNG

Reactive Forms

NGRX Guide

Entity Framework Core

AutoMapper

