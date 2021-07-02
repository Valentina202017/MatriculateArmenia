create database matriculate3;
use matriculate3;
create table acudiente(
nombres varchar(15) not null,
apellidos varchar(15) not null,
documento char(2) not null,
id char(20) primary key not null,
direccion varchar(200) not null,
municipio varchar(30) not null,
ocupacion varchar(20) not null,
parentesco varchar(20) not null,
num1 varchar(30) not null,
num2 varchar(30) not null,
email varchar(30) not null unique,
password varchar(200) not null

);
use matriculate3;
create table estudiante(
primerNombre varchar (15) not null,
segundoNombre varchar(15),
primerApellido varchar(15)not null,
segundoApellido varchar (15),
tipoIdentificacion char(2) not null,
idEstudiante char(20) primary key not null,
genero char(2) not null,
fechaNacimiento date not null,
municipioResidencia varchar(20) not null,
direccion varchar(200) not null,
razaEtnia char(2) not null,
estrato int(2)not null,
poblacionVulnerable char(2) not null,
telefono char(30) not null,
idAcudiente char(20) not null
);
use matriculate3;
alter table estudiante add foreign key(idAcudiente) references acudiente(id);

use matriculate3;
create table colegio(
idinstitucion char(20) primary key not null,
nombreInstitucion varchar(50) not null,
direccion varchar(200) not null,
comuna char(20) not null,
modalidad varchar(200)not null,
telefono char(30) not null,
email varchar(30) not null unique,
password varchar(200) not null
);
use matriculate3;
create table cuposEscolares(
codigoCupo int (200) primary key not null auto_increment,
grado varchar(200) not null,
cupos int (15) not null,
codigoInstitucion char(20) not null,
fechaInicio date not null,
fechaCierre date not null,
respuestaUsuario date not null
);
use matriculate3;
alter table cuposEscolares add foreign key(codigoInstitucion) references colegio(idinstitucion);
use matriculate3;
create table matricula(
idMatricula int(200) primary key not null auto_increment,
idCupos int(200) not null,
idColegio char(20) not null,
idalumno  char(20)  not null
);
use matriculate3;
alter table matricula add foreign key(idCupos) references cuposEscolares (codigoCupo);
alter table matricula add foreign key(idColegio) references colegio (idinstitucion);
alter table matricula add foreign key(idalumno) references estudiante (idEstudiante);
