<?php
	include("../config/Globales.php");
	include("../config/basicos.php");
	include(dirController."EvaluacionesAreaController.php");
	
	//Archivo que genera la misma cantidad de notas del periodo anterior en las evaluaciones por área
	$control = new EvaluacionesAreaController();

	$obj = $control->ultimoPeriodoActivo();
	if($obj == null) {
		//generar objetos con el periodo actual
	}else{
		//validando si el siguiente periodo ya se encuentra registrado en el maestro
		$existente = $control->listarPorPeriodo(date('Y-m'));
		if($existente == null) {
			foreach ($obj as $k) {
				$k->setPeriodo(date('Y-m'));
				$control->ingresar($k);
			}
			echo "Se ha generado las evaluaciones predeterminadas según el periodo anterior para el actual";
		}else{
			echo "No se ejecutó el proceso porque el periodo ".date('Y-m')." ya existe en la base de datos";
		}
	}
?>