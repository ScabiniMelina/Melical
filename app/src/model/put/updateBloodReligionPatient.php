<?php
  include("./../connection.php");
  $idDni = $_POST['patientIdDni']; 
  $religion = $_POST['patientReligion'];
  $blood= $_POST['$patientBlood'];
  $sql = "UPDATE `PERSONAL_INFORMATION` SET `PK_ID_BLOOD_TYPE` = '$blood',`PK_ID_RELIGION` = '$religion' WHERE `PK_ID_DNI` = '$idDni' ";
  if (mysqli_query($connection , $sql)) {
    echo "Funciona";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }
  $id_dni = mysqli_insert_id($connection);
  echo $id_dni;
  $connection->close();
