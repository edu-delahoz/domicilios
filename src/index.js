require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const sequelize = require("./config/database");

startServer();


const app = express();

// Middlewares globales
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "🚀 Servidor funcionando correctamente" });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Conexión a PostgreSQL establecida correctamente.");
        app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
    } catch (error) {
        console.error("Error al conectar con PostgreSQL:", error);
    }
}

