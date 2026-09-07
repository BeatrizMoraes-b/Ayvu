<?php

$dbHost     = '127.0.0.1';
$dbPort     = 3306;
$dbUsername = 'root';
$dbPassword = 'root';
$dbName     = 'ayvu';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {

    $conexao = new mysqli(
        $dbHost,
        $dbUsername,
        $dbPassword,
        $dbName
    );

    $conexao->set_charset("utf8mb4");

  

} catch (mysqli_sql_exception $e) {

    die("Erro na conexão: " . $e->getMessage());
}
?>
