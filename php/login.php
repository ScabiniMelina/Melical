<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap CSS -->
    <link href="bootstrap-5.0.1-dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">

    <link rel="stylesheet" href="normalize.css">
    <link rel="stylesheet" href="styles.css">
    <title>Login con fetch</title>
</head>
<body>
    <div class="container bg-danger">
        <div class="container-login">
            <h1>¡Hola!</h1>
            <p>Inicia sesión para ser parte de la organización de tu centro medico</p>
            <form action="" id="loginForm">
                <input type="number" name="usuario" id="usuario" placeholder="Dni, Telefono, Email" required>
                <input type="password" name="contrasena" id="contrasena" placeholder="contraseña" required>
            </form>
        
            <div class="options"> 
                <label> 
                <input type="checkbox" name="" id=""> Recordar contraseña <label>
                <p>¿No tienes cuenta?<span> Regístrate ahora</span></p>
            </div>
            <button id="loginButton">Iniciar Sesión</button>
        </div>
    </div>
    <!-- JavaScript Bundle with Popper -->
    <script src="bootstrap-5.0.1-dist/js/bootstrap.min.js" integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4" crossorigin="anonymous"></script>
    <script src="main.js"></script>
</body>
</html>