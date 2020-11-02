<?php
	include("../config/Globales.php");
	include("../config/basicos.php");
	include("../controller/CustomController.php");
	include("../controller/EvaluadorController.php");
	session_start();

	$control 	= new CustomController();
	$ctrleva 	= new EvaluadorController();

	
	$ejecutivo = filter_input(INPUT_POST, ("ejecutivo"));
	
	if(!isset($ejecutivo)) {
		http_response_code(500);
	}else{
		$periodo = $_SESSION['current_periodo_work'];
		$obj = $control->detectaPosibleEquivocacion($ejecutivo, $periodo);
		if($obj == null) {
			http_response_code(202);
		}else{
			$tmp = $ctrleva->listarPorRut($obj);
			if($tmp == null) {
				http_response_code(202);
			}else{
				echo $tmp[0]->serializar();
				http_response_code(200);
			}
		}
	}
?>