<?php
	include("../config/Globales.php");
	include("../config/basicos.php");
	include("../controller/LogEvaluacionFinalController.php");
	//including models necesaries
	include(dirModel."Evaluador.php");
	session_start();
	//including controllers
	include(dirController."EvaluacionFinalController.php");

	if(isset($_POST["evaluacion"])) {
		if(isset($_POST["comentarios"])) {
			$evaluacion = filter_input(INPUT_POST, ("evaluacion"));
			$comentario = htmlspecialchars(filter_input(INPUT_POST, ("comentarios")), ENT_QUOTES, "UTF-8");

			//instanciando controlador
			$control 	= new EvaluacionFinalController();
			$ctLog 		= new LogEvaluacionFinalController();
			$sesionlck 	= $_SESSION['loginUser'];

			$temp 	 = $control->listarPorNumero($evaluacion);

			if($evaluacion == null) {
				//error la evaluacion no exixste
			}else{
				//actualizar
				$temp = $temp[0];
				$dataNotas = $control->calcularNotaFinal($temp->getejecutivo_rut_ejecutivo(), $temp->getperiodo());
				$temp->setobservaciones($comentario);
				$temp->setnotafinal($dataNotas[0]["final"]);
				
				if($control->actualizar($temp)) {
					//ok
					$ctLog->ingresar($temp, $sesionlck->getusuario(), 'CREAR END OK');
					http_response_code(200);
				}else{
					//error
					$ctLog->ingresar($temp, $sesionlck->getusuario(), 'CREAR END ERROR COMMENTS');
					http_response_code(204);
				}
			}
		}else{
			//error al no recibir parámetro de observacion
			http_response_code(301);
		}
	}else{
		//error al no recibir parametro evaluacion
		http_response_code(302);
	}
?>