import { Router } from "express";
import userController from "../controllers/user/userViewController.js";
const router = Router();
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

router.get("/", isAdmin, userController.getAll);

router.get("/:id", userController.getById);

router.post("/new", userController.create);

router.post("/:id/update", userController.update);

router.get("/:id/deactivate", userController.deactivate);

router.get("/:id/activate", userController.activate);

export default router;
