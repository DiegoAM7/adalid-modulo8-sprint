import {
	getSkater,
	getSkaters,
	createSkater,
	updateSkater,
	deleteSkater,
} from '../controllers/skaters.controllers.js';
import { Router } from 'express';
import { auth } from '../auth/authAutorizacion.js';

const router = Router();

router.get('/:id', getSkater);
router.get('/', getSkaters);
router.post('/', auth, createSkater);
router.put('/:id', auth, updateSkater);
router.delete('/:id', auth, deleteSkater);

export default router;
