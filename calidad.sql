-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-04-2020 a las 15:18:14
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `calidad`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adjuntos`
--

CREATE TABLE `adjuntos` (
  `codigo_adjunto` int(11) NOT NULL,
  `numero_evaluacion` int(11) NOT NULL,
  `fecha_carga` date NOT NULL,
  `periodo` varchar(7) COLLATE utf8_spanish_ci NOT NULL,
  `nombre_original` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `archivo_server` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `codigo_area` int(11) NOT NULL,
  `nombre_area` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `estado` int(11) NOT NULL,
  `fecha_creacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `audio`
--

CREATE TABLE `audio` (
  `numero_evaluacion` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `nombre_audio` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `periodo` varchar(7) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `codigo_categoria` int(11) NOT NULL,
  `codigo_area` int(11) NOT NULL,
  `nombre_categoria` int(11) NOT NULL,
  `peso_categoria` int(11) NOT NULL,
  `orden` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciclo`
--

CREATE TABLE `ciclo` (
  `codigo_ciclo` int(11) NOT NULL,
  `nombre_ciclo` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `sigla_ciclo` varchar(4) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_evaluacion_final`
--

CREATE TABLE `detalle_evaluacion_final` (
  `numero_evaluacion` int(11) NOT NULL,
  `numero_final` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_evaluacion_parcial`
--

CREATE TABLE `detalle_evaluacion_parcial` (
  `id` int(11) NOT NULL,
  `numero_evaluacion` int(11) NOT NULL,
  `codigo_item` int(11) NOT NULL,
  `nota` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_evaluacion_quincenal`
--

CREATE TABLE `detalle_evaluacion_quincenal` (
  `numero_evaluacion` int(11) NOT NULL,
  `numero_quincenal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ejecutivo`
--

CREATE TABLE `ejecutivo` (
  `rut_ejecutivo` int(11) NOT NULL,
  `nombre_ejecutivo` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_inicio` date NOT NULL,
  `codigo_estado` int(11) NOT NULL,
  `correo` varchar(250) COLLATE utf8_spanish_ci NOT NULL,
  `codigo_ciclo` int(11) NOT NULL,
  `codigo_area` int(11) NOT NULL,
  `codigo_jornada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluaciones_area`
--

CREATE TABLE `evaluaciones_area` (
  `id` int(11) NOT NULL,
  `codigo_area` int(11) NOT NULL,
  `periodo` varchar(7) COLLATE utf8_spanish_ci NOT NULL,
  `cantidad_quincenales` int(11) DEFAULT NULL,
  `cantidad_finales` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_final`
--

CREATE TABLE `evaluacion_final` (
  `numero_final` int(11) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `periodo` varchar(7) COLLATE utf8_spanish_ci NOT NULL,
  `rut_ejecutivo` int(11) NOT NULL,
  `rut_evaluador` int(11) NOT NULL,
  `codigo_area` int(11) NOT NULL,
  `observaciones` text COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_parcial`
--

CREATE TABLE `evaluacion_parcial` (
  `numero_evaluacion` int(11) NOT NULL,
  `fecha_evaluacion` date NOT NULL,
  `periodo` varchar(7) COLLATE utf8_spanish_ci NOT NULL,
  `rut_ejecutivo` int(11) NOT NULL,
  `rut_evaluador` int(11) NOT NULL,
  `nota_final` bigint(20) DEFAULT NULL,
  `observacion` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `codigo_area` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion_quincenal`
--

CREATE TABLE `evaluacion_quincenal` (
  `numero_quincenal` int(11) NOT NULL,
  `rut_ejecutivo` int(11) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `rut_evaluador` int(11) NOT NULL,
  `periodo` varchar(7) COLLATE utf8_spanish_ci NOT NULL,
  `codigo_area` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluador`
--

CREATE TABLE `evaluador` (
  `rut_evaluador` int(11) NOT NULL,
  `nombre_evaluador` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `usuario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `contrasena` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `fecha_creacion` date NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item_evaluacion`
--

CREATE TABLE `item_evaluacion` (
  `codigo_item` int(11) NOT NULL,
  `codigo_categoria` int(11) NOT NULL,
  `nombre_item` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `orden` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jornada`
--

CREATE TABLE `jornada` (
  `codigo_jornada` int(11) NOT NULL,
  `nombre_jornada` varchar(20) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_audio`
--

CREATE TABLE `log_audio` (
  `id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario` int(11) NOT NULL,
  `numero_evaluacion` int(11) NOT NULL,
  `fecha_carga` date NOT NULL,
  `nombre_audio` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `periodo` varchar(7) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_detalle_evaluacion_parcial`
--

CREATE TABLE `log_detalle_evaluacion_parcial` (
  `id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario` int(11) DEFAULT NULL,
  `numero_evaluacion` int(11) NOT NULL,
  `codigo_item` int(11) NOT NULL,
  `nota` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_evaluacion_parcial`
--

CREATE TABLE `log_evaluacion_parcial` (
  `id` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `usuario` int(11) DEFAULT NULL,
  `numero_evaluacion` int(11) NOT NULL,
  `fecha_evaluacion` date NOT NULL,
  `rut_ejecutivo` int(11) NOT NULL,
  `rut_evaluador` int(11) NOT NULL,
  `nota_final` bigint(20) NOT NULL,
  `observación` text COLLATE utf8_spanish_ci NOT NULL,
  `codigo_area` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adjuntos`
--
ALTER TABLE `adjuntos`
  ADD PRIMARY KEY (`codigo_adjunto`),
  ADD KEY `codigo_adjunto` (`codigo_adjunto`,`numero_evaluacion`,`periodo`),
  ADD KEY `FK_adjuntos_evaluacion` (`numero_evaluacion`);

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`codigo_area`),
  ADD KEY `codigo_area` (`codigo_area`);

--
-- Indices de la tabla `audio`
--
ALTER TABLE `audio`
  ADD PRIMARY KEY (`numero_evaluacion`),
  ADD KEY `numero_evaluacion` (`numero_evaluacion`,`nombre_audio`,`periodo`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`codigo_categoria`),
  ADD KEY `codigo_categoria` (`codigo_categoria`,`codigo_area`),
  ADD KEY `FK_categoria_area` (`codigo_area`);

--
-- Indices de la tabla `ciclo`
--
ALTER TABLE `ciclo`
  ADD PRIMARY KEY (`codigo_ciclo`),
  ADD KEY `codigo_ciclo` (`codigo_ciclo`,`sigla_ciclo`);

--
-- Indices de la tabla `detalle_evaluacion_final`
--
ALTER TABLE `detalle_evaluacion_final`
  ADD KEY `numero_evaluacion` (`numero_evaluacion`,`numero_final`),
  ADD KEY `fk_evalfinaldet_final` (`numero_final`);

--
-- Indices de la tabla `detalle_evaluacion_parcial`
--
ALTER TABLE `detalle_evaluacion_parcial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`numero_evaluacion`,`codigo_item`),
  ADD KEY `FK_evalpardet_item` (`codigo_item`),
  ADD KEY `FK_evalpardet_evaluacion` (`numero_evaluacion`);

--
-- Indices de la tabla `detalle_evaluacion_quincenal`
--
ALTER TABLE `detalle_evaluacion_quincenal`
  ADD KEY `FK_detevalquin_quincenal` (`numero_quincenal`),
  ADD KEY `FK_detevalquin_evalpar` (`numero_evaluacion`);

--
-- Indices de la tabla `ejecutivo`
--
ALTER TABLE `ejecutivo`
  ADD PRIMARY KEY (`rut_ejecutivo`,`codigo_area`),
  ADD KEY `rut_ejecutivo` (`rut_ejecutivo`,`codigo_ciclo`,`codigo_area`,`codigo_jornada`),
  ADD KEY `FK_ciclo_ejecutivo` (`codigo_ciclo`),
  ADD KEY `FK_jornada_ejecutivo` (`codigo_jornada`),
  ADD KEY `FK_area_ejecutivo` (`codigo_area`);

--
-- Indices de la tabla `evaluaciones_area`
--
ALTER TABLE `evaluaciones_area`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`codigo_area`,`periodo`),
  ADD KEY `FK_evaarea_area` (`codigo_area`);

--
-- Indices de la tabla `evaluacion_final`
--
ALTER TABLE `evaluacion_final`
  ADD PRIMARY KEY (`numero_final`),
  ADD KEY `rut_ejecutivo` (`rut_ejecutivo`,`rut_evaluador`,`codigo_area`),
  ADD KEY `fk_evalfinal_evaluador` (`rut_evaluador`),
  ADD KEY `fk_evalfinal_areaejecutivo` (`codigo_area`);

--
-- Indices de la tabla `evaluacion_parcial`
--
ALTER TABLE `evaluacion_parcial`
  ADD PRIMARY KEY (`numero_evaluacion`),
  ADD KEY `numero_evaluacion` (`numero_evaluacion`,`periodo`,`rut_ejecutivo`,`rut_evaluador`,`codigo_area`),
  ADD KEY `FK_evalpar_ejecutivo` (`rut_ejecutivo`),
  ADD KEY `FK_evalpar_evaluador` (`rut_evaluador`),
  ADD KEY `FK_evalpar_ejecutivoarea` (`codigo_area`);

--
-- Indices de la tabla `evaluacion_quincenal`
--
ALTER TABLE `evaluacion_quincenal`
  ADD PRIMARY KEY (`numero_quincenal`),
  ADD KEY `numero_quincenal` (`numero_quincenal`,`rut_ejecutivo`,`rut_evaluador`,`periodo`),
  ADD KEY `codigo_area` (`codigo_area`),
  ADD KEY `FK_evaquin_ejecutivo` (`rut_ejecutivo`),
  ADD KEY `FK_evaquin_evaluador` (`rut_evaluador`);

--
-- Indices de la tabla `evaluador`
--
ALTER TABLE `evaluador`
  ADD PRIMARY KEY (`rut_evaluador`),
  ADD KEY `rut_evaluador` (`rut_evaluador`,`usuario`);

--
-- Indices de la tabla `item_evaluacion`
--
ALTER TABLE `item_evaluacion`
  ADD PRIMARY KEY (`codigo_item`),
  ADD KEY `codgo_item` (`codigo_item`,`codigo_categoria`),
  ADD KEY `FK_itemeval_categoria` (`codigo_categoria`);

--
-- Indices de la tabla `jornada`
--
ALTER TABLE `jornada`
  ADD PRIMARY KEY (`codigo_jornada`),
  ADD KEY `codigo_jornada` (`codigo_jornada`);

--
-- Indices de la tabla `log_audio`
--
ALTER TABLE `log_audio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`fecha`,`usuario`,`numero_evaluacion`),
  ADD KEY `periodo` (`periodo`);

--
-- Indices de la tabla `log_detalle_evaluacion_parcial`
--
ALTER TABLE `log_detalle_evaluacion_parcial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`fecha`,`usuario`,`numero_evaluacion`);

--
-- Indices de la tabla `log_evaluacion_parcial`
--
ALTER TABLE `log_evaluacion_parcial`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`fecha`,`usuario`,`numero_evaluacion`,`rut_ejecutivo`,`rut_evaluador`,`codigo_area`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `codigo_area` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `audio`
--
ALTER TABLE `audio`
  MODIFY `numero_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `codigo_categoria` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ciclo`
--
ALTER TABLE `ciclo`
  MODIFY `codigo_ciclo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_evaluacion_parcial`
--
ALTER TABLE `detalle_evaluacion_parcial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluaciones_area`
--
ALTER TABLE `evaluaciones_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluacion_final`
--
ALTER TABLE `evaluacion_final`
  MODIFY `numero_final` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluacion_parcial`
--
ALTER TABLE `evaluacion_parcial`
  MODIFY `numero_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluacion_quincenal`
--
ALTER TABLE `evaluacion_quincenal`
  MODIFY `numero_quincenal` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `item_evaluacion`
--
ALTER TABLE `item_evaluacion`
  MODIFY `codigo_item` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jornada`
--
ALTER TABLE `jornada`
  MODIFY `codigo_jornada` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `log_audio`
--
ALTER TABLE `log_audio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `log_detalle_evaluacion_parcial`
--
ALTER TABLE `log_detalle_evaluacion_parcial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `log_evaluacion_parcial`
--
ALTER TABLE `log_evaluacion_parcial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adjuntos`
--
ALTER TABLE `adjuntos`
  ADD CONSTRAINT `FK_adjuntos_evaluacion` FOREIGN KEY (`numero_evaluacion`) REFERENCES `evaluacion_parcial` (`numero_evaluacion`);

--
-- Filtros para la tabla `audio`
--
ALTER TABLE `audio`
  ADD CONSTRAINT `FK_audio_evaluacion` FOREIGN KEY (`numero_evaluacion`) REFERENCES `evaluacion_parcial` (`numero_evaluacion`);

--
-- Filtros para la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `FK_categoria_area` FOREIGN KEY (`codigo_area`) REFERENCES `area` (`codigo_area`);

--
-- Filtros para la tabla `detalle_evaluacion_final`
--
ALTER TABLE `detalle_evaluacion_final`
  ADD CONSTRAINT `fk_evalfinaldet_final` FOREIGN KEY (`numero_final`) REFERENCES `evaluacion_final` (`numero_final`),
  ADD CONSTRAINT `fk_evalfinaldet_parcial` FOREIGN KEY (`numero_evaluacion`) REFERENCES `evaluacion_parcial` (`numero_evaluacion`);

--
-- Filtros para la tabla `detalle_evaluacion_parcial`
--
ALTER TABLE `detalle_evaluacion_parcial`
  ADD CONSTRAINT `FK_evalpardet_evaluacion` FOREIGN KEY (`numero_evaluacion`) REFERENCES `evaluacion_parcial` (`numero_evaluacion`),
  ADD CONSTRAINT `FK_evalpardet_item` FOREIGN KEY (`codigo_item`) REFERENCES `item_evaluacion` (`codigo_item`);

--
-- Filtros para la tabla `detalle_evaluacion_quincenal`
--
ALTER TABLE `detalle_evaluacion_quincenal`
  ADD CONSTRAINT `FK_detevalquin_evalpar` FOREIGN KEY (`numero_evaluacion`) REFERENCES `evaluacion_parcial` (`numero_evaluacion`),
  ADD CONSTRAINT `FK_detevalquin_quincenal` FOREIGN KEY (`numero_quincenal`) REFERENCES `evaluacion_quincenal` (`numero_quincenal`);

--
-- Filtros para la tabla `ejecutivo`
--
ALTER TABLE `ejecutivo`
  ADD CONSTRAINT `FK_area_ejecutivo` FOREIGN KEY (`codigo_area`) REFERENCES `area` (`codigo_area`),
  ADD CONSTRAINT `FK_ciclo_ejecutivo` FOREIGN KEY (`codigo_ciclo`) REFERENCES `ciclo` (`codigo_ciclo`),
  ADD CONSTRAINT `FK_jornada_ejecutivo` FOREIGN KEY (`codigo_jornada`) REFERENCES `jornada` (`codigo_jornada`);

--
-- Filtros para la tabla `evaluaciones_area`
--
ALTER TABLE `evaluaciones_area`
  ADD CONSTRAINT `FK_evaarea_area` FOREIGN KEY (`codigo_area`) REFERENCES `area` (`codigo_area`);

--
-- Filtros para la tabla `evaluacion_final`
--
ALTER TABLE `evaluacion_final`
  ADD CONSTRAINT `fk_evalfinal_areaejecutivo` FOREIGN KEY (`codigo_area`) REFERENCES `ejecutivo` (`codigo_area`),
  ADD CONSTRAINT `fk_evalfinal_ejecutivo` FOREIGN KEY (`rut_ejecutivo`) REFERENCES `ejecutivo` (`rut_ejecutivo`),
  ADD CONSTRAINT `fk_evalfinal_evaluador` FOREIGN KEY (`rut_evaluador`) REFERENCES `evaluador` (`rut_evaluador`);

--
-- Filtros para la tabla `evaluacion_parcial`
--
ALTER TABLE `evaluacion_parcial`
  ADD CONSTRAINT `FK_evalpar_ejecutivo` FOREIGN KEY (`rut_ejecutivo`) REFERENCES `ejecutivo` (`rut_ejecutivo`),
  ADD CONSTRAINT `FK_evalpar_ejecutivoarea` FOREIGN KEY (`codigo_area`) REFERENCES `ejecutivo` (`codigo_area`),
  ADD CONSTRAINT `FK_evalpar_evaluador` FOREIGN KEY (`rut_evaluador`) REFERENCES `evaluador` (`rut_evaluador`);

--
-- Filtros para la tabla `evaluacion_quincenal`
--
ALTER TABLE `evaluacion_quincenal`
  ADD CONSTRAINT `FK_evalquin_area` FOREIGN KEY (`codigo_area`) REFERENCES `area` (`codigo_area`),
  ADD CONSTRAINT `FK_evaquin_ejecutivo` FOREIGN KEY (`rut_ejecutivo`) REFERENCES `ejecutivo` (`rut_ejecutivo`),
  ADD CONSTRAINT `FK_evaquin_evaluador` FOREIGN KEY (`rut_evaluador`) REFERENCES `evaluador` (`rut_evaluador`);

--
-- Filtros para la tabla `item_evaluacion`
--
ALTER TABLE `item_evaluacion`
  ADD CONSTRAINT `FK_itemeval_categoria` FOREIGN KEY (`codigo_categoria`) REFERENCES `categoria` (`codigo_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
