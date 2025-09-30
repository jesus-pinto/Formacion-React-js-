// Guardamos todos los usuarios para poder hacer búsquedas o filtrados después
let usuariosCache = []; 

// Función para mostrar loader de bolitas y skeleton de usuarios
function mostrarLoaderYSkeleton() {
  const respuestaDiv = document.getElementById("respuesta");

  // HTML del loader tipo bola con texto "Cargando..."
  const loaderHTML = `
    <div class="loader-bola" style="justify-content:center; margin-bottom:15px;">
      <div></div>
      <div></div>
      <div></div>
      <span class="loader-text">Cargando...</span>
    </div>
  `;

  // HTML de los bloques grises (skeleton) que simulan los usuarios mientras cargan
  const skeletonHTML = `
    <div class="skeleton"></div>
    <div class="skeleton"></div>
    <div class="skeleton"></div>
  `;

  // Mostramos ambos (loader + skeleton) en el contenedor de respuesta
  respuestaDiv.innerHTML = loaderHTML + skeletonHTML;
}

// Función para mostrar los usuarios uno por uno en secuencia
function pintarUsuariosSecuencial(users) {
  const respuestaDiv = document.getElementById("respuesta");
  respuestaDiv.innerHTML = ""; // Limpiamos loader y skeleton

  // Recorremos cada usuario y lo mostramos con delay según su posición
  users.forEach((u, index) => {
    setTimeout(() => {
      const p = document.createElement("p");
      p.innerHTML = `<strong>${u.name}</strong> (${u.username}) - ${u.email}`;
      p.style.opacity = 0; // comenzamos invisible
      respuestaDiv.appendChild(p);

      // Animación de aparición (fade-in)
      setTimeout(() => {
        p.style.transition = "opacity 0.3s ease";
        p.style.opacity = 1;
      }, 10);

    }, index * 200); // cada usuario aparece con 200ms de diferencia
  });
}

// Función principal para obtener los usuarios desde la API
async function obtenerUsuarios() {
  mostrarLoaderYSkeleton(); // Primero mostramos loader + skeleton
  try {
    // Hacemos la petición a la API
    const res = await fetch("/api/users");
    if (!res.ok) throw new Error(`Error en la petición: ${res.status}`);
    const data = await res.json();

    // Guardamos los usuarios en la variable global
    usuariosCache = data;

    // Simulamos 1.5s de carga antes de mostrar los usuarios
    setTimeout(() => pintarUsuariosSecuencial(data), 1500);
  } catch (error) {
    // En caso de error, mostramos un mensaje rojo en el contenedor
    setTimeout(() => {
      document.getElementById("respuesta").innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }, 1500);
    console.error("❌ Error:", error.message);
  }
}

// Evento que llama a obtenerUsuarios cuando se hace clic en el botón
document.getElementById("btnUsuarios").addEventListener("click", obtenerUsuarios);
