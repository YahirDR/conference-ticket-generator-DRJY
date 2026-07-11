// ======================
// ELEMENTOS IMPORTANTES
// ======================
const ticketData = {
    avatar: "",
    fullName: "",
    email: "",
    github: ""
};

const form = document.getElementById("ticket_form");
const avatarContainer = document.getElementById("avatarContainer");
const inputFile = document.getElementById("getFile");
const uploadedImage = document.getElementById("uploadedImage");
const helpText = document.getElementById("AyudaTextoMensaje");

const btnContainer = document.getElementById("btnContainer");
const btnRemove = document.getElementById("btnRemove");
const btnChange = document.getElementById("btnChange");

const uploadText = document.getElementById("uploadText");

const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("emailUser");
const githubInput = document.getElementById("githubUsername");

// Imagen por defecto
const defaultImage = "assets/images/icon-upload.svg";

// ======================
// FUNCIONES DE AVATAR
// ======================
function cambiarEstadoAvatar(tieneImagen) {
    if (tieneImagen) {
        uploadText.style.display = "none";
        btnContainer.style.display = "flex";
    } else {
        uploadText.style.display = "block";
        btnContainer.style.display = "none";
        uploadedImage.src = defaultImage;
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
    if (file) validarImagen(file);
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
    if (file) validarImagen(file);
});

// ======================
// VALIDAR IMAGEN
// ======================
function validarImagen(file) {
    const tiposPermitidos = ["image/jpeg", "image/png"];

    if (!tiposPermitidos.includes(file.type)) {
        helpText.textContent = "Only JPG and PNG files are allowed.";
        return;
    }

    if (file.size > 500 * 1024) {
        helpText.textContent = "File too large. Max size is 500KB.";
        return;
    }

    helpText.textContent = "Upload your photo (JPG or PNG, max size: 500KB).";
    mostrarImagen(file);
}

// ======================
// MOSTRAR IMAGEN
// ======================
function mostrarImagen(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        uploadedImage.src = e.target.result;
        ticketData.avatar = e.target.result;   // ← Guardamos la imagen
        cambiarEstadoAvatar(true);
    };
    reader.readAsDataURL(file);
}

// ======================
// BOTONES CAMBIAR / ELIMINAR
// ======================
btnChange.addEventListener("click", (e) => {
    e.stopPropagation();
    inputFile.click();
});

btnRemove.addEventListener("click", (e) => {
    e.stopPropagation();
    cambiarEstadoAvatar(false);
});

// ======================
// GENERAR TICKET
// ======================
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Guardar datos del formulario
    ticketData.fullName = fullNameInput.value.trim();
    ticketData.email = emailInput.value.trim();
    ticketData.github = githubInput.value.trim();

    // Llamar a la función que genera el ticket
    generarTicket();
});

function generarTicket() {

    if (!ticketData.fullName || !ticketData.email || !ticketData.github) {
        alert("Por favor completa todos los campos obligatorios.");
        return;
    }

    // Llenar el ticket
    document.getElementById('userName').textContent = ticketData.fullName;
    document.getElementById('userEmail').textContent = ticketData.email;
    document.getElementById('ticketUserName').textContent = ticketData.fullName;

    let githubClean = ticketData.github.trim();
    if (githubClean.startsWith('@')) githubClean = githubClean.substring(1);
    document.getElementById('ticketGithub').textContent = githubClean;

    // Avatar
    const ticketAvatar = document.getElementById('ticketAvatar');
    ticketAvatar.src = ticketData.avatar || defaultImage;

    // Número de ticket
    const ticketNum = Math.floor(10000 + Math.random() * 90000);
    document.getElementById('ticketNumber').textContent = `#${ticketNum}`;

    // Mostrar ticket y ocultar formulario
    form.style.display = 'none';
    document.getElementById('ticketContainer').style.display = 'flex';
}

// Inicializar estado del avatar
cambiarEstadoAvatar(false);