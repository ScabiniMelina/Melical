<?php
  $msg="";
  if(isset($_POST["boton"])){
    $msg="funciono";
    include("connection.php");
    $dni = $_POST['dni']; 
    $numTramite = $_POST['NumTramite']
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $fechaNacimieto = $_POST['fechaNacimiento'];
    $direccion = $_POST['direccion'];
    $direccionN = $_POST['direccionN'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $contrasena = $_POST['contrasena'];

    $limiteCaracteres=30;

    if(!is_numeric($dni)){
      $msg = "el dni invalido";
    }else{
      if(mb_strlen($string)>$limiteCaracteres;){
        $msg="A superado el limite de caracteres"
      }
    }

    if(!is_numeric($numTramite)){
      $msg = "el numero de tramite invalido";
    }else{
      if(mb_strlen($string)>$limiteCaracteres;){
        $msg="A superado el limite de caracteres"
      }
    }

    if(!is_string($nombre)){
      $msg = "el nombre es invalido";
    }else{
      if(mb_strlen($string)>$limiteCaracteres;){
        $msg="A superado el limite de caracteres"
      }
    }

    if(!is_string($apellido)){
      $msg = "el apellido es invalido";
    }else{
      if(mb_strlen($string)>$limiteCaracteres;){
        $msg="A superado el limite de caracteres"
      }
    }

    //fecha

    if(!is_string($direccion)){
      $msg = "el direccion es invalido";
    }else{
      if(mb_strlen($string)>$limiteCaracteres;){
        $msg="A superado el limite de caracteres"
      }
    }

    if(!is_numeric($direccionN)){
      $msg = "el direccionN es invalido";
    }else{
      if(mb_strlen($string)>$limiteCaracteres;){
        $msg="A superado el limite de caracteres"
      }
    }

    if(!is_numeric($telefono)){
      $msg = "el telefono es invalido";
    }else{
      if(mb_strlen($string)>$limiteCaracteres;){
        $msg="A superado el limite de caracteres"
      }
    }

    //email

    if(!is_numeric($contrasena)){
      $msg = "el contrasena es invalido";
    }else{
      if(mb_strlen($string)>$limiteCaracteres;){
        $msg="A superado el limite de caracteres"
      }
    }



       // verificacion de que el email no se repite
       $sql = "SELECT Email FROM PERSONAL_INFORMATION WHERE  email= $email";
       $RESULTADO = $connection->query($sql);

       if($RESULTADO->num_rows > 0){
         echo 'Ha isgresado un email ya prexsistente, modifiquelo y presione nuevamente el boton' 
       }else{

      // agregar o modificar los datos faltantes de la base de datos en el insert

       $sql = "INSERT INTO `PERSONAL_INFORMATION`('ID_DNI',`dni`,'tramit_nume', `name`, `surname`, `date_birth`, `phone`,'email', 'address','address_number','PK_ID_LOCATION ') VALUES ('$dni','$dni','$numTramite','$nombre','$apellido','$fechaNacimieto','$telefono','$email','$direccion','$direccionN','$dni')";
       if (mysqli_query($connection , $sql)) {
           echo "Funciona";
       } else {
           echo "Error: " . $sql . "<br>" . mysqli_error($connection);
       }
       mysqli_close($connection);

       }
                     
  }
  echo `
    <div class="alert fade m-2 alert-dismissible fade show align-content-sm-between" data-id="0" role="alert">
    <div class="d-flex">
      <i class=' fs-3 pe-2 bx '></i>
      <span>'$msg'</span>
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;
?>

<!DOCTYPE html>
<html>

<head>
  <title></title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  
  <!-- Bootstrap CSS -->
  <link href="../bootstrap-5.0.1-dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../css/estilos.css">
  
  <!-- icons CDN Link -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
  <div class="container-fluid p-0 vh-100 justify-content-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill="#063f5a" fill-opacity="1"
      d="M0,160L40,138.7C80,117,160,75,240,58.7C320,43,400,53,480,96C560,139,640,213,720,245.3C800,277,880,267,960,250.7C1040,235,1120,213,1200,218.7C1280,224,1360,256,1400,272L1440,288L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z">
    </path>
    </svg>
    <div class="container">
      <h1 class="display-3 fuente-color-primary  mb-0">Bienvenido a Melical Atention! </h1>
      <h4 class="text-muted fs-5 fw-lighter lead" >Completa el registro para crear tu cuenta.</h4>
      
      <form class="row g-3 pb-3 pt-4" id="formularioRegistro" method="POST">
        <div class="col-12 col-sm-6">
          <label for="inputDni4" class="form-label">Dni</label>
          <input type="number" name="dni" required  class="form-control">
        </div>
        <div class="col-12 col-sm-6">
        <label for="inputDni4" class="form-label">Cuil</label>
        <input type="number" name="NumTramite" required  class="form-control">
        </div>
        <div class="col-6">
          <label for="inputDni4" class="form-label">Nombre</label>
          <input type="text" class="form-control"  name="nombre" required pattern="[a-z]{1,30}" title="Debe ingresar letras minusculas" >
        </div>
        
        <div class="col-6">
          <label for="inputDni4" class="form-label">Apellido</label>
          <input type="text" class="form-control" name="apellido" required pattern="[a-z]{1,30}" title="Debe ingresar letras minusculas" >
        </div>
        
        <div class="col-12 col-sm-6">
          <label for="inputTelefono" class="form-label">Fecha de nacimiento</label>
          <input type="date" class="form-control" name="fechaNacimiento" required >
        </div>
           
        <div class="col-12 col-sm-6">
          <label for="inputTelefono" class="form-label">Teléfono</label>
          <input type="number" class="form-control" name="telefono" required>
        </div>
           
        
        <div class="col-6">
          <label for="inputDireccion" class="form-label">Dirección</label>
          <input type="text" class="form-control" name="direccion" required pattern="[a-z]{1,30}" title="Debe ingresar letras minusculas">
        </div>
        
        <div class="col-6">
          <label for="inputDireccionN" class="form-label">Nº</label>
          <input type="number" class="form-control" name="direccionN" required>
        </div>
        
        <div class="col-12 col-sm-6">
          <label for="inputDni4" class="form-label">Correo Eléctronico</label>
          <input type="email" class="form-control"  name="email" required>
        </div>
        <div class="col-12 col-sm-6">
          <label class="form-label">Contraseña</label>
          <div class="d-flex h-auto">
            <input id="txtPassword" type="Password" class="form-control d-block" name="contrasena" required>
            <button id="show_password" class="btn btn-primary" type="button"> <span class="fa fa-eye-slash icon"></span></button>
          </div>
        </div>
        
        <div class="col-12 pt-3">  
          <button class="btn btn-primary text-align-center" id="botonRegistro"role="button" type="submit" name="boton" value="generar">Registrarse</button>
            <div class="row mt-2">
              <span> ¿Ya tienes cuenta?<a class="ps-2" type="button" href="login.html" style="text-decoration:none;"> Inicia sesión aquí</a></span> 
            </div>
        </div>
      </form>
    </div>
    
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 280" preserveAspectRatio="none"><path fill="#063f5a" fill-opacity="1" 
      d="M0,96L48,122.7C96,149,192,203,288,197.3C384,192,480,128,576,128C672,128,768,192,864,197.3C960,203,1056,149,1152,
      138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,
      320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
  </div>
  <script src="../js/registro.js"></script>
</body>

</html>



