<?php
	include("config/globales.php");
	include("config/basicos.php");
	
	//testeo de areas
	$ctlArea = new AreaController();


	foreach ($ctlArea->listar() as $v) {
		echo $v->getnombre_area()."<br />";
	}

	//prueba buscar por id
	//echo $ctlArea->listarPorCodigo(5)->getnombre_area();

	//prueba creacion
	/*
	$area = new Area();
	$area->nuevo(0, 'Área de Prueba', 1, null);

	if($ctlArea->ingresar($area) == 1) {
		echo "Ingresado";
	}else{
		echo "Ocurrió un error";
	}*/

	//prueba actualizacion
	/*
	$area = $ctlArea->listarPorCodigo(6);
	$area->setnombre_area("Modificación");
	$area->setestado(0);
	if($ctlArea->actualizar($area) == 1) {
		echo "actualizado";
	}else{
		echo "error";
	}
	*/

	//pruebo de eliminacion
	/*$area = $ctlArea->listarPorNombre("Modificación");
	echo $area->getcodigo_area();
	$ctlArea->eliminar($area);*/

	$cadena_origen = "Víctor Manuel Araya González 2 3 4 :#$#-1!'3423////$%#$";
	$cadena_resultante = preg_replace('([^A-Za-z0-9Á-Ú ])', '', $cadena_origen);
	echo $cadena_resultante;
?>