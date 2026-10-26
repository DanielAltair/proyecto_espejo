// 1. Estado de la aplicación (Datos iniciales que simulan venir de una base de datos)
let tareas = [
  { id: 1, titulo: 'Aprender la sintaxis de ES6', prioridad: 'Alta', completada: true },
  { id: 2, titulo: 'Dominar la asincronía y Fetch', prioridad: 'Media', completada: false },
  { id: 3, titulo: 'Migrar el proyecto a Angular', prioridad: 'Baja', completada: false }
];

// Estado del filtro activo actual ('Todas', 'Pendientes', 'Completadas')
let filtroActual = 'Todas';

// 2. Selectores del DOM principales
const formulario = document.querySelector('#form-tareas');
const inputTitulo = document.querySelector('#input-titulo');
const selectPrioridad = document.querySelector('#select-prioridad');
const listaContenedor = document.querySelector('#lista-tareas');
const listaEspejo = document.querySelector('#lista-espejo');
const loadingState = document.querySelector('#loading-state');
const botonesFiltro = document.querySelectorAll('.btn-filtro');

// 3. FUNCIÓN ASÍNCRONA (AJAX simulado): Debe ejecutarse al arrancar la web
async function inicializarApp() {
  await new Promise(resolve => setTimeout(resolve, 1500));
  loadingState.style.display = 'none';
  pintarTareas();
}

// 4. FUNCIÓN DE RENDERIZADO: Encargada de pintar los nodos en el HTML
function pintarTareas() {
  listaContenedor.innerHTML = '';
  listaEspejo.innerHTML = '';

  const tareasFiltradas = tareas.filter(tarea => {
    if (filtroActual === 'Pendientes') return !tarea.completada;
    if (filtroActual === 'Completadas') return tarea.completada;
    return true;
  });

  tareasFiltradas.forEach(tarea => {
    const li = document.createElement('li');
    li.classList.add('item-tarea', tarea.prioridad);

    if (tarea.completada) {
      li.classList.add('completada');
    }

    const titulo = document.createElement('span');
    titulo.textContent = tarea.titulo;
    li.appendChild(titulo);

    const botonEstado = document.createElement('button');
    botonEstado.type = 'button';
    botonEstado.textContent = tarea.completada
      ? 'Marcar pendiente'
      : 'Marcar completada';

    // El contenedor usará estos datos para identificar el botón y la tarea.
    botonEstado.classList.add('btn-accion');
    botonEstado.dataset.id = tarea.id;

    li.appendChild(botonEstado);
    listaContenedor.appendChild(li);

    const liEspejo = document.createElement('li');
    liEspejo.classList.add('item-tarea', tarea.prioridad);

    const estado = tarea.completada ? 'Hecho' : 'Pendiente';
    liEspejo.textContent = `${tarea.titulo} — Estado: ${estado}`;

    if (tarea.completada) {
      liEspejo.classList.add('completada');
    }

    listaEspejo.appendChild(liEspejo);
  });
}

// 5. MANEJO DE EVENTOS: Captura de formulario
formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const titulo = inputTitulo.value.trim();
  const prioridad = selectPrioridad.value;

  if (!titulo) return;

  const nuevaTarea = {
    id: Date.now(),
    titulo,
    prioridad,
    completada: false
  };

  tareas = [...tareas, nuevaTarea];
    pintarTareas();
    formulario.reset();
});

// 6. MANEJO DE EVENTOS: Captura de botones de filtrado
botonesFiltro.forEach(boton => {
  boton.addEventListener('click', (event) => {
    // Quitar clase active al botón anterior y ponérsela al pulsado
    document.querySelector('.btn-filtro.active').classList.remove('active');
    event.target.classList.add('active');

    filtroActual = boton.dataset.filtro;
    pintarTareas();
  });
});

listaContenedor.addEventListener('click', (event) => {
  if (!event.target.classList.contains('btn-accion')) return;

  const idBuscado = Number(event.target.dataset.id);

  tareas = tareas.map(tarea =>
    tarea.id === idBuscado
      ? { ...tarea, completada: !tarea.completada }
      : tarea
  );

  pintarTareas();
});

// Arrancar la aplicación
inicializarApp();