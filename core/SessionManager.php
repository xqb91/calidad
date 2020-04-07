<?php
	session_start();
	if(isset($_SESSION['loginUser']) && isset($_SESSION['lastActivity'])) {
		//Sesiones iniciadas... Validando tiempo de inactividad
		$usuario 	=	$_SESSION['loginUser'];
		$actividad  = 	$_SESSION['lastActivity'];

		if($usuario == null) {
			if(strtolower(explode("/", $_SERVER['PHP_SELF'])[count(explode("/", $_SERVER['PHP_SELF']))-1]) != "index.php") {
				header("Location: index.php");
	    		exit();
			}
		}else{
			if($actividad == null) {
				if(strtolower(explode("/", $_SERVER['PHP_SELF'])[count(explode("/", $_SERVER['PHP_SELF']))-1]) != "index.php") {
					header("Location: index.php");
	    			exit();
				}
			}else{
				$last 		= new DateTime($actividad);
				$now 		= new DateTime(date('Y-m-d H:i:s'));
				if($last->diff($now)->i <= maxTiempoInactividad) {
					//Ok... renovar si se invoca
					$_SESSION['lastActivity'] = date('Y-m-d H:i:s');
				}else{
					//redireccionar
					if(strtolower(explode("/", $_SERVER['PHP_SELF'])[count(explode("/", $_SERVER['PHP_SELF']))-1]) != "index.php") {
						header("Location: index.php");
	    				exit();
					}
				}
			}
		}
	}else{
		//redireccionar
		if(strtolower(explode("/", $_SERVER['PHP_SELF'])[count(explode("/", $_SERVER['PHP_SELF']))-1]) != "index.php") {
			header("Location: index.php");
	    	exit();
		}
	}
?>