document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();

  const btnCoupon = document.getElementById("btn-aplicar-cupon");
  if (btnCoupon) {
    btnCoupon.addEventListener("click", aplicarCupon);
  }

  const btnCheckout = document.getElementById("btn-pagar");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", procesarPago);
  }
});

let descuentoPorcentaje = 0;

function renderizarCarrito() {
  const carrito = obtenerCarrito();
  const contenedor = document.getElementById("cart-items-wrapper");
  const subtotalElem = document.getElementById("cart-subtotal");
  const descuentoElem = document.getElementById("cart-discount");
  const totalElem = document.getElementById("cart-total");

  if (!contenedor) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="empty-cart-message">
        <h3>Tu carrito está actualmente vacío</h3>
        <p style="color: var(--text-muted); margin: 1rem 0;">Descubre nuestras consolas, juegos de mesa y accesorios exclusivos.</p>
        <a href="inicio.html#catalogo" class="btn-cta">Explorar Catálogo</a>
      </div>
    `;
    subtotalElem.textContent = "$0";
    descuentoElem.textContent = "$0";
    totalElem.textContent = "$0";
    return;
  }

  let subtotal = 0;
  contenedor.innerHTML = "";

  carrito.forEach(item => {
    const itemTotal = item.precio * item.cantidad;
    subtotal += itemTotal;

    const article = document.createElement("article");
    article.className = "cart-item";
    article.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="item-info">
        <h3>${item.nombre}</h3>
        <p>${item.descripcion}</p>
        <span style="color: var(--primary-blue); font-size: 0.9rem;">${formatearMoneda(item.precio)} c/u</span>
      </div>
      <div class="item-controls">
        <button class="btn-qty" onclick="cambiarCantidad('${item.codigo}', -1)" aria-label="Disminuir">-</button>
        <span class="item-qty-display">${item.cantidad}</span>
        <button class="btn-qty" onclick="cambiarCantidad('${item.codigo}', 1)" aria-label="Aumentar">+</button>
      </div>
      <div class="item-total">
        ${formatearMoneda(itemTotal)}
      </div>
    `;
    contenedor.appendChild(article);
  });

  const usuarioActivo = obtenerSesionUsuario();
  if (usuarioActivo && usuarioActivo.esDuoc && descuentoPorcentaje < 20) {
    descuentoPorcentaje = 20;
    const msgCupon = document.getElementById("coupon-msg");
    if (msgCupon) {
      msgCupon.style.color = "var(--neon-green)";
      msgCupon.textContent = "Descuento de por vida Duoc UC (20%) aplicado automáticamente.";
    }
  }

  const montoDescuento = subtotal * (descuentoPorcentaje / 100);
  const total = subtotal - montoDescuento;

  subtotalElem.textContent = formatearMoneda(subtotal);
  descuentoElem.textContent = `-${formatearMoneda(montoDescuento)} (${descuentoPorcentaje}%)`;
  totalElem.textContent = formatearMoneda(total);
}

window.cambiarCantidad = function(codigo, cambio) {
  const carrito = obtenerCarrito();
  const indice = carrito.findIndex(p => p.codigo === codigo);

  if (indice >= 0) {
    carrito[indice].cantidad += cambio;
    if (carrito[indice].cantidad <= 0) {
      carrito.splice(indice, 1);
    }
  }

  guardarCarrito(carrito);
  renderizarCarrito();
};

function procesarPago() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    alert("No puedes proceder al pago con un carrito vacío.");
    return;
  }

  const usuario = obtenerSesionUsuario();
  if (!usuario) {
    if (confirm("Se recomienda iniciar sesión antes de pagar. ¿Deseas ir al login?")) {
      window.location.href = "login.html";
      return;
    }
  }

  alert("¡Compra procesada con éxito! Muchas gracias por confiar en Level-Up Gamer.");
  localStorage.removeItem("levelup_carrito");
  actualizarContadorCarrito();
  renderizarCarrito();
}