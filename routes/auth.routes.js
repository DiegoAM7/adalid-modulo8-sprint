import { Router } from 'express';
import { signUp, singIn } from '../controllers/auth.controllers.js';

const router = Router();

router.post('/signUp', signUp)
router.post('/signIn', singIn);

export default router;