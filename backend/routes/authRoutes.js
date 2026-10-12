import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { loginUser } from '../controllers/authController.js';
import { loginLimiter } from '../middelware/hardening.js';

const router = express.Router();

router.post("/login", loginLimiter, loginUser);


export default router;
