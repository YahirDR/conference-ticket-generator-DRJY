// ======================
// ELEMENTOS DEL DOM
// ======================
const avatarContainer = document.getElementById("avatarContainer");
const inputFile = document.getElementById("getFile");
const uploadedImage = document.getElementById("uploadedImage");
const helpText = document.getElementById("AyudaTextoMensaje");

const btnContainer = document.getElementById("btnContainer");
const btnRemove = document.getElementById("btnRemove");
const btnChange = document.getElementById("btnChange");

const uploadText = document.getElementById("uploadText");

// Imagen por defecto
const defaultImage = "assets/images/icon-upload.svg";

function cambiarEstadoAvatar(tieneImagen) {

    if (tieneImagen) {

        // Ocultar el mensaje
        uploadText.style.display = "none";

        // Mostrar los botones
        btnContainer.style.display = "flex";

    } else {

        // Mostrar nuevamente el mensaje
        uploadText.style.display = "block";

        // Ocultar botones
        btnContainer.style.display = "none";

        // Restaurar imagen por defecto
        uploadedImage.src = defaultImage;

        // Limpiar el input
        inputFile.value = "";

    }

}

// ======================
// ABRIR EXPLORADOR
// ======================
avatarContainer.addEventListener("click", () => {
    inputFile.click();
});

// ======================
// SELECCIONAR IMAGEN
// ======================
inputFile.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (file) {
        validarImagen(file);
    }

});

// ======================
// DRAG & DROP
// ======================
avatarContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    avatarContainer.classList.add("dragging");
});

avatarContainer.addEventListener("dragleave", () => {
    avatarContainer.classList.remove("dragging");
});

avatarContainer.addEventListener("drop", (e) => {

    e.preventDefault();

    avatarContainer.classList.remove("dragging");

    const file = e.dataTransfer.files[0];

    if (file) {
        validarImagen(file);
    }

});

// ======================
// VALIDAR IMAGEN
// ======================
function validarImagen(file) {

    const tiposPermitidos = [
        "image/jpeg",
        "image/png"
    ];

    if (!tiposPermitidos.includes(file.type)) {

        helpText.textContent =
            "Only JPG and PNG files are allowed.";

        return;
    }

    if (file.size > 500 * 1024) {

        helpText.textContent =
            "File too large. Max size is 500KB.";

        return;
    }

    // Restaurar mensaje
    helpText.textContent =
        "Upload your photo (JPG or PNG, max size: 500KB).";

    mostrarImagen(file);

}

// ======================
// MOSTRAR IMAGEN
// ======================
function mostrarImagen(file) {

    const reader = new FileReader();

    reader.onload = function(e){

        uploadedImage.src = e.target.result;

        cambiarEstadoAvatar(true);

    }

    reader.readAsDataURL(file);

}

// ======================
// CAMBIAR IMAGEN
// ======================
btnChange.addEventListener("click", (e) => {

    e.stopPropagation();

    inputFile.click();

});

// ======================
// ELIMINAR IMAGEN
// ======================
btnRemove.addEventListener("click", (e) => {

    e.stopPropagation();

    cambiarEstadoAvatar(false);

});

//MOSTRAR BOTON DE REMOVER Y CAMBIAR IMAGEN SI YA HAY UNA IMAGEN CARGADA
cambiarEstadoAvatar(false);