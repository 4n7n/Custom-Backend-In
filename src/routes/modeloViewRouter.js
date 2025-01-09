import { Router } from 'express';
import ModeloViewController from '../controllers/modelo/modeloViewController.js';

const router = Router();

router.get('/', ModeloViewController.getAll);
...
router.post('/', ModeloViewController.createNew);
...
export default router;