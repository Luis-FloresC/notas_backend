# Proyecto Aplicaci贸n de Notas

La API se encargara de manejar distintos m贸dulos: 
* Usuarios: Se encargara del manejo de los usuarios cumpliendo las funciones de listar, guardar, editar y eliminar usuarios.
* Seguridad: Se encargara del manejo de resguardar la informaci贸n  y dar acesso a los usaurios que cuenten con una api key valida en nuestro sistema.
* Notas: Se encargara del funcionamiento de las notas de los usuarios donde puedan listar, guardar, editar y eliminar. 

## Comenzando 馃殌

Descargar la Rama de Master y entrar a la terminal en la ruta de la carpeta del proyecto y asegurarse de tener instalado node js y npm instalados en su ordenador, Luego ejecutar el comando npm install para actualizar los paquetes del proyecto.


### Pre-requisitos 馃搵

Tener acceso a su cuenta de mongoDb para general el link de conexi贸n y crear una base de datos con el nombre "NotesDatabase" y crear 2 colecciones llamadas "Uusarios" y "Notas".


luego tenemos que copiar el archivo .env_Template y cambiar su nombre a .env 
luego configuramos las variables siguientes:

* SQLITE_DB= nombre de la base de datos de sqlite.
* SQLITE_SETUP= valor 1 o 0.

* JWT_AGE_SECONDS= segundos de duraci贸n del token de inicio de sesi贸n.
* JWT_AGE_SECONDS_Reset_Password=  segundos de duraci贸n del token para restablecer la contrase帽a.    
* JWT_SECRET=

* MONGODB_URI= link de conexi贸n a la base de datos
* MONGODB_DB= nombre de la base de datos
* MONGODB_SETUP= valor 1 o 0.

* APP_API_KEY= llaves validas para el uso de la api separadas por "|"
* CORSLIST= Lista de direcciones que permite la api

* correo_app =  Correo con verificaci贸n de 2 pasos 
* correo_servicio = smtp.gmail.com
* correo_port = 465
* correo_contrasenia = contrase帽a generada por google para el uso de app de terceros


Luego de seguir con lo pasos anteriores en la terminar de la carpeta base ejecutar cualquiera de los siguientes comandos:

* nodemon 
* npm run start




## Construido con 馃洜锔?

* [Node Js](https://nodejs.org/es/) 
* [Mongo Db](https://mongodb.github.io/node-mongodb-native/4.5/) - Gestor de Base de Datos
* [NPM](https://www.npmjs.com/)

## Versionado 馃搶

Usamos [GitHub](https://github.com/) para el versionado. Para todas las versiones disponibles, 
mira los [Notas-Backend](https://github.com/Luis-FloresC/notas_backend.git).

## Autores 鉁掞笍

* **David Mendoza** - *0601-1998-00243* - [dmendoza2](https://github.com/dmendoza2)
* **Diego Lopez** - *0801-1998-11745* - [Dlopz98](https://github.com/Dlopz98)
* **Gerson Martinez** - *1501-1999-01715* - [javier8159](https://github.com/javier8159)
* **Jos茅 Guillen** - *0801-1999-18261* - [JG20108](https://github.com/JG20108)
* **Laura Galeano** - *0704-1999-00809* - [LeGaleano2](https://github.com/LeGaleano2)
* **Luis Flores** - *0703-2000-03793* - [LuisFlores-C](https://github.com/Luis-FloresC)
* **Marlen Cartagena** - *1318-2001-00003* - [MarlenCartagena](https://github.com/MarlenCartagena)



Tambi茅n puedes mirar la lista de todos los [contribuyentes](https://github.com/Luis-FloresC/notas_backend/graphs/contributors)
quienes han participado en este proyecto. 

## Expresiones de Gratitud 馃巵

* Gracias al Ingeniero [Orlando Betancourth](https://github.com/obetancourth) por compartir su conocimiento con nosotros 馃槑
* Comenta a otros sobre este proyecto 馃摙
* Invita una cerveza 馃嵑 o un caf茅 鈽? a alguien del equipo. 
* Da las gracias p煤blicamente 馃.

---
