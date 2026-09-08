const CATALOGO_PRODUCTOS = [
  {
    codigo: "JM001",
    categoria: "Juegos de Mesa",
    nombre: "Catan",
    descripcion: "Clásico juego de estrategia para colonizar y expandirse en la isla de Catan (3-4 jugadores).",
    precio: 29990,
    imagen: src = "https://devirinvestments.s3.eu-west-1.amazonaws.com/img/catalog/product/8436017220100-1200-frontflat.jpg"
  },
  {
    codigo: "JM002",
    categoria: "Juegos de Mesa",
    nombre: "Carcassonne",
    descripcion: "Juego de colocación de fichas medieval fácil de aprender y competitivo (2-5 jugadores).",
    precio: 24990,
    imagen: src = "https://www.geekz.cl/web/image/product.template/21455/image"
  },
  {
    codigo: "AC001",
    categoria: "Accesorios",
    nombre: "Control Inalámbrico Xbox Series X",
    descripcion: "Respuesta táctil mejorada y botones mapeables compatibles con consolas Xbox y PC.",
    precio: 59990,
    imagen: src = "https://i5.walmartimages.com/seo/Microsoft-Xbox-One-Bluetooth-Wireless-Controller-Black_b30e1557-556d-4638-a692-7b42cb425b52_1.3d21d0fb85ffc29ebc3435b2d1bd3d75.jpeg" 
  },
  {
    codigo: "AC002",
    categoria: "Accesorios",
    nombre: "Auriculares Gamer HyperX Cloud II",
    descripcion: "Sonido envolvente virtual 7.1 con almohadillas viscoelásticas y micrófono desmontable.",
    precio: 79990,
    imagen: src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdO6mRCcRglH7n3EMSCivY3XAlU0QezZArTzefhyhxrnk54EqblxI_yQCN&s=10" 

  },
  {
    codigo: "CO001",
    categoria: "Consolas",
    nombre: "PlayStation 5",
    descripcion: "Consola de última generación de Sony con SSD ultrarrápido y retroalimentación háptica.",
    precio: 549990,
    imagen: scr = "https://www.weplay.cl/pub/media/wysiwyg/PRODUCTOS/IMAGENES/PLAYSTATION/711719570820_2.jpg"
  },
  {
    codigo: "CG001",
    categoria: "Computadores Gamers",
    nombre: "PC Gamer ASUS ROG Strix",
    descripcion: "Equipo potente de alta gama diseñado para desempeño competitivo y multitarea extrema.",
    precio: 1299990,
    imagen: scr = "https://rimage.ripley.cl/home.ripley/Attachment/WOP/1/2000408648833/full_image-2000408648833"
  },
  {
    codigo: "SG001",
    categoria: "Sillas Gamers",
    nombre: "Silla Gamer Secretlab Titan",
    descripcion: "Soporte ergonómico ajustable y materiales premium para largas sesiones de juego.",
    precio: 349990,
    imagen: src = "https://m.media-amazon.com/images/I/41wKF+jkOAL._AC_.jpg"
  },
  {
    codigo: "MS001",
    categoria: "Mouse",
    nombre: "Mouse Gamer Logitech G502 HERO",
    descripcion: "Sensor HERO de 25.600 DPI, pesas ajustables y 11 botones programables.",
    precio: 49990,
    imagen: src = "https://http2.mlstatic.com/D_NQ_NP_913004-MLA99443804514_112025-O.webp"
  }
];

const REGIONES_CHILE = {
  "Región Metropolitana de Santiago": ["Santiago", "Providencia", "Las Condes", "Maipú", "Puente Alto"],
  "Región de Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón"],
  "Región del Biobío": ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Coronel"]
};