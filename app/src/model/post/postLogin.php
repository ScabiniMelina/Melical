 <?php
    include("./../connection.php");
    $cuil  = getInputValue($_POST['cuil'], 'cuil', 20, 'integer');
    $password = getInputValue($_POST['password'], 'contraseña', 20, 'string');
    $sql = "SELECT * FROM USER INNER JOIN PERSONAL_INFORMATION ON PERSONAL_INFORMATION.ID_DNI=USER.PK_ID_DNI WHERE PERSONAL_INFORMATION.`tramit_nume`=? AND USER.password = ?";
    $typeOfParameters = "is";
    $parameters = array($cuil, $password);
    $result = getPreparedStatement($sql, $typeOfParameters, $parameters);
    if ($result->num_rows == 1) {
        $msg = ['type' => 'success', 'text' => 'Inicio de sesión exitoso'];
        session_start();
        $_SESSION['cuil'] = $cuil;
    } else {
        $msg = ['type' => 'error', 'text' => 'Usuario o contraseña invalido'];
    }
    sendJson(null, $msg, null, null, null);
