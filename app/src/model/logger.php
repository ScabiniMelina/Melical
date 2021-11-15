<?php
//TODO: LA RUTA TIENE QUE SER LA DE LA COMPU DE LA MAQUINA DEL USUARIO, 
//TODO: proteger y restringir el acceso al archivo de errores, porque cualquier usuario podría ver la carpeta (y su contenido) desde el navegador .httpacces
//Un simple archivo que configura el log, oculta los errores y crea un nuevo archivo cada día
//El directorio o carpeta en donde se van a crear los logs, da algo como C:\xampp\esta_carpeta\logs
define("RUTA_LOGS", __DIR__ . "/logs");
//Crear carpeta si no existe
if (!file_exists(RUTA_LOGS)) {
    mkdir(RUTA_LOGS);
}
//Poner fecha y hora de Argentina, esto es por si el servidor tiene otra zona horaria
date_default_timezone_set("America/Argentina/Buenos_Aires");

//Configuramos el ini para que no muestre errores, Los ponga en un archivo
ini_set('display_errors', 0);
ini_set("log_errors", 1);
//le indicamos en dónde los va a poner, sería en algo como: RUTA_LOGS/2019-02-07.log, Así cada día tenemos un archivo de log distinto
ini_set("error_log", RUTA_LOGS . "/" . date("Y-m-d") . ".log");

// echo RUTA_LOGS;
// Listo, ahora asegúrate de incluir lo de arriba en el encabezado o un archivo, común que se ejecute siempre al inicio