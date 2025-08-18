const API_URL = 'http://localhost:3000/api/equipos'; // URL de la API

async function obtenertodos() { // Función para obtener todos los equipos (GET)
    const res = await fetch(API_URL); // Realiza una solicitud GET a la API, fetch es una función que permite hacer solicitudes HTTP
    const equipos = await res.json(); // Convierte la respuesta en formato JSON a un objeto JavaScript
    return equipos; 
}

async function crearequipo(data) { // Función para crear un nuevo equipo (POST)
    const res = await fetch(API_URL, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' // Especifica que el cuerpo de la solicitud es JSON
        },
        body: JSON.stringify(data) // Convierte el objeto data a una cadena JSON
    });
    return await res.json();
}

async function actualizarequipo(id, data) { // Función para actualizar un equipo existente (PUT)
    const res = await fetch(`${API_URL}/${id}`, { // Utiliza la URL del equipo específico para actualizar
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return await res.json();
}

async function eliminarequipo(id) { // Función para eliminar un equipo (DELETE)
    const res = await fetch(`${API_URL}/${id}`, {  
        method: 'DELETE'
    });
    return await res.json(); 
}

// Referencias al DOM
const contenedorcards = document.getElementById('contenedorcards'); // Obtiene el contenedor donde se mostrarán los cards de equipos
const templatecard = document.getElementById('templatecard'); // Obtiene el template del card de equipo
const datoform = document.getElementById('datoform'); // Obtiene el formulario para crear/editar equipos
const nombre = document.getElementById('nombre'); // Obtiene el campo de entrada para el nombre del equipo
const id_equipo = document.getElementById('id_equipo'); // Obtiene el campo oculto para el ID del equipo
const btncancelar = document.getElementById('btncancelar'); // Obtiene el botón de cancelar

//Mostrar equipos al cargar la pagina en el template
async function mostrarequipos() { 
    contenedorcards.innerHTML = ''; // Limpia el contenedor antes de mostrar los equipos, el innerHTML es una propiedad que establece o devuelve el contenido HTML de un elemento
    const equipos = await obtenertodos(); // Obtiene todos los equipos llamando a la función obtenertodos
    equipos.forEach(equipo => { // Itera sobre cada equipo obtenido, forEach es un método de los arrays que ejecuta una función para cada elemento del array
        const clone = templatecard.content.cloneNode(true); // Clona el contenido del templatecard, content es una propiedad que contiene el contenido del template
        clone.querySelector('.nombreequipo').textContent = equipo.nombre_equipo; 
        clone.querySelector('.btneditar').onclick = () => cargarequipoparaedtar(equipo);
        clone.querySelector('.btneliminar').onclick = () => eliminarequipohandler(equipo.id_equipo);
        contenedorcards.appendChild(clone); // Añade el clone al contenedor de cards, appendChild es un método que añade un nodo al final de la lista de hijos de un nodo padre
    });
}

//Guadar o actualizar equipos
    datoform.onsubmit = async (e) => { //Este evento se ejecuta cuando se envia el formulario, ya sea para crear o actualizar un equipo
        e.preventDefault(); //Previene el comportamiento por defecto del formulario, que es recargar la página
        const data = { nombre_equipo: nombre.value }; //Se crea un objeto data con el nombre del equipo ingresado en el formulario
        if (id_equipo.value) { //Si el campo id_equipo tiene un valor, significa que se está actualizando un equipo existente
            await actualizarequipo(id_equipo.value, data); //Se llama a la función actualizarequipo con el id del equipo y los datos del formulario
        } else {
            await crearequipo(data); //Si el campo id_equipo está vacío, significa que se está creando un nuevo equipo, se llama a la función crearequipo con los datos del formulario
        }
        datoform.reset(); //Se resetea el formulario para limpiar los campos
        id_equipo.value = '';
        await mostrarequipos(); //Se vuelve a mostrar la lista de equipos actualizada
        alert('Equipo guardado correctamente'); //Se muestra un mensaje de éxito al usuario
    };
    // Botón cancelar
    btncancelar.onclick = () => { //Este boton cumple la funcion de cancelar, hace que id "datoform" se resetee y el campo de id_equipo se limpie
        datoform.reset();
        id_equipo.value = '';
    };
    //Cargar equipo para editar
    function cargarequipoparaedtar(equipo) {
        id_equipo.value = equipo.id_equipo; // Asigna el id del equipo al campo oculto id_equipo
        nombre.value = equipo.nombre_equipo; // Asigna el nombre del equipo al campo de entrada nombre
    }
    // Eliminar equipo
    async function eliminarequipohandler(id) {
    if (confirm('¿Estás seguro de eliminar este equipo?')) {
        await eliminarequipo(id);  // Llama a la función eliminarequipo con el id del equipo a eliminar
        await mostrarequipos(); // Vuelve a mostrar la lista de equipos actualizada después de eliminar
    }
};
    mostrarequipos(); // Llama a la función mostrarequipos al cargar la página para mostrar los equipos existentes