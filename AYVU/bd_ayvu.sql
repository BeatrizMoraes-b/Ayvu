create database ayvu;
use ayvu;

create table usuarios(
idusuario BIGINT NOT NULL AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL ,
genero VARCHAR(20) NOT NULL ,
senha VARCHAR(255) NOT NULL ,
email VARCHAR(255) NOT NULL UNIQUE,
PRIMARY KEY(idusuario));

