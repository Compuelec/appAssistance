# Control de Asistencia para Colegio - Proyecto DUOC

Este repositorio contiene el código fuente de una aplicación de control de asistencia para un colegio, desarrollada como parte del proyecto en el Instituto DUOC. La aplicación está construida utilizando Ionic y Angular.

## Requisitos Previos

- Node.js y npm: Asegúrate de tener Node.js y npm instalados en tu sistema. Puedes descargarlos desde [https://nodejs.org/](https://nodejs.org/).

## Instalación

1. **Version Node**:
   ```bash
   $ v18.18.0
   ```

2. **Clona el repositorio**: 

   ```bash
   git clone https://github.com/Compuelec/appAssistance.git
   ```

3. **Navega al directorio del proyecto**:
   
    ```bash
    cd appAssistance
    ```

4. **Instalar las dependencias**:

    ```bash
    npm install
    ```
5. **Iniciar el servidor de desarrollo**:

    ```bash
    ionic serve
    ```


# Configuración de la API

Este proyecto se conecta a una API que gestiona los datos de asistencia. Puedes encontrar la API en el siguiente enlace: [API del Proyecto.](https://github.com/Compuelec/apiAppAssistance) Para conectarte a la API de manera local, sigue estos pasos:

## Version Node
```bash
$ node v18.18.0
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# docker postgres database
$ docker-compose up -d

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Users created by default

```bash
# Admin user
email: admin@gmail.com
password: 123456789

# Student user
email: estudiante@gmail.com
password: 123456789

# Teacher user
email: profesor@gmail.com
password: 123456789
```

## Demo de API y documentación

<a href="https://apiappassistance.compuelec.cl/doc" target="_blank">LINK</a>

## Apk de prueba
<a href="https://drive.google.com/file/d/1MPalmPyBipxVAljeQOAodVft6wfapY_2/view?usp=drive_link">DESCARGAR APK</a>
