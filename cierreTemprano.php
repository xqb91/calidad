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

  if(!isset($_GET["ejecutivo"])) {
    header('Location: finalHome.php');
    exit;
  }

  if(!isset($_SESSION['loginUser'])) {
      header('Location: index.php');
      exit;
  }else{
    $evaluador = $_SESSION['loginUser'];
    if($evaluador->getAdmin() != 1) {
      header('Location: home.php');
      exit;
    } 
  }
?>
<!DOCTYPE html>
<html lang="es">

<head>

  <meta charset="utf-8">
  <input type="hidden" id="irqljob" value="<?php echo $_GET["ejecutivo"]; ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>Sistema De Evaluacion de Calidad</title>

  <!-- Custom fonts for this template-->
  <link href="facade/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet">

  <!-- Custom styles for this template-->
  <link href="facade/css/sb-admin-2.min.css" rel="stylesheet">
    <!-- Custom styles for this page -->
  <link href="facade/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
  
  <!-- Quill Framework -->
  <link href="framework/quill/quill.snow.css" rel="stylesheet">

</head>

<body id="page-top" class="sidebar-toggled">

  <!-- Page Wrapper -->
  <div id="wrapper">



    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">
            

            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle" href="#" id="lblEvaluacionFinal" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="facade/img/loading2.gif" />
              </a>
            </li>

            <!-- Nav Item - Alerts -->
            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle" href="#" id="lblPeriodoEjecutivo" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="facade/img/loading2.gif" />
              </a>
            </li>

            <!-- Nav Item - Messages -->
            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle" href="#" id="lblArea" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="facade/img/loading2.gif" />
              </a>
            </li>

            <div class="topbar-divider d-none d-sm-block"></div>

            <!-- Nav Item - User Information -->
            <li class="nav-item dropdown no-arrow">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2 d-none d-lg-inline text-gray-600 small" id="lblEvaluadorEditor"><img src="facade/img/loading2.gif" /> Identificando...</span>
                <img class="img-profile rounded-circle" src="facade/img/avatar.png">
              </a>
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
              <div class="col-xl-12 col-lg-12"> 
                <div class="card shadow mb-2">
                <!-- Card Header - Dropdown -->
                  <!--<div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary"></h6>
                  </div>-->
                <!-- Card Body -->
                      <table class="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col" style="width: 20%;">Ejecutivo</th> 
                            <th scope="col">Area</th>
                            <th scope="col" id="lblCateg1"><img src="facade/img/loading2.gif" /></th>
                            <th scope="col" id="lblCateg2"><img src="facade/img/loading2.gif" /></th>
                            <th scope="col" id="lblCateg3"><img src="facade/img/loading2.gif" /></th>                            
                            <th scope="col">Nota Final</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row col-9" id="lblNombreEjecutivo">--</th>
                            <td id="lblAreaEjecutivo"><img src="facade/img/loading2.gif" /></td>
                            <td id="lblNotaCateg1"><img src="facade/img/loading2.gif" /></td>
                            <td id="lblNotaCateg2"><img src="facade/img/loading2.gif" /></td>
                            <td id="lblNotaCateg3"><img src="facade/img/loading2.gif" /></td>
                            <td id="lblNotaFinal"><img src="facade/img/loading2.gif" /></td>
                          </tr>
                        </tbody>
                      </table>  
                </div>
              </div>


              <div class="col-xl-12 col-lg-12">
                <div class="card shadow mb-2">
                <!-- Card Header - Dropdown -->
                  <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary">Obervaciones</h6>
                  </div>
                <!-- Card Body -->
                    <div id="editor" style="height: 200px;">
                    </div>

              </div>
            </div>

            <!-- Pie Chart -->

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




  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>



  <!-- Core plugin JavaScript-->
  <script src="facade/vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="facade/js/sb-admin-2.min.js"></script>

  <!-- Framework Quill -->
  <script src="framework/quill/quill.js"></script>
  <script src="transaction/CierreTempranoTransaction.js"></script>

</body>

</html>
