<?php
require_once 'config.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
   
    $nome = $_POST['nome']; 
    $sobrenome = $_POST['sobrenome'];
    $genero = $_POST['genero'];
    $email = $_POST['email']; 
    $senha = $_POST['senha'];

    $senha = password_hash($senha, PASSWORD_DEFAULT);

   
    $sql = "INSERT INTO sua_tabela (nome, sobrenome, genero, email, senha) VALUES (?, ?, ?, ?, ?)";
    

    $stmt = $conexao->prepare($sql);
    
    $stmt->bind_param("sssss", $nome, $sobrenome, $genero, $email, $senha);
    
    if ($stmt->execute()) {
        echo "Usuário registrado com sucesso!";
    } else {
        echo "Erro ao registrar: " . $stmt->error;
    }

    $stmt->close();
}

$conexao->close();
?>