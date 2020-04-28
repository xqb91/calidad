-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-04-2020 a las 22:05:13
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
  `nombre_categoria` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `peso_categoria` int(11) NOT NULL,
  `orden` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`codigo_categoria`, `codigo_area`, `nombre_categoria`, `peso_categoria`, `orden`) VALUES
(1, 1, 'Atención de la llamada', 25, 1),
(2, 1, 'Gestión de la llamada', 25, 2),
(3, 1, 'Gestión de la solución', 50, 3),
(4, 2, 'Atención de la llamada', 25, 4),
(5, 2, 'Gestión de la llamada', 25, 5),
(6, 2, 'Gestión del crédito', 50, 6),
(7, 3, 'Atención de la llamada', 50, 7),
(8, 3, 'Gestión de la llamada', 30, 8),
(9, 3, 'Gestión de la solución', 20, 9),
(10, 4, 'Atención de la llamada', 20, 10),
(11, 4, 'Gestión de la llamada', 15, 11),
(12, 4, 'Gestión de la solución', 65, 12),
(13, 5, 'Atención de la llamada', 35, 13),
(14, 5, 'Gestión de la llamada', 35, 14),
(15, 5, 'Gestión de la solución', 30, 15);

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

--
-- Volcado de datos para la tabla `ejecutivo`
--

