document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-login");
  if (form) {
    form.addEventListener("submit", procesarLogin);
  }
});

function procesarLogin(e) {
  e.preventDefault();
  
  const errorCorreo = document.getElementById("error-correo");
  const errorPass = document.getElementById("error-contrasena");
  errorCorreo.textContent = "";
  errorPass.textContent = "";

  const correo = document.getElementById("correo").value.trim().toLowerCase();
  const contrasena = document.getElementById("contrasena").value;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let hayErrores = false;

  if (!correo) {
    errorCorreo.textContent = "El correo es obligatorio.";
    hayErrores = true;
  } else if (!regexEmail.test(correo)) {
    errorCorreo.textContent = "Formato de correo no válido.";
    hayErrores = true;
  }

  if (!contrasena) {
    errorPass.textContent = "La contraseña es obligatoria.";
    hayErrores = true;
  }

  if (hayErrores) return;

  const usuariosGuardados = JSON.parse(localStorage.getItem("levelup_usuarios")) || [];
  const usuario = usuariosGuardados.find(u => u.correo === correo);

  if (!usuario) {
    errorCorreo.textContent = "La cuenta de correo ingresada no existe.";
    return;
  }

  if (usuario.contrasena !== contrasena) {
    errorPass.textContent = "Contraseña incorrecta. Intente nuevamente.";
    return;
  }

  localStorage.setItem("levelup_usuario_activo", JSON.stringify({
    nombre: usuario.nombre,
    correo: usuario.correo,
    esDuoc: usuario.esDuoc
  }));

  alert(`¡Bienvenido/a de nuevo, ${usuario.nombre}!`);
  window.location.href = "inicio.html";
}