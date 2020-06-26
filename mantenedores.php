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

  if($evaluador->getAdmin() != 1)  {
    header('Location: home.php');
    exit;
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

  <title>SB Admin 2 - Cards</title>

  <!-- Custom fonts for this template-->
  <link href="facade/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="facade/css/sb-admin-2.min.css" rel="stylesheet">
</head>

<body id="page-top">

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
      <li class="nav-item" id="btn-evafinal">
        <a class="nav-link collapsed" href="finalHome.php" aria-expanded="true" aria-controls="collapsePages">
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
      <li class="nav-item active" id="btn-">
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

          <!-- Sidebar Toggle (Topbar) -->
          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">


            <!-- Nav Item - Alerts -->
            <!-- Nav Item - Messages MENSAJES-->

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

          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Ajustes</h1>
          </div>


          <div class="row">

            <div class="col-lg-7">

              <!-- Default Card Example -->
              <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Categorías</h6>
                  <div class="dropdown no-arrow">
                    <div class="form-group form-control-sm">
                      <select class="form-control form-control-sm" id="slcAreaCategoria">

                      </select>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div id="descCategorias">Seleccione un área para comenzar.</div>
                  <table class="table table-bordered" id="tablaCategorias">
                    <thead>
                      <tr>
                        <th scope="col">Categorías</th>
                        <th scope="col">Peso (%)</th>
                        <th scope="col" colspan="2">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr><td align="center" colspan="4"><img src="facade/img/loading2.gif"></tr></td>
                    </tbody>
                  </table> 
                </div>
              </div>

              <!-- Basic Card Example -->
              <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Items de Categorías</h6>

                </div>
                <div class="card-body">
                  <div id="descItems">Seleccione una categoría para comenzar.</div>
                  <table class="table table-bordered" id="tablaItems">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col" colspan="2">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr><td align="center" colspan="4"><img src="facade/img/loading2.gif"></tr></td>
                    </tbody>
                  </table> 

                </div>
              </div>

            </div>

            <div class="col-lg-5">

              <!-- Dropdown Card Example -->
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Jornadas</h6>
                  <div class="dropdown no-arrow">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      
                      <button type="button" class="btn btn-secondary btn-sm"><i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i> Opciones</button>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                      <div class="dropdown-header">Opciones:</div>
                      <a class="dropdown-item" id="btnAddNewJornada">Añadir Nueva Jornada</a>
                    </div>
                  </div>
                </div>
                <!-- Card Body -->
                  <table class="table table-bordered" id="tablaJornadas">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col" colspan="3">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td align="center" colspan="4"><img src="facade/img/loading2.gif"></tr></td>
                    </tbody>
                  </table>                
              </div>


              <!-- Dropdown Card Example -->
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Ciclo</h6>
                  <div class="dropdown no-arrow">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      
                      <button type="button" class="btn btn-secondary btn-sm"><i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i> Opciones</button>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                      <div class="dropdown-header">Opciones:</div>
                      <a class="dropdown-item" id="btnAddNewCiclo">Añadir Nueva Ciclo</a>
                    </div>
                  </div>
                </div>
                <!-- Card Body -->
                  <table class="table table-bordered" id="tablaCiclos">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col" colspan="3">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td align="center" colspan="4"><img src="facade/img/loading2.gif"></tr></td>
                    </tbody>
                  </table>                
              </div>


              <!-- Dropdown Card Example -->
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Areas</h6>
                  <div class="dropdown no-arrow">
                    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      
                      <button type="button" class="btn btn-secondary btn-sm"><i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i> Opciones</button>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                      <div class="dropdown-header">Opciones:</div>
                      <a class="dropdown-item" id="btnAddNewArea">Añadir Nueva Área</a>
                    </div>
                  </div>
                </div>
                <!-- Card Body -->
                  <table class="table table-bordered" id="tablaAreas">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col" colspan="3">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr><td align="center" colspan="4"><img src="facade/img/loading2.gif"></tr></td>
                    </tbody>
                  </table>                
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
            <span>Copyright &copy; Your Website 2019</span>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>

  <!-- Logout Modal-->
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

  <!-- Bootstrap core JavaScript-->
  <script src="facade/vendor/jquery/jquery.min.js"></script>
  <script src="framework/jquery_ui/jquery-ui.js"></script>

  <script src="facade/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Core plugin JavaScript-->
  <script src="facade/vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="facade/js/sb-admin-2.min.js"></script>

  <script src="transaction/mantenedores/ajustes.js"></script>
</body>

</html>
