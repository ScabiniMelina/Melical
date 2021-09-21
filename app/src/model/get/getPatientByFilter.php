<?php

include("./../connection.php");
$conditionsToFilter = array_filter($_GET);

foreach ($conditionsToFilter as $conditionsIndex => $conditions) {
    if (is_array( $conditionsToFilter[$conditionsIndex])){
        $conditionsToFilter[$conditionsIndex]  = array_diff($conditions, array("","default"));
        if (count($conditionsToFilter[$conditionsIndex]) == 0 ){
            unset($conditionsToFilter[$conditionsIndex]);
        }
    }
}
echo "<pre>".print_r( $conditionsToFilter,true)."</pre>";

//TODO: $echo ARREGLAR LA FUNCION PARA OBTENER SENTENCIAS PREPARADAS

//startOfHospitalization ,endOfHospitalization,
// $sql = "SELECT ID_DNI AS ID, dni, name, surname, date_birth AS dateBirth FROM PERSONAL_INFORMATION WHERE";
// if (is_numeric($id)) {
//     $sql .= " dni LIKE '%$id%' ";
// } else {
//     $sql .= " name LIKE '%$id%' OR surname LIKE '%$id%'";
// }
// $query = $connection->query($sql);
// $data = $query->fetch_all(MYSQLI_ASSOC);
// $msg = ['type' => 'error', 'text' => 'Mensaje de prueba'];
// sendJson($data, $msg, ,null);
// $connection->close();
