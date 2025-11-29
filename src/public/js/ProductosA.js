// -----------------------------------------------------
//  Menu.js – Control del menú Swanky Dropdown
// -----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    console.log("Menu.js cargado correctamente.");

    // Seleccionamos todos los radios del menú
    const radios = document.querySelectorAll('.swanky_wrapper input[type="radio"]');

    // Seleccionamos todos los contenedores de contenido
    const contenidos = document.querySelectorAll(".swanky_wrapper__content");

    // Función para cerrar todas las secciones
    function cerrarTodo() {
        contenidos.forEach(content => {
            content.style.maxHeight = "0px";
            content.style.opacity = "0";
            content.style.transition = "all 0.4s ease";
        });
    }

    // Evento cuando se selecciona un radio
    radios.forEach(radio => {
        radio.addEventListener("change", () => {
            cerrarTodo();

            // Contenedor del label seleccionado
            const label = radio.nextElementSibling;
            const contenido = label.querySelector(".swanky_wrapper__content");

            if (contenido) {
                contenido.style.maxHeight = contenido.scrollHeight + "px";
                contenido.style.opacity = "1";
            }
        });
    });

    // Permite abrir una sección desde el exterior
    window.openMenu = function (idMenu) {
        const target = document.getElementById(idMenu);
        if (target) {
            target.checked = true;
            target.dispatchEvent(new Event("change"));
        }
    };

    // Permite colapsar todo desde una función externa
    window.cerrarMenu = function () {
        cerrarTodo();
        radios.forEach(radio => radio.checked = false);
    };
});
