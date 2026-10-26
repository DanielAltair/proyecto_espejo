# DevTask - Lista de tareas

Aplicación web sencilla para gestionar tareas con JavaScript vanilla. Permite añadir tareas, asignarles una prioridad, filtrar por estado y marcarlas como completadas o pendientes.

## Funcionalidades

- Añadir tareas con título y prioridad (alta, media o baja).
- Marcar tareas como completadas o pendientes.
- Filtrar tareas por todas, pendientes o completadas.
- Mostrar una lista interactiva y una lista espejo de solo lectura.
- Actualizar ambas listas desde el mismo estado de tareas.
- Usar delegación de eventos: el contenedor de la lista interactiva tiene un único escuchador para los botones de estado.

## Tecnologías

- HTML
- CSS
- JavaScript (ES6+, sin frameworks)

## Cómo ejecutar el proyecto

1. Descarga o clona este repositorio.
2. Abre el archivo `index.html` directamente en un navegador.
3. También puedes abrir la carpeta en Visual Studio Code y ejecutar `index.html` con la extensión Live Server.

No es necesario instalar dependencias.

## Archivos

- `index.html`: estructura de la aplicación y contenedores de las listas.
- `style.css`: estilos de la interfaz.
- `app.js`: estado, renderizado, filtros y gestión de eventos.

## Funcionamiento de la lista espejo

El array `tareas` es la fuente de datos de ambas listas. Cada vez que se añade una tarea, se cambia su estado o se aplica un filtro, `pintarTareas()` vuelve a renderizar la lista interactiva y la lista espejo. La lista espejo muestra el título y el estado de cada tarea, sin controles para modificarla.
