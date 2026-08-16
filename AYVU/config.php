<?php

$dbHost     = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName     = 'db_ayvu';


mysqli_report(MYSQLI_REPORT_OFF);

try {
    
    $conexao = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

   
    if ($conexao->connect_error) {
        throw new Exception("Falha na conexão com o banco de dados.");
    }

   
    $conexao->set_charset("utf8mb4");

} catch (Exception $e) {

    die("Ocorreu um erro ao conectar ao sistema. Tente novamente mais tarde.");
}
?>