import express from "express";
import { getDashboard } from "../controllers/dashboard/dashboardController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ruta para el dashboard
router.get("/", isAuthenticated, getDashboard);

export default router;