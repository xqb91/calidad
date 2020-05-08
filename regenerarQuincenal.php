<?php
  if(isset($_GET["ejecutivo"]) && isset($_GET["area"])) {
    $irqljob  = filter_input(INPUT_GET, ("ejecutivo"));
    $irqlarea = filter_input(INPUT_GET, ("area"));
  }else{
    $irqljob  = "";
    $irqlarea = "";
  }
?>

<!DOCTYPE html>
<html lang="es">

<head>
  <input type="hidden" name="irqljob" id="irqljob" value="<?php echo $irqljob; ?>">
  <input type="hidden" name="irqlarea" id="irqlarea" value="<?php echo $irqlarea; ?>">
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


    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">

      <!-- Main Content -->
      <div id="content">

        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">

          <!-- Page Heading -->
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">  </h1>
          </div>

          <div class="row">

            <div class="col-lg-12">

              <!-- Default Card Example -->
              <div class="card mb-8">
                <div class="card-header" id="txtTitlePantallaUsuario">
                  Generación Manual de Evaluaciones Quincenales
                </div>
                <div class="card-body" id="txtPantallaUsuario">
                  Seleccione las evaluaciones parciales generadas para genera la nueva evaluación quincenal manual.
                  <table class="table table-sm" id="tablaListadoEvaluaciones">
                    <thead>
                      <tr>
                        <th scope="col" width="3%"></th>
                        <th scope="col">Evaluación Parcial</th>
                        <th scope="col">Fecha de Creación</th>
                        <th scope="col">Nota</th>
                      </tr>
                    </thead>
                    <tbody>

                    </tbody>
                  </table>
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

  <!-- Core plugin JavaScript-->
  <script src="facade/vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="facade/js/sb-admin-2.min.js"></script>
  <script src="transaction/regenerarQuincenalTransaction.js"></script>
</body>

</html>
