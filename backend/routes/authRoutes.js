import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import loginUser from '../controllers/authController.js';
import '../config/passport.js';

const router = express.Router();

router.post('/login',loginUser);


export default router;
