<?php
	include("../config/Globales.php");
	include("../config/basicos.php");
	include("../controller/EvaluacionParcialController.php");
	include("../controller/LogEvaluacionParcialController.php");
	include(dirController."EvaluadorController.php");
	session_start();
	
	$control = new EvaluacionParcialController();
	$ctLog 	= new LogEvaluacionParcialController();
	$sesionlck = $_SESSION['loginUser'];

	if(!isset($_POST["evaluacion"])) {
		http_response_code(500);
	}else{
		$numero = filter_input(INPUT_POST, ("evaluacion"));
		$obj = $control->listarPorNumero($numero);
		if($obj == null) {
			http_response_code(501);
		}else{
			$obj = $obj[0];
			$ctLog->ingresar($obj, $sesionlck->getusuario(), 'EDITAR');
			echo html_entity_decode($obj->getObservacion(), ENT_QUOTES, 'UTF-8');
		}	
	}

?>