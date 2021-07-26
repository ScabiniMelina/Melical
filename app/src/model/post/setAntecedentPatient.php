<?php
  include("./../connection.php");
  $antecedents = $_POST['antecedent']; 
  if(!empty($antecedents)){
    $antecedents = explode(",",$antecedents);
  }else{
    $antecedents = array();
  }
  $sql = "";
  for ($i=0; $i < count($antecedentes) ; $i++) { 
    $sql .= $antecedents[$i];
  }
  $sql = "";
  if (mysqli_query($connection , $sql)) {
    echo "Funciona";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }
  
  $connection->close();
