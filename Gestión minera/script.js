document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío del formulario

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validaciones simples
        if (username === "" || password === "") {
            errorMessage.textContent = "Por favor, complete todos los campos.";
            errorMessage.style.display = "block";
        } else if (username !== "admin" || password !== "1234") {
            errorMessage.textContent = "Usuario o contraseña incorrectos.";
            errorMessage.style.display = "block";
        } else {
            errorMessage.style.display = "none";
            window.location.href = "dashboard.html"; // Redirige al dashboard
        }
    });
});

// Función para abrir y cerrar el menú lateral
const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
};

// Función para cambiar el color del botón cuando pasa el ratón
const changeButtonColor = (event) => {
    event.target.style.backgroundColor = '#5083DB';
};

// Función para restaurar el color original cuando el ratón sale del botón
const restoreButtonColor = (event) => {
    event.target.style.backgroundColor = '';
};

// Agregar eventos a los botones para cambiar el color
const buttons = document.querySelectorAll('.sidebar a');
buttons.forEach(button => {
    button.addEventListener('mouseenter', changeButtonColor);
    button.addEventListener('mouseleave', restoreButtonColor);
});

// Función para redirigir a la página correspondiente desde el menú lateral
const redirectToPage = (page) => {
    window.location.href = `${page}.html`;
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-personal');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const cuadrilla = document.getElementById('cuadrilla').value;
        const ubicacion = document.getElementById('ubicacion').value;
        const tareas = document.getElementById('tareas').value;
        
        if (!nombre || !cuadrilla || !ubicacion || !tareas) {
            alert('Todos los campos son obligatorios.');
            return;
        }
        
        alert('Personal registrado correctamente.');
        form.reset();  // Limpiar formulario después de la validación
    });
});

// Array para almacenar las máquinas registradas
const maquinariaRegistrada = [];

// Función para agregar o modificar una máquina
document.getElementById('form-maquinaria').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario para manejarlo en JavaScript
    
    // Obtener los datos del formulario
    const nombreMaquina = document.getElementById('nombre-maquina').value;
    const codigoMaquina = document.getElementById('codigo-maquina').value;
    const estadoMaquina = document.getElementById('estado-maquina').value;
    const ubicacionMaquina = document.getElementById('ubicacion-maquina').value;
    
    // Crear un objeto de maquinaria
    const maquinaria = {
        nombreMaquina,
        codigoMaquina,
        estadoMaquina,
        ubicacionMaquina,
    };

    // Comprobar si la maquinaria ya existe para modificarla
    const index = maquinariaRegistrada.findIndex(maq => maq.codigoMaquina === codigoMaquina);

    if (index !== -1) {
        // Si la maquinaria ya existe, modificarla
        maquinariaRegistrada[index] = maquinaria;
    } else {
        // Si no existe, agregarla como nueva
        maquinariaRegistrada.push(maquinaria);
    }

    // Actualizar la tabla de maquinaria
    actualizarTablaMaquinaria();

    // Limpiar el formulario
    document.getElementById('form-maquinaria').reset();
});

// Función para actualizar la tabla de maquinaria
function actualizarTablaMaquinaria() {
    const tabla = document.getElementById('tabla-maquinaria');
    tabla.innerHTML = ''; // Limpiar la tabla antes de agregar las nuevas máquinas

    // Iterar sobre la maquinaria registrada y agregarla a la tabla
    maquinariaRegistrada.forEach((maquinaria) => {
        const fila = document.createElement('tr');
        
        // Crear las celdas para cada dato de la maquinaria
        fila.innerHTML = `
            <td>${maquinaria.nombreMaquina}</td>
            <td>${maquinaria.codigoMaquina}</td>
            <td>${maquinaria.estadoMaquina}</td>
            <td>${maquinaria.ubicacionMaquina}</td>
            <td>
                <button onclick="modificarMaquinaria('${maquinaria.codigoMaquina}')">Modificar</button>
            </td>
        `;
        
        // Agregar la fila a la tabla
        tabla.appendChild(fila);
    });
}

// Función para modificar la maquinaria seleccionada
function modificarMaquinaria(codigoMaquina) {
    const maquinaria = maquinariaRegistrada.find(maq => maq.codigoMaquina === codigoMaquina);

    // Llenar el formulario con los datos de la maquinaria
    document.getElementById('nombre-maquina').value = maquinaria.nombreMaquina;
    document.getElementById('codigo-maquina').value = maquinaria.codigoMaquina;
    document.getElementById('estado-maquina').value = maquinaria.estadoMaquina;
    document.getElementById('ubicacion-maquina').value = maquinaria.ubicacionMaquina;
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-recursos');
    const tablaRecursos = document.getElementById('tabla-recursos').getElementsByTagName('tbody')[0];

    // Array para simular el almacenamiento de los recursos registrados
    let recursosData = [];

    // Manejo de envío del formulario
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombreRecurso = document.getElementById('nombre-recurso').value;
        const tipoRecurso = document.getElementById('tipo-recurso').value;
        const cantidadRecurso = document.getElementById('cantidad-recurso').value;

        if (!nombreRecurso || !tipoRecurso || !cantidadRecurso) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        // Agregar nuevo recurso al array
        const nuevoRecurso = { nombreRecurso, tipoRecurso, cantidadRecurso };
        recursosData.push(nuevoRecurso);

        // Limpiar formulario
        form.reset();

        // Actualizar la tabla con los nuevos datos
        actualizarTabla();
    });

    // Función para actualizar la tabla con los datos de recursos
    function actualizarTabla() {
        // Limpiar la tabla
        tablaRecursos.innerHTML = '';

        // Insertar nuevos registros en la tabla
        recursosData.forEach(recurso => {
            const row = tablaRecursos.insertRow();
            row.insertCell(0).textContent = recurso.nombreRecurso;
            row.insertCell(1).textContent = recurso.tipoRecurso;
            row.insertCell(2).textContent = recurso.cantidadRecurso;
        });
    }
});