INSERT INTO `ejecutivo` (`rut_ejecutivo`, `nombre_ejecutivo`, `fecha_inicio`, `codigo_estado`, `correo`, `codigo_ciclo`, `codigo_area`, `codigo_jornada`) VALUES
(1, 'pruebas siscalidad', '2020-04-01', 1, '', 6, 2, 1),
(1222, 'prueba sac', '2019-02-26', 1, '', 6, 3, 1),
(5538916, 'mary inostroza', '2014-10-20', 3, '', 2, 1, 1),
(5861433, 'isabel rayo', '2014-10-21', 1, '', 1, 1, 1),
(6241224, 'david mella', '2014-10-20', 1, '', 4, 1, 1),
(6612290, 'rosa guerrero', '2014-10-21', 1, '', 4, 1, 1),
(6615035, 'jose luis aragones', '2014-10-21', 1, '', 1, 1, 1),
(6661152, 'maria eugenia salas', '2014-10-20', 1, '', 2, 1, 1),
(7109528, 'marta madariaga', '2014-10-20', 1, '', 2, 1, 2),
(7312680, 'margarita salinas', '2014-10-21', 3, '', 3, 1, 2),
(7541050, 'francisco jurado', '2014-10-20', 1, '', 2, 1, 2),
(7542184, 'margalida lobos', '2014-10-20', 1, '', 4, 1, 1),
(7689578, 'maria isabel echaiz', '2014-10-20', 3, '', 3, 1, 1),
(7746653, 'ana maria otarola', '2014-10-20', 1, '', 4, 1, 2),
(8125076, 'hugo vargas', '2019-06-13', 1, '', 1, 1, 2),
(8425568, 'judith shaper', '2014-10-20', 1, '', 4, 1, 1),
(8453980, 'gioconda mariangel', '2014-10-20', 2, '', 2, 1, 1),
(8504887, 'sofia flores', '2014-10-20', 1, '', 2, 1, 1),
(8860533, 'sandra encina', '2014-10-20', 2, '', 4, 1, 1),
(8964339, 'ricardo villalobos', '2014-10-20', 1, '', 4, 1, 1),
(9077888, 'alicia avila', '2014-10-17', 1, '', 1, 1, 1),
(9116298, 'rossana simonetti', '2014-10-20', 1, '', 4, 1, 1),
(9151127, 'gabriela ortiz', '2014-10-20', 2, '', 2, 1, 2),
(9497033, 'alberto gacitua', '2014-10-20', 2, '', 2, 1, 1),
(9578601, 'jorge aranda', '2017-04-03', 3, '', 2, 1, 2),
(9584613, 'rodolfo cea', '2014-11-10', 1, '', 4, 1, 2),
(9666376, 'veronica perez', '2016-03-11', 3, '', 6, 1, 2),
(9765778, 'paula araya', '2014-10-21', 3, '', 3, 1, 2),
(9796570, 'cecilia trujillo', '2014-10-20', 1, '', 4, 1, 2),
(9888502, 'paola bernucci', '2017-05-03', 1, '', 2, 1, 2),
(9965198, 'sonia troncoso', '2014-10-21', 3, '', 3, 1, 2),
(9967971, 'luisa galvez', '2016-12-15', 2, '', 4, 1, 2),
(9969853, 'loreto carcamo', '2014-10-21', 1, '', 1, 1, 1),
(10054938, 'roxana meza', '2017-11-03', 1, '', 6, 3, 2),
(10070767, 'violeta aguilera', '2014-10-20', 1, '', 4, 1, 1),
(10228206, 'patricia henriquez', '2014-10-21', 1, '', 2, 1, 1),
(10243481, 'irma aguilera', '2016-03-11', 1, '', 6, 3, 2),
(10260305, 'alondra roblero', '2014-10-20', 1, '', 4, 1, 2),
(10476722, 'claudia miranda', '2016-03-11', 3, '', 6, 1, 1),
(10531256, 'claudio  martinez jorquer', '2019-01-01', 1, '', 6, 4, 3),
(10636119, 'silvia gonzalez', '2014-10-21', 3, '', 6, 1, 1),
(10855103, 'carolina gajardo', '2014-10-17', 1, '', 1, 1, 1),
(10888792, 'jose acuna', '2016-08-05', 1, '', 4, 1, 2),
(10894620, 'nancy moraga', '2014-10-22', 1, '', 1, 1, 1),
(10939664, 'sandra figueroa', '2014-10-20', 1, '', 2, 1, 1),
(10998656, 'gustavo torres', '2014-11-13', 2, '', 6, 3, 2),
(11111111, 'ejecutivo riesgo', '2019-07-29', 1, '', 2, 1, 2),
(11111528, 'patricia alarcon', '2014-10-20', 1, '', 4, 1, 1),
(11163610, 'maria soledad huerta', '2018-06-26', 3, '', 6, 2, 2),
(11184464, 'bernardita concha', '2017-04-03', 2, '', 2, 1, 2),
(11319045, 'rachel osorio', '2020-01-15', 1, '', 1, 1, 2),
(11391098, 'daniel fuentes', '2016-09-22', 4, '', 1, 1, 1),
(11475291, 'aurora urzua', '2014-10-20', 3, '', 3, 1, 2),
(11477412, 'carol leticia rebolledo o', '2019-01-01', 1, '', 6, 5, 3),
(11559606, 'soledad veliz', '2019-03-12', 1, '', 4, 1, 2),
(11559696, 'maria soledad veliz', '2018-05-11', 3, '', 4, 1, 2),
(11583906, 'wilma beltran', '2014-10-20', 3, '', 3, 1, 1),
(11648953, 'alejandra moreno', '2014-10-20', 3, '', 2, 1, 2),
(11675994, 'veronica fuentes', '2014-10-20', 2, '', 2, 1, 1),
(11813962, 'rosa vergara', '2019-05-07', 1, '', 6, 5, 3),
(11841158, 'marcela ayala', '2014-10-20', 3, '', 3, 1, 1),
(11874360, 'viviana cabrera', '2014-10-22', 1, '', 4, 1, 2),
(11874748, 'alejandra ceron', '2015-03-17', 2, '', 1, 1, 2),
(11877429, 'carlos paz', '2019-04-15', 1, '', 2, 1, 2),
(11879658, 'carlos salgado', '2014-10-20', 3, '', 2, 1, 2),
(11886253, 'jessica riquelme', '2015-03-27', 3, '', 2, 1, 2),
(11886454, 'cecilia cabezas', '2014-10-17', 1, '', 4, 1, 1),
(11966938, 'patricia inzunza', '2012-10-18', 3, '', 6, 2, 1),
(12237394, 'sandra cardenas', '2014-10-22', 3, '', 6, 1, 2),
(12238182, 'roxana  sepulveda', '2019-01-01', 1, '', 6, 4, 3),
(12252576, 'marjorie escobar', '2014-10-21', 1, '', 4, 1, 2),
(12254157, 'evelyn rogers', '2019-06-13', 1, '', 4, 1, 1),
(12289819, 'oscar leal', '2014-10-20', 3, '', 1, 1, 2),
(12306482, 'elisa palma', '2016-12-15', 1, '', 2, 1, 1),
(12355092, 'ximena valenzuela', '2020-02-18', 2, '', 1, 1, 2),
(12411055, 'paola silva', '2015-03-27', 1, '', 4, 1, 1),
(12473142, 'patricia gaete', '2014-10-20', 1, '', 4, 1, 1),
(12637054, 'ingrid king', '2020-02-18', 2, '', 1, 1, 2),
(12637980, 'rodrigo gatica', '2016-09-07', 3, '', 1, 1, 2),
(12640918, 'karina dinamarca', '2014-10-21', 3, '', 6, 1, 1),
(12651292, 'angelica toro', '2019-08-19', 2, '', 6, 3, 1),
(12674306, 'claudia quiroz', '2020-01-15', 1, '', 1, 1, 2),
(12683649, 'jeannette robinzon', '2014-10-21', 1, '', 4, 1, 1),
(12737492, 'juan carlosï¿½ morales', '2019-01-01', 2, '', 6, 4, 3),
(12814271, 'mariela quinteros', '2014-10-20', 1, '', 1, 1, 1),
(12824145, 'bixie toledo', '2014-10-20', 2, '', 1, 1, 1),
(12853988, 'ana soto', '2014-10-17', 1, '', 1, 1, 1),
(12861766, 'pamela flores', '2014-10-21', 1, '', 1, 1, 1),
(12870726, 'jorge molina', '2014-11-13', 1, '', 6, 3, 2),
(12882287, 'jessica salazar', '2014-10-21', 3, '', 6, 1, 1),
(12901466, 'rosa guzman', '2014-10-20', 2, '', 3, 1, 2),
(12905387, 'lorena rocha', '2019-02-26', 1, '', 6, 3, 1),
(12908168, 'natalia fuenzalida', '2016-08-05', 3, '', 6, 1, 2),
(12930930, 'cecilia santander', '2014-10-22', 1, '', 4, 1, 2),
(13009387, 'orlando briones', '2016-11-17', 2, '', 1, 1, 2),
(13032285, 'macarena ramirez', '2014-10-20', 1, '', 4, 1, 1),
(13047629, 'rosa basualto', '2020-02-18', 2, '', 1, 1, 2),
(13057548, 'alejandra vidaurre', '2014-10-21', 3, '', 3, 1, 2),
(13069996, 'monica marmolejo', '2012-10-18', 3, '', 6, 2, 1),
(13191744, 'claudia bacigalupo', '2014-10-20', 3, '', 2, 1, 1),
(13211831, 'melissa gomez', '2019-05-07', 1, '', 6, 2, 2),
(13244107, 'karen yuretic', '2014-11-07', 1, '', 1, 1, 1),
(13250075, 'gabriel paez', '2019-06-13', 1, '', 2, 1, 1),
(13266139, 'patricia azocar', '2019-10-16', 1, '', 4, 1, 2),
(13291903, 'veronica troncoso', '2020-02-13', 1, '', 1, 1, 2),
(13298946, 'viviana gonzalez', '2014-10-22', 3, '', 6, 1, 2),
(13337838, 'yohana campos', '2018-05-11', 1, '', 4, 1, 2),
(13438065, 'hector hernandez', '2014-10-20', 2, '', 2, 1, 1),
(13457219, 'estela becerra', '2017-11-03', 2, '', 6, 3, 2),
(13471012, 'paola merino', '2014-11-13', 1, '', 1, 1, 1),
(13494190, 'katherine ibarra', '2014-10-20', 3, '', 3, 1, 1),
(13616322, 'marcela saldana', '2018-05-07', 1, '', 6, 3, 1),
(13620396, 'miguel macaya', '2019-09-16', 2, '', 6, 2, 1),
(13662159, 'valeska lizana', '2017-11-06', 1, '', 6, 2, 2),
(13697033, 'rodrigo valdebenito', '2015-01-12', 3, '', 6, 3, 2),
(13704655, 'ester aguirre', '2016-08-08', 1, '', 6, 3, 2),
(13705875, 'paulina saavedra', '2020-02-13', 1, '', 1, 1, 2),
(13709358, 'yasmin pardo', '2015-03-17', 3, '', 1, 1, 1),
(13833511, 'fabiola calfin', '2014-10-21', 1, '', 4, 1, 1),
(13904227, 'maria rodriguez', '2014-10-21', 1, '', 4, 1, 1),
(13916209, 'jocelyn monros', '2020-02-13', 1, '', 1, 1, 2),
(13917500, 'lillian silva', '2019-03-12', 1, '', 2, 1, 1),
(13917993, 'marcela angulo', '2017-04-03', 1, '', 4, 1, 2),
(13943967, 'carolina saldias', '2014-10-22', 1, '', 2, 1, 1),
(13965202, 'karen aguilera', '2014-11-07', 3, '', 2, 1, 2),
(14010313, 'carlos rodriguez', '2020-02-13', 1, '', 1, 1, 2),
(14024500, 'alejandra vera', '2012-10-18', 1, '', 6, 2, 1),
(14120614, 'rocio castillo', '2012-10-18', 1, '', 6, 2, 1),
(14161187, 'ingrid matus', '2014-10-22', 3, '', 6, 1, 2),
(14177700, 'juan cuervo', '2014-10-20', 1, '', 2, 1, 1),
(14184041, 'carolina mella', '2014-10-20', 2, '', 2, 1, 2),
(14188508, 'paula miranda', '2019-12-10', 1, '', 6, 2, 1),
(14255682, 'viviana toledo', '2014-10-20', 1, '', 4, 1, 1),
(14363049, 'marlene sanchez', '2018-03-06', 2, '', 6, 3, 1),
(14376482, 'pia leiva', '2017-04-04', 3, '', 1, 1, 2),
(14419394, 'jennifer morales', '2014-11-10', 1, '', 4, 1, 1),
(14427335, 'yanett cisternas', '2015-03-17', 1, '', 1, 1, 1),
(14446994, 'claudia guajardo', '2019-10-16', 1, '', 2, 1, 2),
(14578553, 'claudia contreras', '2014-10-20', 3, '', 2, 1, 1),
(14901723, 'paula calderon', '2015-12-28', 2, '', 4, 1, 2),
(15101863, 'jocelyn hidalgo', '2019-03-12', 1, '', 1, 1, 1),
(15317979, 'fabiola fuentes', '2014-10-21', 3, '', 6, 1, 1),
(15330079, 'betzabe moraga', '2014-10-20', 3, '', 3, 1, 2),
(15332851, 'manuel arias', '2014-10-21', 3, '', 2, 1, 1),
(15340275, 'jocelyn henriquez', '2014-10-21', 3, '', 3, 1, 2),
(15344473, 'ivanoa sanchez', '2014-10-20', 2, '', 1, 1, 1),
(15347686, 'clara vega', '2014-10-20', 3, '', 3, 1, 1),
(15365179, 'roberto alejandro campos', '2019-01-01', 1, '', 6, 4, 3),
(15366949, 'francisco vega', '2020-02-13', 1, '', 1, 1, 2),
(15367851, 'hans gosh', '2020-01-15', 2, '', 1, 1, 1),
(15387158, 'lynda munoz', '2015-12-22', 3, '', 1, 1, 2),
(15395129, 'natalia garmendia', '2014-10-20', 2, '', 3, 1, 2),
(15396618, 'vanessa caceres', '2019-02-26', 1, '', 6, 3, 1),
(15417487, 'jocelyn aguilar', '2014-11-10', 3, '', 6, 1, 1),
(15434894, 'leslie araya', '2016-08-05', 1, '', 2, 1, 1),
(15435278, 'katherine rivera', '2014-10-20', 1, '', 2, 1, 1),
(15445579, 'victor romero', '2012-10-18', 1, '', 6, 2, 1),
(15448928, 'andrea astorga', '2015-01-15', 3, '', 1, 1, 1),
(15469502, 'jessica diaz', '2018-05-09', 1, '', 2, 1, 1),
(15475124, 'claudia alvear', '2014-10-22', 3, '', 6, 1, 2),
(15537977, 'carolina alarcon', '2014-11-10', 1, '', 4, 1, 2),
(15542009, 'maria paz rojas', '2014-10-20', 2, '', 2, 1, 1),
(15564715, 'angelina araya', '2016-12-26', 2, '', 1, 1, 2),
(15602925, 'laritza latorre', '2014-10-20', 1, '', 2, 1, 2),
(15606613, 'juan coll', '2014-10-20', 3, '', 1, 1, 1),
(15632734, 'alvaro rodrigo diez vidal', '2019-01-01', 2, '', 6, 4, 3),
(15706964, 'mariana lizana', '2014-10-22', 3, '', 1, 1, 2),
(15721631, 'andres cuyan', '2015-06-08', 1, '', 4, 1, 1),
(15747767, 'karen urquiza', '2016-03-11', 1, '', 6, 3, 2),
(15792022, 'elena herrera', '2015-01-15', 1, '', 2, 1, 2),
(15793686, 'margarita urrea', '2019-06-13', 1, '', 1, 1, 2),
(15807102, 'estrella caceres', '2014-10-20', 3, '', 2, 1, 1),
(15817071, 'francis cabrera', '2019-02-26', 1, '', 6, 3, 1),
(15837947, 'gabriel soto', '2014-10-21', 3, '', 6, 1, 1),
(15892981, 'nicole riquelme', '2014-10-20', 3, '', 3, 1, 1),
(15899920, 'cristian cortez', '2014-10-20', 3, '', 3, 1, 2),
(15971332, 'valeria ramirez', '2014-10-20', 1, '', 4, 1, 1),
(16019562, 'daniel tapia', '2012-10-18', 3, '', 6, 2, 1),
(16029925, 'marlene suarez', '2014-10-21', 2, '', 2, 1, 2),
(16042327, 'francisco fernandez', '2014-11-13', 1, '', 6, 3, 2),
(16101260, 'monica granda', '2015-03-17', 2, '', 1, 1, 2),
(16127301, 'karla bettini', '2014-11-13', 3, '', 1, 1, 1),
(16149072, 'carolina morales', '2014-11-07', 2, '', 2, 1, 1),
(16177153, 'cristian yana', '2019-08-05', 1, '', 2, 1, 2),
(16253376, 'emilio acevedo', '2019-03-01', 2, '', 6, 2, 2),
(16267865, 'katherine angulo', '2014-11-13', 1, '', 6, 3, 2),
(16269221, 'nadia valladares', '2014-10-20', 3, '', 2, 1, 2),
(16279535, 'nicolas san martin ormeÃ±', '2019-12-18', 1, '', 6, 3, 1),
(16281509, 'elina redes', '2018-05-07', 2, '', 6, 3, 1),
(16340633, 'cristopher moreno ahumada', '2019-01-01', 1, '', 6, 4, 3),
(16360298, 'lorena alarcon', '2014-10-22', 1, '', 2, 1, 1),
(16374618, 'bastian morales', '2013-04-11', 3, '', 6, 2, 1),
(16392177, 'juditza carmona', '2014-10-21', 3, '', 6, 1, 1),
(16393289, 'cindy  alvarez', '2012-10-18', 3, '', 6, 2, 1),
(16408723, 'lorena olivares', '2014-10-20', 1, '', 2, 1, 1),
(16420239, 'maria antonieta neira', '2017-02-09', 3, '', 2, 1, 2),
(16428048, 'carolina miranda', '2015-08-01', 1, '', 4, 1, 1),
(16470078, 'katherine oyarce', '2018-05-07', 1, '', 6, 3, 1),
(16479419, 'nestor josÉ  olivares val', '2019-01-01', 1, '', 6, 4, 3),
(16490518, 'juan pablo novoa', '2016-03-11', 3, '', 6, 1, 2),
(16615557, 'carla paredes', '2014-10-21', 1, '', 1, 1, 1),
(16639694, 'daniela mondaca', '2014-10-22', 3, '', 6, 1, 2),
(16659635, 'marcela peralta', '2014-10-20', 3, '', 3, 1, 1),
(16667567, 'barbara gutierrez', '2016-07-06', 3, '', 1, 1, 2),
(16681566, 'francesca henriquez', '2018-05-09', 1, '', 4, 1, 2),
(16729254, 'elizabeth villarreal', '2019-04-15', 1, '', 2, 1, 1),
(16739100, 'jennifer moreno', '2014-10-21', 3, '', 6, 1, 1),
(16742445, 'marcela cid', '2012-10-18', 3, '', 6, 2, 1),
(16745096, 'alvaro gatica', '2014-01-09', 3, '', 6, 2, 1),
(16745740, 'viviana fuentes', '2014-10-20', 3, '', 3, 1, 1),
(16747300, 'mauricio silva', '2016-08-09', 3, '', 6, 2, 2),
(16803087, 'nicole pizarro', '2013-12-12', 3, '', 6, 2, 1),
(16813325, 'rodrigo reyes', '2019-06-06', 1, '', 6, 4, 3),
(16856317, 'linda miranda', '2014-10-20', 1, '', 4, 1, 2),
(16902469, 'paulina alejandra torres', '2019-01-01', 1, '', 6, 5, 3),
(16912409, 'elizabeth toro', '2013-04-19', 3, '', 6, 2, 1),
(16918401, 'patricia carrasco', '2014-10-20', 3, '', 2, 1, 2),
(16922612, 'diego jofre acevedo', '2019-12-18', 1, '', 6, 3, 1),
(16923599, 'leonardo oyarce', '2015-03-17', 3, '', 1, 1, 2),
(16923709, 'teresa pena', '2013-11-14', 3, '', 6, 2, 1),
(16941622, 'carla oyarzun', '2012-10-18', 3, '', 6, 2, 1),
(16944143, 'alejandra briones', '2014-10-21', 3, '', 6, 1, 1),
(16977426, 'alejandro reyes', '2019-09-23', 2, '', 1, 1, 2),
(17001293, 'nicole pena', '2015-03-17', 3, '', 1, 1, 2),
(17010388, 'camila navarrete', '2018-04-01', 1, '', 6, 2, 2),
(17048797, 'yasna alvarez', '2014-10-20', 1, '', 4, 1, 2),
(17052467, 'jennifer rojas', '2014-10-20', 3, '', 2, 1, 2),
(17059200, 'isabel caceres', '2019-03-07', 2, '', 1, 1, 2),
(17064496, 'jocelyn pineda', '2019-03-12', 2, '', 1, 1, 2),
(17076221, 'john edgard aravena arroy', '2019-01-01', 2, '', 6, 4, 3),
(17148867, 'natalia diaz', '2014-10-20', 1, '', 1, 1, 1),
(17162849, 'danitza araya', '2019-12-10', 1, '', 6, 2, 1),
(17206073, 'katherine rojas', '2016-03-11', 2, '', 6, 3, 2),
(17228820, 'maria jose vergara', '2017-05-03', 2, '', 2, 1, 2),
(17232792, 'macarena henriquez', '2014-11-13', 2, '', 6, 3, 2),
(17237537, 'viana troncoso', '2016-08-08', 1, '', 6, 3, 2),
(17252072, 'ana valeria ortiz cross c', '2019-01-01', 1, '', 6, 5, 3),
(17310194, 'catalina isabel rojas alv', '2019-01-01', 1, '', 6, 5, 3),
(17316685, 'marisel santibanez', '2018-08-09', 2, '', 6, 2, 2),
(17316768, 'valesca campos', '2018-01-22', 3, '', 1, 1, 1),
(17338877, 'camila mella', '2019-09-23', 2, '', 2, 1, 2),
(17341445, 'consuelo esturillo', '2014-10-20', 3, '', 3, 1, 2),
(17390399, 'yerko araya', '2018-08-09', 2, '', 6, 2, 2),
(17401191, 'gisell bruna', '2019-03-12', 1, '', 2, 1, 2),
(17405484, 'catherine cortes', '2019-04-15', 1, '', 1, 1, 2),
(17412190, 'jazmin sanchez', '2014-10-20', 1, '', 2, 1, 2),
(17420214, 'gloria cardenas', '2014-10-21', 3, '', 6, 1, 1),
(17462249, 'stephania diaz', '2014-10-20', 2, '', 1, 1, 1),
(17482697, 'carola pacheco salgado', '2013-07-12', 3, '', 6, 2, 1),
(17508273, 'ana abarca', '2019-04-11', 2, '', 2, 1, 1),
(17509732, 'katherine acevedo', '2012-10-18', 3, '', 6, 2, 1),
(17642863, 'gloria manque', '2014-10-20', 2, '', 3, 1, 1),
(17665446, 'daniela tapia', '2020-02-05', 1, '', 6, 5, 1),
(17666510, 'karin schiessler gonzalez', '2013-07-12', 1, '', 6, 2, 1),
(17678785, 'michael caneo', '2015-03-17', 1, '', 1, 1, 2),
(17689265, 'bonnie hernandez', '2019-02-26', 1, '', 6, 3, 1),
(17690138, 'francisca jeria', '2012-10-18', 3, '', 6, 2, 1),
(17783457, 'barbara mora', '2015-12-22', 1, '', 1, 1, 1),
(17837396, 'mariana caffi', '2014-10-20', 2, '', 1, 1, 2),
(17858908, 'karen hermosilla', '2014-10-22', 3, '', 6, 1, 2),
(17877424, 'karina trigo', '2012-10-18', 3, '', 6, 2, 1),
(17923183, 'francisca basualto', '2014-10-20', 1, '', 4, 1, 2),
(17929626, 'danae jildres', '2014-11-07', 3, '', 2, 1, 2),
(18000655, 'felipe palacios', '2012-04-30', 3, '', 6, 2, 1),
(18048469, 'gabriel villarroel', '2012-10-18', 3, '', 6, 2, 1),
(18054254, 'rosa luna', '2017-02-09', 1, '', 4, 1, 2),
(18095810, 'laura poblete', '2014-10-21', 3, '', 6, 1, 1),
(18113233, 'manuel contreras', '2020-02-04', 1, '', 6, 4, 1),
(18177475, 'paola munoz', '2013-04-19', 3, '', 6, 2, 1),
(18242480, 'eva alfaro', '2015-03-17', 3, '', 1, 1, 2),
(18276597, 'marcelo bravo', '2015-03-17', 3, '', 1, 1, 2),
(18327650, 'alejandro martinez', '2019-02-26', 1, '', 6, 3, 1),
(18346661, 'victor manuel araya gonza', '2020-04-01', 1, '', 4, 1, 1),
(18407533, 'macarena vasquez', '2018-08-06', 3, '', 1, 1, 2),
(18498645, 'camila fuentes', '2014-10-21', 1, '', 4, 1, 1),
(18514526, 'carla soto', '2015-07-15', 3, '', 6, 2, 1),
(18567636, 'constanza belen teran tor', '2019-01-01', 1, '', 6, 5, 3),
(18569896, 'catalina damaris negrete', '2019-01-01', 1, '', 6, 5, 3),
(18661380, 'alejandra diaz', '2018-08-10', 1, '', 6, 2, 2),
(18749634, 'camila aguilera', '2015-12-28', 3, '', 1, 1, 2),
(18788559, 'zaida hizmeri', '2019-07-01', 1, '', 6, 5, 3),
(18796463, 'nicolas galaz', '2014-11-13', 1, '', 6, 3, 2),
(18847353, 'ignacio gallardo', '2017-01-11', 3, '', 1, 1, 2),
(18858875, 'camila romero', '2014-01-09', 3, '', 6, 2, 1),
(18949316, 'solange villarroel', '2015-02-06', 1, '', 6, 2, 2),
(19032419, 'daniela navarro', '2017-03-17', 1, '', 6, 2, 2),
(19173184, 'poelette toledo', '2014-04-11', 3, '', 6, 2, 2),
(19188073, 'constanza valenzuela', '2014-11-13', 3, '', 6, 3, 2),
(19208210, 'karla corales', '2015-01-12', 3, '', 6, 3, 2),
(19275912, 'nicole castro valenzuela', '2018-09-06', 1, '', 6, 2, 2),
(19481881, 'javiera villar', '2019-11-18', 1, '', 2, 1, 2),
(19702990, 'natalia bello paz', '2019-12-04', 1, '', 6, 5, 1),
(19957751, 'marcelo lara', '2019-03-12', 1, '', 1, 1, 2),
(20319199, 'catalina prueba', '2019-08-16', 2, '', 1, 1, 1),
(20459269, 'german arias', '2013-09-05', 2, '', 6, 2, 2),
(22220529, 'maria isabel falcon', '2020-01-15', 1, '', 4, 1, 2),
(22604723, 'dennis bocanegra', '2012-10-18', 3, '', 6, 2, 2),
(23692598, 'johanna olaya', '2019-12-04', 1, '', 6, 5, 1),
(25741283, 'maria mÃ¡rquez amaro', '2019-12-18', 1, '', 6, 3, 1),
(26005017, 'josnaliz lozada', '2019-04-09', 1, '', 6, 3, 1),
(26026753, 'joselin espinoza', '2019-07-05', 1, '', 6, 3, 1),
(26212775, 'gustavo pacheco', '2019-09-12', 2, '', 2, 1, 2),
(26556914, 'blanca vanesa velasquez m', '2019-08-09', 1, '', 6, 3, 1),
(26714771, 'johans nino', '2020-02-13', 1, '', 1, 1, 2),
(26844637, 'milagros paz', '2019-08-05', 2, '', 2, 1, 1),
(26882193, 'lennys diaz', '2019-10-16', 1, '', 2, 1, 1),
(26942973, 'maria revolledo', '2019-12-18', 1, '', 6, 3, 2),
(27036736, 'cira barrios', '2019-12-04', 1, '', 6, 3, 1);

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
  `observaciones` text COLLATE utf8_spanish_ci NOT NULL,
  `nota_final` double NOT NULL
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
  `nombre_item` varchar(120) COLLATE utf8_spanish_ci NOT NULL,
  `orden` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `item_evaluacion`
