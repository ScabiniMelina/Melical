  <!--   Esto va en el menu.js
    document.getElementById("registro").addEventListener("click",()=>{
    fetch("Registro.php")
    .then(response => response.text())
    .then(data =>  console.log = html);
  }) -->

  <!-- MELINA AYUDAAAAA

  let  registro = document.getElementById('registro');
let  R = document.getElementById('R');

R.addEventListener('click',()=>{
    //Agarra los datos de un formulario y los convierte en un objeto, name del input => valor que contiene el input 
    const datosForm = new FormData(registro);
    //Acceder al contenido del input que tiene el name dni
    console.log(datosForm.get('dni'))
    console.log(datosForm.get('nombre'))
    console.log(datosForm.get('apellido'))
    console.log(datosForm.get('direccion'))
    console.log(datosForm.get('n'))
    console.log(datosForm.get('fecha'))
    console.log(datosForm.get('tel'))
    console.log(datosForm.get('email'))
    console.log(datosForm.get('contrasena'))
    //Devuelve una promesa  que nos da  una respuesta
    fetch('php/enviarBd.php',//Lugar a enviar los datos
    {
        method: 'POST', //Método a usar
        body: datosForm, //Contenido a enviar
    })
    .then(respuesta => respuesta.text())
    .then(data => alert(data))

})

-->

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

                <label for="uname"><b>DNI:</b> </label>
                <div>
                    <input type="number" id="dni" name="dni" required >  
                </div>

                <br>

                <label for="uname"><b>Nombre:</b> </label>
                <div>
                    <input type="text" id="nombre" name="nombre" required pattern="[a-z]{1,30}" title="Debe ingresar letras en minuscula" >    
                </div>

                <br>

                <label for="uname"><b>Apellido:</b> </label>
                <div>
                    <input type="text" id="apellido" name="apellido" required pattern="[a-z]{1,30}" title="Debe ingresar letras en minuscula" >
                </div>

                <br>

                <label for="uname"><b>Dirección:</b> </label>
                <div>
                    <input type="text" id="direccion" name="direccion" required pattern="[a-z]{1,30}" title="Debe ingresar letras en minuscula" > 
                </div>

                <br>

                <label for="uname"><b>Nº:</b> </label>
                <div>
                    <input type="number" id="n" name="n" required > 
                </div>

                <br>

                <label for="uname"><b>Fecha de Nacimiento:</b> </label>
                <div>
                    <input type="date" id="fecha" name="fecha" required  >  
                </div>

                <br>

                <label for="uname"><b>Teléfono:</b> </label>
                <div>
                    <input type="number" id="tel" name="tel" required  pattern="[0-9]" title="Debe ingresar caracteres numéricos">  
                </div>

                <br>

                <label for="uname"><b>Correo Electrónico:</b> </label>
                <div>
                    <input type="email" id="email" name="email" required>
                </div>

                <br>

                <label for="uname"><b>Contraseña:</b> </label>
                <div>
                    <input type="password" id="contrasena" name="contrasena" required  pattern="[a-z]{6,20}" title="No cumple los parametros">
                    <span class="validity"></span>
                    <p>*La contraseña debe estar en minúsculas y tener entre 6 y 20 caracteres.</p>
                </div>

                <br>

                <div>
                    <button id="R">Registrarse</button>
                    <!-- No se a que pagina se tiene que re direccionar -->
                </div>

                <p>¿Ya tienes cuenta?<span><a href="login.php">Ingrese aquí</a> </span></p>

            </form>

        </div>

    </body>

</html>
