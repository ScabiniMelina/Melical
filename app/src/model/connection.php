<?php
// use function PHPSTORM_META\type;
header('Content-Type: application/json');
ini_set('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);
include "credentials.php";
//crea una nueva conexion a la base de datos
function DbConnect()
{
    try {
        $connection = new mysqli(HOST, USER, PASS, DB);
        
        if ($connection->connect_errno != 0) {
            echo $connection->connect_error;
            exit();
        }
        return $connection;
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

//Retorna un array numerico con los resultados de una consulta a la bd
function query($ssql)
{
    try {
        global $msg;
        $connection = DbConnect();
        $result = $connection->query($ssql);
        if ($connection->errno != 0) {
            echo $connection->error;
            echo "<br>" . $connection . "<br>" .  $ssql;
            exit();
        }

        if ($result->num_rows > 0) {
            $DbResult = $result->fetch_all();
        }

        $msg = getMessageFromOperationResultToDatabase($connection);
        $connection->close();
        return $DbResult;
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

//Realiza una operación a la base de datos con sentencias preparadas, retornando el resultado de dicha operacion 
function  getPreparedStatement($sql,$typeOfParameters, $parameters){ 
    try {
        global $msg;
        $connection = DbConnect();
        //crear una sentencia preparada
        if ($stmt = $connection->prepare($sql)) {
            if ($typeOfParameters != null){
                $stmt->bind_param($typeOfParameters, ...$parameters);
            }
            $stmt->execute(); // ejecutar la consulta 
            if ($stmt->error) {
                echo "Error:" . $stmt->error . $stmt->errno;
            }
            $result = $stmt->get_result();
            $msg = getMessageFromOperationResultToDatabase($connection);
            $stmt->close();
            $connection->close();
            return $result;
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

}

//Devuelve un array asociativo de la operacion realizada en la bd con sentencias preparadas
function getResultOfPreparedStatement($result){
    try {
        if(!isset($result)){
            return array();
        }
        if($result->num_rows > 0){
            $DbResult = $result->fetch_all(MYSQLI_ASSOC);
            return $DbResult;
        }
    }  catch (Exception $e) {
        echo $e->getMessage();
    }
}

function getMessageFromOperationResultToDatabase($connection){    
    if($connection->affected_rows > 0 ){
        $msg = ['type'=>'success','text'=>'Se realizo la operación exitosamente'];
    }else{
        $msg = ['type'=>'error','text'=>'No se realizo la operación exitosamente o no hay datos'];
    }
    return $msg;
}

//Si hay una registro duplicado en la base de datos envia un mensaje de que ya se ha registrado previamente eso
function setMessageOfDuplicateRecord($data,$duplicateThing){
    if( $data[0]['numberOfMatches'] > 0){
        $msg['type'] = 'error';
        $msg['text'] = "Ya hay ".$duplicateThing." guardado con esos datos";
        sendJson(null,$msg, null ,null,null);
        exit;
    }
}

//Retorna el resultado obtenido de una consulta sql y/o un mensaje y/o un id del nuevo elemento insertado en la base de datos y/o una cantidad de paginas para el paginador;
function sendJson($databaseInformation, $msg, $newElementID, $amountOfPages,$currentPage)
{
    $elementsToSend = [];
    if (isset($databaseInformation)) {
        $elementsToSend['db'] = $databaseInformation;
    }
    if (isset($msg)) {
        $elementsToSend['msg'] = $msg;
    }
    if (isset($newElementID)) {
        $elementsToSend['id'] = $newElementID;
    }
    if(isset($amountOfPages)){
        $elementsToSend['amountOfPages'] = $amountOfPages;
    }
    if(isset($currentPage)){
        $elementsToSend['currentPage'] = $currentPage;
    }
    echo json_encode($elementsToSend, JSON_FORCE_OBJECT);
}

//Crea un nuevo id encriptado con md5, no repetible 
function getMd5Id($table, $primaryKeyName)
{
    $connection = DbConnect();
    do {
        $currentDateTime = date('YmdHis');
        $md5Id = md5($currentDateTime);
        $sql = "SELECT * FROM `$table` WHERE `$primaryKeyName`='$md5Id'";
        $response = mysqli_query($connection, $sql);
        if (!$response) {
            echo "Error: " . $sql . "<br>" . mysqli_error($connection);
            break;
        }
    } while ($response->num_rows > 0);
    return $md5Id;
}

//TODO: HACER QUE GET PUT REQUEST PARAMETER FUNCIONE PARA EL METODO DELETE;
//Crea un array con los valores enviados a traves del metodo put
function getPutRequestParameters()
{
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        parse_str(file_get_contents("php://input"), $_PUT);
        return $_PUT;
    }
}


// function getRequestParameters()
// {
//     $requestMethod = $_SERVER['REQUEST_METHOD'];
//     if ( $requestMethod === 'PUT' || $requestMethod === 'DELETE' ) {
//         parse_str(file_get_contents("php://input"), $parameters);
//         return $parameters;
//     }
// }
function getCurrentPage(){
    $currentPage = 1;
    if(isset($_GET['pageNumber'])){
        $currentPage = $_GET['pageNumber'];
    }
    //Si existe el limite para especificar la cantidad de paginas, significa que existe el paginador y no hay que saber la cantidad de filas para poder crearlo nuevamente     
    return $currentPage;
}

function getPaginationConfig($numberOfResultsToShow, $currentPage ){
    $finalLimit =  $currentPage * $numberOfResultsToShow;
    $initialLimit = $finalLimit - $numberOfResultsToShow;
    return $initialLimit;
}

function getAmountOfPagesToCreatePager($table,$numberOfResultsPerPage){
    try{
        $amountOfPages = null;
        if(!isset($_GET['pageNumber'])){
        $sql = "SELECT COUNT(*) AS numberOfResults FROM $table ";
        $result = getPreparedStatement($sql,null,null);
        $numberOfResults = getResultOfPreparedStatement($result);
        $numberOfResults = $numberOfResults[0]['numberOfResults'];
        $amountOfPages = ceil($numberOfResults /  $numberOfResultsPerPage);
        }
        return $amountOfPages;
    }catch (Exception $e) {
        echo $e->getMessage();
    }
   
}

function setSelectValue($value){
    if ( strcmp($value, "default" ) == 0 ) {
        return  null;
    }
    return $value;
}

//Agrega el parametro a la configuracion de la sentencia preparada, agregando un parametro mas junto con su tipo de dato y  modificando la sentencia sql
function addParameterToPreparedStatementsConfig($value, $type, $condition){
    global $typeOfParameters;
    global $conditions;
    global $parameters;
    if(isset($value) && !empty($value) && strcmp($value,"default") !== 0){
        $typeOfParameters .=$type;
        $conditions .= " ". $condition ." AND ";
        array_push( $parameters,$value);
    }
}