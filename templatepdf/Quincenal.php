<?php
header("Content-Type: text/html");
  //error_reporting(0);
  if(!isset($_GET["evaluacion"])) {
   exit();
  }else{
    include("../config/Globales.php");
    include("../config/basicos.php");
    include("../controller/EvaluacionQuincenalController.php");
    include("../controller/EvaluadorController.php");
    include("../controller/EjecutivoController.php");
    include("../controller/AreaController.php");

    $evaluacion = filter_input(INPUT_GET, ("evaluacion"));

    $ct_evaluador = new EvaluadorController();
    $ct_ejecutivo = new EjecutivoController();
    $ct_quincenal = new EvaluacionQuincenalController();
    $ct_area      = new AreaController();

    $valores    = $ct_quincenal->resumenEvaluacionQuincenalPDF($evaluacion);
    $quincenal  = $ct_quincenal->listarPorNumero($evaluacion);
    $ejecutivo  = $ct_ejecutivo->listarPorRut($quincenal[0]->getrut_ejecutivo());
    $evaluador  = $ct_evaluador->listarPorRut($quincenal[0]->getrut_evaluador());
    $area       = $ct_area->listarPorCodigo($quincenal[0]->getejecutivo_codigo_area());

    //¿Cuantas evaluaciones parciales se consideran para generar la quincenal?
    $contador = 0;
    $last = 0;
    foreach ($valores as $k) {
      if($last != $k['numero_evaluacion']) {
        $contador++;
        $last = $k['numero_evaluacion'];
      }
    }

    $total_parciales = $contador;
    //--------------------------------------------------------------------------
    
    //¿cuantas categorias vienen?
    $contador = 0;
    $last = "";
    $first = "";
    foreach ($valores as $k) {
      if($last != $k['nombre_categoria']) {
        if($first == $k['nombre_categoria']) {
          break;
        }
        if($contador == 0) { $first = $k['nombre_categoria']; }
        $contador++;
        $last = $k['nombre_categoria'];
      }
    }

    $total_categorias = $contador;


    //------------------------------------------------------------------------------
    // GENERANDO MATRIZ
    // -----------------------------------------------------------------------------
    
    $array = null;
    $i = 0;
    while($i<($total_parciales*$total_categorias)) {
      $array[$i]['parcial'] = $valores[$i]['numero_evaluacion'];
      $array[$i]['orden'] = $valores[$i]['orden'];
      $aux = null;
      for($j=$i; $j<($i+$total_categorias); $j++) { 
        $aux[$j]['codigo_categoria']  = $valores[$j]['codigo_categoria'];
        $aux[$j]['nombre_categoria']  = $valores[$j]['nombre_categoria'];
        $aux[$j]['peso_categoria']    = $valores[$j]['peso_categoria'];
        $aux[$j]['promedio']          = $valores[$j]['promedio'];
      }
      $array[$i]['detalle'] = $aux;
       $i = $i+$total_categorias;
    }

    //
    $promedios = null;
    $peso      = null;
    foreach ($array as $k) {
      $i = 0;
      foreach ($k['detalle'] as $j) {
         if(@$promedios[$i] == null) {
            $promedios[$i]  = $j['promedio'];
            $peso[$i]       = $j['peso_categoria'];
         }else{
            $promedios[$i]  = $promedios[$i]+$j['promedio'];
            $peso[$i]       = $j['peso_categoria'];
         }
         $i++;
       } 
    }

    //calculo de valor final de la evaluación final
    $parcial1= ($valores[0]['promedio']*($valores[0]['peso_categoria']/100))+($valores[1]['promedio']*($valores[1]['peso_categoria']/100))+($valores[2]['promedio']*($valores[2]['peso_categoria']/100));
    $parcial2= (($valores[3]['promedio']*($valores[3]['peso_categoria']/100))+($valores[4]['promedio']*($valores[4]['peso_categoria']/100))+($valores[5]['promedio']*($valores[5]['peso_categoria']/100)));
    $parcial3= ($valores[6]['promedio']*($valores[6]['peso_categoria']/100))+($valores[7]['promedio']*($valores[7]['peso_categoria']/100))+($valores[8]['promedio']*($valores[8]['peso_categoria']/100));

    //promedio por categoria
    $categ1 = number_format((($valores[0]['promedio']+$valores[3]['promedio']+$valores[6]['promedio'])/3), 2, '.', ',');
    $categ2 = number_format((($valores[1]['promedio']+$valores[4]['promedio']+$valores[7]['promedio'])/3), 2, '.', ',');
    $categ3 = number_format((($valores[2]['promedio']+$valores[5]['promedio']+$valores[8]['promedio'])/3), 2, '.', ',');
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
<title>Evaluación Quincenal #<?php echo $valores[0]['numero_quincenal']; ?> de <?php echo ucfirst($ejecutivo[0]->getnombre_ejecutivo()); ?> - Evaluado por <?php echo ucfirst($evaluador[0]->getnombre_evaluador()); ?></title>
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
<img src="<?php echo DomainNameURL; ?>templatepdf/tricard.png">
<table width="100%" border="0">
  <tr>
    <td colspan="2">
      <table width="100%" >
        <tr>
          <td class="CentroTituloConFormato">Evaluacion Quincenal de Ejecutivos de <?php echo $area[0]->getnombre_area(); ?> </td>
        </tr>
        <tr>
          <td class="IzquierdaSinFormato">NUMERO DE LA EVALUACION QUINCENAL: <strong><?php echo $valores[0]['numero_quincenal']; ?></strong></td>
        </tr>
      </table>
    </td>
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
          <td class="IzquierdaSinFormato"><?php echo agregar_dv($ejecutivo[0]->getrut_ejecutivo()); ?> - <strong><?php echo ucfirst($ejecutivo[0]->getnombre_ejecutivo()); ?></strong></td>
        </tr>
        <tr>
          <td class="IzquierdaSinFormato">Evaluador</td>
          <td class="IzquierdaSinFormato"><?php echo agregar_dv($evaluador[0]->getrut_evaluador()); ?> - <strong><?php echo ucfirst($evaluador[0]->getnombre_evaluador()); ?></strong></td>
        </tr>
      </table>
    </td>
    <td width="60%">
      <table width="100%" border="0">
        <tr>
          <td colspan="<?php echo $total_categorias; ?>" class="TituloCentrado">NOTA</td>
          <td class="TituloCentrado">FINAL</td>
        </tr>
        <tr>
          <?php
            for ($i=0; $i<$total_categorias; $i++) { 
              echo '<td width="25%" class="CentroSinFormato">'.$array[0]['detalle'][$i]['nombre_categoria'].'</td>';
            }
          ?>
          <?php
            $temp_nota_final = 0;
            for($i=0; $i<count($promedios); $i++) {
              $temp_nota_final = $temp_nota_final+(($promedios[$i]/$total_parciales)*($peso[$i]/100));
            }
          ?>
          <td width="25%" rowspan="2" class="CentroSinFormatoNotaFinal"><?php echo number_format(($temp_nota_final), 2, '.', ','); ?></td>
        </tr>
        <tr>
          <?php
            for($i=0; $i<count($promedios); $i++) {
              echo '<td class="CentroSinFormatoNotas">'.number_format(($promedios[$i]/$total_parciales), 2, '.', ',').'</td>';
            }
          ?>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <table width="100%" border="0">
        <tr>
          <td class="TituloCentrado">Evaluación</td>
          <?php
            for ($i=0; $i<$total_categorias; $i++) { 
               echo '<td class="TituloCentrado">'.$array[0]['detalle'][$i]['nombre_categoria'].'</td>';
            }
          ?>
          <td class="TituloCentrado">Nota</td>
          </tr>
        <?php 
          $pos = 0;
          $iterator=0;  
          foreach ($array as $k) {
            echo '<tr>';
            echo '<td class="IzquierdaSinFormato"><strong>'.$k['orden'].'° Evaluación Parcial</strong> <br />Evaluación Correlativa de Sistema #'.$k['parcial'].'</td>';
            $temp_promedio = 0;
            for ($i=$iterator; $i<($total_categorias+$iterator); $i++) { 
              echo '<td class="CentroSinFormato">'.$k['detalle'][$i]['promedio'].'</td>';
              $temp_promedio = $temp_promedio+($k['detalle'][$i]['promedio']*($peso[$i-$iterator]/100));
            }
            echo '<td class="CentroSinFormato">'.number_format($temp_promedio, 2, '.', ',').'</td>';
            echo '</tr>';
            $iterator = $i;
            $pos++; 
          } 
        ?>
      </table>
    </td>
  </tr>
  <tr>
    <td colspan="2"><table width="100%" border="0">
      <tr>
        <td width="34%" class="TituloCentrado" colspan="2">Observación de la Interacción Telefónica</td>
      </tr>
      <tr>
        <td colspan="2" class="IzquierdaSinFormato">Evaluación quincenal generada automáticamente por el sistema de calidad el <?php echo DateTime::createFromFormat('Y-m-d', $quincenal[0]->getfecha_creacion())->format('d-m-Y'); ?></td>
      </tr>
    </table></td>
  </tr>
</table>
</body>
</html>
