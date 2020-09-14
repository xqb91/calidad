<?php
	include("../config/Globales.php");
	include("../config/basicos.php");
	include(dirController."EvaluacionParcialController.php");
	include(dirController."EvaluacionQuincenalController.php");
	include(dirController."EvaluacionesAreaController.php");
	include(dirController."DetalleEvaluacionQuincenalController.php");

	$controlado = new EvaluacionParcialController();
	$quincenal  = new EvaluacionQuincenalController();
	$evaArea    = new EvaluacionesAreaController();
	$detaQuinc 	= new DetalleEvaluacionQuincenalController();


	if(isset($_POST["evaluacion"])) {
		if(isset($_POST["comentarios"])) {
			$comentarios = htmlspecialchars(filter_input(INPUT_POST, ("comentarios")), ENT_QUOTES, "UTF-8");
			$evaluacion  = filter_input(INPUT_POST, ("evaluacion"));

			$obj = $controlado->listarPorNumero($evaluacion);
			if($obj == null) {
				http_response_code(503);
			}else{
				$obj = $obj[0];
				$obj->setobservacion($comentarios);

				//generando evaluacion quincenal
				if($quincenal->existeEvaluacionParaPeriodo($obj->getperiodo(), $obj->getrut_ejecutivo()) == null) {

					$evaluaciones = $evaArea->listarPorCodigoAreaPeriodo($obj->getcodigo_area(), $obj->getperiodo())[0];
					if($evaluaciones != null) {
						if($controlado->listarPorEjecutivo($obj->getrut_ejecutivo(), $obj->getperiodo()) != null) { 
							if(count($controlado->listarPorEjecutivo($obj->getrut_ejecutivo(), $obj->getperiodo())) == $evaluaciones->getcantidad_quincenales()) {
								if($quincenal->existeEvaluacionParaPeriodo($obj->getperiodo(), $obj->getrut_ejecutivo()) == null) {
									$arreglo['numero_quincenal'] 	= 0;
									$arreglo['rut_ejecutivo']		= $obj->getrut_ejecutivo();
									$arreglo['fecha_creacion']		= date("Y-m-d");
									$arreglo['rut_evaluador']		= $obj->getrut_evaluador();
									$arreglo['periodo']				= $obj->getperiodo();
									$arreglo['codigo_area']			= $obj->getcodigo_area();
									//obtener promedio de notas parciales
									$contador = 0;
									$notas	  = 0;
									foreach ($controlado->listarPorEjecutivo($obj->getrut_ejecutivo(), $obj->getperiodo()) as $k) {
										$notas = $notas + $k->getnota_final();
										$contador++;
									}
									$arreglo['nota_quincenal']		= ($notas/$contador);

									//ingresando evaluacion
									$obj2 = new EvaluacionQuincenal($arreglo);
									$quincenal->ingresar($obj2);

									//obtener número de última quincenal
									$recienCreada = $quincenal->ultimaEvaluacionGenerada($obj2->getperiodo(), $obj2->getrut_ejecutivo(), $obj2->getrut_evaluador(), $obj2->getejecutivo_codigo_area());
									//ingresar detalle a la quincenal
									foreach ($controlado->listarPorEjecutivo($obj->getrut_ejecutivo(), $obj->getperiodo()) as $k) {
										$arreglo = null;
										$arreglo['numero_quincenal']	= $recienCreada[0]->getnumero_quincenal();
										$arreglo['numero_evaluacion']	= $k->getnumero_evaluacion();
										$obj2 = new DetalleEvaluacionQuincenal($arreglo);
										$detaQuinc->ingresar($obj2);
									}
								}
							}
						}
					}
				}
				
				if($controlado->actualizar($obj)) {
					http_response_code(200);
				}else{
					http_response_code(301);
				}
			}
		}else{
			http_response_code(501);
		}
	}else{
		http_response_code(500);
	}
?>