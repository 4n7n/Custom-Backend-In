import { Router } from 'express';
import modeloApiRouter from './modeloApiRouter.js';
import modeloViewRouter from './modeloViewRouter.js';

const router = Router();

router.use('/api/modelo', modeloApiRouter);
router.use('/modelo', modeloViewRouter);
...
export default router;