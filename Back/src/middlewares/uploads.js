const multer = require('multer'); //Manejo de archivos

//Almacenamiento en memoria
const storage = multer.memoryStorage(); //Los archivos se almacenan en la memoria del servidor temporalmente
const upload = multer({ storage }); //Configuración de multer para usar el almacenamiento en memoria

module.exports = upload; //Exporta el middleware para usarlo en otras partes de la aplicación
