<?php
session_start();
session_unset($_SESSION['cuil']);
session_destroy();
header("location: ../view/pages/authentication/login.php");
// echo "cerrarSesion";
