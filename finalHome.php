<?php 
  include("model/Evaluador.php");
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

  if(!isset($_SESSION['loginUser'])) {
      header('Location: index.php');
      exit;
  }else{
    $evaluador = $_SESSION['loginUser'];
  }
?>
<!DOCTYPE html>
<html lang="es">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
    <link rel="icon" id="faviconico" type="image/vnd.microsoft.icon" href="facade/favicon/favicon.ico">
  <link rel="icon" id="faviconpng" type="image/png" href="facade/favicon/favicon.png">

  <title>Sistema De Evaluacion de Calidad</title>

  <!-- Custom fonts for this template-->
  <link href="facade/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="facade/css/sb-admin-2.min.css" rel="stylesheet">
    <!-- Custom styles for this page -->
  <link href="facade/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
  

</head>

<body id="page-top" class="sidebar-toggled">

  <!-- Page Wrapper -->
  <div id="wrapper">

    <!-- Sidebar -->
    <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" id="accordionSidebar">

      <!-- Sidebar - Brand -->
      <a class="sidebar-brand d-flex align-items-center justify-content-center" href="home.php">
        <div class="sidebar-brand-icon rotate-n-0">
          <img src="facade/img/tricard_logo.png" width="90%" />
        </div>
      </a>

      <!-- Divider -->
      <hr class="sidebar-divider my-0">

      <!-- Nav Item - Dashboard -->
      <li class="nav-item" id="btn-inicio">
        <a class="nav-link" href="home.php">
          <i class="fas fa-home"></i>
          <span>Inicio</span></a>
      </li>

      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        Evaluaciones
      </div>

      <!-- Nav Item - Utilities Collapse Menu -->
      <li class="nav-item"  id="btn-evaparcial">
        <a class="nav-link collapsed" href="parcialHome.php" aria-expanded="true" aria-controls="collapseUtilities">
          <i class="far fa-edit"></i>
          <span>Parciales</span>
        </a>
      </li>

      <!-- Nav Item - Utilities Collapse Menu -->
      <li class="nav-item" id="btn-evaquincenal">
        <a class="nav-link collapsed" href="quincenalHome.php" aria-expanded="true" aria-controls="collapseUtilities">
          <i class="far fa-calendar-check"></i>
          <span>Quincenales</span>
        </a>
      </li>

      <!-- Nav Item - Pages Collapse Menu -->
      <li class="nav-item active" id="btn-evafinal">
        <a class="nav-link collapsed" href="#" aria-expanded="true" aria-controls="collapsePages">
          <i class="fas fa-flag"></i>
          <span>Finales</span>
        </a>
      </li>

      <?php if($evaluador->getAdmin() == 1) { ?>
      <!-- Divider -->
      <hr class="sidebar-divider">

      <!-- Heading -->
      <div class="sidebar-heading">
        Ajustes
      </div>
      <!-- Nav Item - Charts -->
      <li class="nav-item" id="btn-ingreso">
        <a class="nav-link" href="charts.html">
          <i class="fas fa-users-cog"></i>
          <span>Ingresos</span></a>
      </li>

      <!-- Nav Item - Tables -->
      <li class="nav-item" id="btn-">
        <a class="nav-link" href="tables.html">
          <i class="fas fa-cog"></i>
          <span>Ajustes</span></a>
      </li>
      <?php } ?>
      <!-- Divider -->
      <hr class="sidebar-divider d-none d-md-block">


    </ul>
    <!-- End of Sidebar -->

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

          <form class="form-inline">
            <label class="my-1 mr-2" for="slcArea">Área: </label>
            <select class="custom-select my-1 mr-sm-2" id="slcArea">
            </select>

            <label class="my-1 mr-2" for="slcPeriodo">Periodo: </label>
            <select class="custom-select my-1 mr-sm-2" id="slcPeriodo">
            </select>
          </form>


          <!-- Sidebar Toggle (Topbar) -->
          <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
            <i class="fa fa-bars"></i>
          </button>

          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">


            <!-- Nav Item - Alerts -->
            <!-- INICIO DE CENTRO DE NOTIFICACIONES-->
            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                
                <span class="badge badge-secondary"><i class="fas fa-check-double"></i> Revisiones</span>
                <!-- Counter - Alerts -->
                <span class="badge badge-danger badge-counter" id="lblRevisionesCounter">--</span>
              </a>
              <!-- Dropdown - Alerts -->
              <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 class="dropdown-header">
                  <i class="fas fa-tired"></i> Solicitudes de Revisión 
                </h6>
                  <p id="lblCentroRevisiones"></p>
              </div>
            </li>

            <div class="topbar-divider d-none d-sm-block"></div>

            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                
                <span class="badge badge-secondary"><i class="fas fa-tired"></i> Apelaciones</span>
                <!-- Counter - Alerts -->
                <span class="badge badge-danger badge-counter" id="lblApelacionesCounter">--</span>
              </a>
              <!-- Dropdown - Alerts -->
              <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
                <h6 class="dropdown-header">
                  <i class="fas fa-tired"></i> Solicitudes de Apelación
                </h6>
                  <p id="lblCentroApelaciones"></p>
              </div>
            </li>
             <!-- FIN  DE CENTRO DE NOTIFICACIONES-->

            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small" id="lblEvaluadorLogin"><img src="facade/img/loading2.gif" /> Identificando...</span>
                <img class="img-profile rounded-circle" src="facade/img/avatar.png">
              </a>
              <!-- Dropdown - User Information -->
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="logout.php">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Salir del sistema de Calidad
                </a>
              </div>
            </li>

          </ul>

        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">
          <div >
          <!-- Content Row -->
            <div class="row">
