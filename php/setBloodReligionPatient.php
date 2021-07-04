<?php
  include("connection.php");
  $idDni = $_POST['patientIdDni']; 
  $religion = $_POST['patientReligion'];
  $blood = $_POST['$patientBlood'];
  $sql = "INSERT INTO `PERSONAL_INFORMATION`( `PK_ID_DNI`,`PK_ID_BLOOD_TYPE`,`PK_ID_RELIGION`) VALUES ('$idDni','$blood'','$religion')";
  if (mysqli_query($connection , $sql)) {
    echo "Funciona";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }
  $id_dni = mysqli_insert_id($connection);
  echo $id_dni;
  $connection->close();
?>