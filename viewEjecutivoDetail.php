<?php 
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
  <input type="hidden" name="irql" id="irql" value="<?php if(isset($_GET["ejecutivo"])) { echo $_GET["ejecutivo"]; } ?>">
</head>

<body id="page-top">

  <!-- Page Wrapper -->
  <div id="wrapper">


    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- Topbar -->
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
          </div>

          <div class="row">

            <div class="col-lg-7">

              <!-- Default Card Example -->
              <div class="card mb-4">
                <div class="card-header" id="titleEvalPar">
                  <strong>Evaluaciones Parciales <img src="facade/img/loading2.gif"></strong>
                  
                </div>
                  <table class="table" id="tablaParciales">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Periodo</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Nota</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
              </div>

            </div>

            <div class="col-lg-5">

              <!-- Dropdown Card Example -->
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Evaluación Quincenal</h6>
                </div>
                <!-- Card Body -->
                <div class="card-body">

                  <div class="row no-gutters">
                    <div class="col-sm-6 col-md-8">
                      
                      <div class="card" style="width: 90%;">
                        <div class="card-body">
                          <h5 class="card-title" id="titleQuincenal">Evaluación Quicenal</h5>
                          <h6 class="card-subtitle mb-2 text-muted" id="fechaQuincenal">Generada el 00/00/0000 <img src="facade/img/loading2.gif"></h6>
                          <a href="#" class="card-link" id="linkQuincenal">Descargar PDF</a>
                        </div>
                      </div>

                    </div>
                    <div class="col-4 col-md-4">
                      <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                        <div class="card-body">
                          <h5 class="card-title" style="text-align: center;">Nota Obtenida</h5>
                          <p class="card-text" style="font-size:35px; text-align:center;" id="notaQuincenal"><strong>7.27 <img src="facade/img/loading2.gif"></strong></p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Collapsable Card Example -->
              <div class="card shadow mb-4">
                <!-- Card Header - Accordion -->
                <a class="d-block card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Evaluación Final</h6>
                </a>
                <!-- Card Content - Collapse -->
                <div class="collapse show" id="collapseCardExample">
                  <div class="card-body">

                    <div class="row no-gutters">
                      <div class="col-sm-6 col-md-8">
                        
                        <div class="card" style="width: 90%;">
                          <div class="card-body">
                            <h5 class="card-title" id="titleFinal">Evaluación Final</h5>
                            <h6 class="card-subtitle mb-2 text-muted" id="fechaFinal">Generada el 00/00/0000  <img src="facade/img/loading2.gif"></h6>
                            <a href="#" class="card-link" id="linkFinal">Descargar PDF</a>
                          </div>
                        </div>

                      </div>
                      <div class="col-6 col-md-4">
                        <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
                          <div class="card-body">
                            <h5 class="card-title" style="text-align: center;">Nota Obtenida</h5>
                            <p class="card-text" style="font-size:35px; text-align:center;" id="notFinal"><strong><img src="facade/img/loading2.gif"></strong></p>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
        <!-- /.container-fluid -->

      </div>
      <!-- End of Main Content -->


    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>

  <!-- Logout Modal-->
  <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
          <a class="btn btn-primary" href="login.html">Logout</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap core JavaScript-->
  <!--<script src="facade/vendor/jquery/jquery.min.js"></script>
  <script src="facade/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>-->

  <!-- Core plugin JavaScript-->
  <script src="facade/vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Transaction Jquery -->
   <script src="Transaction/viewEjecutivoDetailTransaction.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="facade/js/sb-admin-2.min.js"></script>

</body>

</html>
