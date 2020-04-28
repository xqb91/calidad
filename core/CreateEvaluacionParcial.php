<?php
	include("../config/Globales.php");
	include("../config/basicos.php");
	include(dirController."EvaluacionParcialController.php");

	$array = null;

	if(isset($_POST["periodo"])) {
		if(isset($_POST["ejecutivo"])) {
			if(isset($_POST["evaluador"])) {
				if(isset($_POST["area"])) {
					$periodo 		= filter_input(INPUT_POST, ("periodo"));
					$ejecutivo 		= filter_input(INPUT_POST, ("ejecutivo"));
					$evaluador 		= filter_input(INPUT_POST, ("evaluador"));
					$area 			= filter_input(INPUT_POST, ("area"));

					//valores para inicializar la evaluación a generar
					$array['numero_evaluacion'] = '0';
					$array['fecha_evaluacion']	= date('Y-m-d');
					$array['periodo']			= $periodo;  //<---
					$array['rut_ejecutivo']		= $ejecutivo;	  //<--- 
					$array['rut_evaluador']		= $evaluador;	  //<--- 
					$array['nota_final']		= 0;
					$array['observacion']		= '';
					$array['codigo_area']		= $area;		  //<---

					$evaluacion = new EvaluacionParcial($array);
					$controlado = new EvaluacionParcialController();
					if($controlado->ingresar($evaluacion) == 1) {
						$parcial = $controlado->ultimaEvaluacionGenerada($periodo, $ejecutivo, $evaluador, $area);
						echo $parcial[0]->serializar();
						http_response_code(200);
					}else{
						http_response_code(401);
					}
				}else{
					http_response_code(503);
				}
			}else{
				http_response_code(502);
			}
		}else{
			http_response_code(501);
		}
	}else{
		http_response_code(500);
	}
?>