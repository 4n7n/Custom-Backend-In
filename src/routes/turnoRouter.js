import express from "express";
import turnoViewController from "../controllers/appointment/appointmentViewController.js";

const router = express.Router();

// Rutas para Turnos
router.get("/create", turnoViewController.renderCreateView); // Vista para crear
router.post("/create", turnoViewController.create); // Acción para crear
router.get("/update/:id", turnoViewController.renderUpdateView); // Vista para editar
router.post("/update/:id", turnoViewController.update); // Acción para actualizar
router.post("/delete/:id", turnoViewController.remove); // Acción para eliminar

export default router;