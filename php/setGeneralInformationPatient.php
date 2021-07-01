<?php
  include("conexion.php");
  $dni = $_POST['dniPatient']; 
  $name = $_POST['namePatient'];
  $surname = $_POST['surnamePatient'];
  $gender = $_POST['genderPatient'];
  $dateBirth = $_POST['dateBirthPatient'];
  $phone = $_POST['phonePatient'];
  $email = $_POST['emailPatient'];
  $address = $_POST['addressPatient'];
  $addresN = $_POST['addressNumberPatient'];
  $location = $_POST['locationPatient'];
  $sql = "INSERT INTO `PERSONAL_INFORMATION`(`ID_DNI`,`dni`, `name`, `surname`, `gender`, `date_birth`, `phone`, `email`, `address`, `PK_ID_LOCATION`) VALUES ('$dni','$dni','$name','$surname','$gender','$dateBirth','$phone','$email','$address','$location')";
  if (mysqli_query($connection , $sql)) {
    echo "Funciona";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }
  $id_dni = mysqli_insert_id($connection);
  echo $id_dni;
  $connection->close();
?>