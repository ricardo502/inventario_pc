const API_URL = 'api.php';
const form = document.getElementById('formEquipo');
const tabla = document.getElementById('tablaEquipos');
const btnGuardar = document.getElementById('btnGuardar');

// Cargar equipos al iniciar la página
document.addEventListener('DOMContentLoaded', obtenerEquipos);

// 1. LEER (GET)
async function obtenerEquipos() {
    const respuesta = await fetch(API_URL);
    const equipos = await respuesta.json();
    
    tabla.innerHTML = '';
    equipos.forEach(eq => {
        tabla.innerHTML += `
            <tr>
                <td>${eq.id}</td>
                <td>${eq.nombre}</td>
                <td><span class="badge bg-secondary">${eq.categoria}</span></td>
                <td>$${parseFloat(eq.precio).toFixed(2)}</td>
                <td>${eq.stock} uds.</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick='cargarParaEditar(${JSON.stringify(eq)})'>Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarEquipo(${eq.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// 2. CREAR (POST) y ACTUALIZAR (PUT)
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('equipoId').value;
    const datos = {
        id: id,
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        precio: document.getElementById('precio').value,
        stock: document.getElementById('stock').value
    };

    // Si hay ID, actualizamos (PUT); si no, creamos (POST)
    const metodo = id ? 'PUT' : 'POST';

    await fetch(API_URL, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    });

    form.reset();
    document.getElementById('equipoId').value = '';
    btnGuardar.textContent = 'Guardar';
    btnGuardar.classList.replace('btn-success', 'btn-primary');
    
    obtenerEquipos(); // Recargar la tabla
});

// Preparar el formulario para editar
function cargarParaEditar(equipo) {
    document.getElementById('equipoId').value = equipo.id;
    document.getElementById('nombre').value = equipo.nombre;
    document.getElementById('categoria').value = equipo.categoria;
    document.getElementById('precio').value = equipo.precio;
    document.getElementById('stock').value = equipo.stock;

    btnGuardar.textContent = 'Actualizar';
    btnGuardar.classList.replace('btn-primary', 'btn-success');
}

// 3. ELIMINAR (DELETE)
async function eliminarEquipo(id) {
    if (confirm('¿Estás seguro de eliminar este equipo del inventario?')) {
        await fetch(`${API_URL}?id=${id}`, {
            method: 'DELETE'
        });
        obtenerEquipos(); // Recargar la tabla
    }
}

