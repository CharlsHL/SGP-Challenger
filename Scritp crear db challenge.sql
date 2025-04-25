-- Crear base de datos
CREATE DATABASE IF NOT EXISTS ProyectoGestionDB;
USE ProyectoGestionDB;

-- Tabla Usuario
CREATE TABLE Usuario (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Contraseña VARCHAR(255) NOT NULL,
    FechaRegistro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Activo TINYINT(1) NOT NULL DEFAULT 1 -- Campo para borrado lógico
);

-- Tabla Proyecto
CREATE TABLE Proyecto (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(200) NOT NULL,
    Descripcion TEXT,
    FechaInicio DATE,
    FechaFin DATE,
    Estado ENUM('Activo', 'Completado', 'Cancelado', 'Eliminado') DEFAULT 'Activo',
    UsuarioId INT NOT NULL,
    FOREIGN KEY (UsuarioId) REFERENCES Usuario(Id) ON DELETE CASCADE
);