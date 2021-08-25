<?php
  include("./../connection.php");
  $_PUT = getPutRequestParameters();
  $id =$_PUT['id'];
  $dni = $_PUT['dni']; 
  $cuil = $_PUT['tramitNumber'];
  $name = $_PUT['name'];
  $surname = $_PUT['surname'];
  $dateBirth = $_PUT['dateBirth'];
  $gender =  $_PUT['gender'] ;
  $phone = $_PUT['phone'];
  $email = $_PUT['email'];
  $address = $_PUT['address'];
  $addressNumber = $_PUT['addressNumber'];
  $location = $_PUT['location'];

  if ( strcmp($location, "default" ) == 0 ) {
    $location = null;
  }

  if ( strcmp($gender, "default" ) == 0 ){
    $gender = null;
  }

  $sql = "UPDATE PERSONAL_INFORMATION SET dni = ?, tramit_nume= ? , name= ? , surname= ?, gender = ? , date_birth = ? , phone = ? , email = ? , address = ? , address_number = ? , PK_ID_LOCATION = ? WHERE ID_DNI = ? ";
  
  /* crear una sentencia preparada */
  if ($stmt = $connection->prepare($sql)) {
    $stmt->bind_param("iissssissiis",$dni,$cuil,$name,$surname,$gender,$dateBirth,$phone,$email,$address,$addressNumber,$location,$id);
  
    if (!$stmt->execute()) {
      echo "Falló la ejecución: " . $stmt->error;
    }

    if ($stmt->error) {
      echo "Error stmt:" . $stmt->error;
    }

    if($connection->affected_rows > 0){
      $msg = ['type'=>'success','text'=>'Se actualizó con éxito'];
    }else{
      $msg = ['type'=>'error','text'=>'No se actualizó'];
    }

    $stmt->close();
  }
  sendQueryMsgId(null, $msg, null);
  $connection->close();
