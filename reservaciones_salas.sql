-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-11-2025 a las 05:46:36
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reservaciones_salas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `correo`, `telefono`) VALUES
(1, 'Juan Pérez', 'juan.perez@example.com', '555-1234'),
(2, 'María López', 'maria.lopez@example.com', '555-5678'),
(3, 'Carlos Ramírez', 'carlos.ramirez@example.com', '555-9012'),
(4, 'Ana Torres', 'ana.torres@example.com', '555-3456'),
(5, 'Luis Fernández', 'luis.fernandez@example.com', '555-7890');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservaciones`
--

CREATE TABLE `reservaciones` (
  `id_reservacion` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_sala` int(11) NOT NULL,
  `fecha_reservacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reservaciones`
--

INSERT INTO `reservaciones` (`id_reservacion`, `id_cliente`, `id_sala`, `fecha_reservacion`) VALUES
(1, 1, 1, '2025-11-18'),
(2, 2, 3, '2025-11-18'),
(3, 3, 2, '2025-11-19'),
(4, 4, 1, '2025-11-20'),
(5, 5, 4, '2025-11-21'),
(6, 1, 2, '2025-11-22'),
(7, 3, 3, '2025-11-23'),
(8, 2, 4, '2025-11-24'),
(9, 5, 2, '2025-11-25'),
(10, 4, 3, '2025-11-26'),
(11, 1, 5, '2025-11-27'),
(12, 2, 1, '2025-11-28'),
(13, 3, 4, '2025-11-29'),
(14, 4, 2, '2025-11-30'),
(15, 5, 1, '2025-12-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `id_sala` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`id_sala`, `nombre`, `capacidad`, `descripcion`) VALUES
(1, 'Sala Principal', 50, 'Sala grande equipada con proyector y sistema de audio.'),
(2, 'Sala Ejecutiva', 20, 'Sala ejecutiva con mesa de conferencias.'),
(3, 'Sala de Reuniones', 12, 'Sala pequeña para reuniones rápidas.'),
(4, 'Auditorio', 100, 'Auditorio amplio con escenario.'),
(5, 'Sala Creativa', 15, 'Espacio informal para talleres y dinámicas creativas.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD PRIMARY KEY (`id_reservacion`),
  ADD KEY `fk_res_cliente` (`id_cliente`),
  ADD KEY `fk_res_sala` (`id_sala`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id_sala`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  MODIFY `id_reservacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `salas`
--
ALTER TABLE `salas`
  MODIFY `id_sala` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD CONSTRAINT `fk_res_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_res_sala` FOREIGN KEY (`id_sala`) REFERENCES `salas` (`id_sala`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
