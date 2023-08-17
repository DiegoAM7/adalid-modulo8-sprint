import {
	getSkaters,
	createSkater,
	updateSkater,
	deleteSkater,
} from '../controllers/skaters.controllers.js';
import { Router } from 'express';

const router = Router();

router.get('/', getSkaters);
router.post('/', createSkater);
router.put('/:id', updateSkater);
router.delete('/:id', deleteSkater);

export default router;
