<?php

$dbHost     = 'localhost';
$dbUsername = 'root';
$dbPassword = 'root';
$dbName     = 'Ayvu';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {

    $conexao = new mysqli(
        $dbHost,
        $dbUsername,
        $dbPassword,
        $dbName
    );

    $conexao->set_charset("utf8mb4");

    echo "Conexão realizada com sucesso!";

} catch (mysqli_sql_exception $e) {

    die("Erro na conexão: " . $e->getMessage());
}
?>
