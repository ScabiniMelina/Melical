<?php

include("./../connection.php");
$dni = getInputValue($_POST['tramitNumber'], ' El dni', 8, 'integer', 8);
$cuilFirstCharacters = getInputValue($_POST['cuilFirstCharacters'], 'La primera parte del  CUIL', 2, 'integer', 2);
$cuilLastCharacters = getInputValue($_POST['cuilLastCharacters'], 'La ultima parte del  CUIL', 1, 'integer', 1);
$cuil = $cuilFirstCharacters . $dni . $cuilLastCharacters;
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
$id = getMd5Id("Personal_Information", "ID_DNI");
$id2 = getMd5Id("User", "ID_USER");
//Revisa si ya hay un registro con los datos del paciente registrado;
$sql = "SELECT COUNT(*) AS numberOfMatches FROM `Personal_Information` WHERE `cuil` = ?";
$typeOfParameters = "i";
$parameters = array($cuil);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
setMessageOfDuplicateRecord($data, 'usuario');

$sql = "INSERT INTO `Personal_Information`(`ID_DNI`, `DNI`, `cuil`, `name`, `surname`, `gender`, `date_birth`, `phone`, `email`, `adress`, `adress_number`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
$typeOfParameters = "siissisissi";
$parameters = array($id, $dni, $cuil, $name, $surname, $gender, $dateBirth, $phone, $email, $address, $addressNumber);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
sendJson(null, $msg, $id, null, null);

$sql = "INSERT INTO `User` (`ID_USER`, `PK_dni`, `password`) VALUES (?,?,?)";
$typeOfParameters = "sss";
$parameters = array($id2, $id, $password);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
header('../view/pages/authentication/login.php');
?>