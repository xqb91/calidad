<?php
	include("../config/Globales.php");
	include("../config/basicos.php");

	if(!isset($_FILES['fileAudio']['name'])) {
		http_response_code(500);
	}else{
		$fichero_subido = dirFileAudio. basename($_FILES['fileAudio']['name']);

		if (move_uploaded_file($_FILES['fileAudio']['tmp_name'], $fichero_subido)) {
		    $json = '{';
		    $json = $json.'"nombre_fichero":"'.basename($_FILES["fileAudio"]["name"]).'", ';
		    $json = $json.'"url": "'.str_replace($_SERVER["DOCUMENT_ROOT"]."/calidad/", "", dirFileAudio)."".basename($_FILES['fileAudio']['name']).'", ';
		    $json = $json.'"peso":"'.formatBytes($_FILES['fileAudio']['size']).'"';
		    $json = $json.'}'; 
		    echo $json;
		    http_response_code(200);
		} else {
		    http_response_code(301);
		}
	}



	function formatBytes($size, $precision = 2)
	{
	    $base = log($size, 1024);
	    $suffixes = array('', 'Kb', 'Mb', 'Gb', 'Tb');   

	    return round(pow(1024, $base - floor($base)), $precision) .' '. $suffixes[floor($base)];
	}
?>