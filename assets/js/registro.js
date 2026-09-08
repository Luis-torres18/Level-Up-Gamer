document.addEventListener("DOMContentLoaded", () => {
  inicializarSelectoresRegion();
  const form = document.getElementById("form-registro");
  if (form) {
    form.addEventListener("submit", procesarRegistro);
  }
});

function inicializarSelectoresRegion() {
  const selectRegion = document.getElementById("region");
  const selectComuna = document.getElementById("comuna");

  if (!selectRegion || !selectComuna) return;

  selectRegion.innerHTML = '<option value="">-- Seleccione una región --</option>';
  for (const region in REGIONES_CHILE) {
    const opt = document.createElement("option");
    opt.value = region;
    opt.textContent = region;
    selectRegion.appendChild(opt);
  }

  selectRegion.addEventListener("change", () => {
    const seleccion = selectRegion.value;
    selectComuna.innerHTML = '<option value="">-- Seleccione una comuna --</option>';

    if (seleccion && REGIONES_CHILE[seleccion]) {
      selectComuna.disabled = false;
      REGIONES_CHILE[seleccion].forEach(comuna => {
        const opt = document.createElement("option");
        opt.value = comuna;
        opt.textContent = comuna;
        selectComuna.appendChild(opt);
      });
    } else {
      selectComuna.disabled = true;
    }
  });
}

function mostrarError(campoId, mensaje) {
  const errorSpan = document.getElementById(`error-${campoId}`);
  if (errorSpan) {
    errorSpan.textContent = mensaje;
  }
}

function limpiarErrores() {
  const errores = document.querySelectorAll(".error-message");
  errores.forEach(span => span.textContent = "");
}

function procesarRegistro(e) {
  e.preventDefault();
  limpiarErrores();

  let hayErrores = false;

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim().toLowerCase();
  const confirmarCorreo = document.getElementById("confirmar-correo").value.trim().toLowerCase();
  const contrasena = document.getElementById("contrasena").value;
  const confirmarContrasena = document.getElementById("confirmar-contrasena").value;
  const telefono = document.getElementById("telefono").value.trim();
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;

  const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  if (!nombre) {
    mostrarError("nombre", "El nombre completo es obligatorio.");
    hayErrores = true;
  } else if (!regexNombre.test(nombre)) {
    mostrarError("nombre", "El nombre sólo puede contener letras y espacios.");
    hayErrores = true;
  } else if (nombre.length > 50) {
    mostrarError("nombre", "Máximo 50 caracteres permitidos.");
    hayErrores = true;
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usuariosGuardados = JSON.parse(localStorage.getItem("levelup_usuarios")) || [];

  if (!correo) {
    mostrarError("correo", "El correo electrónico es obligatorio.");
    hayErrores = true;
  } else if (!regexEmail.test(correo)) {
    mostrarError("correo", "Ingrese un formato de correo válido (ej: usuario@dominio.cl).");
    hayErrores = true;
  } else if (usuariosGuardados.some(u => u.correo === correo)) {
    mostrarError("correo", "Este correo ya se encuentra registrado.");
    hayErrores = true;
  }

  if (!confirmarCorreo) {
    mostrarError("confirmar-correo", "Debe confirmar su correo.");
    hayErrores = true;
  } else if (correo !== confirmarCorreo) {
    mostrarError("confirmar-correo", "Los correos electrónicos no coinciden.");
    hayErrores = true;
  }

  const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%!.*])[A-Za-z\d@#$%!.*]{8,}$/;
  if (!contrasena) {
    mostrarError("contrasena", "La contraseña es obligatoria.");
    hayErrores = true;
  } else if (!regexPass.test(contrasena)) {
    mostrarError("contrasena", "Mínimo 8 car., 1 mayúscula, 1 minúscula, 1 número y 1 símbolo (@#$%.*!).");
    hayErrores = true;
  }

  if (!confirmarContrasena) {
    mostrarError("confirmar-contrasena", "Confirme su contraseña.");
    hayErrores = true;
  } else if (contrasena !== confirmarContrasena) {
    mostrarError("confirmar-contrasena", "Las contraseñas no coinciden.");
    hayErrores = true;
  }

  if (telefono) {
    const regexTel = /^(\+?56)?\s?9\d{8}$/;
    const limpio = telefono.replace(/\s+/g, '');
    if (!regexTel.test(limpio)) {
      mostrarError("telefono", "Formato de móvil chileno inválido (ej: +56 9 1234 5678 o 912345678).");
      hayErrores = true;
    }
  }

  if (!region) {
    mostrarError("region", "Seleccione una región.");
    hayErrores = true;
  }
  if (!comuna) {
    mostrarError("comuna", "Seleccione una comuna.");
    hayErrores = true;
  }

  if (hayErrores) return;


  const esDuoc = correo.endsWith("@duoc.cl") || correo.endsWith("@duocuc.cl") || correo.endsWith("@profesor.duoc.cl");

  const nuevoUsuario = {
    nombre,
    correo,
    contrasena,
    telefono,
    region,
    comuna,
    esDuoc,
    fechaRegistro: new Date().toISOString()
  };

  usuariosGuardados.push(nuevoUsuario);
  localStorage.setItem("levelup_usuarios", JSON.stringify(usuariosGuardados));

  alert("¡Registro completado exitosamente! Ahora puedes iniciar sesión.");
  window.location.href = "login.html";
}