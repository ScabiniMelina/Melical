<!DOCTYPE html>
<html>

<head>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <?php include('../../modules/header.php'); ?>

  <!-- ICON -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


</head>

<body>
  <div class="container-fluid p-0 vh-100 justify-content-center">
    <div id="alertContainer" class="m-2">
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill="#063f5a" fill-opacity="1" d="M0,160L40,138.7C80,117,160,75,240,58.7C320,43,400,53,480,96C560,139,640,213,720,245.3C800,277,880,267,960,250.7C1040,235,1120,213,1200,218.7C1280,224,1360,256,1400,272L1440,288L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z">
      </path>
    </svg>
    <div class="container">
      <h1 class="display-3 fuente-color-primary  mb-0">Bienvenido a Melical Atention! </h1>
      <h4 class="text-muted fs-5 lead">Completa el registro para crear tu cuenta.</h4>

      <form class="row g-3 pb-3 pt-4 needs-validation" novalidate id="formularioRegistro">
        <div class="col-12 col-sm-6">
          <!--<label for="inputDni4" class="form-label">Cuil</label>
          <input type="number" name="NumTramite" required class="form-control">-->
          <label for="inputDni4" class="form-label">Cuil</label>

          <div class="input-group">
            <input type="number" class="form-control w-25" name="cuilFirstCharacters" aria-label="2 digitos" required>

            <input type="number" class="form-control w-50" aria-label="Dni" name="tramitNumber" required>

            <input type="number" class="form-control w-25" name='cuilLastCharacters' required>
          </div>
        </div>



        <div class="col-12 col-sm-6">
          <label class="form-label" required>Sexo</label>
          <select name="gender" class="form-select">
            <option value="0">Femenino</option>
            <option value="1">Masculino</option>
            <option value="2">Otro</option>
          </select>
        </div>


        <div class="col-6">
          <label for="inputDni4" class="form-label">Nombre</label>
          <input type="text" class="form-control" name="name" required pattern="[a-z]{1,30}" title="Debe ingresar letras minusculas">
        </div>

        <div class="col-6">
          <label for="inputDni4" class="form-label">Apellido</label>
          <input type="text" class="form-control" name="surname" required pattern="[a-z]{1,30}" title="Debe ingresar letras minusculas">
        </div>

        <div class="col-12 col-sm-6">
          <label for="inputTelefono" class="form-label">Fecha de nacimiento</label>
          <input type="date" class="form-control" name="dateBirth" required>
        </div>

        <div class="col-12 col-sm-6">
          <label for="inputTelefono" class="form-label">Teléfono</label>
          <input type="number" class="form-control .is-invalid" name="phone" required>
        </div>

        <div class="col-12 col-sm-6">
          <label for="inputDireccion" class="form-label">Dirección</label>
          <input type="text" class="form-control" name="address" required pattern="[a-z]{1,30}" title="Debe ingresar letras minusculas">
        </div>

        <div class="col-12 col-sm-6">
          <label for="inputDireccionN" class="form-label">Nº</label>
          <input type="number" class="form-control" name="addressNumber" required>
        </div>

        <div class="col-12 col-sm-6">
          <label for="inputDni4" class="form-label">Correo Eléctronico</label>
          <input type="email" class="form-control" name="email" required>

        </div>

        <div class="col-12 col-sm-6">
          <label class="form-label">Contraseña</label>
          <div class="d-flex h-auto">
            <input id="#passwordInput" type="password" class="form-control d-block" name="password" required>
            <button id="show_password" class="btn btn-primary" type="button"> <span class="fa fa-eye-slash icon"></span></button>
          </div>
        </div>

        <div class="col-12 pt-3">
          <button class="btn btn-primary text-align-center postInformation authentificationForm" role="button" type="submit" data-file="Register" data-redirect="./login.php">Registrarse</button>
          <div class="row mt-2">
            <span> ¿Ya tienes cuenta?<a class="ps-2" type="button" href="./login.php" style="text-decoration:none;"> Inicia sesión aquí</a></span>
          </div>
        </div>
      </form>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 280" preserveAspectRatio="none">
      <path fill="#063f5a" fill-opacity="1" d="M0,96L48,122.7C96,149,192,203,288,197.3C384,192,480,128,576,128C672,128,768,192,864,197.3C960,203,1056,149,1152,
      138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,
      320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
  </div>

  <template id="alertTemplate">
    <div class="alert fade alert-dismissible fade show align-content-sm-between position-absolute w-100 mb-2" data-id="0" role="alert">
      <div class="d-flex">
        <i class=' fs-3 pe-2 bx '></i>
        <span> You should check in on some of those fields below.</span>
      </div>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </template>
  <?php include('../../modules/footer.php'); ?>
</body>

</html>