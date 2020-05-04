<?php
	include("../framework/mpdf/vendor/autoload.php");


	$mpdf = new \Mpdf\Mpdf();

	// La variable $html es vuestro código que queréis pasar a PDF
	$html = file_get_contents("test.html");

	$mpdf->WriteHTML($html, \Mpdf\HTMLParserMode::HTML_BODY);

	// Genera el fichero y fuerza la descarga
	$mpdf->Output('nombre.pdf', 'D'); exit;
	

	//file_get_contents("pdfEvaluacionParcial.php");
?>