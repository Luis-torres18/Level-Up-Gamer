document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  actualizarEstadoSesion();
});

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("levelup_carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("levelup_carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  // El criterio uniforme adoptado es la sumatoria de unidades totales
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const cartCounters = document.querySelectorAll(".cart-count");
  cartCounters.forEach(counter => {
    counter.textContent = `Cart (${totalItems})`;
  });
}

function obtenerSesionUsuario() {
  return JSON.parse(localStorage.getItem("levelup_usuario_activo"));
}

function actualizarEstadoSesion() {
  const usuario = obtenerSesionUsuario();
  const authContainer = document.getElementById("auth-nav-container");
  if (!authContainer) return;

  if (usuario) {
    authContainer.innerHTML = `
      <span>Hola, <strong>${usuario.nombre.split(" ")[0]}</strong></span>
      ${usuario.esDuoc ? '<span style="color: var(--neon-green); font-size: 0.75rem;">[20% OFF Duoc]</span>' : ''}
      <a href="#" id="btn-cerrar-sesion" style="color: var(--danger-color); margin-left: 0.5rem;">Cerrar sesión</a>
    `;
    document.getElementById("btn-cerrar-sesion").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("levelup_usuario_activo");
      window.location.reload();
    });
  } else {
    authContainer.innerHTML = `
      <a href="login.html">Iniciar sesión</a> | 
      <a href="registro.html">Registrar usuario</a>
    `;
  }
}

function agregarProductoAlCarrito(codigo) {
  const producto = CATALOGO_PRODUCTOS.find(p => p.codigo === codigo);
  if (!producto) return;

  const carrito = obtenerCarrito();
  const indice = carrito.findIndex(p => p.codigo === codigo);

  if (indice >= 0) {
    carrito[indice].cantidad += 1;
  } else {
    carrito.push({
      codigo: producto.codigo,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
  alert(`"${producto.nombre}" fue añadido al carrito.`);
}

function formatearMoneda(monto) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP"
  }).format(monto);
}