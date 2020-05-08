<?php
	include("../config/Globales.php");
	include("../config/basicos.php");
	include("../controller/AudioController.php");
	include("../controller/LogAudioController.php");
	
	$control = new AudioController();
	$log 	 = new LogAudioController();

	$eva = 110;

	$obj = $control->listarPorNumeroParcial($eva);
	if($obj==null) {
		http_response_code(500);
	}else{
		var_dump($obj);
		$arreglo['id']					;
		$arreglo['fecha']				;
		$arreglo['usuario']				;
		$arreglo['numero_evaluacion']	;
		$arreglo['fecha_carga']			;
		$arreglo['nombre_audio']		;
		$arreglo['periodo']				;
	}
?>