// Datos de trabajadores (en la práctica, podrías obtenerlos de un servidor o base de datos)
const trabajadores = [
    { id: 1, nombre: "Juan Pérez", turno: 1 },
    { id: 2, nombre: "Ana Gómez", turno: 1 },
    { id: 3, nombre: "Pedro López", turno: 1 },
    { id: 4, nombre: "María Rodríguez", turno: 2 },
    { id: 5, nombre: "Carlos Ruiz", turno: 2 },
    { id: 6, nombre: "José Martínez", turno: 2 },
    { id: 7, nombre: "Lucía Fernández", turno: 3 },
    { id: 8, nombre: "Marco Díaz", turno: 3 },
    { id: 9, nombre: "Elena Paredes", turno: 3 },
    { id: 10, nombre: "Ricardo Gómez", turno: 4 },
    { id: 11, nombre: "Julia Torres", turno: 4 },
    { id: 12, nombre: "Felipe Soto", turno: 4 }
];

// Datos de tareas asignadas a cada turno
const tareas = {
    1: ["Supervisión de maquinaria", "Mantenimiento preventivo", "Inspección de seguridad"],
    2: ["Monitoreo de procesos", "Reabastecimiento de combustible", "Inspección de equipos"],
    3: ["Operación de maquinaria pesada", "Supervisión de personal", "Control de inventarios"],
    4: ["Inspección de seguridad", "Mantenimiento preventivo", "Monitoreo de maquinaria"]
};

// Función para obtener los trabajadores de un turno
function obtenerTrabajadores(turno) {
    return trabajadores.filter(trabajador => trabajador.turno === turno).map(trabajador => trabajador.nombre).join(", ");
}

// Función para generar la tabla de turnos
function generarTablaTurnos() {
    const turnos = [
        { turno: 1, horario: "8:00 - 20:00", dias: "Miércoles - Miércoles (7x7)" },
        { turno: 2, horario: "20:00 - 8:00", dias: "Miércoles - Miércoles (7x7)" },
        { turno: 3, horario: "8:00 - 20:00", dias: "Miércoles - Miércoles (7x7)" },
        { turno: 4, horario: "20:00 - 8:00", dias: "Miércoles - Miércoles (7x7)" }
    ];

    const tbody = document.getElementById("tabla-turnos-body");
    tbody.innerHTML = "";  // Limpiar tabla

    turnos.forEach(turno => {
        const tr = document.createElement("tr");

        // Celdas con los datos del turno
        const tdTurno = document.createElement("td");
        tdTurno.textContent = `Turno ${turno.turno}`;
        tr.appendChild(tdTurno);

        const tdHorario = document.createElement("td");
        tdHorario.textContent = turno.horario;
        tr.appendChild(tdHorario);

        const tdDias = document.createElement("td");
        tdDias.textContent = turno.dias;
        tr.appendChild(tdDias);

        const tdTareas = document.createElement("td");
        tdTareas.innerHTML = tareas[turno.turno].map(tarea => `<li>${tarea}</li>`).join("");
        tr.appendChild(tdTareas);

        const tdTrabajadores = document.createElement("td");
        tdTrabajadores.textContent = obtenerTrabajadores(turno.turno);
        tr.appendChild(tdTrabajadores);

        tbody.appendChild(tr);
    });
}

// Ejecutar al cargar la página
window.onload = generarTablaTurnos;

// Datos de documentos (en la práctica, estos vendrían de una base de datos o API)
const documentos = [
    { id: 1, nombre: "Permiso de Trabajo Caliente", fecha: "2024-11-05", turno: 1, trabajador: "Juan Pérez" },
    { id: 2, nombre: "Check List de Herramientas", fecha: "2024-11-06", turno: 2, trabajador: "Ana Gómez" },
    { id: 3, nombre: "Check List de Arnes de Seguridad", fecha: "2024-11-07", turno: 3, trabajador: "Pedro López" },
    { id: 4, nombre: "Permiso de Trabajo en Alturas", fecha: "2024-11-05", turno: 4, trabajador: "María Rodríguez" },
    { id: 5, nombre: "Check List de Maquinaria", fecha: "2024-11-08", turno: 1, trabajador: "Carlos Ruiz" }
];

