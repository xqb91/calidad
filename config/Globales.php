<?php
	//***************************************************
	// S I S T E M A
	//***************************************************
		//Ambiente (DES: Desarrollo / PRD: Produccion)
		define('ambiente', 'DES');
		//Zona horaria
		date_default_timezone_set('America/Santiago');

	//***************************************************
	// S E G U R I D A D
	//***************************************************
		//Tiempo máximo de inactividad del usuario
		define('minMaxInactividad', 20);

	//***************************************************
	// D I R E C T O R I O S
	//***************************************************
		//directorio de controladores
		define('dirController'	, 'controller/');
		//directorio de cores
		define('dirCore'		, 'core/');
		//directorio de fachada
		define('dirFacade'		, 'facade/');
		//directorio de frameworks utilizados
		define('dirFramework'	, 'frameworks/');
		//direcotiors de modelos de la base de datos
		define('dirModel'		, 'model/');
		//directorio del transaccional
		define('dirTransaction'	, 'transaction/');

	//***************************************************
	// C O N E X I O N   D A T A B A S E
	//***************************************************
	if(ambiente == 'DES') {
		//configuración de conexión de desarrollo
		define('servidorMysql'	, 'localhost');
		define('usuarioMysql'	, 'root');
		define('passwordMysql'	, 'FTPxqb91RDS$$');
		define('databseMysql'	, 'calidad');
		define('puertoMysql'	,  3306);
	}else{
		//configuración de conexión de producción
		define('servidorMysql'	, 'rauli.tricotcentral.local');
		define('usuarioMysql'	, 'root');
		define('passwordMysql'	, 'FTPxqb91RDS$$');
		define('databseMysql'	, 'calidad');
		define('puertoMysql'	, 3306);
	}


	//***************************************************
	// C O N F I G U R A C I O N E S   G L O B A L E S
	//***************************************************
	if(ambiente == 'DES') {
		//Reporte de Errores en desarrollo de sitio web
		error_reporting(E_ALL);
	}else{
		//Reporte de Errores en producción de sitio web
		error_reporting(0);
	}
?>