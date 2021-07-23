<!DOCTYPE html>
<html>

<head>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- Bootstrap CSS -->
  <link href="../../styles/plugins/bootstrap-5.0.1-dist/css/bootstrap.min.css" rel="stylesheet">

  <!-- CSS -->
  <link rel="stylesheet" href="../../styles/css/styles.css">

  <!-- ICON -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>

<body>
  <div class="container-fluid p-0 w-100 vh-100 m-0 justify-content-center overflow-auto">
    <div class="row h-100 align-content-between m-0">

      <div id="wave-container" class="col-12 css-0 p-0 eepbx3x0"><svg class="m-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#063f5a" fill-opacity="1" d="M0,160L40,138.7C80,117,160,75,240,58.7C320,43,400,53,480,96C560,139,640,213,720,245.3C800,277,880,267,960,250.7C1040,235,1120,213,1200,218.7C1280,224,1360,256,1400,272L1440,288L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z">
          </path>
        </svg>
      </div>
      <div class="col-12">

        <div class="container h-auto">

          <h1 class="display-3 fuente-color-primary lead">Hola!</h1>
          <h4 class="text-muted fs-5 lead">Inicia sesión para empezar tu control de salud.</h4>

          <form class="row g-3 pb-3 pt-4" id="formularioRegistro" method="POST">
            <div class="col-12">
              <label for="inputDni4" class="form-label">CUIL</label>
              <input type="number" name="número de trámite" required class="form-control">
            </div>

            <div class="col-12">
              <label class="form-label">Contraseña</label>
              <div class="d-flex h-auto">
                <input id="txtPassword" type="Password" class="form-control d-block" name="contrasena">
                <button id="show_password" class="btn btn-primary" type="button"> <span class="fa fa-eye-slash icon"></span></button>
              </div>
            </div>

            <div id="lower">
              <div class="row row-cols-1 row-cols-sm-2 pt-1 justify-content-between">
                <div class="col text-sm-start">
                  <input type="checkbox"><label class="check p-1 text-nowrap small" for="checkbox">Recordar constraseña</label>
                </div>
                <div class="col text-sm-end">
                  <span><a class="ps-2 text-decoration-none small" type="button" href="reestablecercontr.html"> ¿Olvidaste tu contraseña? </a></span>
                </div>
              </div>
              <div class="col-12 justify-self-center text-sm-start">
                <a href="#" class="btn btn-primary mt-3 text-align-center text-nowrap text-sm-center" id="botonRegistro" role="button">Iniciar sesión</a>

              </div>
            </div>
          </form>

          <div class="row row-cols-1 row-cols-sm-auto pt-1 ">
            <div class="col">
              <span class="text-nowrap small"> ¿Todavía no tienes cuenta?</span>
            </div>
            <div class="col ps-3 p-sm-0">
              <a class="m-0 text-decoration-none small ps-0" href="./register.php"> Regístrate aquí</a>
            </div>
          </div>

        </div>

      </div>

      <div id="wave-container" class=" col-12 css-0 eepbx3x0 p-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#063f5a" fill-opacity="1" d="M0,96L48,122.7C96,149,192,203,288,197.3C384,192,480,128,576,128C672,128,768,192,864,197.3C960,203,1056,149,1152,
          138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,
          320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

    </div>
  </div>
  <script src="../../../controller/passwordButton.js"></script>

</body>

</html>