import { Router } from "express";

import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js"
import turnoRouter from "./turnoRouter.js"
import dashboardRouter from "./dashboardRouter.js"
import servicioRouter from "./servicioRouter.js"

const router = Router();


router.use("/user", userRouter);
router.use("/turno", turnoRouter);
router.use("/dashboard", dashboardRouter)
router.use("/servicio", servicioRouter)
router.use("/",authRouter);

export default router;
