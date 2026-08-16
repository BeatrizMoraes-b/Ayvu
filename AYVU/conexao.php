<?php
require_once 'conexao.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
   
    $nome = $_POST['nome']; 
    $sobrenome = $_POST['sobrenome'];
    $genero = $_POST['genero'];
    $email = $_POST['email']; 
    $senha_digitada = $_POST['senha'];

    $senha_protegida = password_hash($senha_digitada, PASSWORD_DEFAULT);

   
    $sql = "INSERT INTO sua_tabela (nome, sobrenome, genero, email, senha) VALUES (?, ?, ?, ?, ?)";
    

    $stmt = $conexao->prepare($sql);
    
    $stmt->bind_param("sssss", $nome, $sobrenome, $genero, $email, $senha_protegida);
    
    if ($stmt->execute()) {
        echo "Usuário registrado com sucesso!";
    } else {
        echo "Erro ao registrar: " . $stmt->error;
    }

    $stmt->close();
}

$conexao->close();
?>