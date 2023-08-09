import { signIn, signUp } from '../controllers/auth.controllers.js';
import { Router } from 'express';

const router = Router();

router.post('/registro', signUp);
router.post('/login', signIn);

export default router;