// Función para filtrar documentos por fecha
function filtrarDocumentos() {
    const fechaSeleccionada = document.getElementById("filtro-fecha").value;
    const documentosFiltrados = fechaSeleccionada ? documentos.filter(doc => doc.fecha === fechaSeleccionada) : documentos;
    generarTablaDocumentos(documentosFiltrados);
}

// Función para generar la tabla de documentos
function generarTablaDocumentos(documentos) {
    const tbody = document.getElementById("tabla-documentos-body");
    tbody.innerHTML = "";  // Limpiar tabla

    documentos.forEach(doc => {
        const tr = document.createElement("tr");

        // Celdas con los datos del documento
        const tdNombre = document.createElement("td");
        tdNombre.textContent = doc.nombre;
        tr.appendChild(tdNombre);

        const tdFecha = document.createElement("td");
        tdFecha.textContent = doc.fecha;
        tr.appendChild(tdFecha);

        const tdTurno = document.createElement("td");
        tdTurno.textContent = `Turno ${doc.turno}`;
        tr.appendChild(tdTurno);

        const tdTrabajador = document.createElement("td");
        tdTrabajador.textContent = doc.trabajador;
        tr.appendChild(tdTrabajador);

        const tdAcciones = document.createElement("td");
        tdAcciones.innerHTML = `<button onclick="verDocumento(${doc.id})">Ver</button>`;
        tr.appendChild(tdAcciones);

        tbody.appendChild(tr);
    });
}

// Función para ver el documento (puedes personalizarlo para mostrar más detalles o descargar el archivo)
function verDocumento(id) {
    const doc = documentos.find(d => d.id === id);
    alert(`Mostrando detalles del documento: ${doc.nombre}`);
}

// Ejecutar al cargar la página
window.onload = generarTablaDocumentos(documentos);



// Simulación de informes generados
const informesGenerados = [];

// Función para generar un informe
document.getElementById('form-generar-informe').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario para manejarlo en JavaScript
    
    // Obtener los datos del formulario
    const jefeTurno = document.getElementById('jefe-turno').value;
    const turno = document.getElementById('turno').value;
    const fechaInforme = document.getElementById('fecha-informe').value;
    const tareasRealizadas = document.getElementById('tareas-realizadas').value;
    const recursosUtilizados = document.getElementById('recursos-utilizados').value;
    const avanceTareas = document.getElementById('avance-tareas').value;
    
    // Crear un objeto de informe
    const informe = {
        jefeTurno,
        turno,
        fechaInforme,
        tareasRealizadas,
        recursosUtilizados,
        avanceTareas,
        estado: avanceTareas >= 100 ? 'Completado' : (avanceTareas > 0 ? 'En Curso' : 'Incompleto'),
    };

    // Agregar el informe a la lista de informes generados
    informesGenerados.push(informe);

    // Actualizar la tabla con el nuevo informe
    actualizarTablaInformes();
});

// Función para actualizar la tabla de informes generados
function actualizarTablaInformes() {
    const tabla = document.getElementById('tabla-informes');
    tabla.innerHTML = ''; // Limpiar la tabla antes de agregar los nuevos informes

    // Iterar sobre los informes generados y agregarlos a la tabla
    informesGenerados.forEach((informe) => {
        const fila = document.createElement('tr');
        
        // Crear las celdas para cada dato del informe
        fila.innerHTML = `
            <td>${informe.fechaInforme}</td>
            <td>${informe.turno}</td>
            <td>${informe.jefeTurno}</td>
            <td>${informe.tareasRealizadas}</td>
            <td>${informe.estado}</td>
            <td><button onclick="verDetalles('${informe.fechaInforme}')">Ver Detalles</button></td>
        `;
        
        // Agregar la fila a la tabla
        tabla.appendChild(fila);
    });
}

// Función para buscar un informe por fecha
function buscarInforme() {
    const fechaBuscar = document.getElementById('fecha-buscar').value;
    
    // Filtrar los informes por fecha
    const informesFiltrados = informesGenerados.filter(informe => informe.fechaInforme === fechaBuscar);

    // Actualizar la tabla con los informes filtrados
    const tabla = document.getElementById('tabla-informes');
    tabla.innerHTML = '';

    informesFiltrados.forEach((informe) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${informe.fechaInforme}</td>
            <td>${informe.turno}</td>
            <td>${informe.jefeTurno}</td>
            <td>${informe.tareasRealizadas}</td>
            <td>${informe.estado}</td>
            <td><button onclick="verDetalles('${informe.fechaInforme}')">Ver Detalles</button></td>
        `;
        tabla.appendChild(fila);
    });
}

// Función para ver detalles de un informe (puedes personalizarla)
function verDetalles(fechaInforme) {
    const informe = informesGenerados.find(inf => inf.fechaInforme === fechaInforme);
    alert(`Detalles del informe:\n\nFecha: ${informe.fechaInforme}\nTurno: ${informe.turno}\nJefe de Turno: ${informe.jefeTurno}\nTareas Realizadas: ${informe.tareasRealizadas}\nRecursos Utilizados: ${informe.recursosUtilizados}\nAvance de Tareas: ${informe.avanceTareas}%`);
}

