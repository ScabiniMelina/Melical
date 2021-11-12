 <?php
    include("./../connection.php");
    $cuil  = getInputValue($_POST['cuil'], 'cuil', 11, 'integer', 11);
    $password = getInputValue($_POST['password'], 'contraseña', 20, 'string');
    $sql = "SELECT * FROM User INNER JOIN Personal_Information ON Personal_Information.ID_DNI=User.PK_dni WHERE Personal_Information.`cuil`=? AND User.password = ?";
    $typeOfParameters = "is";
    $parameters = array($cuil, $password);
    $result = executePreparedStatement($sql, $typeOfParameters, $parameters);
    if ($result->num_rows == 1) {
        $msg = ['type' => 'success', 'text' => 'Inicio de sesión exitoso'];
        session_start();
        $_SESSION['cuil'] = $cuil;
    } else {
        $msg = ['type' => 'error', 'text' => 'Usuario o contraseña invalido'];
    }
    sendJson(null, $msg, null, null, null);
