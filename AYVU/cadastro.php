<?php

if (isset($_POST['submit'])) {

    include_once('config.php');

    echo 'Nome: ' . $_POST['nome'];
    echo '<br>';
    echo 'Email: ' . $_POST['email'];
    echo '<br>';
    echo 'Telefone: ' . $_POST['telefone'];
    echo '<br>';
    echo 'Sexo: ' . $_POST['genero'];
    echo '<br>';
    echo 'Data de nascimento: ' . $_POST['data_nascimento'];
    echo '<br>';
    echo 'Cidade: ' . $_POST['cidade'];
    echo '<br>';
    echo 'Estado: ' . $_POST['estado'];
    echo '<br>';

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $genero = $_POST['genero'];
    $data_nasc = $_POST['data_nascimento'];
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];

    $result = mysqli_query(
        $conexao,
        "INSERT INTO usuarios
        (nome, email, telefone, genero, data_nascimento, cidade, estado)
        VALUES
        ('$nome', '$email', '$telefone', '$genero', '$data_nasc', '$cidade', '$estado')"
    );

    if ($result) {
        echo "<br>Dados cadastrados com sucesso!";
    } else {
        echo "<br>Erro ao cadastrar: " . mysqli_error($conexao);
    }
}

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
</head>

<body>
    <div class="box">
        <form action="cadastro.php" method="POST">
            <fieldset>
                <legend><b>Cadastro</b></legend>

                <div class="inputBox">
                    <label for="nome">Nome completo:</label>
                    <br>
                    <input type="text" name="nome" id="nome" required>
                </div>

                <br>

                <div class="inputBox">
                    <label for="email">Email:</label>
                    <br>
                    <input type="email" name="email" id="email" required>
                </div>

                <br>

                <div class="inputBox">
                    <label for="telefone">Telefone:</label>
                    <br>
                    <input type="tel" name="telefone" id="telefone" required>
                </div>

                <br>

                <p>Sexo:</p>

                <input type="radio" id="feminino" name="genero" value="Feminino" required>
                <label for="feminino">Feminino</label>
                <input type="radio" id="masculino" name="genero" value="Masculino" required>
                <label for="masculino">Masculino</label>

                <br><br>

                <div class="inputBox">
                    <label for="data_nascimento"><b>Data de Nascimento:</b></label>
                    <br>
                    <input type="date" name="data_nascimento" id="data_nascimento" required>
                </div>

                <br>

                <div class="inputBox">
                    <label for="cidade">Cidade:</label>
                    <br>
                    <input type="text" name="cidade" id="cidade" required>
                </div>

                <br>

                <div class="inputBox">
                    <label for="estado">Estado:</label>
                    <br>
                    <input type="text" name="estado" id="estado" required>
                </div>

                <br>

                <input type="submit" name="submit" id="submit" value="Cadastrar">

            </fieldset>
        </form>
    </div>
</body>

</html>