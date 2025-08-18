const mysql = require('mysql2/promise'); // Importar mysql2/promise para usar promesas
const dotenv = require('dotenv'); // Importar dotenv para manejar variables de entorno
dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const pool = mysql.createPool({ // Crear un pool de conexiones a la base de datos
    host: process.env.DB_HOST, // Usar la variable de entorno DB_HOST
    user: process.env.DB_USER, // Usar la variable de entorno DB_USER
    password: process.env.DB_PASSWORD, // Usar la variable de entorno DB_PASSWORD
    database: process.env.DB_NAME || 'futbol_equipos', // Usar la variable de entorno DB_NAME o 'futbol_equipos' por defecto
    waitForConnections: true, // Esperar conexiones
    connectionLimit: 10, // Límite de conexiones en el pool
    queueLimit: 0 // Sin límite en la cola de conexiones
});
module.exports = pool; // Exportar el pool para usarlo en otras partes de la aplicación
