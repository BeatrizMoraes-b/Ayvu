<?php
$dbHost = 'LocalHost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'db_ayvu';

$conexao = new mysqli($dbHost,$dbUsername,$dbPassword,$dbName);

if($conexao->connect_error)
    {
        echo "Erro";
    }
    else
    {
        echo "Conexão efetuada com sucesso!";
    }
?>