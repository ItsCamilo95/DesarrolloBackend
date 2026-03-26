# AppEntrenamientoBackend

Repositorio backend para la aplicación de entrenamiento (API REST).

## Descripción

API simple construida con Node.js, Express y Sequelize (MySQL) para manejar atletas.

## Requisitos

- Node.js 14+ (recomendado 16+)
- npm o yarn
- MySQL (o servicio compatible) disponible y accesible
- Git (para clonar el repositorio)

## Instalación

Sigue estos pasos después de clonar el repositorio.

### 1) Instalar Node.js (si no lo tienes)

Windows (recomendado para gestión de versiones):

- Instalar `nvm-windows` desde https://github.com/coreybutler/nvm-windows/releases y luego usarlo para instalar Node:

```powershell
nvm install 16.20.0
nvm use 16.20.0
node -v
npm -v
```

Alternativa (instalador oficial): descargar desde https://nodejs.org/ y ejecutar el instalador.

macOS / Linux (opcional): usar `nvm`:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
source ~/.profile
nvm install --lts
node -v
```

Verifica que `node` y `npm` están instalados:

```bash
node -v
npm -v
```

### 2) Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd AppEntrenamientoBackend
```

### 3) Instalar dependencias

```bash
npm install
```

### 4) Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto con al menos estas variables:

```env
DB_NAME=mi_basedatos
DB_USER=mi_usuario
DB_PASSWORD=mi_contraseña
DB_HOST=localhost
DB_PORT=3306
PORT=3000
```

Ajusta valores según tu entorno. `config/database.js` usa estas variables para conectar a MySQL.

### 5) Crear la base de datos

En MySQL crea la base de datos indicada en `DB_NAME` y otorga permisos al usuario especificado:

```sql
CREATE DATABASE mi_basedatos;
GRANT ALL PRIVILEGES ON mi_basedatos.* TO 'mi_usuario'@'localhost' IDENTIFIED BY 'mi_contraseña';
```

### 6) Ejecutar la aplicación

En desarrollo:

```bash
npm run dev
```

El script `dev` usa `nodemon index.js`. Para producción añade en `package.json` un script `start` que ejecute `node index.js` y usa PM2 o un gestor de procesos.

## Variables de entorno

Resumen de las variables usadas por la aplicación (`config/database.js`):

- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`: usados por Sequelize para conectar a MySQL.
- `PORT`: puerto en el que se expondrá la API.

## Consideraciones al clonar

- Revisa `config/database.js` si necesitas cambiar el dialecto o las opciones de pool.
- Crea la base de datos y asigna permisos al usuario indicado en `.env` antes de iniciar la app.
- Si usas un servidor remoto o contenedor, abre el puerto de MySQL y ajusta `DB_HOST`/`DB_PORT`.
- Este repositorio no incluye migraciones automáticas ni seeders; los modelos están en `shared/models` y Sequelize debe sincronizarse si se agrega lógica para ello.

## Rutas principales

- Las rutas relacionadas con atletas están en `routes/AtletasRoutes.js` y los controladores en `controllers/AtletasControllers.js`.
