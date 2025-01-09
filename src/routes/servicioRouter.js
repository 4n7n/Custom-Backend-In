import express from 'express';
import serviceViewController from "../controllers/services/servicesViewController.js";

const router = express.Router();

// Rutas para Turnos
router.get("/create", serviceViewController.renderCreateView); // Vista para crear
router.post("/create", serviceViewController.create); // Acción para crear
router.get("/update/:id", serviceViewController.renderUpdateView); // Vista para editar
router.post("/update/:id", serviceViewController.update); // Acción para actualizar
router.post("/delete/:id", serviceViewController.remove); // Acción para eliminar

export default router;