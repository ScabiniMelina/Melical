<?php
  include("connection.php");
  $cuil = $_POST['patientCuil'];
  $dni = $_POST['patientDni']; 
  $name = $_POST['patientName'];
  $surname = $_POST['patientSurname'];
  $gender = $_POST['patientGender'];
  $dateBirth = $_POST['patientDateBirth'];
  $phone = $_POST['patientPhone'];
  $email = $_POST['patientEmail'];
  $address = $_POST['patientAddress'];
  $addressNumber = $_POST['patientAddressNumber'];
  $location = $_POST['patientLocation'];
  $date = date('YmdHis');
  echo $date;
  
  $idDni = md5($date);
  echo $idDni;
  $sql = "INSERT INTO `PERSONAL_INFORMATION`(`ID_DNI`,`tramit_nume`,`dni`, `name`, `surname`, `gender`, `date_birth`, `phone`, `email`, `address`,`address_number`,`PK_ID_LOCATION`) VALUES ('$idDni','$cuil','$dni','$name','$surname','$gender','$dateBirth','$phone','$email','$address','$addressNumber','$location')";
  if (mysqli_query($connection , $sql)) {
    $msg = "Se registro el usuario correctamente";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }
  // $id_dni = mysqli_insert_id($connection);
  $alertType = 'error';
  $json = ['patientIdDni' => $id_dni, 'alert'=> ['msg' => $msg, 'type' => $alertType]] ;

  json_encode($json);
  $connection->close();
?>