const express = require('express');
const router = express.Router();
const CrudController = require('../controllers/crud.controller');

const crud = new CrudController();

const tabla = 'equipos';
const idcampo = 'id_equipo';
//El funcionamiento de estas tablas es dirigirse al crud para dar el funcionamiento de actualziar, elminar, crear etc.. para las tablas ue ingresemos en rutas
router.get('/', async (req, res) => {
    try {
        const equipos = await crud.obtenertodos(tabla);
        res.json(equipos);
    } catch (error) {
        console.error('Error al obtener equipos:', error);
        res.status(500).json({ error: 'Error al obtener equipos' });
    }
});
//el :id es que siempre va a aputar a un id
router.get('/:id', async (req, res) => {
    try {
        const dato = await crud.obteneruno(tabla, idcampo, req.params.id);
        res.json(dato);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener equipos' });
    }
});

router.post('/:id', async (req, res) => {
    try {
        const nuevodato = await crud.crear(tabla, idcampo, req.params.id);
        res.status(201).json(nuevodato);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const actualizado = await crud.actualizar(tabla, idcampo, req.params.id, req.body);
        res.json(actualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await crud.eliminar(tabla, idcampo, id);
        res.json(resultado);
    } catch (error) {
        if (error.message === 'Registro no encontrado') {
            res.status(404).json({ error: "Dato no encontrado" });
        } else {
            res.status(500).json({ error: 'Error al eliminar el dato' + error.message });
        }
    }
});
module.exports = router;
        