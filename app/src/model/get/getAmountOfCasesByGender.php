<?php
include("./../connection.php");
//TODO MELI: CAMBIAR SQL PARA QUE DEVULVA LA CANTIDAD DE CASOS FEMENINOS Y MASCULINOS QUE TIENEN UNA HISTORIA CLINICA CON ESOS SINTOMAS
$sql = "select IF(gender = 0, 'Femenino', IF(gender = 1,'Masculino', '')) AS x , count(*) as y  FROM Personal_Information WHERE gender = 0 OR gender = 1 GROUP BY gender";
$typeOfParameters = "sii";
$parameters = array($personalInformationId, $initialRow, $numberOfItemsToShow);
$result = executePreparedStatement($sql, $typeOfParameters, $parameters);
$data =  getResultOfPreparedStatement($result);
$labels = array();
$datasets = array();
// var_dump($data);
foreach ($data as $rowIndex => $rowValue) {
    foreach ($rowValue as $index => $value) {
        if ($index == 'x') {
            array_push($labels, $value);
        } else {
            if (array_key_exists($index, $datasets)) {
                // echo "indice" . $index . "   ";
                // echo "valor" . $value . "  ";
                // echo "existe array";
                array_push($datasets[$index], $value);
            } else {
                $datasets[$index] =  array($value);
                // echo " no  existe array";
            }
        }
    }
}
foreach ($datasets as $index => $value) {
    $chartTypes[$index] =  null;
}
// echo end($chartTypes);
// $chartTypes['m'] = 'line';
$chartData['labels'] = $labels;
$chartData['datasets'] = $datasets;
$chartData['chartTypes'] = $chartTypes;
sendJson($chartData, $msg, null, null, null);
