<?php
  include("./../connection.php");
  $dni = $_POST['dni']; 
  $cuil = $_POST['tramitNumber'];
  $name = $_POST['name'];
  $surname = $_POST['surname'];
  $dateBirth = $_POST['dateBirth'];
  // $gender = ;
  $phone = $_POST['phone'];
  $email = $_POST['email'];
  $address = $_POST['address'];
  $addressNumber = $_POST['addressNumber'];
  // $location = ;
  if (strcmp ($_POST['location'], "default" ) == 0 ) {
    $location = NULL;
  }

  if (strcmp ($_POST['gender'], "default" ) == 0 ){
    $gender = NULL;
  }
  
  $id = getMd5Id("PERSONAL_INFORMATION", "ID_DNI");

  $sql = "INSERT INTO `PERSONAL_INFORMATION`( `ID_DNI`,`dni`,`tramit_nume`,`name`,`surname`,`gender`,`date_Birth`,`phone`,`email`,`address`,`address_number`,`PK_ID_LOCATION`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
  
  /* crear una sentencia preparada */
  if ($stmt = $connection->prepare($sql)) {
    /* ligar parámetros para marcadores */
    $stmt->bind_param("siissssissii", $id,$dni,$cuil,$name,$surname,$gender,$dateBirth,$phone,$email,$address,$addressNumber,$location);

    /* ejecutar la consulta */
    $stmt->execute();

    if ($stmt->error) {
      echo "Error:" . $stmt->error;
    }

    /* cerrar sentencia */
    $stmt->close();
  }

  sendQueryMsgId(null,null,$id);
  $connection->close();
