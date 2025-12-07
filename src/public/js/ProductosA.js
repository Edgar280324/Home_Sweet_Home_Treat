// ======================================
// Vista previa de imagen
// ======================================
document.addEventListener("DOMContentLoaded", () => {
    const inputImagen = document.querySelector("#imagen");
    const vistaPrevia = document.querySelector("#vista-previa");

    if (inputImagen) {
        inputImagen.addEventListener("change", function () {
            const archivo = this.files[0];
            if (archivo) {
                vistaPrevia.src = URL.createObjectURL(archivo);
            }
        });
    }
});

// ======================================
// Validación rápida
// ======================================
function validarFormulario() {
    const nombre = document.querySelector("#nombre").value.trim();
    const precio = document.querySelector("#precio").value.trim();

    if (nombre === "" || precio === "") {
        alert("Completa todos los campos obligatorios.");
        return false;
    }

    return true;
}
