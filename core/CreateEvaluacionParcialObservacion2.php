<?php
	include("../config/Globales.php");
	include("../config/basicos.php");
	include(dirController."EvaluacionParcialController.php");
	include(dirController."EvaluacionQuincenalController.php");
	include(dirController."EvaluacionesAreaController.php");
	include(dirController."DetalleEvaluacionQuincenalController.php");
    include("../controller/LogEvaluacionQuincenalController.php");
	include(dirController."EvaluadorController.php");
    session_start();
	
	error_reporting(E_ALL);
	$controlado = new EvaluacionParcialController();
	$quincenal  = new EvaluacionQuincenalController();
	$evaArea    = new EvaluacionesAreaController();
	$detaQuinc 	= new DetalleEvaluacionQuincenalController();
    $ctLog 		= new LogEvaluacionQuincenalController();
	$sesionlck 	= $_SESSION['loginUser'];
	
	if(isset($_GET["evaluacion"])) {
		if(isset($_GET["comentarios"])) {
			$comentarios = htmlspecialchars(filter_input(INPUT_GET, ("comentarios")), ENT_QUOTES, "UTF-8");
			$evaluacion  = filter_input(INPUT_GET, ("evaluacion"));
			ERROR_REPORTING(E_ALL);
			$obj = $controlado->listarPorNumero($evaluacion);
			if($obj == null) {
				http_response_code(503);
			}else{
				$obj = $obj[0];
				$obj->setobservacion($comentarios);

				//generando evaluacion quincenal
				function procesarQuincenal($obj, $quincenal, $evaArea, $detaQuinc, $controlado) {
					
					$evaQuincenalSearch = $quincenal->existeEvaluacionParaPeriodo($obj->getperiodo(), $obj->getrut_ejecutivo());
					if($evaQuincenalSearch == null) {
						
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
										
										
										$ctLog->ingresar($recienCreada, $sesionlck->getusuario(), 'CREAR');

										
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
					}else{
						
						$quincenal 			= $evaQuincenalSearch[0];
						$quincenalNumero 	= $quincenal->getnumero_quincenal();
						$detalleQuincenal 	= $detaQuinc->listarPorNumeroQUincenal($quincenalNumero);

						$bandera = true;
						foreach ($detalleQuincenal as $key => $value) {
							if(!$controlado->existeEvaluacion($value->getevaluacion_parcial())) {
								$bandera = false;
							}
						}

						//si las evaluaciones existen.... actualizar
						if($bandera) {
							$promedio = 0;
							$contador = 0;
							foreach ($detalleQuincenal as $key => $value) {
								$obj = $controlado->listarPorNumero($value->getevaluacion_parcial());
								$promedio = $promedio + $obj[0]->getnota_final();
								$ct++;
							}
							$quincenal->setnota_quincenal($promedio/$ct);
							$ctrlQuin = new EvaluacionQuincenalController();
							$ctrlQuin->actualizar($quincenal);
							$ctLog->ingresar($quincenal, $sesionlck->getusuario(), 'ACTUALIZACION');

						}
						//de lo contrario eliminar la evaluación quincenal y desplegar el módulo para regenerar quincenal

					}
				}
				
			
		
				if($controlado->actualizar($obj)) {
					procesarQuincenal($obj, $quincenal, $evaArea, $detaQuinc, $controlado);
					http_response_code(200);
				}else{
					http_response_code(301);
				}
			}
		}else{
			echo "error parametro 2 no recibido";
			http_response_code(501);
		}
	}else{
		echo "error parametro 1 no recibido";
		//http_response_code(500);
	}
?>