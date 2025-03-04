require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const sequelize = require("./config/database");


const establishmentsRoutes = require("./routes/establishments.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes")

const app = express(); 

// Middlewares globales
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

//routes
app.use("/api/establishments", establishmentsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);



// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Servidor funcionando correctamente" });
});

if (require.main === module) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
    });
  }
  
  module.exports = app;
