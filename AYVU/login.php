<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ayvu</title>
</head>

<body>
    <form action="autenticacao.php" method="post">
        <h1>Login</h1>
        <br><br>
        <label for="email">Email:</label>
        <input type="email"  id="usuario" name="email" required>
        <br><br>
        <label for="senha">Senha:</label>
        <input type="password" name="senha" id="senha" required>
        <br><br>
        <button type="submit">Entrar</button>
</form>
</body>

</html>

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