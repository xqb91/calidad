-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-04-2020 a las 15:41:11
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

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`codigo_area`, `nombre_area`, `estado`, `fecha_creacion`) VALUES
(1, 'Cobranza', 1, '2020-04-09'),
(2, 'Calidad del Dato', 1, '2020-04-09'),
(3, 'SAC', 1, '2020-04-09'),
(4, 'Informática', 1, '2020-04-09'),
(5, 'Avatar', 1, '2020-04-09');

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

--
-- Volcado de datos para la tabla `ciclo`
--

INSERT INTO `ciclo` (`codigo_ciclo`, `nombre_ciclo`, `sigla_ciclo`) VALUES
(1, 'Ciclo 1', 'C1'),
(2, 'Ciclo 2', 'C2'),
(3, 'Ciclo 3', 'C3'),
(4, 'Ciclo Especial', 'CE'),
(5, 'Castigo', 'CS'),
(6, 'No Aplica', 'NA'),
(7, 'R1', 'R1'),
(8, 'MA', 'MA');

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

--
-- Volcado de datos para la tabla `evaluaciones_area`
--

INSERT INTO `evaluaciones_area` (`id`, `codigo_area`, `periodo`, `cantidad_quincenales`, `cantidad_finales`) VALUES
(1, 1, '2020-04', 3, 6),
(2, 2, '2020-04', 3, 6),
(3, 3, '2020-04', 6, 12),
(4, 4, '2020-04', 5, 10),
(5, 5, '2020-04', 4, 8);

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

--
-- Volcado de datos para la tabla `evaluador`
--

INSERT INTO `evaluador` (`rut_evaluador`, `nombre_evaluador`, `usuario`, `contrasena`, `fecha_creacion`, `estado`) VALUES
(8001845, 'Francisco Toro', 'ftoro', 'ftoro', '2014-09-04', 1),
(8451769, 'Rosa Cespedes', 'rcespedes', 'rcespedes', '2013-06-19', 1),
(9097045, 'Erika Zapata', 'ezapata', 'ezapata', '2012-09-28', 1),
(10476722, 'Claudia Miranda', 'cmiranda', 'koyam', '2012-09-28', 1),
(11391098, 'Daniel Fuentes', 'dfuentes', 'dfuentes', '2017-11-10', 1),
(12163729, 'Daniel Bustamante', 'dbustamante', 'dbustamante', '2013-06-19', 1),
(12345678, 'Pablo Reinoso', 'riesgo', 'riesgo', '2012-09-28', 1),
(12432380, 'Patricio Palma', 'palma', 'palma', '2013-12-12', 1),
(13069996, 'Monica Marmolejo', '13069996', 'renato', '2012-09-28', 1),
(13665465, 'Rodrigo Castillo', 'rodcastillo', 'rodcastillo', '2012-09-28', 1),
(14120614, 'Rocio Castillo', 'rcastillo', 'rcastillo', '2012-09-28', 1),
(14151509, 'Aldo Pereira', 'apereira', 'apereira', '2013-06-19', 1),
(14542456, 'Jorge Zuniga', 'jzuniga', 'jzuniga', '2012-09-28', 1),
(15337548, 'Angel García C', 'agarcia', '1804', '2012-09-28', 1),
(15837192, 'Yassica Abarza Caro', '15837192', '15837192', '2019-06-26', 1),
(15902137, 'Loreto Rojas', '15902137', '15902137', '2015-07-01', 1),
(16116248, 'Valentina Lizana ', '16116248', '16116248', '2019-02-26', 1),
(16246433, 'Catalina Plaza', '16246433', '16246433', '2014-07-21', 1),
(16383994, 'Valeria Torres', 'vtorres', 'cobranza01791', '2012-09-28', 1),
(16615143, 'Paulina Matus', '16615143', '16615143', '2019-03-13', 1),
(16668246, 'Paulina Garrido', '16668246', '16668246', '2019-12-19', 1),
(16799112, 'Nayareth Toro', 'ntoro', 'ntoro', '2012-09-28', 1),
(16914225, 'Fabiola de Mauro', 'fdmauro', 'fdmauro', '2015-05-27', 1),
(16954407, 'Veronica Carreno', 'vcarreno', 'vcarreno123', '2013-06-19', 1),
(17110903, 'Ruth Araneda', '17110903', '17110903', '2017-04-04', 1),
(17151127, 'Camila Muñoz', '17151127', '17151127', '2020-01-23', 1),
(17229197, 'Daniela Ortega', '17229197', '17229197', '2017-02-08', 1),
(17316768, 'Valeska Campos', '17316768', '17316768', '2018-01-19', 1),
(17381572, 'Geraldine Gallardo', '17381572', '17381572', '2017-04-04', 1),
(17391788, 'Karina Adasme', '17391788', '17391788', '2017-02-08', 1),
(17421454, 'Paulina Alvarado', '17421454', '15902137', '2015-07-01', 1),
(17463666, 'Natasha Simms', '17463666', '17463666', '2020-02-17', 1),
(17544301, 'Daniela Hernandez', '17544301', '17544301', '2017-02-08', 1),
(17545513, 'Yennifer Zenteno', '17545513', '17545513', '2017-04-04', 1),
(17768972, 'Paz Suarez', '17768972', '17768972', '2019-02-26', 1),
(17783072, 'Carla Jimenez', '17783072', '17783072', '2015-11-01', 1),
(17919214, 'Carolina Salinas ', '17919214', '17919214', '2019-02-26', 1),
(18000655, 'Felipe Palacios', 'fpalacions', 'fpalacios', '2012-04-30', 1),
(18048469, 'Gabriel Villaroel', 'gvillaroel', 'gvillaroel', '2012-09-28', 1),
(18176014, 'Isabel Diaz', '18176014', '18176014', '2020-01-02', 1),
(18294053, 'Valentina Castillo', '18294053', '18294053', '2019-02-26', 1),
(18421823, 'Karina Cantillana', '18421823', '18421823', '2019-05-24', 1),
(20319199, 'Catalina Zapata', '20319199', '20319199', '2019-02-26', 1);

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

--
-- Volcado de datos para la tabla `jornada`
--

INSERT INTO `jornada` (`codigo_jornada`, `nombre_jornada`) VALUES
(1, 'Mañana'),
(2, 'Tarde');

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
  MODIFY `codigo_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `codigo_ciclo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `detalle_evaluacion_parcial`
--
ALTER TABLE `detalle_evaluacion_parcial`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluaciones_area`
--
ALTER TABLE `evaluaciones_area`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
  MODIFY `codigo_jornada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
