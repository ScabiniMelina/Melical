<?php
include("./../connection.php");
$dni = $_POST['tramitNumber'];
$cuil = $_POST['cuilFirstCharacters'] . $_POST['tramitNumber'] . $_POST['cuilLastCharacters'];
$name = $_POST['name'];
$surname = $_POST['surname'];
$dateBirth = $_POST['dateBirth'];
$gender = setSelectValue($_POST['gender']);
$phone = $_POST['phone'];
$email = $_POST['email'];
$address = $_POST['address'];
$addressNumber = $_POST['addressNumber'];
$email = $_POST['email'];
$password = $_POST['password'];
$id = getMd5Id("PERSONAL_INFORMATION", "ID_DNI");
//Revisa si ya hay un registro con los datos del paciente registrado;
$sql = "SELECT COUNT(*) AS numberOfMatches FROM `PERSONAL_INFORMATION` WHERE `tramit_nume` = ?";
$typeOfParameters = "i";
$parameters = array($cuil);
$result = getPreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
setMessageOfDuplicateRecord($data, 'usuario');
$sql = "INSERT INTO `PERSONAL_INFORMATION`( `ID_DNI`,`dni`,`tramit_nume`,`name`,`surname`,`gender`,`date_Birth`,`phone`,`email`,`address`,`address_number`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
$typeOfParameters = "siissssissi";
$parameters = array($id, $dni, $cuil, $name, $surname, $gender, $dateBirth, $phone, $email, $address, $addressNumber);
$result = getPreparedStatement($sql, $typeOfParameters, $parameters);
sendJson(null, $msg, $id, null, null);

// $msg = "";
// if (isset($_POST["boton"])) {
//     $msg = "funciono";
//     include("./../connection.php");
//     $dni = $_POST['dni'];
//     $numTramite = $_POST['NumTramite'];
//     $nombre = $_POST['nombre'];
//     $apellido = $_POST['apellido'];
//     $fechaNacimieto = $_POST['fechaNacimiento'];
//     $direccion = $_POST['direccion'];
//     $direccionN = $_POST['direccionN'];
//     $telefono = $_POST['telefono'];
//     $email = $_POST['email'];
//     $contrasena = $_POST['contrasena'];

//     $limiteCaracteres = 30;

//     if (!is_numeric($dni)) {
//         $msg = "el dni invalido";
//     } else {
//         if (mb_strlen($string) > $limiteCaracteres) {
//             $msg = "A superado el limite de caracteres";
//         }
//     }

//     if (!is_numeric($numTramite)) {
//         $msg = "el numero de tramite invalido";
//     } else {
//         if (mb_strlen($string) > $limiteCaracteres) {
//             $msg = "A superado el limite de caracteres";
//         }
//     }

//     if (!is_string($nombre)) {
//         $msg = "el nombre es invalido";
//     } else {
//         if (mb_strlen($string) > $limiteCaracteres) {
//             $msg = "A superado el limite de caracteres";
//         }
//     }

//     if (!is_string($apellido)) {
//         $msg = "el apellido es invalido";
//     } else {
//         if (mb_strlen($string) > $limiteCaracteres) {
//             $msg = "A superado el limite de caracteres";
//         }
//     }

//     //fecha

//     if (!is_string($direccion)) {
//         $msg = "el direccion es invalido";
//     } else {
//         if (mb_strlen($string) > $limiteCaracteres) {
//             $msg = "A superado el limite de caracteres";
//         }
//     }

//     if (!is_numeric($direccionN)) {
//         $msg = "el direccionN es invalido";
//     } else {
//         if (mb_strlen($string) > $limiteCaracteres) {
//             $msg = "A superado el limite de caracteres";
//         }
//     }

//     if (!is_numeric($telefono)) {
//         $msg = "el telefono es invalido";
//     } else {
//         if (mb_strlen($string) > $limiteCaracteres) {
//             $msg = "A superado el limite de caracteres";
//         }
//     }

//     //email

//     if (!is_numeric($contrasena)) {
//         $msg = "el contrasena es invalido";
//     } else {
//         if (mb_strlen($string) > $limiteCaracteres) {
//             $msg = "A superado el limite de caracteres";
//         }
//     }



//     // verificacion de que el email no se repite
//     $sql = "SELECT Email FROM PERSONAL_INFORMATION WHERE  email= $email";
//     $RESULTADO = $connection->query($sql);

//     if ($RESULTADO->num_rows > 0) {
//         echo 'Ha isgresado un email ya prexsistente, modifiquelo y presione nuevamente el boton';
//     } else {

//         // agregar o modificar los datos faltantes de la base de datos en el insert

//         $sql = "INSERT INTO `PERSONAL_INFORMATION`('ID_DNI',`dni`,'tramit_nume', `name`, `surname`, `date_birth`, `phone`,'email', 'address','address_number','PK_ID_LOCATION ') VALUES ('$dni','$dni','$numTramite','$nombre','$apellido','$fechaNacimieto','$telefono','$email','$direccion','$direccionN','$dni')";
//         if (mysqli_query($connection, $sql)) {
//             echo "Funciona";
//         } else {
//             echo "Error: " . $sql . "<br>" . mysqli_error($connection);
//         }
//         mysqli_close($connection);
//     }
// }
