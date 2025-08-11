const API_URL = 'http://localhost:3000/api/equipos';

async function obtenerequipos() {
    const res = await fetch(API_URL);
    const equipos = await res.json();
    return equipos;
}

async function crearequipo(data) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function actualizarequipo(id, data) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function eliminarequipo(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    return await res.json();
}

// Referencias al DOM
const contenedorcards = document.getElementById('contenedorcards');
const templatecard = document.getElementById('templatecard');
const datoform = document.getElementById('datoform');
const nombre = document.getElementById('nombre');
const id_equipo = document.getElementById('id_equipo');
const btncancelar = document.getElementById('btncancelar');

//Mostrar equipos al cargar la pagina en el template
async function mostrarequipos() {
    contenedorcards.innerHTML = '';
    const equipos = await obtenerequipos();
    equipos.forEach(equipo => {
        const clone = templatecard.content.cloneNode(true);
        clone.querySelector('.nombreequipos').textContent = equipo.nombre_equipo;
        clone.querySelector('.btneditar').onclick = () => cargarequipoparaeditar(equipo);
        clone.querySelector('.btneliminar').onclick = () => eliminarequipohandler(equipo.id_equipo);
        contenedorcards.appendChild(clone);
    });
}

//Guadar o actualizar equipos
    datoform.onsubmit = async (e) => {
        e.preventDefault();
        const data = { nombre_equipo: nombre.value };
        if (id_equipo.value) {
            await actualizarequipo(id_equipo.value, data);
        } else {
            await crearequipo(data);
        }
        datoform.reset();
        id_equipo.value = '';
        await mostrarequipos();
    };
    // Botón cancelar
    btncancelar.onclick = () => {
        datoform.reset();
        id_equipo.value = '';
    };
    //Cargar equipo para editar
    function cargarequipoparaedtar(equipo) {
        id_equipo.value = equipo.id_equipo;
        nombre.value = equipo.nombre_equipo;
    }
    // Eliminar equipo
    async function eliminarequipohandler(id) {
    if (confirm('¿Estás seguro de eliminar este equipo?')) {
        await eliminarequipo(id);
        await mostrarequipos();
    }
};
    mostrarequipos();