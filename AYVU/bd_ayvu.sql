create database ayvu;
use ayvu;

create table usuarios(
idusuario BIGINT NOT NULL AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL ,
data_nascimento DATE NOT NULL,
sexo VARCHAR(20) NOT NULL ,
login VARCHAR(255) NOT NULL ,
senha VARCHAR(255) NOT NULL ,
nivel INTEGER UNSIGNED NOT NULL ,
cadastro TIMESTAMP NOT NULL ,
telefone VARCHAR(11) NOT NULL,
cidade VARCHAR(45) NOT NULL, 
estado VARCHAR(45) NOT NULL,
PRIMARY KEY(idusuario));

