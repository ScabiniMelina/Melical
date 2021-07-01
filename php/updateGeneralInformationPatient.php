<?php
  include("conexion.php");
  $idDni = $_POST ['idDniPatient'];
  $dni = $_POST['dniPatient']; 
  $name = $_POST['namePatient'];
  $surname = $_POST['surnamePatient'];
  $gender = $_POST['genderPatient'];
  $dateBirth = $_POST['dateBirthPatient'];
  $phone = $_POST['phonePatient'];
  $email = $_POST['emailPatient'];
  $address = $_POST['adressPatient'];
  $direccionN = $_POST['adressNumberPatient'];
  $location = $_POST['locationPatient'];
  $sql = "UPDATE `PERSONAL_INFORMATION` SET `dni`='$dni',`name`='$name',`surname`='$surname',`gender`='$gender',`date_birth`='$dateBirth',`phone`='$phone',`email`='$email',`address`='$address',`PK_ID_LOCATION`='$location' WHERE `ID_DNI`='$idDni'";

  if (mysqli_query($connection , $sql)) {
    echo "Funciona";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }
  
  $connection->close();
?>