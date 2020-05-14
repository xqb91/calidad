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

  $ejecutivo = filter_input(INPUT_GET, "ejecutivo");
?>
<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">

  <title>SB Admin 2 - Forgot Password</title>

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
              <div class="col-lg-5 d-none d-lg-block bg-register-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-2">Guauuu!!, Pero cuanta eficiencia!</h1>
                    <p class="mb-4">Este ejecutivo ya tiene todas sus evaluaciones parciales listas, por lo tanto puedes continuar evaluando a otro cerrando esta ventana o bien...</p>
                  </div>
                  <hr>
                  <div class="text-center">
                    <a class="small" href="parcialHomeDet.php?ejecutivo=<?php echo $ejecutivo; ?>"><i class="far fa-edit"></i> Revisar sus evaluaciones parciales en este periodo</a>
                  </div>
                  <div class="text-center">
                    <a class="small" href="login.html"><i class="far fa-calendar-check"></i> Revisar su evaluación quincenal en este periodo</a>
                  </div>
                  <div class="text-center">
                    <a class="small" href="login.html"><i class="fas fa-flag"></i> Revisar su evaluación final en este periodo</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>



  <!-- Bootstrap core JavaScript-->

  <!-- Core plugin JavaScript-->
  <script src="facade/vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="facade/js/sb-admin-2.min.js"></script>

</body>

</html>
