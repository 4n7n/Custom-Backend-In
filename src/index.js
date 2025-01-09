import express from "express"; // Framework para crear el servidor
import dotenv from "dotenv"; // Cargar variables de entorno
import session from "express-session"; // Crear sesiones
import path from "path"; // Para manejar rutas de archivos
import { fileURLToPath } from "url"; // Para obtener __dirname en módulos ES6
import router from "./routes/routes.js"; // Importar rutas
import { saveUser } from "./middlewares/sessionMiddleware.js";

import Sequelize from "sequelize";
import sequelize from "./config/db.js";

// Importa tus modelos desde sus rutas
import User from "./models/userModel.js";
import Turnos from "./models/turnosModel.js";
import Servicios from "./models/serviciosModel.js";

dotenv.config();

// Obtener __dirname en ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Crear servidor

// Configurar motor de plantillas y directorio de vistas
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Configurar directorio de archivos estáticos
app.use(express.static("public"));

// Configurar body parser para formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar sesiones
app.use(
    session({
        secret: process.env.SECRET, // Clave para cifrar la cookie
        resave: false, // No guardar la cookie en cada petición
        saveUninitialized: true, // Guardar cookies no inicializadas
        cookie: {
            secure: false, // true para HTTPS
            maxAge: 1000 * 60 * 60 * 24 * 7, // Vida de la cookie (7 días)
        },
    })
);

// Middleware para guardar información del usuario en la sesión
app.use(saveUser);

// Usar rutas
app.use("/", router);

// Inicializa los modelos
const models = {
    User: User.init(sequelize),
    Turnos: Turnos.init(sequelize),
    Servicios: Servicios.init(sequelize),
};


// Define las relaciones
models.Turnos.belongsTo(models.Servicios, { foreignKey: "servicios_idservicios" });
models.Servicios.hasMany(models.Turnos, { foreignKey: "servicios_idservicios" });


// Configura las asociaciones si están definidas
Object.values(models).forEach((model) => {
    if (typeof model.associate === "function") {
        model.associate(models);
    }
});

// Sincronizar modelos
sequelize.sync({ force: false }).then(() => {
    console.log("Database synchronized");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000; // Puerto por defecto si no está configurado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});