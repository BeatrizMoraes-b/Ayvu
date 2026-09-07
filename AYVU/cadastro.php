<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
</head>
<body>
<form action="conexao.php" method="post">
    <fieldset>
    <h1>Cadastro</h1>
    <label for="nome">Nome:</label>
    <input type="text" id="nome" name="nome" required>
    <br><br>
    <label for="sobrenome">Sobrenome:</label>
    <input type="text" id="sobrenome" name="sobrenome">
    <br><br>
    <label for="genero">Gênero:</label>
<select name="genero" id="genero">
    <option value="" disabled selected hidden>Selecione uma opção...</option>
    <option value="feminino">feminino</option>
    <option value="masculino">masculino</option>
</select>    
<br><br>
<label for="email">E-mail:</label>
<input type="email" id="email" name="email">
<br><br>
<label for="senha">Senha:</label>
<input type="password" name="senha" id="senha">
<br><br>
<input type="submit" id="enviar" value="Cadastrar">
    </fieldset>
    </form>
</body>
</html>