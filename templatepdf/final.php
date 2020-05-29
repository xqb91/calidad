<?php
header("Content-Type: text/html");
  if(!isset($_GET["evaluacion"])) {
   exit();
  }else{
    include("../config/Globales.php");
    include("../config/basicos.php");
    include("../controller/EvaluacionFinalController.php");
    include("../controller/EvaluadorController.php");
    include("../controller/EjecutivoController.php");
    include("../controller/AreaController.php");

    $evaluacion = filter_input(INPUT_GET, ("evaluacion"));

    $ct_evaluador = new EvaluadorController();
    $ct_ejecutivo = new EjecutivoController();
    $ct_final     = new EvaluacionFinalController();
    $ct_area      = new AreaController();

    $final        = $ct_final->listarPorNumero($evaluacion);
    $datosfinal   = $ct_final->datosReportePDF($evaluacion);
    $datosResumen = $ct_final->resumenReportePDF($evaluacion);
    $dataejecutivo= $ct_ejecutivo->listarPorRut($final[0]->getejecutivo_rut_ejecutivo());
    $dataevaluador= $ct_evaluador->listarPorRut($final[0]->getevaluador_rut_evaluador());
    $data_area    = $ct_area->listarPorCodigo($final[0]->getejecutivo_codigo_area());
  
    function agregar_dv($_rol) {
        /* Bonus: remuevo los ceros del comienzo. */
        while($_rol[0] == "0") {
            $_rol = substr($_rol, 1);
        }
        $factor = 2;
        $suma = 0;
        for($i = strlen($_rol) - 1; $i >= 0; $i--) {
            $suma += $factor * $_rol[$i];
            $factor = $factor % 7 == 0 ? 2 : $factor + 1;
        }
        $dv = 11 - $suma % 11;
        /* Por alguna razón me daba que 11 % 11 = 11. Esto lo resuelve. */
        $dv = $dv == 11 ? 0 : ($dv == 10 ? "K" : $dv);
        return number_format($_rol, 0, ',', '.') . "-" . $dv;
    }
  }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Evaluación Final #<?php echo $final[0]->getnumero_final  (); ?> de <?php echo ucfirst($dataejecutivo[0]->getnombre_ejecutivo()); ?> - Evaluado por <?php echo ucfirst($dataevaluador[0]->getnombre_evaluador()); ?></title>
<style type="text/css">
.Titulo {
  color: #FFF;
  background-color: #00C;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
  font-weight: bold;
  text-align: left;
}
.TituloCentrado {
  background-color: #00C;
  color: #FFF;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.TituloCentrado {
  text-align: center;
  background: #1C6EA4;
  background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  border-bottom: 2px solid #444444;
}
.CentroSinFormato {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
}
.CentroSinFormatoNotas {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  font-weight: bold;
}
.CentroSinFormatoNotaFinal {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 17px;
  font-weight: bold;
}

.IzquierdaSinFormato {
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;  
}
.CentroTituloConFormato {
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  color: #fff;
  text-align: center;
  background: #1C6EA4;
  background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  border-bottom: 2px solid #444444;
}


