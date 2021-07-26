<?php
  include("./../connection.php");
  $cuil = $_POST['patientCuil'];
  $dni = $_POST['patientDni']; 
  $name = $_POST['patientName'];
  $surname = $_POST['patientSurname'];
  $gender = $_POST['patientGender'];
  $dateBirth = $_POST['patientDateBirth'];
  $phone = $_POST['patientPhone'];
  $email = $_POST['patientEmail'];
  $address = $_POST['patientAddress'];
  $addressN = $_POST['patientAddressNumber'];
  $location = $_POST['patientLocation'];
  $idDni = $_POST['patietnIdDni'];
  $sql = "UPDATE `PERSONAL_INFORMATION` SET `tramit_nume`= '$cuil',`dni`='$dni',`name`='$name',`surname`='$surname',`gender`='$gender',`date_birth`='$dateBirth',`phone`='$phone',`email`='$email',`address`='$address',`address_number`=$addressN,`PK_ID_LOCATION`='$location' WHERE `ID_DNI`='$idDni'";
  if (mysqli_query($connection , $sql)) {
    echo "Funciona";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }
  $connection->close();
