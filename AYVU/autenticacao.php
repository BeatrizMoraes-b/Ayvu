<?php
session_start();
require_once 'config.php';

$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$senha = $_POST['senha'] ?? '';

if (!$email || empty($senha)) {
    die('Preencha os campos corretamente.');
}

$stmt = $conexao->prepare("SELECT idusuario, nome, senha FROM usuarios WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$resultado = $stmt->get_result();

if ($usuario = $resultado->fetch_assoc()) {

    if (password_verify($senha, $usuario['senha'])) {
        $_SESSION['usuario_id'] = $usuario['idusuario'];
        $_SESSION['usuario_nome'] = $usuario['nome'];
        
        header("Location: inicio.php");
        exit;
    }
}


?>