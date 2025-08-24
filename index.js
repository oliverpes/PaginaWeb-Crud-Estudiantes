import express from "express";
import { crud_estudiante } from "./controlador/crud_clientes.js";

const app = express();
const port = 5000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Archivos estáticos (opcional si agregas CSS/JS)
app.use(express.static('./public'));

// Configuración EJS
app.set('views', './vistas/clientes');
app.set('view engine', 'ejs');

// Rutas
app.get('/', crud_estudiante.leer);
app.post('/crud_e', crud_estudiante.cud);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Aplicación iniciada en http://localhost:${port}/`);
});
