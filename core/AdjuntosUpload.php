<?php
	include("../config/Globales.php");
	include("../config/basicos.php");

	if(!isset($_FILES['fileadjuntos']['name'])) {
		http_response_code(500);
	}else{
		$nombre 		= md5(date("Ymdhis")."-".basename($_FILES['fileadjuntos']['name'])).".".explode(".", basename($_FILES['fileadjuntos']['name']))[count(explode(".", basename($_FILES['fileadjuntos']['name'])))-1];
		$original		= basename($_FILES['fileadjuntos']['name']);
		$fichero_subido = dirFileAttachments.$nombre;

		if (move_uploaded_file($_FILES['fileadjuntos']['tmp_name'], $fichero_subido)) {
		    $json = '{';
		    $json = $json.'"nombre_fichero":"'.$original.'", ';
		    $json = $json.'"nombre_unico":"'.$nombre.'", ';
		    $json = $json.'"url": "'.str_replace($_SERVER["DOCUMENT_ROOT"]."/calidad/", "", dirFileAttachments)."".$nombre.'", ';
		    $json = $json.'"peso":"'.formatBytes($_FILES['fileadjuntos']['size']).'"';
		    $json = $json.'}'; 
		    echo $json;
		    http_response_code(200);
		} else {
		    http_response_code(301);
		}
	}



	function formatBytes($size, $precision = 1)
	{
	    $base = log($size, 1024);
	    $suffixes = array('', 'Kb', 'Mb', 'Gb', 'Tb');   

	    return round(pow(1024, $base - floor($base)), $precision) .' '. $suffixes[floor($base)];
	}
?>