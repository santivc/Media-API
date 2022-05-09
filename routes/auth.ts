import { googleSignIn } from './../controllers/auth';
import { validateFields } from './../middlewares/validate-data';
import { check } from 'express-validator';
import { Router } from "express";
import { login } from '../controllers/auth';



const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login);


router.post('/google', [
    check('id_token', 'id_token es necesario').not().isEmpty(),
    validateFields
], googleSignIn);

export const authRoutes = router;