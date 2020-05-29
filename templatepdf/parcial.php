<?php
header("Content-Type: text/html");
  if(!isset($_GET["evaluacion"])) {
   exit();
  }else{
    include("../config/Globales.php");
    include("../config/basicos.php");
    include("../controller/EvaluacionParcialController.php");
    Include("../controller/DetalleEvaluacionParcialController.php");
    include("../controller/ItemEvaluacionController.php");
    include("../controller/EvaluadorController.php");
    include("../controller/EjecutivoController.php");
    include("../controller/AreaController.php");

    $evaluacion = filter_input(INPUT_GET, ("evaluacion"));

    $ct_parcial = new EvaluacionParcialController();
    $ct_evaluador = new EvaluadorController();
    $ct_ejecutivo = new EjecutivoController();
    $ct_detallepa = new DetalleEvaluacionParcialController();
    $ct_categoria = new CategoriaController();
    $ct_item      = new ItemEvaluacionController();
    $ct_area      = new AreaController();

    $parcial   = $ct_parcial->listarPorNumero($evaluacion);
    $evaluador = $ct_evaluador->listarPorRut($parcial[0]->getrut_evaluador());
    $ejecutivo = $ct_ejecutivo->listarPorRut($parcial[0]->getrut_ejecutivo());
    $area      = $ct_area->listarPorCodigo($parcial[0]->getcodigo_area());

    ///DATOS DE ESTA EVALUACION PARCIAL
    $notasGlobalesParcial = $ct_parcial->detalleTotalEvaluacionParcial($evaluacion);

    //recuperando items para esta evaluación
    $items_evaluados = $ct_detallepa->listarPorNumero($evaluacion);
    $listado_items = $ct_parcial->detallePorItemPDF($evaluacion);

  }

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
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Parcial #<?php echo $evaluacion; ?> de <?php echo $ejecutivo[0]->getnombre_ejecutivo(); ?> | Autor: <?php echo $evaluador[0]->getnombre_evaluador(); ?></title>
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
<table width="100%" border="0">
  <tr>
    <td colspan="2"><table width="100%" border="1">
      <tr>
        <td class="CentroTituloConFormato">Evaluacion de Ejecutivos de <?php echo $area[0]->getnombre_area(); ?> </td>
        </tr>
      <tr>
        <td class="IzquierdaSinFormato">NUMERO DE LA EVALUACIÓN: <strong><?php echo $evaluacion; ?></strong></td>
        </tr>
    </table></td>
  </tr>
  <tr>
    <td width="40%">
        <table width="100%" border="0">
          <tr>
            <td width="29%" class="IzquierdaSinFormato">Fecha</td>
            <td width="71%" class="IzquierdaSinFormato"><?php echo date('d-m-Y'); ?></td>
          </tr>
          <tr>
            <td class="IzquierdaSinFormato">Ejecutivo</td>
            <td class="IzquierdaSinFormato"><?php echo agregar_dv($parcial[0]->getrut_ejecutivo()); ?> <strong><?php echo ucfirst($ejecutivo[0]->getnombre_ejecutivo()); ?></strong></td>
          </tr>
          <tr>
            <td class="IzquierdaSinFormato">Evaluador</td>
            <td class="IzquierdaSinFormato"><?php echo agregar_dv($parcial[0]->getrut_evaluador()); ?> <strong><?php echo ucfirst($evaluador[0]->getnombre_evaluador()); ?></strong></td>
          </tr>
      </table>
    </td>
    <td width="60%"><table width="100%" border="0">
      <tr>
        <td colspan="3" class="TituloCentrado">NOTA</td>
        <td class="TituloCentrado">FINAL</td>
      </tr>
      <tr>
        <td width="25%" class="CentroSinFormato"><?php echo $notasGlobalesParcial[0]['nombre_categoria']; ?></td>
        <td width="25%" class="CentroSinFormato"><?php echo $notasGlobalesParcial[1]['nombre_categoria']; ?></td>
        <td width="25%" class="CentroSinFormato"><?php echo $notasGlobalesParcial[2]['nombre_categoria']; ?></td>
        <td width="25%" rowspan="2" class="CentroSinFormatoNotaFinal"><?php echo $notasGlobalesParcial[0]['nota_parcial']; ?></td>
      </tr>
      <tr>
        <td class="CentroSinFormatoNotas"><?php echo $notasGlobalesParcial[0]['nota_categoria']; ?></td>
        <td class="CentroSinFormatoNotas"><?php echo $notasGlobalesParcial[1]['nota_categoria']; ?></td>
        <td class="CentroSinFormatoNotas"><?php echo $notasGlobalesParcial[2]['nota_categoria']; ?></td>
      </tr>
    </table></td>
    </tr>
  <tr>
    <td colspan="2"><table width="100%" border="0">
      <tr>
        <td width="10%" class="TituloCentrado">CATEGORIA</td>
        <td width="10%" class="TituloCentrado">PESO CATEGORIA</td>
        <td class="TituloCentrado">NOTAS DESCRIPTIVAS</td>
        <td width="8%" class="TituloCentrado">NOTA ÍTEM</td>
        <td width="10%" class="TituloCentrado">NOTA</td>
      </tr>

    <?php
      //generación de detalle PHP
      $act = "";
      for($i=0; $i<count($listado_items); $i++) {
        if($act != $listado_items[$i]['nombre_categoria']) {
          $act = $listado_items[$i]['nombre_categoria'];
          echo '<tr>';
          echo '<td rowspan="'.$listado_items[$i]["cantidad_items"].'" class="CentroSinFormato">'.$listado_items[$i]["nombre_categoria"].'</td>';
          echo '<td rowspan="'.$listado_items[$i]["cantidad_items"].'" class="CentroSinFormato">'.$listado_items[$i]["peso_categoria"].'%</td>';
          echo '<td class="IzquierdaSinFormato">'.$listado_items[$i]["nombre_item"].'</td>';
          if($listado_items[$i]["nota"] == -1) {
            echo '<td class="CentroSinFormato">No Evaluado</td>';
          }else{
            echo '<td class="CentroSinFormato">'.$listado_items[$i]["nota"].'</td>';
          }
          $prom = 0;
          $count = 0;
          foreach ($listado_items as $k) {
            if($k['nombre_categoria'] == $act) {
              if($k["nota"] != -1) {
                $prom = $prom+$k["nota"];
                $count++;
              }
            }
          }
          if($count == 0) {
            echo '<td rowspan="'.$listado_items[$i]["cantidad_items"].'" class="CentroSinFormato">0.0</td>';
          }else{
            echo '<td rowspan="'.$listado_items[$i]["cantidad_items"].'" class="CentroSinFormato">'.number_format(($prom/$count), 2, '.', ',').'</td>';
          }
          echo '</tr>';
        }else{
          echo '<tr>';
          echo '<td class="IzquierdaSinFormato">'.$listado_items[$i]["nombre_item"].'</td>';
          if($listado_items[$i]["nota"] == -1) {
            echo '<td class="CentroSinFormato">No Evaluado</td>';
          }else{
            echo '<td class="CentroSinFormato">'.$listado_items[$i]["nota"].'</td>';
          }
          echo '</tr>';
        }
      }
      //fin ngeneracion detalle PHP
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
        <td rowspan="2" class="IzquierdaSinFormato"><?php echo html_entity_decode($parcial[0]->getobservacion()); ?></td>
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
