const db = require("../config/conexion_DB"); // Importar la configuración de la base de datos
class CrudController {
    // Obtiene todos los registros de una tabla
    async obtenertodos(tabla) { // Usar consultas parametrizadas para evitar inyecciones SQL
        try {
            const [resultados] = await db.query(`SELECT * FROM ${tabla}`); 
            return resultados;
        } catch (error) {
            throw error;
        }
    }
    // Obtiene un registro por ID
    async obteneruno(tabla, idcampo, id) {
        try {
            const [resultado] = await db.query(`SELECT * FROM ?? WHERE ?? = ?`, [tabla, idcampo, id]); // Usar consultas parametrizadas, SELECT * FROM ?? WHERE ?? = ? significa que los valores serán reemplazados por los elementos del array
            return resultado[0];
        } catch (error) {
            throw error;
        }
    }
    // Crea un nuevo registro
    async crear(tabla, datos) {
        try {
            const [resultado] = await db.query(`INSERT INTO ?? SET ?`, [tabla, datos]);
            return {...datos, id: resultado.insertId };
        } catch (error) {
            throw error;
        }
    }
    // Actualiza un registro por ID
    async actualizar(tabla, idcampo, id, datos) {
        try {
            const [resultado] = await db.query(`UPDATE ?? SET ? WHERE ?? = ?`, [tabla, datos, idcampo, id]);
            if (resultado.affectedRows === 0) {
                throw new Error('Registro no encontrado');
            }
            return await this.obteneruno(tabla, idcampo, id);
        } catch (error) {
            throw error;
        }
    } 
    // Elimina un registro por ID
    async eliminar(tabla, idcampo, id) {
        try {
            const [resultado] = await db.query(`DELETE FROM ?? WHERE ?? = ?`, [tabla, idcampo, id]);
            if (resultado.affectedRows === 0) {
                throw new Error('Registro no encontrado');
            }
            return { message: 'Registro eliminado exitosamente' };
        } catch (error) {
            throw error;
        }
    }
}
module.exports = CrudController; // Exportar la clase para usarla en otras partes de la aplicación
