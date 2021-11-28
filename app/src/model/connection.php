<?php
// use function PHPSTORM_META\type;
header('Content-Type: application/json');
// include_once "logger.php";
include "credentials.php";
ini_set('display_errors', 0);
ini_set("log_errors", 1);
error_reporting(E_ALL);

// ------------------------------ RUTAS
$destinationPathToPatientFacialImages = "/view/assets/img/patientFaces/";


// ------------------------------ OPERACIONES A LA BD

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
        $typeOfOperation = getTypeOfDatabaseOperation($ssql);
        $result = $connection->query($ssql);
        if ($connection->errno != 0) {
            error_log(var_export($connection->error, true) . " " . var_export($connection, true));
            return array();
            exit();
        }

        // $DbResult = $result->fetch_all();
        if ($result->num_rows > 0) {
            $DbResult = $result->fetch_all();
        }
        return $DbResult;
        $msg = getMessageFromOperationResultToDatabase($connection, $typeOfOperation);
        $connection->close();
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

//Realiza una operación a la base de datos con sentencias preparadas, retornando el resultado de dicha operacion 
function  executePreparedStatement($sql, $typeOfParameters, $parameters)
{
    try {
        global $msg;
        $connection = DbConnect();
        $typeOfOperation = getTypeOfDatabaseOperation($sql);
        $stmt = $connection->prepare($sql);
        //crear una sentencia preparada
        if ($stmt) {
            if ($typeOfParameters != null) {
                $stmt->bind_param($typeOfParameters, ...$parameters);
            }
            $stmt->execute(); // ejecutar la consulta 
            if ($stmt->error) {
                echo "Error:" . $stmt->error . $stmt->errno;
            }
            $result = $stmt->get_result();
            $msg = getMessageFromOperationResultToDatabase($connection, $typeOfOperation);
            $stmt->close();
            $connection->close();
            return $result;
        } else {
            $msg = getMessageFromOperationResultToDatabase(null, null);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

//Devuelve el tipo de operacion ( actulizo, guardo, elimino,selecciono) para tirar un mensaje de error mas personalizado
function getTypeOfDatabaseOperation($sql)
{
    $typeOfOperation = "selecciono";
    if (strpos($sql, "INSERT") !== false) {
        $typeOfOperation = "guardo";
    } else {
        if (strpos($sql, "UPDATE") !== false) {
            $typeOfOperation = "actualizo";
        } else {
            if (strpos($sql, "DELETE") !== false) {
                $typeOfOperation = "elimino";
            }
        }
    }
    return $typeOfOperation;
}

//Devuelve un array asociativo de la operacion realizada en la bd con sentencias preparadas
function getResultOfPreparedStatement($result)
{
    try {
        if (!isset($result)) {
            return array();
        }
        if ($result->num_rows > 0) {
            $DbResult = $result->fetch_all(MYSQLI_ASSOC);
            return $DbResult;
        } else {
            return array();
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

// ------------------------------ MANEJO DE MENSAJES


function getMessageFromOperationResultToDatabase($connection, $typeOfOperation)
{
    if (!isset($connection)) {
        $msg['type'] = 'error';
        $msg['text'] = 'Error al realizar la operación';
    } else {
        if ($connection->affected_rows < 0) {
            $msg['type'] = 'error';
            if ($connection->affected_rows == 0) {
                if ($typeOfOperation === "selecciono") {
                    $msg['text'] = 'No se encontraron resultados';
                } else {
                    $msg['text'] = 'No se' . $typeOfOperation . 'la información exitosamente';
                }
            } else {
                $msg['text'] = 'Error al realizar la operación';
            }
        } else {
            $msg = ['type' => 'success', 'text' => 'Se realizo la operación exitosamente'];
        }
    }
    return $msg;
}

//Si hay una registro duplicado en la base de datos envia un mensaje de que ya se ha registrado previamente eso
function setMessageOfDuplicateRecord($data, $duplicateThing)
{
    if ($data[0]['numberOfMatches'] > 0) {
        $msg['type'] = 'error';
        $msg['text'] = "Ya hay " . $duplicateThing . " guardado con esos datos";
        sendJson(null, $msg, null, null, null);
        exit;
    }
}

//Retorna el resultado obtenido de una consulta sql y/o un mensaje y/o un id del nuevo elemento insertado en la base de datos y/o una cantidad de paginas para el paginador;
function sendJson($databaseInformation, $msg, $newElementID, $amountOfPages, $currentPage)
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
    if (isset($amountOfPages)) {
        $elementsToSend['amountOfPages'] = $amountOfPages;
    }
    if (isset($currentPage)) {
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

// ------------------------------ OBTENER PARAMETROS POR PETICION


//TODO: HACER QUE GET PUT REQUEST PARAMETER FUNCIONE PARA EL METODO DELETE;
//Crea un array con los valores enviados a traves del metodo put
function getPutRequestParameters()
{
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        parse_str(file_get_contents("php://input"), $_PUT);
        return $_PUT;
    }
}


// function getPutRequestParameters()
// {
//     $requestMethod = $_SERVER['REQUEST_METHOD'];
//     if ( $requestMethod === 'PUT' || $requestMethod === 'DELETE' ) {
//         parse_str(file_get_contents("php://input"), $parameters);
//         return $parameters;
//     }
// }

// ------------------------------  PÁGINADOR


function getCurrentPage()
{
    $currentPage = 1;
    if (isset($_GET['pageNumber'])) {
        $currentPage = $_GET['pageNumber'];
    }
    //Si existe el limite para especificar la cantidad de paginas, significa que existe el paginador y no hay que saber la cantidad de filas para poder crearlo nuevamente     
    return $currentPage;
}

function getPaginationConfig($numberOfResultsToShow, $currentPage)
{
    $finalLimit =  $currentPage * $numberOfResultsToShow;
    $initialLimit = $finalLimit - $numberOfResultsToShow;
    return $initialLimit;
}

function getAmountOfPagesToCreatePager($table, $numberOfResultsPerPage, $typeOfParameters = null, $parameters = null)
{
    global $msg;
    try {
        $amountOfPages = null;
        if (!isset($_GET['pageNumber'])) {
            $sql = "SELECT COUNT(1) AS numberOfResults FROM $table ";
            $result = executePreparedStatement($sql, $typeOfParameters, $parameters);
            if ($msg['type'] === 'error') {
                $msg['text'] = 'No se encontraron resultados';
                sendJson(null, $msg, null, null, null);
                exit;
            }
            $numberOfResults = getResultOfPreparedStatement($result);
            if (strpos($sql, "GROUP BY")) {
                $numberOfResults = $result->num_rows;
            } else {
                $numberOfResults = $numberOfResults[0]['numberOfResults'];
            }
            $amountOfPages = ceil($numberOfResults /  $numberOfResultsPerPage);
        }
        return $amountOfPages;
    } catch (Exception $e) {
        echo $e->getMessage();
    }
}

// ------------------------------ MANEJO DE VALORES DE UNA PETICION


function setValue($defaultValue, $value)
{
    if (isset($value)) {
        return $value;
    }
    return $defaultValue;
}

function setSelectValue($value)
{
    if (strcmp($value, "default") == 0 || !isset($value) || strcmp($value, "Todos") == 0 || strcmp($value, "") == 0) {
        return  null;
    }
    return $value;
}

//De una variable coincide con el tipo de dato y el tamaño especificado caso contrario muestra una alerta
function getInputValue($inputValue, $errorMsg, $maxLength, $type = 'string', $minLength = 0)
{
    if (isset($inputValue)) {
        // tipos de dato integer string
        if (is_numeric($inputValue) && strcmp("integer", $type) == 0 || !is_numeric($inputValue) && strcmp("string", $type) == 0) {
            if (strlen($inputValue) <= $maxLength && $maxLength != null) {
                if (strlen($inputValue) >= $minLength) {
                    return  $inputValue;
                } else {
                    $msg = ['type' => 'error', 'text' => ' ' . $errorMsg . ' debe tener mas de ' .  $maxLength . ' digitos'];
                }
            } else {
                $msg = ['type' => 'error', 'text' => ' ' . $errorMsg . ' no debe superar los ' .  $maxLength . ' digitos'];
            }
        } else {
            $msg = ['type' => 'error', 'text' => ' ' . $errorMsg . ' tiene caracteres invalidos'];
        }
    } else {
        $msg = ['type' => 'error', 'text' => 'Ingrese  ' . $errorMsg];
    }
    sendJson(null, $msg, null, null, null);
    exit();
}


//Agrega el parametro a la configuracion de la sentencia preparada, agregando un parametro mas junto con su tipo de dato y  modificando la sentencia sql
function addParameterToPreparedStatementsConfig($value, $type, $condition)
{
    global $typeOfParameters;
    global $conditions;
    global $parameters;
    if (isset($value) && !empty($value) && strcmp($value, "default") !== 0) {
        $typeOfParameters .= $type;
        $conditions .= " " . $condition . " AND ";
        array_push($parameters, $value);
    }
}

// ------------------------------ MANEJO DE ARCHIVOS


function uploadFiles($files, $destinationPath, $allowedExtensions)
{
    $saveFiles = 0;
    $msg = array();
    $msg['text'] = "No se guardaron los archivos";
    $msg['type'] = "error";
    foreach ($files['tmp_name'] as $key => $tmp_name) {
        $msg['type'] = 'info';
        if ($files["name"][$key]) {
            $filename = $files["name"][$key]; //Obtenemos el nombre original del archivo
            $source = $files["tmp_name"][$key]; //Obtenemos un nombre temporal del archivo   
            $extension = end(explode(".", $filename));
            //Validamos que el tipo de archivo sea una imagen
            if (in_array($extension, $allowedExtensions)) {
                //Validamos si la ruta de destino existe, en caso de no existir la creamos
                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0777) or $msg['text'] = "No se puede crear el directorio que contiene las fotos del paciente.";
                    return $msg;
                }
                //Movemos y validamos que el archivo se haya cargado correctamente
                //El primer campo es el origen y el segundo el destino
                if (move_uploaded_file($source, $destinationPath . $filename)) {
                    $saveFiles++;
                } else {
                    $msg['text'] .=  "Error, no se guardo el archivo " . $filename . ". ";
                }
            } else {
                $msg['text'] .= "No se guardo el archivo " . $filename . " tipo de archivo no permitido . ";
            }
        } else {
            $msg['text'] .= "El archivo no existe. ";
        }
        // array_push($msgs, $msg);
    }
    if ($saveFiles == count($files['name'])) {
        $msg['text'] = "Se subieron todos los archivos";
        $msg['type'] = "success";
    }
    return $msg;
}

function deleteFile($urlSource)
{
    global $msg;
    if (unlink($_SERVER['DOCUMENT_ROOT'] . $urlSource)) {
        $msg = ['type' => 'success', 'text' => 'Se elimino el archivo'];
    } else {
        $msg = ['type' => 'error', 'text' => 'No se pudo eliminar el archivo'];
    }
}

function getImagesFromPath($dirPath, $extensions_array)
{
    global $msg;
    $images = array();
    $path = $_SERVER['DOCUMENT_ROOT'] . $dirPath;
    if (is_dir($path)) {
        $files = scandir($path);
        for ($i = 0; $i < count($files); $i++) {
            if ($files[$i] != '.' && $files[$i] != '..') {
                // get file extension
                $file = pathinfo($files[$i]);
                $extension = $file['extension'];
                // check file extension
                if (in_array($extension, $extensions_array)) {
                    $img['path'] = $dirPath . $files[$i];
                    array_push($images, $img);
                }
            }
        }
    } else {
        $msg = ['type' => 'error', 'text' => 'No se encontraron imágenes '];
    }
    if (count($images) <= 0) {
        $msg = ['type' => 'error', 'text' => 'No se encontraron imágenes '];
    } else {
        $msg = ['type' => 'success', 'text' => 'Se cargaron las imágenes exitosamente'];
    }
    return $images;
}
