import express from 'express';
import { signup,getUserByUsername } from '../../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup); 
router.get('/getuser/:username', getUserByUsername);

export default router;

