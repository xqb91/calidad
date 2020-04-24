<?php
	include("config/Globales.php");
	include("config/basicos.php");
	include(dirController."ItemEvaluacionController.php");

	$ct = new ItemEvaluacionController();
	$var = $ct->listarPorArea(1);
	foreach ($var as $k) {
		echo $k->serializar()."<br />";
	}
?>