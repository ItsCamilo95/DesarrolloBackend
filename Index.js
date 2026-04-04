const express = require('express');
require('dotenv').config();
const {corsMiddleware} = require('./shared/middleware/cors');
const {testConexion} = require('./config/database');
const {synCmodels} = require ('./shared/models/index')


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

//Aca se van a escribir las rutas del MVC (Model View Controlller)

app.use('/api/Atletas', require('./routes/AtletasRoutes'))
app.use('/api/MacroCiclo', require('./routes/MacroCicloRoutes'))
app.use('/api/MesoCiclo', require('./routes/MesoCicloRoutes'))
app.use('/api/MicroCiclo', require('./routes/MicroCicloRoutes'))
app.use('/api/EntrenamientoFlash', require('./routes/EntrenamientoFlashRoutes'))
app.use('/api/EntrenamientoDiario', require('./routes/EntrenamientoDiarioRoutes'))
app.use('/api/Chequeo', require('./routes/ChequeoRoutes'))
app.use('/api/Notas', require('./routes/NotasRoutes'))
app.use('/api/ResultadoChequeo', require('./routes/ResultadoChequeoRoutes'))
app.use('/api/Usuarios', require('./routes/UsuariosRoutes'))



// debe de crear la ruta para el micro ciclo,
//  pero antes de eso se debe crear el controlador del micro ciclo 
// y el modelo del micro ciclo, para eso se debe de crear
//  el archivo MicroCiclo.js en la carpeta shared/models 
// y el archivo MicroCicloController.js en la carpeta controllers, 
// luego se debe de crear la ruta para el micro ciclo en la carpeta routes,
//  luego se debe de importar el modelo del micro ciclo en el archivo index.js de la carpeta shared/models,
//  luego se debe de importar el controlador del micro ciclo en el archivo index.js de la carpeta controllers,
//  luego se debe de importar la ruta del micro ciclo en el archivo index.js de la carpeta routes, 
// luego se debe de crear la función para crear un micro ciclo en el controlador del micro ciclo,
//  luego se debe de crear la ruta para crear un micro ciclo en la ruta del micro ciclo,
//  luego se debe de probar la ruta para crear un micro ciclo en postman.


//--------------------------------------


const initializeDatabase = async () => {
    await testConexion()
    await synCmodels()

}


const StartServer = async ()=> {

    try {
        await  initializeDatabase()
        app.listen(PORT, () =>{
            console.log( `esta joda esta corriendo en http://localhost:${PORT}` );
        })
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
}


StartServer()