--

INSERT INTO `item_evaluacion` (`codigo_item`, `codigo_categoria`, `nombre_item`, `orden`) VALUES
(1, 1, 'Presentación', 1),
(2, 1, 'Identificación del cliente y comprobación de datos', 2),
(3, 1, 'Transmite amabilidad y buen tono (voz)', 3),
(4, 1, 'Sonrisa telefónica', 4),
(5, 1, 'Personalización de la llamada', 5),
(6, 1, 'Pautas obligadas de la llamada   (Uso disculpas)', 6),
(7, 1, 'Despedida cordial', 7),
(8, 2, 'Transmite seguridad', 1),
(9, 2, 'Transmite imagen positiva de la empresa', 2),
(10, 2, 'Uso adecuado del lenguaje', 3),
(11, 2, 'Compromiso por la gestión de cobranza', 4),
(12, 2, 'Transmite preocupación, escucha activa y denota concentración en el llamado', 5),
(13, 2, 'Detección de necesidades/sondeo', 6),
(14, 2, 'Dirige la llamada', 7),
(15, 3, 'Argumentación', 1),
(16, 3, 'Informa Opciones de Pago', 2),
(17, 3, 'Cierre de la llamada -Concretar el Compromiso de Pago-', 3),
(18, 3, 'Capacidad de Negociacion', 4),
(19, 3, 'Codificación del resultado de la llamada', 5),
(20, 4, 'Presentacion (Nombre Y Apellido)', 1),
(21, 4, 'Identificacion Del Cliente', 2),
(22, 4, 'Motivo del llamado', 3),
(23, 4, 'Transmite amabilidad', 4),
(24, 4, 'Sonrisa telefónica, buen tono (voz)', 5),
(25, 4, 'Personalización de la llamada', 6),
(26, 4, 'Despedida corporativa', 7),
(27, 5, 'Transmite Seguridad', 1),
(28, 5, 'Transmite Imagen Positiva / Uso de disculpas', 2),
(29, 5, 'Uso adecuado del lenguaje', 3),
(30, 5, 'Escucha activa', 4),
(31, 5, 'Compromiso por el motivo de la llamada', 5),
(32, 5, 'Dirige la llamada', 6),
(33, 6, 'Uso protocolo de espera', 1),
(34, 6, ' Verificacion De Datos', 2),
(35, 6, ' Orientacion Al Cliente', 3),
(36, 7, 'Presentacion cordial y corporativa', 1),
(37, 7, 'Identificacion del cliente y validacion de datos (rut/ teléfono/ correo)', 2),
(38, 7, 'Transmite amabilidad/sonrisa telefonica', 3),
(39, 7, 'Personalizacion del llamado', 4),
(40, 7, 'Pautas obligadas de la llamada   (Uso disculpas)', 5),
(41, 7, ' Uso Protocolo De Espera', 6),
(42, 7, 'Despedida corporativa/ informar encuesta de satisfaccion', 7),
(43, 7, 'Entregar informacion de la tarjeta / Fidelizacion del cliente', 8),
(44, 8, 'Transmite seguridad', 1),
(45, 8, 'Transmite imagen positiva de la empresa', 2),
(46, 8, 'Uso adecuado del lenguaje', 3),
(47, 8, 'Parafraseo de datos', 4),
(48, 8, 'Frases de cortesía', 5),
(49, 8, 'Transmite preocupacion y compromiso por el motivo de la llamada (empatía y escucha activa)', 6),
(50, 8, 'Direccion del llamado', 7),
(51, 8, 'Evita el rellamado', 8),
(52, 9, 'Deteccion de necesidades', 1),
(53, 9, 'Resolucion de la solicitud/ Calidad de a respuesta', 2),
(54, 9, 'Entrega informacion Fidedigna', 3),
(55, 9, 'Ingreso de C.R.M.', 4),
(56, 9, 'Tipificacion correcta en CRM', 5),
(57, 10, 'Presentación', 1),
(58, 10, 'Transmite amabilidad, buen tono (voz)', 2),
(59, 10, 'Sonrisa telefonica', 3),
(60, 10, 'Despedida cordial', 4),
(61, 11, 'Transmite seguridad', 1),
(62, 11, 'Uso adecuado del lenguaje', 2),
(63, 11, 'Formalidad en la atencion', 3),
(64, 11, 'Transmite preocupación y compromiso por el motivo de la llamada (empatía y escucha activa)', 4),
(65, 11, 'Transmite imagen positiva de la empresa', 5),
(66, 12, 'Detección de necesidades', 1),
(67, 12, 'Protocolo de espera', 2),
(68, 12, 'Resolucion de la solicitud', 3),
(69, 13, 'Presentación cordial y corporativa', 1),
(70, 13, 'Transmite amabilidad', 2),
(71, 13, 'Resgistro Dactilar', 3),
(72, 13, 'Corroboración de datos', 4),
(73, 13, 'Personalización de la llamada', 5),
(74, 13, 'Pautas obligadas de llamada (uso de disculpas)', 6),
(75, 13, 'Uso Protocolo de espera', 7),
(76, 13, 'Despedida corporativa', 8),
(77, 13, 'Informa Encuesta de Satisfacción', 9),
(78, 14, 'Transmite seguridad', 1),
(79, 14, 'Transmite imagen positiva de la empresa', 2),
(80, 14, 'Uso adecuado del lenguaje', 3),
(81, 14, 'Transmite preocupación y compromiso por el motivo del llamado (empatía y escucha activa)', 4),
(82, 14, 'Direccion del llamado', 5),
(83, 14, 'Evita re visita', 6),
(84, 15, 'Detección de necesidades/sondeo', 1),
(85, 15, 'Resolución de la solicitud/Calidad de respuesta', 2),
(86, 15, 'Orientación del cliente', 3);

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
(2, 'Tarde'),
(3, 'completa');

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
  MODIFY `codigo_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  MODIFY `codigo_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT de la tabla `jornada`
--
ALTER TABLE `jornada`
  MODIFY `codigo_jornada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
