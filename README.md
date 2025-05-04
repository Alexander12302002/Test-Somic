## Instrucciones de Instalación

1. Clona el repositorio:

   ```shell
   git clone https://github.com/Alexander12302002/Test-Somic.git
   cd Test-Somic
   ```

2. Usa la versión de node que esta en el .nvmrc

   ```shell
   nvm use
   ```

3. Ingrese a las 2 carpetas y instale todas las dependencias de cada una

   ```sh
   cd api/
   npm install
   ```

    ```sh
   cd client/
   npm install
   ```

4. Configura las variables de entorno (ver sección siguiente).

5. Inicia la aplicación en cada carpeta correr el siguiente comando:

   ```sh
   cd api/
   npm run start:dev
   ```

   ```sh
   cd client/
   npm run dev
   ```

## Configuración del Entorno (.env)

Crea un archivo `.env` en la carpeta api con las siguientes variables:`

```sh
MONGO_ACCESS=remote_access # si accedes de manera remota o local
MONGO_USER=your_mongodb_username_here
MONGO_PWD=your_mongodb_password_here
MONGO_HOST=your_mongodb_host_here # ejemplo: "cluster0.mongodb.net"
MONGO_PORT=27017
MONGO_DB_NAME=your_database_name_here
```