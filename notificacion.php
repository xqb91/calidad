<?php 
  include("config/Globales.php");
  include("config/basicos.php");
  //including controllers
  include(dirModel."Evaluador.php");
  include(dirController."CustomController.php");
  session_start();
  if(!isset($_SESSION['rauliUser'] )) {
    header('Location: index.php');
    exit;
  }
  if(!isset($_SESSION['lastActivity'] )) {
    header('Location: index.php');
    exit;
  }

  if(!isset($_SESSION['current_area_work'])) {
    header('Location: index.php');
    exit;
  }

  if(!isset($_SESSION['current_periodo_work'])) {
    header('Location: index.php');
    exit;
  }

  $evaluacion = filter_input(INPUT_GET, "evaluacion");
  $tipo       = filter_input(INPUT_GET, "tipo");
  $proceso    = filter_input(INPUT_GET, "proceso");



  $usuario  = $_SESSION['loginUser'];
  $ctrl     = new CustomController();
  if($proceso == 1) {
    $obj = $ctrl->evaluacionDetalleRevision($usuario->getrut_evaluador(), $evaluacion);
  }else{
    $obj = $ctrl->evaluacionDetalleApelacion($usuario->getrut_evaluador(), $evaluacion);
  }
?>
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Visor de Notificaciones</title>

  <!-- Custom fonts for this template-->
  <link href="facade/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="facade/css/sb-admin-2.min.css" rel="stylesheet">

</head>

<body class="bg-gradient-primary">


    <!-- Outer Row -->

      <div class="col-xl-12 col-lg-12 col-md-12">

        <div class="card o-hidden border-0 shadow-lg my-12">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-12">
                <div class="p-5">
                  <div class="text-center">
                  <?php 
                    if($proceso == 1) {
                  ?>
                    <h1 class="h4 text-gray-900 mb-2">Solicitud de Revisión de Evaluación <?php if($tipo == 1) { echo "Parcial"; }else if($tipo == 2) { echo "Quincenal"; }else{ echo "Final"; } ?> #<?php echo $evaluacion; ?></h1>
                  <?php
                    }else{
                  ?>
                    <h1 class="h4 text-gray-900 mb-2">Solicitud de Apelación de Evaluación <?php if($tipo == 1) { echo "Parcial"; }else if($tipo == 2) { echo "Quincenal"; }else{ echo "Final"; } ?> #<?php echo $evaluacion; ?></h1>
                  <?php
                    }
                  ?>
                    
                    <p class="mb-4">A continuación usted podrá visualizar el detalle de la solicitud:</p>
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Solicitante</th>
                          <th scope="col"><?php echo $obj[0]['nombre_solicitante']; ?></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Evaluación</th>
                          <td>#<?php echo $obj[0]['evaluacion']; ?></td>
                        </tr>
                        <tr>
                          <th scope="row">Periodo</th>
                          <td><?php echo $obj[0]['periodo']; ?></td>
                        </tr>
                        <tr>
                          <th scope="row">Area</th>
                          <td><?php echo $obj[0]['nombre_area']; ?></td>
                        </tr>
                        <tr>
                          <th scope="row" colspan="2" class="table table-hover table-dark">Detalles de Solicitud</th>
                        </tr>
                        <tr>
                          <td colspan="2" style="text-align: justify;"><?php echo html_entity_decode ($obj[0]['observacion'], ENT_QUOTES, 'UTF-8'); ?></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <hr>
                  <div class="text-center">
                    <a class="small" href="notificacion.php?evaluacion=<?php echo $evaluacion; ?>&tipo=<?php echo $tipo; ?>&proceso=<?php echo $proceso; ?>&accion=redireccionar"><strong><i class="far fa-edit"></i> Ver la Evaluación</strong></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

<?php 
  if(isset($_GET['accion'])) {
    $accion = $_GET["accion"];
    if($accion == "redireccionar") {
      $_SESSION['current_area_work'] = $obj[0]['codigo_area'];
      $_SESSION['current_periodo_work'] = $obj[0]['periodo'];
      header('Location: parcialHomeDet.php?ejecutivo='.$obj[0]['rut_ejecutivo']);
    }
  }
?>

  <!-- Bootstrap core JavaScript-->

  <!-- Core plugin JavaScript-->
  <script src="facade/vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="facade/js/sb-admin-2.min.js"></script>

</body>

</html>
