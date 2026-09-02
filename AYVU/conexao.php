<?php
require_once 'config.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
   
    $nome = $_POST['nome']; 
    $sobrenome = $_POST['sobrenome'];
    $genero = $_POST['genero'];
    $email = $_POST['email']; 
    $senha = $_POST['senha'];


// Esse bloco serve para a captação de erros de inserção do usuário
$erros = [];

    if (empty($nome)) {
        $erros[] = "O campo Nome é obrigatório.";
    }
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $erros[] = "Informe um e-mail válido.";
    }
    if (strlen($senha) < 6) {
        $erros[] = "A senha deve ter pelo menos 6 caracteres.";
    }


    if (!empty($erros)) {
        foreach ($erros as $erro) {
            echo "<p style='color: red;'>$erro</p>";
        }
        echo "<a href='javascript:history.back()'>Voltar e corrigir</a>";
        exit; 
    }
    // ele acaba aqui  

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