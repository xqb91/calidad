<?php

?>
<!DOCTYPE html>
<html lang="es">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <input type="hidden" name="irql" id="irql" value="<?php echo $_GET["ejecutivo"]; ?>" />

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

        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


          <!-- Topbar Navbar -->
          <ul class="navbar-nav ml-auto">


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
              <!-- Dropdown - User Information -->
              <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="#">
                  <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </a>
                <a class="dropdown-item" href="#">
                  <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  Settings
                </a>
                <a class="dropdown-item" href="#">
                  <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                  Activity Log
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                  <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>

          </ul>

        </nav>
        <!-- End of Topbar -->

        <!-- Begin Page Content -->
        <div class="container-fluid">

          <div class="row">

            <div class="col-lg-7">

              <!-- Default Card Example -->


              <!-- Basic Card Example -->


              <div class="card mb-4">
                <div class="card-header py-3">
                  <strong>Ingreso de Evaluación</strong>
                </div>
                <div class="card-body">

                  <table class="table table-sm">
                    <thead>
                      <tr>
                        <th scope="col">Categoría</th>
                        <th scope="col">Item</th>
                        <th scope="col">No Aplica</th>
                        <th scope="col">0.0</th>
                        <th scope="col">0.5</th>
                        <th scope="col">1.0</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td></td>
                        <td><div class="form-check"><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked><label class="form-check-label" for="exampleRadios1"></label></div></td>
                        <td><div class="form-check"><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked><label class="form-check-label" for="exampleRadios1"></label></div></td>
                        <td><div class="form-check"><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked><label class="form-check-label" for="exampleRadios1"></label></div></td>
                        <td><div class="form-check"><input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked><label class="form-check-label" for="exampleRadios1"></label></div></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            <div class="col-lg-5">
              <div class="card shadow mb-4">
                <!-- Card Header - Dropdown -->
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Carga Audio</h6>
                </div>
                <!-- Card Body -->
                <div class="card-body" id="frmCargaAudio">
                  <div class="input-group input-group-sm mb-3">
                  <div class="custom-file">
                    <input type="file" class="form-control-file" id="fileAudio">
                  </div>
                </div>
                <!-- barra de carga de archivo -->
                <div class="progress" id="barraCargaAudio">
                  <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" id="valBarraCargaAudio">25%</div>
                </div>
                <!-- fin de barra de carga de archivo -->
              </div>
              <!--- MOSTRAR ARCHIVOS CARGADOS -->
              <div class="card" id="infoAudioCargado">
                <div class="card-body">
                  <div class="dropdown">
                  <p id="infoFileAudio">Texto.</p>
                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                      <a id="btnDownloadAudio" href="#" target="_blank"><button type="button" class="btn btn-primary" id="btnDownloadAudio"><i class="far fa-save"></i> Descargar Audio</button></a>
                      <button type="button" class="btn btn-danger" id="btnDeleteAudio"><i class="fas fa-trash-alt"></i> Eliminar Audio</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>


              <div class="card shadow mb-4">
                <!-- Card Header - Accordion -->
                <a href="#collapseCardExample" class="d-block card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Adjuntos</h6>
                </a>
                <!-- Card Content - Collapse -->
                <div class="collapse show" id="collapseCardExample">
                  <div class="card-body">
                  <div class="input-group input-group-sm mb-3">
                    <input type="file" class="form-control-file" id="fileadjuntos">
                  </div>
                  </div>
                  <div class="progress" id="barraCargaAdjuntos">
                    <div class="progress-bar" id="valBarraCargaAdjuntos" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                  </div>
                  <table class="table" id="tablaArchivosAdjuntados">
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Peso</th>
                        <th scope="col">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td><button type="button" class="btn btn-sm btn-danger"><i class="fas fa-trash-alt"></i> Eliminar</button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="card shadow mb-4">
                <div class="card-header py-3">
                  <h6 class="m-0 font-weight-bold text-primary">Observación de la interacción telefónica</h6>
                </div>
                <div class="card-body">
                  <div id="editor">
                  </div>
                </div>
              </div>

              <!-- Collapsable Card Example -->
           <!-- Dropdown Card Example -->


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
<div class="modal fade bd-example-modal-xl" id="modalEditor" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document" id="modalEditorConfig">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEditorTitle">Modal title</h5>
        <button type="button" id="modalEditorCerrarVentana" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="modalEditorContenido">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" id="modalEditorBtnCerrar" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
        <button type="button" id="modalEditorBtnAccion" class="btn btn-primary btn-sm">Save changes</button>
      </div>
    </div>
  </div>
</div>

  <!-- Bootstrap core JavaScript-->
  <script src="facade/vendor/jquery/jquery.min.js"></script>
  <script src="facade/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Core plugin JavaScript-->
  <script src="facade/vendor/jquery-easing/jquery.easing.min.js"></script>
  <!-- CKEditor -->
  <script src="framework/ckeditor/ckeditor.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="facade/js/sb-admin-2.min.js"></script>
  <script src="transaction/editorTransaction.js"></script>


</body>

</html>
