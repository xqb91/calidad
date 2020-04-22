<?php
	include("../config/Globales.php");
	include("../config/basicos.php");
	
	$nombre = filter_input(INPUT_POST, ("file"));
	$nombre = basename($nombre);
	if($nombre == '') {
		http_response_code(500);
	}else{
		if(file_exists(dirFileAudio.$nombre)) {
			if(unlink(dirFileAudio.$nombre)) {
				http_response_code(200);
			}else{
				http_response_code(401);
			}
		}else{
			http_response_code(301);
		}
	}
?>