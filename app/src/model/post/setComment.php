<?php
  include("connection.php");
  $comment = $_POST['comment']; 
  if(isset($_POST['permission'])){
    $permission = $_POST['permission'];    
  }else{
    $permission = 'todos';
  }
  $employee = $_SESSION['employee'];
  $date = date('Y-m-d H:i:s');

  $sql = "";
  if (mysqli_query($connection , $sql)) {
    echo "Funciona";
  } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($connection);
  }
  $connection->close();
?>