<!-- Area Chart -->
              <div class="col-xl-9 col-lg-10">
                <div class="card shadow mb-2">
                <!-- Card Header - Dropdown -->
                  <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Listado de Ejecutivos</h6>
                  </div>
                <!-- Card Body -->
                  <div class="card-body">
                      <div class="table-responsive">
                        <table class="table table-bordered" id="tablaEjecutivos" width="100%" cellspacing="0">
                          <thead>
                            <tr>
                              <th><i class="fas fa-calculator"></i></i></th>
                              <th>Rut de Ejecutivo</th>
                              <th>Nombre de Ejecutivo</th>
                              <th></th>
                              <th></th>
                              <th></th>
                            </tr>
                          </thead>
                          <tfoot>
                            <tr>
                              <th><i class="fas fa-calculator"></i></i></th>
                              <th>Rut de Ejecutivo</th>
                              <th>Nombre de Ejecutivo</th>
                              <th></th>
                              <th></th>
                              <th></th>
                            </tr>
                          </tfoot>
                          <tbody>
                          </tbody>
                        </table>
                      </div>
                </div>
              </div>
            </div>

            <!-- Pie Chart -->
            <div class="col-xl-3 col-lg-2">
              <div class="card shadow mb-2">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Estadisticas</h6>
                </div>

                <!-- Card Body -->
                <div class="card-body">
                   <ul class="list-group list-group-vertical-sm" id="estadisticas"> 
                  </ul>                  
                </div>
              </div>
            </div>

            </div>
          </div>

        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Tricot &copy; 2020 - Tricot Management Information Systems</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->



<div class="modal fade bd-example-modal-xl" id="modalHome" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document" id="modalHomeConfig">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalHomeTitle">Modal title</h5>
        <button type="button" id="modalHomeCerrarVentana" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="modalHomeContenido">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" id="modalHomeBtnCerrar" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
        <button type="button" id="modalHomeBtnAccion" class="btn btn-primary btn-sm">Save changes</button>
      </div>
    </div>
  </div>
</div>




  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>



  <!-- Bootstrap core JavaScript-->
  <script src="facade/vendor/jquery/jquery.min.js"></script>
  <script src="facade/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Core plugin JavaScript-->
  <script src="facade/vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="facade/js/sb-admin-2.min.js"></script>

  <!-- Page level plugins -->
  <script src="facade/vendor/datatables/jquery.dataTables.min.js"></script>
  <script src="facade/vendor/datatables/dataTables.bootstrap4.min.js"></script>

  <!-- Page level custom scripts -->
  <script src="transaction/finalHomeTransaction.js"></script>
 <script src="framework/play-sound/jquery.playSound.js"></script>
  <script src="transaction/PushNotificacionRevisiones.js"></script>
</body>

</html>
