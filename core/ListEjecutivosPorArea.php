<?php
	include("../config/Globales.php");
	include("../config/basicos.php");
	include(dirController."EjecutivoController.php");

	$c 	= new EjecutivoController();
	if(empty(filter_input(INPUT_POST, ("area")))) {
		http_response_code(500);
	}else{
		$area = filter_input(INPUT_POST, ("area"));
		$area = preg_replace('/^[a-zA-Z\s]*$/', '', $area);
		if($area == '') {
			http_response_code(401);
		}else{
			$evaluadores = $c->listarPorArea($area);
			if($evaluadores == null) {
				http_response_code(301);
			}else{
				echo "[";
				for($i=0; $i<count($evaluadores); $i++){
					$temp = $evaluadores[$i];
					echo $temp->serializar();
					if($i<count($evaluadores)-1) {echo ",";}
				}
				echo "]";
				http_response_code(200);
				//var_dump($evaluadores);
			}
		}
	}

?>