table {
  border: 1px solid #1C6EA4;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
table td, table th {
  border: 1px solid #AAAAAA;
}
table tbody td {
  font-size: 10px;
}
table tr:nth-child(even) {
  background: #D0E4F5;
}
table thead {
  background: #1C6EA4;
  background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  border-bottom: 2px solid #444444;
}
table thead th {
  font-size: 12px;
  font-weight: bold;
  color: #FFFFFF;
  border-left: 2px solid #D0E4F5;
}
table thead th:first-child {
  border-left: none;
}

table tfoot td {
  font-size: 10px;
}
table tfoot .links {
  text-align: right;
}
table tfoot .links a{
  display: inline-block;
  background: #1C6EA4;
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: 5px;
}
</style>
</head>

<body>
<img src="<?php echo DomainNameURL; ?>templatepdf/tricard.png" height="30px">
<table width="100%" border="1">
  <tr>
    <td colspan="3"><table width="100%" border="1">
      <tr>
        <td class="CentroTituloConFormato">Evaluacion Final de Ejecutivos de <?php echo $data_area[0]->getnombre_area(); ?> </td>
        </tr>
      <tr>
        <td class="IzquierdaSinFormato">NUMERO DE LA EVALUACION: <strong><?php echo $final[0]->getnumero_final  (); ?></strong></td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td width="40%"><table width="100%" border="0">
      <tr>
        <td width="29%" class="IzquierdaSinFormato">Fecha</td>
        <td width="71%" class="IzquierdaSinFormato"><?php echo date('d-m-Y'); ?></td>
      </tr>
      <tr>
        <td class="IzquierdaSinFormato">Evaluador</td>
        <td class="IzquierdaSinFormato"><?php echo agregar_dv($final[0]->getevaluador_rut_evaluador()); ?> - <strong><?php echo ucfirst($dataejecutivo[0]->getnombre_ejecutivo()); ?></strong></td>
      </tr>
      <tr>
        <td class="IzquierdaSinFormato">Nombre</td>
        <td class="IzquierdaSinFormato"><?php echo agregar_dv($final[0]->getejecutivo_rut_ejecutivo()); ?> - <strong><?php echo ucfirst($dataevaluador[0]->getnombre_evaluador()); ?></strong></td>
      </tr>
    </table></td>
    <td width="60%"><table width="100%" border="0">
      <tr>
        <td colspan="3" class="TituloCentrado">NOTA</td>
        <td class="TituloCentrado">FINAL</td>
      </tr>
      <tr>
        <td width="25%" class="CentroSinFormato"><?php echo $datosfinal[0]['nombre_categoria']; ?></td>
        <td width="25%" class="CentroSinFormato"><?php echo $datosfinal[1]['nombre_categoria']; ?></td>
        <td width="25%" class="CentroSinFormato"><?php echo $datosfinal[2]['nombre_categoria']; ?></td>
        <td width="25%" class="CentroSinFormatoNotaFinal" rowspan="2"><?php echo $final[0]->getnotafinal(); ?></td>
      </tr>
      <tr>
        <td class="CentroSinFormatoNotas"><?php echo $datosResumen[0]['promedio']; ?></td>
        <td class="CentroSinFormatoNotas"><?php echo $datosResumen[1]['promedio']; ?></td>
        <td class="CentroSinFormatoNotas"><?php echo $datosResumen[2]['promedio']; ?></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan="2"><table width="100%" border="0">
      <tr>
        <td class="TituloCentrado">Evaluación</td>
        <td class="TituloCentrado"><?php echo $datosfinal[0]['nombre_categoria']; ?></td>
        <td class="TituloCentrado"><?php echo $datosfinal[1]['nombre_categoria']; ?></td>
        <td class="TituloCentrado"><?php echo $datosfinal[2]['nombre_categoria']; ?></td>
        <td class="TituloCentrado">Nota</td>
        </tr>
      
      <?php 
        for($i=0; $i<count($datosfinal); $i=$i+3) {
          $k = $datosfinal;
          echo '<tr>';
          echo '<td width="20%" class="IzquierdaSinFormato">evaluación parcial <strong>#'.$k[$i]['parcial'].'</strong></td>';
          echo '<td width="10%" class="CentroSinFormato">'.$k[$i]['promedio'].'</td>';
          echo '<td width="10%" class="CentroSinFormato">'.$k[$i+1]['promedio'].'</td>';
          echo '<td width="10%" class="CentroSinFormato">'.$k[$i+2]['promedio'].'</td>';
          //calculo de promedio
          $promedio = ($k[$i]['promedio']*($k[$i]['peso_categoria']/100))+($k[$i+1]['promedio']*($k[$i+1]['peso_categoria']/100))+($k[$i+2]['promedio']*($k[$i+2]['peso_categoria']/100));
          echo '<td width="10%" class="CentroSinFormato">'. number_format($promedio, 2, '.', ',').'</td>';
          echo '</tr>';
        }

      ?>
    </table></td>
  </tr>
  <tr>
    <td colspan="2"><table width="100%" border="0">
      <tr>
        <td width="85%" class="CentroTituloConFormato">Observación de la Interacción Telefónica</td>
        <td width="15%" class="IzquierdaSinFormato"></td>
      </tr>
      <tr>
        <td rowspan="2" class="IzquierdaSinFormato"><?php echo html_entity_decode($final[0]->getobservaciones()); ?></td>
        <td class="IzquierdaSinFormato"><p class="CentroSinFormato">_____________</p>
          <p class="CentroSinFormato">Firma Evaluador</p></td>
      </tr>
      <tr>
        <td class="IzquierdaSinFormato"><p class="CentroSinFormato">_____________</p>
          <p class="CentroSinFormato">Firma Evaluado</p></td>
      </tr>
    </table></td>
  </tr>
</table>
</body>
</html>
