import express from "express";   // Importa Express para crear el servidor
import fetch from "node-fetch";   // Importa fetch para hacer peticiones HTTP

const app = express();           // Creamos la app de Express
const PORT = 3000;               // Puerto donde correrá el servidor

// Middleware para servir archivos estáticos (HTML, CSS, JS) desde la carpeta "public"
app.use(express.static("public"));

// Endpoint para obtener usuarios
app.get("/api/users", async (req, res) => {
  try {
    // Petición a la API externa
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`Error en la API externa: ${response.status}`);
    }

    const data = await response.json();

    // Solo devolvemos name, username y email
    const users = data.map(user => ({
      name: user.name,
      username: user.username,
      email: user.email,
    }));

    // Simular retardo de 1.5 segundos
    setTimeout(() => {
      res.json(users);
    }, 1500);

  } catch (error) {
    console.error("❌ Error en backend:", error.message);
    res.status(500).json({ error: "Error interno en el servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
