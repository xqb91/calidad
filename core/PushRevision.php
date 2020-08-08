<?php
	include("../config/Globales.php");
	include("../config/basicos.php");
	//including controllers
	include(dirModel."Evaluador.php");
	include(dirController."CustomController.php");
	session_start();

	if(isset($_SESSION['loginUser'])) {

	}

	if(isset($_SESSION['loginUser'])) {
		if(isset($_POST["tipo"])) {
			$peticion = filter_input(INPUT_POST, ("tipo"));
		}else{
			$peticion = '';
		}

		//
		$usuario 	= $_SESSION['loginUser'];
		$ctrl 		= new CustomController();

		switch ($peticion) {
			case 1:
				//datos globales
				$elementos 	= $ctrl->evaluacionesARevisarPor($usuario->getrut_evaluador());
				if($elementos == null) {
					http_response_code(401);
				}else{
					echo '[';
					for($i=0; $i<count($elementos); $i++) {
						$k = $elementos[$i];

						echo '{';
						echo '"tipo" : '.$k["tipo"].', ';
						echo '"evaluacion" : '.$k["evaluacion"].', ';
						echo '"periodo" : "'.$k["periodo"].'", ';
						echo '"fecha_creacion" : "'.$k["fecha"].'", ';
						echo '"rut_evaluador_creador" : '.$k["creadapor"].', ';
						echo '"rut_evaluador_nombre" : "'.$k["creadaporname"].'", ';
						echo '"rut_ejecutivo" : '.$k["rut_ejecutivo"].', ';
						echo '"nombre_ejecutivo" : "'.$k["nombre_ejecutivo"].'", ';
						echo '"solicitante" : "'.$k["nombre_solicitante"].'" ';
						echo '}';
						if($i < (count($elementos)-1) ) {
							echo ',';
						}
					}
					echo ']';
				}
			break;

			case 2:
				//detalle evaluacion particular
				if(isset($_POST['evaluacion'])) {
					$evaluacion = filter_input(INPUT_POST, ("evaluacion"));
					$evaluacion = $ctrl->evaluacionDetalleRevision($usuario->getrut_evaluador(), $evaluacion);
					if($evaluacion == null) {
						http_response_code(401);
					}else{
						echo '[';
						for($i=0; $i<count($elementos); $i++) {
							$k = $elementos[$i];

							echo '{';
							echo '"tipo" : '.$k["tipo"].', ';
							echo '"evaluacion" : '.$k["evaluacion"].', ';
							echo '"periodo" : "'.$k["periodo"].'", ';
							echo '"fecha_creacion" : "'.$k["fecha"].'", ';
							echo '"rut_evaluador_creador" : '.$k["creadapor"].', ';
							echo '"rut_evaluador_nombre" : "'.$k["creadaporname"].'", ';
							echo '"rut_ejecutivo" : '.$k["rut_ejecutivo"].', ';
							echo '"nombre_ejecutivo" : "'.$k["nombre_ejecutivo"].'", ';
							echo '"solicitante" : "'.$k["nombre_solicitante"].'" ';
							echo '}';
							if($i < (count($elementos)-1) ) {
								echo ',';
							}
						}
						echo ']';
					}
				}else{
					http_response_code(501);
				}
			break;
			
			case 3:
				if(isset($_POST['evaluacion'])) {
					$evaluacion = filter_input(INPUT_POST, ("evaluacion"));
					$evaluacion = $ctrl->evaluacionDetalleRevision($usuario->getrut_evaluador(), $evaluacion);
					if($evaluacion == null) {
						http_response_code(401);
					}else{
						for($i=0; $i<count($elementos); $i++) {
							$k = $elementos[$i];
							$k["observacion"];
						}
					}
				}else{
					http_response_code(501);
				}
			break;

			default:
				$elementos 	= $ctrl->evaluacionesARevisarPor($usuario->getrut_evaluador());
				if($elementos == null) {
					echo '{"cantidad" : 0}';
				}else{
					echo '{"cantidad" : '.count($elementos).'}';
				}
			break;
		}
	}else{
		http_response_code(500);
	}
	/*if(isset($_POST["evaluacion"])) {
		if(isset($_POST["comentario"])) {
			$evaluacion = filter_input(INPUT_POST, ("evaluacion"));
			$comentario = htmlspecialchars(filter_input(INPUT_POST, ("comentario")), ENT_QUOTES, "UTF-8");

			//instanciando controlador
			$control = new EvaluacionFinalController();
			$temp 	 = $control->listarPorNumero($evaluacion);

			if($evaluacion == null) {
				//error la evaluacion no exixste
			}else{
				//actualizar
				$temp = $temp[0];
				$temp->setobservaciones($comentario);
				if($control->actualizar($temp)) {
					//ok
					http_response_code(200);
				}else{
					//error
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
	}*/
?>