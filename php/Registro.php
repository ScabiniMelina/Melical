 <!--   Esto va en el menu.js
    document.getElementById("registro").addEventListener("click",()=>{
    fetch("Registro.php")
    .then(response => response.text())
    .then(data =>  console.log = html);
  }) -->

  <!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">

        <title>Registro</title>

    </head>

    <body>

<div class="container">
<form action="" id="registro">

    <div class="row">
        <div class="col-12"><h3>Ingrese los datos solicitados a continuación:</h3></div>
    </div>


    <div class="row">
        <div class="col-12 col-sm-2"><input type="number" name="Dni" id="Dni" placeholder="Dni" required> </div>
        <div class="col-12 col-sm-10"><input type="text" name="fechaNacimiento" id="fechaNacimiento" placeholder="fechaNacimiento" required> </div>
    </div>

    <div class="row">
        <div class="col-12 col-sm-2"><input type="text" name="nombre" id="nombre" placeholder="nombre" required> </div>
        <div class="col-12 col-sm-10"><input type="text" name="apellido" id="apellido" placeholder="apellido" required> </div>
    </div>

    <div class="row">
        <div class="col-12 col-sm-2"><input type="text" name="direccion" id="direccion" placeholder="direccion" required> </div>
        <div class="col-12 col-sm-10"><input type="number" name="n" id="n" placeholder="nº" required> </div>
    </div>

    <div class="row">
        <div class="col-12 col-sm-2"><input type="text" name="correo" id="correo" placeholder="correo" required> </div>
        <div class="col-12 col-sm-10"><input type="text" name="telefono" id="telefono" placeholder="telefono" required> </div>
    </div>

    <div class="row">
    <div class="col-12"><input type="password" name="contrasena" id="contrasena" placeholder="contraseña" required></div>
    </div>

    

    </form>

    <div class="row">
        <div class="col-12 "><button id="RegistroButton"><a href="login.php">Registrarse</a></button> </div>

        <!-- Aca iria en envio de los datos a la base de datos -->
    </div>


    <div class="options"> 
                    <p>¿Ya tienes cuenta?<span><a href="login.php">Ingrese aquí</a> </span></p>
            </div>

</div>
      
    </body>

</html>